define(function(require){
	var $ = require("jquery");
	require("cordova!cordova-plugin-statusbar");
	var utils = require("$UI/demo/plugin/utils");
	var base=require("$UI/system/api/native/base");
	var setState=require("$UI/demo/plugin/disabled");
	var Model = function(){
		this.callParent();
		this.wx=base.getWx();
	};
	Model.prototype.showClick = function(event){
		StatusBar.show();
	};
	Model.prototype.hideClick = function(event){
		StatusBar.hide();
	};
	Model.prototype.setBackBroundColorClick = function(event){
		StatusBar.backgroundColorByName("white");
	};
	Model.prototype.showWebViewClick = function(event){
		StatusBar.overlaysWebView(true);
	};
	Model.prototype.hideWebViewClick = function(event){
		StatusBar.overlaysWebView(false);
	};
	Model.prototype.modelModelConstructDone = function(event) {
		utils.showCode(this,"showClick").showCode("hideClick").showCode("setBackBroundColorClick").showCode("showWebViewClick").showCode("hideWebViewClick").prettyPrint();
	};
	Model.prototype.modelLoad = function(event){
		if(this.wx){
			setState.state(".bar-content",".a-statusbar");
		}
	};
	return Model;
});