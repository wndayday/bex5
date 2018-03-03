define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/contentFormatting'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cInAn6b';
	this._flag_='44dbfcf975fe94e46e4ef64ed980c777';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"date":{"define":"date","label":"日期格式化","name":"date","relation":"date","type":"String"},"decimals":{"define":"decimals","label":"小数","name":"decimals","relation":"decimals","type":"String"},"longNumber":{"define":"longNumber","label":"长数字处理","name":"longNumber","relation":"longNumber","type":"String"},"money":{"define":"money","label":"金额格式化","name":"money","relation":"money","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"formattingDataCustomRefresh"},"idColumn":"date","limit":20,"xid":"formattingData"});
}}); 
return __result;});