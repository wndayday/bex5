define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/dataSummarization'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cnEjMZf';
	this._flag_='c25a1f1d357b455b8edd7a78635a5e68';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"chinese":{"define":"chinese","label":"语文","name":"chinese","relation":"chinese","rules":{"integer":true},"type":"Integer"},"english":{"define":"english","label":"英语","name":"english","relation":"english","rules":{"integer":true},"type":"Integer"},"math":{"define":"math","label":"数学","name":"math","relation":"math","rules":{"integer":true},"type":"Integer"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"gradeDataCustomRefresh"},"idColumn":"name","limit":20,"xid":"gradeData"});
}}); 
return __result;});