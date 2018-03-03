/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	 var ViewComponent = require("$UI/system/lib/base/viewComponent");
	 //var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	 //var xuiDoc = xuiService.getXuiDoc();
		
	var GridList = ViewComponent.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode.attr("d_childResizable","false").attr("d_childCanDragMove","false").attr("d_resizable","false");//
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/fragment/gridList":{
				getSubCompConfig:function(element){
					var componentName = element.getAttribute("componentname");
					//鉴别content
					if(element.parentNode && element.parentNode.parentNode && element.parentNode.parentNode.parentNode &&
							element.parentNode.parentNode.parentNode.getAttribute("component") == "$UI/system/components/fragment/gridList"){ 
						 return this.subComps[componentName];
					}
				},
				
				properties:["xid",{name:"class",text:"自定义样式",editor:"pClassSelector",noLabel:false}],
				subCompPath:">div>ul>li",
				subComps:{
					"li(html)":{
//							canSelect:false,//不能选中
							canAdd:false,//不能添加
							canRemove:false,
							compTip:function(){
								return "栅格模板";
							},
							text:"栅格模板",
							properties:[{name:"class",text:"自定义样式",editor:"pClassSelector",noLabel:false}] ,
							events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
							styleConfig:function(designer){
								return [
									  {
										text : '非常小(<768px)屏幕',
										id:"xsStyle",
										noLabel : false,//不显示标签
										isGroup:true,
										
										//可选数据
										items : [ {
											name : 'class',
											noLabel : true,//不显示标签
											//可选数据
											optionData : 
												[
												    {propName : "class",value : "",text : "<button class='btn btn-info' style='width:64px;margin:5px'>无</button>"}, 
												    {propName : "class",value : "col-xs-1",text : "<button class='btn btn-info' style='width:68px;margin:5px'>占1/12行</button>"}, 
												    {propName : "class",value : "col-xs-2",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/6行</button>"}, 
													{propName : "class",value : "col-xs-3",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/4行</button>"}, 
													{propName : "class",value : "col-xs-4",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/3行</button>"}, 
													{propName : "class",value : "col-xs-6",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/2行</button>"}, 
													{propName : "class",value : "col-xs-12",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占整行</button>"} 
												],
												editor : "listEditor"
											} ]
										},
										  {
											text : '小(≥768px)屏幕',
											id:"smStyle",
											noLabel : false,//不显示标签
											isGroup:true,
											
											//可选数据
											items : [ {
												name : 'class',
												noLabel : true,//不显示标签
												//可选数据
												optionData : 
													[
													    {propName : "class",value : "",text : "<button class='btn btn-info' style='width:64px;margin:5px'>无</button>"}, 
													    {propName : "class",value : "col-sm-1",text : "<button class='btn btn-info' style='width:68px;margin:5px'>占1/12行</button>"}, 
													    {propName : "class",value : "col-sm-2",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/6行</button>"}, 
														{propName : "class",value : "col-sm-3",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/4行</button>"}, 
														{propName : "class",value : "col-sm-4",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/3行</button>"}, 
														{propName : "class",value : "col-sm-6",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/2行</button>"}, 
														{propName : "class",value : "col-sm-12",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占整行</button>"} 
													],
													editor : "listEditor"
												} ]
											},
											  {
												text : '中(≥992px)屏幕',
												id:"mdStyle",
												noLabel : false,//不显示标签
												isGroup:true,
												
												//可选数据
												items : [ {
													name : 'class',
													noLabel : true,//不显示标签
													//可选数据
													optionData : 
														[
														    {propName : "class",value : "",text : "<button class='btn btn-info' style='width:64px;margin:5px'>无</button>"}, 
														    {propName : "class",value : "col-md-1",text : "<button class='btn btn-info' style='width:68px;margin:5px'>占1/12行</button>"}, 
														    {propName : "class",value : "col-md-2",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/6行</button>"}, 
															{propName : "class",value : "col-md-3",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/4行</button>"}, 
															{propName : "class",value : "col-md-4",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/3行</button>"}, 
															{propName : "class",value : "col-md-6",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/2行</button>"}, 
															{propName : "class",value : "col-md-12",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占整行</button>"} 
														],
														editor : "listEditor"
													} ]
												},
												  {
													text : '大(≥1200px)屏幕',
													id:"lgStyle",
													noLabel : false,//不显示标签
													isGroup:true,
													
													//可选数据
													items : [ {
														name : 'class',
														noLabel : true,//不显示标签
														//可选数据
														optionData : 
															[
															    {propName : "class",value : "",text : "<button class='btn btn-info' style='width:64px;margin:5px'>无</button>"}, 
															    {propName : "class",value : "col-lg-1",text : "<button class='btn btn-info' style='width:68px;margin:5px'>占1/12行</button>"}, 
															    {propName : "class",value : "col-lg-2",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/6行</button>"}, 
																{propName : "class",value : "col-lg-3",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/4行</button>"}, 
																{propName : "class",value : "col-lg-4",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/3行</button>"}, 
																{propName : "class",value : "col-lg-6",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占1/2行</button>"}, 
																{propName : "class",value : "col-lg-12",text : "<button class='btn btn-info' style='width:64px;margin:5px'>占整行</button>"} 
															],
															editor : "listEditor"
														} ]
													},
										designer.getCommonStyleItem('font'),
								        designer.getCommonStyleItem('border')										
								    	];
							}
					} 
				}
			}
	};
 
 
	return {"$UI/system/components/fragment/gridList":GridList,quickIdeEx:quickIdeEx};
});