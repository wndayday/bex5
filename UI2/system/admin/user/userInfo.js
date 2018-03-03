define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var uaa = require("$UI/system/components/justep/user/js/uaa");
	var Authorize = require("$UI/system/admin/user/js/Authorize");
	var initRolesData = require("$UI/system/admin/user/lib/initRolesData")
	var UUID = require("$UI/system/lib/base/uuid");
	var Model = function() {
		this.callParent();
		this.name;
		this.emails;
		this.userGroupIDs = [];
		this.addMembersGroupIds = [];
		this.removeMembersGroupIds = [];
		this.checkedGroup=[];
	};

	Model.prototype.modelParamsReceive = function(event) {
		this.userGroupIDs = [];
		this.addMembersGroupIds = [];
		this.removeMembersGroupIds = [];
		var self = this;
		var id = this.params.id;
		this.roleArray = this.params.roleArray
		var userData = this.comp("userData");
		uaa.getUser(id).then(function(user) {
			self.name = user.name;
			self.emails = user.emails;
			self.groups = user.groups;
			var rows = [];
			rows.push(user);
			userData.loadData(rows);
			userData.first();
			self.loadGroups(event);
		}, function(error) {
			throw justep.Error.create(error);
		});

	};

	Model.prototype.loadGroups = function(event) {
		var self = this;
		var groups = [];
		var groupData = this.comp("groupData");
		var userGroups = this.comp("userData").getFirstRow().row._groups.length > 0 ? this.comp("userData").getFirstRow().row._groups : [];
		$.each(userGroups, function(i, v) {debugger
			self.userGroupIDs.push(v.value);
		});
		var self = this;
		uaa.getGroups().then(function(data) {
			$.each(data, function(i, v) {
				if (self.userGroupIDs.indexOf(v.id) > -1) {
					v.check = 1;
					self.checkedGroup.push({code:v.name});
				} else {
					v.check = 0;
				}
			});
			groupData.loadData(data);
		}, function(error) {
			throw justep.Error.create(error);
		});
	};
	// 邀请成员组
	Model.prototype.getAddMembersGroupIds = function(groupData) {
		var self = this;
		groupData.each(function(params) {
			var row = params.row;
			if (row.val("check") === 1) {
				if (self.userGroupIDs.indexOf(row.val("id")) < 0) {
					self.addMembersGroupIds.push(row.val("id"));
				}
			}
		})
		return this.addMembersGroupIds;
	};
	// 移除成员组
	Model.prototype.getRemoveMembersGroupIds = function(groupData) {
		var self = this;
		groupData.each(function(params) {
			var row = params.row;
			if (row.val("check") === 0) {
				if (self.userGroupIDs.indexOf(row.val("id")) > -1) {
					self.removeMembersGroupIds.push(row.val("id"));
				}
			}
		})
		return this.removeMembersGroupIds;
	};

	Model.prototype.getGroupName = function(groupData){
		var groupName = [];
		var self = this;
		groupData.each(function(params) {
			var row = params.row;
			if (row.val("check") === 1) {
				groupName.push(row.val("name"));
			}
		});
		return groupName.join(",");
	}; 
	Model.prototype.saveBtnClick = function(event) {
		var self = this;
		var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
		var email = this.comp("userData").getFirstRow().val("emails");
		var name = this.comp("userData").getFirstRow().val("name");
		var groupData = this.comp("groupData");
		debugger
		this.removeMembersGroupIds = this.getRemoveMembersGroupIds(groupData);
		this.addMembersGroupIds = this.getAddMembersGroupIds(groupData);
		var groupChange = this.removeMembersGroupIds.length > 0 || this.addMembersGroupIds.length > 0
		if (!name || !email) {
			justep.Util.hint('请将信息填写完整!', {
				'type' : 'danger'
			});
		} else if (!emailReg.test(email)) {
			justep.Util.hint('邮箱格式不正确!', {
				'type' : 'danger'
			});
		} else if (email !== this.emails || name !== this.name || groupChange) {
			var row = this.comp("userData").getFirstRow();
			var info = "确定修改此用户信息？"
			justep.Util.confirm(info, function() {
				var user = {
					id : row.val("id"),
					userName : row.val("userName"),
					name : row.val("name"),
					emails : row.val("emails"),
					phoneNumbers : row.val("phoneNumbers"),
					active : row.val("active"),
					verified : row.val("verified"),
					origin : row.row.origin,
					externalId : row.val("externalId"),
					meta : row.row.meta
				};
				uaa.updateUser(user).then(function(data) { 
					var groupPro = [];
					console.log(data)
					row.row.meta = data.meta;
							console.log(self.addMembersGroupIds);
							console.log(self.removeMembersGroupIds)
					if (self.addMembersGroupIds.length > 0) {
						console.log("self.addMembersGroupIds"+self.addMembersGroupIds);
						$.each(self.addMembersGroupIds, function(i, v) {
							console.log(v);
							groupPro.push(uaa.addMember(v, data.id));
							Authorize.createSubjects({
								id:UUID.createUUID(),
								code:data.id,
								name:row.val('name'),
								role:"/"+v
							})
						});
					}
					if (self.removeMembersGroupIds.length > 0) {
					console.log("self.removeMembersGroupIds"+self.removeMembersGroupIds)
						$.each(self.removeMembersGroupIds, function(i, v) {
							groupPro.push(uaa.removeMember(v, data.id));
							groupPro.push(Authorize.deleteSubjectByCodeAndRole({
								code:data.id,
								role:'/'+v
							}))
						});
					}
					if (groupPro.length > 0) {
						$.when.apply($, groupPro).done(function() {
							var sendData = {
								id : data.id,
								name : data.name,
								emails : row.val("emails"),
								meta :row.row.meta,
								groups : self.getGroupName(self.comp("groupData"))
							}
							self.owner.send(sendData);
							self.close();
						});
					}else{			
						var sendData = {
								id : data.id,
								name : data.name,
								emails : row.val("emails"),
								meta : row.row.meta
						}
						self.owner.send(sendData);
						self.close();
					}
				}, function(error) {
					throw justep.Error.create(error);
				})
			})
		} else {
			this.close();
		}
	};
	Model.prototype.cancelClick = function(event) {
		this.close();
	};

	return Model;
});