/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var GridSelectDesigner = require("$UI/system/components/justep/gridSelect/designer/gridSelect")['$UI/system/components/justep/gridSelect/gridSelect'];
	

	var OrgSelect = justep.BindComponent.extend({
		doInit : function() {// 去除运行时的事件处理
			this.$domNode.children().attr('d_selectable', false);
		}
	});

	var OrgSelectPC = GridSelectDesigner.extend({
		doInit : function() {
			this.callParent();
			var cssText = this.$domNode[0].style.cssText;
			if(!cssText ||  cssText.indexOf("absolute") == -1){
				this.$domNode.css({
					position : 'relative'
				});				
			}

			this.$domNode.find("div[component='$UI/system/components/justep/data/bizData']").css({
				position : 'absolute',
				left : 10,
				top : 10
			}).attr({d_selectable: true,d_canMove:false});
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/org/orgSelect":{
				properties:["xid",{text:"引用",name:"bind-ref"},{text:"显示名引用",name:"bind-labelRef"},"title",
				            "multiSelection","cascade",{name:"includeOrgKind",text:"包含组织类型",editor:"orgKindSelector"},
				            "includeDisabled","showFilter","selectFilter",{name:"orgDialog",text:"对话框组件"},{name:"itemValue",text:"下拉值"},{name:"itemLabel",text:"下拉显示名"}],
			},
			"$UI/system/components/justep/org/orgSelectPC":{
				properties:["xid",{text:"引用",name:"bind-ref"},{text:"显示名引用",name:"bind-labelRef"},{text:"扩展引用",name:"bind-extRef"},"defaultLabel",
				            "valueSeparator","labelSeparator","extSeparator","multiselect","clearButton","optionHeight","autoOptionWidth","manageCodes",
				            {name:"includeOrgKind",editor:"orgKindSelector"},
				            "includeDisabled","selectFilter",
				            {name:"option",text:"下拉选项",properties:[{name:"value",text:"下拉值"},{name:"label",text:"下拉显示名"},{name:"ext",text:"下拉扩展"},
				                        "multikey","multiboxonly","multiselectWidth","appearance","expandColumn","useVirtualRoot","virtualRootLabel"]},
				            "tabindex","accesskey","readonly","disabled"],
			    events:["onShowOption","onHideOption","onTreeIconRender",{name:"onUpdateValue",text:"更新值事件"}]
			},
			"$UI/system/components/justep/org/orgSelectPC#option":{
				properties:["xid",{name:"value",text:"下拉值"},{name:"label",text:"下拉显示名"},{name:"ext",text:"下拉扩展"},
	                        "multikey","multiboxonly","multiselectWidth","appearance","expandColumn","useVirtualRoot","virtualRootLabel"]
			}
	};
	
	return {
		'$UI/system/components/justep/org/orgSelect' : OrgSelect,
		'$UI/system/components/justep/org/orgSelectPC' : OrgSelectPC,
		quickIdeEx:quickIdeEx
	};
});