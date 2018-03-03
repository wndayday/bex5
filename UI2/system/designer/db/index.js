define(function(require) {
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var sessionTool = require("$UI/system/designer/paas/sessionTool");
	var justep = require("$UI/system/lib/justep");
	var $ = require("jquery");
	
	var DB_SERVER = "server=database";
	var DB_X5 = "username=&paasURL=" + sessionStorage.getItem('paasURL') + "/paas/sys/temps&sessionId=" + sessionStorage.getItem('sessionId');
	var DB_URL = location.protocol + "//" + location.host + "/db-admin?" + DB_SERVER + "&" + DB_X5;

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.dbContainer = this.getElementByXid("dbContainer");
		this.createCompose(DB_URL);
	};

	Model.prototype.createCompose = function(src) {
		this.dbFrame = document.createElement('iframe');
		this.dbFrame.style.cssText = "border:0;width:100%;height:100%";
		this.dbFrame.src = src;
		this.dbContainer.appendChild(this.dbFrame);
		this._recalcHeight();
		var self = this;
		$(window).resize(justep.Util.bindModelFn(self, self._recalcHeight));
	}

	Model.prototype.mainBtnClick = function(event) {
		sessionTool.check(function() {
			justep.Shell.showPage("ui");
		}, function(err) {
			alert(err);
		});
	};
	
	Model.prototype._recalcHeight = function() {
		var height = $(this.getElementByXid("bodyOfDB")).height();
		$(this.dbContainer).height(height);
	};
	
	Model.prototype.appBtnClick = function(event) {
		sessionTool.check(function() {
			justep.Shell.showPage("app");
		}, function(err) {
			alert(err);
		});
	};

	Model.prototype.baasBtnClick = function(event) {
		sessionTool.check(function() {
			justep.Shell.showPage("baas");
		}, function(err) {
			alert(err);
		});
	};

	Model.prototype.modelActive = function(event) {
		this._recalcHeight();
	};
	
	return Model;
});
