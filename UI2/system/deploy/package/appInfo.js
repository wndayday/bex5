define(function(require) {

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.getParent().comp("cancelBtn").set({
			label : "关闭"
		});
		var appEngine = this.appEngine = this.getParent().appEngine;
		var config = this.appEngine.config;
		var hash = config.hash ? config.hash : appEngine.DEFAULT_HASH

		this._showBuildInfo(this.getParent().buildResponse);
		this.comp("resourceUpdateModeValue").set({
			"dataType" : "string",
			"value" : hash === 'md5' ? "Hash方式" : "版本号方式"
		});
		
	};
	Model.prototype.hasDownloadBtn = function(wizard) {
		var appEngine = this.getParent().appEngine, config = appEngine.config || {};
		var downloadInfo = appEngine.getDownloadInfo(config.projectName, config.appName);
		if (downloadInfo.android || downloadInfo.ios) {
			return true;
		}
		return false;
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

	Model.prototype.downloadPage = function(wizard) {
		this.getParent().openPage({
			id : "downloadApp",
			url : "$UI/system/deploy/package/downloadApp.w",
			fromId : "appInfo"
		});
	};

	Model.prototype.nextPage = function(wizard) {
		var appEngine = this.getParent().appEngine, config = appEngine.config || {};
		if (appEngine.getCompiled) {
			this.getParent().openPage({
				id : "selectPlatform",
				url : "$UI/system/deploy/package/selectPlatform.w",
				fromId : "appInfo"
			});
			return true;
		} else {
			if (confirm("获取服务端资源信息失败。发布后客户端将全量更新资源！")) {
				this.getParent().openPage({
					id : "selectPlatform",
					url : "$UI/system/deploy/package/selectPlatform.w",
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
