define(function(require) {
	var $ = require('jquery')
	var justep = require("$UI/system/lib/justep");
	var functionMenu = require('$UI/system/admin/lib/functionMenu/functionMenu')
	var funcArray = [ {
		"title" : "用戶管理",
		"url" : "$UI/system/admin/user/user.w",
		children : [ {
			"title" : "数据维护",
			"url" : "$UI/system/admin/dataObjectsBM/index.w"
		}, {
			"title" : "群组授权",
			"url" : "$UI/system/admin/roleBM/roleGroupBM.w",
			children : [ {
				"title" : "数据授权",
				"url" : "$UI/system/admin/permissionBM/permissionManage.w"
			} ]
		} ]
	}, {
		"title" : "数据维护",
		"url" : "$UI/system/admin/dataObjectsBM/index.w"
	}, {
		"title" : "数据授权",
		"url" : "$UI/system/admin/permissionBM/permissionManage.w"
	}, {
		"title" : "群组授权",
		"url" : "$UI/system/admin/roleBM/roleGroupBM.w"
	} ]

	var id = justep.UUID.createUUID()
	var arr = []
	return {
		createFunctionTree : function(context) {
			// return this.eachFuncs(this.appCfg)
			/*
			 * return { rows : [ { id : id, label : "用戶管理", code :
			 * "$UI/system/admin/user/user.w:get", parent : {}, isFolder : true,
			 * rows : [ { id : id + 2, "label" : "功能树授权", "code" :
			 * "$UI/system/admin/FunctionTreeBM/functionTree.w:get", parent :
			 * id, isFolder : false }, { id : id + 3, "label" : "服务授权", "code" :
			 * "$UI/system/admin/serviceBM/serviceBM.w:get", parent : id,
			 * isFolder : false } ] }, { id : id + 1, "label" : "数据维护", "code" :
			 * "$UI/system/admin/dataObjectsBM/index.w:get", isFolder : false,
			 * parent : {} }, ] }
			 */
			var deferred = $.Deferred()
			var self = this
			functionMenu.getFunctionMenu(context).done(function(funMenuList){
				var newArray = funMenuList.map(function(item) {
					return Object.assign({}, item, {
						parent : {},
						path : item.title
					})
				})
				self.eachFuncs(newArray)
				deferred.resolve(newArray)
			})
			return deferred.promise()
		},
		eachFuncs : function(funcs) {
			var self = this
			for (var i = 0; i < funcs.length; i++) {
				var id = justep.UUID.createUUID()
				var obj = {
					id : id,
					label : funcs[i].title,
					code : funcs[i].url + ':get',
					isFolder : false
				}
				if (funcs[i].children) {
					Object.assign(funcs[i], obj, {
						isFolder : true,
					})
					funcs[i]['rows'] = funcs[i].children.map(function(item) {
						return Object.assign(item, {
							parent : obj.id,
							path : funcs[i].path + '/' + item.title
						})
					})
					var funcsChild = funcs[i].children;
					//delete funcs[i].children;
					self.eachFuncs(funcsChild)
				} else {
					Object.assign(funcs[i], obj, {
						rows : []
					})
				}
			}
		}
	}
})