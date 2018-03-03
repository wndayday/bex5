define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!com.justep.cordova.plugin.baiduMapBase");
	require("cordova!com.justep.cordova.plugin.baiduMapSearch");
	var Model = function(){
		this.callParent();
	};
	//打开基础地图页面
	Model.prototype.button1Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/baseMap.w");
	};
	//打开图层展示页面
	Model.prototype.button5Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/viewShow.w");
	};
	//打开覆盖物页面
	Model.prototype.button3Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/annotation.w");
	};
	//打开线路相关页面
	Model.prototype.button4Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/route.w");
	};
	//打开定位相关页面
	Model.prototype.button2Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/location.w");
	};
	//打开计算转换页面
	Model.prototype.button6Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/utils.w");
	};
	//打开离线地图
	Model.prototype.button7Click = function(event){
		justep.Shell.showPage("$UI/demo/plugin/baiduMap/offLineMap.w");
	};

	return Model;
});