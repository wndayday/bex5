/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
    var xuiDoc = xuiService.getXuiDoc();
	var form = require("../form");
	require('css!./css/form').load();
	
	var form = form.extend({
		init : function() {
			this.domNode.removeAttribute("tabIndex");
			$(">div>*",this.domNode).attr("d_resizable",false);
			$(".form-group",this.domNode).attr("d_resizable",false);
			$(".form-group>*",this.domNode).attr("d_canMove",false).attr("d_resizable",false);
		},
		
		addFormGroup : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form(bootstrap)#formGroup(bootstrap)",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		}
	});

	var formGroup = ViewComponent.extend({
		init : function() {
			this.domNode.removeAttribute("tabIndex");
			$(this.domNode).attr("d_resizable",false);
			//$(".form-group",this.domNode).attr("d_resizable",false);
			$(">*",this.domNode).attr("d_canMove",false).attr("d_resizable",false);
		},
		
		addFormGroup : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form(bootstrap)#formGroup(bootstrap)",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		},
		
		addCol : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form(bootstrap)#col(bootstrap)",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		},
		
		addControlLabel : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/controlLabel/controlLabel(bootstrap)",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		
		}
	});

	var formGroupCol = ViewComponent.extend({
		addFormGroup : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form(bootstrap)#formGroup(bootstrap)",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		},
		
		addControlLabel : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/controlLabel/controlLabel(bootstrap)",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		
		}
	});

	var quickIdeEx = {
			"$UI/system/components/bootstrap/form/form(bootstrap)":{
				toolbar:[{text:"添加formGroup",method:"addFormGroup"}],
				styleConfig:function(designer){
					return [
					   	    {
					   			text : '排列方式',
					   			noLabel : false,//显示标签
					   			isGroup:true,
					   			
					   			//可选数据
					   			items : [{
					   				name : '排列方式',
					   				noLabel : true,//不显示标签
					   				selectMode:"1", //选中无状态变化
					   				//可选数据
					   				optionData : [{propName : "class",value : "form-horizontal",text : "<button class='btn btn-success btn-sm' style='margin:6px'> 水平布局</button>"
					   				},{propName : "class",value : "form-vertical",text : "<button class='btn btn-success btn-sm' style='margin:6px'>垂直布局</button>"},
					   				{propName : "class",value : "form-inline",text : "<button class='btn btn-success btn-sm' style='margin:6px'>行内布局</button>"},
					   				{propName : "class",value : "form-search",text : "<button class='btn btn-success btn-sm' style='margin:6px'>搜索表单</button>"},],
					   				editor : "listEditor"
					   			} ]
					   		},
					   		designer.getCommonStyleItem('baseStyle'),
					   		designer.getCommonStyleItem('position')
					   	];
				}
			},
			"$UI/system/components/bootstrap/form/form(bootstrap)#formGroup(bootstrap)":{
				toolbar:[{text:"添加列",method:"addCol"}],
				styleConfig:function(designer){
					return [
					   	    {
					   			text : '排列方式',
					   			noLabel : false,//显示标签
					   			isGroup:true,
					   			
					   			//可选数据
					   			items : [{
					   				name : '排列方式',
					   				noLabel : true,//不显示标签
					   				selectMode:"1", //选中无状态变化
					   				//可选数据
					   				optionData : [{propName : "class",value : "form-horizontal",text : "<button class='btn btn-success btn-sm' style='margin:6px'> 水平布局</button>"
					   				},{propName : "class",value : "form-vertical",text : "<button class='btn btn-success btn-sm' style='margin:6px'>垂直布局</button>"},
					   				{propName : "class",value : "form-inline",text : "<button class='btn btn-success btn-sm' style='margin:6px'>行内布局</button>"},
					   				{propName : "class",value : "form-search",text : "<button class='btn btn-success btn-sm' style='margin:6px'>搜索表单</button>"},],
					   				editor : "listEditor"
					   			} ]
					   		},
					   		designer.getCommonStyleItem('pull'),
					   		designer.getCommonStyleItem('baseStyle'),
					   		designer.getCommonStyleItem('position')
					   	];
				}
			},
			"$UI/system/components/bootstrap/form/form(bootstrap)#col(bootstrap)":{
				toolbar:[{text:"添加formGroup",method:"addFormGroup"},{text:"添加controlLabel",method:"addControlLabel"}],
				styleConfig:function(designer){
					return [
					        {
					        	text : '小(≥768px)屏幕',
					        	noLabel : false,//显示标签
					        	isGroup:true,
					        	items : [{
					        		name : 'class',
					        		noLabel : true,//不显示标签
					        		//可选数据
					        		optionData : [{propName : "class",value : "col-sm-1",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>1/12</button>"},
					        		              {propName : "class",value : "col-sm-2",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>2/12</button>"},
					        		              {propName : "class",value : "col-sm-3",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>3/12</button>"},
					        		              {propName : "class",value : "col-sm-4",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>4/12</button>"},
					        		              {propName : "class",value : "col-sm-5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>5/12</button>"},
					        		              {propName : "class",value : "col-sm-6",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>6/12</button>"},
					        		              {propName : "class",value : "col-sm-7",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>7/12</button>"},
					        		              {propName : "class",value : "col-sm-8",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>8/12</button>"},
					        		              {propName : "class",value : "col-sm-9",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>9/12</button>"},
					        		              {propName : "class",value : "col-sm-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>10/12</button>"},
					        		              {propName : "class",value : "col-sm-11",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>11/12</button>"},
					        		              {propName : "class",value : "col-sm-12",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>12/12</button>"}],
					        		              editor : "listEditor"
					        	}]
},						   designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('font')
						   ];
				}
			}
	}
	return {
		'$UI/system/components/bootstrap/form/form(bootstrap)' : form,
		'$UI/system/components/bootstrap/form/form(bootstrap)#formGroup(bootstrap)' : formGroup,
		'$UI/system/components/bootstrap/form/form(bootstrap)#col(bootstrap)' : formGroupCol,
		quickIdeEx:quickIdeEx
	};
});