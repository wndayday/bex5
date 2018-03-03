define(function(require){
	var justep = require("$UI/system/lib/justep");
	var User = require("../user");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.okBtnClick = function(event){
		var userPassword = this.comp("userPassword").val();
		var passWordAgain = this.comp("passwordAgain").val();
		var phoneNumber = this.comp("phonenumber").val();
		var userName = this.comp("nameInput").val() || phoneNumber;
		var email = this.comp("emailInput").val() || "default@mail.com";
		var verifyCode = this.comp("verifyCode").val();
		if(!User.phoneReg.test(phoneNumber)){
			justep.Util.hint(User.phoneHint, {
				'type' : 'danger'
			});
			return;			
		/*}else if(!User.emailReg.test(email)){
			justep.Util.hint(User.emailHint, {
				'type' : 'danger'
			});
			return;
		}eles if (!userName) {
			justep.Util.hint('请输入姓名!', {
				'type' : 'danger'
			});
			return*/			
		}else if(!verifyCode){
			justep.Util.hint('请输入验证码', {
				'type' : 'danger'
			});
			return;			
		}else if(!User.passwordReg.test(userPassword)){
			justep.Util.hint(User.passwordHint, {
				"type" : "danger"
			});
			return;
		}else if(userPassword !== passWordAgain){
			justep.Util.hint('密码输入不一致!', {
				'type' : 'danger'
			});
			return;
		}
		if(this.userComp){
			var self = this;
			this.userComp.register({
				userName: phoneNumber,
				name: userName,
				code: verifyCode,
				phoneNumbers: phoneNumber,
				emails: email,
				password: userPassword
			}).then(function(){
				self.close();
			});
		}
	};

	Model.prototype.modelParamsReceive = function(event){
		this.userComp = event.params && event.params.data && event.params.data.userComp;
	};

	Model.prototype.sendSmsBtnClick = function(event){
		var phoneNumber = this.comp("phonenumber").val();
		if(!User.phoneReg.test(phoneNumber)){
			justep.Util.hint(User.phoneHint, {
				'type' : 'danger'
			});
			return;			
		}
		var self = this;
		this.userComp.sendVerifyCode("accountCreate",phoneNumber).then(function(){
		});
		self.comp("sendSmsBtn").mytimer();
	};

	Model.prototype.modelLoad = function(event){
		var comp = this.comp("sendSmsBtn");
		User.bindTimmer(comp, 60, "获取验证码", "重新发送");
	};

	Model.prototype.moreBtnClick = function(event){
		$(this.getElementByXid("moreInfo")).toggleClass("hide");
	};

	return Model;
});