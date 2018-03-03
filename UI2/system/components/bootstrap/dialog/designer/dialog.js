/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/dialog').load();
	var Dialog = require("../dialog");

	var create = function (comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	};

	var cls = Dialog.extend({
		init : function(value, bindingContext) {
			//create(this, 'x-dialog-designer');
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/dialog/dialog(bootstrap)":{
				properties:["xid"],
				//操作配置
				operations:function(){
					return [{groupName:"对话框(bootstrap)",
						items:[{name:'open',label:"打开"},
						       {name:'close',label:"关闭"},
						       {name:'toggle',label:"切换"}
							   ]}];
				}
			}
	};

	return {'$UI/system/components/bootstrap/dialog/dialog(bootstrap)': cls,quickIdeEx:quickIdeEx};
});