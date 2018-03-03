/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var WindowContainer = require("../windowContainer");
	require('css!./css/windowContainer').load();
	
	var WindowContainerDesigner = WindowContainer.extend({
		refresh: function(){
			var e = $(this.domNode);
			var src = e.attr("src");
			e.addClass("x-window-container").text("页面文件：" + (src?src:""));
		},
		
		set: function(obj,config){ 
			if ("src" in obj){
				var e = $(this.domNode);
				var src = obj.src;
				if(config){
					src = config.value;
				}
				e.attr("src", src);
				this.refresh();
			}
		}
	});

	justep.Component.addOperations(WindowContainerDesigner, {
		'containerRefresh' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231007),//刷新
			argsDef : [{
				name : 'url',
				displayName : 'url'
			},{
				name : 'param',
				displayName : 'param'
			}],
			method : function(args) {				
			}
		}
	});
	
	var webIdeEx = {
			"$UI/system/components/justep/widgets/widgets":{
				styleConfig:function(designer){
					return [
						     designer.getCommonStyleItem('pull'),designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('param'),designer.getCommonStyleItem('position')
						 	];
				}
			}
	};
	
	var quickIdeEx = {
			"$UI/system/components/justep/windowContainer/windowContainer":{
				properties:[{name:"src"},"params",{name:"autoLoad",text:"自动加载页面"},{name:"routable",text:"使用路由"}],
				//操作配置
				operations:function(){
					return [{groupName:"子页面",
						items:[{name:'containerRefresh',label:"刷新",argExtends:{url:{label:"页面URL",editor:'pageUrlEditor'},param:{label:"参数",editor:'jsExpressionEX'}}}
							   ]}];
				},
				events:["onBeforeLoad","onLoad","onLoadError","onReceive"]
	}};
	
	return {'$UI/system/components/justep/windowContainer/windowContainer':WindowContainerDesigner,quickIdeEx:quickIdeEx,webIdeEx:webIdeEx};
});