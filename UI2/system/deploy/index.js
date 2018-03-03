define(function(require) {
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	var justep = require("$UI/system/lib/justep");
	var $ = require("jquery");
	var AppEngine = require("$UI/system/deploy/common/js/appEngine");
	var xpaas = require("$UI/system/deploy/paas/xpaas");
	var sessionTool = require("$UI/system/designer/paas/sessionTool");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.refreshBtnClick = function(event) {
		window.location.reload();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = new AppEngine('');
		this.xpaas = xpaas;
		this._showBuildInfo();

	};

	Model.prototype._showBuildInfo = function() {
		var config = this.appEngine.getConfig();
		for ( var prop in config) {
			var comp = this.comp(prop);
			if (comp) {
				comp.set({
					value : config[prop]
				});
			}
		}
	};

	Model.prototype.createCompose = function(src, params) {
		var src = require.toUrl(src);
		var self = this;
		params = params ? params : {};
		var dialog = xpaas.face = new WindowDialog({
			title : params.title || 'APP',
			showTitle : true,
			width : params.width || '70%',
			height : params.height || '70%',
			status : "normal",
			src : src,
			forceRefreshOnOpen : true,
			parentNode : this.getElementByXid("containerParent")
		});
		dialog.on('onClose', function(event) {
			window.setTimeout(function() {
				self.removeComponent(dialog);
				self.reLoadApp();
			}, 1);
		});
		dialog.open();
	};

	Model.prototype.reLoadApp = function(event) {
		this.appEngine.loadConfig(this.appEngine.getProjectName());
		this.xpaas.loadConfig();
		this._showBuildInfo();
	}

	Model.prototype.eventListenerReady = function(event) {
	}

	Model.prototype.modelUnLoad = function(event) {
	};

	Model.prototype.baasBtnClick = function(event) {
		sessionTool.check(function() {
			justep.Shell.showPage("baas");
		}, function(err) {
			alert(err);
		});
	};
	Model.prototype.uiBtnClick = function(event) {
		sessionTool.check(function() {
			justep.Shell.showPage('ui');
		}, function(err) {
			alert(err);
		});
	};

	Model.prototype.dbBtnClick = function(event) {
		sessionTool.check(function() {
			justep.Shell.showPage("db");
		}, function(err) {
			alert(err);
		});
	};

	Model.prototype.appConfigClick = function(event) {
		this.createCompose("$UI/system/deploy/app/index.w", {
			title : "移动应用编辑向导"
		});
	};

	Model.prototype.appPackClick = function(event) {
		this.createCompose("$UI/system/deploy/package/index.w", {
			title : "移动应用打包向导"
		});
	};

	Model.prototype.appPublishClick = function(event) {
		this.createCompose("$UI/system/deploy/paas/index.w", {
			title : "移动应用部署向导"
		});
	};

	Model.prototype.exportAppClick = function(event) {
		window.open(require.toUrl("$UI/system/deploy/app/export.j?paasURL=" + xpaas.getPaasURL() + "&filePath=" + "/Native/" + this.appEngine.getProjectName() + "&sessionId=" + xpaas.getSessionId()));
	};

	return Model;
});
