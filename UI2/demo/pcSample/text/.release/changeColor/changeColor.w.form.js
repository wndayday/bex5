define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/text/changeColor'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='caqqUZr';
	this._flag_='c53582ded62fd7c6eddb4c0488de0296';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"colorID":{"define":"colorID","label":"颜色","name":"colorID","relation":"colorID","type":"String"}},"directDelete":false,"events":{},"idColumn":"colorID","initData":"[{\"colorID\":\"0\"}]","limit":20,"xid":"colorData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"age":{"define":"age","label":"年龄","name":"age","relation":"age","type":"String"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"},"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"张三\",\"sex\":\"男\",\"age\":\"22\"},{\"name\":\"张三\",\"sex\":\"男\",\"age\":\"22\"},{\"name\":\"张三\",\"sex\":\"男\",\"age\":\"22\"},{\"name\":\"张三\",\"sex\":\"男\",\"age\":\"22\"}]","limit":20,"xid":"informationData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"colorID":{"define":"colorID","label":"颜色ID","name":"colorID","relation":"colorID","type":"String"}},"directDelete":false,"events":{},"idColumn":"colorID","initData":"[{\"colorID\":\"0\"}]","limit":20,"xid":"multiLineData"});
}}); 
return __result;});