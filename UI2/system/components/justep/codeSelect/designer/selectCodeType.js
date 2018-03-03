define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		var codeTypes = IDEService.callService({
			name : "com.justep.studio.servicehanler.BizAppService.getCodeType",
			params : {}
		});
		this.comp("typeData").loadData(codeTypes);
		this.comp("typeData").first();
		this.comp("dataTables1").reload();
	};

	Model.prototype.getReturnValue = function() {
		var type = this.comp('typeData').getValue("sType");
		var config = {};
		config[this.params.propName] = type;
		return config;
	};

	return Model;
});