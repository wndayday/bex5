define(function(require) {
	var $ = require("jquery");
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
	var loadTreeJs = require("$UI/system/components/designerCommon/tree/tree");
	var templateService = require("$UI/system/templates/common/js/templateService");
	var xpaas = require("$UI/system/deploy/paas/xpaas");

	loadTreeJs($);
	var TemplateType = {
		"JAVA" : "5",
		"UISERVER" : "2",
		"PHP" : "3",
		"BX5JAVA" : "6",
		"QUICKAPP" : "7"
	};

	var Model = function() {
		this.callParent();
		this.xpaas = xpaas;
	};

	Model.prototype.hasAdvanceBtn = function() {
		return true;
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		this.appEngine = this.getParent().appEngine;
		var config = this.appEngine.getConfig();
		if (self.appEngine.getConfig().serverURL == "") {
			self.comp("serverURL").val("请选择部署地址");
		}
		this.comp("appNameInput").val(config.appName);
		this.comp("androidCheckbox").val(config.platform && (config.platform.indexOf('android') >= 0));
		this.comp("iosCheckbox").val(config.platform && (config.platform.indexOf('ios') >= 0));
		xpaas.templateInfo(function(json) {
			self.templateInfo = json.object || [];
			if (self.templateInfo.length > 0 && !self.appEngine.getConfig().paasServiceID) {

				xpaas.loadProject(function(res) {
					if (res && res.rows) {
						for ( var rowIndex in res.rows) {
							if (self.matchMode(res.rows[rowIndex].tempId)) {
								if (config.serverURL == 'http://' + res.rows[rowIndex].path) {
									self.comp("serverURL").val("http://" + res.rows[rowIndex].path);
									self.appEngine.getConfig().serverURL = "http://" + res.rows[rowIndex].path;
									self.appEngine.getConfig().paasServiceID = res.rows[rowIndex].id;
									self.appEngine.getConfig().paasType = '' + res.rows[rowIndex].type;
								}
							}
						}
					} else {
					}
				}, function(res) {
					// successCallback
					
				}, function(res) {
					// failCallback
				}, self.appEngine.getConfig().appName);

			}
		}, function() {
			self.templateInfo = [];
		});

		xpaas.nativeError(function() {
			config.packageName = xpaas.packer.ios.packageName;
			config.iosDistributionPassword = xpaas.packer.ios.iosDistributionPassword;
			config.genIOSDis = false;
			config.releaseMode = "release";
		});

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
		this.init();
	};

	Model.prototype._setImageSrc = function(xid, filename, newImage) {
		var config = this.appEngine.getConfig();
		var url = '$UI/system/deploy/app/image.j?appID=' + config.appID + '&projectName=' + config.projectName + '&filename=' + filename + '&newImage=' + newImage + '&edit=' + config.edit + '&r='
				+ Math.random();
		$(this.getElementByXid(xid)).attr('src', require.toUrl(url));
	};

	Model.prototype._recalcHeight = function() {
	};

	Model.prototype.init = function() {
		var config = this.appEngine.getConfig();
		if (config.serverURL) {
			this.comp("serverURL") && this.comp("serverURL").val(config.serverURL);
		}
		config.useProxyBuilderServer = true;
	};

	Model.prototype.getTitle = function(wizard) {
		return 'quick演示';
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

	Model.prototype.matchMode = function(projectTemplateId) {
		var template = this.templateInfo;
		var mode = this.appEngine.getConfig().mode;
		var needType = this.__getTemplateType(mode);
		for ( var i in template) {
			for ( var j in needType) {
				if (projectTemplateId == template[i].id && needType[j] == template[i].type) {
					return true;
				}
			}
		}
		return false;
	};
	Model.prototype.__getTemplateType = function(mode) {
		if (mode == '1' || mode == '2') {
			return this.appEngine.quickIDE ? [ TemplateType.QUICKAPP, TemplateType.JAVA ] : [ TemplateType.JAVA, TemplateType.PHP ];
		}
		if (mode == '3') {
			return [ TemplateType.UISERVER, TemplateType.BX5JAVA ];
		}
	}

	Model.prototype.selectIPButtonClick = function(event) {
		var self = this;
		var menu = this.comp("menu");
		menu.clear();
		var config = self.appEngine.getConfig();
		var newProject = function(buttonEvent) {
			var mode = config.mode;
			if (xpaas.paasToken || xpaas.sessionId) {
				self.comp("serverURL").val("");
				var auth = xpaas.paasToken ? ("token=" + xpaas.paasToken) : ("sessionId=" + xpaas.sessionId);
				var url = templateService.getCloudX5ConsoleUrl() + "/x5/UI2/paas/pt/index.w?" + auth + "&type=1" // +
				// self.__getTemplateType(self.appEngine.getConfig().mode)[0]
						+ "#!(/UI2/project/ptMainActivity.w)";
				window.open(url);
			} else {
				setTimeout(function() {
					alert("请先登录CloudX5！");
				}, 300);

			}
		};

		var apptitle;
		if (config.serverURL == "") {
			apptitle = location.host.replace('-ide.', '-app.');
		} else {
			apptitle = config.serverURL.replace('http://', '');
		}
		var vipbutton;

		var dtd = $.Deferred();
		if ((xpaas.paasToken || xpaas.sessionId) && self.templateInfo && self.templateInfo.length > 0) {
			this.xpaas.loadProject(function(res) {
				if (res && res.rows) {
					var hasvip = false;
					for ( var rowi in res.rows) {
						if (res.rows[rowi].environmentId != 'default') {
							hasvip = true;
						}
					}
					if (hasvip) {
						for ( var rowIndex in res.rows) {

							var button;
							if (res.rows[rowIndex].environmentId === 'default') {

								button = menu.addItem({
									label : "测试部署",
									onClick : self.projectClickFun
								});
							} else {
								if (sessionStorage.isQuick) {
									button = menu.addItem({
										label : "生产部署",
										onClick : self.projectClickFun
									});
								}

							}

							button.$domNode.attr("projectId", res.rows[rowIndex].id);
							button.$domNode.attr("projectType", '' + res.rows[rowIndex].type);
							button.$domNode.attr("projectPath", res.rows[rowIndex].path);

						}
					} else {// 无vip项目
						for ( var rowIndex in res.rows) {
							var button = menu.addItem({
								label : "测试部署",
								onClick : self.projectClickFun
							});

							button.$domNode.attr("projectId", res.rows[rowIndex].id);
							button.$domNode.attr("projectType", '' + res.rows[rowIndex].type);
							button.$domNode.attr("projectPath", res.rows[rowIndex].path);
							if (sessionStorage.isQuick) {
								vipbutton = menu.addItem({
									label : "生产部署",
									onClick : function() {
										// 检查主机 及构建vip项目
										this.xpaas.productDeployer(function(res) {
											if (res.success) {
												self.comp("serverURL").val("http://" + res.object.path);
												self.xpaas.loadApp(res.object.pid, function(res) {

													if (res && res.rows) {
														self.appEngine.getConfig().paasType = '1';
														self.appEngine.getConfig().paasServiceID = res.rows[0].id;
														self.paasServiceID = res.rows[0].id;
														self.paasType = '1';

													} else {
														alert("项目" + button.label + "有异常");
													}
												}, function(result) {
													alert("ERR:" + JSON.stringify(result))
												});

											} else {

												if (res.object == 'hostfailed') {
													/*
													 * self.comp("messageDialogGotoHost").show({
													 * callback :
													 * function(params) { var
													 * button = params.button;
													 * if (button === 'yes') {
													 * justep.Shell.showPage("$UI/project/host/mainActivity.w", {
													 * data : null }); } else if
													 * (button === 'no') { } }
													 * });
													 */
													alert("尚未购买主机或者主机到期或者主机尚未审核，请到控制台处理。");

												} else {
													alert(res.object);

												}

											}

										}, function(res) {
											alert("生产部署设置失败，请稍后再试。");

										}, res.rows[rowIndex].title);
									}
								});
							}

						}

					}

					dtd.resolve();
				} else {
					dtd.resolve();
				}
			}, function(res) {
				// successCallback
                dtd.resolve();
			}, function(res) {
				// failCallback
			}, apptitle);
		} else {
			dtd.reject();
		}
		dtd.always(function() {
			/*
			 * menu.addDivider();
			 * 
			 * menu.addItem({ label : '新建 CloudX5 项目', onClick : function() {
			 * newProject(); } });
			 */
			self.comp("popMenu").show();
		});

	}

	Model.prototype.getDefaultIOSCer = function() {
		var dtdIOS = $.Deferred();
		var dtdIOSDefaultCer = dtdIOS.promise();
		var config = this.appEngine.getConfig();
		var self = this;
		if (this.comp('iosCheckbox').get('checked')) {
			if (config.releaseMode === "release") {
				if (!config.genIOSDis) {
					if (config.packageName == xpaas.packer.ios.packageName && config.iosDistributionPassword == xpaas.packer.ios.iosDistributionPassword) {
						if (confirm("下载默认IOS证书，点击确定开始打包。")) {
							xpaas.getIOSDefaultCer(config.appID, function(reslut) {
								config.genIOSDev = true;
								config.platform = config.platform.indexOf('ios') > -1 ? config.platform : config.platform + ',ios';
								dtdIOS.resolve();
							}, function() {
								alert('IOS发布证书下载失败！请稍后重试');
								dtdIOS.reject();
							}, function() {
								alert('IOS发布证书下载失败！请稍后重试');
								dtdIOS.reject();
							});
						} else {
							dtdIOS.reject();
						}
					} else {
						alert('已自定义包名或证书密码，请在高级模式“配置开发者信息和证书”页设置IOS证书相关信息。');
						dtdIOS.reject();
					}
				} else {
					config.platform = config.platform.indexOf('ios') > -1 ? config.platform : config.platform + ',ios';
					dtdIOS.resolve();
				}
			} else {
				if (!config.genIOSDev) {
					alert('未配置IOS开发证书，请在高级模式“配置开发者信息和证书”页设置IOS开发证书相关信息。');
					dtdIOS.reject();
				} else {
					config.platform = config.platform.indexOf('ios') > -1 ? config.platform : config.platform + ',ios';
					dtdIOS.resolve();
				}
			}
		} else {
			dtdIOS.resolve();
		}
		return dtdIOS;
	};

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

	Model.prototype.finish = function(wizard) {
		var self = this;
		var dtd = $.Deferred();
		var promise = dtd.promise();
		if (this.validate()) {
			var config = this.appEngine.getConfig();
			var promiseIOS = this.getDefaultIOSCer();

			promiseIOS.then(function() {
				config.proxyBuilderServer = xpaas.getAppBuilderServerUrl(config.platform);
				self.appEngine.reqURL = '$UI/system/deploy/app/quickApp.j';
				self.comp("finishPopOver").show();
				// download ios.p12
				var i = 0;
				var checkStatusID = self.checkStatusID = setInterval(checkStatus, 2000);
				function checkStatus() {
					if (i > 10) {// test
						if (confirm("代理打包服务忙，点击确定重试")) {
							i = 0;
						} else {
							self.comp("finishPopOver").hide();
							clearTimeout(checkStatusID);
							dtd.resolve("false");
						}

					} else {
						i++;
						var response = $.ajax({
							async : false,
							contentType : 'application/json',
							processData : false,
							type : 'GET',
							url : require.toUrl("$UI/system/deploy/package/test.j?appBuilderServer=" + config.proxyBuilderServer + "&useProxyBuilderServer=" + config.useProxyBuilderServer),
							success : function(result) {
								if (result && (result.state === "OK")) {
									clearTimeout(checkStatusID);
									self.getParent().openPage({
										id : "waittingDialog",
										url : "$UI/system/deploy/package/waittingDialog.w",
										fromId : "setQuickApp"
									});
									config.setQuickApp = true;// for new roter
									config.appBuilderServer = config.proxyBuilderServer;
									self.comp("finishPopOver").hide();
									dtd.resolve("true");
								} else if (result && (result.state === "queueError")) {
									clearTimeout(checkStatusID);
									self.comp("finishPopOver").hide();
									alert("服务端已有排队的打包任务，请稍后再试");
									dtd.resolve("false");
								} else if (result && (result.state === "httpError")) {
									clearTimeout(checkStatusID);
									self.comp("finishPopOver").hide();
									alert("打包服务器填写有误！请修改后再试");
									dtd.resolve("false");
								} else {
									clearTimeout(checkStatusID);
									self.comp("finishPopOver").hide();
									alert("服务端异常，请联系管理员");
									dtd.resolve("false");
								}
							},
							error : function(xhr, status, err) {
								clearTimeout(checkStatusID);
								self.comp("finishPopOver").hide();
								alert("检测到服务异常：" + err);
								dtd.resolve("false");
							}
						}).responseJSON;
					}
				}
			});

		} else {
			dtd.resolve("false");
		}

		return promise;

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
		config.appName = this.comp("appNameInput").get("value");
		if (config.appName == null || config.appName == '') {
			alert("请输入应用名称！");
			return false;
		}
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
		config.proxyBuilderServer = xpaas.getAppBuilderServerUrl(config.platform);
		if (!config.proxyBuilderServer) {
			alert("登录信息过期!");
			return false;
		}
		return true;
	};

	Model.prototype.projectClickFun = function(buttonEvent) {
		var self = this;
		var button = buttonEvent.source;
		var projectId = button.$domNode.attr("projectId");
		var projectType = button.$domNode.attr("projectType");
		var projectPath = button.$domNode.attr("projectPath");
		self.appEngine.getConfig().serverURL = "http://" + projectPath;

		if (projectType == '0') {// 池
			self.comp("serverURL").val("http://" + projectPath);

			self.appEngine.getConfig().paasServiceID = projectId;
			self.appEngine.getConfig().paasType = projectType;
			self.paasServiceID = projectId;
			self.paasType = '0';
			return;
		}

		self.comp("serverURL").val("http://" + projectPath);

		this.xpaas.loadApp(projectId, function(res) {
			if (res && res.rows) {
				if ('1' == res.rows[0].deployState ? confirm('该项目有过部署，确认要覆盖吗？') : true) {
					self.appEngine.getConfig().paasServiceID = res.rows[0].id;
					self.appEngine.getConfig().paasType = '1';
					self.paasServiceID = res.rows[0].id;
					self.paasType = '1';

				} else {
					setTimeout(function() {
						self.comp("popMenu").show();
					}, 1);
					return;

				}
			} else {
				alert("项目" + button.label + "有异常");
			}
		}, function(result) {
			alert("ERR:" + JSON.stringify(result))
		});

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
