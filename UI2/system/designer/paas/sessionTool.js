define(function(require) {
	var session = {
		check : function(success, fail) {
			var paasURL = sessionStorage.getItem('paasURL');
			var sessionId = sessionStorage.getItem('sessionId');
			$.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/designer/paas/authenticat.j?paasURL=' + paasURL + '&sessionId=' + sessionId),
				success : function(result) {
					if (result && result.success === 'true') {
						success && success(result);
					} else {
						result && result.msg && fail && fail(result.msg)
					}
				},
				error : function(xhr, status, err) {
					fail && fail(err)
				}
			});
		}
	};

	return session;
});