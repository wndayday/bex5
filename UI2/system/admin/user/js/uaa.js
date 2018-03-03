define(function(require) {
	var $ = require("jquery");
	var baseUrl = "/uaa";
	
	var token = null;
	var tokenDfd = $.Deferred();
	var getToken = function(){
		$.ajax({
			method:"POST",
			url:baseUrl+"/oauth/token",
			xhrFields: { withCredentials: true },
			headers:{
				"Accept": "application/json",
				"Content-Type":"application/x-www-form-urlencoded",
			},
			data:{
				"client_id":"admin",
				"client_secret":"adminsecret",
				"grant_type":"client_credentials",
				"token_format":"opaque",
				"response_type":"token"
			}
		}).then(function(data){
			tokenDfd.resolve(data);
		},function(error){
		});
	};
	
	var getGroupsName = function(groups){
		var sysGroups = ['uaa.offline_token','approvals.me','user_attributes','cloud_controller.read','roles','oauth.approvals','cloud_controller_service_permissions.read','scim.me','openid','uaa.user','profile','cloud_controller.write','password.write','scim.userids'];
		var ret = [];
		$.each(function(i,group){
			var name = group.display;
			if(sysGroups.indexOf(name)<0)
				ret.push(name);
		});
		return ret.join(",");
	};
	
	var uaa = {
			getToken: function(){
				return tokenDfd.promise();
			},
			getUsers: function(params){
				params = params || {};
				var dfd = $.Deferred();
				uaa.getToken().then(function(token){
					$.ajax({
						method:"GET",
						url:baseUrl+"/Users",
						headers:{
							Accept:"application/json",
							"Authorization":"Bearer " + token.access_token
						},
						data:params
					}).done(function(data){
						if($.isArray(data.resources)){
							$.each(data.resources, function(i,user){
								user._emails = user.emails;
								user.emails = user.emails[0];
								user._groups = user.groups;
								user.groups = getGroupsName(user.groups);
							});
						}
						//处理多值的字段
						dfd.resolve(data);
					}).fail(function(error){
						dfd.reject(error);
					});
				});
				return dfd.promise();
			},
			createUser: function(user){
				var dfd = $.Deferred();
				//处理user字段
				uaa.getToken().then(function(token){
					$.ajax({
						method:"POST",
						url:baseUrl+"/Users",
						headers:{
							Accept:"application/json",
							"Authorization":"Bearer " + token
						},
						data:user
					}).then(function(data){
						dfd.resolve(data);
					},function(error){
						dfd.reject(error);
					});
				});
				return dfd.promise();
			},
			updateUser: function(user){
				var dfd = $.Deferred();
				//处理user字段
				uaa.getToken().then(function(token){
					$.ajax({
						method:"PUT",
						url:baseUrl+"/Users/"+user.id,
						headers:{
							Accept:"application/json",
							"Authorization":"Bearer " + token
						},
						data:user
					}).then(function(data){
						dfd.resolve(data);
					},function(error){
						dfd.reject(error);
					});
				});
				return dfd.promise();
			},
			deleteUser: function(uid){
				var dfd = $.Deferred();
				//处理user字段
				uaa.getToken().then(function(token){
					$.ajax({
						method:"DELETE",
						url:baseUrl+"/Users/"+uid,
						headers:{
							Accept:"application/json",
							"Authorization":"Bearer " + token
						}
					}).then(function(data){
						dfd.resolve(data);
					},function(error){
						dfd.reject(error);
					});
				});
				return dfd.promise();
			}
	};
	
	//初始获取
	getToken();
	
	return uaa;
});