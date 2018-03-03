define(function(require) {

	var Model = function() {
		this.callParent();

	};

	Model.prototype.modelLoad = function(event) {
		this.callParent();
	};

	Model.prototype.finish = function(wizard) {
		// 设置到父页面，供waittingDialog调用
		this.getParent().startAppWiz = this.comp("startAppWiz").get("checked") === true;
		this.getParent().openPage({
			id : "waittingDialog",
			url : "$UI/system/deploy/app/waittingDialog.w",
			fromId : "appInfo"
		});

		return true;
	};

	return Model;
});
