define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.windowDialogReceive = function(event) {
		//this.comp("mainData").refreshData()
	};

	Model.prototype.editBtnClick = function(event) {
		var mainData = this.comp("mainData");
		var row = mainData.getCurrentRow();
		if (row) {
			this.comp("windowDialog").open({
				data : row
			});
		}
	};

	Model.prototype.dataSaveCommit = function(event) {
		justep.Util.hint("保存成功！", {
			type : 'success',
			parent : this.getRootNode()
		});
	};

	Model.prototype.addBtn = function(event) {
		var options = {
			action : "new",
		};
		this.comp("windowDialog").open({
			data : options
		});
	};

	return Model;
});