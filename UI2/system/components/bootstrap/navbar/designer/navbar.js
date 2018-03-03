/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Bar = require("../navbar");
	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/bootstrap/navbar/navbar(bootstrap)":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('param'),designer.getCommonStyleItem('position'),
					    	];
				}
			}
	};
	return {'$UI/system/components/bootstrap/navbar/navbar(bootstrap)':cls,quickIdeEx:quickIdeEx};
});