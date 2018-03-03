define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var uaa = require("$UI/system/components/justep/user/js/uaa");
	var Authorize = require("$UI/system/admin/user/js/Authorize");
	var initRolesData = require("$UI/system/admin/user/lib/initRolesData")

	var Model = function() {
		this.callParent();
		this.filterVal = justep.Bind.observable();
		this.selectCount = justep.Bind.observable(0);
		this.userNum = justep.Bind.observable();
		this.labelRows = justep.Bind.observableArray([]);
		this.selectedLabel = justep.Bind.observableArray([]);
		this.delGroupIcon = justep.Bind.observable(false);
		this.delLabelIcon = justep.Bind.observable(false);
		this.metaDivShow = false;
		this.groups = justep.Bind.observableArray([]);
		this.groupSelected = justep.Bind.observable();
	};
	// 加选中列
	Model.prototype.addColumn = function(data) {
		data.each(function(params) {
			params.row.val("check", 0);
		});
	}

	// 加载用户数据
	Model.prototype.modelModelConstructDone = function(event) {
		var self = this;
		uaa.getGroups().then(function(data) {
			var adminGroup = data.find(function(item){
				return item.name =='admin'
			})
			if(!adminGroup){
				uaa.createGroup('admin')
					.then(function(admin){
						Authorize.addRoleGroup({
							id: admin.id,
							code: admin.name + "_group",
							name: admin.name,
							description:'管理员'
						}).then(function(){
						
						},function(err){
							throw err
						})
						self.groups.push.apply(self.groups, data.concat(admin));
					})
			}else {
				self.groups.push.apply(self.groups, data);
			}
		}, function(error) {
			throw justep.Error.create(error);
		});
	};
	// 全选
	Model.prototype.allCheckboxChange = function(event) {
		var userData = this.comp("userData");
		var self = this;
		if (event.checked) {
			userData.each(function(params) {
				params.row.val("check", 1);
			});
			this.selectCount.set(userData.count());
		} else {
			userData.each(function(params) {
				params.row.val("check", 0);
			})
			this.selectCount.set(0);
		}
	};
	// 选择用户checkbox
	Model.prototype.userCheckboxChange = function(event) {
		if (event.checked) {
			this.selectCount.set(this.selectCount.get() + 1);
		} else {
			this.selectCount.set(this.selectCount.get() - 1);
		}
		if (this.selectCount.get() === this.comp("userData").count()) {
			this.comp("allCheckbox").set({
				"value" : 1
			})
		} else {
			this.comp("allCheckbox").set({
				"value" : 0
			})
		}
	};
	// 用户过滤表达式
	Model.prototype.userFilter = function(row) {
		var select = this.comp('select');
		var filterVal = this.filterVal.get();
		var selectedLabel = this.selectedLabel.get();
		var fLabel = row.val("groups");
		if (filterVal && row) {
			if (!select.val()) {
				var fName = row.val("name");
				if (selectedLabel.length === 0) {
					return (fName && (fName.indexOf(filterVal) > -1));
				} else {
					return (fName && (fName.indexOf(filterVal) > -1) && fLabel && isContainSelectedLabel(fLabel, this.selectedLabel.get()));
				}
			} else if (select.val() === "1") {

			} else if (select.val() === "2") {
				var fPhone = row.val("phoneNumbers");
				if (selectedLabel.length === 0) {
					return (fPhone && (fPhone.indexOf(filterVal) > -1));
				} else {
					return (fPhone && (fPhone.indexOf(filterVal) > -1) && fLabel && isContainSelectedLabel(fLabel, this.selectedLabel.get()));
				}
			} else if (select.val() === "3") {
				var email = row.val("emails");
				if (selectedLabel.length === 0) {
					return (email && (email.indexOf(filterVal) > -1));
				} else {
					return (email && (email.indexOf(filterVal) > -1) && Label && isContainSelectedLabel(fLabel, this.selectedLabel.get()));
				}
			}
		} else if (selectedLabel.length > 0 && row) {
			return fLabel && isContainSelectedLabel(fLabel, this.selectedLabel.get());
			// return (fLabel && (this.selectedLabel.indexOf(fLabel) > -1));
		}
		return true
	};
	var isContainSelectedLabel = function(fLabel, selectedLabel) {
		var isContain = false;
		$.each(selectedLabel, function(i, v) {
			if (fLabel.indexOf(v) > -1) {
				isContain = true;
			}
		});
		return isContain;
	};
	// 修改用户状态框显示
	Model.prototype.statusBtnClick = function(event) {
		var row = event.bindingContext.$object;
		if (row.val("userName") === 'system') {
			justep.Util.hint("系统账号不允许禁用！");
			return;
		}
		var info = row.val("active") ? "此用户已经激活确定将此用户修改为禁用" : "此用户已经禁用确定将此用户修改为激活";
		justep.Util.confirm(info, function() {
			var user = {
				id : row.val("id"),
				userName : row.val("userName"),
				name : row.val("name"),
				emails : row.val("emails"),
				phoneNumbers : row.val("phoneNumbers"),
				active : !row.val("active"),
				verified : row.val("verified"),
				origin : row.row.origin,
				externalId : row.val("externalId"),
				meta : row.row.meta
			};
			uaa.updateUser(user).then(function(data) {
				row.val("active", data.active);
				row.row.meta = data.meta;
			}, function(error) {
				throw justep.Error.create(error);
			})
		})
	};

	// 打开用户详情页面
	Model.prototype.userBtnClick = function(event) {
	var self = this;
	console.log(event.bindingContext.$object.val("id"));
		this.comp("userInfoDialog").open({
			params : {
				id : event.bindingContext.$object.val("id"),
				roleArray: self.roleArray
			}
		});
	};
	// 删除用户提示框显示
	Model.prototype.delUserBtnClick = function(event) {
		var row = event.bindingContext.$object;
		if (row.val("userName") === 'system') {
			justep.Util.hint("系统账号不允许删除！");
			return;
		}
		this.comp('userData').deleteData(row, {
			async : false
		});
		var self = this;
		var name = row.val('name')
		var groups = row.val('groups')
		if(groups && groups.includes(',')){
			var arr = groups.split(',')
			arr.forEach(function(item){
				var role_id = initRolesData.getRoleIdByName(self.roleArray,item);
				console.log(JSON.stringify(self.roleArray))
				Authorize.deleteSubjectByCodeAndRole({
					code:name,
					role:"/"+role_id
				}).then(function(){
				
				},function(error){
					throw error
				})
			})
		}else if (groups && !groups.includes(',')){
			var role_id = initRolesData.getRoleIdByName(self.roleArray,groups);
			Authorize.deleteSubjectByCodeAndRole({
					code:name,
					role:"/"+role_id
				}).then(function(){
				
				},function(error){
					throw error
				})
		}
		
		/*
		 * justep.Util.confirm("确定删除此用户？", function() {
		 * 
		 * uaa.deleteUser(uid).then(function(data) { }, function(error) { throw
		 * justep.Error.create(error.responseJSON.error); }) });
		 */
	};

	// 打开新增用户页面
	Model.prototype.newUserBtnClick = function(event) {
		this.comp('newUserDialog').open();
	};

	// 根据输入框显对用户数据进行过滤
	Model.prototype.searchDivClick = function(event) {
		var searchval = this.comp("searchInput").val();
		this.filterVal.set(searchval);
	};

	// 标签区域的显示
	Model.prototype.metaDivClick = function(event) {
		if (!this.metaDivShow) {
			$(this.getElementByXid("metaContent")).show();
			this.metaDivShow = true;
		} else {
			$(this.getElementByXid("metaContent")).hide();
			this.metaDivShow = false;
		}
		event.stopPropagation();
	};
	Model.prototype.panel1Click = function(event) {
		$(this.getElementByXid("metaContent")).hide();
		this.metaDivShow = false;
	};

	// 根据群组对用户数据进行过滤
	Model.prototype.span66Click = function(event) {
		var row = event.bindingContext.$object;
		var self = this;
		if (this.selectedLabel.indexOf(row.name) < 0) {
			this.labelRows.push(row);
			this.selectedLabel.push(row.name);
		} else {
			this.labelRows.splice(this.selectedLabel.indexOf(row.name), 1);
			this.selectedLabel.splice(this.selectedLabel.indexOf(row.name), 1);
		}
		event.stopPropagation();
	};
	// 查看群组
	Model.prototype.groupBtnClick = function(event) {
		this.comp('groupPopOver').show();
	};
	// 离开管理群组页面
	Model.prototype.groupPopOverCancelBtnClick = function(event) {
		$(this.getElementByXid('newGroupRow')).hide();
		this.comp('groupPopOver').hide();
		this.delGroupIcon.set(false);
		this.comp('groupManagementBtn').set({
			"label" : "管理"
		})
	};
	// 刪除群組操作提示框显示
	Model.prototype.i22Click = function(event) {
		var self = this;
		var row = event.bindingContext.$object;
		debugger
		var dfd = $.Deferred();
		var name = row.name
		justep.Util.confirm("确定删除该组？", function() {
			// uaa.listMember(row.id).then(function(uids) {
			// if (uids.length > 0) {
			// $.each(uids, function(i, v) {
			// uaa.removeMember(row.id, v);
			// })
			// }
			// }, function(error) {
			// });
			uaa.deleteGroup(row.id).then(function(gid) {
				Authorize.deleteRoleGroup({
					id : row.id
				}).then(function(data) {
					$.each(self.groups.get(), function(i, v) {
						if (v.id === gid) {
							self.groups.splice(i, 1);
						}
					})
					var userData = self.comp("userData");
					userData.clear();
					uaa.getUsers().then(function(data) {
						userData.loadData(data.resources);// 将返回的数据加载到data组件
						self.addColumn(userData);
						self.userNum.set(userData.count());
					}, function() {
						throw justep.Error.create("加载数据失败");
					});
				}, function(error) {
					console.log(error);
				});
			}, function(error) {
				console.log(error);
			});
		});
	};
	// 管理群组
	Model.prototype.groupManagementBtnClick = function(event) {
		if (!this.delGroupIcon.get()) {
			this.delGroupIcon.set(true);
			this.comp('groupManagementBtn').set({
				"label" : "取消管理"
			})
		} else {
			this.delGroupIcon.set(false);
			this.comp('groupManagementBtn').set({
				"label" : "管理"
			})
		}
	};
	// 新建群组
	Model.prototype.newGroupBtnClick = function(event) {
		$(this.getElementByXid('newGroupRow')).show();
		$(this.getElementByXid('groupNameInput')).focus();
	};

	// 取消创建群组
	Model.prototype.cancelCreateGroupBtnClick = function(event) {
		$(this.getElementByXid('newGroupRow')).hide();
	};

	Model.prototype.userDataCustomDelete = function(event) {
		var self = this;
		var rows = event.deleteRows;
		$.each(rows, function(i, row) {
			if (row.val('name') !== 'system') {
				event.promise = uaa.deleteUser(row.val("id")).then(function(data) {
					row.data.remove(row);
					self.selectCount.set(self.selectCount.get() - 1)
					self.userNum.set(self.comp("userData").count());
				}, function(error) {
					throw justep.Error.create(error.responseJSON.error);
				});
			}
		})
	};

	Model.prototype.newUserDialogReceive = function(event) {
		var newUsers = [];
		console.log(event.data);
		newUsers.push(event.data);
		this.roleArray = event.data.roleArray
		this.comp("userData").loadData(newUsers, true);
		this.comp("userData").getLastRow().val("check", 0);
		this.userNum.set(this.comp("userData").count());
	};

	Model.prototype.saveGroupBtnClick = function(event) {
		var self = this;
		var groupName = this.comp("groupNameInput").val();
		if (!groupName) {
			justep.Util.hint('请填写群名称!', {
				'type' : 'danger'
			});
		} else {
			uaa.createGroup(groupName).then(function(data) {
				self.groups.push(data);
				Authorize.addRoleGroup({
					id: data.id,
					code: groupName + "_group",
					name: groupName
				}).then(function() {
					$(self.getElementByXid('newGroupRow')).hide();
					self.comp("groupNameInput").val("");
				}, function(error) {
					throw justep.Error.create(error);
				});
			}, function(error) {
				throw justep.Error.create(error);
			});
		}
	};
	// 排序方式
	Model.prototype.sortWaySelectChange = function(event) {
		var userData = this.comp("userData");
		var self = this;
		var params;
		if (event.value === "") {
			params = {
				"count" : userData.limit,
				"sortOrder" : "ascending"
			}
		} else if (event.value === "1") {
			params = {
				"count" : userData.limit,
				"sortOrder" : "descending"
			}
		} else if (event.value === "2") {
			params = {
				"count" : userData.limit,
				"sortBy" : "givenName",
				"sortOrder" : "ascending"
			}
		} else if (event.value === "3") {
			params = {
				"count" : userData.limit,
				"sortBy" : "givenName",
				"sortOrder" : "descending"
			}
		}
		uaa.getUsers(params).then(function(data) {
			userData.loadData(data.resources);// 将返回的数据加载到data组件
			self.userNum.set(userData.count());
		}, function() {
			throw justep.Error.create("加载数据失败");
		});
	};

	Model.prototype.deleteSelectedUserBtnClick = function(event) {
		var userData = this.comp("userData");
		var rows = [];
		var row;
		userData.each(function(params) {
			row = params.row;
			if (row.val("check") === 1) {
				rows.push(row);
			}
		})
		if (rows.length == 0) {
			justep.Util.hint("未选中人员");
		} else {
			userData.deleteData(rows, {
				async : true
			});
		}
	};

	Model.prototype.userDataCustomRefresh = function(event) {
		var userData = this.comp("userData");
		var self = this;
		params = {
			"count" : event.limit,
			"startIndex" : event.offset + 1
		}
		event.promise = uaa.getUsers(params).then(function(data) {
			userData.setTotal(data.totalResults);
			userData.loadData(data.resources);// 将返回的数据加载到data组件
			self.addColumn(userData);
			self.userNum.set(userData.count());
		}, function() {
			throw justep.Error.create("加载数据失败");
		});
	};

	Model.prototype.setSelectedUserGroupBtnClick = function(event) {
		var rows = [];
		var userData = this.comp("userData");
		userData.each(function(params) {
			row = params.row;
			if (row.val("check") === 1) {
				rows.push(row);
			}
		});
		if (rows.length == 0) {
			justep.Util.hint("未选中人员");
		} else {
			this.comp("selectGroupPopOver")._seclectRows = rows;
			this.comp("selectGroupPopOver").show();
		}
	};

	Model.prototype.saveUserToGroup = function(event) {
		var self = this;
		var rows = this.comp("selectGroupPopOver")._seclectRows;
		var addMemberPro = [];
		$.each(rows, function(i, v) {
			if (v.val("groups").indexOf(self.groupSelected.get().name) < 0) {
				addMemberPro.push(uaa.addMember(self.groupSelected.get().id, v.val("id")));
			}
		})
		$.when.apply($, addMemberPro).done(function() {
			$.each(rows, function(i, v) {
				var groups = v.val("groups");
				if (v.val("groups").indexOf(self.groupSelected.get().name) < 0) {
					v.val("groups", v.val("groups") ? groups + "," + self.groupSelected.get().name : self.groupSelected.get().name);
				}
				v.val("check", 0);
			});
			self.comp("selectGroupPopOver").hide();
			self.groupSelected.set("");
		});
	};

	Model.prototype.groupSeclectedClick = function(event) {
		var group = event.bindingContext.$object;
		this.groupSelected.set(group);
	};

	Model.prototype.selectGroupPopOverCancelClick = function(event) {
		this.groupSelected.set("");
		this.comp("selectGroupPopOver").hide();
	};

	Model.prototype.userInfoDialogReceived = function(event) {
		if (event.data) {
			var userData = this.comp("userData");
			var changeData = event.data;
			var row = userData.getRowByID(changeData.id);
			row.val("name", changeData.name);
			row.val("emails", changeData.emails);
			if (changeData.groups) {
				row.val("groups", changeData.groups);
			}
			row.row.meta = changeData.meta;
		}
	};

	Model.prototype.modelParamsReceive = function(event){
		var self = this;
		initRolesData.getAllRoles()
			.then(function(array){
				self.roleArray = array
				console.log(JSON.stringify(array))
			})
	};

	return Model;
});