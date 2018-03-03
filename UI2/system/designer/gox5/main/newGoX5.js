define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/
	//var IDEService = require("../../common/IDEService");
	//var xCloudService = IDEService.getXCloudService();
	var xmlUtil = require('$UI/system/lib/base/xml');
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/
	
	var Model = function(){
		this.callParent();
		this.path = justep.Bind.observable("");
		this.name = justep.Bind.observable("");
		this.operator = justep.Bind.observable("");
		this.key = justep.Bind.observable("");
		this.filePath = "UI2/system/designer/webIde/config/dscfg.xml";
	};

	Model.prototype.modelParamsReceive = function(event){
		if(event.params && event.params.path){
			this.path.set(event.params.path);
			this.name.set(event.params.name);
			this.key.set(event.params.key);
			this.operator.set(event.params.operator);
		}
	};

	Model.prototype.OKBtnClick = function(event){
	    if(this.name.get() == undefined){
	    	justep.Util.hint("名称不能为空");
	    }else{
	    	this.owner.send({path:this.path.get(),name:this.name.get(),operator:this.operator.get(),key:this.key});
	    	this.owner.close();
	    }
	};

	return Model;
});