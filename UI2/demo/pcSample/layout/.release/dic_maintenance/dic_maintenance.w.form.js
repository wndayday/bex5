define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/pagerBar/pagerBar');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/dic_maintenance'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='c7fyIju';
	this._flag_='512dc88d23346a01e40f2842907ade27';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"   ","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"字典项名称","name":"fName","relation":"fName","type":"String"},"fOrder":{"define":"fOrder","label":"字典项排列顺序","name":"fOrder","relation":"fOrder","type":"String"},"fRemark":{"define":"fRemark","label":"字典项说明","name":"fRemark","relation":"fRemark","type":"String"},"fValue":{"define":"fValue","label":"字典项值","name":"fValue","relation":"fValue","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"dictionaryDataCustomRefresh"},"idColumn":"fID","initData":"[]","limit":2,"xid":"dictionaryData"});
}}); 
return __result;});