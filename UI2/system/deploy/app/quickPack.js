define(function(require) {
	var $ = require("jquery");
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
	var loadTreeJs = require("$UI/system/components/designerCommon/tree/tree");
	var templateService = require("$UI/system/templates/common/js/templateService");
	var paas = require("$UI/system/deploy/paas/paas");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.hasAdvanceBtn = function() {
		return true;
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		this.appEngine = this.getParent().appEngine;

		this.iconUploader = new Uploader(this.getElementByXid("iconCol"), {
			actionUrl : require.toUrl('$UI/system/deploy/app/uploadFile.j')
		});
		this.iconUploader.on('onStart', function(event) {
			event.file.data = {
				appID : config.appID,
				filename : "icon.png",
			};
		});
		this.iconUploader.on('onSuccess', function(event) {
			config.newIcon = true;
			self._setImageSrc("iconImage", 'icon.png', true);
		});
		$(this.iconUploader.inputElement).attr("accept", "image/png");

		this.splashPortUploader = new Uploader(this.getElementByXid("splashPortCol"), {
			actionUrl : require.toUrl('$UI/system/deploy/app/uploadFile.j')
		});
		this.splashPortUploader.on('onStart', function(event) {
			event.file.data = {
				appID : config.appID,
				filename : "splash-port.png",
			};
		});
		this.splashPortUploader.on('onSuccess', function(event) {
			config.newSplashPort = true;
			self._setImageSrc("splashPortImage", 'splash-port.png', true);
		});
		$(this.splashPortUploader.inputElement).attr("accept", "image/png");

		this.splashLandUploader = new Uploader(this.getElementByXid("splashLandCol"), {
			actionUrl : require.toUrl('$UI/system/deploy/app/uploadFile.j')
		});
		this.splashLandUploader.on('onStart', function(event) {
			event.file.data = {
				appID : config.appID,
				filename : "splash-land.png",
			};
		});
		this.splashLandUploader.on('onSuccess', function(event) {
			config.newSplashLand = true;
			self._setImageSrc("splashLandImage", 'splash-land.png', true);
		});
		$(this.splashLandUploader.inputElement).attr("accept", "image/png");

		this._setImageSrc("iconImage", 'icon.png', false);
		this._setImageSrc("splashPortImage", 'splash-port.png', false);
		this._setImageSrc("splashLandImage", 'splash-land.png', false);

		this.getParent().comp("finishBtn").set({
			label : "开始打包"
		});

		this.loadFromConfig();
	};

	Model.prototype._setImageSrc = function(xid, filename, newImage) {
		var config = this.appEngine.getConfig();
		var url = '$UI/system/deploy/app/image.j?appID=' + config.appID + '&projectName=' + config.projectName + '&filename=' + filename + '&newImage=' + newImage + '&edit=' + config.edit + '&r='
				+ Math.random();
		$(this.getElementByXid(xid)).attr('src', require.toUrl(url));
	};

	Model.prototype._recalcHeight = function() {
	};

	Model.prototype.getTitle = function(wizard) {
		return '编辑App';
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
		return true;
	};

	Model.prototype.selectIPButtonClick = function(event) {
		// 和 selectAppResources.js 中同名方法相同（无webPath，selectWebPathButton组件）
		var self = this;

		var onClick = function(event) {
			var button = event.source;
			var paasAppID = button.$domNode.attr("paasAppID");
			var paasType = button.$domNode.attr("paasType");

			self.comp("serverURL").$domNode.attr("paasAppID", paasAppID);
			self.comp("serverURL").$domNode.attr("paasType", paasType);
			// self.comp("webPath").$domNode.attr("readonly", !paasAppID);
			// self.comp("selectWebPathButton").$domNode.attr("disabled",
			// !paasAppID);

			if (paasAppID) {
				self.comp("serverURL").val(button.$domNode.attr("paasURL"));
				if (self.appEngine.getConfig().mode === "3") {
					self.comp("webPath").val("/x5/UI2");
				}
			} else {
				self.comp("serverURL").val(event.source.label);
			}
		};

		var openNewCloudX5AppURL = function(buttonEvent) {
			self.comp("serverURL").val("");
			var url = templateService.getCloudX5ConsoleUrl() + "/x5/UI2/paas/pt/index.w?" + "type=" + self._getPaaSAppType() + "#!(/UI2/project/ptMainActivity.w)";
			self.getParent().webIDE ? window.open(url) : templateService.openBrowser(url);
		};

		var menu = this.comp("menu");
		menu.clear();

		if (this.getParent().webIDE) {
			var appType = paas.getAppTypeByMode(self.appEngine.getConfig().mode);
			var apps = paas.getAppsByType(appType);
			$.each(apps, function(i, app) {
				var menuItem = menu.addItem({
					label : app.paasURL + "[CloudX5]",
					onClick : onClick
				});
				menuItem.$domNode.attr("paasAppID", app.paasAppID);
				menuItem.$domNode.attr("paasType", app.paasType);
				menuItem.$domNode.attr("paasURL", app.paasURL);
			});

		} else {
			var downloadInfo = this.appEngine.getDownloadInfo();
			var ips = downloadInfo.ip.split(',');
			$.each(ips, function(i, ip) {
				menu.addItem({
					label : 'http://' + ip + ":8080",
					onClick : onClick
				});
			});
		}

		if ((self.appEngine.getConfig().mode != 4) && (!self.getParent().webIDE)) {
			menu.addDivider();
			menu.addItem({
				label : '新建 CloudX5 项目',
				onClick : function() {
					openNewCloudX5AppURL();
				}
			});
		}

		self.comp("popMenu").show();
	}

	Model.prototype.downloadPage = function(wizard) {
		this.getParent().comp("cancelBtn").set({
			label : "关闭"
		});
		this.getParent().openPage({
			id : "downloadApp",
			url : "$UI/system/deploy/package/downloadApp.w",
			fromId : "setQuickApp"
		});
	};

	Model.prototype.checkAppBuilderServer = function(appBuilderServer) {
		var response = $.ajax({
			async : false,
			contentType : 'application/json',
			processData : false,
			type : 'GET',
			url : require.toUrl("$UI/system/deploy/package/test.j?appBuilderServer=" + appBuilderServer + "&useProxyBuilderServer=" + appBuilderServer),
			success : function(result) {
				if (result && (result.state === "OK")) {
					// config.appBuilderServer = config.proxyBuilderServer;
				} else if (result && (result.state === "queueError")) {
					alert("服务端已有排队的打包任务，请稍后再试");
					return false;
				} else if (result && (result.state === "httpError")) {
					alert("打包服务器填写有误！请修改后再试");
					return false;
				} else {
					alert("服务端异常，请联系管理员");
					return false;
				}
			},
			error : function(xhr, status, err) {
				alert("检测到服务异常：" + err);
				return false;
			}
		});
	};

	Model.prototype.loadFromConfig = function() {
		var config = this.appEngine.getConfig();
		this.comp("serverURL").val(config.serverURL);
		this.comp("serverURL").$domNode.attr("paasAppID", config.paasAppID);
		this.comp("serverURL").$domNode.attr("paasType", config.paasType);

		this.comp("androidCheckbox").val(config.platform && (config.platform.indexOf('android') >= 0));
		this.comp("iosCheckbox").val(config.platform && (config.platform.indexOf('ios') >= 0));
	};

	Model.prototype.saveToConfig = function() {
		var config = this.appEngine.getConfig();
		config.serverURL = this.comp("serverURL").get("value");
		config.paasAppID = this.comp("serverURL").$domNode.attr("paasAppID");
		config.paasType = this.comp("serverURL").$domNode.attr("paasType");
		config.webPath = "";
		config.indexURL = config.mode === "4" ? "" : "/main/index.w";
		if (!config.serverURL) {
			config.serverURL = "http://localhost";
		}
		config.uiResDirs = "";
		if (config.uiResDirs.indexOf('system/admin') < 0) {
			config.uiResDirs = !config.uiResDirs ? "system/admin" : config.uiResDirs + ",system/admin";
		}

		config.platform = '';
		if (this.comp('iosCheckbox').get('checked')) {
			config.platform = 'ios';
		}
		if (this.comp('androidCheckbox').get('checked')) {
			config.platform += config.platform ? ',android' : 'android';
		}

		config.includeUIRes = true;
		config.compileUI = true;
		config.releaseMode = "release";

		config.useProxyBuilderServer = true;
		config.proxyBuilderServer = "http://packer.cloudx5.com/app-builder";
		config.appBuilderServer = config.proxyBuilderServer;
	};

	Model.prototype.finish = function(wizard) {
		var result = this.validate();
		if (result) {
			this.appEngine.getConfig().packApp = true;
			this.saveToConfig();

			this.getParent().openPage({
				id : "waittingDialog",
				url : "$UI/system/deploy/package/waittingDialog.w",
				fromId : "quickPack"
			});
		}

		return result;
	};

	Model.prototype.hasDownloadBtn = function(wizard) {
		var appEngine = this.getParent().appEngine, config = appEngine.config || {};
		var downloadInfo = appEngine.getDownloadInfo(config.projectName, config.appName);
		if (downloadInfo.android || downloadInfo.ios) {
			return true;
		}
		return false;
	};

	Model.prototype.validate = function() {
		var config = this.appEngine.getConfig();

		config.serverURL = this.comp("serverURL").get("value");
		if (config.serverURL == null || config.serverURL == '')
			return false;

		var result = this.comp('androidCheckbox').get('checked') || this.comp('iosCheckbox').get('checked');
		if (!result) {
			alert("请至少选择Android或IOS类型！");
			return false;
		} else {
			config.platform = '';
			if (this.comp('androidCheckbox').get('checked')) {
				if ((config.platform.indexOf('android') >= 0) && !config.genAndroid) {
					alert('未配置Andoird证书，请编辑应用并在“配置开发者信息和证书”页设置Android证书相关信息。');
					return false;
				}
				config.platform += config.platform ? ',android' : 'android';
			}
		}

		return true;
	};

	Model.prototype.androidImageClick = function(event) {
		var checkObj = this.comp('androidCheckbox');
		checkObj.val((checkObj.get("checked") !== true));
	};

	Model.prototype.iosImageClick = function(event) {
		var checkObj = this.comp('iosCheckbox');
		checkObj.val((checkObj.get("checked") !== true));
	};

	return Model;
});
