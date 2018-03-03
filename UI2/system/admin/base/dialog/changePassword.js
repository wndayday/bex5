define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var UAA = require('$UI/system/components/justep/user/js/uaa');
	var User = require("$UI/system/components/justep/user/user");
	
	var Model = function() {
		this.callParent();
	};


	Model.prototype.cancelBtnClick = function(event) {
		this.closePage();
	};

	Model.prototype.closePage = function() {
		this.owner.close();
	};

	Model.prototype.okBtnClick = function(event) {
		var oPassword = this.comp('oldPassword').val();
		var newPassword = this.comp("password1").val();
		var confirmPasswd = this.comp("password2").val();
		var passwordReg = User.passwordReg;

		if (newPassword !== confirmPasswd) {
			justep.Util.hint("新密码不一致！", {
				"type" : "danger"
			});
			return;
		}

		if (!passwordReg.test(newPassword)) {
			justep.Util.hint(User.passwordHint, {
				"type" : "danger"
			});
			return;
		}

		var self = this;
		UAA.changePassword(oPassword,newPassword).then(
				function(){
					self.close();
				},
				function(){
					justep.Util.hint("修改密码失败！", {
						"type" : "danger"
					});
				}
		);
	};

	return Model;
});