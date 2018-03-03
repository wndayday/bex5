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
	//添加大头针
	Model.prototype.addAnnotationClick = function(event){
		navigator.baiduMap.base.addAnnotations([{
			id:1,
			title:"标题",
			subTitle:"子标题",
			lon:116.397,
			lat:39.910,
			draggable:true,
			color:navigator.baiduMap.base.annotationColor.Red
		},{
			id:2,
			title:"标题2",
			subTitle:"子标题2",
			lon:116.387,
			lat:39.910,
			draggable:false,
			color:navigator.baiduMap.base.annotationColor.Purple
		},{
			id:3,
			title:"标题3",
			subTitle:"子标题3",
			lon:116.397,
			lat:39.920,
			draggable:false,
			color:navigator.baiduMap.base.annotationColor.Green
		}], callBack, callBack);
	};
	//移除大头针
	Model.prototype.removeAnnoClick = function(event){
		navigator.baiduMap.base.removeAnnotations([1]);
	};
	//更新大头针的经纬度
	Model.prototype.updateAnnoCoorClick = function(event){
		navigator.baiduMap.base.updateAnnotationCoords({
			id:1,
			lon:116.397,
			lat:39.930,
		});
	};
	//获取大头针的经纬度
	Model.prototype.getAnnoCoorClick = function(event){
		navigator.baiduMap.base.getAnnotationCoords(1, callBack, callBack);
	};
	//判断大头针是否存在
	Model.prototype.isExistClick = function(event){
		navigator.baiduMap.base.annotationExist(1, function(){
			justep.Util.hint("存在");
		}, function(){
			justep.Util.hint("不存在");
		});
	};
	//移除所有的大头针
	Model.prototype.removeAllAnnoClick = function(event){
		navigator.baiduMap.base.removeAllAnno();
	};
	//在地图上添加圆
	Model.prototype.addCircleClick = function(event){
		navigator.baiduMap.base.addCircle({
			id : 14,
			center : {lon:116.397, lat:39.910},
			radius : 6000,
			styles : {borderColor:"#000000", fillColor:"#6495ED", borderWidth:3,alpha:"0.2"}
		});
	};
	//在地图上添加折线
	Model.prototype.addLineClick = function(event){
		navigator.baiduMap.base.addLine({
			id:11,
			points:[{lon:116.357, lat:39.900},{lon:116.357,lat:39.920},{lon:116.389,lat:39.900}],
			styles:{borderColor:"#000000",borderWidth:3}
		});
	};
	//在地图上添加折线
	Model.prototype.addPolygonClick = function(event){
		navigator.baiduMap.base.addPolygon({
			id:12,
			points:[{lon:116.397, lat:39.910},{lon:116.357,lat:39.910},{lon:116.397,lat:39.950}],
			styles:{borderColor:"#000000",fillColor:"#6495ED",borderWidth:3,alpha:"0.2"}
		});
	};
	//在地图上添加弧形
	Model.prototype.addArcClick = function(event){
		navigator.baiduMap.base.addArc({
			id : 13,
			points : [{lon:116.387, lat:39.910},{lon:116.377,lat:39.930},{lon:116.397,lat:39.920}],
			styles : {borderColor:"#0000FF", borderWidth:3}
		});
	};
	//移除地图上的图形 
	Model.prototype.removeOverlayClick = function(event){
		navigator.baiduMap.base.removeOverlay([11,13]);
	};
	
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "addAnnotationClick");
		utils.showCode(this, "removeAnnoClick");
		utils.showCode(this, "updateAnnoCoorClick");
		utils.showCode(this, "getAnnoCoorClick");
		utils.showCode(this, "isExistClick");
		utils.showCode(this, "removeAllAnnoClick");
		utils.showCode(this, "addCircleClick");
		utils.showCode(this, "addLineClick");
		utils.showCode(this, "addPolygonClick");
		utils.showCode(this, "addArcClick");
		utils.showCode(this, "removeOverlayClick");
	};
	
	return Model;
});