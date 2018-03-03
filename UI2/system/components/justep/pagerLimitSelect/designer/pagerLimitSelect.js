/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var parent = require("../pagerLimitSelect");

	var Cls = parent.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect":{
				properties:["xid","data","hasLabel","defaultValue","style"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('param'),designer.getCommonStyleItem('position'), 
					    	];
				}
			}
	}
	return {
		'$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect' : Cls,quickIdeEx:quickIdeEx
	};
});