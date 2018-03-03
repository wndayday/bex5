define(function(require) {
	var $ = require('jquery');
	var admin = [ {
		value : 'role',
		zh_value:'角色',
		name : 'anonymous',
		zh_name : '匿名用户'
	}, {
		value : 'role',
		zh_value:'角色',
		name : 'authentication',
		zh_name : '注册用户'
	}, 
	{
		value : 'role',
		zh_value:'角色',
		name : 'admin',
		zh_name : '管理员'
	}
	];
	var rolesHandler = {
		complete : function(arr) {
			var _html = '<optgroup label="'+arr[0].zh_value+'">';
			arr.forEach(function(item, index) {
				_html += '<option value="' + item.value +':'+item.name+ '">' + item.zh_name + '</option>';
			})
			console.log(_html);
			return _html+'</optgroup>'
		},
		completeAdmin:function(roles){
			return this.complete(roles);
		},
		completeRoles:function(roles){
			return this.complete(roles)
		},
		completeOpts:function(roles,group){
			var admin='',groupName='';
			if(Array.isArray(roles) && ((roles||[]).length>0)){
				admin = this.completeAdmin(roles);
			}
			if(Array.isArray(group) && ((group||[]).length>0)){
				
				groupName = this.completeRoles(group);
			}
			return admin+groupName
		},
		getAdmin:function(){
			return admin
		},
		switchNameToZhName:function(arr,name){
			var currentItem=arr.find(function(item,index){
				return item.name ==name
			})
			if(currentItem){
				return currentItem.zh_name
			}
		},
		switchZhNameToName:function(arr,zh_name){
			var currentItem = arr.find(function(item,index){
				return item['zh_name'] ===zh_name
			})
			if(currentItem){
				return currentItem.name
			}
			return ""
		}
	};
	return rolesHandler;
})