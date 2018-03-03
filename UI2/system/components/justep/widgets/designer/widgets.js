/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var Widgets = require("$UI/system/components/justep/widgets/widgets");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Column = require('./column');
 
	require('css!./css/widgets').load();
	
	//动态注册组件
	xuiService.regComponents({"$UI/system/components/justep/widgets/column":Column});
	
	var cls = Widgets.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			if(this.$column){
				this.$column.attr('d_resizable', false);
			}
			if(this.$widget){
				this.$widget.attr('d_resizable', false);
			}
		},
		addColumn: function(){
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/widgets/column",
				this, {paintComponent:true}, 
				function(el){
					var id = $(el).attr('d_id');
					$('[d_id=' + id + ']')
						//.attr("d_canAddChild", "true")
						.attr('d_resizable', false)
						.selectable(true);
				}
			);
		},
		propertyChangedHandler: function(key, oldValue, value){
			//在这里可以加对属性的特殊处理
			switch(key){
			default:
				this.callParent(key, oldValue, value);
			}
		}
	});

	var quickIdeEx = {
			"$UI/system/components/justep/widgets/widgets":{
				toolbar:[{text:"添加Column",method:"addColumn"}],
				styleConfig:function(designer){
					return [
					  	    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					  	   	];
				}
			},
			"$UI/system/components/justep/widgets/column":{
				toolbar:[{text:"添加widget",method:"addWidget"}],
				styleConfig:function(designer){
					return [
					  	    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					  	   	];
				}
			}
	}
	return {'$UI/system/components/justep/widgets/widgets': cls,quickIdeEx:quickIdeEx};
});