define(function(require){
	var Util = require("$UI/system/components/justep/common/common");
	//var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
		this.isVisible = Util.flag;
	};

	
	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/fragment/list/demo/listTable.js"
		});	
	};

	Model.prototype.showSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/fragment/list/demo/listTable.w&xid=listTable1"
		});	
	};

	return Model;
});