define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/popMenu/popMenu');
require('$model/UI2/system/components/justep/menu/menu');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/doubleSelection'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cy2yy2e';
	this._flag_='515a2bc19fd52958073d3503a2a848bc';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"dept":{"define":"dept","label":"部门","name":"dept","relation":"dept","type":"String"},"enducation":{"define":"enducation","label":"学历","name":"enducation","relation":"enducation","type":"String"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"},"select":{"define":"select","label":"选择","name":"select","relation":"select","type":"String"},"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"leftEmployeeCustomRefresh"},"idColumn":"name","limit":20,"xid":"leftEmployee"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"dept":{"define":"dept","label":"部门","name":"dept","relation":"dept","type":"String"},"enducation":{"define":"enducation","label":"学历","name":"enducation","relation":"enducation","type":"String"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"},"select":{"define":"select","label":"选择","name":"select","relation":"select","type":"String"},"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"rightEmployeeCustomRefresh"},"idColumn":"name","limit":20,"xid":"rightEmployee"});
}}); 
return __result;});