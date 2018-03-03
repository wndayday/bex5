define(function(require){
	var $ = require('jquery');
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	return {
		loadContent:function(contents, xid, url, fn){
			var content = contents.getContent(xid);
			if (!content) {
				content = contents.add({
					xid : xid
				});
			}
			var parentNode = content.$domNode.get(0);
			var compose = new WindowContainer({
				parentNode : parentNode,
				src : url,
				onLoad : function() {
					fn && fn();
					content.on("onActive", function() {
						if (compose.getInnerModel()) {
							compose.getInnerModel().fireEvent('onActive');
						}
					});
				},
				onLoadError : function(err) {
					fn && fn(err);
				}
			});
			content.innerContainer = compose;
			return content;
		},
		attachDoubleClickExitApp:function(conditionFn){
			var exitDtd = $.Deferred();
			if(this.attached === true){
				exitDtd.reject();
			}else{
				this.attached = true;
				document.addEventListener("deviceready", function() {
					var exitAppTicker = 0;
					var listener = function(){
						if(conditionFn()){
							if(exitAppTicker === 0){
								exitAppTicker++;
								var msg = $('<div style="display: none;z-index:99999;position: fixed;width: 100%;bottom: 25px;text-align: center;"><span style="font-size:18px;border-radius: 3px;padding: 7px;background-color: #383838;color: #F0F0F0;">再按一次退出应用</span></div>').appendTo('body');
								msg.fadeIn(400).delay(2000).fadeOut(400,function(){
									exitAppTicker = 0;
									msg.remove();
								});
							}else if(exitAppTicker == 1){
								exitDtd.resolve();
								navigator.app.exitApp();
							}	
						}else{
							if($('html').hasClass("x-focus-in")){
								$('html').removeClass("x-focus-in");
							}else{
								history.back();
								//justep.Shell.closePage();
							}
						}
					};
					document.addEventListener('backbutton', listener, false);
					$(window).on('beforeunload', function(){
						document.removeEventListener('backbutton', listener, false);
				    });
		        }, false);
			}
			return exitDtd.promise();
		},
		getShareUrl:function(url){
			var currentUrl = new justep.URL(url || location.href);
			if(currentUrl.getHash()){
				var _shareHash = currentUrl.getHash();
				currentUrl.setParam("_shareHash",_shareHash);
				currentUrl.setHash();
			}
			return currentUrl.toString();
		}
	};
});