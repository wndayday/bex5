define(function(require) {
	var $ = require("jquery");
	var Model = function() {
		this.callParent();
	};
	Model.prototype.roleDataBeforeRefresh = function(event) {
		var orgFID = this.getContext().getCurrentPersonMemberFID();
		var showInherited = this.comp("tempData").val("showInheritedRole");
		event.source.setFilter("orgFilter", !orgFID ? "1=0" : (showInherited ? OpmUtils.createParentPathFilter("SA_OPRoleManagement.sOrgFID", orgFID) : "SA_OPRoleManagement.sOrgFID = '" + orgFID
				+ "'"));

	};
	Model.prototype.roleDetailDialogReceive = function(event) {
		this.comp("roleData").refreshData();
		if (!event.data)
			return;
		var orgID = this.getContext().getCurrentPersonMemberID();// 获取当前人员成员的ID
		var roleIDs = new biz.Request.ListParam();
		var roleID = event.data.roleID;
		$.each(event.data, function(i, row) {
			if (row == "new") {
				roleIDs.add(roleID);
			}
		});
		var self = this;
		var params = new biz.Request.ActionParam();
		params.setString("orgID", orgID);
		params.setList("roleIDs", roleIDs);
		biz.Request.sendBizRequest({
			"context" : self.getContext(),
			"action" : "appendRoleManagementsAction",
			"parameters" : params,
			"callback" : function(data) {
				data.ignoreError = false;
				if (data.state) {
					self.comp("roleData").refreshData();
					self.comp("roleManagementData").refreshData();
				}
			}
		});
	};

	return Model;
});