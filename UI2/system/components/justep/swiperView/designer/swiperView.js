/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	// var SwiperView =
	// require("$UI/system/components/justep/swiperView/swiperView")
	require("css!./css/swiperView").load();
	var cls = ViewComponent.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.loopTerm = this.$domNode.attr("loopTerm");
			/*
			 * if(this.loopTerm){ if(this.$domNode.find("[xid="+ this.loopTerm
			 * +"]")){ this.$domNode.find("[xid="+ this.loopTerm
			 * +"]").addClass("aaa"); } }
			 */
		},
	});

	var quickIdeEx = {
		"$UI/system/components/justep/swiperView/swiperView" : {
			properties : [ "xid", {
				name : "slidesPerView",
				text : "列"
			}, {
				name : "slidesPerColumn",
				text : "行"
			}, {
				name : "loopTerm",
				'editor-parameter' : {
					onlyDisplayVisibleComp : "loopItem"
				}
			}, {
				name : "pagination"
			}, "directionButton", "spaceBetween", {
				name : "reachEnd",
				text : "边界事件",
				editor : "eventEditor",
				noLabel : true
			} ],
			styleConfig : function(designer) {
				return [ designer.getCommonStyleItem('baseStyle'), ];
			}
		},
	}
	return {
		'$UI/system/components/justep/swiperView/swiperView' : cls,
		quickIdeEx : quickIdeEx
	};
});