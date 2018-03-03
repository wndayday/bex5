define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var Dialog = require("$UI/system/components/justep/dialog/dialog");
	var MD5 = require("$UI/system/lib/base/md5");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var $ = require("jquery");

	var Model = function() {
		this.callParent();
		this.encryption = "";
	};

	Model.prototype.okBtnClick = function(event) {
		var result = {};
		if (this.currentCompose) {
			var innerModel = this.currentCompose.getInnerModel();
			if (innerModel && innerModel.beforeOkAction) {
				var msg = innerModel.beforeOkAction();
				if (msg) {
					alert(msg);
					return;
				}
			}
			if (innerModel && innerModel.getReturnValue) {
				result.returnValue = innerModel.getReturnValue();
			}
		}
		xuiService.pageOkAction(result);
	};

	Model.prototype.cancelBtnClick = function(event) {
		xuiService.pageCloseAction();
	};

	Model.prototype.refreshBtnClick = function(event) {
		window.location.reload();
	};

	Model.prototype.encrypt = function(str, key) {
		str = str instanceof Object ? JSON.stringify(str) : str;
		var ret = '', keyLen = key.length;
		for (var i = 0; i < str.length; i++) {
			ret += String.fromCharCode(str.charCodeAt(i) ^ key[i % keyLen]);
		}
		return ret;
	};

	Model.prototype.modelLoad = function(event) {
		// 为了获取用户名和密码，需要揭密
		var url = location.href;
		var keys = new justep.URL(url)
		var key = keys.getParam("key");
		if (!key) {
			return false;
		}
		var value = this.encrypt(justep.Base64.decode(key), [ 20, 54, 68, 73, 25, 11, 86, 34, 97, 33, 20, 20 ]);
		if (!value || key === "$skin=desktop") {
			return false;
		}
		value = JSON.parse(value);
		var login = value.url.login;
		var password = value.url.password;
		this.encryption = value.url.encryption;
		if (login && password) {
			this.getElementByXid("name").value = login;
			this.getElementByXid("password").value = password;
			this.loginClick();
			$(".page-header").html("注册成功，请返回到studio使用！");
			$(".page-body").css("display", "none");
		}
	};

	Model.prototype.createCompose = function(src) {
		var src = require.toUrl(src);
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src
		});
		$(compose.domNode).addClass('compose');
		return compose;
	};

	Model.prototype.loginClick = function(event) {
		var name = $(this.getElementByXid("name")).val();
		var password = $(this.getElementByXid("password")).val();
		if (!name || !password) {
			alert("用户名或密码不能为空！");
			return;
		}

		var remember = true;// this.comp("remember").val() ;
		var noDisplay = this.comp("noDisplay").val();
		var self = this;
		if (remember === undefined || remember === '') {
			remember = false;
		}
		if (noDisplay === undefined || noDisplay === '') {
			noDisplay = false;
		}
		var md5 = new MD5();
		var pswmd5 = "";
		if (this.encryption) {
			pswmd5 = password;
		} else {
			pswmd5 = md5.hex_md5_salt(password);
		}

		console.log(JSON.stringify({
			userName : name,
			password : pswmd5,
			remember : remember,
			noDisplay : noDisplay
		}));
		xuiService.loginPaas({
			userName : name,
			password : pswmd5,
			remember : remember,
			noDisplay : noDisplay
		}, function(result) {
			if (result.status == '1') {
				xuiService.pageCloseAction();
			}
		});
	};

	Model.prototype.rememberChange = function(event) {

	};
	Model.prototype.noDisplayChange = function(event) {
		var noDisplay = this.comp("noDisplay").val();
		xuiService.loginPaas({
			noDisplay : noDisplay
		}, function(result) {
			if (result.status == '0') {
				alert(result.message);
			}
		});
	};
	Model.prototype.noDisplayClick = function(event) {

	};
	Model.prototype.a1Click = function(event) {

	};

	Model.prototype.regBtnClick = function(event) {
		var loginUrl = window.location.href;
		// 在studio打开注册页面
		// window.location.href = templateService.getXCloudConsoleUrl() +
		// "/x5/UI2/SA/OPM/register/PTRegisterActivity.w?loginUrl=" +
		// encodeURIComponent(loginUrl);
		// 在浏览器打开登录页面
		templateService.openBrowser(templateService.getCloudX5ConsoleUrl() + "/x5/UI2/SA/OPM/register/PTRegisterActivity.w?loginUrl=" + encodeURIComponent(loginUrl));
	};
	return Model;
});
