define(function(require) {
	var $ = require('jquery');
	var Browser = require('$UI/system/lib/base/browser');
	var MsgDialog = require("$UI/system/components/justep/messageDialog/messageDialog");
	var store = require('$UI/system/lib/base/store');
	require("cordova!cordova-plugin-app-version");
	require("cordova!cordova-plugin-inappbrowser");
	require("cordova!cordova-plugin-x-toast");
	require("cordova!cordova-plugin-spinner-dialog");

	var parentNode = $('body').find('.window').get(0);

	var VersionChecker = function() {
		this.env = "browser";
		if (Browser.isX5App) {
			if (Browser.isAndroid) {
				this.env = "androidApp";
			}
			if (Browser.isIOS) {
				this.env = "iosApp";
			}
		}
		// this.env = "androidApp";

		this.versionMsg = new MsgDialog({
			parentNode : parentNode
		});
		var $domNode = this.versionMsg.$domNode;
		$domNode.find('.Yes').text('更新');
		$domNode.find('.No').text('忽略');
		this.versionMsg.on('onYes', function(event) {
			// 下载
			this.download();
		}, this);
		this.versionMsg.on('onNo', function(event) {
			// 忽略
			this.ignore();
		}, this);
		this.resourceInfo = window.__justep.versionInfo.resourceInfo;
		this.appInfo = window.__justep.versionInfo.appInfo;
	};

	VersionChecker.prototype.check = function() {
		if (this.resourceInfo) {
			if (this.resourceInfo.resourceUpdateMode == "md5") {
				this.checkResourceMd5();
			} else {
				this.checkResourceVersion();
			}
		}
		if (this.appInfo) {
			this.checkAppVersion();
		}
	};

	VersionChecker.prototype.getLocalResourceMd5 = function() {
		var dfd = $.Deferred();
		var __getMd5 =function(){
			$.ajax({
				url:require.toUrl("$UI/resourceMd5.json"),
				async:true,
				method:"get"
			}).done(function(result){
				if(result.curMd5){
					dfd.resolve(result.curMd5);
				}
				dfd.resolve("");
			}).fail(function(){
				dfd.resolve("");
			});
		};
		if(navigator.appUtils){
			navigator.appUtils.getLocalResourceMd5(function(localMd5) {
				if(localMd5){
					dfd.resolve(localMd5);
				}else{
					__getMd5();
				}
			},function(){
				__getMd5();
			});
		}else{
			var localMd5 = store.get("justep_resource_md5");
			if (localMd5) {
				dfd.resolve(localMd5);
			}else{
				__getMd5();
			}
		}
		return dfd.promise();
	};

	VersionChecker.prototype.checkResourceMd5 = function() {
		try {
			var versionInfo = window.__justep.versionInfo;
			var resourceDownloadUrl = versionInfo.resourceInfo.downloadURL;
			var mode = versionInfo.resourceInfo.mode;
			var curMd5 = versionInfo.resourceInfo.curMd5;
			var preMd5 = versionInfo.resourceInfo.preMd5;
			var indexUrl = versionInfo.resourceInfo.indexPageURL;
			this.getLocalResourceMd5().done(function(localMd5) {
				var isNewVersion = true;
				if (localMd5 == curMd5 || (localMd5 == "" && preMd5 == "")) {
					isNewVersion = false;
				}
				if (navigator.appUtils) {
					if (localMd5 == preMd5) {
						resourceDownloadUrl = resourceDownloadUrl.replace("www.zip", "www_update.zip");
					}
					if (versionInfo.resourceInfo
						&& versionInfo.resourceInfo.indexURL) {
						if (isNewVersion) {
							var asyncUpdate = (mode === "1");

							if(!asyncUpdate){
								window.plugins.spinnerDialog.show("资源更新","正在进行资源更新,请稍后...",true);
							}
							navigator.appUtils.updateAppMd5Resource(resourceDownloadUrl).done(function() {
								navigator.appUtils.setIndexPageUrl(indexUrl);
								navigator.appUtils.setLocalResourceMd5(curMd5);
								window.plugins.spinnerDialog.hide();
								if (!asyncUpdate) {
									window.location.href = versionInfo.resourceInfo.indexPageURL;
								}
							}).fail(function(){
								window.plugins.spinnerDialog.hide();
							});
						} else {
							navigator.appUtils.setIndexPageUrl(indexUrl);
							navigator.appUtils.setLocalResourceMd5(curMd5);
						}
					}
				}else{
					store.set("justep_resource_md5",curMd5);
					if (isNewVersion) {
						if(store.get("justep_resource_reload") == true){
							store.set("justep_resource_reload",false);
						}else{
							store.set("justep_resource_reload",true);
							location.reload(true);
						}
					}else{
						store.set("justep_resource_reload",false);
					}
				}
			});




		} catch (updateError) {
		}
	};

	VersionChecker.prototype.checkResourceVersion = function() {
		try {
			if (navigator.appUtils) {
				var versionInfo = window.__justep.versionInfo;
				var resourceDownloadUrl = versionInfo.resourceInfo.downloadURL;
				var mode = versionInfo.resourceInfo.mode;
				var isNewVersion = versionInfo.resourceInfo.isNewVersion;
				var indexUrl = versionInfo.baseUrl
						+ versionInfo.resourceInfo.version
						+ versionInfo.resourceInfo.indexURL;
				if (versionInfo.resourceInfo
						&& versionInfo.resourceInfo.indexURL) {
					if (mode === "1") {
						if (isNewVersion) {
							navigator.appUtils.updateAppResource(
									resourceDownloadUrl).done(function() {
								navigator.appUtils.setIndexPageUrl(indexUrl);
							});
						} else {
							navigator.appUtils.setIndexPageUrl(indexUrl);
						}
					} else if (mode === "2") {
						navigator.appUtils.setIndexPageUrl(indexUrl);
						navigator.appUtils
								.updateAppResource(resourceDownloadUrl);
					} else if (mode === "3") {
						navigator.appUtils.setIndexPageUrl(indexUrl);
					}
				}
			}
		} catch (updateError) {
		}
	};

	VersionChecker.prototype.checkResourceVersion = function() {
		try {
			if (navigator.appUtils) {
				var versionInfo = window.__justep.versionInfo;
				var resourceDownloadUrl = versionInfo.resourceInfo.downloadURL;
				var mode = versionInfo.resourceInfo.mode;
				var isNewVersion = versionInfo.resourceInfo.isNewVersion;
				var indexUrl = versionInfo.baseUrl
						+ versionInfo.resourceInfo.version
						+ versionInfo.resourceInfo.indexURL;
				if (versionInfo.resourceInfo
						&& versionInfo.resourceInfo.indexURL) {
					if (mode === "1") {
						if (isNewVersion) {
							navigator.appUtils.updateAppResource(
									resourceDownloadUrl).done(function() {
								navigator.appUtils.setIndexPageUrl(indexUrl);
							});
						} else {
							navigator.appUtils.setIndexPageUrl(indexUrl);
						}
					} else if (mode === "2") {
						navigator.appUtils.setIndexPageUrl(indexUrl);
						navigator.appUtils
								.updateAppResource(resourceDownloadUrl);
					} else if (mode === "3") {
						navigator.appUtils.setIndexPageUrl(indexUrl);
					}
				}
			}
		} catch (updateError) {
		}
	};

	VersionChecker.prototype.checkAppVersion = function() {
		var self = this;
		if (window.cordova && cordova.getAppVersion) {
			cordova.getAppVersion
					.getVersionNumber(function(currentVersion) {
						if (self.appInfo[self.env]
								&& self.versionCompare(currentVersion,
										self.appInfo[self.env].version)
								&& window.localStorage
								&& localStorage.getItem('versionIgnore') !== self.appInfo[self.env].version) {
							self.versionMsg.show({
								type : "YesNoCancel",
								title : "版本更新",
								message : self.appInfo[self.env].changeLog
							});
						}
					});
		}
	};

	VersionChecker.prototype.versionCompare = function(currentVersion,
			newVersion) {
		if (currentVersion && newVersion) {
			var currVerArr = currentVersion.split(".");
			var newVerArr = newVersion.split(".");
			var len = Math.max(currVerArr.length, newVerArr.length);
			for (var i = 0; i < len; i++) {
				var newVal = ~~newVerArr[i], curVal = ~~currVerArr[i];
				if (newVal < curVal) {
					return false;
				} else if (newVal > curVal) {
					return true;
				}
			}
		}
		return false;
	};

	VersionChecker.prototype.download = function() {
		window.open(this.appInfo[this.env].downloadURL, '_system');
	};

	VersionChecker.prototype.ignore = function() {
		if (window.localStorage) {
			localStorage.setItem('versionIgnore',
					this.appInfo[this.env].version);
		}
	};

	return new VersionChecker();
});