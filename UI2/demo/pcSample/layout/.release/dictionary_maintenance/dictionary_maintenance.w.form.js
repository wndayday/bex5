define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/pagerBar/pagerBar');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/dictionary_maintenance'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cABfANz';
	this._flag_='f0f1010e0662a40c1c909ce37698054e';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fDescribe":{"define":"fDescribe","label":"字典描述","name":"fDescribe","relation":"fDescribe","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"字典名称","name":"fName","relation":"fName","type":"String"},"fType":{"define":"fType","label":"字典类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"dictionaryDataCustomRefresh"},"idColumn":"fID","initData":"[]","limit":20,"xid":"dictionaryData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"   ","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"字典项名称","name":"fName","relation":"fName","type":"String"},"fOrder":{"define":"fOrder","label":"字典项排列顺序","name":"fOrder","relation":"fOrder","type":"String"},"fRemark":{"define":"fRemark","label":"字典项说明","name":"fRemark","relation":"fRemark","type":"String"},"fValue":{"define":"fValue","label":"字典项值","name":"fValue","relation":"fValue","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"recordDataCustomRefresh"},"idColumn":"fID","initData":"[]","limit":2,"xid":"recordData"});
}}); 
return __result;});