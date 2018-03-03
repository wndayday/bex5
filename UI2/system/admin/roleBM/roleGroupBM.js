define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Authorize = require("$UI/system/admin/user/js/Authorize");
	var Utils = require("$UI/system/admin/roleBM/lib/Utils")
	var Model = function(){
		this.callParent();
		this.currentRoleGroupRow = justep.Bind.observable("")
		this.filterValue = ''
		this.sortPattern = 'a'
		
	};

	Model.prototype.deleteBtnClick = function(event){

	};

	Model.prototype.saveBtnClick = function(event){

	};

	Model.prototype.addDataBtnClick = function(event){

	};
	
	Model.prototype.switchRoleIdToCode = function (role_id) {
		var roleGroupData = this.comp("roleGroupData")
		var code = '';
		if(roleGroupData.length>0){
			roleGroupData.each(function(option){
				if(option.row.val('id')===role_id){
					code = option.row.val('code')
				}
			})
		}
	}
	
	
	// 
	Model.prototype.modelModelConstructDone = function(event){
		/*var roleGroupData = this.comp("roleGroupData")
		if(roleGroupData.count()>0){
			this.currentRoleGroupRow.set(roleGroupData.first())
		}
		this.loadRole_group()
			.then(function(data){
				roleGroupData.loadData(data,true)
			},function(error){
				throw error
			})*/
	};
	
	// 加载 role_groupData  数据
	Model.prototype.loadRole_group = function(params){
		var dfd = $.Deferred();
		Authorize.getRoleGroupInfo($.param(params))
			.then(function(result){
				if(result && result._embedded && (result._embedded.roles.length>0)){
					dfd.resolve(result._embedded.roles)
				}
			},function(error){
				dfd.reject(error)
			})
		return dfd.promise()
	}
	Model.prototype.roleGroupdataTablesRowClick = function(event){ 
	};
	
	Model.prototype.roleGroupDataIndexChanged = function(event){ 
		var permissionData = this.comp("permissionData")
		var permissiondataTables = this.comp("permissiondataTables")
		if(event.row){
			var limit = event.limit
			this.currentRoleGroupRow.set(event.row)
			permissionData.clear()
			Authorize.getPermissionsByRoleId({role:event.row && '/'+event.row.val('id'),size:10,page:0})
			.then(function(data){ 
				if(data._embedded && data._embedded.permissions.length >0){
					var arr = data._embedded.permissions
					var newArray = arr.map(function(item){
						return Object.assign({},item,{
							label:event.row.val('name'),
							permissionKind:item.type && (item.type.includes('functionTree')? 0 : item.type.includes('service')? 2 : 1)
						})
					})
					permissionData.loadData(newArray)
					permissionData.setTotal(data.page.totalElements)
					permissionData.first()
					permissionData.refreshData()
					//permissiondataTables.reload()
				}
			})
		}
	};
	// 删除 permission
	Model.prototype.permissionsDeleteClick = function(event){
		var permissiondataTables = this.comp("permissiondataTables")
		var permissionData = this.comp("permissionData")
		if(permissiondataTables.getCheckeds().length === 0){
			justep.Util.hint('请勾选需要删除的权限')
			return 
		}
		var self = this;
		justep.Util.confirm('确认要删除当前权限吗',function(){ 
			$.each(permissiondataTables.getCheckeds(),function(i,row){ 
				Authorize.deletePermissionById({_id: row.val('id')})
				  .then(function(){
					  permissionData.refreshData()
				  },function(err){
					  throw err
				  })
			})
		})
	};
	
	Model.prototype.filter = function(label){
		if(!label){
			return true
		}
		if(label.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1){
			return true
		}
		return false
		
	}
	
	Model.prototype.functionsDialogReceived = function(event){
		var rows = event.data.params.rows
		var permissionData = this.comp("permissionData")
		var permissiondataTables = this.comp("permissiondataTables")
		var self = this
		var promises1 = []
		var promises2 = []
		var array = []
		$.each(rows,function(i,row){
			var currentRow = {
					id:row.val('id'),
					code:row.val('code'),
					name:row.val('path'),
					//type:'data:'+row.val('code'),
					role:"/"+self.currentRoleGroupRow.get().val('id'),
					serviceName:'x5',
					type:'functionTree',
					permissionKind:0
			}
			array.push(Object.assign({},currentRow,{
				label: self.currentRoleGroupRow.get().val('name')
			}))
			promises2.push(Authorize.getPermissionItemByCode({
				code:'x5:'+row.val('code')        // pgrest 是临时加上的
			}).then(function(data){
				if (!data.length){
					promises1.push(Authorize.addPermissionItem(currentRow)
					.then(function(){
					},function(err){
						throw err
					}))
				}
			},function(err){
				throw err
			}))
		})
		$.when.apply($,promises2.concat(promises1)).then(function(){ 
			permissionData.refreshData()
		})
		
	};
	
	Model.prototype.receivedData = function(){
		
	}
	
	
	// 接管 permissionData 刷新
	
	Model.prototype.permissionDataCustomRefresh = function(event){
		var permissionData = this.comp("permissionData")
		var permissiondataTables = this.comp("permissiondataTables")
		var orderBys = event.source.orderBys
		var self =this
		var rows = this.comp('roleGroupData').getCurrentRow()
		if(rows){ 
			this.permissionOrderPattern = !this.permissionOrderPattern
			var params = {
				role:'/'+rows.val('id'),
				size:event.limit,
				page:event.offset/event.limit,
			}
			if(orderBys && orderBys.length){
				Object.assign(params,{
					sort:orderBys[0].relation+','+(this.permissionOrderPattern ?'asc':'desc')
				})
			}
			Authorize.getPermissionsByRoleId(params)
			.then(function(data){ 
				if(data._embedded && data._embedded.permissions.length >0){
					var arr = data._embedded.permissions
					var newArray = arr.map(function(item){
						return Object.assign({},item,{
							label:rows.val('name'),
							permissionKind:item.type &&(item.type.includes('functionTree')? 0 : item.type.includes('service')? 2 : 1)
						})
					})
					event.source.loadData(newArray)
					event.source.setTotal(data.page.totalElements)
					event.source.doRefreshAfter()
					permissionData.first()
					permissiondataTables.reload()
				}
			})
		}

	};
	
	Model.prototype.input4Keyup = function(event){
		if (this.timer) {
			clearTimeout(this.timer);
		}
		var self = this;
		this.timer = setTimeout(function() {
			var v = self.comp("searchPermissionInput").$domNode.val();
			self.filterValue = v;
			self.comp('permissiondataTables').reload();
			//
		}, 100)
	};
	Model.prototype.searchRoleInputKeyup = function(event){
		if (this.timer) {
			clearTimeout(this.timer);
		}
		var self = this;
		this.timer = setTimeout(function() {
			var v = self.comp("searchRoleInput").$domNode.val();
			self.filterValue = v;
			self.comp('roleGroupdataTables').reload();
			//
		}, 100)
	};
	
	Model.prototype.modelLoad = function(event){
		var roleGroupData = this.comp("roleGroupData")
		if(roleGroupData.count()>0){
			this.currentRoleGroupRow.set(roleGroupData.first())
		}
		//roleGroupData.refreshData();
	};
	
	
	/**
		接管 roleGroup刷新
	 */
	Model.prototype.roleGroupDataCustomRefresh = function(event){ 
		var self = this;
		this.roleOrderPattern = !this.roleOrderPattern
		var roleGroupdataTables = this.comp("roleGroupdataTables")
		event.source.clear();
		this.loadRole_group({
			sort:'name,'+(self.roleOrderPattern?"asc":"desc")
		}).then(function(data){
				event.source.loadData(data,true)
				event.source.first()
				roleGroupdataTables.reload()
			},function(error){
				throw error
			})
	};
	
	// 新建功能树dialog 
	Model.prototype.newFunctionPermissionBtnClick = function(event){
		var roleGroupData = this.comp("roleGroupData")
		var id = roleGroupData.getCurrentRowID()
		var functionsDialog = this.comp("functionsDialog")
		functionsDialog.set({
			title:"功能树权限"
		})
		functionsDialog.open({
			params:'func'
		})
	};
	
	// 新建 数据对象 dialog
	Model.prototype.newDataPermissionBtnClick = function(event){
		var roleGroupData = this.comp('roleGroupData')
		var permissionData = this.comp('permissionData')
		this.currentRows = roleGroupData.getCurrentRow()
		this.comp('dataPermissionDialog').open({
			params: {
				currentRoleRows:this.currentRows,
				status:'new',
				data:permissionData
			}
		})
	};
	
	// 接收data对象 传回来的选项
	
	Model.prototype.dataPermissionDialogReceived = function(event){ 
		var permissionData = this.comp("permissionData")
		var permissiondataTables = this.comp("permissiondataTables")
		var data = event.data.params;
		var self = this
		if(data && data.length>0){
			if(permissionData.count()>0){
				data.forEach(function(item,index){
					permissionData.each(function(option){ 
						if(item.description==option.row.val('name') && item.condition==option.row.val('condition')){
							data.splice(index,1)
						}
					})
				})
			}
			if(data.length>0){
				var newData = data.map(function(item){
					return Object.assign({},item,{
						type:'data:'+item.code.split(":")[0],
						serviceName:'dbrest',
						permissionKind:1
					})
				})
				var promiseArray = []
				var p1 = newData.forEach(function(currentRow){
					promiseArray.push(Authorize.addPermissionItem(currentRow))
				})
				$.when.apply($,promiseArray).then(function(){ 
					permissionData.refreshData()
				})
			}
			//permissionData.loadData(newData,true,null,0)
		}
	};
	
	// 接管删除
	Model.prototype.permissionDataCustomDelete = function(event){
		
	};
	
	// permissionData 列表渲染时
	Model.prototype.permissiondataTablesCellRender = function(event){
		if (event.colName == "permissionKind") { 
			event.html = "<img height='16' width='16' src='" + Utils.getPermissionImgURL(event.colVal) + "'/>";
		} else if (event.colName == "actionsLabel") {
			/*event.html = "<button name='policyBtn' style='float: right'>...</button>" + (event.colVal ? event.colVal : "");*/
		}
	};
	Model.prototype.roleGroupdataTablesCellRender = function(event){ 
		if(event.colName =="roleKind"){
			event.html = "<img height='16' width='16' src='" + Utils.getRoleImgURL() + "'/>";
		}
	};
	Model.prototype.newServiceBtnClick = function(event){
		var roleGroupData = this.comp("roleGroupData")
		var id = roleGroupData.getCurrentRowID()
		var servicesDialog = this.comp("servicesDialog")
		servicesDialog.set({title:'服务权限'})
		servicesDialog.open({
			params:'service'
		})
	};
	Model.prototype.servicesDialogReceived = function(event){
		var rows = event.data.params.rows
		var permissionData = this.comp("permissionData")
		var permissiondataTables = this.comp("permissiondataTables")
		var self = this
		var promises1 = []
		var promises2 = []
		var array = []
		$.each(rows,function(i,row){
			var currentRow = {
					id:row.val('id'),
					code:row.val('code'),
					name:row.val('path'),
					//type:'data:'+row.val('code'),
					role:"/"+self.currentRoleGroupRow.get().val('id'),
					serviceName:'service',
					type:'service',
					permissionKind:2
			}
			array.push(Object.assign({},currentRow,{
				label: self.currentRoleGroupRow.get().val('name')
			}))
			promises2.push(Authorize.getPermissionItemByCode({
				code:'service:'+row.val('code')        // pgrest 是临时加上的
			}).then(function(data){
				if (!data.length){
					promises1.push(Authorize.addPermissionItem(currentRow)
					.then(function(){
					},function(err){
						throw err
					}))
				}
			},function(err){
				throw err
			}))
		})
		$.when.apply($,promises2.concat(promises1)).then(function(){ 
			permissionData.refreshData()
		})
	};
	return Model;
});