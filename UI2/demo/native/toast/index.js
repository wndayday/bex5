define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	var warning=require("$UI/demo/plugin/warning");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-x-toast");

	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
		this.onSuccess = function(msg) {
			justep.Util.hint("Toast shown: "+msg);
		}
		this.onError = function(msg) {
			justep.Util.hint("Toast error: "+msg);
		}
	};

	Model.prototype.modelLoad = function(event){
		if(this.wx){
			
			warning.onAlert();
		}
	};
	Model.prototype.showToastClick = function(event) {
		if(this.wx){
			warning.onAlert();
		}else {
			window.plugins.toast.show("this is a test letter", "long", "center",this.onSuccess,this.onError);
		}
	};

	Model.prototype.hiddenToastClick = function(event) {
		if(this.wx){
			warning.onAlert();
		}else {
			window.plugins.toast.hide(this.onSuccess,this.onError);
		}
	};

	Model.prototype.tweakvpositionClick = function(event){
		if(this.wx){
			warning.onAlert();
		}else {
			window.plugins.toast.showWithOptions({
				message : "hey here",
				duration : "short",//持续时间
				position : "bottom",//显示位置
				addPixelsY : -40//缺省为0
			},this.onSuccess,this.onError);
		}
	};


	return Model;
});