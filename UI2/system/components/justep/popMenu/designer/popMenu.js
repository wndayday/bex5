/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require('css!./popMenu').load();
	var PopMenu = require("../popMenu");
	var Util = require("$UI/system/components/justep/common/designer/common");
    
	var DPopMenu = PopMenu.extend({
		autoHidable: false,
		constructor: function(){
			this.callParent();
			this.dismissible = false;
		},
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			
			this.$el.attr("d_canAddChild", "false");
			this.$overlay.attr("d_canAddChild", "false").attr("d_canRemove",false);
			this.$content.attr("d_canAddChild", "true").attr("d_canRemove",false);
			var cfg = Util.attr2js(this.$domNode,['anchor', 'opacity', 'position', 'direction']);
			if(cfg) this.set(cfg);
			this.callParent(value, bindingContext);
			var did = this.$el.attr("d_id");
			this.$el.before("<div d_selectable='true' is_mock='true' d_resizable='false' d_canAddChild='false' componentName='"+this.$el.attr("componentname")+"' d_id='"+this.$el.attr("d_id")+"' style='position:absolute;top:10px;left:10px;' class='x-popMenu-dialog'></div>");
	 
			this.$el.removeAttr("d_id").attr("d_realid",did);
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			case 'dismissible':
				//设计时不起作用
				this.dismissible = false;
				return;
			default:
			}
			this.callParent(key, oldVal, value);
		}
	});
	
	var quickIdeEx = {
			'$UI/system/components/justep/popMenu/popMenu':{
				text:"右键菜单",
				properties:["opacity","position",{name:"anchor",editor:"allCompXidEditor"},"direction","dismissible"],
				operations:function(){
					return [
			                 {groupName:"弹出菜单",
			                     items:[{name:'show',label:"显示菜单"},
			                            {name:'hide',label:"隐藏菜单"}]}
				            ];
				},
				styleConfig:function(designer){
					return [
						      designer.getCommonStyleItem('baseStyle'),
						      designer.getCommonStyleItem('position'),
						];
				}
			}
	}
	
	return {'$UI/system/components/justep/popMenu/popMenu': DPopMenu,quickIdeEx:quickIdeEx};
});