/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) { 
	require("$UI/system/components/justep/common/res");
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./badge");
	Component.register(url, ViewComponent);
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/badge/badge(bootstrap)":{
				properties:["xid","text"],
				styleConfig:function(designer){
					return [
						      designer.getCommonStyleItem('label-color'), designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('font'),designer.getCommonStyleItem('position'),
						  	];
				}
			}
	};
	return {"$UI/system/components/bootstrap/badge/badge(bootstrap)":ViewComponent,quickIdeEx:quickIdeEx};
});