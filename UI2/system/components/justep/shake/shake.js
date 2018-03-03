/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var justep = require('$UI/system/lib/justep');
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var url = require.normalizeName("./shake");
	var ComponentConfig = require("./shake.config");
	
    var SHAKE_THRESHOLD = 800;  
    var last_update = 0;  
    var x, y, z, last_x, last_y, last_z;  
	
	var Shake = ViewComponent.extend({
		// 构造函数
		constructor : function(options) {
			//this.watchID = null;
			this._deviceMotionHandler = this.deviceMotionHandler.bind(this);  
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return $("<div componet='$UI/system/components/justep/shake/shake'></div>").attr(config);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.callParent();
		},
		dispose : function() {       //组件销毁时调用的方法，可以接管加入自定义的处理， 
/*			if (this.watchID) {
				navigator.accelerometer.clearWatch(this.watchID);
			}
*/			this.stopShake();
			this.callParent();       //如事件解除绑定，dom节点与对象直接解绑等
		},
		openShakePage: function(){
/*			if(!(justep.Browser.isX5App || justep.Browser.isWeChat)){
				justep.Util.hint("当前环境暂不支持摇一摇");
			}
			if(!(navigator.accelerometer && navigator.accelerometer.watchAcceleration)){
				this.fireEvent("onShakeFail",{});
			}else{
				var self  = this;
				if(!this.dialog){
					this.dialog = new WindowDialog({
							title : '摇一摇',
							showTitle : false,
							status: 'maximize',
							src : '$UI/system/components/justep/shake/shakePage/mainActivity.w',
							parentNode : this.$domNode.get(0)
					});
					
					this.dialog.on('onReceive',function(event){
						if(event.data.shakeSuccess){
							var randomNum = Math.round(Math.random() * 1000000);
							self.randomNum = randomNum;
							self.fireEvent("onShakeSuccess",{
								data:randomNum
							});
						}else{
							self.randomNum = null;
							self.fireEvent("onShakeFail",{
							});
						}
					});
				}
				
				this.dialog.open();
			}*/
			if (window.DeviceMotionEvent) { 
				var self  = this;
				if(!this.dialog){
					this.dialog = new WindowDialog({
							title : '摇一摇',
							showTitle : false,
							status: 'maximize',
							src : '$UI/system/components/justep/shake/shakePage/mainActivity.w',
							parentNode : this.$domNode.get(0)
					});
					
					this.dialog.on('onReceive',function(event){
						if(event.data.shakeSuccess){
							var randomNum = Math.round(Math.random() * 1000000);
							self.randomNum = randomNum;
							self.fireEvent("onShakeSuccess",{
								data:randomNum
							});
						}else{
							self.randomNum = null;
							self.fireEvent("onShakeFail",{
							});
						}
					});
				}
				var Music = new Audio(require.toUrl("./shakePage/kacha.mp3"));
				Music.volume = 0;
				Music.play();
				this.dialog.open({params: Music});
			}else{
				this.fireEvent("onShakeFail",{});
			}

		},
		//开始监听摇一摇
		startShake : function() {
			if (window.DeviceMotionEvent) { 
				window.addEventListener('devicemotion', this._deviceMotionHandler, false);  
			}else{
				this.fireEvent("onShakeFail",{});
			}
		},
	    deviceMotionHandler : function(eventData) {  
		    var curTime = new Date().getTime();  
		       
		    if ((curTime - last_update)> 300) {  
		        var diffTime = curTime - last_update;  
		        last_update = curTime;  
		       
			    var acceleration =eventData.accelerationIncludingGravity;  
		        x = acceleration.x;  
		        y = acceleration.y;  
		        z = acceleration.z;  
		       
		        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;  
		        if (speed > SHAKE_THRESHOLD) {  
			        console.log(speed);
					this.fireEvent("onShakeSuccess",{});
		        }  
		        last_x = x;  
		        last_y = y;  
		        last_z = z;  
		    }  
		},
		//停止监听摇一摇
		stopShake : function() {
			if (window.DeviceMotionEvent) { 
				window.removeEventListener('devicemotion', this._deviceMotionHandler);  
			}
		}
	});
	justep.Component.addOperations(Shake, {
		'openShakePage' : {
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.openShakePage();
			}
		},
		'startShake' : {
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.startShake();
			}
		},
		'stopShake' : {
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.stopShake();
			}
		}
	});
	Component.register(url, Shake);
	return Shake;
});