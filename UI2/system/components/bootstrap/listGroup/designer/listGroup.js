/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	require.normalizeName("./listGroup");
	
	var ListGroup = ViewComponent.extend({
		init : function() {  
			var $domNode = $(this.domNode);  
			$(">*", $domNode).attr("d_resizable", "false");
		},
		
		addItem : function(){
			xuiDoc.createComponent("$UI/system/components/bootstrap/listGroup/listGroup(bootstrap)#gruopItem", this, {
				paintComponent : true
			});
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/listGroup/listGroup(bootstrap)":{
				properties:["xid"],
				toolbar:[{text:"添加条目",method:"addItem"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			}, 
			"$UI/system/components/bootstrap/listGroup/listGroup(bootstrap)#gruopItem":{
				properties:["text","href"],
				styleConfig:function(designer){
					return [
							{
								text : '颜色样式',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "list-group-item-default",text : "<button class='btn btn-default btn-sm' style='margin:6px;width:60px'>默认</button>"},
									              {propName : "class",value : "list-group-item-success",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>success</button>"},
									              {propName : "class",value : "list-group-item-info",text : "<button class='btn btn-info btn-sm' style='margin:6px;width:60px'>info</button>"},
									              {propName : "class",value : "list-group-item-warning",text : "<button class='btn btn-warning btn-sm' style='margin:6px;width:60px'>warning</button>"},
									              {propName : "class",value : "list-group-item-danger",text : "<button class='btn btn-danger btn-sm' style='margin:6px;width:60px'>danger</button>"}],
									              
									editor : "listEditor"
								}]
							},
							{
								text : '选中颜色',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-default btn-sm' style='margin:6px;width:60px'>默认</button>"},
									              {propName : "class",value : "active",text : "<button class='btn btn-primary btn-sm' style='margin:6px;width:60px'>active</button>"}],
									              
									editor : "listEditor"
								}]
							},
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			}
			
	};
	return {
		'$UI/system/components/bootstrap/listGroup/listGroup(bootstrap)' : ListGroup,quickIdeEx:quickIdeEx
	};
});