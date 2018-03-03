/*! 
* X5 v3 (http://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!..css/list').load();
	var Component = require("../listRow1Sum");
	
	var cls = Component.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/fragment/list/listRow1Sum":{
				properties:["xid","data"],
				styleConfig:function(designer){
					return [
						      designer.getCommonStyleItem('baseStyle'),
						      designer.getCommonStyleItem('font'),
						      designer.getCommonStyleItem('border'),
						      designer.getCommonStyleItem('position'),
					];
				}
			}
	};
	
	return {'$UI/system/components/fragment/list/listRow1Sum':cls,quickIdeEx:quickIdeEx};
});