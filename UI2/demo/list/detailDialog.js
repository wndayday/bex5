define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.okBtnClick = function(event) {
		var mainData = this.comp("dialogData");
		//mainData.saveData()
		this.comp("windowReceiver").windowEnsure(mainData.getCurrentRow());
		
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.comp("windowReceiver").windowCancel();
	};

	Model.prototype.windowReceiverReceive = function(event) {
		var action = event.data.action;
		var mainData = this.comp('dialogData');
		//mainData.clear();
	
		if(action === 'new'){
			mainData.newData();
		}else{
//			var row = mainData.add();
//			row.assign(event.data);

			mainData.loadData(event.data);
			mainData.first();
		
//			mainData.setFilter("filter1",mainData.idColumn+"='" + event.data.getID() + "'");
//			mainData.refreshData();
		}
	};


	return Model;
});