/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var Dropdown = require("../dropdown");
	var $ = require("jquery");
	
	Dropdown = Dropdown.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext); 
			var $domNode = $(this.domNode);
			$domNode.attr("d_resizable",false).attr("d_canAddChild",false);
			$(">*",$domNode).attr("d_canRemove",false).attr("d_canMove","false");
			$(">.dropdown-menu",$domNode).attr("d_resizable",false);
			$domNode.on("click",function(){
				event.stopPropagation();
			});
		},
		_installListener : function(){
			var self = this;
			var $domNode = $(this.domNode);
			$domNode.on("click",">.dropdown-toggle",function(event){
				$(".dropdown").each(function() {
					if (this != self.domNode) {
						$(this).removeClass("open");
					}
				}); 
				if($domNode.is('.disabled, :disabled')){
					return;
				}
//				$domNode.toggleClass("open");
				event.stopPropagation();
			});
			$(document).on('click.bs.dropdown', function(){ 
				self.clearMenus();
			});
		},
		showMenu : function(){
			$(this.domNode).addClass("open");
		},
		hideMenu : function(){
			$(this.domNode).removeClass("open");
		}
	});

	var quickIdeEx = {
			"$UI/system/components/bootstrap/dropdown/dropdown(bootstrap)":{
				properties:["xid",{name:"autoHideMenu",text:"自动隐藏菜单"}],
				toolbar:[{text:"显示菜单",method:"showMenu"},{text:"隐藏菜单",method:"hideMenu"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('dropdown-pop-style')
					    	];
				}
			}
	}
	return {'$UI/system/components/bootstrap/dropdown/dropdown(bootstrap)': Dropdown,quickIdeEx:quickIdeEx};
});