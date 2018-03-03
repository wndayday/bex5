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
	//显示用户当前位置
	Model.prototype.showCurrentClick = function(event){
		navigator.baiduMap.base.showCurrentLocation({
			isShow:true,
			trackingMode:"none"
		});
	};
	//设置跟随模式
	Model.prototype.setFollowClick = function(event){
		navigator.baiduMap.base.showCurrentLocation({
			isShow:true,
			trackingMode:"follow"
		});
	};
	//设置罗盘模式
	Model.prototype.setCompassClick = function(event){
		navigator.baiduMap.base.showCurrentLocation({
			isShow:true,
			trackingMode:"compass"
		});
	};
	//隐藏用户位置
	Model.prototype.hideUserLocationClick = function(event){
		navigator.baiduMap.base.showCurrentLocation({
			isShow:false,
			trackingMode:"compass"
		});
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "showCurrentClick");
		utils.showCode(this, "setFollowClick");
		utils.showCode(this, "setCompassClick");
	};
	
	
	
	return Model;
});