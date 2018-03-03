define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var URL = require('$UI/system/lib/base/url');
	var Object = require('$UI/system/lib/base/object');
	var templateService = require('$UI/system/templates/common/js/templateService');

	var PAAS_LOCAL_URL = "http://console-svc.console.svc.cluster.local";

	var PaaSAppType = {
		"WEX5" : "WEX5",
		"WEX5_UISERVER" : "WEX5_UISERVER",
		"WEX5_IDE" : "WEX5_IDE",
		"BEX5" : "BEX5",
		"BEX5_IDE" : "BEX5_IDE"
	};

	var PaaSDBType = {
		"MYSQL" : "MYSQL",
		"PGSQL" : "PGSQL"
	};

	var PaaS = function() {
		this.constructor();
	};

	PaaS.prototype = {
		constructor : function() {
			if (this.isWebIDE()) {
				// this.paasSession IDE中设置
			} else {
				this.paasSession = this.login();
			}
		},

		isWebIDE : function() {
			var key = (new URL(location.href)).getParam('key');
			// key 参数判断是否是webIDE模式
			return !!key;
		},

		getPaasConsoleURL : function() {
			if (!this.paasConsoleURL) {
				// 根据是否有runtime判断是普通开发环境还是云环境
				var isDev = false;// TODO: 有问题var isDev = templateService.fileExists(templateService.getNativePath() + "/../../runtime");
				if (this.isWebIDE() && !isDev) {
					this.paasConsoleURL = PAAS_LOCAL_URL;
				} else {
					this.paasConsoleURL = templateService.getCloudX5ConsoleUrl();
				}
			}

			return this.paasConsoleURL;
		},

		setPaasSession : function(paasSession) {
			if (this.isWebIDE()) {
				this.paasSession = paasSession;
			} else {
				alert("webIDE模式才允许设置session");
			}
		},

		getPaasSession : function() {
			return this.paasSession;
		},

		login : function() {
			var result = $.ajax({
				async : false,
				processData : false,
				type : 'post',
				url : require.toUrl('$UI/system/deploy/paas/paas.j?action=login&paasConsoleURL=' + this.getPaasConsoleURL()),
			});

			if (result.responseJSON) {
				result = result.responseJSON;
			}
			if (result.flag) {
				return result.paasSession;
			} else {
				alert("登录失败");
			}
		},

		getAppTypeByMode : function(mode) {
			isBeX5 = templateService.fileExists(templateService.getNativePath() + "/../../../tomcat/webapps/BusinessServer.war");
			if (mode == '3') {
				return isBeX5 ? PaaSAppType.BEX5 : PaaSAppType.WEX5_UISERVER;
			} else {
				return isBeX5 ? PaaSAppType.BEX5 : PaaSAppType.WEX5;
			}
		},

		getAppByDomain : function(domain) {
			var apps = this.getApps({
				routePath : domain
			});

			return apps.length > 0 ? apps[0] : null;
		},

		getDeployInfo : function(paasAppID) {
			var deployInfo = {
				"appPublished" : false,
				"uiPublished" : false,
				"servicePublished" : false,
				"userDataPublished" : false
			};

			if (paasAppID) {
				var result = $.ajax({
					async : false,
					data : "",
					dataType : 'json',
					contentType : 'application/json',
					processData : false,
					type : 'post',
					url : require.toUrl('$UI/system/deploy/paas/paas.j?action=deployInfo&paasSession=' + this.paasSession + '&paasAppID=' + paasAppID + '&paasConsoleURL=' + this.getPaasConsoleURL()),
					success : function(result) {
						if (result.success) {
							deployInfo = result.object;
						}
					},
					error : function(xhr, status, err) {
						alert("获取应用信息失败，错误信息：" + err);
					}
				});
			}

			return deployInfo;
		},

		getApps : function(param) {
			var paasApps = [];
			var result = $.ajax({
				async : false,
				data : JSON.stringify(param),
				dataType : 'json',
				contentType : 'application/json',
				processData : false,
				type : 'post',
				url : require.toUrl('$UI/system/deploy/paas/paas.j?action=apps&paasSession=' + this.paasSession + '&paasConsoleURL=' + this.getPaasConsoleURL()),
				success : function(result) {
					var rows = result.rows;
					$.each(rows, function(index, value) {
						var apps = {};
						apps.paasAppID = value.id;
						apps.paasType = value.defId;
						apps.paasURL = value.routePath;
						paasApps[index] = apps;
					});
				},
				error : function(xhr, status, err) {
					alert("获取应用信息失败，错误信息：" + err);
				}
			});

			return paasApps;
		},

		getAppsByType : function(paasType) {
			return this.getApps({
				defId : paasType
			});
		},

		getApp : function(paasAppID) {
			var app;
			$.ajax({
				async : false,
				data : "",
				dataType : 'json',
				contentType : 'application/json',
				processData : false,
				type : 'post',
				url : require.toUrl('$UI/system/deploy/paas/paas.j?action=app&paasSession=' + this.paasSession + '&paasAppID=' + paasAppID + '&paasConsoleURL=' + this.getPaasConsoleURL()),
				success : function(result) {
					if (result.success) {
						app = result.object;
					}
				},
				error : function(xhr, status, err) {
					alert("获取App“" + paasAppID + "”信息失败，错误信息：" + err);
				}
			});

			return app;
		},

		getServiceInfo : function() {
			var serviceInfo = {
				"androidURL" : "http://android-packer.xpaas.cn/app-builder",
				"iosURL" : "http://packer.cloudx5.com/app-builder",
				"appLocalURL" : "http://console-svc.console.svc.cluster.local",
				"resLocalURL" : "http://console-svc.console.svc.cluster.local"
			};

			var result = $.ajax({
				async : false,
				data : "",
				dataType : 'json',
				contentType : 'application/json',
				processData : false,
				type : 'post',
				url : require.toUrl('$UI/system/deploy/paas/paas.j?action=serviceInfo&paasSession=' + this.paasSession),
				success : function(result) {
					if (result.success) {
						serviceInfo = result.object;
					}
				},
				error : function(xhr, status, err) {
					alert("获取服务配置信息失败，使用默认值。错误信息：" + err);
				}
			});

			return serviceInfo;
		},

		getAppBuilderServerUrl : function(platform) {
			if (this.isWebIDE) {
				// TODO: android & ios
				return !platform || platform.indexOf('ios') >= 0 ? "http://packer.cloudx5.com/app-builder" : "http://packer.cloudx5.com/app-builder";
			} else {
				return this.config.proxyBuilderServer || ""
			}
		}

	};

	return new PaaS();
});
