define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var rolesHandler = require("$UI/system/admin/permissionBM/roleDialog/rolesSelect");
	var PermissionPattern = require('$UI/system/admin/permissionBM/roleDialog/permissionSelect')
	var Model = function(){
		this.callParent();
	};
	
	
	
	//确认按钮
	Model.prototype.okBtnClick = function(event){
		var permissionData = this.comp("permissionData")
		
		if(!this.isExistByValue(this.dataPermission,permissionData)){
			return
		}else {
			var permissionData = this.comp('permissionData')
			var row = {
				id:permissionData.getValue('id'),
				permission: permissionData.getValue('permission'),
				role:permissionData.getValue('role'),
				filter:permissionData.getValue('filter'),
				description:permissionData.getValue('description')
			}
			this.owner.send({data:row});
			this.owner.close();
		}
	};

	Model.prototype.cancelBtnClick = function(event){
		this.owner.close();
	};
	
	Model.prototype.isExistByValue = function(data,currentData){
		if(!currentData.getValue('permission')){
			justep.Util.hint('权限设置不能为空')
			return false
		}else if(!currentData.getValue('role')){
			justep.Util.hint('群组设置不能为空')
			return false
		}else if(currentData.count()==0) {
			return false
		}
		var _isexist = false
		data.each(function(option){ 
			if(option.row.val('id')!=currentData.getValue('id')){
				if((option.row.val('permission')==currentData.getValue('permission')) && (option.row.val('role')==currentData.getValue('role').split(":")[1])){
					_isexist = true
					return false
				}
			}
		})
		if(_isexist){
			justep.Util.hint('已存在')
			return false
		}
		return true
	}

	Model.prototype.modelParamsReceive = function(event){ 
		this.dataPermission = event.params.data.permission;
		var row = event.params.data.rows;
		var label = event.params.data.dataLabel;
		var perAllData = this.comp("perAllData")
		perAllData.clear()
		perAllData.loadData(PermissionPattern.getPresMethods(label,row.val('type')),true)
		this.roleGroup = event.params.data.roleGroup;
		this.roles = event.params.data.roles
		console.log(this.roleGroup)
		var permissionData = this.comp("permissionData")
		var _selectHtml = rolesHandler.completeOpts(this.roles,this.roleGroup);
		$("[xid='editSelectRole']").html('');
		$("[xid='editSelectRole']").append(_selectHtml);
		this.loadPermissionData({
			id:row.val('id'),
			permission:row.val('permission'),
			role:row.val('role_type')+':'+(row.val('role_type')=="role" ? rolesHandler.switchZhNameToName(rolesHandler.getAdmin(),row.val('role')) : row.val('role')),
			filter:row.val('filter'),
			type:row.val('type'),
			label:label,
			description:row.val('description')
		});
	};
	
	Model.prototype.loadPermissionData = function(row){
		var permissionData = this.comp("permissionData")
		permissionData.newData()
		permissionData.setValue("id",row.id)
		permissionData.setValue("role",row.role)
		permissionData.setValue("permission",row.permission)
		permissionData.setValue("filter",row.filter)
		permissionData.setValue("description",row.description)
	}
	
	return Model;
});