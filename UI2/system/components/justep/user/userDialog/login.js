define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	require("cordova!com.justep.cordova.plugin.weixin.v3");	

	var oauth2 = require("../js/oauth2");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.login = function() {
		var name = this.comp('name');
		var password = this.comp('password');
		var params = {};
		params.name = name.val() || $("[xid=name]").val();// 为了支持360急速浏览器,
		// 自动设置参数的情况
		params.password = password.val() || $("[xid=password]").val();// 同上
		if (params.name === '') {
			justep.Util.hint('请输入登录电话号码!', {
				'type' : 'danger'
			});
			return;
		}
		if (this.userComp) {
			var self = this;
			this.userComp.login(params).then(function() {
				self.close();
			});
		}
	};

	Model.prototype.loginBtnClick = function(event) {
		this.login();
	};

	Model.prototype.div1Keypress = function(event) {
		if (13 === event.keyCode)
			this.login();
	};

	Model.prototype.modelParamsReceive = function(event) {
		this.userComp = event.params && event.params.data && event.params.data.userComp;
	};

	Model.prototype.regBtnClick = function(event) {
		if (this.userComp)
			this.comp('dlgRegister').open({
				src : this.userComp.getDlgUrl('register'),
				data : {
					userComp : this.userComp
				}
			});
	};

	Model.prototype.btnForgetClick = function(event) {
		if (this.userComp)
			this.comp('dlgForget').open({
				src : this.userComp.getDlgUrl('forgetPassword'),
				data : {
					userComp : this.userComp
				}
			});
	};

	Model.prototype.weiXinLoginClick = function(event) {
		var self = this;
		var doLogin = function(data) {
			var user = {
				id: data.openid,
				userName: data.nickname,
				name: data.nickname,
				emails : 'x5@weixin.com',
				phoneNumbers : '',
				password: data.openid
			};
			if (self.userComp) {
				self.close();
				self.userComp.weChatLogin(user);
			}
		}
		
		if(justep.Browser.isMobileFromUserAgent) {
			//手机app
			if (!navigator.weixin) {
				justep.Util.hint("请安装最新版本(含插件)体验！");
				return;
			};
			var weixin = navigator.weixin;
			weixin.ssoLogin(function() {
				weixin.getUserInfo(doLogin, function(reason) {
					justep.Util.hint("登录失败: " + JSON.stringify(reason), {
						"type" : "danger"
					});
				});
			}, function(reason) {
			});			
		} else {
			//PC浏览器
			var gatewayUrl = window.location.href.substr(0,5) === "https" ? "https://" : "http://";
			gatewayUrl += window.location.host;
			oauth2.getWeiXinAuthUrl(gatewayUrl, window.location.href).then(function(data) {
				window.location.href = data.auth_url;
			});
		}
	}

	return Model;
});