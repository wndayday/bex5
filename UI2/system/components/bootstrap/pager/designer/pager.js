/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Pager = require("../pager");
	
	var cls = Pager.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/bootstrap/pager/pager(bootstrap)":{
				properties:["xid",{name:"data",editor:"dataSelector"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('pull'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position'),
						 	];
				}
			}
	}
	return {'$UI/system/components/bootstrap/pager/pager(bootstrap)': cls,quickIdeEx:quickIdeEx};
});