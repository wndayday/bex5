define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
		this.appName=justep.Bind.observable("");
		this.serveName=justep.Bind.observable("");
	};

	Model.prototype.chooseAppClick = function(event){
		this.comp("filetreeDialog").open({data:{key:"chooseApp"}});
	};

	Model.prototype.chooseServiceClick = function(event){
		this.comp("filetreeDialog").open({data:{key:"chooseService"}});
	};

	Model.prototype.filetreeDialogReceive = function(event){
		if(!event.data)return;
		if(event.data.key=="chooseApp"){
			this.appName.set(event.data.value);
		}else if (event.data.key=="chooseService"){
			this.serveName.set(event.data.value);
		}
	};

	Model.prototype.okBtnClick = function(event){
		if(this.appName.get()==""||this.serveName.get()==""){
			justep.Util.hint("不能有空值");
			return;
		}
		this.owner.send({data:{appName:this.appName.get(),serveName:this.serveName.get()}});
		this.owner.close();
	};

	Model.prototype.noBtnClick = function(event){
		this.owner.close();
	};

	return Model;
});