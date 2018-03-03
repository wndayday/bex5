define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var uaa = require("$UI/system/components/justep/user/js/uaa");
	var UUID = require("$UI/system/lib/base/uuid");
	var initRolesData = require("$UI/system/admin/user/lib/initRolesData")
	var Authorize = require("$UI/system/admin/user/js/Authorize");
	var Model = function() {
		this.callParent();
		this.roleArray = []
		this.password = "123456";
		this.groups = justep.Bind.observableArray([]);
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.close();
	};

	Model.prototype.okBtnClick = function(event) {
		var self = this;
		var array = [];
		var phoneReg = /^[1][34578][0-9]{9}$/;
		var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
		var name = this.comp("nameInput").val();
		var phone = this.comp('phoneInput').val();
		var email = this.comp('emailInput').val();
		var groups = [];
		var groupName = [];
		this.comp("groupData").each(function(params) {
			if (params.row.val("check") === 1) {
				
				groups.push({
					id:params.row.val("id"),
					name:params.row.val("name"),
					userName:name
				});
				groupName.push(params.row.val("name"));
			}
		});
		var password = this.comp("passwordInput").val();
		if (!name) {
			justep.Util.hint('用户名不能为空!', {
				'type' : 'danger'
			});
		}else if(name === 'system'){
			justep.Util.hint('已经创建管理员!', {
				'type' : 'danger'
			});
		} else if (!phone) {
			justep.Util.hint('手机号不能为空!', {
				'type' : 'danger'
			});
		} else if (!email) {
			justep.Util.hint('邮箱不能为空!', {
				'type' : 'danger'
			});
		} else if (!password) {
			justep.Util.hint('密码不能为空!', {
				'type' : 'danger'
			});
		} else if (!phoneReg.test(phone)) {
			justep.Util.hint('手机号码格式不正确!', {
				'type' : 'danger'
			});
		} else if (!emailReg.test(email)) {
			justep.Util.hint('邮箱格式不正确!', {
				'type' : 'danger'
			});
		} else {
			var status = self.comp("statusData").getFirstRow().val("status") === "1" ? true : false;
			var user = {
				"userName" : phone,
				"password" : password,
				"name" : name,
				"emails" : email,
				"phoneNumbers" : phone,
				"active" : status
			};
			uaa.createUser(user).then(function(data) {
				if (groups.length > 0) {
					var addMemberPro = [];
					$.each(groups, function(i, item) {
						addMemberPro.push(uaa.addMember(item.id, data.id));
						console.log(item)
						console.log("code:item.userName,"+item.userName);
						console.log('id:--'+item.name+"_group"+"--name--"+item.userName);
						/*arr.push({
							id:item.id,
							code:item.userName,
							role:"/"+item.id,
						})*/
						if(self.roleArray.length>0){
							var role_id = initRolesData.getRoleIdByName(self.roleArray,item.name);
							addMemberPro.push(Authorize.createSubjects({
								id:/*item.id*/UUID.createUUID(),
								code:data.id,
								name:item.userName,
								role:"/"+role_id,
							}).then(function(){
								
							},function(error){
								throw justep.Error.create(error);
							}));
						}
					});
					$.when.apply($, addMemberPro).done(function() {
						data.groups = groupName.join(",");
						data["array"]=array;
						data.roleArray = self.roleArray;
						self.owner.send(data);
						self.close();
					});
				} else {
					self.owner.send(data);
					self.close();
				}
			}, function(error) {
				throw justep.Error.create(error);
			});
			
			/*Authorize.createPermissions({
				role_id
			})*/
		}
	};

	Model.prototype.modelModelConstructDone = function(event) {
		var groupData = this.comp("groupData");
		var self = this;
		uaa.getGroups().then(function(data) {
			$.each(data, function(i, v) {
				v.check = 0;
			});
			groupData.loadData(data);
		}, function(error) {
			throw justep.Error.create(error);
		});
	};
	
	// 根据群组name  获取群组id
	
	Model.prototype.getRoleIdByName = function(array,name){
		var currentRole = array.find(function(item){
			return item.name === name
		})
		if(currentRole){
			return currentRole.id
		}
		return ''
	}
	
	
	Model.prototype.modelParamsReceive = function(event){
		var self = this;
		initRolesData.getAllRoles()
		  .then(function(array){
			  self.roleArray=array;
		  })
	};
	
	// 获取 roles 表所有的信息
	

	return Model;
});