/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var ScrollSpy = require("../scrollSpy");
	
	var cls = ScrollSpy.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/bootstrap/scrollSpy/scrollSpy(bootstrap)":{
				properties:["xid",{name:"selector","default-value":"例如：[xid=\"div3\"]"}],
				styleConfig:function(designer){
					return [
						     designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('position'),
						 	];
				}
			}
	}
	return {'$UI/system/components/bootstrap/scrollSpy/scrollSpy(bootstrap)': cls,quickIdeEx:quickIdeEx};
});