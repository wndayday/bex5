/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require('css!./css/request').load();
	
	//var justep = require("$UI/system/lib/justep");
	//var bind = require("bind");
	//var Component = require("$UI/system/lib/base/component");
	var RTRequest = require("$UI/system/components/justep/request/request");
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	//var xuiDoc = xuiService.getXuiDoc();
	
	var create = function (comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz).removeClass('hide');
	};
	
	var Request = RTRequest.extend({
		constructor : function(config) {
			if (config && config.templateNode) {
				this._bind(config.templateNode);
			}
			this.callParent(config);
		},
		init : function(value, bindingContext) {
			create(this, 'x-request-designer');
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "dataExpr":
			case "headersExpr":
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/request/request":{
				properties:[{name:'label',text:'标签'},
				            "url",
				            "type",
				            "dataType",
				            "dataExpr",
				            "contentType",
							"async",
							"cache",
							"headersExpr",
							"processData",
							"timeout"
							],
				events:[{name:"onBeforeRequest",text:"请求前",editor:"eventEditor",noLabel:true},
				        {name:"onSuccess",text:"请求成功",editor:"eventEditor",noLabel:true},
				        {name:"onError",text:"请求失败",editor:"eventEditor",noLabel:true}],			
				//操作配置
				operations:function(){
					return [
					         {
					        	groupName:"请求",
					        	items:[ 
		                           {name:'sendRequest',label:"发送请求",argExtends:{options:{editor:'jsExpressionEX'}}},
		                           {name:'setRequestOption',label:"设置请求参数",argExtends:{cfg:{editor:'jsExpressionEX'}}}
	                           ]
					         }
	                ];
				}
			}
	};
	return {
		'$UI/system/components/justep/request/request' : Request,quickIdeEx:quickIdeEx
	};
});