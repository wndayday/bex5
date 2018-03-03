define(function(require){
	var $ = require('jquery')
	return {
		getPermissionImgURL:function(kind){
			return require.toUrl("$UI/system/admin/roleBM/images/" +	{0 : "fun", 1 : "data",2:'service'}[kind] + "Permission.gif");
		},
		getRoleImgURL: function(kind) {
			return require.toUrl("$UI/system/admin/roleBM/images/funRole.gif");
		}
	}
})