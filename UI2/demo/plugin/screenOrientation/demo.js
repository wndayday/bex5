define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-screen-orientation");
	var utils = require("$UI/demo/plugin/utils");
	var base=require("$UI/system/api/native/base");
	var setState=require("$UI/demo/plugin/disabled")

	var Model = function(){
		this.callParent();
		this.wx=base.getWx();
	};
	//竖屏模式
	Model.prototype.portraitClick = function(event){
		cordova.plugins.screenorientation.setOrientation('portrait');
	};
	//横屏模式
	Model.prototype.landscapeClick = function(event){
		cordova.plugins.screenorientation.setOrientation('landscape');
	};
	//屏幕方向解锁
	Model.prototype.unlockClick = function(event){
		cordova.plugins.screenorientation.setOrientation('unlocked');
	};
	//获取当前屏幕方向
	Model.prototype.currentClick = function(event){
		setTimeout(function(){
			alert("当前屏幕方向: " + JSON.stringify(window.screen.orientation));
		});
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "portraitClick");
		utils.showCode(this, "landscapeClick");
		utils.showCode(this, "unlockClick");
		utils.showCode(this, "currentClick");
		utils.prettyPrint();
	};
	Model.prototype.modelLoad = function(event){
			if(this.wx){
			setState.state(".screen-content",".a-screen");
		}
	};
	return Model;
});