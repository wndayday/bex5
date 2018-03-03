/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Bar = require("../bar");
	
	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/bar/bar":{
				//canAddChild:false,//不能直接添加子组件
				styleConfig:function(designer){
					return [
					  	    designer.getCommonStyleItem('font'),
					  	    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					   	];
				}
		}
	};

	return {'$UI/system/components/justep/bar/bar':cls,quickIdeEx:quickIdeEx};
});