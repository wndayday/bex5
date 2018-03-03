define(function(require) {
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;
		var config = this.appEngine.getConfig();
		this.paasToken = config.paasToken;
		this.comp("modeRadioGroup").val(config.mode);
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择应用模式';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.validate = function() {
		return true;
	};

	Model.prototype.nextPage = function(wizard) {
		if (this.validate()) {
			var config = this.appEngine.getConfig();
			config.mode = this.comp("modeRadioGroup").get("value");

			this.getParent().openPage({
				id : "selectAppResources",
				url : "$UI/system/deploy/app/selectAppResources.w",
				fromId : "selectMode",
			});
		}
	};

	return Model;

});
