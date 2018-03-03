define(function(require){
	var $ = require("jquery");
	var utils = require("$UI/demo/plugin/utils");
	require("cordova!com.borismus.webintent")	
	var Model = function(){
		this.callParent();
	};
	Model.prototype.startActivityClick = function(event){
		window.plugins.webintent.startActivity({
		    action: window.plugins.webintent.ACTION_VIEW,
		    //打开微信客户端
		    url: 'weixin://'},
		    function() {alert("成功打开!")},
		    function() {alert('启动应用遇到了异常')}
		);
	};
	Model.prototype.hasExtraClick = function(event){
		window.plugins.webintent.hasExtra(window.plugins.webintent.EXTRA_TEXT,
		    function(has) {
		        // 存在指定的extra则返回true
				alert("存在Extra!")
		    }, function(args) {
		        // 失败回调
		    	alert(args)
		    }
		);
	};
	Model.prototype.getExtraClick = function(event){
		window.plugins.webintent.getExtra(window.plugins.webintent.EXTRA_TEXT,
	    function(url) {
	        // 获取EXTRA_TEXT的值
			alert(url);
	    }, function() {
	        // EXTRA没有值
	    	alert("获取Extra失败");
	    }
	);
	};
	Model.prototype.getUriClick = function(event){
		window.plugins.webintent.getUri(function(url) {
	    if(url !== "") {
	        // 被url调用时url的内容
	    	alert(url);
	    }
	});
	};
	Model.prototype.onNewIntentClick = function(event){
		window.plugins.webintent.onNewIntent(function(url) {
		    if(url !== "") {
		        // url is the url that was passed to onNewIntent
		    	alert(url);
		    }
		});
	};
	Model.prototype.sendBroadcastClick = function(event){
		window.plugins.webintent.sendBroadcast({
		            action: 'com.dummybroadcast.action.triggerthing',
		            extras: {
		                'option': true
		            }
		        }, function() {
		        	alert("发送广播成功");
		        }, function() {
		        	alert("发送广播失败");
		});
	};
	Model.prototype.modelModelConstructDone = function(event) {
		utils.showCode(this,"startActivityClick").showCode("hasExtraClick").showCode("getExtraClick").showCode("getUriClick").showCode("onNewIntentClick").showCode("sendBroadcastClick").prettyPrint();
	};
	return Model;
});