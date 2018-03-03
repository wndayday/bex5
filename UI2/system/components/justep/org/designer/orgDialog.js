/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTOrgDialog = require("../orgDialog");
	var RTOrgDialogPC = require("../orgDialogPC");
	require('css!./css/orgDialog').load();

	var create = function(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	};

	var OrgDialog = RTOrgDialog.extend({
		init : function(value, bindingContext) {
			create(this, 'x-org-dialog');
			this.callParent(value, bindingContext);
		}
	});

	var OrgDialogPC = RTOrgDialogPC.extend({
		init : function(value, bindingContext) {
			create(this, 'x-org-dialog');
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/org/orgDialog":{
				properties:["xid","title","manageCodes","multiSelection","cascade",
				            {name:"includeOrgKind",text:"包含组织类型",editor:"orgKindSelector"},
				            "includeDisabled","showCommonGroup","showFilter","selectFilter"],
				events:[{name:"onLoad",text:"加载对话框"},
		                {name:"onOpen",text:"打开对话框"},
     		            {name:"onClose",text:"关闭对话框"},
	    	            {name:"onReceive",text:"接收返回数据"}],
			},
			"$UI/system/components/justep/org/orgDialogPC":{
				properties:["xid","title","showTitle","multiSelection","cascade","manageCodes",
				            {name:"includeOrgKind",text:"包含组织类型",editor:"orgKindSelector"},
				            "includeDisabled","showCommonGroup","status","rootFilter","filter",
				            "selectFilter","cacheKind","process","limit","width","height","top","left"],
				events:[{name:"onLoad",text:"加载对话框"},
				            {name:"onOpen",text:"打开对话框"},
				            {name:"onClose",text:"关闭对话框"},
				            {name:"onReceive",text:"接收返回数据"}],
/*				operations:function(){
					return [{groupName:"组织机构对话框",
						items:[
							   {id:"open",name:'open',label:'打开'},
						   ]}];
				}
*/			}
			
	};

	return {
		'$UI/system/components/justep/org/orgDialog' : OrgDialog,
		'$UI/system/components/justep/org/orgDialogPC' : OrgDialogPC,
		quickIdeEx:quickIdeEx
	};
});