define(function(require) {
	var sessionTool = require("$UI/system/designer/paas/sessionTool");
	var dataSource = {
		reset : function(param, success, fail) {
			sessionTool.check(function() {
				var reset = $.ajax({
					async : false,
					data : JSON.stringify(param),
					dataType : 'json',
					contentType : 'application/json',
					processData : false,
					type : 'POST',
					url : require.toUrl('$UI/system/designer/db/resetDataSource.j'),
					success : function(result) {
						alert(result);
					},
					error : function(xhr, status, err) {
						alert("err:" + err);
					}
				});
				if (reset && reset.count) {
					success(reset.count)
				} else {
					fail("no resource updated");
				}
			}, function(err) {
				fail(err);
			});
		}
	}
	return dataSource;
});