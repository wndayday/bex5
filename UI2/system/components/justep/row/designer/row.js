/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	require('css!./row').load();
	var rtRow = require("../row");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	
	var Row = rtRow.extend({
		constructor: function(config){
			this.callParent();
			this.domNode = config.templateNode;
			this.domNode.componentObj = this;
			this.domNode.setAttribute("d_resizable","false");
		},
		addRowAtBefore:function(){
			var parent_d_id = $(this.domNode).parent().attr('d_id'),
				d_id = $(this.domNode).attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/row/row", parent_d_id,{paintComponent:true, before: d_id});
		},
		addRowAtAfter:function(){
			var parent_d_id = $(this.domNode).parent().attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/row/row", parent_d_id,{paintComponent:true,before:$(this.domNode).next().attr("d_id")});
		},
		addCol:function(){ 
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/row/row#col",this,{paintComponent:true});
		},
		dispose:function(){
			this.domNode.componentObj = null;
		}
	});
	
	var Col = function(config){
		this.domNode = config.templateNode;
		this.domNode.componentObj = this;
		this.domNode.setAttribute("d_canAddChild","true");
	};
	
	Col.prototype = {
		dispose:function(){
			this.domNode.componentObj = null;
		},
		
		addRow:function(){
			var parent_d_id = $(this.domNode).attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/row/row", parent_d_id,{paintComponent:true});
		},
		
		addLeftCol:function(){
			var beforeDid = $(this.domNode).attr('d_id');
			var parent_d_id = $(this.domNode).parent().attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/row/row#col",parent_d_id,{paintComponent:true,beforeDid:beforeDid});
		},
		
		addRightCol:function(){
			var beforeDid = $(this.domNode).next().attr('d_id');
			var parent_d_id = $(this.domNode).parent().attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/row/row#col",parent_d_id,{beforeDid:beforeDid,paintComponent:true});
		}
		
    };

	var webIdeEx = {
			"$UI/system/components/justep/row/row":{
				styleConfig:function(designer){
					return [{

						text : '垂直对齐方式',
						noLabel : false,//显示标签
						isGroup:true,
						
						//可选数据
						items : [ {
							name : 'class',
							noLabel : true,//不显示标签
							selectMode:"1", //选中无状态变化
							//可选数据
							optionData : [{propName : "class",value : "x-row-top",text : "<button class='btn btn-success' style='margin:6px'>顶部部对齐</button>"
							},{propName : "class",value : "x-row-center",text : "<button class='btn btn-success' style='margin:6px'>居中对齐</button>"},
							{propName : "class",value : "x-row-bottom",text : "<button class='btn btn-success' style='margin:6px'>底部对齐</button>"},
							{propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>默认</button>"}],
							editor : "listEditor"
						}]
					
					},{
						text : '响应样式',
						noLabel : false,//显示标签
						isGroup:true,
						items:[{
							name : 'class',
							noLabel : true,//不显示标签
							selectMode:"1", //选中无状态变化
							//可选数据
							optionData : [{propName : "class",value : "x-responsive-sm",text : "<button class='btn btn-success' style='margin:6px'>手机匹配</button>"
							},{propName : "class",value : "x-responsive-md",text : "<button class='btn btn-success' style='margin:6px'>平板匹配</button>"},
							{propName : "class",value : "x-responsive-lg",text : "<button class='btn btn-success' style='margin:6px'>pc端匹配</button>"},
							{propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>默认</button>"}],
							editor : "listEditor"
						}]
					},                                                            
					    designer.getCommonStyleItem('baseStyle'),
					    {
			    			id:"border",
			    			text : '边距',
			    			isGroup:true,
			    			items : [ {
				    			name:'边距',
				    			noLabel : true,//不显示标签
				    			selectMode:"0",
//				    			showMarginOrPadding:"2", //1:外边距 2：内边距  
				    			//可选数据
				    			editor : "marginEditor"
			    		}]
			    		},
			    		designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
					];
				}
			},
			"$UI/system/components/justep/row/row#col":{
				styleConfig:function(designer){
					return [
						   designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('font'),
							{
								text : '垂直对齐',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>默认</button>"},
									              {propName : "class",value : "x-col-top",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>顶端对齐</button>"},
									              {propName : "class",value : "x-col-center",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>垂直居中</button>"},
									              {propName : "class",value : "x-col-bottom",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>底端对齐</button>"}],
									              
									editor : "listEditor"
								}]
							} ,	{
								text : '尺寸样式',
								noLabel : false,//显示标签
								isGroup:true,
								items : [{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>默认</button>"},
									              {propName : "class",value : "x-col-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>10%</button>"},
									              {propName : "class",value : "x-col-20",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>20%</button>"},
									              {propName : "class",value : "x-col-25",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>25%</button>"},
									              {propName : "class",value : "x-col-33",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>33%</button>"},
									              {propName : "class",value : "x-col-50",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>50%</button>"},
									              {propName : "class",value : "x-col-67",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>67%</button>"},
									              {propName : "class",value : "x-col-75",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>75%</button>"},
									              {propName : "class",value : "x-col-80",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>80%</button>"},
									              {propName : "class",value : "x-col-90",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>90%</button>"},
									              {propName : "class",value : "x-col-fixed",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:42px'>固定</button>"}],
									editor : "listEditor"
								}]
							}, {
								text : '偏移样式',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:54px'>默认</button>"},
									              {propName : "class",value : "x-col-offset-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>10%</button>"},
									              {propName : "class",value : "x-col-offset-20",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>20%</button>"},
									              {propName : "class",value : "x-col-offset-25",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>25%</button>"},
									              {propName : "class",value : "x-col-offset-33",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>33%</button>"},
									              {propName : "class",value : "x-col-offset-50",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>50%</button>"},
									              {propName : "class",value : "x-col-offset-67",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>67%</button>"},
									              {propName : "class",value : "x-col-offset-75",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>75%</button>"},
									              {propName : "class",value : "x-col-offset-80",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>80%</button>"},
									              {propName : "class",value : "x-col-offset-90",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:50px'>90%</button>"}],
									editor : "listEditor"
								}]
								
							}                                           
						];
				}
			}
	}
	
	var  quickIdeEx = {
			"$UI/system/components/justep/row/row":{
				properties:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(ownerDesigner){ return ownerDesigner.getCompStyleItems("$UI/system/components/justep/row/row")},
				subComps:{

				}
			},
			"$UI/system/components/justep/row/row#col":{
				text:"列",
				"displayName":function(values){
					return "列";
				},
				properties:["text",{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(ownerDesigner){ return ownerDesigner.getCompStyleItems("$UI/system/components/justep/row/row#col")}
			}
	}
	return {
		"$UI/system/components/justep/row/row":Row,
		"$UI/system/components/justep/row/row#col":Col,
		quickIdeEx:quickIdeEx,webIdeEx:webIdeEx
	};
});

