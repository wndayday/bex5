define(function(require){
	var Authorize = require("$UI/system/admin/user/js/Authorize");
	return {        // 获取 所有的群组  
		getAllRoles: function(){
		  return Authorize.getRoleGroupInfo()
			.then(function(result){
				if(result && result._embedded && (result._embedded.roles.length>0)){
				  return result._embedded.roles;
				}
				return []
			})	
		},
		getRoleIdByName:function(arr,name){
			if(arr && arr.length>0){
			   var currentRole = arr.find(function(item){
				   return item.name === name
			   })
			   return currentRole.id
			}
			return '';
		},
		getRoleNameById: function(arr,id){
			if(arr && arr.length>0) {
				var currentRole = arr.find(function(item){
					return item.id === id
				})
				return currentRole.name
			}
			return ''
		}
	}
})