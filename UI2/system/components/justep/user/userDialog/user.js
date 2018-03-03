define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
		
		this.userName = justep.Bind.observable("");
		this.phoneNumber = justep.Bind.observable("");
		this.email = justep.Bind.observable("");		
		this.userNameChar = justep.Bind.observable("");		
	};

	Model.prototype.modelParamsReceive = function(event){
		this.userComp = event.params && event.params.data && event.params.data.userComp;
		if(this.userComp && this.userComp.isLogined()){
			var user = this.userComp.getUser();
			this.userName.set(user.name);
			if(user.name) this.userNameChar.set(user.name.substring(0,1).toUpperCase());
			this.phoneNumber.set(user.phoneNumber);
			this.email.set(user.email);		
		}
	};

	Model.prototype.quitBtnClick = function(event){
		if(this.userComp)
			this.userComp.logout();
	};

	Model.prototype.changepwBtnClick = function(event){
		if(this.userComp)
			this.comp('dlgChangePassw').open({src:this.userComp.getDlgUrl('changePassword'), data:{userComp:this.userComp}});
	};

	return Model;
});