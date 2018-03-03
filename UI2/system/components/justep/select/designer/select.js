/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var RTSelect = require("../select");
	var RTRadioGroup = require("../radioGroup");
	var RTCheckboxGroup = require("../checkboxGroup");
	var RTRadio = require("$UI/system/components/justep/button/radio");
	var RTCheckbox = require("$UI/system/components/justep/button/checkbox");
	var RTRadioGroupPC = require("../radioGroupPC");
	var RTCheckboxGroupPC = require("../checkboxGroupPC");
	var RTRadioPC = require("$UI/system/components/justep/button/radioPC");
	var RTCheckboxPC = require("$UI/system/components/justep/button/checkboxPC");
	var _Select = RTSelect.extend({
		doInit : function(value, bindingContext, allBindings) {
		},
		doUpdate : function(value, bindingContext, allBindings) {
		}
	});

	function createGroup(group, clz) {
		// window.setTimeout(function() {debugger;
		group.$domNode = $(group.domNode);
		new clz({
			parentNode : group.domNode,
			label : 'item1'
		});
		new clz({
			parentNode : group.domNode,
			label : 'item2'
		});
		var cfg = Util.attr2js(group.$domNode, [ 'itemStyle', 'itemClass']);
		if (cfg)
			group.set(cfg);
		// },1000);
	}

	var _RadioGroup = RTRadioGroup.extend({
		init : function(value, bindingContext) {
			createGroup(this, RTRadio);
			this.callParent(value, bindingContext);
		}
	});

	var _CheckboxGroup = RTCheckboxGroup.extend({
		init : function(value, bindingContext) {
			createGroup(this, RTCheckbox);
			this.callParent(value, bindingContext);
		}
	});

	var _RadioGroupPC = RTRadioGroupPC.extend({
		init : function(value, bindingContext) {
			createGroup(this, RTRadioPC);
			this.callParent(value, bindingContext);
		}
	});

	var _CheckboxGroupPC = RTCheckboxGroupPC.extend({
		init : function(value, bindingContext) {
			createGroup(this, RTCheckboxPC);
			this.callParent(value, bindingContext);
		}
	});

	var quickIdeEx = {
			"$UI/system/components/justep/select/select":{
				properties:["bind-ref","bind-labelRef","autoLoad","bind-options","bind-optionsCaption","bind-optionsValue","bind-optionsLabel"],
				events:[{name:"onChange",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
						     designer.getCommonStyleItem('input-size'),designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('font'),designer.getCommonStyleItem('position')
						 	];
				}
			},
			"$UI/system/components/justep/select/radioGroup":{
				properties:["bind-ref","bind-itemset","bind-itemsetValue","bind-itemsetLabel"],
				events:["onChange"],
				styleConfig:function(designer){
					return [
					  	     designer.getCommonStyleItem('radio-group-size'),		
					  	     designer.getCommonStyleItem('radio-group-ext'),
					 		designer.getCommonStyleItem('radio-group-color'),
					  	     {
					   			text : '排列样式',
					      			noLabel : false,//显示标签
					      			isGroup:true,
					      			
					      			//可选数据
					      			items : [{
					      				name : 'class',
					      				noLabel : true,//不显示标签
					      				selectMode:"1", //选中无状态变化
					      				//可选数据
					      				optionData : [
					      				   {propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>水平布局</button>"},           
					      				   {propName : "class",value : "x-radio-group-vertical",text : "<button class='btn btn-success' style='margin:6px'>垂直布局</button>"}
					      				],
					      				editor : "listEditor"
					      			} ]
					      		},designer.getCommonStyleItem('position')

					  	];
				}
			},
			"$UI/system/components/justep/select/checkboxGroup":{
				properties:["bind-ref","bind-itemset","bind-itemsetValue","bind-itemsetLabel"],
				events:["onChange"],
				styleConfig:function(designer){
					return [
							designer.getCommonStyleItem('checkbox-group-size'),
							designer.getCommonStyleItem('checkbox-group-ext'),
							designer.getCommonStyleItem('checkbox-group-color'),
					   	     {
					    			text : '排列样式',
					       			noLabel : false,//显示标签
					       			isGroup:true,
					       			//可选数据
					       			items : [{
					       				name : 'class',
					       				noLabel : true,//不显示标签
					       				selectMode:"1", //选中无状态变化
					       				//可选数据
					       				optionData : [
					       				   {propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>水平布局</button>"},
					       				   {propName : "class",value : "x-checkbox-group-vertical",text : "<button class='btn btn-success' style='margin:6px'>垂直布局</button>"}
					       				],
					       				editor : "listEditor"
					       			} ]
					       		},designer.getCommonStyleItem('position')
					   	];
				}
			},
			"$UI/system/components/justep/select/radioGroupPC":{
				properties:["bind-ref","bind-itemset","bind-itemsetValue","bind-itemsetLabel"],
				events:["onChange"],
				styleConfig:function(designer){
					return [
					   	     {
				    			text : '排列方式',
				       			noLabel : false,//显示标签
				       			isGroup:true,
				       			//可选数据
				       			items : [{
				       				name : 'class',
				       				noLabel : true,//不显示标签
				       				selectMode:"1", //选中无状态变化
				       				//可选数据
				       				optionData : [
				       				   {propName : "class",value : "form-inline",text : "<button class='btn btn-success' style='margin:6px'>水平布局</button>"},
				       				   {propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>垂直布局</button>"}
				       				],
				       				editor : "listEditor"
				       			} ]
					   		},designer.getCommonStyleItem('position')
					   	];
				}
			},
			"$UI/system/components/justep/select/checkboxGroupPC":{
				properties:["bind-ref","bind-itemset","bind-itemsetValue","bind-itemsetLabel"],
				events:["onChange"],
				styleConfig:function(designer){
					return [
					  	     {
				    			text : '排列方式',
				       			noLabel : false,//显示标签
				       			isGroup:true,
				       			//可选数据
				       			items : [{
				       				name : 'class',
				       				noLabel : true,//不显示标签
				       				selectMode:"1", //选中无状态变化
					       			//可选数据
					       			optionData : [
					       			   {propName : "class",value : "form-inline",text : "<button class='btn btn-success' style='margin:6px'>水平布局</button>"},
					       			   {propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>垂直布局</button>"}
					       			],
					       			editor : "listEditor"
					       		} ]
					      	},designer.getCommonStyleItem('position')
					  	];
				}
			}
	};
	return {
		'$UI/system/components/justep/select/select' : _Select,
		"$UI/system/components/justep/select/radioGroup" : _RadioGroup,
		"$UI/system/components/justep/select/checkboxGroup" : _CheckboxGroup,
		"$UI/system/components/justep/select/radioGroupPC" : _RadioGroupPC,
		"$UI/system/components/justep/select/checkboxGroupPC" : _CheckboxGroupPC,
		quickIdeEx:quickIdeEx
	};
});