define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/select/checkboxGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/checkBox'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='c673qq2';
	this._flag_='df5cbaaebe1c66f34ba5ab451dda950b';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"custom":{"define":"custom","label":"自定义","name":"custom","relation":"custom","type":"String"},"default":{"define":"default","label":"默认","name":"default","relation":"default","type":"String"},"dynamic":{"define":"dynamic","label":"爱好","name":"dynamic","relation":"dynamic","type":"String"},"enable":{"define":"enable","label":"爱好","name":"enable","relation":"enable","rules":{"readonly":"$model.defaultData.val(\"enable\")"},"type":"String"},"getData":{"define":"getData","label":"爱好","name":"getData","relation":"getData","type":"String"},"hobby":{"define":"hobby","label":"爱好","name":"hobby","relation":"hobby","type":"String"},"interesting":{"define":"interesting","label":"兴趣","name":"interesting","relation":"interesting","type":"String"},"num":{"define":"num","label":"数值","name":"num","relation":"num","type":"Boolean"}},"directDelete":false,"events":{},"idColumn":"hobby","initData":"[{\"hobby\":\"足球\",\"interesting\":\"爬山\",\"default\":\"爬山\",\"enable\":\"足球\",\"getData\":\"足球\",\"dynamic\":\"足球\",\"custom\":\"游泳\"},{\"hobby\":\"篮球\",\"interesting\":\"跑步\",\"default\":\"跑步\",\"enable\":\"篮球\",\"getData\":\"篮球\",\"dynamic\":\"篮球\",\"custom\":\"运动\"},{\"hobby\":\"排球\",\"interesting\":\"听歌\",\"enable\":\"排球\",\"getData\":\"排球\",\"dynamic\":\"排球\",\"custom\":\"健身\"}]","limit":20,"xid":"basicData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"dynamic":{"define":"dynamic","label":"动态","name":"dynamic","relation":"dynamic","type":"String"},"enable":{"define":"enable","label":"返回","name":"enable","relation":"enable","type":"Boolean"},"interesting":{"define":"interesting","label":"兴趣","name":"interesting","relation":"interesting","type":"String"},"value":{"define":"value","label":"值","name":"value","relation":"value","type":"String"}},"directDelete":false,"events":{},"idColumn":"interesting","initData":"[{\"interesting\":\"跑步 爬山\",\"value\":\"\"}]","limit":20,"xid":"defaultData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"create":{"define":"create","label":"创建","name":"create","relation":"create","type":"String"},"hobby":{"define":"hobby","label":"兴趣","name":"hobby","relation":"hobby","type":"String"}},"directDelete":false,"events":{},"idColumn":"create","initData":"[{}]","limit":20,"xid":"createData"});
}}); 
return __result;});