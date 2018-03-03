define(function(require) {
	return {
		getSource : function(sourceData) {
			var sourceDataArr = [];
			var isBreak = false;
			if (sourceData.count() > 0) {
				var sourceCols = sourceData.getColumnIDs().split(',');
				for (var i = 0; i < sourceCols.length; i++) {
					sourceData.each(function(option) {
						if (!option.row.val(sourceCols[i])) {
							justep.Util.hint("所有内容为必填项，不能有空");
							isBreak = true;
						}
					})
				}
			}
			if (isBreak) {
				return true;
			} else {
				sourceData.each(function(option) {
					sourceDataArr.push({
						sourceName : option.row.val('sourceName'),
						connectType : option.row.val('cType'),
						database : option.row.val('baseType'),
						sourceUrl : option.row.val('url'),
						uName : option.row.val('uName'),
						uPwd : option.row.val('pwd'),
						showSql:option.row.val('show_sql'),
						ddlAuto:option.row.val('ddl_auto')
					});
				})
			}
			return sourceDataArr;
		}

	}
});