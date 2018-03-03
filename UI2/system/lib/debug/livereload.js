define(function(require){
	/*require('res!./console.js');*/
	var $ = require("jquery");
	var Browser = require("$UI/system/lib/base/browser");
	(function(){
		if(window.__justep && window.__justep.isDebug && location.href.indexOf('livereload=false')==-1 && location.href.indexOf('/system/designer')==-1 && (window.WebSocket || window.MozWebSocket)){
			if(Browser.isMobileFromUserAgent){
				require(['$UI/system/lib/debug/console']);
			}
			setTimeout(function(){
				$.getScript("http://"+location.hostname+":35729/livereload.js");
			},2000);
		}
	})();
	return {};
});