define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!com.justep.cordova.plugin.baiduMapBase");
	require("cordova!com.justep.cordova.plugin.baiduMapSearch");
	var ShellImpl = require('$UI/system/lib/portal/shellImpl');
	var Model = function(){
		this.callParent();
		var shellImpl = new ShellImpl(this, {
			"contentsXid" : "pages",
			"pageMappings" : {
				"main" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/main.w')
				},
				"baseMap" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/baseMap.w')
				},
				"location" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/location.w')
				},
				"annotation" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/annotation.w')
				},
				"route" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/route.w')
				},
				"viewShow" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/viewShow.w')
				},
				"utils" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/utils.w')
				},
				"offLineMap" : {
					url : require.toUrl('$UI/demo/plugin/baiduMap/offLineMap.w')
				},
			}
		});
	};

	Model.prototype.modelLoad = function(event){
		justep.Shell.showPage("main");
	};

	return Model;
});