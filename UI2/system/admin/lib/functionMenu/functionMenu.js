define(function(require){
	var $ = require('jquery')
	var justep = require("$UI/system/lib/justep")
	var Authorize = require("$UI/system/admin/user/js/Authorize")
	return {
		getFunctionMenu: function(context){
			var deferred = $.Deferred()
			//var defers = []
			var self = this
			this.getAuthorizeFuns()
			this._doInit(context)
			this.getMenu().done(function(menu){
				deferred.resolve(menu)
			})
			return deferred.promise()
		},
		getAuthorizeMenuList:function(context){
			var deferred = $.Deferred()
			var self = this
			this.getFunctionMenu(context).done(function(menu){
				self.getAuthorizeFuns().done(function(authorizeMenu){
					var arr = self.showFunctionTree(menu,authorizeMenu)
					console.log(arr)
					deferred.resolve(arr)
				})
			})
			return deferred.promise()
		},
		showFunctionTree: function(funMenuList,authorizeMenuList){ 
			if(!funMenuList.length || !$.isArray(authorizeMenuList) || authorizeMenuList.lenth==0){
				return []
			}
			var newArray = []
			funMenuList.forEach(function(funMenu,funIndex){
				authorizeMenuList.forEach(function(authorizeMenu){
					var authorizeUrl = authorizeMenu.code.split(":")[1]
					if(funMenu.url == authorizeUrl){
						newArray.push(funMenu)
					}
				})
			})
			return newArray
		},
		getAuthorizeFuns: function(){
			var deferred = $.Deferred()
			Authorize.getPermissionsByType({type:"functionTree"})
			   .then(function(data){
				   if(data && data._embedded.permissions.length){
					   deferred.resolve(data._embedded.permissions)
				   }
				   deferred.resolve([])
			   })
			 return deferred.promise()
		},
		getMenu:function(){
			var deferred = $.Deferred(), defers = [], self = this;
			//加载系统功能树
			var url = require.toUrl("$UI/system/admin/config/sys.function.json");//"$UI2/system/designer/webIde/quickIde/config/sys.function.json";
			defers.push(self.getFunctions(url));
			//加载业务组件功能树
			if(this.appCfg && $.isArray(this.appCfg.funcs)){
				$.each(this.appCfg.funcs, function(i,v){
					var url = require.toUrl(v);
					defers.push(self.getFunctions(url));
				});
			}
			if(defers.length>0){
				$.when.apply($,defers).then(function(){
					var args = $.makeArray(arguments);
					var menus = [];
					$.each(args, function(i,v){
						menus.push.apply(menus,v);
					});
					deferred.resolve(menus);
				});
			}else{
				deferred.resolve([]);
			}
			return deferred.promise();
		},
		getFunctions: function(url){
			var deferred = $.Deferred();
			$.ajax({
				dataType : 'json',
				url : url,
				async: false,
				success : function(funcs) {
					deferred.resolve(funcs);
				},
				error : function(){
					deferred.resolve([]);
				}
			});
			return deferred.promise();
		},
		_doInit : function(context) {
			var self = this;
			var data = context.getRequestParameter("key");
			var isQuick = 'true'==sessionStorage.getItem("isQuick");
			if (!isQuick && !data) {
				data = sessionStorage.getItem("config")||"{}";
				/*获取app相关信息
				 * {
				 * 	appPath:'',
				 *  funcs:['$UI/account/config/1.function.json','$UI/account/config/2.function.json']
				 * }
				 */
				$.ajax({
					dataType : 'json',
					url : require.toUrl("$UI/app.json"),
					async: false,
					success : function(appCfg) {
						self.appCfg = appCfg;
						if(self.appCfg && self.appCfg.appPath) sessionStorage.setItem("appPath",self.appCfg.appPath);
					}
				});
			}else{
				if(data)
					data = util.encrypt(justep.Base64.decode(data), [ 20, 54, 68, 73, 25, 11, 86, 34, 97, 33, 20, 20 ]);
				else 
					data = sessionStorage.getItem("config")||"{}";
			}
			
			//增加模式3部署通过.j获取配置
			$.ajax({
				dataType : 'json',
				url : require.toUrl("./server/funcs.j"),
				async: false,
				cache: false,
				success : function(funcs) {
					self.appCfg = self.appCfg || {};
					self.appCfg.funcs = funcs;
				}
			});
			
			/*this.config = data == '{}' ? {} : JSON.parse(data);// 解密
			sessionStorage.setItem("config", JSON.stringify(this.config));

			this.comp("confirmDeleteMessageDialog").$domNode.removeClass('hide');
			if (this.hasListener('onInit')) {
				var eData = {
					source : this,
					config : this._cfg
				};
				this.fireEvent('onInit', eData);
			}*/

		}
	}
})