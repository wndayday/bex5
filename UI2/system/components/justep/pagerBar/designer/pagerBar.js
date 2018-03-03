/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Bar = require("../pagerBar");
	require('css!./pagerBar').load();
	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		},
		emptyLabel: '(状态信息)'
	});
	var webIdeEx = {
			"$UI/system/components/justep/pagerBar/pagerBar":{
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('param'),designer.getCommonStyleItem('position'),                                                    
					    	];
				}
			}
	}
	
	var quickIdeEx = {
			"$UI/system/components/justep/pagerBar/pagerBar":{
				properties:["xid",{name:"data",editor:"contextComponent","editor-parameter":"data"}],
			}
	}
	
	return {'$UI/system/components/justep/pagerBar/pagerBar':cls,webIdeEx:webIdeEx,quickIdeEx:quickIdeEx};
});