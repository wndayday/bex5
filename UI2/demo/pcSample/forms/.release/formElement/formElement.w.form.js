define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/textarea/textarea');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/formElement'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='ciayeEn';
	this._flag_='0cd9212edcd8b1ec421eaab872734243';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"address":{"define":"address","label":"常住地址：","name":"address","relation":"address","type":"String"},"col10":{"define":"col10","label":"密码：","name":"col10","relation":"col10","type":"String"},"col11":{"define":"col11","label":"用户名：","name":"col11","relation":"col11","type":"String"},"col12":{"define":"col12","label":"密码：","name":"col12","relation":"col12","type":"String"},"col13":{"define":"col13","label":"用户名：","name":"col13","relation":"col13","type":"String"},"col14":{"define":"col14","label":"密码：","name":"col14","relation":"col14","type":"String"},"col15":{"define":"col15","label":"用户名：","name":"col15","relation":"col15","type":"String"},"col16":{"define":"col16","label":"密码：","name":"col16","relation":"col16","type":"String"},"col17":{"define":"col17","label":"用户名：","name":"col17","relation":"col17","type":"String"},"col18":{"define":"col18","label":"密码：","name":"col18","relation":"col18","type":"String"},"col19":{"define":"col19","label":"用户名：","name":"col19","relation":"col19","type":"String"},"col20":{"define":"col20","label":"密码：","name":"col20","relation":"col20","type":"String"},"col21":{"define":"col21","label":"用户名：","name":"col21","relation":"col21","type":"String"},"col22":{"define":"col22","label":"密码：","name":"col22","relation":"col22","type":"String"},"col3":{"define":"col3","label":"用户名：","name":"col3","relation":"col3","type":"String"},"col4":{"define":"col4","label":"密码：","name":"col4","relation":"col4","type":"String"},"col5":{"define":"col5","label":"用户名：","name":"col5","relation":"col5","type":"String"},"col6":{"define":"col6","label":"密码：","name":"col6","relation":"col6","type":"String"},"col7":{"define":"col7","label":"用户名：","name":"col7","relation":"col7","type":"String"},"col8":{"define":"col8","label":"密码：","name":"col8","relation":"col8","type":"String"},"col9":{"define":"col9","label":"用户名：","name":"col9","relation":"col9","type":"String"},"name":{"define":"name","label":"用户名：","name":"name","relation":"name","type":"String"},"pass":{"define":"pass","label":"密码：","name":"pass","relation":"pass","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{}]","limit":20,"xid":"userData"});
}}); 
return __result;});