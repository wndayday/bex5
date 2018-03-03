define([ 'require', '$UI/system/lib/base/observable', '$UI/system/lib/base/object', '$UI/system/templates/common/js/templateService', '$UI/system/components/designerCommon/js/webSocketMng' ],
		function(require, Observable, Object, templateService, webSocket) {
			var justep = require("$UI/system/lib/justep");
			var URL = require('$UI/system/lib/base/url');
			var projectName = "", edit, webIDE, sessionId, paasConsoleURL, quickIDE;
			var urlParam = new URL(location.href);
			var key = urlParam.getParam('key');

			var token = webSocket.getRequestParameter("token");
			var templateType = {
				"php" : "3",
				"bex5" : "6"
			};
			quickIDE = sessionStorage && (sessionStorage.isQuick === 'true' || sessionStorage.isBizIde === 'true');
			if (!!key || (quickIDE)) {
				webIDE = true;
				edit = true;
				if (quickIDE) {
					var cloudx5config = JSON.parse(sessionStorage.getItem("config") || "{}");
					projectName = cloudx5config.appName;
					sessionId = cloudx5config.sessionId;
				} else {
					projectName = sessionStorage.getItem("appPath");
					sessionId = sessionStorage.getItem('sessionId');
				}
			} else {
				webIDE = false;
				edit = webSocket.getRequestParameter("edit");
				var targetPath = webSocket.getRequestParameter("targetPath");
				if(targetPath){
					var lastDir = targetPath.substr(templateService.getNativePath().length + 1);
					lastDir = lastDir.replace(/\\/g, '/');
					projectName = lastDir.split('/')[0];
					paasConsoleURL = templateService.getCloudX5ConsoleUrl();
				}
			}

			var XPaaS = Object.extend({
				mixins : Observable,
				constructor : function() {
					var self = this;
					this.callParent();
					Observable.prototype.constructor.call(this);
					this.TEMPLATE_TYPE = templateType;
					this.paasToken = "";
					this.sessionId = "";
					!webIDE && this.__setConsole(paasConsoleURL);
					this.ide = webIDE ? "webide" : "studio";
					this.webIDE = webIDE;
					this.quickIDE = quickIDE;
					this.baasType = "2";
					this.__templateInfo = null;
					this.packer = {
						"android" : {},
						"ios" : {},
					};
					if (webIDE) {
						sessionId && self.setSessionID(sessionId, function(sessionId) {
							self.sessionId = sessionId;
							self.__setPacker();
						}, function(warning) {
							self.warning = warning;
						});
					} else {
						this.login(token, function success(paasToken) {
							self.paasToken = paasToken;
						}, null, false);
					}
					this.loadConfig();

				},
				getPaasURL : function() {
					return paasConsoleURL;
				},
				getPassToken : function() {
					return this.paasToken;
				},
				getSessionId : function() {
					return sessionId;
				},
				__getBaasType : function() {
					var self = this;
					var dtd = $.Deferred();

					if (this.timer) {
						clearTimeout(this.timer);
					}
					this.timer = setTimeout(function() {
						self.timer = null;
						dtd.resolve('-1');
						self.errorFired = true;
						self.readyFired = false;
						self.fireEvent('xpaasError');
					}, 3000);

					if ((self.paasToken || self.sessionId) && self.config.paasServiceID) {
						self.templateInfo(function(templates) {
							var template = templates.object;
							self.loadProject(self.config.paasServiceID, function(project) {
								var app = project && project.object || {};
								if (app.tempId) {
									for ( var i in template) {
										if (app.tempId == template[i].id) {
											if (self.timer) {
												clearTimeout(self.timer);
											}
											dtd.resolve(template[i].type);
											app.templateType = template[i].type;
											self.fireEvent('xpaasReady', {
												"source" : "loadProject",
												"project" : app
											});
											self.errorFired = false;
											self.readyFired = true;
											return dtd;
										}
									}
								} else {
									self.fireEvent('xpaasError');
									self.errorFired = true;
									self.readyFired = false;
									dtd.resolve('-1');
									return dtd;
								}
							});
						});
					}

					return dtd;
				},
				__onXpaasReadyFun : function(event) {
					var appPath = templateService.getNativePath() + "/" + projectName + "/";
					var self = this;
					if (event.source === 'loadProject') {
						var type = event.project.templateType;
						self.baasType = "" + type
						self.baas = {
							"name" : type == templateType.php ? "baas.php.tar.gz" : "baas.java.tar.gz",
							"file" : appPath + "dist/paas/" + (type == templateType.php ? "baas.php.tar.gz" : "baas.java.tar.gz"),
							"published" : function() {
								return self.config.paasDistFiles.indexOf(this.name) > -1; // todo
							},
							"fileExist" : function() {
								return templateService.fileExists(appPath + "dist/paas/" + this.name)
							},

						};

						self.sql = {
							"name" : "sql.tar.gz",
							"publish" : type == templateType.bex5 ? false : true,
							"published" : function() {
								return type == templateType.bex5 ? false : (self.config.paasDistFiles.indexOf(this.name) > -1);
							}
						};
						self.ui = {
							"name" : self.config.mode == '3' ? "model.tar.gz" : "www.tar.gz",
							"published" : function() {
								if (self.config && self.config.paasType == '0') {
									return true;
								}
								return self.config.paasDistFiles.indexOf(this.name) > -1;
							},
							"fileExist" : function() {
								var exist = self.config.mode == '3' ? true : templateService.fileExists(appPath + "www" + self.config.webPath + "/www.zip");
								return exist;
							},
						};
						self.app = {
							"name" : "app.tar.gz",
							"file" : appPath + "dist/paas/app.tar.gz",
							"published" : function() {
								return self.config.paasDistFiles.indexOf(this.name) > -1;
							},
							"fileExist" : function() {
								return templateService.fileExists(appPath + "dist/app.apk") || templateService.fileExists(appPath + "dist/app.ipa")
							},

						};
						self.userData = {
							"name" : "data.tar.gz",
							"file" : appPath + "dist/paas/data.tar.gz",
							"published" : function() {
								return self.config.paasDistFiles.indexOf(this.name) > -1;
							},
							"fileExist" : function() {
								return self.config.userDataDirExist || false;
							},
						};
						self.service = {
							"name" : "service.tar.gz",
							"file" : appPath + "dist/paas/service.tar.gz",
							"published" : function() {
								return self.config.paasDistFiles.indexOf(this.name) > -1;
							},
						};
					}
				},

				ready : function(callback) {
					var self = this;
					if (this.readyFired) {
						callback && callback();
					} else {
						var xpaasReadyFun = function(event) {
							callback && callback.call(self);
							self.off('xpaasReady', xpaasReadyFun);
						};
						callback && this.on("xpaasReady", xpaasReadyFun);
					}

				},
				nativeReady : function(callback) {
					var self = this;
					if (this.nativeFired && 'nativeReady' == this.nativeFlag) {
						callback && callback();
					} else {
						var nativeReadyFun = function(event) {
							callback && callback.call(self);
							self.off('nativeReady', nativeReadyFun);
						};
						callback && this.on("nativeReady", nativeReadyFun);
					}
				},
				nativeError : function(callback) {
					var self = this;
					if (this.nativeFired && 'nativeError' == this.nativeFlag) {
						callback && callback();
					} else {
						var nativeErrorFun = function(event) {
							callback && callback.call(self);
							self.off('nativeReady', nativeErrorFun);
						};
						callback && this.on("nativeReady", nativeErrorFun);
					}
				},
				error : function(callback) {
					var self = this;
					if (this.errorFired) {
						callback && callback();
					} else {
						var xpaasErrorFun = function(event) {
							callback && callback.call(self);
							self.off('xpaasError', xpaasErrorFun);
						};
						callback && this.on("xpaasError", xpaasErrorFun);
					}
				},
				__whenError : function() {
					var self = this;
					var config = {};
					config.appName = projectName;
					config.mode = webIDE ? 3 : 1;
					config.appID = '';
					config.genAndroid = true;
					config.genIOSDis = true;
					config.compileUI = true;
					config.platform = "android";
					config.releaseMode = "debug";
					config.serverURL = "http://" + location.host;
					config.indexURL = "";
					config.uiResDirs = "";
					self.config = config;
					self.readyFired = false;
					self.fireEvent('xpaasError');
					self.errorFired = true;
				},
				loadConfig : function() {
					var self = this;
					self.on("xpaasReady", self.__onXpaasReadyFun);
					self.nativeFired = false;
					self.errorFired = false;
					$.ajax({
						async : false,
						contentType : 'application/json',
						processData : false,
						type : 'GET',
						url : require.toUrl('$UI/system/deploy/app/getAppConfig.j?projectName=' + projectName),
						success : function(result) {
							if (result.warning) {
								self.fireEvent('nativeError', {});
								self.nativeFired = true;
								self.nativeFlag = 'nativeError';
								self.__whenError();
								return;
							}
							self.config = result;
							if (!self.config.paasType) {// 兼容3.7以前工程
								self.config.paasType = '1';
							}
							self.fireEvent('nativeReady', {});
							self.nativeFired = true;
							self.nativeFlag = 'nativeReady';

							self.__getBaasType();
						},
						error : function(xhr, status, err) {
							self.fireEvent('nativeError', {});
							self.nativeFired = true;
							self.nativeFlag = 'nativeError';
							self.__whenError();
							return;
						}
					});
				},
				__requestUIserver : function(url, successCallback, failCallback, async) {
					var self = this;
					var data = $.ajax({
						async : async === false ? false : true,
						contentType : 'application/json',
						processData : false,
						type : 'GET',
						url : require.toUrl(url),
						success : function(result) {
							successCallback && successCallback(result);
						},
						error : function(xhr, status, err) {
							failCallback && failCallback(err);
						}
					});
					return data.responseJSON;
				},

				__setConsole : function(token, successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=set&paasConsoleURL=' + paasConsoleURL, function(result) {
					}, function(xhr, status, err) {
					}, false)
				},

				__setPacker : function(successCallback, failCallback) {
					var self = this;
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=getPacker', function(result) {
						self.packer.android.url = result.object && result.object.androidUrl || "";
						self.packer.ios.url = result.object && result.object.iosUrl || "";
						self.packer.ios.iosDevloperPassword = result.object && result.object.iosCer && result.object.iosCer.iosDevloperPassword || "123456";
						self.packer.ios.iosDistributionPassword = result.object && result.object.iosCer && result.object.iosCer.iosDistributionPassword || "123456";
						self.packer.ios.packageName = result.object && result.object.iosCer && result.object.iosCer.packageName || "com.x5.demo";
					}, function(xhr, status, err) {
					})
				},

				getAppBuilderServerUrl : function(platform) {
					if (webIDE) {
						return platform.indexOf('ios') >= 0 ? this.packer.ios.url : this.packer.android.url;
					} else {
						return this.config.proxyBuilderServer || ""
					}
				},

				login : function(token, successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=login&token=' + token, function(result) {
						if (result.paasToken) {
							successCallback && successCallback(result.paasToken);
						} else {
							failCallback && failCallback(result.msg);
						}
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					}, false)
				},

				setSessionID : function(sessionID, successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=setSessionID&sessionID=' + sessionID, function(result) {
						if (result.sessionID) {
							successCallback && successCallback(result.sessionID);
						} else {
							failCallback && failCallback(result.msg);
						}
					}, function(err) {
						failCallback && failCallback("验证用户信息失败！");
					}, false);
				},

				checkApp : function(path, successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=checkApp&path=' + path, function(result) {
						successCallback && successCallback(result);
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					})
				},

				loadProject : function(serviceID, successCallback, failCallback,title) {
					if (typeof serviceID == "function") {
						var fail = successCallback;
						var success = serviceID;
						this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=loadProject'+ (title ? "&title=" + title : ""), function(result) {
							if (result.totalNum > 0) {
								success && success(result);
							} else {
								fail && fail(result);
							}
						}, function(xhr, status, err) {
							fail && fail(err);
						})
						return;
					}
					if (this.config.paasType == '0') {
						this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=loadProject&paasType=0&serviceID=' + serviceID, function(result) {
							if (result.success == true) {
								successCallback && successCallback(result);
							} else {
								failCallback && failCallback(result);
							}
						}, function(xhr, status, err) {
							failCallback && failCallback(err);
						})
					} else {
						this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=loadProject&serviceID=' + serviceID, function(result) {
							if (result.success == true) {
								successCallback && successCallback(result);
							} else {
								failCallback && failCallback(result);
							}
						}, function(xhr, status, err) {
							failCallback && failCallback(err);
						})
					}
				},
				productDeployer : function(successCallback, failCallback,name) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=productDeployer&name='+name, function(result) {
						
							successCallback && successCallback(result);
						
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					},false)
				},

				loadApp : function(projectId, successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=loadApp&projectId=' + projectId, function(result) {
						if (result.totalNum > 0) {
							successCallback && successCallback(result);
						} else {
							failCallback && failCallback(result);
						}
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					})
				},

				loadAppByID : function(paasServiceID, successCallback, failCallback) {
					var url = "$UI/system/deploy/paas/xPaasInfo.j?option=loadApp";
					if (this.config.passType == '0') { // TODO: pool has App?
						url = url + '&projectId=' + paasServiceID
					} else {
						url = url + '&paasServiceID=' + paasServiceID
					}
					this.__requestUIserver(url, function(result) {
						if (result.success == true) {
							successCallback && successCallback(result);
						} else {
							failCallback && failCallback(result);
						}
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					})
				},

				checkState : function(serviceID, successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=state&serviceID=' + serviceID, function(result) {
						if (result.object) {
							successCallback && successCallback(result.object);
						} else {
							failCallback && failCallback(result.msg);
						}
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					})
				},

				templateInfo : function(successCallback, failCallback) {
					if (this.__templateInfo) {
						successCallback && successCallback({
							object : this.__templateInfo
						});
					} else {
						this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=templateInfo', function(result) {
							if (result.success == true) {
								this.__templateInfo = result && result.object;
								successCallback && successCallback(result);
							} else {
								failCallback && failCallback(result);
							}
						}, function(xhr, status, err) {
							failCallback && failCallback(err);
						})
					}
				},
				getDefaultBundle : function(successCallback, failCallback) {
					this.__requestUIserver('$UI/system/deploy/paas/xPaasInfo.j?option=getIOSDefaultBundle', function(result) {
						if (result.success) {
							successCallback && successCallback(result);
						} else {
							failCallback && failCallback("获取包名出错！");
						}
					}, function(xhr, status, err) {
						failCallback && failCallback(err);
					})
				},
				getIOSDefaultCer : function(appId, successCallback, failCallback) {
					var url = '$UI/system/deploy/paas/xPaasInfo.j?option=getIOSDefaultCer&appId=' + appId;
					var self = this;
					var data = $.ajax({
						async : false,
						contentType : 'application/json',
						processData : false,
						type : 'GET',
						url : require.toUrl(url),
						success : function(result) {
							if (result && result.success) {
								successCallback && successCallback(result);
							} else {
								// failCallback && failCallback('IOS开发证书的id：' +
								// result.packageName + ",不匹配当前包名。");
								failCallback && failCallback('默认IOS证书下载失败');
							}
						},
						error : function(xhr, status, err) {
							failCallback && failCallback(err);
						}
					});
					return data.responseJSON;
				}
			});

			return new XPaaS();
		});
