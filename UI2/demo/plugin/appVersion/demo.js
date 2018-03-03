define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base")
	require("cordova!cordova-plugin-app-version");
	var utils = require("$UI/demo/plugin/utils");
	var setState=require("$UI/demo/plugin/disabled");
	var Model = function(){
		this.callParent();
		this.callBack();
		this.wx=base.getWx();
	};
	//回调方法
	Model.prototype.callBack = function(){
		this.success = function (result) {
			justep.Util.hint(result);
		};
		this.error = function () {
			justep.Util.hint("获取失败");
		};
	};
	//获取APP的名字
	Model.prototype.nameBtnClick = function(event){
		cordova.getAppVersion.getAppName(this.success,this.error);
	};
	//获取APP的包名
	Model.prototype.budleIDBtnClick = function(event){
		cordova.getAppVersion.getPackageName(this.success,this.error);
	};
	//获取APP的发布版本号
	Model.prototype.appNumberClick = function(event){
		cordova.getAppVersion.getVersionNumber(this.success,this.error);
	};
	//获取APP内部版本号标识
	Model.prototype.appCodeClick = function(event){
		cordova.getAppVersion.getVersionCode(this.success,this.error);
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "callBack");
		utils.showCode(this, "nameBtnClick");
		utils.showCode(this, "budleIDBtnClick");
		utils.showCode(this, "appNumberClick");
		utils.showCode(this, "appCodeClick");
		utils.prettyPrint();
	};
	Model.prototype.modelLoad = function(event){
		if(this.wx){
			setState.state(".version-content",".a-version");
		}
	};
	return Model;
});