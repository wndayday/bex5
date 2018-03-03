define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = function() {
		this.callParent();
		this.apkPath = 'http://www.wex5.com/apps/wd.apk';
		this.ipaPath = 'http://www.wex5.com/apps/wd.ipa';
		this.indexUrl = 'http://192.168.1.137:8080/x5/UI2/demo/mainActivity.w';
	};

	Model.prototype.toUrl = function(url) {
		return url ? require.toUrl(url) : "";
	};

	Model.prototype.modelModelConstructDone = function(event) {

	};

	Model.prototype.isBadAndroid = function() {
		var bo = false;
		var ua = navigator.userAgent.toLowerCase();
		var version = ua.substr(ua.indexOf('android') + 8, 3);
		if (ua.indexOf("android"))
			if (parseFloat(version) < 4.4)
				bo = true;
		return bo;
	};

	Model.prototype.modelParamsReceive = function(event) {
		var context = this.getContext();
		// 获取URL中的参数
		this.ipaPath = context.getRequestParameter("ipaPath");
		this.apkPath = context.getRequestParameter("apkPath");
		this.indexUrl = context.getRequestParameter("indexUrl");
		var type = context.getRequestParameter("type");

		if (justep.Browser.isWeChat) {
			if (type == "open") {
				location.href = indexUrl;
			} else {
				$(this.getElementByXid("weixin-tip-img")).show();
			}
		} else {
			if (justep.Browser.isAndroid) {
				location.href = this.apkPath;
			} else if (justep.Browser.isIOS) {
				location.href = this.ipaPath;
			} else {
				// location.href = indexUrl;
			}
		}
	};

	return Model;
});