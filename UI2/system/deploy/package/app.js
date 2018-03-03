define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelModelConstructDone = function(event) {

	};
	Model.prototype.modelParamsReceive = function(event) {
		var context = this.getContext();
		var plistURL = "";
		var ip = context.getRequestParameter("ip");
		var projectName = context.getRequestParameter("projectName");
		var packageName = context.getRequestParameter("packageName");
		var appName = context.getRequestParameter("appName");
		var ipaUrl = context.getRequestParameter("ipaUrl") || "";
		if (justep.Browser.isWeChat) {
			$(this.getElementByXid("weixin-tip-img")).show();
		} else {
			if (justep.Browser.isIOS) {
				ipaUrl = ipaUrl.indexOf(".ipa") > -1 ? ipaUrl : "https://" + ip + require.toUrl("$UI/system/deploy/package/download.j");
				plistURL = "https://" + ip + require.toUrl("$UI/system/deploy/package/download.j");
				var plistParameter = "platform=webideIOS&projectName=" + projectName + '&appName=' + appName + '&packageName=' + packageName + '&ipaUrl=' + ipaUrl;
				location.href = "itms-services://?action=download-manifest&url=" + plistURL + "?" + plistParameter.replace(/=/g, "%3d").replace(/&/g, "%26");
			} else {
				// location.href = indexUrl;
			}
		}
	};

	return Model;
});