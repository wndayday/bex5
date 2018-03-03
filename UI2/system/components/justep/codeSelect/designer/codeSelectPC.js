/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var GridSelectDesigner = require("$UI/system/components/justep/gridSelect/designer/gridSelect")['$UI/system/components/justep/gridSelect/gridSelect'];
	

	var CodeSelectPC = GridSelectDesigner.extend({
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
			"$UI/system/components/justep/codeSelect/codeSelectPC":{
				properties:["xid",{text:"引用",name:"bind-ref"},{text:"显示名引用",name:"bind-labelRef"},{text:"扩展引用",name:"bind-extRef"},
				            {text:"空值时显示",name:"defaultLabel"},"valueSeparator",{text:"多选标签分隔符",name:"labelSeparator"},
				            {text:"多选扩展分隔符",name:"extSeparator"},"multiselect","optionHeight","autoOptionWidth",
				            {name:"codeType",editor:"selectCodeType"},"selectFilter",
				            {name:"option",text:"下拉选项",properties:[{text:"下拉值",name:"value"},{text:"下拉显示名",name:"label"},
				            {text:"下拉扩展",name:"ext"},"multikey","multiboxonly","multiselectWidth"]},
				            "style","tabindex","accesskey","readonly","disabled"],
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
		'$UI/system/components/justep/codeSelect/codeSelectPC' : CodeSelectPC,
		quickIdeEx:quickIdeEx
	};
});