define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");

	var modeData = require("../lib/serverData");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.okBtnClick = function(event) {
		var name = this.comp('nameInput').val();
		var type = this.comp('typeSelect').val();
		var me = this;
		if (me.arr.indexOf(name) >= 0) {
			justep.Util.hint("关系名称重复！");
			return;
		}
		if (!name) {
			justep.Util.hint("名称不能为空！");
			return;
		}
		if (!type) {
			justep.Util.hint("类型不能为空！");
			return;
		}
		this.comp('windowReceiver').windowEnsure({
			name : name,
			type : type
		});
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.comp('windowReceiver').windowCancel();
	};

	Model.prototype.windowReceiverReceive = function(event) {
		var path = event.data.path;
		this.arr = event.data.arr;
		var ownerModel = bizModel.loadFile(path).getOwnerModel();
		var typeData = this.comp("typeData");

		/*
		 * var arr = [ "String", "Integer", "Date", "DateTime", "Float", "Blob",
		 * "Time", "Decimal", "Text" ]; for(var i = 0; i<arr.length; i++){
		 * typeList.push({ value:arr[i] }) }
		 */
		/*
		 * ownerModel.queryAsJson("concept", function($node, jsonItem) {
		 * typeList.push({ value:jsonItem.name }) });
		 */
		var arr = modeData.modeTypes;
		typeData.loadData({
			"@type" : "table",
			"rows" : modeData.loadModeData(arr, "value")
		});
	};

	return Model;
});