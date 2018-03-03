define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelParamsReceive = function(event){
		action = event.params.action;
		var mainData = this.comp('dialogData');
		mainData.clear();
		if (action === "new") {
			mainData.newData();
		} else {
			mainData.loadData([event.params]);
			mainData.first();
		}
	};

	Model.prototype.okBtnClick = function(event) {
		var mainData = this.comp('dialogData');
		this.owner.send(mainData.getCurrentRow());
		this.close();
	};

	return Model;
});