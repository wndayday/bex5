define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!de.appplant.cordova.plugin.background-mode");
	require("cordova!de.appplant.cordova.plugin.badge");
	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.modelLoad = function(event) {
		if(this.wx){
			justep.Util.hint("本应用暂时只支持android和ios平台");
		}
		var timer;
		document.addEventListener('deviceready', function() {
			cordova.plugins.backgroundMode.onactivate = function() {
				var counter = 0;
				timer = setInterval(function() {
					counter++;
					console.log('Running since ' + counter + ' sec');
					if (device.platform != 'Android') {
						cordova.plugins.notification.badge.set(counter);
					}
					if (counter % 15 === 0) {
						cordova.plugins.backgroundMode.configure({
							text : 'Running since ' + counter + ' sec'
						});
					}
				}, 1000);
			};
			cordova.plugins.backgroundMode.ondeactivate = function() {
				clearInterval(timer);
				cordova.plugins.notification.badge.clear();
			};
		}, false);
	};

	Model.prototype.isEnableClick = function(event) {
		if(this.wx){
			return;
		}else {
			this.showMessage("isEnable : " + cordova.plugins.backgroundMode.isEnabled());
		}
		
	};

	Model.prototype.showMessage = function(message) {
		justep.Util.hint(message);
	}

	Model.prototype.enableClick = function(event) {
		if(this.wx){
			return;
		}else{
			cordova.plugins.backgroundMode.enable();
			this.showMessage("设置成功！");
		}
	};

	Model.prototype.disableClick = function(event) {
	if(this.wx){
			return;
		}else{
			cordova.plugins.backgroundMode.disable();
			this.showMessage("设置成功！");
		}
	};

	Model.prototype.configure1Click = function(event) {
		if(this.wx){
			return;
		}else{
			this.comp("messageDialog").show({
				callback : function(evt) {
					if (evt.button === "ok") {
						
						cordova.plugins.backgroundMode.setDefaults({
							text : evt.input
						});
					}
				}
			});
		}

	};

	Model.prototype.configure2Click = function(event) {
		if(this.wx){
			return;
		}else{
			var resume = !cordova.plugins.backgroundMode.getDefaults().resume;
			cordova.plugins.backgroundMode.configure({
				resume : resume
			});
			this.showMessage("设置成功！");
		}
	};

	Model.prototype.configSilentClick = function(event) {
		if(this.wx){
			return;
		}else{
			cordova.plugins.backgroundMode.configure({
				silent : true
			});
			this.showMessage("设置成功！");
		}
	};

	return Model;
});