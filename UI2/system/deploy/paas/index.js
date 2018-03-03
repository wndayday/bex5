/* ------------------------------------------------------------
向导主调度

主页面（wizard）接口：
	openPage = function(params)
	back = function(currentModel)
	refreshWizardPageStatus = function()

子页面接口:
	getTitle = function(wizard)
	hasCancelBtn = function(wizard)
	hasBackBtn = function(wizard)
	hasNextBtn = function(wizard)
	hasFinishBtn = function(wizard)
	nextPage = function(wizard)
	finish = function(wizard)
------------------------------------------------------------ */

define(function(require) {
	require("$UI/system/components/bootstrap/lib/js/bootstrap");
	var $ = require("jquery");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var AppEngine = require("$UI/system/deploy/common/js/appEngine");
	var webSocket = require('$UI/system/components/designerCommon/js/webSocketMng');
	var templateService = require('$UI/system/templates/common/js/templateService');
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var URL = require("$UI/system/lib/base/url");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var xpaas = require("$UI/system/deploy/paas/xpaas");
	var Model = function() {
		this.callParent();
		this.title = bind.observable("");
		this.hasCancelBtn = bind.observable(true);
		this.hasBackBtn = bind.observable(false);
		this.hasNextBtn = bind.observable(false);
		this.hasFinishBtn = bind.observable(false);
		this.hasDownloadBtn = bind.observable(false);
		this.currentCompose = null;
		this.pageIdx = 0;
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = new AppEngine('$UI/system/deploy/paas/deploy.j');
		this.appEngine.config.paasToken = xpaas.getPassToken();
		this.appEngine.config.sessionId = xpaas.getSessionId();
		if (this.appEngine.webIDE) {
			this.appEngine.config.paasSession = this.appEngine.config.sessionId;
		}
		var w = this.getContext().getRequestParameter("w");
		if (w != null && '' !== w && 'undefined' != w) {
			this.openPage({
				id : "appInfo",
				url : "$UI/system/deploy/paas/" + w + ".w",
				fromId : "index"
			});
		} else {
			this.openPage({
				id : "deployInfo",
				url : "$UI/system/deploy/paas/deployInfo.w",
				fromId : "index"
			});
		}
	};

	/*
	 * @param {Object} 形如：{url: url, id: id, fromId: formId, refresh: false)
	 * @returns {void}
	 */
	Model.prototype.openPage = function(params) {
		var composes = $(".compose");
		for (var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var id = params.id || "page_" + (this.pageIdx++);
		var refresh = params.refresh;
		var fromId = params.fromId;
		var composeNode = document.getElementById(id);
		if (!composeNode) {
			this.currentCompose = this._createCompose(id, params.url, fromId);
			composeNode = this.currentCompose.domNode;
		} else {
			this.currentCompose = Component.getComponent(composeNode);
			if (refresh) {
				this.currentContainer.refresh(null, null, true);
			}
			this._initWizardPage(this.currentCompose);
		}
		composeNode.style.display = "block";
		if (this.currentCompose.getInnerModel() && this.currentCompose.getInnerModel().init) {
			this.currentCompose.getInnerModel().init();
		}
	};

	Model.prototype.back = function(currentModel) {
		var fromId = currentModel.getContext().getRequestParameter("fromId");
		this.openPage({
			id : fromId
		});
	},

	Model.prototype.refreshWizardPageStatus = function() {
		this._initWizardPage(this.currentCompose);
	};

	/* 完成 */
	Model.prototype.finish = function() {
		var self = this;
		this.currentCompose.getInnerModel().finish().done(function(reslt) {
			if (reslt === "true") {
				self.appEngine.getConfig().paasConsoleURL = xpaas.getPaasURL();
				self.appEngine.build({
					async : true,
					checkStatusURL : "$UI/system/deploy/paas/checkDeploy.j"
				}, function(result) {
					self.buildFinished = true;
					self.buildResult = result;
					if (self.buildFinishedNotify) {
						self.buildFinishedNotify(result);
					}
					if (result.flag && result.code != "ERROR") {
						xpaas.face && xpaas.face.onFinished && xpaas.face.onFinished();
						templateService.refreshFile(self.appEngine.getNativePath() + '/' + self.appEngine.getConfig().projectName);
						templateService.selectFile(self.appEngine.getNativePath() + '/' + self.appEngine.getConfig().projectName + '/www');
					}
				});
			} else {
			}

		});

	}
	Model.prototype._composeLoaded = function(event) {
		this._initWizardPage(event.source);

	};

	Model.prototype._initWizardPage = function(compose) {
		this.title.set(compose.getInnerModel().getTitle());
		this.hasBackBtn.set(compose && compose.getInnerModel().hasBackBtn());
		this.hasNextBtn.set(compose && compose.getInnerModel().hasNextBtn && compose.getInnerModel().hasNextBtn());
		this.hasFinishBtn.set(compose && compose.getInnerModel().hasFinishBtn && compose.getInnerModel().hasFinishBtn());
		this.hasDownloadBtn.set(compose && compose.getInnerModel().hasDownloadBtn && compose.getInnerModel().hasDownloadBtn());
	};

	Model.prototype._createCompose = function(id, src, fromId) {
		src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (fromId ? ("&fromId=" + fromId) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("containerParentPaas"),
			src : src,
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('compose');
		return compose;
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.appEngine.closeDialog();
		if (this.owner && this.owner.close) {
			this.owner.close({
				data : 'close'
			});
		}
	};

	Model.prototype.backBtnClick = function(event) {
		if (this.currentCompose.getInnerModel().backPage) {
			this.currentCompose.getInnerModel().backPage(this);
		}

		this.back(this.currentCompose.getInnerModel());
	};

	Model.prototype.nextBtnClick = function(event) {
		this.currentCompose.getInnerModel().nextPage(this);
	};

	Model.prototype.finishBtnClick = function(event) {
		this.finish();
	};

	Model.prototype.downloadBtnClick = function(event) {
		var config = this.appEngine.getConfig();
		config.paasConsoleURL = xpaas.getPaasURL();
		if (!config.paasServiceID || "" === config.paasServiceID) {
			alert("请先在 “编辑本地App” 中配置CloudX5信息");
			return false;
		}
		this.currentCompose.getInnerModel().downloadPage(this);
	};

	Model.prototype.modelParamsReceive = function(event){
		if (event.data && event.data.data){
			if (event.data.data.apptype == 3){ //小程序制作
				this.appEngine.config.mode = '4';
				this.appEngine.config.uiMode = "UIX";
				this.appEngine.config.indexURL = "";
			}
		}
	};

	return Model;
});
