/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var SelectDesigner = require("$UI/system/components/justep/select/designer/select")['$UI/system/components/justep/select/select'];
	

	var CodeSelect = SelectDesigner.extend({
		doInit : function() {
			this.callParent();
			this.$domNode.css({
				position : 'relative'
			});
			this.$domNode.find("div[component='$UI/system/components/justep/data/bizData']").css({
				position : 'absolute',
				left : 10,
				top : 10
			}).attr('d_selectable', true);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/codeSelect/codeSelect":{
				properties:["xid",{name:"bind-ref",text:"引用"},{name:"bind-labelRef",text:"显示名引用"},
				            {name:"codeType",editor:"selectCodeType"},"tabindex","accesskey","disabled"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
			}
			
	};
	
	return {
		'$UI/system/components/justep/codeSelect/codeSelect' : CodeSelect,quickIdeEx:quickIdeEx
	};
});