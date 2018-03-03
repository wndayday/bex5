define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	var utils = require("$UI/demo/plugin/utils");
	var callBack = function(info){
		console.log(JSON.stringify(info));
		justep.Util.hint(JSON.stringify(info));
	};
	Model.prototype.modelLoad = function(event){
		navigator.baiduMap.base.open({
 	 		"position":{x:0, y:$(window).height()-300-50, w:$(window).width(), h:300},
 	 		"center":{lon:116.397, lat:39.910},
 	 		"zoomLevel":19	
		}, function(){
			justep.Util.hint("成功");
		}, callBack);
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
	//显示交通状况
	Model.prototype.trafficClick = function(event){
		navigator.baiduMap.base.setTraffic(true);
	};
	//显示3D楼块
	Model.prototype.threeClick = function(event){
		
		navigator.baiduMap.base.setOverlook(-40);
		navigator.baiduMap.base.setBuilding(true);
	};
	//显示热力图
	Model.prototype.heatMapClick = function(event){
		navigator.baiduMap.base.setHeatMap(true);
	};
	//还原设置
	Model.prototype.reSetClick = function(event){
		navigator.baiduMap.base.setTraffic(false);
		navigator.baiduMap.base.setBuilding(false);
		navigator.baiduMap.base.setHeatMap(false);
		navigator.baiduMap.base.setMapAttr({
			type:"standard",
			zoomEnable:true,
			scrollEnable:true
		});
		navigator.baiduMap.base.setScaleBar({
			isShow:false,
			position:{x:100,y:0}
		});
	};
	//设置地图属性，是否可拖拽，是否可缩放，显示样式
	Model.prototype.setMapAttrClick = function(event){
		navigator.baiduMap.base.setMapAttr({
			type:"satellite",
			zoomEnable:false,
			scrollEnable:false
		});
	};
	//设置地图的比例尺
	Model.prototype.setScaleBarClick = function(event){
		navigator.baiduMap.base.setScaleBar({
			isShow:true,
			position:{x:100,y:178}
		});
	};
	//放大一级比例尺
	Model.prototype.zoomInClick = function(event){
		navigator.baiduMap.base.zoomIn();
	};
	//缩小一级比例尺
	Model.prototype.zoomOutClick = function(event){
		navigator.baiduMap.base.zoomOut();
	};
	//设置旋转角度
	Model.prototype.setRotationClick = function(event){
		navigator.baiduMap.base.setRotation(90);
	};
	//设置俯视角度
	Model.prototype.setOverlookClick = function(event){
		navigator.baiduMap.base.setOverlook(-30);
	};
	//设置地图中心点的经纬度
	Model.prototype.setCenterClick = function(event){
		navigator.baiduMap.base.setCenter({lon:115.30,lat:38.0});
	};
	//获取地图中心点的经纬度
	Model.prototype.getCenterClick = function(event){
		navigator.baiduMap.base.getCenter(callBack, callBack);
	};
	//设置地图的显示区域
	Model.prototype.setRegionClick = function(event){
		navigator.baiduMap.base.setRegion({
			lonDelta:10,
			latDelta:10,
			center:{lon:116.397, lat:39.910},
			animation:true
		});
	};
	//获取地图的显示区域
	Model.prototype.getRegionClick = function(event){
		navigator.baiduMap.base.getRegion(callBack, callBack);
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "trafficClick");
		utils.showCode(this, "threeClick");
		utils.showCode(this, "heatMapClick");
		utils.showCode(this, "reSetClick");
		utils.showCode(this, "setMapAttrClick");
		utils.showCode(this, "setScaleBarClick");
		utils.showCode(this, "zoomInClick");
		utils.showCode(this, "zoomOutClick");
		utils.showCode(this, "setRotationClick");
		utils.showCode(this, "setOverlookClick");
		utils.showCode(this, "setCenterClick");
		utils.showCode(this, "getCenterClick");
		utils.showCode(this, "setRegionClick");
		utils.showCode(this, "getRegionClick");
	};
	
	return Model;
});