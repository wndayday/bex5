define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/navigator/gridLine'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cnQNria';
	this._flag_='4ba9679953780b6f42e96170eef1f824';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"eighthStatus":{"define":"eighthStatus","label":"第八部分","name":"eighthStatus","relation":"eighthStatus","type":"String"},"eleventhStatus":{"define":"eleventhStatus","label":"第十一部分","name":"eleventhStatus","relation":"eleventhStatus","type":"String"},"fifthStatus":{"define":"fifthStatus","label":"第五部分","name":"fifthStatus","relation":"fifthStatus","type":"String"},"firstStatus":{"define":"firstStatus","label":"第一部分","name":"firstStatus","relation":"firstStatus","type":"String"},"fourthStatus":{"define":"fourthStatus","label":"第四部分","name":"fourthStatus","relation":"fourthStatus","type":"String"},"ninthStatus":{"define":"ninthStatus","label":"第九部分","name":"ninthStatus","relation":"ninthStatus","type":"String"},"secondStatus":{"define":"secondStatus","label":"第二部分","name":"secondStatus","relation":"secondStatus","type":"String"},"seventhStatus":{"define":"seventhStatus","label":"第七部分","name":"seventhStatus","relation":"seventhStatus","type":"String"},"sixthStatus":{"define":"sixthStatus","label":"第六部分","name":"sixthStatus","relation":"sixthStatus","type":"String"},"tenthDivStatus":{"define":"tenthDivStatus","label":"第十部分隐藏的","name":"tenthDivStatus","relation":"tenthDivStatus","type":"String"},"tenthStatus":{"define":"tenthStatus","label":"第十部分","name":"tenthStatus","relation":"tenthStatus","type":"String"},"thirdStatus":{"define":"thirdStatus","label":"第三部分","name":"thirdStatus","relation":"thirdStatus","type":"String"}},"directDelete":false,"events":{},"idColumn":"firstStatus","initData":"[{\"firstStatus\":\"0\",\"secondStatus\":\"1\",\"thirdStatus\":\"0\",\"fourthStatus\":\"1\",\"fifthStatus\":\"0\",\"sixthStatus\":\"1\",\"seventhStatus\":\"0\",\"eighthStatus\":\"1\",\"ninthStatus\":\"1\",\"tenthStatus\":\"1\",\"tenthDivStatus\":\"0\",\"eleventhStatus\":\"0\"}]","limit":20,"xid":"statusData"});
}}); 
return __result;});