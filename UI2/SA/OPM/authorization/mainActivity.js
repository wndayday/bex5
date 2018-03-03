define(function(require){
	require('css!../css/panel').load();
	
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");
	var OpmUtils = require("$UI/SA/OPM/js/OpmUtils");
	
	var Model = function(){
		this.callParent();
		this.arr = [];
	};

	Model.prototype.orgTreeDataIndexChanged = function(event){
		this.comp("authorizeData").refreshData();
	};

	Model.prototype.authorizeDataBeforeRefresh = function(event){
		var orgFID = this.comp("orgTreeData").val("sFID");
		
		var showInherited = this.comp("tempData").val("showInherited"); 
		event.source.setFilter("orgFilter", 
			!orgFID ? "1=0" :
				(showInherited 
					? OpmUtils.createParentPathFilter("SA_OPAuthorize.sOrgFID", orgFID) 
					: "SA_OPAuthorize.sOrgFID = '"	+ orgFID + "'"
				)
			);
	};

	Model.prototype.tempDataValueChanged = function(event){
		if (event.col == "showInherited") {
			this.comp("authorizeData").refreshData();
		}
	};

	Model.prototype.addRoleBtnClick = function(event){
		if (this.comp("orgTreeData").getCurrentRow()) {
			this.comp("selectRolesDialog").open();
		}
	};

	Model.prototype.selectRolesDialogReceive = function(event){
		var orgIDs = new biz.Request.ListParam();
		var roleIDs = new biz.Request.ListParam();
	
		var orgTreeData = this.comp("orgTreeData");
		var orgID = orgTreeData.getCurrentRowID();

		$.each(event.data, function(i, row) {
			orgIDs.add(orgID);
			roleIDs.add(row.getID());
		});
		var params = new biz.Request.ActionParam();
		params.setList("orgIDs", orgIDs);
		params.setList("roleIDs", roleIDs);
		
		var self = this;
		biz.Request.sendBizRequest({
			"context" : self.getContext(),
			"action" : "appendAuthorizesAction",
			"parameters" : params, 
			"callback" : function(data) {
				data.ignoreError = false;
				if (data.state) {
					self.comp("authorizeData").refreshData();;
				}
			}
		});
	};

	Model.prototype.deleteRoleBtnClick = function(event){
		var authorizeDataTables = this.comp("authorizeDataTables");
		if (authorizeDataTables.getCheckeds().length == 0) {
			justep.Util.hint("请勾选要删除的角色！");
			return;
		}

		var self = this;
		justep.Util.confirm("确实要删除当前勾选的角色吗？", function() {
			var authorizeData = self.comp("authorizeData");

			var params = new biz.Request.ActionParam();
			var authorizes = new biz.Request.MapParam();
			var orgID = self.comp("orgTreeData").getCurrentRowID();
			$.each(authorizeDataTables.getCheckeds(), function(i, row) {
				if (row.val("sOrgID") == orgID) {
					authorizes.put(row.getID(), row.val("version"));
				}
			});
			params.setMap("authorizes", authorizes);
			
			biz.Request.sendBizRequest({
				"context" : self.getContext(),
				"action" : "deleteAuthorizesAction", 
				"parameters" : params, 
				"callback" : function(data) {
					data.ignoreError = false;
					if (data.state) {
						authorizeData.refreshData();
					}
				}
			});
		});
	};

	Model.prototype.authorizeDataTablesCellRender = function(event){
		if (event.colName == "roleRoleKind") {
			event.html = "<img height='16' width='16' src='" + OpmUtils.getRoleImgURL(event.colVal) + "'/>";
		}
	};

	Model.prototype.authorizeDataTablesRowCheck = function(event){
		event.cancel = (this.comp("orgTreeData").getCurrentRowID() != event.row.val("sOrgID"));
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
		self.comp('orgTreeGrid').setSelection(result[0]);
	};
	


	return Model;
});