define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var User = require("../user");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.sendSmsBtnClick = function(event) {
		var phoneNumber = this.comp("phonenumber").val();
		if(!User.phoneReg.test(phoneNumber)){
			justep.Util.hint(User.phoneHint, {
				'type' : 'danger'
			});
			return;			
		}
		var self = this;
		this.userComp.sendVerifyCode("passwordReset",phoneNumber).then(function(){
		});
		self.comp("sendSmsBtn").mytimer();
	};

	Model.prototype.okBtnClick = function(event) {
		var newPassword = this.comp("newPassword").val();
		var confirmPassword = this.comp("confirmPassword").val();
		var verifyCode = this.comp("verifyCode").val();
		var phoneNumber = this.comp("phonenumber").val();

		if(!User.phoneReg.test(phoneNumber)){
			justep.Util.hint(User.phoneHint, {
				'type' : 'danger'
			});
			return;			
		}

		if (!verifyCode) {
			justep.Util.hint("请输入验证码", {
				'type' : 'danger'
			});
			return;
		}

		if (newPassword !== confirmPassword) {
			justep.Util.hint('密码输入不一致', {
				'type' : 'danger'
			});
			return;
		}
		
		if (!User.passwordReg.test(newPassword)) {
			justep.Util.hint(User.passwordHint, {
				'type' : 'danger'
			});
			return;
		}
		
		if(this.userComp){
			var self = this;
			this.userComp.resetPassword(phoneNumber,verifyCode,newPassword).then(function(){
				self.close();
			});
		}
	};

	Model.prototype.modelLoad = function(event) {
		var comp = this.comp("sendSmsBtn");
		User.bindTimmer(comp, 60, "获取验证码", "重新发送");
	};

	Model.prototype.modelParamsReceive = function(event){
		this.userComp = event.params && event.params.data && event.params.data.userComp;
	};

	return Model;
});