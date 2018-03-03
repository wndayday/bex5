define(function(require) {
	var templateService = require('$UI/system/templates/common/js/templateService');
	var xpaas = require("$UI/system/deploy/paas/xpaas");

	var Model = function() {
		this.callParent();
		this.xpaas = xpaas;
	};

	var STATE = {
		"activating" : "正在唤醒",
		"active" : "正常",
		"inactive" : "正常",
		"upgraded" : "升级完毕",
		"upgrading" : "升级中",
		"restarting" : "正在重启",
		"updating-active" : "升级中",
		"finishing-upgrade" : "升级中",
		"canceled-rollback" : "取消回滚",
		"canceled-upgrade" : "取消升级",
		"canceling-rollback" : "正在取消回滚",
		"canceling-upgrade" : "正在取消升级",
		"deactivating" : "取消唤醒中",
		"registering" : "注册中",
		"removed" : "移除",
		"removing" : "移除中",
		"requested" : "请求",
		"rolling-back" : "回滚中",
		"updating-inactive" : "静默升级中",
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;
		this.config = this.appEngine.getConfig();
		var paasToken = this.config.paasToken, paasServiceID = this.config.paasServiceID, self = this;
		this.getElementByXid("openPaaSBtn").style.display = this.appEngine.webIDE ? "none" : ""
		this.getElementByXid("paasStateDiv").style.display = this.appEngine.quickIDE ? "none" : ""
		this.downloadFrame = document.createElement('iframe');
		this.downloadFrame.style.cssText = "display:none;";
		$("body").append(this.downloadFrame);
		if (!paasServiceID) {
			alert('部署环境加载失败，请部署后再试！');
			return;
		}
		if (this.config.paasType == '0') {
			this.xpaas.loadProject(paasServiceID, function(res) {
				var project = res && res.object || {};
				if (project && project.path) {
					self.path = "http://" + project.path;
					self.androidURL = self.path + "/app.apk";
					self.iosURL = self.path + "/app.ipa";
					$(self.getElementByXid("showUrl")).text(self.path);
					self.showBrCode()

				} else {
					$(self.getElementByXid("showUrl")).text("请检查CloudX5项目信息");
					alert("获取CloudX5信息出错！");
				}
			}, function(result) {
				$(self.getElementByXid("showUrl")).text("请检查CloudX5项目信息");
				alert("部署环境加载失败，请重新部署后再试！");
			});
		} else {
			this.xpaas.loadAppByID(paasServiceID, function(res) {
				var app = res && res.object || {};
				if (app && app.path) {
					self.code = app.code;
					self.path = "http://" + app.path;
					self.androidURL = self.path + "/app.apk";
					self.iosURL = self.path + "/app.ipa";
					if ('1' == app.deployState) {
						$(self.getElementByXid("showUrl")).text(self.path);
						self.showBrCode()
						self.xpaas.checkState(self.config.paasServiceID, function(res) {
							var serverState = res.state;
							$(self.getElementByXid("showState")).text(serverState ? STATE[serverState] : "CloudX5端出错");
						}, function(result) {
							$(self.getElementByXid("showState")).text("获取信息失败");
						});

					} else {
						$(self.getElementByXid("showUrl")).text("尚未部署！");
					}

				} else {
					$(self.getElementByXid("showUrl")).text("请检查CloudX5项目信息");
					alert("部署环境加载失败，请重新部署后再试！");
				}
			}, function(result) {
				$(self.getElementByXid("showUrl")).text("请检查CloudX5项目信息");
				alert("部署环境加载失败，请重新部署后再试！");
			});
		}

	};

	Model.prototype.showBrCode = function() {
		var uiServerURL = location.origin;
		if (uiServerURL.indexOf("localhost") == 7 || uiServerURL.indexOf('localhost') == 8) {
			var downloadInfo = this.appEngine.getDownloadInfo();
			var ipArray = downloadInfo.ip.split(',');
			uiServerURL = uiServerURL.replace('localhost', ipArray[0]);
		}
		this.acitive = true;
		this.comp("appQR").set({
			"value" : uiServerURL + require.toUrl("$UI/system/deploy/paas/app.w") + "?ipaPath=" + this.iosURL + "&apkPath=" + this.androidURL
		});

		this.comp("indexQR").set({
			"value" : this.path
		});
	};

	Model.prototype.howInstallLabelClick = function(event) {
		this.appEngine.webIDE ? window.open("http://doc.wex5.com/how-install-apk-ipa/") : templateService.openBrowser("http://doc.wex5.com/how-install-apk-ipa/");
	};

	Model.prototype.showUrlClick = function(event) {
		var url = $(this.getElementByXid("showUrl")).text() || "";
		if (url.indexOf("http") == 0) {
			this.appEngine.webIDE ? window.open(url) : templateService.openBrowser(url);
		}
	};

	Model.prototype.openPaaSBtnClick = function(event) {
		templateService.openBrowser(templateService.getCloudX5ConsoleUrl() + "/x5/UI2/paas/pt/index.w?token=" //
				+ this.config.paasToken + "#!(/UI2/project/ptMainActivity.w)");
	};

	Model.prototype.getTitle = function(wizard) {
		return '部署信息';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.finish = function() {
		return false;
	};

	Model.prototype.hasDownloadBtn = function(wizard) {
		return false;
	};

	Model.prototype.androidImageClick = function(event) {
		this.downloadFrame.src = this.androidURL;
	};

	Model.prototype.iosImageClick = function(event) {
		this.downloadFrame.src = this.iosURL;
	};

	return Model;
});
