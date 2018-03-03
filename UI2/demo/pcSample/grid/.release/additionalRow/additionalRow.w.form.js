define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/additionalRow'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cqIzm2q';
	this._flag_='4e3ee063aff68ac122a2c7157ca32739';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"bank":{"define":"bank","label":"银行","name":"bank","relation":"bank","type":"String"},"billingDate":{"define":"billingDate","label":"账单日","name":"billingDate","relation":"billingDate","type":"String"},"cash":{"define":"cash","label":"取现额度","name":"cash","relation":"cash","type":"String"},"creditCard":{"define":"creditCard","label":"信用卡","name":"creditCard","relation":"creditCard","type":"String"},"id":{"define":"id","label":"ID","name":"id","relation":"id","type":"String"},"repaymentDate":{"define":"repaymentDate","label":"还款日","name":"repaymentDate","relation":"repaymentDate","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"bankDataCustomRefresh"},"idColumn":"id","limit":20,"xid":"bankData"});
}}); 
return __result;});