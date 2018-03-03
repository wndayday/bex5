define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/cross_navigation1'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cBJreyu';
	this._flag_='4155066db5ea85b3a8a30f2f5996a1ff';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fAddress":{"define":"fAddress","label":"地址","name":"fAddress","relation":"fAddress","type":"String"},"fAge":{"define":"fAge","label":"年龄","name":"fAge","relation":"fAge","type":"String"},"fID":{"define":"fID","label":"fID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"姓名","name":"fName","relation":"fName","type":"String"},"fRemark":{"define":"fRemark","label":"备注","name":"fRemark","relation":"fRemark","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"001\",\"fName\":\"张三\",\"fAge\":\"22\",\"fAddress\":\"地址信息\",\"fRemark\":\"备注信息\"},{\"fID\":\"002\",\"fName\":\"张三\",\"fAge\":\"22\",\"fAddress\":\"地址信息\",\"fRemark\":\"备注信息\"},{\"fID\":\"003\",\"fName\":\"张三\",\"fAge\":\"22\",\"fAddress\":\"地址信息\",\"fRemark\":\"备注信息\"},{\"fID\":\"004\",\"fName\":\"张三\",\"fAge\":\"22\",\"fAddress\":\"地址信息\",\"fRemark\":\"备注信息\"},{\"fID\":\"005\",\"fName\":\"张三\",\"fAge\":\"22\",\"fAddress\":\"地址信息\",\"fRemark\":\"备注信息\"}]","limit":20,"xid":"textData"});
}}); 
return __result;});