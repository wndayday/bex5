define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var rolesHandler = require("$UI/system/admin/permissionBM/roleDialog/rolesSelect");
	var Authorize = require("$UI/system/admin/user/js/Authorize");
	var UUID = require("$UI/system/lib/base/uuid");
	var PermissionPattern = require('$UI/system/admin/permissionBM/roleDialog/permissionSelect')
	var Model = function() {
		this.callParent();
		this.roleGroup= [];
		this.role = justep.Bind.observable('匿名用户');
		this.permission = justep.Bind.observable('');
		this.filter = justep.Bind.observable('');
		this.dataPath = justep.Bind.observable('')
	};

	Model.prototype.addBtnClick = function(event) {
		this.comp('newPopOverRole').show();
		var self = this;
		var addPreData =this.comp("addPerData");
		addPreData.newData();
		//addPreData.setValue('role',"role:anonymous");
		console.log("this.dataPath.get()==========="+this.dataPath.get())
		//addPreData.setValue('permission',"查询(/"+this.dataPath.get()+":get)")
	};

	Model.prototype.button1Click = function(event) {

	};
	
	//加载 all roles
	
	Model.prototype.loadAllRoles = function () {
		var dfd = $.Deferred();
	    var self = this;
		Authorize.getRoleGroupInfo()
			.then(function(roles){
				console.log(roles)
				if(roles && roles._embedded && (roles._embedded.roles.length>0)){
					var arr = roles._embedded.roles;
					self.roleGroup= [];
					self.roles = [];
					arr.forEach(function(item,index){
						if(item.code.includes('_group')){
							self.roleGroup.push({
								id:item.id,
								value:"group",
								zh_value:'群组',
								name:item.code.replace("_group",""),
								zh_name:item.name ? item.name : item.name
							});
						} else {
							self.roles.push({
								id:item.id,
								value:'role',
								zh_value:'角色',
								name:item.code,
								zh_name: item.name
							})
						}
					});
					console.log('self.roleGroup'+JSON.stringify(self.roleGroup))
					_selectHtml = rolesHandler.completeOpts(self.roles,self.roleGroup);
					console.log(_selectHtml)
					$("[xid='selectRoles']").html('');
					$("[xid='selectRoles']").append(_selectHtml);
					dfd.resolve(self.roleGroup,self.roles)
				}else {
					dfd.reject('result is not found')
				}
			})
			return dfd.promise()
	} 

	// 删除 当前行数据
	Model.prototype.deleteDataClick = function(event) {
		var row = event.bindingContext.$object;
		var permission = this.comp("permissionData")
		justep.Util.confirm('确认要删除授权信息吗',function(){
			Authorize.deletePermissionById({_id:row.val('id')})
			.then(function(result){
				permission.remove(row);
			})
		})
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.comp("newPopOverRole").hide();
	};
	Model.prototype.modelParamsReceive = function(event){ 
	     this.dataPath.set(event.params.path||"");
	     this.dataLabel = event.params.label
	     var self = this;
		var permissionData = this.comp("permissionData");
		var perData = this.comp("perData");
		var addPerData =this.comp("addPerData");
		perData.clear();
		addPerData.clear()
		perData.loadData(PermissionPattern.getPresMethods(this.dataLabel,this.dataPath.get()),true)
		this.loadAllRoles()
			.then(function(group,roles){
				self.RequestPersData({
					type:'data:'+self.dataPath.get(),
					group:group,
					roles:roles
				})
			})
	};
	
	
	// 根据表名加载相应的数据权限
	Model.prototype.RequestPersData = function (params){
		var roles = params.roles;
		var group = params.group;
		var type = params.type;
		var array = []
		var self = this;
		Authorize.getPermissionsByType({type:type})
			.then(function (result) {
				var p2;
				if(result && result._embedded && result._embedded.permissions.length>0 ){
					var arr = result._embedded.permissions;
					arr.forEach(function (item) {
					 var currentItem = self.findRoleNameById(self.roleGroup,item.roleId)
						array.push({
							id:item.id,
							permission:item.name+'('+item.code.substr(item.code.indexOf(':')+1)+')',
							filter:item.condition,
							type:item.type.split(':')[1],
							role:currentItem ? currentItem.zh_name :currentItem,
							role_id:item.roleId,
							description:item.description,
							role_type:currentItem ? currentItem.role_type : currentItem
						})
					})
					self.comp("permissionData").clear()
					self.comp("permissionData").loadData(array,true);
					self.comp("permissionData").first()
				}
			},function(err){
				console.log(err)
			})
	}
	// 根据当前id  找当前的 role名称
	Model.prototype.findRoleNameById = function(arr,currentId) {
		var currentRole= arr.find(function(item){
			return item.id === currentId
		})
		if(currentRole){
			return {
					zh_name:currentRole.zh_name,
					role_type:currentRole.value
				}
		}else {
			return ""
		}
	}
	
	// 根据当前的role名称    find　id
	Model.prototype.findRoleIdByName = function(arr,currentName){
			var currentRole = arr.find(function(item){
				return item.name == currentName
			})
			if(currentRole){
				return currentRole.id
			}
	}
	
	// 判断是否重复
	
	Model.prototype.okBtnClick = function(event){
		var self = this;
		var permissionData = this.comp("permissionData");
		var addPreData =this.comp("addPerData");
		if(!this.isExistByValue(permissionData,addPreData)){
			return
		}else {
			var roleArr = addPreData.getValue('role').split(':');
			var uuId = UUID.createUUID()
			//var role_id =roleArr[0]=="role"?roleArr[1]: this.getRoleId(this.roleGroup,roleArr[1])
			var perName = addPreData.getValue('permission');
			var permissionValue = addPreData.getValue('permission')
			var role = "/"+(roleArr[0]=="role"?self.findRoleIdByName(self.roles, roleArr[1]) : self.findRoleIdByName(self.roleGroup, roleArr[1]))
			self.comp("newPopOverRole").hide()
			debugger
			Authorize.addPermissionItem({
			  id:uuId,
			  code:permissionValue.slice(permissionValue.indexOf('(')+1,permissionValue.indexOf(')')),
			  name: permissionValue.substr(0,permissionValue.indexOf('(')),
			  type: 'data:'+this.dataPath.get()||'',
			  condition: addPreData.getValue('filter'),
			  role:role,
			  serviceName:"pgrest",
			  description:addPreData.getValue('description')
			}).then(function(result){
				permissionData.newData({
					"defaultValues" : [ {
						"id":uuId,
						"permission" : addPreData.getValue('permission'),
						'type':self.dataPath.get() ||'',
						"role" : roleArr[0]=="role"?rolesHandler.switchNameToZhName(rolesHandler.getAdmin(),roleArr[1]) : roleArr[1],
						"role_type":roleArr[0],
						"filter":addPreData.getValue('filter'),
						description:addPreData.getValue('description')
					} ]
				})
			})
		}
	};
	
	Model.prototype.isExistByValue = function(data,currentData){ 
		if(!currentData.getValue('permission')){
			justep.Util.hint('权限设置不能为空')
			return false
		}else if(!currentData.getValue('role')){
			justep.Util.hint('授权对象不能为空')
			return false
		}else if(currentData.count()==0) {
			return false
		}
		var _isexist = false
		data.each(function(option){ 
			if((option.row.val('permission')==currentData.getValue('permission')) && (option.row.val('role')==currentData.getValue('role').split(":")[1])){
				_isexist = true
				return false
			}
		})
		if(_isexist){
			justep.Util.hint('已存在')
			return false
		}
		return true
	}
	// edit 
	Model.prototype.editBtnClick = function(event){
		var self = this;
		var permissionData = this.comp('permissionData')
		var row = event.bindingContext.$object;
		console.log(row.toJson());
		this.comp("editRoleDialog").open({
			data:{
				/*pers:{
				id:row.val('id'),
				permission:row.val('permission'),
				role:row.val('role_type')+':'+(row.val('role_type')=="role" ? rolesHandler.switchZhNameToName(rolesHandler.getAdmin(),row.val('role')) : row.val('role')),
				filter:row.val('filter'),
				type:row.val('type'),
				label:self.dataLabel
			},*/rows:row,
				roleGroup:self.roleGroup,
				roles:self.roles,
				dataLabel:self.dataLabel,
				permission: permissionData
			}
		})
	};
	
	// 接收 editRole 返回的消息
	Model.prototype.editRoleDialogReceived = function(event){
		var row = event.data.data;
		var permissionData = this.comp("permissionData");
		var modifyRow = permissionData.find(['id'],[row.id]);
		var roleArr = row.role.split(":");
		console.log(row)
		var self = this;
		if(modifyRow.length>0){
			var role_id = "/"+(roleArr[0]=="role"?self.findRoleIdByName(self.roles, roleArr[1]) : self.findRoleIdByName(self.roleGroup, roleArr[1]));
			Authorize.modifyPermissionItem({
				code:row.permission.slice(row.permission.indexOf('(')+1,row.permission.lastIndexOf(')')),
				name:row.permission.substr(0,row.permission.indexOf('(')),
				condition:row.filter,
				role:role_id,
				serviceName:"pgrest",
				description:row.description
			},row.id).then(function(){
				modifyRow[0].val('permission',row.permission)
				modifyRow[0].val('role_type',row.role.split(':')[0])
				modifyRow[0].val('role', roleArr[0]=="role" ? rolesHandler.switchNameToZhName(rolesHandler.getAdmin(),roleArr[1]) : roleArr[1])
				modifyRow[0].val('filter',row.filter)
				modifyRow[0].val('description',row.description)
			},function(err){
				console.log(err.toString())
			})
		}
	};
	return Model;
});