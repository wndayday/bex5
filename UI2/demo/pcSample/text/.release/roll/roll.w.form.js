define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/text/roll'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='c7BVNnq';
	this._flag_='bbbd4c4b0f5b523202b5f8aff74a0c53';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"new":{"define":"new","label":"新闻","name":"new","relation":"new","type":"String"}},"directDelete":false,"events":{},"idColumn":"new","initData":"[{\"new\":\"滚动新闻1\"},{\"new\":\"滚动新闻2\"},{\"new\":\"滚动新闻3\"},{\"new\":\"滚动新闻4\"},{\"new\":\"滚动新闻5\"}]","limit":20,"xid":"newData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"customNew":{"define":"customNew","label":"新闻","name":"customNew","relation":"customNew","type":"String"}},"directDelete":false,"events":{},"idColumn":"customNew","initData":"[{\"customNew\":\"滚动新闻1\"},{\"customNew\":\"滚动新闻2\"},{\"customNew\":\"滚动新闻3\"},{\"customNew\":\"滚动新闻4\"},{\"customNew\":\"滚动新闻5\"}]","limit":20,"xid":"customData"});
}}); 
return __result;});