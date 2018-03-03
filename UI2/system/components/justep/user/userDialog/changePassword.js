define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var User = require("../user");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.passwordSaveBtnClick = function(event) {
		var oPassword = this.comp('oldPassword').val();
		var newPassword = this.comp("newPassword").val();
		var confirmPasswd = this.comp("confirmPasswd").val();
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

		if(this.userComp){
			var self = this;
			this.userComp.changePassword(oPassword,newPassword).then(
				function(){
					self.close();
				}
			);
		}
	};

	Model.prototype.modelParamsReceive = function(event){
		this.userComp = event.params && event.params.data && event.params.data.userComp;
	};
	
	return Model;
});