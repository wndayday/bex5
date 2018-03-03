/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	require("css!./css/keyNavigator").load();
	var xuiDoc = xuiService.getXuiDoc();
	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz).html('');
	}
	var KeyNavigator = ViewComponent.extend({
		init : function(value, bindingContext) {
			create(this, 'x-keyNav');
			this.callParent(value, bindingContext);
			this.$domNode = $(this.$domNode);
			this.defaultFocus = this.$domNode.attr("defaultFocus");
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "defaultFocus":
				debugger;
				$("[xid = " + oldVal + "]").removeClass("x-autofocus");
				$("[xid = " + value + "]").addClass("x-autofocus");
				xuiDoc.updateProperties($("[xid = " + value + "]"), [ 'class' ]);
				xuiDoc.updateProperties($("[xid = " + oldVal + "]"), [ 'class' ]);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});
	var quickIdeEx = {
		"$UI/system/components/justep/keyNavigator/keyNavigator" : {
			properties : [ "xid", {
				name : "selector",
				text : "焦点选择器"
			}, "keepSourceGroupXids", {
				name : "defaultFocus",
				text : "默认焦点",
				'editor-parameter' : {
					onlyDisplayVisibleComp : "true"
				}
			},{
				name : "reachEndDown",
				text : "到达下边界",
				editor : "eventEditor",
				noLabel : true
			},{
				name : "reachEndUp",
				text : "到达上边界",
				editor : "eventEditor",
				noLabel : true
			},{
				name : "reachEndLeft",
				text : "到达左边界",
				editor : "eventEditor",
				noLabel : true
			},{
				name : "reachEndRight",
				text : "到达右边界",
				editor : "eventEditor",
				noLabel : true
			}],
			styleConfig : function(designer) {
				return [
				// designer.getCommonStyleItem('baseStyle'),
				];
			}
		},
	}
	return {
		'$UI/system/components/justep/keyNavigator/keyNavigator' : KeyNavigator,
		quickIdeEx : quickIdeEx
	};
});