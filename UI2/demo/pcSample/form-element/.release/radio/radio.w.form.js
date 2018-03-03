define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/select/radioGroup');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/radio'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cFrIry2';
	this._flag_='82fcdf9c5f2e67ca6ec4552d38e28c9f';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"ebable":{"define":"ebable","label":"性别:","name":"ebable","relation":"ebable","rules":{"readonly":"$model.defaultData.val(\"num\")"},"type":"String"},"example":{"define":"example","label":"性别:","name":"example","relation":"example","type":"String"},"sex":{"define":"sex","label":"性别:","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"sex","initData":"[{\"sex\":\"男\",\"example\":\"男\",\"ebable\":\"男\"},{\"sex\":\"女\",\"example\":\"女\",\"ebable\":\"女\"}]","limit":20,"xid":"sexData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"checked":{"define":"checked","label":"选中","name":"checked","relation":"checked","type":"String"},"num":{"define":"num","label":"返回","name":"num","relation":"num","type":"Boolean"},"sex":{"define":"sex","label":"性别:","name":"sex","relation":"sex","type":"String"},"value":{"define":"value","label":"值","name":"value","relation":"value","type":"String"}},"directDelete":false,"events":{},"idColumn":"sex","initData":"[{\"sex\":\"男\",\"value\":\"\"}]","limit":20,"xid":"defaultData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"sex":{"define":"sex","label":"性别:","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"sex","initData":"[{\"sex\":\"\"}]","limit":20,"xid":"dynamicData"});
}}); 
return __result;});