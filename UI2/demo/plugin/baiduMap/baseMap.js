define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var utils = require("$UI/demo/plugin/utils");
	var Model = function(){
		this.callParent();
	};
	var onClick = function(event,args){
		justep.Util.hint(JSON.stringify(args));
	};
	var ondbClick = function(event,args){
		justep.Util.hint(JSON.stringify(args));
	};
	var onLongPress = function(event,args){
		justep.Util.hint(JSON.stringify(args));
	};
	var onViewChange = function(event,args){
		justep.Util.hint(JSON.stringify(args));
	};
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
 	 		"events":{"click":onClick,"dbClick":ondbClick,"longPress":onLongPress}, 	 		
		}, function(){
			justep.Util.hint("成功");
		}, callBack);
	};
	//移除单击事件
	Model.prototype.removeClickClick = function(event){
		navigator.baiduMap.base.removeEventListener("click");
	};
	//移除双击事件
	Model.prototype.removeDBClickClick = function(event){
		navigator.baiduMap.base.removeEventListener("dbClick");
	};
	//关闭百度地图
	Model.prototype.closeClick = function(event){
		navigator.baiduMap.base.close();
	};
	//打开百度地图
	Model.prototype.openClick = function(event){
		navigator.baiduMap.base.open({
 	 		"position":{x:0, y:$(window).height()-300-50, w:$(window).width(), h:300},
 	 		"center":{lon:116.397, lat:39.910},
 	 		"zoomLevel":13,
 	 		"events":{"click":onClick,"dbClick":ondbClick,"longPress":onLongPress}
		}, function(){
			justep.Util.hint("成功");
		}, callBack);
	};

	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "openClick");
		utils.showCode(this, "closeClick");
		utils.showCode(this, "removeDBClickClick");
		utils.showCode(this, "removeClickClick");
	};

	return Model;
});