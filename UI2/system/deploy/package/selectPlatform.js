define(function(require) {
	var templateService = require('$UI/system/templates/common/js/templateService');
	var appBuilderVersion = "3.7.0";
	var xpaas = require("$UI/system/deploy/paas/xpaas");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		var config = this.appEngine.getConfig();
		this.comp("androidCheckbox").val(config.platform && (config.platform.indexOf('android') >= 0));
		this.comp("iosCheckbox").val(config.platform && (config.platform.indexOf('ios') >= 0));
		this.comp("includeUIRes").val(config.mode === "4" ? false : config.includeUIRes);
		this.comp("includeUIRes").set({
			"disabled" : config.mode === "4"
		});
		this.comp("compileUI").val((config.mode === "4") ? false : config.compileUI);
		this.comp("compileUI").set({
			"disabled" : (config.mode === "4")
		});
		this.comp("releaseMode").val(config.releaseMode === "release");
		this.comp("useProxyBuilderServer").val(this.appEngine.ide.packerEnable ? true : config.useProxyBuilderServer);
		this.comp("useProxyBuilderServer").set("disabled", this.appEngine.ide.packerEnable);
		this.comp("proxyBuilderServer").val(xpaas.getAppBuilderServerUrl(config.platform));
		this._refreshProxyBuilderServerDiv();
	};

	Model.prototype.finish = function() {
		var self = this;
		var dtd = $.Deferred();
		var promise = dtd.promise();
		if (this.validate()) {
			var config = this.appEngine.getConfig();
			config.useProxyBuilderServer = this.comp("useProxyBuilderServer").get("checked") === true;

			if (!config.useProxyBuilderServer) {
				dtd.resolve("true");
				self.getParent().openPage({
					id : "waittingDialog",
					url : "$UI/system/deploy/package/waittingDialog.w",
					fromId : "selectPlatform"
				});
				return promise;
			} else {
				self.comp("finishPopOver").show();
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
										fromId : "selectPlatform"
									});
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

			}

		} else {
			dtd.resolve("false");
		}

		return promise;
	}

	Model.prototype.backPage = function() {
		this.checkStatusID && clearTimeout(this.checkStatusID);
	}
	Model.prototype._refreshProxyBuilderServerDiv = function() {
		if (this.comp("useProxyBuilderServer").get("checked") === true && !this.appEngine.getConfig().webIDE) {
			$(this.getElementByXid("proxyBuilderServerDiv")).show();
		} else {
			$(this.getElementByXid("proxyBuilderServerDiv")).hide();
		}
	};

	Model.prototype.__getRealAppBuilderServer = function(useProxyBuilderServer, appBuilderServer) {
		if (!useProxyBuilderServer) {
			appBuilderServer = "/app-builder";
		}
		if (appBuilderServer.indexOf("http") !== 0) {
			appBuilderServer = window.location.protocol + "//" + window.location.host + appBuilderServer;
		}

		return appBuilderServer;
	};

	Model.prototype.__checkAppBuilderServer = function(appBuilderServer) {
		var useProxyBuilderServer = this.comp("useProxyBuilderServer").get("checked") === true
		var sucess;
		var response = $.ajax({
			async : false,
			contentType : 'application/json',
			processData : false,
			type : 'GET',
			url : require.toUrl("$UI/system/deploy/package/test.j?appBuilderServer=" + appBuilderServer + "&useProxyBuilderServer=" + useProxyBuilderServer),
			success : function(result) {
				if (result && (result.state === "httpError")) {
					alert("打包服务器填写有误！请修改后再试");
					sucess = false;
				} else {
					sucess = true;
				}
			},
			error : function(xhr, status, err) {
				sucess = false;
				if ("parsererror" === status) {
					alert('连接打包代理服务成功，但打包代理服务版本不支持当前开发环境');
				} else {
					alert('连接打包代理服务失败，请检查代理服务地址是否正确');
				}
			}
		}).responseJSON;

		if (response && response.version && response.version.indexOf(appBuilderVersion) < 0) {
			alert('打包代理服务与Studio支持的版本不匹配。打包代理服务版本：' + response.version + '，Studio支持的版本：' + appBuilderVersion);
			sucess = false;
		}

		var version = response ? response : {};
		version.sucess = sucess;
		return version;
	};

	Model.prototype._confirmFileExistsNeeded = function(outputSrc, outputProjectName) {
		var appDir = this.getParent().nativePath + "/" + outputProjectName;
		return outputSrc && templateService.fileExists(appDir);
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择本地应用平台';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return true;
	};

	Model.prototype.validate = function() {
		if (xpaas.webIDE && xpaas.warning) {
			alert(xpaas.warning);
			return false;
		}
		var result = this.comp('androidCheckbox').get('checked') || this.comp('iosCheckbox').get('checked');
		if (!result) {
			alert("平台类型不能为空，请至少选择一种平台类型");
		} else {
			var config = this.appEngine.getConfig();
			config.platform = '';
			if (this.comp('iosCheckbox').get('checked')) {
				config.platform = 'ios';
			}
			if (this.comp('androidCheckbox').get('checked')) {
				config.platform += config.platform ? ',android' : 'android';
			}
			config.useProxyBuilderServer = this.comp("useProxyBuilderServer").get("checked") === true;
			xpaas.config.proxyBuilderServer = this.comp("proxyBuilderServer").get("value");
			config.proxyBuilderServer = xpaas.getAppBuilderServerUrl(config.platform);
			config.appBuilderServer = this.__getRealAppBuilderServer(config.useProxyBuilderServer, config.proxyBuilderServer);

			var appBuilderInfo = this.__checkAppBuilderServer(config.appBuilderServer);
			result = appBuilderInfo.sucess;

			if (result) {
				if (this.comp('iosCheckbox').get('checked')) {
					if (appBuilderInfo.platform.indexOf('ios') < 0) {
						alert('打包服务不支持ios平台，请检查服务地址是否正确。连接的打包服务支持的平台为：' + appBuilderInfo.platform + "。ios需要Mac OS X版WeX5作为服务。");
						return false;
					}
				}
				if (this.comp('androidCheckbox').get('checked')) {
					if (appBuilderInfo.platform.indexOf('android') < 0) {
						alert('打包服务不支持android平台，请检查服务地址是否正确。连接的打包服务支持的平台为：' + appBuilderInfo.platform);
						return false;
					}
				}

				config.includeUIRes = this.comp("includeUIRes").get("checked") === true;
				config.compileUI = this.comp("compileUI").get("checked") === true;
				config.releaseMode = (this.comp('releaseMode').get('checked') === true) ? "release" : "debug";

				config.outputSrc = this.comp("outputSrc").get('checked') === true;
				config.outputProjectName = this.comp("outputProjectName").val();
				if (config.outputSrc && !config.outputProjectName) {
					alert('输出源码工程名不能为空。');
					return false;
				}
				if (this._confirmFileExistsNeeded(config.outputSrc, config.outputProjectName) && !confirm("输出源码工程名“" + config.outputProjectName + "”已经存在，是否覆盖？如果覆盖原始目录将清空。")) {
					return false;
				}

				if ((config.platform.indexOf('android') >= 0) && !config.genAndroid) {
					alert('未配置Andoird证书，请编辑应用并在“配置开发者信息和证书”页设置Android证书相关信息。');
					return false;
				}

				if (config.platform.indexOf('ios') >= 0) {
					if ((config.releaseMode === "debug") && !config.genIOSDev) {
						alert('未配置IOS开发模式证书，请编辑应用并在“配置开发者信息和证书”页设置IOS开发证书相关信息。');
						return false;
					}
					if ((config.releaseMode === "release") && !config.genIOSDis) {
						alert('未配置IOS发布模式证书，请编辑应用并在“配置开发者信息和证书”页设置IOS发布证书相关信息。');
						return false;
					}
				}

			}
		}

		return result;
	};

	Model.prototype.androidImageClick = function(event) {
		var checkObj = this.comp('androidCheckbox');
		checkObj.val((checkObj.get("checked") !== true));
	};

	Model.prototype.iosImageClick = function(event) {
		var checkObj = this.comp('iosCheckbox');
		checkObj.val((checkObj.get("checked") !== true));
	};

	Model.prototype.useProxyBuilderServerChange = function(event) {
		this._refreshProxyBuilderServerDiv();
	};

	Model.prototype.testServerButtonClick = function(event) {
		var proxyBuilderServer = this.comp("proxyBuilderServer").get("value");
		if (proxyBuilderServer) {
			var appBuilderServer = this.__getRealAppBuilderServer(true, proxyBuilderServer);
			if (this.__checkAppBuilderServer(appBuilderServer).sucess) {
				alert('连接成功');
			}
		} else {
			alert('请先设置应用打包代理服务地址');
		}
	};

	Model.prototype.proxyBuildServerTimer = function(event) {

	};

	Model.prototype.modelActive = function(event) {
		this.comp("finishPopOver").hide();
	};

	return Model;
});
