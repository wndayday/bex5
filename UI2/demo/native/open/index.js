define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	var warning=require("$UI/demo/plugin/warning");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-camera");
	require("cordova!cordova-open");

	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.takePhoneClick = function(event) {
		if(this.wx){
			warning.onAlert();
		}else {
			
			var data = this.comp("data");
			function onSuccess(imageURI) {
				
				data.setValue("imageURI", imageURI);
			}
			function onFail(message) {
				justep.Util.hint("失败：" + message);
			}
			navigator.camera.getPicture(onSuccess, onFail, {
				quality : 50,
				allowEdit : true
			});
		}
	};

	Model.prototype.openFileClick = function(event) {
		if(this.wx){
			warning.onAlert();
		}else {
			
			var open = cordova.plugins.disusered.open;
			function success() {
				justep.Util.hint('Success');
			}
			function error(code) {
				if (code === 1) {
					justep.Util.hint('No file handler found');
				} else {
					justep.Util.hint('Undefined error');
				}
			}
			var imageURI = this.comp("data").val("imageURI");
			if (!imageURI) {
				justep.Util.hint("请先拍照，或者手动输入要打开的图片路径");
				return;
			}
			open(imageURI, success, error);
		}
	};

	return Model;
});