define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var PermissioControl = require('$UI/system/admin/permissionBM/roleDialog/permissionSelect')
	
	var Model = function(){
		this.callParent();
	};
	
	
	
	Model.prototype.addPermissionBtnClick = function(event){
		var permissionData = this.comp("permissionData")
		var tableData = this.comp('tableData')
		if(!tableData.getValue('path')){
			justep.Util.hint('请先选择数据对象')
			return 
		}
		var self = this;
		permissionData.newData({
			"defaultValues" : [ {
				id : justep.UUID.createUUID(),
				name : '',
				code:'',
				label: self.roleGroupRow ? (self.roleGroupRow.val('name')):'',
				role:self.roleGroupRow ? ('/'+self.roleGroupRow.val('id')):'',
				condition:'',
				type: '',
				description:''
			} ]
		})
	};

	Model.prototype.modelParamsReceive = function(event){ 
		this.roleGroupRow = event.params.currentRoleRows;
		this.databaseData = event.params.data
		this.status = event.params.status
		if(this.status =='edit'){
			this.currentPermissionRow = event.params.currentPermissionRow
		}
	};

	Model.prototype.chooseDataBtnClick = function(event){
		this.comp("dataDialog").open()
	};
	
	// 数据对象传回来的值
	
	Model.prototype.dataDialogReceived = function(event){ 
		var tableData = this.comp("tableData")
		var controlData = this.comp("conctrolData")
		var permissionData = this.comp("permissionData")
		var rows = event.data.params;
		if(rows){
			tableData.clear();
			controlData.clear()
			permissionData.clear()
			tableData.newData({
				"defaultValues" : [ {
					"id" : rows.val('id'),
					"label" : rows.val('label'),
					'name':rows.val('name'),
					'path':rows.val('path')
				} ]
			})
		}
		// 加载 权限操作下拉框
		var arr = PermissioControl.getPresMethods(rows.val('label'),rows.val('path'))
		controlData.loadData(arr,true)
	};
	
	Model.prototype.loadPermissionCtrl =  function(){
		
	}
	
	
	// 移除当前行数据
	Model.prototype.removePermissionBtnClick = function(event){
		var permissionData = this.comp("permissionData")
		var row = event.bindingContext.$object;
		justep.Util.confirm("确认要删除操作吗？", function(){
			permissionData.remove(row)
		})
	};

	Model.prototype.cancelBtnClick = function(event){
		this.owner.close()
	};

	Model.prototype.okBtnClick = function(event){
		var permissionData = this.comp("permissionData")
		
		if(permissionData.count()>0){
			var arr = this.permissionIsRepeat(permissionData)
			if(arr.length>0){
				console.log(JSON.stringify(arr))
				var str=arr.map(function(item){
					return "第"+item.index+'行 '
				})
				justep.Util.hint(str+'是重复选项,操作和条件不能一样')
				return 
			}
			if(this.databaseData.count()){
				if(!this.isExistByValue(this.databaseData,permissionData)){
					return 
				}
			}
			var array = this.permissionDataReceive(permissionData)
			this.owner.send({params:array})
			this.owner.close()
		}else {
			this.owner.close()
		}
	};
	
	// 判断数据是否  已存在    数据库
	Model.prototype.isExistByValue = function(data,currentData){ 
		if(!currentData.getValue('name')){
			justep.Util.hint('权限设置不能为空')
			return false
		}
		var _isexist = false
		var _existArray = []
		data.each(function(option){
			currentData.each(function(currentOption){
				var currentDesc = currentOption.row.val('name')
				if((option.row.val('name')== currentDesc.slice(0,currentDesc.indexOf('(')))&& (option.row.val('condition') == currentOption.row.val('condition'))){
					_existArray.push(currentOption.index+1)
				}
			})
		})
		if(_existArray.length){
			justep.Util.hint('第'+_existArray.join('、')+'行已存在')
			return false
		}
		return true
	}
	
	
	
	// 传递回去的数据
	Model.prototype.permissionDataReceive = function(data){
		var arr = []
		data.each(function(option){
			var desc = option.row.val('name')
			arr.push({
				id:option.row.val('id'),
				permissionKind:'data',
				name: desc.slice(0,desc.indexOf('(')),
				code: desc.slice(desc.indexOf('(')+1,desc.lastIndexOf(')')),
				label:option.row.val('label'),
				role:option.row.val('role'),
				condition:option.row.val('condition'),
				description:option.row.val('description'),
				type:option.row.val('type')
			})
		})
		return arr 
	}
	
	// 判断 permission选项是否重复
	Model.prototype.permissionIsRepeat = function(data){
		var _uniqueObj = {};
		var _uniqueArr = []
		data.each(function(option){
			var name = option.row.val('name')
			var condition = option.row.val('condition')
			var index = option.index
			if(!_uniqueObj[name+condition]){
				_uniqueObj[name+condition] = true
			}else {
				_uniqueArr.push({
					index:index+1
				})
			}
		})
		return _uniqueArr
	}
	return Model;
});