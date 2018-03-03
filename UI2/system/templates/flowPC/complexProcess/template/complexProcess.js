define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.addProductBtnClick = function(event) {
		var options = {
			action : "new",
		};
		this.comp("windowDialog").open({
			data : options
		});
	};

	Model.prototype.editProductBtnClick = function(event) {
		var mainData = this.comp("{{detail_data}}");
		var row = mainData.getCurrentRow();
		if (row) {
			this.comp("windowDialog").open({
				data : row
			});
		}
	};

	Model.prototype.hasOrderDetail = function() {
		return this.comp("{{detail_data}}").getCount() > 0;
	};

	Model.prototype.productDialogReceive = function(event) {
	};

	return Model;
});