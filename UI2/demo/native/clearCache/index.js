define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!at.modalog.cordova.plugin.cache");

	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.clearClick = function(event) {
		if(this.wx){
			return;
		}else {
			
			document.addEventListener('deviceready', onDeviceReady);
			function onDeviceReady() {
				var success = function(status) {
					alert('Message: ' + status);
				}
				
				var error = function(status) {
					alert('Error: ' + status);
				}
				window.cache.clear(success, error);
			}
		}
	};

	Model.prototype.modelLoad = function(event){
		if(this.wx){
			justep.Util.hint("本应用暂时只支持android和ios平台");
		}
	};

	return Model;
});