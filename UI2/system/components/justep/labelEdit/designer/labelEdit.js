/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTLabelEdit = require("../labelEdit");
	require('css!./css/labelEdit').load();
	
	var LabelEdit = RTLabelEdit.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode.find('div.x-edit').attr("d_canAddChild", "true").addClass('x-min-height');
			this.$domNode.children('.x-label').attr("d_canRemove", false).attr("d_canMove", false);
			this.$domNode.children('.x-edit').attr("d_canRemove", false).attr("d_canMove", false).attr("d_resizable","false");
		},
		set : function(v) {
			if ('label' in v) {
				this.$domNode.find(">label").text(v["label"] || "");
			}
		}
	});

	var webIdeEx = {
			"$UI/system/components/justep/labelEdit/labelEdit":{
				styleConfig:function(designer){
					return [
						    {
								text : '标签宽度',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "none",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px'>0</button>"},
									              {propName : "class",value : "x-label5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>5%</button>"},
									              {propName : "class",value : "x-label10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>10%</button>"},
									              {propName : "class",value : "x-label15",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>15%</button>"},
									              {propName : "class",value : "x-label20",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>20%</button>"},
									              {propName : "class",value : "x-label25",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>25%</button>"},
									              {propName : "class",value : "x-label30",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>30%</button>"},
									              {propName : "class",value : "x-label35",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>35%</button>"},
									              {propName : "class",value : "x-label40",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>40%</button>"},
									              {propName : "class",value : "x-label45",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>45%</button>"},
									              {propName : "class",value : "x-label50",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>50%</button>"},
									              {propName : "class",value : "x-label55",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>55%</button>"},
									              {propName : "class",value : "x-label60",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px;'>60%</button>"}],
									editor : "listEditor"
								}]
							},
							designer.getCommonStyleItem('font'),designer.getCommonStyleItem('backgroundColor')
						];
				}
			}
	}
	
	var quickIdeEx = {
		"$UI/system/components/justep/labelEdit/labelEdit":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		"$UI/system/components/justep/labelEdit/labelInput":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		"$UI/system/components/justep/labelEdit/labelPassword":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		
		"$UI/system/components/justep/labelEdit/labelRange":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},

		"$UI/system/components/justep/labelEdit/labelOutput":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		"$UI/system/components/justep/labelEdit/labelSelect":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		
		"$UI/system/components/justep/labelEdit/labelTextarea":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		
		"$UI/system/components/justep/labelEdit/labelRadioGroup":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		
		"$UI/system/components/justep/labelEdit/labelCheckboxGroup":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		},
		
		"$UI/system/components/justep/labelEdit/labelToggle":{
			properties:[{name:"label",text:"标签",path:"label/text()"}],
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/labelEdit/labelEdit");
			}
		}
	}
	
	return {
		webIdeEx:webIdeEx,
		quickIdeEx:quickIdeEx,
		'$UI/system/components/justep/labelEdit/labelEdit' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelInput' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelOutput' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelSelect' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelTextarea' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelRadioGroup' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelCheckboxGroup' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelToggle' : LabelEdit
	};
});