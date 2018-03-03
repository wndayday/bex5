define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/textarea/textarea');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/formDisable'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cfaYre2';
	this._flag_='bca89fa3b679ce3e83d1a66f08e43bd4';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"family":{"define":"family","label":"名族：","name":"family","relation":"family","type":"String"}},"directDelete":false,"events":{},"idColumn":"family","initData":"[{\"family\":\"汉族\"},{\"family\":\"回族\"},{\"family\":\"彝族\"},{\"family\":\"维吾尔族\"},{\"family\":\"哈尼族\"}]","limit":20,"xid":"familyData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"address":{"define":"address","label":"常住地址：","name":"address","relation":"address","type":"String"},"family":{"define":"family","label":"名族：","name":"family","relation":"family","type":"String"},"password":{"define":"password","label":"密码：","name":"password","relation":"password","type":"String"},"userName":{"define":"userName","label":"用户名：","name":"userName","relation":"userName","type":"String"}},"directDelete":false,"events":{},"idColumn":"userName","initData":"[{\"userName\":\"张三\",\"password\":\"123\",\"family\":\"回族\",\"address\":\"北京\"}]","limit":20,"xid":"userData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});