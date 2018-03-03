define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");
	var MD5 = require("$UI/system/lib/base/md5");
	var Model = function(){
		this.callParent();
		this.initBtnEnabled = justep.Bind.observable(true);
	};

	Model.prototype.initBtnClick = function(event){
		var self = this;
		var windowElement = $(self.getElementByXid("window"));
		windowElement.addClass("overlay");
		this.initBtnEnabled.set(false);
		var callback = function(data){
			windowElement.removeClass("overlay");
			self.initBtnEnabled.set(true);
			if (data.state){
				var msg = "初始化系统库成功。<br/><br/>系统管理员用户名：<span style='color:#FF0000;font-size:16px;font-weight:bold;'>system</span>，<br/>密码：<span style='color:#FF0000;font-size:16px;font-weight:bold;'>123456</span>"
				+ "<br/><br/>是否以系统管理员身份登录系统？";
				var okBack = function(){
					var client = data.response;
					loginDate = (function(){
							var date = new Date(), y, M, d;
							y = date.getFullYear();
							M = date.getMonth() + 1;
							d = date.getDate();
							return y + "-" + (M<10?"0":"") +  M + "-" + (d<10?"0":"") + d;
						})();
					var url = "$UI/portal/pc/index.w?client=" + client 
						+ "&username=system" 
						+ "&password=" + new MD5().hex_md5("123456")
						+ "&loginDate=" + loginDate;
					url = require.toUrl(url);	
					window.location.href=url;
				};
				var cancelBack = undefined;
				justep.Util.confirm(msg, okBack, cancelBack);
				
			}else{
				data.ignoreError = false;
			}
		};
		
		var options = {'url' : require.toUrl("$UI/SA/init/initSysDb.j"),
					   'contentType' : "json",
					   'callback' : callback,
					   'directExecute' : true,
					   'dataType' : "json"};
		biz.Request.sendAsyncRequest(options);
	};

	return Model;
});