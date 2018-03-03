/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./menu').load();
	
	var $ = require("jquery");
	var Menu = require("../menu");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var DMenu = Menu.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			
			$('>li', this.$el).attr("d_canAddChild", false);
			//$('>li>*', this.$el).attr('d_selectable', false);
		},
		addItem: function(){
			var me = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/menu/menu#item", this, {paintComponent:true}, function(node){
				var id = $(node).attr('d_id');
				var li = $('*[d_id='+id+']', me.$el).attr("d_canAddChild", false);
				//$('>*', li).attr('d_selectable', false);
			});
		},
		addDivider: function(){
			var me = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/menu/menu#divider", this, {paintComponent:true}, function(node){
				var id = $(node).attr('d_id');
				$('*[d_id='+id+']', me.$el).attr("d_canAddChild", false);
			});
		},
	});
	var quickIdeEx = {
			"$UI/system/components/justep/menu/menu":{
				toolbar:[{text:"添加Item",method:"addItem"},{text:"添加分割线",method:"addDivider"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'), 
					        ];
				}
			},
			"$UI/system/components/justep/menu/menu#item":{
			},
			"$UI/system/components/justep/menu/menu#divider":{
			}
	}
	return {'$UI/system/components/justep/menu/menu':DMenu,quickIdeEx:quickIdeEx};
});