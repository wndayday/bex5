/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var Component = require("$UI/system/lib/base/component");
	var Browser = require("$UI/system/lib/base/browser");
	var Str = require("$UI/system/lib/base/string");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	require("$UI/system/components/justep/swiperView/js/swiper.min");
	var Observable = require("$UI/system/lib/base/observable");
	require("css!$UI/system/components/justep/swiperView/css/swiper.min").load();
	var $ = require("jquery");
	var url = require.normalizeName("./swiperView");
	var ComponentConfig = require("./swiperView.config");

	var keyNavigator = require("$UI/system/lib/keyNavigator/keyNavigator");
	var justep = require("$UI/system/lib/justep");
	var SwiperView = ViewComponent.extend({
		mixins : Observable,
		constructor : function(options) {
			Observable.prototype.constructor.call(this);
			this.callParent(options);
		},
		getConfig : function() {
			return ComponentConfig;
		},
		buildTemplate : function(config) {

		},
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			var self = this;
			this.$domNode = $(this.domNode);
			this.loopTerm = this.$domNode.attr("loopTerm");
			this.slidesPerView = this.$domNode.attr("slidesPerView");
			this.slidesPerColumn = this.$domNode.attr("slidesPerColumn");
			this.pagination = this.$domNode.attr("pagination");
			this.spaceBetween = this.$domNode.attr("spaceBetween");
			this.paginationType = this.$domNode.attr("paginationType");
			this.directionButton = this.$domNode.attr("directionButton");
			this.id = this.$domNode.attr("id")
			if (this.loopTerm) {
				var loopNode = null;
				loopNode = this.$domNode.find("[xid=" + this.loopTerm + "]").length > 0 ? this.$domNode.find("[xid=" + this.loopTerm + "]") : this.$domNode.find("." + this.loopTerm + " ");
				if (loopNode.length > 0) {
					loopNode.addClass("swiper-slide");
					loopNode.parent().addClass("swiper-wrapper");
					loopNode.parent().parent().addClass("swiper-container");
				} else {
					throw new Error('错误：SwiperView组件没有找到必要的循环项')
				}
			};
			var auxiliaryTool = this.$domNode.find(".swiper-container");
			if(auxiliaryTool.length == 0){
				auxiliaryTool = this.$domNode;
			}
			if (this.pagination == "true") {
				auxiliaryTool.append('<div class="swiper-pagination"></div>');
			}
			if (this.directionButton == "true") {
				auxiliaryTool.append('<div class="swiper-button-prev x-focusable"></div><div class="swiper-button-next x-focusable"></div>')
			}
			if (this.autoLayout) {
				this.$domNode.find(selector)
			}
			this.$domNode.on('afterRenderList', function() {
				if (self.renderTimmer) {
					clearTimeout(self.renderTimmer);
				}
				self.renderTimmer = setTimeout(function() {
					self.initSwiper();
				}, 100);
			});
			this.initSwiper();
			this.initEvent();
		},
		initSwiper : function() {
			var selector = "#" + this.id + " .swiper-container";
			if ($(selector).length == 0) {
				selector = "#" + this.id + "";
			}
			this.swiper = new Swiper(selector, {
				pagination : '' + selector + ' .swiper-pagination',
				slidesPerView : parseInt(this.slidesPerView),
				slidesPerColumnFill : "row",
				slidesPerColumn : parseInt(this.slidesPerColumn),
				spaceBetween : parseInt(this.spaceBetween),
				prevButton : '' + selector + ' .swiper-button-prev',
				nextButton : '' + selector + ' .swiper-button-next'
			});
		},
		initEvent : function() {
			var self = this;
			if (Browser.isTV) {
				keyNavigator.on("reachEnd", function(event) {
					var from = event.from;
					var direction = event.direction;
					if (self.$domNode.find(from).length > 0) {
						if (direction == "right") {
							if (self.swiper.isEnd) {
								self.fireEvent("reachEnd", {
									source : self,
									from : from,
									direction : direction
								});
							}
							var column = parseInt(self.slidesPerView);
							for (var i = 1; i < column; i++) {
								self.swiper.slideNext();
							}
						} else if (direction == "left") {
							if (self.swiper.isBeginning) {
								self.fireEvent("reachEnd", {
									source : self,
									from : from,
									direction : direction
								});
							}
							var column = parseInt(self.slidesPerView);
							for (var i = 1; i < column; i++) {
								self.swiper.slidePrev();
							}
						}
					}

				});
			}
		},
	// 滑块到边界事件

	});
	justep.Component.register(url, SwiperView);
	return SwiperView;
});