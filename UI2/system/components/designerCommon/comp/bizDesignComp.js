/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	var BizDesignComp = justep.BindComponent.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			var isQuick = 'true'===sessionStorage.getItem("isQuick");
			if(isQuick){
				var oldAppPath = xuiDoc.get(this,'appPath');
				var appPath = sessionStorage.getItem("appPath");
				if(appPath){
					var newAppPath = appPath.replace("UI2","$UI");
					if(oldAppPath!=newAppPath) xuiDoc.set(this, {'appPath':newAppPath});//设置应用目录
					this._init(appPath);
				}
			}
		},
		_init: function(appPath){
			//var self = this;
			var url = require.toUrl("$UI/system/designer/webIde/service/bizDesignCompInit.j");
			$.ajax({
			    dataType:'json',
			    data: {
			    	"appPath": appPath,
			    	"compPath": this.compPath,
			    	"files": JSON.stringify(this.files || {})
			    },
			    type : 'POST',
			    url : url,
			    success : function(ret) {
			    	if(ret.hasNewFile && top && top.parent && top.parent.mainModel && $.isFunction(top.parent.mainModel.refreshSourceTree)) top.parent.mainModel.refreshSourceTree();//有创建组件对应的.w文件进行刷新文件树刷新
			    },
			    error : function(xhr,status,err) {
			       alert("初始化组件失败,"+[status,xhr.readyState,err]);
			    }
			});			
		}
	});
	
	return BizDesignComp;
});