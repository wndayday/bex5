/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var Bar = require("../toolBar");
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	require('css!./toolBar').load();
	
	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		},
		selectOperation:function(config){
			var did = config.d_id;
			xuiService.openPage("$UI/system/components/designerCommon/propEdtorPages/operationSelector/operationSelector.w", {
				title : "选择操作",
				multiselect: true,
				xml : config.nodeXml
			}, function(result) {
				result = eval("("+result+")");
				if(!$.isArray(result)) result = [result];
				//批量创建btn
				var btns = [];
				$.each(result,function(i,v){
					var $div = $(XML.fromString("<div/>").documentElement);
			        $div.append(" <a component=\"$UI/system/components/justep/button/button\" class=\"btn btn-link btn-icon-left\" > "+
	                  "         <i/>  "+
	                  "         <span></span> "+
	                  "       </a>  ");
			        $div.children("a").attr("onClick",JSON.stringify(v));
			        var template = $div.html();
			        $div.remove();
					btns.push({
						componentName : "$UI/system/components/justep/button/button",
						parentElementId : did,
						paintComponent : true,
						templateContent : template
					});
				});
				if(btns.length>0)
					xuiDoc.batchCreateComponent(btns, function() {
						//xuiDoc.repaintComponent(did);
					});
			});
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/toolBar/toolBar":{
				//canAddChild:false,//不能直接添加子组件
				toolbar:[{text:"添加操作",method:"selectOperation"}],
				styleConfig:function(designer){
					return [
					        {
								text : '分割线',
								noLabel : false,//不显示标签
								isGroup:true,
								
								//可选数据
								items : [ {
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : 
										[{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>无</button>"},
										 {propName : "class",value : "x-toolbar-spliter",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>分割线</button>"}
										],
										editor : "listEditor"
									} ]
							},
					  	    designer.getCommonStyleItem('font'),
					  	    designer.getCommonStyleItem('baseStyle'),
					  	    designer.getCommonStyleItem('border'),
					  	    designer.getCommonStyleItem('position')
					   	];
				}
		}
	};

	return {'$UI/system/components/justep/toolBar/toolBar': cls,quickIdeEx:quickIdeEx};
});