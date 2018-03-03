define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	var utils = require("$UI/demo/plugin/utils")
	var callBack = function(info){
		console.log(JSON.stringify(info));
		justep.Util.hint(JSON.stringify(info));
	};
	Model.prototype.modelInactive = function(event){
		navigator.baiduMap.base.close();
	};
	Model.prototype.demoClick = function(event){
		navigator.baiduMap.base.open({
 	 		"position":{x:0, y:$(window).height()-300-50, w:$(window).width(), h:300},
 	 		"center":{lon:116.397, lat:39.910},
 	 		"zoomLevel":13,	
		}, function(){
			justep.Util.hint("成功");
		}, callBack);
	};
	
	Model.prototype.codeClick = function(event){
		navigator.baiduMap.base.close();
	};
	Model.prototype.modelLoad = function(event){		
		navigator.baiduMap.base.open({
 	 		"position":{x:0, y:$(window).height()-300-50, w:$(window).width(), h:300},
 	 		"center":{lon:116.397, lat:39.910},
 	 		"zoomLevel":13,	
		}, function(){
			justep.Util.hint("成功");
		}, callBack);
	};
	//根据经纬度获取地名
	Model.prototype.getNameByCoorClick = function(event){
		navigator.baiduMap.base.getNameFromLocation({
		lon:116.397,
		lat:39.910,
		mcode:"com.x5.plugin"
		}, callBack, callBack);
	};
	//根据地名获取经纬度
	Model.prototype.getCoorByNameClick = function(event){
		navigator.baiduMap.base.getLocationFromName({
		city:"北京市",
		address:"北京西站",
		mcode:"com.x5.plugin"
		}, callBack, callBack);
	};
	//获取地图上两点间的实际距离
	Model.prototype.getRealDisClick = function(event){
		navigator.baiduMap.base.getDistance({
			start:{lon:106.486654, lat:29.490295},
			end:{lon:107.486654, lat:29.490295}
		}, callBack, callBack);
	};
	//将其他坐标转换为百度坐标
	Model.prototype.transCoorClick = function(event){
		navigator.baiduMap.base.transCoords({
			type:"gps",
			lon:119.20,
			lat:23.5,
			mcode:"com.x5.plugin"
		}, callBack, callBack);
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "getNameByCoorClick");
		utils.showCode(this, "getCoorByNameClick");
		utils.showCode(this, "getRealDisClick");
		utils.showCode(this, "transCoorClick");
	};
	return Model;
});