define([ 'require', '$UI/system/lib/base/object', '$UI/system/templates/common/js/templateService', '$UI/system/components/designerCommon/js/webSocketMng' ],
//
function(require, Object, templateService, webSocket) {

	var URL = require('$UI/system/lib/base/url');
	var justep = require("$UI/system/lib/justep");
	var nativePath = templateService.getNativePath();
	var projectName = "", webIDE, edit, quickIDE;
	var thisurl = new URL(location.href);
	var key = thisurl.getParam('key');

	quickIDE = sessionStorage && ((sessionStorage.isQuick === 'true') || (sessionStorage.isBizIde === 'true'));
	if (!!key || quickIDE) {
		webIDE = true;
		edit = true;
		if (quickIDE) {
			var cloudx5config = JSON.parse(sessionStorage.getItem("config") || "{}");
			projectName = cloudx5config.appName;

		} else {
			projectName = sessionStorage.getItem("appPath");
		}
	} else {
		webIDE = false;
		var targetPath = webSocket.getRequestParameter("targetPath");
		if ((!targetPath) && (webSocket.getRequestParameter("overrideURL"))) {
			projectName = "apploader";
		} else {
			appPath = targetPath.substr(nativePath.length + 1);
			appPath = appPath.replace(/\\/g, '/');
			projectName = appPath.split('/')[0];
		}
	}
	if (projectName === 'plugins' || projectName === 'templates' ) {
		projectName = "";
		throw new Error('名称不能是保留字plugins，templates！');
	}
	var appEngine = Object.extend({
		constructor : function(reqURL) {
			this.callParent();
			this.DEFAULT_HASH = 'version';
			this.getCompiled = true;
			this.reqURL = reqURL;
			this.loadConfig(this.getProjectName());
			this.webIDE = webIDE;
			this.quickIDE = quickIDE;
			this.config.webIDE = this.webIDE;
			this.ide = {
				model3Selected : webIDE ? true : false,
				packageWizEnable : webIDE ? false : true,
				packerEnable : webIDE ? true : false,
			}
		},

		getEdit : function() {
			return this.edit;
		},

		getProjectName : function() {
			return projectName;
		},

		getNativePath : function(appName) {
			return nativePath;
		},

		hasAdminPage : function() {
			if (quickIDE) {
				return true;
			} else {
				return false;
			}
		},
		setAppBuilderServerUrl : function(url) {
			templateService.setAppBuilderServerUrl(url);
		},
		__whenError : function() {
			var self = this;
			self.edit = false;
			var config = {};
			config.appName = projectName;
			config.mode = webIDE ? (quickIDE ? '1' : '3') : '1';
			config.appID = justep.UUID.createUUID();
			config.genAndroid = true;
			config.androidPassword = "123456";
			config.genIOSDis = false;
			config.genIOSDev = false;
			config.compileUI = true;
			config.platform = "android";
			config.releaseMode = "release";
			config.serverURL = "";
			config.indexURL = "";
			config.uiResDirs = "";
			config.browserEngine = 'auto';
			config.hash = this.DEFAULT_HASH;

			if (quickIDE) {
				config.edit = false;
				config.serverURL = "";
				config.paasType = '0'; // default -app* is pool
				config.description = "演示";
				config.author = "北京起步科技有限公司";
				config.email = "x5@justep.com";
				config.homePage = "http://www.justep.com";
				config.province = "";
				config.area = "";
				config.company = "";
				config.orientation = "default";

				config.includeUIRes = true;
				config.webPath = "";
				config.version = "0.0.1";
				config.packageName = "com.x5.demo1"

				config.androidPassword = '123456';
				config.genAndroidKey = true;
				config.indexURL = (sessionStorage.isBizIde === 'true') ?  '/portal/pc3/index.w' : '/main/index.w';
				config.uiResDirs = (sessionStorage.isBizIde === 'true') ?  'SA,portal,entapp' : 'main,system/admin';
				config.useProxyBuilderServer = true;
				config.autoSelectPlugins = true;
				config.plugins = '';
				config.pluginsConfig = [];
				config.projectName = projectName;
			}
			self.config = config;
			if (projectName && !webIDE) {
				alert('加载应用配置失败，请检查目录“Native\\' + projectName + '”是否正常');
				return;
			}
		},
		loadConfig : function(projectName) {
			var self = this;
			if (!projectName || projectName == 'null') {
				self.__whenError();
				return;
			}
			$.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/app/getAppConfig.j?projectName=' + projectName),
				success : function(result) {
					if (result.msg) {
						alert(result.msg);
						self.__whenError();
						return;
					}
					if (result.warning) {
						console.log(result.warning);
						self.__whenError();
						return;
					}

					if (result.extBrowser === true) {
						result.browserEngine = 'crossWalk';
					}
					result.browserEngine = result.browserEngine ? result.browserEngine : 'auto';
					result.releaseMode = result.releaseMode ? result.releaseMode : "debug";
					self.edit = true;
					self.config = result;
					self.config.edit = true;
					if (self.config.mode == '1' || self.config.mode == '2') {
						self.getCompile.call(self);
					}
					if (!self.config.paasType) {// 兼容3.7以前工程
						self.config.paasType = '1';
					}
					if (quickIDE) {
					}
				},
				error : function(xhr, status, err) {
					console.log(err);
					self.__whenError();
				}
			});
		},

		getPlugins : function(projectName) {
			var plugins = $.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/app/getRegPlugins.j?projectName=' + projectName),
				success : function(result) {
				},
				error : function(xhr, status, err) {
					alert('加载应用配置失败，请检查目录“Native\\' + projectName + '”是否正常!');
				}
			});

			return plugins.responseJSON;
		},

		getCompile : function() {
			var useMd5 = (this.DEFAULT_HASH === 'md5' && !this.config.hash && this.getProjectName() && this.config.indexURL) || (this.config.hash === 'md5')
			var self = this;
			if (!useMd5) {
				self.getCompiled = true;
				return {
					"hash" : "no"
				};
			}
			var config = this.config;

			var url = config.serverURL + config.webPath + "/compileInfo.json"
			var plugins = $.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/compile/downloadCompile.j?url=' + url + '&projectName=' + projectName),
				success : function(result) {
					if (result.msg === 'ok') {
						self.getCompiled = true;
					} else {
						self.getCompiled = false;
					}
				},
				error : function(xhr, status, err) {
					self.getCompiled = false;
				}
			});

			return plugins.responseJSON;
		},

		getDownloadInfo : function(projectName, appName) {
			var downloadInfo = $.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/package/getDownloadInfo.j?projectName=' + projectName + '&appName=' + appName),
				success : function(result) {
				},
				error : function(xhr, status, err) {
					alert('获取App下载信息失败');
				}
			});

			return downloadInfo.responseJSON;
		},
		startIpaService : function(ip, projectName) {
			var downloadInfo = $.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/package/startIpaService.j?ip=' + ip + '&projectName=' + projectName),
				success : function(result) {
					console.log(result);
				},
				error : function(xhr, status, err) {
					alert('获取App下载信息失败');
				}
			});

			return downloadInfo.responseJSON;
		},

		getConfig : function() {
			return this.config;
		},

		build : function(param, buildFinishedNotify) {
			var self = this;
			var config = this.getConfig();
			if (config.hash === 'md5' || (this.DEFAULT_HASH === 'md5' && !config.hash)) {
				config.resourceVersion = "d";
			}
			
			// 未来版本基于 config.edit状态读取
			config.edit = self.getEdit();
			
			$.ajax({
				async : param.async === true,
				data : JSON.stringify(this.getConfig()),
				dataType : 'json',
				contentType : 'application/json',
				processData : false,
				type : 'POST',
				url : require.toUrl(this.reqURL + (self.getEdit() ? '?edit=true' : '')),
				success : function(result) {
					/*
					 * pack 时间太长， safari下60s会报错，这里直接返回并通过checkPacking监测
					 */
					if (result.code === 'BUSY') {
						var refreshID = window.packCheckId = window.setInterval(function() {
							var result = $.ajax({
								async : false,
								data : {},
								dataType : 'json',
								contentType : 'application/json',
								processData : false,
								type : 'POST',
								url : require.toUrl(param.checkStatusURL ? param.checkStatusURL : "$UI/system/deploy/package/checkPacking.j")
							}).responseJSON;
							if (result.code !== 'BUSY') {
								window.clearInterval(refreshID);
								if (buildFinishedNotify) {
									buildFinishedNotify(result);
								}
							}

						}, 2000);
					} else {
						if (buildFinishedNotify) {
							buildFinishedNotify(result);
						}
					}
				},
				error : function(xhr, status, err) {
					if (buildFinishedNotify) {
						buildFinishedNotify({
							flag : false,
							message : err
						});
					}
				}
			});
		},

		closeDialog : function() {
			window.packRefreshID && window.clearInterval(window.packRefreshID);
			window.packCheckId && window.clearInterval(window.packCheckId);
			templateService.closeDialog();
		}
	});
	return appEngine;
});
