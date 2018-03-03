define(function(require){
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/output/output');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/system/deploy/paas/dataMigration'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cbMBrQb';
	this._flag_='f5c3132c660e6df11bf6dea40c03488d';
	this._wCfg_={};
	this._appCfg_={};
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"isOrNotSync":{"define":"isOrNotSync","name":"isOrNotSync","relation":"isOrNotSync","type":"String"},"label":{"define":"label","name":"label","relation":"label","type":"String"},"name":{"define":"name","name":"name","relation":"name","type":"String"},"path":{"define":"path","name":"path","relation":"path","type":"String"}},"directDelete":false,"events":{},"idColumn":"label","isMain":false,"limit":20,"xid":"tableData"});
}}); 
return __result;});