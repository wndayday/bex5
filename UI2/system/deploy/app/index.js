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
	var justep = require("$UI/system/lib/justep");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var AppEngine = require("$UI/system/deploy/common/js/appEngine");

	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var xpaas = require("$UI/system/deploy/paas/xpaas");

	var Model = function() {
		this.callParent();
		this.title = bind.observable("");
		this.hasCancelBtn = bind.observable(true);
		this.hasBackBtn = bind.observable(false);
		this.hasNextBtn = bind.observable(true);
		this.hasFinishBtn = bind.observable(false);
		this.hasSkipEditBtn = bind.observable(false);
		this.hasSimpleBtn = bind.observable(false);
		this.currentContainer = null;
		this.pageIdx = 0;
		this.appEngine = new AppEngine('$UI/system/deploy/app/createApp.j');
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		xpaas.nativeReady(function() {
			self.hasSkipEditBtn && self.hasSkipEditBtn.set(true);
		});
		this.edit = this.appEngine.getEdit();
		var config = this.appEngine.getConfig();
		this.comp("appName").val(config.appName || "");
		config.paasToken = xpaas.getPassToken();
		config.paasSession = config.sessionId = xpaas.getSessionId();
		if (this.appEngine.quickIDE) {
			this.openPage({
				id : "selectAppResources",
				url : "$UI/system/deploy/app/selectAppResources.w",
				fromId : "index"
			});
		} else {
			this.openPage({
				id : "selectMode",
				url : "$UI/system/deploy/app/selectMode.w",
				fromId : "index"
			});
		}
	};

	/*
	 * @param {Object} 形如：{url: url, id: id, fromId: formId, refresh: false)
	 * @returns {void}
	 */
	Model.prototype.openPage = function(params) {
		var containers = $(".container");
		for (var i = 0; i < containers.length; i += 1) {
			containers[i].style.display = "none";
		}
		var id = params.id || "page_" + (this.pageIdx++);
		var refresh = params.refresh;
		var fromId = params.fromId;
		var containerNode = document.getElementById(id);
		if (!containerNode) {
			this.currentContainer = this._createContainer(id, params.url, fromId);
			containerNode = this.currentContainer.domNode;
		} else {
			this.currentContainer = Component.getComponent(containerNode);
			if (refresh) {
				this.currentContainer.refresh(null, null, true);
			} else {
				this._initWizardPage(this.currentContainer);
			}
		}
		containerNode.style.display = "block";
		containerNode.style.width = "100%";

		if (this.currentContainer.getInnerModel() && this.currentContainer.getInnerModel().init) {
			this.currentContainer.getInnerModel().init();
		}
	};

	Model.prototype.back = function(currentModel) {
		var fromId = currentModel.getContext().getRequestParameter("fromId");
		this.openPage({
			id : fromId
		});
	},

	Model.prototype.refreshWizardPageStatus = function() {
		this._initWizardPage(this.currentContainer);
	};

	Model.prototype.finish = function() {
		var config = this.appEngine.getConfig();
		if (!config.appName) {
			alert("“应用名”不能为空");
			return;
		}

		var appDir = this.appEngine.getNativePath() + "/" + config.projectName;
		var self = this;
		if ((!this._confirmFileExistsNeeded(appDir) || confirm("新建的应用名“" + config.projectName + "”已经存在，是否覆盖？如果覆盖原始目录将清空。")) && this.currentContainer.getInnerModel().finish(this)) {
			this.appEngine.build({
				async : true,
				checkStatusURL : "$UI/system/deploy/app/checkSaving.j"
			}, function(result) {
				self.buildFinished = true;
				self.buildResult = result;
				if (self.buildFinishedNotify) {
					self.buildFinishedNotify(result);
				}
				if (result.flag && result.code != "ERROR") {
					xpaas.face && xpaas.face.onFinished && xpaas.face.onFinished();
					templateService.refreshFile(self.appEngine.getNativePath());
					templateService.selectFile(self.appEngine.getNativePath() + '/' + self.appEngine.getConfig().projectName);
				}
			});
		}
	};

	Model.prototype._containerLoaded = function(event) {
		this._initWizardPage(event.source);

	};

	Model.prototype._initWizardPage = function(container) {
		this.title.set(container.getInnerModel().getTitle());
		this.hasBackBtn.set(container && container.getInnerModel().hasBackBtn());
		this.hasNextBtn.set(container && container.getInnerModel().hasNextBtn());
		this.hasFinishBtn.set(container && container.getInnerModel().hasFinishBtn());
		if (container && container.getInnerModel().hasSkipEditBtn) {
			this.hasSkipEditBtn.set(container.getInnerModel().hasSkipEditBtn());
		}
		this.hasSimpleBtn.set(container && container.getInnerModel().hasSimpleBtn && container.getInnerModel().hasSimpleBtn());
	};

	Model.prototype._createContainer = function(id, src, fromId) {
		src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (fromId ? ("&fromId=" + fromId) : ""));
		var container = new WindowContainer({
			parentNode : this.getElementByXid("containerParentApp"),
			src : src,
			onLoad : this._containerLoaded.bind(this)
		});
		$(container.domNode).attr('id', id);
		$(container.domNode).addClass('container');
		return container;
	};

	Model.prototype._confirmFileExistsNeeded = function(appDir) {
		return !this.edit && templateService.fileExists(appDir);
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.appEngine.closeDialog();
		templateService.closeDialog();
		if (this.owner && this.owner.close) {
			this.owner.close();
		}
	};
	Model.prototype.simpleBtnClick = function(event) {
		xpaas.face && xpaas.face.open({
			title : "打包",
			src : require.toUrl("$UI/system/deploy/package/index.w")
		});
	};

	Model.prototype.backBtnClick = function(event) {
		if (this.currentContainer.getInnerModel().backPage) {
			this.currentContainer.getInnerModel().backPage(this);
		}
		this.back(this.currentContainer.getInnerModel());
	};

	Model.prototype.nextBtnClick = function(event) {
		if (this.currentContainer.getInnerModel()) {
			this.currentContainer.getInnerModel().nextPage(this);
		}
	};

	Model.prototype.finishBtnClick = function(event) {
		var config = this.appEngine.getConfig();
		config.appName = this.comp("appName").get("value");
		if (!this.edit) {
			if (!config.projectName) {
				config.projectName = config.appName;
			}
		}
		this.finish();
	};

	Model.prototype.openAppWiz = function(wizard) {
		if (this.appEngine.webIDE) {
			xpaas.face && xpaas.face.open({
				title : "打包-高级模式",
				src : require.toUrl("$UI/system/deploy/package/index.w?w=appInfo")
			});
		} else {
			var href = window.location.href;
			var url = href.substring(href.indexOf("?") + 1);
			var params = url.split("&");
			for (var i = 0; i < params.length; i++) {
				if (params[i].indexOf('targetPath=') === 0) {
					params[i] = 'targetPath=' + this.appEngine.getNativePath() + '/' + this.appEngine.getConfig().projectName;
					break;
				}
			}
			window.location.href = require.toUrl("$UI/system/deploy/package/index.w?" + params.join('&'));
		}
	};

	Model.prototype.skipEditBtnClick = function(event) {
		this.openAppWiz();
	};

	return Model;
});
