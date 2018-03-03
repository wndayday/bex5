define(function(require){
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		var flag = sessionStorage.getItem("isQuick") || justep.Util.getGlobalValue('isQuick');
		var url = "";
		if(flag == "true"){
			url = require.toUrl("$UI/system/designer/webIde/quickIde/propPages/tableSetting/dataTableSetting.w");
		}else{
			url = require.toUrl("./dataManage.w");
		}
		this.comp('windowContainer1').load(url);
	};

	return Model;
});