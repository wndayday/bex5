define(function(require) {
	var justep = require("$UI/system/lib/justep");

	var $ = require("jquery");

	var labers = {
		auto : '自动选择浏览引擎',
		system : '系统自带浏览引擎',
		crossWalk : 'CrossWalk浏览引擎',
		tencent : '腾讯浏览引擎'
	};
	var Model = function() {
		this.callParent();
		this.browserEngine = justep.Bind.observable(labers.auto);
	};

	Model.prototype.modelLoad = function(event) {
		this.getParent().comp("cancelBtn").set({
			label : "关闭"
		});
		this.appEngine = this.getParent().appEngine;
		this.init();
	};
	Model.prototype.init = function() {
		this._showBuildInfo(this.getParent().buildResponse);
	}

	Model.prototype._showBuildInfo = function(result) {
		var config = this.appEngine.getConfig();
		for ( var prop in config) {
			var comp = this.comp(prop);
			if (comp) {
				if (prop === 'browserEngine') {
					var self = this;
					$.each(labers, function(key, value) {
						if (key === config[prop]) {
							self.browserEngine.set(value);
							return true;
						}
					})
				} else {
					comp.set({
						value : config[prop]
					});
				}
			}
		}
	};

	Model.prototype.getTitle = function(wizard) {
		return '本地应用信息';
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

	Model.prototype.finish = function(wizard) {
		return true;
	};

	return Model;
});
