/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	var RTMessageDialog = require("../messageDialog");
	require('css!./css/messageDialog').load();

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	}

	var MessageDialog = RTMessageDialog.extend({
		init : function(value, bindingContext) {
			create(this, 'x-message-dialog');
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/messageDialog/messageDialog":{
				properties:["xid","title","message",{name:"inputValue",text:'输入值'},"type",{name:"width",text:'宽'}],
				//操作配置
				operations:function(){
					return [{groupName:"消息提示框",
						items:[{name:'show',label:"显示"}
							   ]}];
				}
			}
	};
	
	return {
		'$UI/system/components/justep/messageDialog/messageDialog' : MessageDialog,
		quickIdeEx:quickIdeEx
	};
});