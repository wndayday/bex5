define(function(require) {
	var $ = require("jquery")
	var justep = require("$UI/system/lib/justep");
	var id = justep.UUID.createUUID()
	return {
		rows : [ {
			id : id,
			label : "个人用户",
			code : "",
			path:"个人用户",
			parent : {},
			isFolder : true,
			rows : [ {
				id : id + 2,
				"label" : "查询订单",
				"code" : "service/getOrderBySn:get",
				parent : id,
				path: "个人用户/查询订单",
				isFolder : false,
				rows : []

			}, {
				id : id + 3,
				"label" : "增加订单",
				"code" : "service/addOrderBySn:get:post",
				path:"个人用户/增加订单",
				parent : id,
				isFolder : false,
				rows : []
			} ]
		}, {
			id : id + 1,
			"label" : "人员管理",
			"code" : "",
			path:"人员管理",
			isFolder : true,
			parent : {},
			rows : [ {
				id : id + 5,
				"label" : "查询注册用户",
				"code" : "service/getUserByRegister:get",
				parent : id + 1,
				path:"人员管理/查询注册用户",
				isFolder : false,
				rows : []
			} ]
		}, ]
	}
	/*return function getServiceDataTree() {
		var dfd = $.Deferred()
		$.ajax({
			method : "GET",
			url : "/service/routeings",
			headers : {
				"Content-type" : 'application/json'
			}
			}).then(function(data){
				if($.isArray(data) && data.length){
					dfd.resolve(eachServiceData(data))
				}
			},function(err){
				dfd.reject(err)
			})
		return dfd.promise()
	}

	function eachServiceData(arr) {
		var newArray = []
		$.each(arr, function(i, item) {
			var id = justep.UUID.createUUID()
			var obj = {
				id : id,
				label : '',
				isFloder : false,
				code : item.url + (item.method ? ':' + item.method : ''),
				parent : {},
				rows : []
			}
			if (item.children && $.isArray(item.children)) {
				obj.isFloder = true
				var childArray = []
				$.each(item.children, function(i, child) {
					childArray.push({
						id : id + 1,
						label : '',
						code : child.url + ':' + child.method,
						isFloder : false,
						parent : id,
					})
				})
				obj.rows = childArray
			}
			newArray.push(obj)
		})
		return newArray;
	}*/
})