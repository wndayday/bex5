define(function(require) {
	return function getCheckedCfg(params) {
			var data = params.data;
			var column = params.column;
			var colVal = params.colVal;
			//var warVal = params.warVal;
			var pushName = params.pushName;
			var rows = data.find([ column ], [ colVal ]);
			if (rows.length == 0) {
				//justep.Util.hint(warVal)
				//return ;
			} else {
				var newArr = [];
				for (var i = 0; i < rows.length; i++) {
					newArr.push(rows[i].val(pushName))
				}
				return newArr;
			}
	}
})