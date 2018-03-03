/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTWindowDialog = require("../windowDialog");
	require('css!./css/windowDialog').load();
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	}

	var dialog = RTWindowDialog.extend({
		init : function(value, bindingContext) {
			create(this, 'x-window-dialog');
			this.callParent(value, bindingContext);
		},
		editMapping : function(config){
			var src = xuiDoc.get(this,"src");
			if(!src){
				alert("请先设置src属性");
				return;
			}
			var self = this;
			xuiService.openPage("$UI/system/components/justep/windowDialog/designer/editMapping.w", {
				title : "编辑Mapping",
				xml : config.nodeXml,
				modelRoot : config.modelRoot,
				src: src,
				height: '80%',
				width: '80%'
			}, function(result) {
				xuiDoc.replaceChild(self, result.mapping, {
					xpathCondition : "*[local-name()='result']",
					jqCondition : "result",
					paintComponent : false
				});
			});
		}
	});
	
	var quickIdeEx = {			
			"$UI/system/components/justep/windowDialog/windowDialog":{
				properties:["xid",{name:'src',editor:'pageUrlEditor'},"title","showTitle","status",{name:"forceRefreshOnOpen",text:"打开刷新窗口"},{name:"width",text:"宽,支持%"},
		            {name:"height",text:"高,支持%"},{name:"top",text:"上偏移,支持%,缺省居中"},
		            {name:"left",text:"左偏移,支持%,缺省居中"},{name:"routable",text:"使用路由"},{name:"resizable",text:"允许调整大小"}],
				events:["onLoad","onOpen","onClose","onSend","onReceive","onReceived"],
				toolbar:[{text:"设置数据映射",method:"editMapping"}],
		        operations:function(){
		        	return [{groupName:"页面对话框",
		        		items:[{name:'open',label:"打开",argExtends:{option:{editor:'jsExpressionEX'}}},
		        		       {name:'close',label:"关闭"}
		        		]}];
		        }
	}};

	return {
		'$UI/system/components/justep/windowDialog/windowDialog' : dialog,
		quickIdeEx:quickIdeEx
	};
});