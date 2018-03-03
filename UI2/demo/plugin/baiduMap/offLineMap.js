define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	var callBack = function(info){
		console.log(JSON.stringify(info));
		justep.Util.hint(JSON.stringify(info));
	};
	var offlineMap;
	var cityID;
	var utils = require("$UI/demo/plugin/utils")
	//离线地图初始化
	Model.prototype.offInitClick = function(event){
		offlineMap = navigator.baiduMap.base.offLineMapInit();
	};
	//移除离线地图监听事件
	Model.prototype.removeOfflineListenerClick = function(event){
		offlineMap.removeOfflineListener();
	};
	//添加离线地图监听事件
	Model.prototype.addOfflineListenerClick = function(event){
		offlineMap.addOfflineListener(function(info){
			console.log(JSON.stringify(info));
			justep.Util.hint(JSON.stringify(info));
		});
	};
	//获取热门城市列表
	Model.prototype.getHostClick = function(event){
		offlineMap.getHotCityList(callBack, callBack);
	};
	//获取支持离线下载的城市列表
	Model.prototype.getListClick = function(event){
		offlineMap.getOfflineCityList(function(info){
			cityID = info[0].cityID;
		}, callBack);
	};
	//根据城市名搜索离线地图记录
	Model.prototype.searchOffLineClick = function(event){
		offlineMap.searchCityByName("北京", callBack, callBack);
	};
	//获取某个城市的更新信息
	Model.prototype.getUpdateByIdClick = function(event){
		offlineMap.getUpdateInfo(cityID,callBack,callBack);
	};
	//获取各城市离线地图的更新信息
	Model.prototype.getUpdateInfoClick = function(event){
		offlineMap.getAllUpdateInfo(callBack,callBack);
	};
	//下载指定城市的离线地图
	Model.prototype.downloadClick = function(event){
		offlineMap.downLoad(cityID, callBack);
	};
	//更新指定城市的离线地图
	Model.prototype.updateClick = function(event){
		offlineMap.update(cityID, callBack);
	};
	//暂停下载离线地图
	Model.prototype.pauseClick = function(event){
		offlineMap.pause(cityID);
	};
	//移除已经下载的离线地图
	Model.prototype.removeClick = function(event){
		offlineMap.remove(cityID, callBack);
	};
	
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "offInitClick");
		utils.showCode(this, "removeOfflineListenerClick");
		utils.showCode(this, "addOfflineListenerClick");
		utils.showCode(this, "getHostClick");
		utils.showCode(this, "getListClick");
		utils.showCode(this, "searchOffLineClick");
		utils.showCode(this, "getUpdateByIdClick");
		utils.showCode(this, "getUpdateInfoClick");
		utils.showCode(this, "downloadClick");
		utils.showCode(this, "updateClick");
		utils.showCode(this, "pauseClick");
		utils.showCode(this, "removeClick");
	};

	return Model;
});