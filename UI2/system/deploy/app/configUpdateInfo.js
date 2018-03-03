define(function(require) {
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
	var bind = require("bind");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		var config = this.appEngine.getConfig();
		if (this.getParent().edit) {
			this.comp("resourceDownloadURL").val(config.resourceDownloadURL);
			this.comp("resourceAppVersion").val(config.resourceAppVersion);
			this.comp("androidChangeLog").val(config.androidChangeLog);
			this.comp("androidDownloadURL").val(config.androidDownloadURL);
			this.comp("iosChangeLog").val(config.iosChangeLog);
			this.comp("iosDownloadURL").val(config.iosDownloadURL);

		}
		var hash = config.hash ? config.hash : this.appEngine.DEFAULT_HASH;

		if (hash === 'md5' && (config.mode == '1' || config.mode == '2')) {
			this.comp("updateModeGroup").val('md5');
			this.comp("resourceVersion").val('');
			this.comp("resourceVersion").$domNode.attr("readonly", true);
		} else {
			this.comp("updateModeGroup").val('version');
			this.comp("resourceVersion").val(config.resourceVersion ? config.resourceVersion : "");
			this.comp("resourceVersion").$domNode.attr("readonly", false);
		}
	};

	Model.prototype.getTitle = function(wizard) {
		return '配置更新信息';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.validate = function() {
		return true;
	};

	Model.prototype.nextPage = function(wizard) {
		if (this.validate()) {
			var config = this.appEngine.getConfig();

			config.resourceVersion = this.comp("resourceVersion").val();
			config.resourceDownloadURL = this.comp("resourceDownloadURL").val();
			config.resourceAppVersion = this.comp("resourceAppVersion").val();
			config.androidChangeLog = this.comp("androidChangeLog").val();
			config.androidDownloadURL = this.comp("androidDownloadURL").val();
			config.iosChangeLog = this.comp("iosChangeLog").val();
			config.iosDownloadURL = this.comp("iosDownloadURL").val();
			config.hash = this.comp("updateModeGroup").val();

			this.getParent().openPage({
				id : "appInfo",
				url : "$UI/system/deploy/app/appInfo.w",
				fromId : "configUpdateInfo",
			});
		}
	};

	Model.prototype.updateModeGroupChange = function(event) {
		var config = this.appEngine.getConfig();
		var hash = event.source.val();
		
		if (this.appEngine.webIDE && hash === 'md5') {
			this.comp("updateModeGroup").val('version');
			this.comp("resourceVersion").val(config.resourceVersion ? config.resourceVersion : "");
			this.comp("resourceVersion").$domNode.attr("readonly", false);
			alert('只支持version模式！');
			return;
		}
		if (hash === 'md5' && (config.mode == '1' || config.mode == '2')) {
			this.comp("updateModeGroup").val(hash);
			this.comp("resourceVersion").val('');
			this.comp("resourceVersion").$domNode.attr("readonly", true);
		} else {
			if (hash === 'md5') {
				alert('Hash方式支持模式1、模式2；当前的选择是模式' + config.mode);
			}
			this.comp("updateModeGroup").val('version');
			this.comp("resourceVersion").val(config.resourceVersion ? config.resourceVersion : "");
			this.comp("resourceVersion").$domNode.attr("readonly", false);
		}
	};

	return Model;

});
