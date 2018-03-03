define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/textarea/textarea');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/customStyle'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cnErq2m';
	this._flag_='f00df93a9b2fbf5f76a2a4f6acbde4b8';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"account":{"define":"account","label":"可购买账户","name":"account","relation":"account","type":"String"},"deadline":{"define":"deadline","label":"理财期限","name":"deadline","relation":"deadline","type":"String"},"id":{"define":"id","label":"ID","name":"id","relation":"id","type":"String"},"income":{"define":"income","label":"年收益","name":"income","relation":"income","type":"String"},"money":{"define":"money","label":"起购金额","name":"money","relation":"money","type":"String"},"operate":{"define":"operate","label":"操作","name":"operate","relation":"operate","type":"String"},"productName":{"define":"productName","label":"产品名称","name":"productName","relation":"productName","type":"String"},"subscriptionPeriod":{"define":"subscriptionPeriod","label":"认购期","name":"subscriptionPeriod","relation":"subscriptionPeriod","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"productDataCustomRefresh"},"idColumn":"id","limit":20,"xid":"productData"});
}}); 
return __result;});