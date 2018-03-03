/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	require('css!./css/timer').load();

	var create = function (comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	};

	var Timer = ViewComponent.extend({
		init : function(value, bindingContext) {
			create(this, 'x-timer-designer');
			this.callParent(value, bindingContext);
		}
	});

	justep.Component.addOperations(Timer, {
		'timerStart' : {
			label : '',//开始
			argsDef : [{name:'times',displayName:justep.Message.getMessage(justep.Message.JUSTEP231149)},//触发次数
			           {name:'interval',displayName:justep.Message.getMessage(justep.Message.JUSTEP231150)}],//间隔时间
			method : function(args) {				
				return this.owner.start();
			}
		},
		'timerStop' : {
			label : '',//停止
			argsDef : [],
			method : function(args) {				
				return this.owner.stop();
			}
		},
		'timerPause' : {
			label : '',//暂停
			argsDef : [],
			method : function(args) {				
				return this.owner.pause();
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/timer/timer":{
				properties:[{name:'xid',readonly:true},"enabled","interval","times",{name:"onTimer",text:"计时器事件",editor:"eventEditor",noLabel:true},{name:"onStop",text:"计时器停止事件",editor:"eventEditor",noLabel:true}],
				//操作配置
				operations:function(){
					return [{groupName:"计时器",
						items:[{name:'timerStart',label:"计时器启动",argExtends:{times:{text:'计数次数',editor:'jsExpressionEX'},interval:{text:'间隔时间',editor:'jsExpressionEX'}}},
						       {name:'timerStop',label:"计时器停止"},
	                        	  {name:'timerPause',label:"计时器暂停"}
							   ]}];
				}
			}
	};
	
	return {
		'$UI/system/components/justep/timer/timer' : Timer,quickIdeEx:quickIdeEx
	};
});