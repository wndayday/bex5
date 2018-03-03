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
	//搜索步行线路
	Model.prototype.SearchWalkClick = function(event){
		navigator.baiduMap.search.searchRoute({
			type : "walk",
			mode : "name",
			sCityName:"北京",
			startName:"北京西站",
			eCityName:"北京",
			endName:"北京南站"
		}, callBack, callBack);
	};
	//在地图上显示步行线路
	Model.prototype.drawWalkClick = function(event){
		navigator.baiduMap.search.searchRoute({
			type : "walk",
			mode : "name",
			sCityName:"北京",
			startName:"北京西站",
			eCityName:"北京",
			endName:"北京南站"
		}, function(info){
			navigator.baiduMap.search.drawRoute({
				id:31,
				autoresizing:true,
				type:"walk",
				route:info.routes[0]
			});
		}, callBack);
	};
	//搜索乘车路线
	Model.prototype.searchTransitClick = function(event){
		navigator.baiduMap.search.searchRoute({
			type : "transit",
			policy : navigator.baiduMap.search.routePolicy.ebus_time_first,
			mode : "name",
			sCityName:"北京",
			startName:"北京西站",
			eCityName:"北京",
			endName:"北京南站"
		}, callBack,callBack);
	};
	//在地图上显示乘车路线
	Model.prototype.drawTransitClick = function(event){
		navigator.baiduMap.search.searchRoute({
			type : "transit",
			policy : navigator.baiduMap.search.routePolicy.ebus_time_first,
			mode : "name",
			sCityName:"北京",
			startName:"北京西站",
			eCityName:"北京",
			endName:"北京南站"
		}, function(info){
			navigator.baiduMap.search.drawRoute({
				id:32,
				autoresizing:true,
				type:"transit",
				route:info.routes[0]
			});
		},callBack);
	};
	//搜索驾车路线
	Model.prototype.searchDriveClick = function(event){
		navigator.baiduMap.search.searchRoute({
			type : "drive",
			policy : navigator.baiduMap.search.routePolicy.ecar_time_first,
			mode : "name",
			sCityName:"北京",
			startName:"北京西站",
			eCityName:"北京",
			endName:"北京南站"
		}, callBack, callBack);
	};
	//在地图上显示驾车路线
	Model.prototype.drawDriveClick = function(event){
		navigator.baiduMap.search.searchRoute({
			type : "drive",
			policy : navigator.baiduMap.search.routePolicy.ecar_time_first,
			mode : "name",
			sCityName:"北京",
			startName:"北京西站",
			eCityName:"北京",
			endName:"北京南站"
		}, function(info){
			navigator.baiduMap.search.drawRoute({
				id:33,
				autoresizing:true,
				type:"drive",
				route:info.routes[0]
			});
		}, callBack);
	};
	//搜索公交线路
	Model.prototype.searchBusClick = function(event){
		navigator.baiduMap.search.searchBusRoute({
			city:"北京市",
			line:"300快"
		}, callBack, callBack);
	};
	//在地图上显示公交线路
	Model.prototype.drawBusClick = function(event){
		navigator.baiduMap.search.searchBusRoute({
			city:"北京市",
			line:"300快"
		}, function(info){
			navigator.baiduMap.search.drawBusRoute({
				id:34,
				autoresizing:true,
				busLine:info
			});
		}, callBack);
	};
	//移除地图上的线路图
	Model.prototype.removeRouteClick = function(event){
		navigator.baiduMap.search.removeRoute([31,32,33,34]);
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "SearchWalkClick");
		utils.showCode(this, "drawWalkClick");
		utils.showCode(this, "searchTransitClick");
		utils.showCode(this, "drawTransitClick");
		utils.showCode(this, "searchDriveClick");
		utils.showCode(this, "drawDriveClick");
		utils.showCode(this, "searchBusClick");
		utils.showCode(this, "drawBusClick");
		utils.showCode(this, "removeRouteClick");
	};
	return Model;
});