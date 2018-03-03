define(function(require){
	var $ = require("jquery");
	require("cordova!cordova-plugin-geolocation");
	var utils = require("$UI/demo/plugin/utils");
	var Model = function(){
		this.callParent();
	};
	function successCallback(data){
        alert("经度:"+data.coords.longitude +"\n"
                +"纬度:"+data.coords.latitude +"\n"
                +"坐标系:"+data.coorType
                );
	};
	function errorCallback(result){
		alert("错误信息："+result);
	};	
	Model.prototype.getCurrentPositionClick = function(event){
		//支持的坐标系有三种gcj02(国测局坐标系)，bd09ll(百度坐标系)，wgs84(gps坐标系)。如果需要获取指定坐标系的坐标，第三个参数要写null，第三个参数是iOS的参数，android无效，但是要占位
		navigator.geolocation.getCurrentPosition(successCallback,errorCallback,null,"bd09ll");
	};
	Model.prototype.transformClick = function(event){
		//支持的坐标系有三种gcj02(国测局坐标系)，bd09ll(百度坐标系)，wgs84(gps坐标系)。参数含义：1 成功回调 2 失败回调 3 经度 4 纬度 5 转换之前的坐标系 6 转换后的坐标系
		navigator.geolocation.transform(successCallback,errorCallback,116.46885440894705,39.8710936894705,"bd09ll","wgs84");
	};
	Model.prototype.modelModelConstructDone = function(event) {
		utils.showCode(this,"getCurrentPositionClick").showCode("transformClick").prettyPrint();
	};
	return Model;
});