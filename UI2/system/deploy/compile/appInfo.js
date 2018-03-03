define(function(require) {

	var Model = function() {
		this.callParent();
		this.compiled = false;
	};

	Model.prototype.modelLoad = function(event) {
		this.callParent();
		var appEngine = this.appEngine = this.getParent().appEngine;
		var config = appEngine.config;
		var hash = config.hash ? config.hash : appEngine.DEFAULT_HASH
		this.comp("output11_1").set({
			"dataType" : "string",
			"value" : hash === 'md5' ? "Hash方式" : "版本号方式"
		});
		if ('md5' === hash) {
			this.comp("md5JSONFile").set({
				"dataType" : "string",
				"value" : config.serverURL + config.webPath + "/compileInfo.json"
			});
			this.comp("md5JSON").domNode.style.display = "";
			if (!appEngine.getCompiled) {
				this.comp("md5JSONFile").domNode.style.color = "RED";
			}
		} else {
			this.comp("md5JSON").domNode.style.display = "none";
		}

		this.getParent().comp("finishBtn").set({
			label : "编译"
		});

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

	Model.prototype.finish = function() {
		var config = this.appEngine.config;
		var compiled = this.appEngine.getCompiled;
		if (compiled) {
			this.getParent().openPage({
				id : "waittingDialog",
				url : "$UI/system/deploy/compile/waittingDialog.w",
				fromId : "appInfo"
			});
			return true;
		} else {
			if (confirm("获取服务端资源信息失败。发布后客户端将全量更新资源！")) {
				this.getParent().openPage({
					id : "waittingDialog",
					url : "$UI/system/deploy/compile/waittingDialog.w",
					fromId : "appInfo"
				});
				return true;
			} else {
				return false;
			}
		}

	};

	return Model;
});
