/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	//var xuiDoc = xuiService.getXuiDoc();
	//var $ = require("jquery");
	var RTLocker =  require("../locker");

	var Locker = RTLocker.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
			if ($.inArray(key,["R","ringColor","fillColor","lineColor","pointColor","SuccessLineColor","SuccessPointColor","ErrorLineColor","ErrorPointColor"])>=0) {
				this.clear();
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/locker/locker":{
				properties:["xid","mode","password","R","ringColor","fillColor","lineColor","pointColor","SuccessLineColor","SuccessPointColor","ErrorLineColor","ErrorPointColor"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('pull'),
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				},
				//操作配置
				operations:function(){
					return [
					         {
					        	groupName:"手势密码",
					        	items:[ 
		                           {name:'clear'},
		                           {
		                        	   name:'setMode',
		                        	   argExtends:{mode:{editor:'jsExpressionEX'}}
		                           },
		                           {
		                        	   name:'setPassword',
		                        	   argExtends:{password:{editor:'jsExpressionEX'}}
		                           }
	                           ]
					         }
					];
				},
				events:["onInput","onCheckSuccess","onCheckError","onPasswordSuccess","onPasswordError"]
			}
	
	};

	return {
		'$UI/system/components/justep/locker/locker' : Locker,
		quickIdeEx:quickIdeEx
	};
});