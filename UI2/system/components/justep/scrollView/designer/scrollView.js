/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var ScrollView = require("$UI/system/components/justep/scrollView/scrollView");
	var Component = require("$UI/system/lib/base/component");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	require('css!./scrollView').load();

	var ScrollViewDesigner = ScrollView.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			$(this.domNode).attr("d_resizable", "false").attr("d_canAddChild", "false");
			if (!this.ownerDesigner.isInit) {
				this.$rootEle.addClass('x-scroll-view');
				xuiService.getXuiDoc().updateProperties(this.$rootEle.clone(true).removeClass("active"));
			}

			this.$domNode.children().attr("d_canRemove", "false").attr("d_selectable", "false");
		},
		dispose : function() {
			this.$rootEle.removeClass('x-scroll-view');
			xuiService.getXuiDoc().updateProperties(this.$rootEle.clone(true).removeClass("active"));
			this.callParent();
		},
		enablePullDown : function() {
			this.$rootEle.attr('supportPullDown', true);
			this.$pdEle = $('<div class="x-content-center x-pull-down container"><i class="x-pull-down-img glyphicon x-icon-pull-down"></i><span class="x-pull-down-label">' + this.pullDownLabel
					+ '</span></div>');
			this.$scrollEle.prepend(this.$pdEle);

			xuiService.getXuiDoc().updateProperties(this.$rootEle.clone(true).removeClass("active"));
			xuiService.getXuiDoc().updateNodes(this.$pdEle);
		},
		enablePullUp : function() {
			this.$puEle = $('<div class="x-pull-up x-content-center"><span class="x-pull-up-label">' + this.pullUpLabel + '</span></div>');
			this.$scrollEle.append(this.$puEle);

			xuiService.getXuiDoc().updateProperties(this.$rootEle.clone(true).removeClass("active"));
			xuiService.getXuiDoc().updateNodes(this.$puEle);
		},

		disablePullDown : function() {
			var $pdEle = $('.x-pull-down', this.$scrollEle);
			var did = $pdEle.attr('d_id');
			$pdEle.remove();
			xuiService.getXuiDoc().deleteComponent([ did ]);

		},

		disablePullUp : function() {
			var $puEle = $('.x-pull-up', this.$scrollEle);
			var did = $puEle.attr('d_id');
			$puEle.remove();
			xuiService.getXuiDoc().deleteComponent([ did ]);
		},

		onBuildMenu : function(event) {
			event.enableStatus = event.enableStatus || {};
			if ($('.x-pull-down', this.$rootEle).length > 0) {
				event.enableStatus.enablePullDown = false;
				event.enableStatus.disablePullDown = true;
			} else {
				event.enableStatus.enablePullDown = true;
				event.enableStatus.disablePullDown = false;
			}
			if ($('.x-pull-up', this.$rootEle).length > 0) {
				event.enableStatus.enablePullUp = false;
				event.enableStatus.disablePullUp = true;
			} else {
				event.enableStatus.enablePullUp = true;
				event.enableStatus.disablePullUp = false;
			}
		},
		propertyChangedHandler : function(name, oldValue, value) {
			this.callParent(name, oldValue, value);
			if (name == "pullDownLabel") {
				var $pdlEle = this.$scrollEle.find('.x-pull-down-label');
				$pdlEle.text(value);
				xuiService.getXuiDoc().updateText($pdlEle);
			} else if (name == "pullUpLabel") {
				var $pulEle = this.$scrollEle.find('.x-pull-up-label');
				$pulEle.text(value);
				xuiService.getXuiDoc().updateText($pulEle);
			}
		}
	});
	justep.Component.addOperations(ScrollViewDesigner, {
		'reachEndDown' : {
			label : '向下滑动',
			argsDef : [],
			method : function(args) {
			}
		},
		'reachEndUp' : {
			label : '向上滑动',
			argsDef : [],
			method : function(args) {
			}
		},
	});

	// <property name="autoAppend" text="是否自动出发一次pullUp" default-value="true"
	// editor-ref="booleanList" data-type="boolean"/>
	// <property name="autoPullUp" text="是否触发自动上滑" default-value="true"
	// editor-ref="booleanList" data-type="boolean"/>
	// <group name="supportPullDownOption" text="下拉能力属性">
	// <property name="pullDownLabel" required="false" default-value="下划刷新..."/>
	// <property name="pullDownMoveLabel" required="false"
	// default-value="松开刷新..."/>
	// <property name="pullDownLoadingLabel" required="false"
	// default-value="加载中..."/>
	// </group>
	//	
	// <group name="supportPullUpOption" text="上划能力属性">
	// <property name="pullUpLabel" required="false" default-value="加载更多..."/>
	// <property name="pullUpMoveLabel" required="false"
	// default-value="释放加载..."/>
	// <property name="pullUpLoadingLabel" required="false"
	// default-value="加载中..."/>
	// <property name="noMoreLoadLabel" required="false"
	// default-value="已经到最后."/>
	// </group>

	var quickIdeEx = {
		"$UI/system/components/justep/scrollView/scrollView" : {
			properties : [ "autoAppend", "autoPullUp", "pullDownLabel", "pullDownMoveLabel", "pullDownLoadingLabel", "pullUpLabel", "pullUpMoveLabel", "pullUpLoadingLabel", "noMoreLoadLabel" ],
			styleConfig : function(designer) {
				return [ designer.getCommonStyleItem('baseStyle') ];
			},
			operations : function() {
				return [ {
					groupName : "滑动操作",
					items : [ {
						name : 'reachEndDown',
						label : "向下滑动",
					},{
						name : 'reachEndUp',
						label : "向上滑动",
					} ]
				} ]
			}
		}
	}

	return {
		'$UI/system/components/justep/scrollView/scrollView' : ScrollViewDesigner,
		quickIdeEx : quickIdeEx
	};
});