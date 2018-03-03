define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.okBtnClick = function(event) {
		var mainData = this.comp("mainData");
		this.comp("windowReceiver").windowEnsure(mainData.getCurrentRow());
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.comp("windowReceiver").windowCancel();
	};

	Model.prototype.windowReceiverReceive = function(event) {
		this.action = event.data.action;
		var mainData = this.comp('mainData');
		mainData.clear();
		if (event.data.action === "new"){
			mainData.newData();
		}else{
			//mainData.setFilter("filter1",mainData.idColumn+"='" + event.data.getID() + "'");
			//mainData.refreshData();
			mainData.loadData([event.data.toJson()]);
			mainData.first();
			
		}
	};

	return Model;
});