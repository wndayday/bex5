define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/dataTables/dataTables');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/table/basic/basictwo'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='czQNRRj';
	this._flag_='29ad556c9eebe436bc0deaacb2c3455b';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"tAge":{"define":"tAge","label":"年龄 ","name":"tAge","relation":"tAge","rules":{"integer":true},"type":"Integer"},"tID":{"define":"tID","label":"ID","name":"tID","relation":"tID","type":"String"},"tName":{"define":"tName","label":"姓名","name":"tName","relation":"tName","type":"String"},"tSex":{"define":"tSex","label":"性别","name":"tSex","relation":"tSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"tID","initData":"[{\"tID\":\"1\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":21},{\"tID\":\"2\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":22},{\"tID\":\"3\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":23},{\"tID\":\"4\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":24},{\"tID\":\"5\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":25},{\"tID\":\"6\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":26},{\"tID\":\"7\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":27},{\"tID\":\"8\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":28},{\"tID\":\"9\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":29},{\"tID\":\"10\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":20}]","limit":20,"xid":"data"});
}}); 
return __result;});