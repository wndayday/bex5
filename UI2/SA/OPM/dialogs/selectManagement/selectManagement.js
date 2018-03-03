define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
		this.arr = [];
	};
	
/*
	event.data = {
		"managed" : boolean
	}
*/

	Model.prototype.windowReceiverReceive = function(event) {
		var tempData = this.comp("tempData");
		var orgTreeData = this.comp("orgTreeData");
		var orgTreeGrid = this.comp("orgTreeGrid");
			
		if (event.data && event.data.managed) {
			this.comp("orgTreePC1").set({
				"manageCodes" : "systemManagement"
			});
			orgTreeData.getTreeOption().rootFilter = "1=1";
		} else {
			this.comp("orgTreePC1").set({
				"manageCodes" : ""
			});
			orgTreeData.getTreeOption().rootFilter = "";
		}
		orgTreeData.refreshData();
		
		$.each(orgTreeGrid.getCheckeds(), function(i, id) {
			orgTreeGrid.setRowChecked(id, false);
		});
		
		tempData.setValue("manageTypeID", "");
		tempData.setValue("manageTypeName", "");
	};

	Model.prototype.okBtnClick = function(event){
		var tempData = this.comp("tempData");
		var manageTypeData = this.comp("manageTypeData");
		var orgTreeData = this.comp("orgTreeData");
		var orgTreeGrid = this.comp("orgTreeGrid");
		
		if (tempData.val("manageTypeID") && orgTreeGrid.getCheckeds().length > 0) {
			var orgs = [];
			$.each(orgTreeGrid.getCheckeds(), function(i, id) {
				orgs.push(orgTreeData.getRowByID(id));
			});
			this.comp("windowReceiver").windowEnsure({
				"manageType" : manageTypeData.getRowByID(tempData.val("manageTypeID")),
				"orgs" : orgs 
			});
		} else {
			justep.Util.hint("请选择业务管理类型，并勾选要组织。", {
				"parent" : this.getRootNode(),
				"type" : "danger"
			});
		}
	};
	
	
	
	
	Model.prototype.searchBtnClick = function(event) {
		var self = this;
		for (var i = this.arr.length-1; i >= 1; i--) {
			var result = this.arr[i].split(".");
			self.comp('orgTreeGrid').collapseRow(result[0]);
		}
		
		var inputFilter = this.comp('filter');
		var v = inputFilter.$domNode.val();
		if (v) {
			this.comp('searchDialog').open({
				data : v
			});
		} else {
			this.comp('orgTreePC1').getTree().autoSize();
		}
	};

	Model.prototype.filterChange = function(event) {
		var v = event.source.val();
		if (!v)
			this.searchBtnClick();
	};

	Model.prototype.filterKeypress = function(event) {
		if (event.keyCode === 13) {
			this.searchBtnClick();
		}
	};

	Model.prototype.searchDialogReceived = function(event) {

		var sFID = event.data;
		this.arr = sFID.split("/");
		var self = this;
		var result;
		for (var i = 1; i < this.arr.length; i++) {
			result = this.arr[i].split(".");
			self.comp('orgTreeGrid').expandRow(result[0]);
		}
		self.comp('orgTreeGrid').setRowChecked(result[0], true);
	};

	

	return Model;
});