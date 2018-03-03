/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var Navs = require("../navs");
	
	var cls = Navs.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		},
		addTab : function(){
			var self = this;
			xuiDoc.createComponent("li", $(this.domNode).attr("d_id"), {
				paintComponent:true, autoSelect:false, templateContent:'"<li><a>Item</a></li>"'
			}, function(){
				//self.setActiveTab($(">li:last",self.domNode));
			});
		}
	});
	var quickIdeEx = {
			"$UI/system/components/bootstrap/navs/navs(bootstrap)":{
				properties:["xid"],
				events:[{name:"onClick",text:"单击事件"}],
				toolbar:[{text:"添加tab",method:"addTab"}],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('nav-style'),designer.getCommonStyleItem('nav-select'),designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('param'),designer.getCommonStyleItem('position'),
							];
				}
			}
	}
	return {'$UI/system/components/bootstrap/navs/navs(bootstrap)':cls,quickIdeEx:quickIdeEx};
});