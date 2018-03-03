/**
 * @database-type 数据库类型 默认 mysql
 * @connect-type 数据源连接方式 默认 jpa
 * @show-sql 是否显示SQL 默认true
 * @ddl-auto 默认 update
 */

define(function(require) {
	return sourceData = {
		data : {
			"baseType" : [ "mysql", "mysql_innodb", "mysql_myisam", "postgresql", "db2", "oracle", "oracle_9i_10g", "sybase", "mssql", "informix", "progress" ],
			"cType" : [ "jpa" ],
			"show_sql" : [ "true", "false" ],
			"ddl_auto" : [ "update", "create", "create-drop", "validate" ]
		},
		loadDatabase : function(keyword) {
			var self = this;
			return new Promise(function(resolve) {
				var keys = Object.keys(self.data);
				keys.forEach(function(item) {
					if (item == keyword) {
						var arr = self.data[item] || [];
						var newArr = [];
						for (var i = 0; i < arr.length; i++) {
							var obj = {};
							obj[keyword] = arr[i]
							newArr.push(obj);
						}
						return resolve(newArr);
					}
				})
			})
		}
	}
})