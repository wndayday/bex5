define(function(require){
	var $ = require("jquery");
	require("cordova!cordova-plugin-brightness");
	var utils = require("$UI/demo/plugin/utils");
	var justep = require("$UI/system/lib/justep")
	var Model = function(){
		this.callParent();
	};
	Model.prototype.getBrightnessClick = function(event){
		cordova.plugins.brightness.getBrightness(function(value){
			justep.Util.hint("当前屏幕亮度" + value);
		}, function(){
			justep.Util.hint("出错");
		});
	};
	
	Model.prototype.setKeepScreenOnClick = function(event){
		cordova.plugins.brightness.setKeepScreenOn(true,function(){
			justep.Util.hint("已经设置为常亮");
		}, function(){
			justep.Util.hint("出错");
		});
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "getBrightnessClick");
		utils.showCode(this, "setClick");
		utils.showCode(this, "setKeepScreenOnClick");
	};
	Model.prototype.setClick = function(event){
		cordova.plugins.brightness.setBrightness(0.2,function(value){
			justep.Util.hint("亮度已经调整");
		}, function(){
			justep.Util.hint("出错");
		});
	};
	return Model;
});