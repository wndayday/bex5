define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/filterConditionFive'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cyUjIFz';
	this._flag_='537e5901e6b5484ae96d1a041df800e2';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"amount":{"define":"amount","label":"起购金额","name":"amount","relation":"amount","type":"String"},"deadline":{"define":"deadline","label":"认购期限","name":"deadline","relation":"deadline","type":"String"},"earnings":{"define":"earnings","label":"年收益","name":"earnings","relation":"earnings","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"financialperiod":{"define":"financialperiod","label":"理财期限","name":"financialperiod","relation":"financialperiod","type":"String"},"productType":{"define":"productType","label":"产品类型","name":"productType","relation":"productType","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"true\",\"deadline\":\"全部\",\"productType\":\"全部\",\"amount\":\"全部\",\"financialperiod\":\"全部\",\"earnings\":\"全部 \"},{\"fID\":\"true\",\"deadline\":\"在售\",\"productType\":\"定期\",\"amount\":\"5千以下(不含)\",\"financialperiod\":\"1个月以下(不含)\",\"earnings\":\"3%以下(不含)\"},{\"fID\":\"true\",\"deadline\":\"预售\",\"productType\":\"活期\",\"amount\":\"5千到5万(不含)\",\"financialperiod\":\"1-6个月(不含)\",\"earnings\":\" 3%-5%(不含)\"},{\"fID\":\"true\",\"deadline\":\"已停售\",\"productType\":\"通知存款\",\"amount\":\"5万以上\",\"financialperiod\":\"6个月-1年(不含)\",\"earnings\":\" 5%及以上\"},{\"fID\":\"true\",\"productType\":\"理财产品\",\"financialperiod\":\"1-5年\"},{\"fID\":\"true\",\"productType\":\"无抵押贷款\",\"financialperiod\":\"不定期\"}]","limit":20,"xid":"deadlineData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"checked":{"define":"checked","label":"选中","name":"checked","relation":"checked","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","limit":20,"xid":"checkData"});
}}); 
return __result;});