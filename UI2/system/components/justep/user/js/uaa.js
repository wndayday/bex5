define(function(require) {
	var $ = require("jquery");

	var baseUrl = "/uaa";
	var apiGatewayUrl = "";

	var isLogined = false;
	var curUser = null;

	var getGroupsName = function(groups) {
		var sysGroups = [ 'uaa.offline_token', 'approvals.me', 'user_attributes', 'cloud_controller.read', 'roles', 'oauth.approvals',
				'cloud_controller_service_permissions.read', 'scim.me', 'openid', 'uaa.user', 'profile', 'cloud_controller.write', 'password.write',
				'scim.userids' ,"scim.read","acme","acme.dev"];
		var ret = [];
		$.each(groups,function(i, group) {
			var name = group.display;
			if (sysGroups.indexOf(name) < 0)
				ret.push(decodeURI(name));
		});
		return ret.join(",");
	};
	
	var subdomain;
	var getSubdomain = function(){
		if(subdomain) return subdomain;
		var cfg = sessionStorage.getItem("config");
		if(cfg){
			try{
				cfg = JSON.parse(cfg);
			}catch(e){cfg={};}
			if(cfg.appkey){
				subdomain = cfg.appkey;
				return subdomain;
			}
		}
		var host = window.location.host;
		var ipos = host.indexOf(".");
		if(ipos>0){
			subdomain = host.substring(0, ipos);
			//var ext = subdomain.substring(subdomain.length-4);
			//if("-ide"===ext || "-app"===ext) subdomain = subdomain.substring(0,subdomain.length-4);
			return subdomain;
		}
	};
	
	var getOverrideHost = function(){
		var subdomain = getSubdomain();
		return subdomain?(subdomain+"."+window.location.host):window.location.host;
	};

	var createHttpHeaders = function(token){
		var ret = {
		};
		/*
		if(token) ret["Authorization"] = "Bearer " + token;
		var subdomain = getSubdomain();
		if(subdomain) ret["X-Identity-Zone-Subdomain"] = subdomain;
		var host = getOverrideHost();
		//if(host) ret["X-Host-Override"] = host;
		*/
		return ret;
	};
	
	var processUser = function(user){
		user.name = decodeURI(user.name.formatted || user.name.givenName || user.userName);
		user._emails = user.emails;
		user.emails = user.emails[0].value;
		user._groups = user.groups;
		user.groups = getGroupsName(user.groups);
		user._meta = user.meta;
		user.createTime = new Date(user.meta.created).pattern("yyyy-MM-dd HH:mm:ss");
		user.phoneNumbers ? user.phoneNumbers = user.phoneNumbers[0] : "";
	};
	Date.prototype.pattern=function(fmt) {     
	    var o = {     
	    "M+" : this.getMonth()+1, //月份     
	    "d+" : this.getDate(), //日     
	    "h+" : this.getHours()%12 === 0 ? 12 : this.getHours()%12, //小时     
	    "H+" : this.getHours(), //小时     
	    "m+" : this.getMinutes(), //分     
	    "s+" : this.getSeconds(), //秒     
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度     
	    "S" : this.getMilliseconds() //毫秒     
	    };     
	    var week = {     
	    "0" : "\u65e5",     
	    "1" : "\u4e00",     
	    "2" : "\u4e8c",     
	    "3" : "\u4e09",     
	    "4" : "\u56db",     
	    "5" : "\u4e94",     
	    "6" : "\u516d"    
	    };     
	    if(/(y+)/.test(fmt)){     
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));     
	    }     
	    if(/(E+)/.test(fmt)){     
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);     
	    }     
	    for(var k in o){     
	        if(new RegExp("("+ k +")").test(fmt)){     
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));     
	        }     
	    }     
	    return fmt;     
	};
	var processGroup = function(group){
		group.displayName = decodeURI(group.displayName);
	};
	var processUserToSave = function(user){
		var name = encodeURI(user.name);
		var ret = {
				id : user.id,
				userName: user.userName,
				name : {formatted: name,givenName:name},
				emails : [{value:user.emails,primary:true}],
				phoneNumbers : [user.phoneNumbers]
		};
		if(user.active!==undefined)	ret.active = user.active;
		if(user.verified!==undefined)	ret.verified = user.verified;
		if(user.origin!==undefined)	ret.origin = user.origin;
		if(user.externalId!==undefined)	ret.externalId = user.externalId;
		if(user.password!==undefined)	ret.password = user.password;
		return ret;
	};
	var processGroupToSave = function(groupName){
		var name = encodeURI(groupName);
		var ret = {
				displayName : name,
				description :"_user_create_"
		};
		return ret;
	};
	var errorInfo = function(status){
		var error = {
				"400" : "请求无效JSON格式或缺少的字段",
				"401" : "无效的Token",
				"403" : "没有权限修改",
				"404" : "不存在",
				"409" : "已经存在"
		};
		return error[status];
	};
	var uaa = {
		getCurrentUser: function(){
			return curUser;
		},
		isLogined : function() {
			return isLogined;
		},
		sendVerifyCode: function(type,tel){
			//type:resetPassword/register
			var headers = createHttpHeaders();
			headers['Accept'] = "application/json";
			return $.ajax({
				method : "POST",
				url : baseUrl + "/sendVerifyCode",
				xhrFields : {
					withCredentials : true
				},
				contentType : "application/json",
				headers : headers,
				data : JSON.stringify({
					type : type,
					tel : tel
				})
			});
		},
		resetPassword: function(tel,code,newPassword){
			var headers = createHttpHeaders();
			headers['Accept'] = "application/json";

			return $.ajax({
				method : "POST",
				url : baseUrl + "/reset_password",
				xhrFields : {
					withCredentials : true
				},
				headers : headers,
				data : {
					code : code,
					tel : tel,
					password: newPassword
				}
			});
		},
		register: function(user,code){
			var headers = createHttpHeaders();
			headers['Accept'] = "application/json";
			headers['code'] = code;
			headers['tel'] = user.userName;
			var data = processUserToSave(user);

			return $.ajax({
				method : "POST",
				url : baseUrl + "/Users/register",
				xhrFields : {
					withCredentials : true
				},
				dataType : "json",
				contentType : "application/json",
				headers : headers,
				data : JSON.stringify(data)
			});
		},
		login : function(username, password) {
			var dfd = $.Deferred();
			var self = this;
			$.ajax({
				method : "POST",
				url : apiGatewayUrl + "/login",
				dataType:"json",
				xhrFields : {
					withCredentials : true
				},
				headers : {
					Accept : "application/json"
					//"X-Host-Override" : getOverrideHost()
				},
				data : {
					username : username,
					password : password
				}
			}).done(function(data) {
				if(data && data.error) dfd.reject(data.error);
				else{
					self.loginAfter(data);
					dfd.resolve(data);
				}	
			}).fail(function(error) {
				dfd.reject(error);
			});
			return dfd.promise();
		},
		loginAfter : function(data) {
			data.id = data.user_id;
			data.userName = data.user_name;
			data.name = decodeURI(data.given_name);
			data.phoneNumber = data.phone_number;
			isLogined = true;
			curUser = data;			
		},
		logout : function() {
			var dfd = $.Deferred();
			$.ajax({
				url : apiGatewayUrl + "/logout",
				xhrFields : {
					withCredentials : true
				},
				dataType : "text",
				cache: false
//				headers : {
//					"X-Host-Override" : getOverrideHost()
//				}
			}).done(function(data) {
				curUser = null;
				isLogined = false;
				dfd.resolve(data);
			}).fail(function(error) {
				dfd.reject(error);
			});

			return dfd.promise();
		},
		changePassword : function(oldPassword, password) {
			var dfd = $.Deferred();
			if (uaa.isLogined()) {
				getToken().then(function(token){
					var headers = createHttpHeaders(token.access_token);
					headers['Accept'] = "application/json";

					$.ajax({
						method : "PUT",
						xhrFields : {
							withCredentials : true
						},
						url : baseUrl + "/Users/"+curUser.id+"/password",
						dataType : "json",
						contentType : "application/json",
						headers: headers,
						processData : false,
						data : JSON.stringify({
							oldPassword : oldPassword,
							password : password
						})
					}).then(function(data){
						dfd.resolve(data);
					},function(error){
						dfd.reject(errorInfo(error.status));
					});
				},function(){
					dfd.reject("token error");
				});
			} else {
				dfd.reject({
					errorCode : 'NOT_LOGINED'
				});
			}
			return dfd.promise();
		},
		getGroups : function(params){
			params = params || {};
			var dfd = $.Deferred();
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method : "GET",
					url : baseUrl + "/Groups",
					dataType : "json",
					contentType : "application/json",
					headers:headers,
					data : params
				}).done(function(data) {
					var rows = [];
					if ($.isArray(data.resources)) {
						$.each(data.resources, function(i, group) {
							if(group.description==="_user_create_"){
								processGroup(group);
								rows.push({
									id:group.id,
									name : group.displayName
								});
							}
						});
					}
					dfd.resolve(rows);
				}).fail(function(error) {
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		getUsers : function(params) {
			params = params || {};
			var dfd = $.Deferred();
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method : "GET",
					url : baseUrl + "/Users",
					dataType : "json",
					contentType : "application/json",
					headers:headers,
					data : params
				}).done(function(data) {
					if ($.isArray(data.resources)) {
						$.each(data.resources, function(i, user) {
							processUser(user);
						});
					}
					dfd.resolve(data);
				}).fail(function(error) {
	
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		createUser : function(user) {
			user = processUserToSave(user);
			var dfd = $.Deferred();
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method : "POST",
					url : baseUrl + "/Users",
					dataType : "json",
					contentType : "application/json",
					processData : false,
					headers:headers,
					data : JSON.stringify(user)
				}).then(function(data) {
					processUser(data);
					dfd.resolve(data);
				}, function(error) {
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		createGroup : function(groupName){
			var group = processGroupToSave(groupName);
			var dfd = $.Deferred();
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method : "POST",
					url : baseUrl + "/Groups",
					dataType : "json",
					contentType : "application/json",
					processData : false,
					headers:headers,
					data : JSON.stringify(group)
				}).then(function(data) {
					processGroup(data);
					var group = {
						id:data.id,
						name : data.displayName
					};
					dfd.resolve(group);
				}, function(error) {
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		updateUser: function(user){
			var version = user.meta.version;
			user = processUserToSave(user);
			var dfd = $.Deferred();
			//处理user字段
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				headers['If-Match'] = version;
				$.ajax({
					method:"PUT",
					url:baseUrl+"/Users/"+user.id,
					dataType : "json",
					contentType : "application/json",
					processData : false,
					headers:headers,
					data : JSON.stringify(user)
				}).then(function(data){
					processUser(data);
					dfd.resolve(data);
				},function(error){
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		getUser : function(uid){
			var dfd = $.Deferred();
			//处理user字段
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method:"GET",
					url:baseUrl+"/Users/"+uid,
					headers:headers
				}).then(function(data){
					processUser(data);
					dfd.resolve(data);
				},function(error){
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		deleteGroup :function(gid){
			var dfd = $.Deferred();
			//处理user字段
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method:"DELETE",
					url:baseUrl+"/Groups/"+gid,
					headers:headers
				}).then(function(data){
					dfd.resolve(data.id);
				},function(error){
					dfd.reject(error);
				});
			});
			return dfd.promise();
		},
		addMember : function(gid,uid){
			var params = {"origin":"uaa","type":"USER","value":uid};
			var dfd = $.Deferred();
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method : "POST",
					url : baseUrl + "/Groups/"+gid+"/members",
					dataType : "json",
					contentType : "application/json",
					processData : false,
					headers:headers,
					data : JSON.stringify(params)
				}).then(function(data) {
					dfd.resolve(data);
				}, function(error) {
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		removeMember : function(gid,uid){
			var dfd = $.Deferred();
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method : "DELETE",
					url : baseUrl + "/Groups/"+gid+"/members/"+uid,
					dataType : "json",
					contentType : "application/json",
					processData : false,
					headers:headers,
				}).then(function(data) {
					dfd.resolve(data);
				}, function(error) {
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		listMember : function(gid){
			var  params = {
					"returnEntities":true
			};
			var dfd = $.Deferred();
			//处理user字段
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method:"GET",
					url:baseUrl+"/Groups/"+gid+"/members",
					headers:headers,
					data : params
				}).then(function(data){
					var uids = [];
					if(data.length>0){
						$.each(data,function(i,v){							
							uids.push(v.value);
						});
					}
					dfd.resolve(uids);
				},function(error){
					dfd.reject(errorInfo(error.status));
				});
			});
			return dfd.promise();
		},
		deleteUser: function(uid){
			var dfd = $.Deferred();
			//处理user字段
			getToken().then(function(token){
				var headers = createHttpHeaders(token.access_token);
				headers['Accept'] = "application/json";
				$.ajax({
					method:"DELETE",
					url:baseUrl+"/Users/"+uid,
					headers:headers
				}).then(function(data){
					dfd.resolve(data);
				},function(error){
					dfd.reject(error);
				});
			});
			return dfd.promise();
		}
	};

	var tokenDfd = $.Deferred();
	var initToken = function(){
		/*
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
		 */
		tokenDfd.resolve({});
	};
	var getToken = function(){
		return tokenDfd.promise();
	};
	initToken();
	
	return uaa;
});