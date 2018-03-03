define(function(require){
	var $ = require("jquery");
	require("cordova!cordova-plugin-app-preferences");
	var utils = require("$UI/demo/plugin/utils");
	var base=require("$UI/system/api/native/base");
	var setState=require("$UI/demo/plugin/disabled");
	function keyValue(){}
	var Model = function(){
		this.callParent();
		this.wx=base.getWx();
		if(!this.wx){
			this.preferences=plugins.appPreferences;
		}
		//设备准备好后加载数据变化监听
//		document.addEventListener("deviceready", dataMonitor, false);
	};
	function storeSuccess(result) {
		alert("存储成功，key值为"+keyValue.key+",value值为"+keyValue.value);
	};
	function storeFail(result) {
		alert("存储失败，key值为"+keyValue.key+",value值为"+keyValue.value);
	};
	function fetchSuccess(result) {
		alert("获取数据成功，key值为"+keyValue.key+",value值为"+result);
	};
	function fetchFail(result) {
		alert("获取数据失败，key值为"+keyValue.key+",value值为"+result);
	};
	function removeSuccess(result) {
		alert("删除成功，key值为"+keyValue.key);
	};
	function removeFail(result) {
		alert("删除失败，key值为"+keyValue.key);
	};
     function dataMonitor() {
    	 plugins.appPreferences.watch();
    	 document.addEventListener ('preferencesChanged', function (evt) {
	      // with some platforms can give you details what is changed
	      if (evt.key) {
	          alert("数据变化,数据变化的key值为"+evt.key);     
	      }
	 });
     }
	Model.prototype.storeClick = function(event){
		keyValue.key="key";
		keyValue.value="value";
		this.preferences.store(storeSuccess,storeFail,"key","value");
	};
	Model.prototype.fetchClick = function(event){
		keyValue.key="key";
		this.preferences.fetch(fetchSuccess,fetchFail,"key");	
	};
	Model.prototype.watchClick = function(event){
		alert("建立数据变化的监听!");
		dataMonitor();
	};
	Model.prototype.removeClick = function(event){
		keyValue.key="key";
		this.preferences.remove(removeSuccess,removeFail,"key");
	};
	Model.prototype.clearAllClick = function(event){
		this.preferences.clearAll(function(){alert("数据成功清空!")},function(){alert("数据清空失败!")});
	};
	Model.prototype.modelModelConstructDone = function(event) {
		
			utils.showCode(this,"storeClick").showCode("fetchClick").showCode("watchClick").showCode("removeClick").showCode("clearAllClick").prettyPrint();
	
	};
	Model.prototype.modelLoad = function(event){
		if(this.wx){
			setState.state(".pre-content",".a-data");
		}
	};
	return Model;
});