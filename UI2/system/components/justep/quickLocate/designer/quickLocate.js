/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var treeLocate = require("../treeLocate");
	
	var DtreeLocate = treeLocate.extend({
		init: function(value, bindingContext){
			
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/quickLocate/treeLocate":{
				properties:["xid",{name:"data",editor:"contextComponent","editor-parameter":"data"},
				            {name:"tree",text:"过滤树形组件",editor:"contextComponent","editor-parameter":"foreach"},
				            {name:"relations",text:"过滤数据项",editor:"relationsDlg"},
				            {name:"pathRelation",text:"路径数据项",editor:"relationDlg"}],
				events:["onGetCondition"],
			}
			
	};
	
	return {'$UI/system/components/justep/quickLocate/treeLocate': DtreeLocate,quickIdeEx:quickIdeEx};
});