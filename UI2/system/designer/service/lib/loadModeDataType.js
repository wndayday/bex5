define(function(require) {
	var modeTypes = [ "BYTE", "CHAR", "STRING", "SHORT", "INTEGER", "LONG", "FLOAT", "DOUBLE", "DECIMAL", "BOOLEAN", "DATE", "TIME", "DATETIME", "CLOB", "BLOB" ];

	return function loadModeTypes(colName) {
		var arr = this.modeTypes;
		var newArr = [];
		new Promise(function(resolve) {
			var obj = {};
			for (var i = 0; i < arr.length; i++) {
				obj[colName] = arr[i];
			}
			return resolve(newArr.push(obj));
		})
	}
})