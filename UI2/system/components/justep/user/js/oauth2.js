define(function(require) {
	var $ = require("jquery");
	
	var getAuthUrl = function(url) {
		var dfd = $.Deferred();
		$.ajax({
			method : "GET",
			url : url
		}).done(function(data) {
			dfd.resolve(data);
		}).fail(function(error) {
			dfd.reject(error);
		});	
		return dfd.promise();
	};
	
	var getWeiXinAuthUrl = function (gatewayUrl, indexUrl) {
		return getAuthUrl(gatewayUrl + "/weixin-login?referrer_url=" + gatewayUrl + "|" + indexUrl);
	};
	
	var getQQAuthUrl = function (gatewayUrl, indexUrl) {
		return getAuthUrl(gatewayUrl + "/qq-login?referrer_url=" + gatewayUrl + "|" + indexUrl);
	};
	
	var getWeiBoAuthUrl = function (gatewayUrl, indexUrl) {
		return getAuthUrl(gatewayUrl + "/weibo-login?referrer_url=" + gatewayUrl + "|" + indexUrl);
	};
	
	return {
		getWeiXinAuthUrl: getWeiXinAuthUrl,
		getQQAuthUrl: getQQAuthUrl,
		getWeiBoAuthUrl: getWeiBoAuthUrl
	};
});