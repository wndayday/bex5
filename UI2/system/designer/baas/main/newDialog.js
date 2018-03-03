define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
		this.path = justep.Bind.observable("");
		this.name = justep.Bind.observable("");
	};

	Model.prototype.OKBtnClick = function(event){
		this.owner.send({path:this.path.peek(),name:this.name.peek()+".service.m"});
		this.owner.close();
	};

	Model.prototype.modelParamsReceive = function(event){
		if(event.params && event.params.path){
			this.path.set(event.params.path);
			this.name.set(event.params.name||"");
		}
	};

	Model.prototype.input1Keypress = function(event){
		if(13===event.keyCode)
			this.OKBtnClick();
	};

	return Model;
});