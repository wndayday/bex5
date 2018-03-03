define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.noBtnClick = function(event){
		this.owner.close();
	};

	Model.prototype.okBtnClick = function(event){
		var value = this.comp("rpcNameInput").val();
		if(value){
			var data = {dara : value};
			this.owner.send(data);
			this.owner.close();
		}else{
			justep.Util.hint("请输入服务名称!", {type : "danger"});
		}
	};

	Model.prototype.chooseBtnClick = function(event){
		this.comp("serviceDialog").open({data : this.params.data});
	};

	Model.prototype.serviceDialogReceive = function(event){
		var result = event.data;
		this.owner.send({data : result});
		this.owner.close();
	};

	return Model;
}); 