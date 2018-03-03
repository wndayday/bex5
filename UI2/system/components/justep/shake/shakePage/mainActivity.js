define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	//require("$UI/system/lib/cordova/cordova");
	//require("cordova!cordova-plugin-device-motion");
	//require("cordova!cordova-plugin-media");

    var SHAKE_THRESHOLD = 800;  
    var last_update = 0;  
    var x, y, z, last_x, last_y, last_z;  

	var Model = function() {
		this.callParent();
		// 当前watchAcceleration 的引用ID
		//this.watchID = null;
		this.playing = false;
	};

	//摇一摇
	Model.prototype.modelLoad = function(event) {
		window.addEventListener('devicemotion', this.deviceMotionHandler.bind(this), false);  
/*		var lastTime = new Date();
		var lastX = null;
		var lastY = null;
		var lastZ = null;
		var threshold = 10;
		var timeout = 2500;
		var self = this;
		// 获取加速度信息成功后的回调函数
		function onSuccess(acceleration) {
				if (self.playing){
					return;
				}
		        var currentTime;
		        var timeDifference;
		        var deltaX = 0;
		        var deltaY = 0;
		        var deltaZ = 0;

		        if ((lastX === null) && (lastY === null) && (lastZ === null)) {
		            lastX = acceleration.x;
		            lastY = acceleration.y;
		            lastZ = acceleration.z;
		            return;
		        }

		        deltaX =  Math.abs(lastX - acceleration.x);
		        deltaY = Math.abs(lastY - acceleration.y);
		        deltaZ = Math.abs(lastZ - acceleration.z);
		        
		        if (((deltaX > threshold) && (deltaY > threshold)) || ((deltaX > threshold) && (deltaZ > threshold)) || ((deltaY > threshold) && (deltaZ > threshold))) {
		            currentTime = new Date();
		            timeDifference = currentTime.getTime() - lastTime.getTime();
	            	
		            if (timeDifference > timeout) {
		            	self.playAnimate();
		            	console.log('send success');
		            	self.owner.send({
		    				shakeSuccess:true
		    			});
		                lastTime = new Date();
		            };
		        }

		        lastX = acceleration.x;
		        lastY = acceleration.y;
		        lastZ = acceleration.z;

		};
		
		function onError() {
			self.owner.send({
				shakeSuccess : false
			});
		};
		this.watchID = navigator.accelerometer.watchAcceleration(onSuccess,onError, {frequency:300});
*/	};

	Model.prototype.deviceMotionHandler = function(eventData) {  
	    var acceleration =eventData.accelerationIncludingGravity;  
	    var curTime = new Date().getTime();  
		       
	    if ((curTime - last_update)> 300) {  
			if(this.playing)
				return;

	        var diffTime = curTime - last_update;  
	        last_update = curTime;  
		       
	        x = acceleration.x;  
	        y = acceleration.y;  
	        z = acceleration.z;  
		       
	        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;  
		          
	        if (speed > SHAKE_THRESHOLD) {  
           		this.playAnimate();
            	this.owner.send({
    				shakeSuccess:true
    			});
		    }  
		    last_x = x;  
		    last_y = y;  
		    last_z = z;  
		}  
	};

	//播放动画和声音
	Model.prototype.playAnimate = function() {
		//var src = window.location.origin + require.toUrl("./kacha.mp3");
		//this.mediaRec = new Media(src, function(optio) {}, function(err) {});
		//this.mediaRec.play();
		
		//播放音效
		//var Music = this.getElementByXid("audio");
		//Music.play();
		this.params.volume = 1;
		this.params.play();

		//播放动画
		var topImage = this.getElementByXid("topImage");
		var bottomImage = this.getElementByXid("bottomImage");
		var slideHeight = $(topImage).height() / 2;
		
		var me = this;
		me.playing = true;
		
		$(topImage).animate({
			top : '-' + slideHeight + 'px',
		}, "slow", openEnd);
		
		$(bottomImage).animate({
			top : '+=' + slideHeight + 'px',
		}, "slow");

		function openEnd() {
			$(topImage).animate({
				top : '0px',
			}, "slow");
			$(bottomImage).animate({
				top : '-=' + slideHeight + 'px',
			}, "slow", playEnd);
		};
		function playEnd() {
			me.playing = false;
		};
	};

	// 关闭功能
	Model.prototype.yBackBtnClick = function(event){
		this.close();
	};

	Model.prototype.modelUnLoad = function(event) {
		window.removeEventListener('devicemotion', this.deviceMotionHandler);  
/*		if (this.watchID) {
			navigator.accelerometer.clearWatch(this.watchID);
			console.log("unload:" + this.watchID);
		}
*/	};

	return Model;
});
