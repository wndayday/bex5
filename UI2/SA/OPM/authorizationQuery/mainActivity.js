define(function(require) {
	require('css!../css/panel').load();

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");

	var Model = function() {
		this.callParent();
		this.arr = [];
		this.arr2 = [];
	};

	Model.prototype.navsClick = function(event) {
		this.comp("contents").to(event.index);
		if (event.index == 1) {
			this.comp("funcTreeData").open();
		}
	};

	Model.prototype.orgTreeDataIndexChanged = function(event) {
		this.comp("permissionByOrgData").refreshData();
	};

	Model.prototype.permissionByOrgDataRefreshCreateParam = function(event) {
		var orgTreeData = this.comp("orgTreeData");
		var orgFID = orgTreeData.getValue("sFID");

		event.param.setString("orgFID", orgFID);
		event.param.setBoolean("includeInherited", true);
	};

	Model.prototype.funcTreeDataCustomRefresh = function(event) {
		biz.Request.sendHttpRequest({
			"contentType" : "application/json",
			"url" : require.toUrl("$UI/SA/OPM/dialogs/selectFunction/getFunctionData.j?mode=tree"),
			"callback" : function(xhr, ts) {
				if (biz.Request.isSuccess(xhr)) {
					event.source.loadData(xhr.responseJSON);
				}
			}
		});
	};

	Model.prototype.funcTreeDataIndexChanged = function(event) {
		this.comp("orgByPermissionData").refreshData();
	};

	Model.prototype.orgByPermissionDataRefreshCreateParam = function(event) {
		var funcData = this.comp("funcTreeData");
		var process = funcData.getValue("process");
		var activity = funcData.getValue("activity");
		
		event.param.setString("process", process);
		event.param.setString("activity", activity);
	};

	Model.prototype.searchBtnClick = function(event) {

		var self = this;
		for (var i = this.arr.length - 1; i >= 1; i--) {
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
			this.comp('orgTreePC').getTree().autoSize();
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
		self.comp('orgTreeGrid').setSelection(result[0]);
	};

	Model.prototype.filterChange1 = function(event) {
		var v = event.source.val();
		if (!v)
			this.searchClick();
	};

	Model.prototype.filterKeypress1 = function(event) {
		if (event.keyCode === 13) {
			this.searchClick();
		}
	};

	Model.prototype.searchClick = function(event) {
		var self = this;
		for (var i = this.arr2.length - 1; i >= 0; i--) {
			self.comp('funcTreeGrid').collapseRow(this.arr2[i]);
		}

		var inputFilter = this.comp('filter2');
		var v = inputFilter.$domNode.val();
		
		if (v) {
			this.comp('search2Dialog').open({
				data : v
			});
		} else {
		}
		
	};




	Model.prototype.search2DialogReceived = function(event){
		var arr = event.data;
		var data = this.comp('funcTreeData');
		var self = this;
		var result;
		for(var i = 1; i<arr.length; i++){
			data.each(function(option){
				if(option.row.val('label') == arr[i]){
					self.arr2.push(option.row.val('id'));
				}
			})
		}
		for (var i = 0; i < this.arr2.length; i++) {
			self.comp('funcTreeGrid').expandRow(this.arr2[i]);
		}
		self.comp('funcTreeGrid').setSelection(this.arr2[this.arr2.length-1]);
	};




	return Model;
});