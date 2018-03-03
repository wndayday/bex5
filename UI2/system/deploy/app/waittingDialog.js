define(function(require) {
	var xpaas = require("$UI/system/deploy/paas/xpaas");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.getSucessInfo = function(result) {
		return "保存成功！";
	};
	
	Model.prototype.hasSkipEditBtn = function(wizard) {
		return false;
	};

	Model.prototype._showBuildStatus = function(result) {
		if (result.flag && (result.code != "ERROR")) {
			if (this.getParent().startAppWiz) {
				this.getParent().openAppWiz();
			} else {
				this.appEngine.closeDialog();
				setTimeout(function() {
					xpaas.face && xpaas.face.close();
				}, 100);
			}
		} else {
			this.callParent(result);
		}
	};

	return Model;
});
