define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var modesData = require("$UI/system/designer/service/lib/serverData");

	var dataAssembly = require("$UI/system/designer/service/lib/dataAssembly")

	var Model = function() {
		this.callParent();
		this.isAssembly = justep.Bind.observable("0");
		this.pageNum = justep.Bind.observable("");
		this.status = justep.Bind.observable("new");
	};

	// 数据加载
	Model.prototype.modelLoad = function(event) {
		
	};

	// 数据加载
	Model.prototype.modelParamsReceive = function(event) {debugger
		var actionData=this.comp("actionData");
		actionData.newData();
		this.list= this.params.data;
		
	};

	


	// ok
	Model.prototype.OkBtnClick = function(event) {
		var actionData=this.comp("actionData");
		if(!actionData.getValue("name")){
			justep.Util.hint("名称不能为空");
			return
		}
		if(!actionData.getValue("dec")){
			justep.Util.hint("描述不能为空");
			return
		}
		if(!actionData.getValue("content")){
			justep.Util.hint("说明不能为空");
			return
		}
		var isNot=false;
		if(this.list.length>0){
			this.list.forEach(function(item){
				if(item.name==actionData.getValue("name")){
					isNot=true;
				}
			})
		}
		if(isNot){
			justep.Util.hint("名称不能重复");
			return;
		}
		
		var param={
				name:actionData.getValue("name"),
				dec:actionData.getValue("dec"),
				content:actionData.getValue("content")
		}
		this.owner.send({data:param});
		this.owner.close();
	};

	Model.prototype.NOBtnClick = function(event){
			this.owner.close();
	};

	return Model;
});