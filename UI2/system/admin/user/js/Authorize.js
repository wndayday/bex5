define(function(require) {
	var $ = require("jquery");
	var baseUrl = "/authorize";
	var baseHeaders = {
		"X-Request-Service-Name" : "dbrest",
		"Content-type" : "application/json"
		/*"Cache-Control" : "no-cache",
		"X-Credential-Username" : "zhangsan",
		"X-Tenant-Key" : "tenant008"*/
	}
	var baseFuncHeaders = Object.assign({},baseHeaders,{
		"X-Request-Service-Name" : "x5",
	})
	var baseServiceHeaders = Object.assign({},baseHeaders,{
		"X-Request-Service-Name" : "service",
	})
	
	var getGroupsName = function(groups) {
		var sysGroups = [ 'uaa.offline_token', 'approvals.me', 'user_attributes', 'cloud_controller.read', 'roles', 'oauth.approvals', 'cloud_controller_service_permissions.read', 'scim.me',
				'openid', 'uaa.user', 'profile', 'cloud_controller.write', 'password.write', 'scim.userids' ];
		var ret = [];
		$.each(function(i, group) {
			var name = group.display;
			if (sysGroups.indexOf(name) < 0)
				ret.push(name);
		});
		return ret.join(",");
	};
	var Authorize = {
		getUsers : function(params) {
			params = params || {};
			var dfd = $.Deferred();
			/*
			 * uaa.getToken().then(function(token) { $.ajax({ method : "GET",
			 * url : baseUrl + "/Users", headers : { Accept :
			 * "application/json", "Authorization" : "Bearer " +
			 * token.access_token }, data : params }).done(function(data) { if
			 * ($.isArray(data.resources)) { $.each(data.resources, function(i,
			 * user) { user._emails = user.emails; user.emails = user.emails[0];
			 * user._groups = user.groups; user.groups =
			 * getGroupsName(user.groups); }); } // 处理多值的字段 dfd.resolve(data);
			 * }).fail(function(error) { dfd.reject(error); }); });
			 */
			return dfd.promise();
		},
		// 存储群组权限
		addRoleGroup : function(params) {
			console.log(params)
			var dfd = $.Deferred();
			$.ajax({
				method : "POST",
				url : baseUrl + "/roles",
				headers : baseHeaders,
				data : JSON.stringify(params)
			}).then(function(data) {
				dfd.resolve(data)
			}, function(error) {
				dfd.reject(error);
			})
			return dfd.promise();
		},
		// 修改群组信息
		updatePermissionsGroup : function(params) {
			var dfd = $.Deferred();
			// 处理user字段
			$.ajax({
				method : "POST",
				url : baseUrl + "/roles",
				headers : baseHeaders,
				data : params
			}).then(function(data) {
				dfd.resolve(data)
			}, function(error) {
				dfd.reject(error);
			})
			return dfd.promise();
		},
		// 删除当前 的群组
		deleteRoleGroup : function(params) {
			var dfd = $.Deferred();
			// 处理user字段
			$.ajax({
				method : "DELETE",
				url : baseUrl + "/roles/" + params.id,
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		// 删除 当前的 群组
		deleteGroupBySubject : function(params) {
			var dfd = $.Deferred();
			// 处理user字段
			$.ajax({
				method : "DELETE",
				url : baseUrl + "/subjects/" + params.id,
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		// 新建授权
		createSubjects : function(params) {
			var dfd = $.Deferred();
			$.ajax({
				method : "POST",
				url : baseUrl + "/subjects",
				headers : baseHeaders,
				dataType : "json",
				data : JSON.stringify(params)
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		deleteSubjectByCodeAndRole : function(params) {
			var dfd = $.Deferred();
			$.ajax({
				method : "GET",
				url : baseUrl + "/subjects/search/deleteByCodeAndRole?code=" + params.code + "&role=" + encodeURIComponent(params.role),
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},

		// 获取权限信息
		getPermissionsInfo : function(code_id) {
			var dfd = $.Deferred();
			$.ajax({
				method : "GET",
				url : baseUrl + "/permission/" + code_id,
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		getRoleItemById : function(params) {
			var dfd = $.Deferred();
			$.ajax({
				method : "GET",
				url : baseUrl + "/roles/" + params,
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		getRoleGroupInfo : function(params) {
			var dfd = $.Deferred();
			var self = this;
			$.ajax({
				method : "GET",
				url : params ? (baseUrl + "/roles?" + params) : (baseUrl + "/roles"),
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		getPermissionsByRoleId : function(params) {
			var dfd = $.Deferred();
			var self = this;
			$.ajax({
				method : "GET",
				url : baseUrl + "/permissions/search/findByRole?" + $.param(params),
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		getPermissionsByType : function(params) {
			var dfd = $.Deferred();
			var self = this;
			$.ajax({
				method : "GET",
				url : baseUrl + "/permissions/search/findByType?type=" + encodeURIComponent(params.type),
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		getPermissionItemByCode:function(params){
			var dfd = $.Deferred();
			var self = this;
			$.ajax({
				method : "GET",
				url : baseUrl + "/permissions/search/findByCode?code="+params.code, 
				headers : baseHeaders
			}).then(function(data) {
				if(data._embedded){
					dfd.resolve(data._embedded.permissions);
				}else {
					dfd.reject('500')
				}
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		getRolesByPermissionId : function(params) {
			var dfd = $.Deferred();
			var self = this;
			$.ajax({
				method : "GET",
				url : baseUrl + "/permissions/" + params.id + '/role',
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		deletePermissionById : function(params) {
			var dfd = $.Deferred();
			$.ajax({
				method : "DELETE",
				url : baseUrl + "/permissions/" + params._id,
				headers : baseHeaders
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		addPermissionItem : function(params) {
			var dfd = $.Deferred();
			var serviceName = params.serviceName
			var headers = baseHeaders
			if(serviceName){
				headers = serviceName == 'x5'?baseFuncHeaders : serviceName =='service'? baseServiceHeaders : baseHeaders
			}
			$.ajax({
				method : "POST",
				url : baseUrl + "/permissions",
				headers : headers,
				data : JSON.stringify(params)
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		modifyPermissionItem : function(params, id) {
			var dfd = $.Deferred();
			$.ajax({
				method : "PATCH",
				url : baseUrl + "/permissions/" + id,
				headers : baseHeaders,
				data : JSON.stringify(params)
			}).then(function(data) {
				dfd.resolve(data);
			}, function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		}
	};
	return Authorize;
});