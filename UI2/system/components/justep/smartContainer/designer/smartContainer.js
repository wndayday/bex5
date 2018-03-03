/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var SmartContainer = require("../smartContainer");
	
	var cls = SmartContainer.extend({
		init:function(value, bindingContext){
			debugger;
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/justep/smartContainer/smartContainer":{
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'),
					  	    designer.getCommonStyleItem('baseStyle'),
					  	    designer.getCommonStyleItem('border'),
					  	    designer.getCommonStyleItem('position'),
					  	   	];
				}
			}
	}
	return {'$UI/system/components/justep/smartContainer/smartContainer':cls,quickIdeEx:quickIdeEx};
});