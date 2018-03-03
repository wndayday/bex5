/**
 * @serveNames 定义server所有的xml标签名
 * @dataTags 定义data所有的xml标签名
 * @loadModeDataType 加载模型数据类型
 * 			And --- 等价于 SQL 中的 and 关键字，比如 findByUsernameAndPassword(String user, Striang pwd)；
		    Or --- 等价于 SQL 中的 or 关键字，比如 findByUsernameOrAddress(String user, String addr)；
		    Between --- 等价于 SQL 中的 between 关键字，比如 findBySalaryBetween(int max, int min)；
		    LessThan --- 等价于 SQL 中的 "<"，比如 findBySalaryLessThan(int max)；
		    GreaterThan --- 等价于 SQL 中的">"，比如 findBySalaryGreaterThan(int min)；
		    IsNull --- 等价于 SQL 中的 "is null"，比如 findByUsernameIsNull()；
		    IsNotNull --- 等价于 SQL 中的 "is not null"，比如 findByUsernameIsNotNull()；
		    NotNull --- 与 IsNotNull 等价；
		    Like --- 等价于 SQL 中的 "like"，比如 findByUsernameLike(String user)；
		    NotLike --- 等价于 SQL 中的 "not like"，比如 findByUsernameNotLike(String user)；
		    OrderBy --- 等价于 SQL 中的 "order by"，比如 findByUsernameOrderBySalaryAsc(String user)；
		    Not --- 等价于 SQL 中的 "！ ="，比如 findByUsernameNot(String user)；
		    In --- 等价于 SQL 中的 "in"，比如 findByUsernameIn(Collection<String> userList) ，方法的参数可以是 Collection 类型，也可以是数组或者不定长参数；
		    NotIn
 */
define(function(require) {
	return {
		serveTags : {
			action : "action",
			uses : "uses",
			use : "use",
			label : "label",
			descr : "discription",
			reply : "reply",
			http : "http",
			field : "field",
			param : "param",
			exception : {
				exception : "exception",
				circuit : "circuit",
				messageKey : "messageKey",
				messageDetail : "message"
			}
		},
		dataTags : {
			clz : "class",
			prop : "property",
			validator : "validator",
			constraints : "constraints",
			map : "mapping",
			access : "access",
		},
		modeTypes :[ "Byte", "Char", "String", "Short", "Integer", "Long", "Float", "Double", "Decimal", "Boolean", "Date", "Ttime", "DateTime", "Clob", "Blob" ],
		jpaKeyword:["Equal","LessThen","GreaterThen","IsNull","IsNotNull","NotNull","Like","NotLike","Not","Set"],
		jpqConnectWord:["And", "Or"],
		loadModeData : function(arr, colName) {
			var arr = arr || [];
				var newArr = [];
				for (var i = 0; i < arr.length; i++) {
					var obj = {};
					obj[colName] = arr[i];
					newArr.push(obj);
				}
				return newArr;
		},
			
	};
});