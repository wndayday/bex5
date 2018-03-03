define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/menu/menu');
require('$model/UI2/system/components/justep/popMenu/popMenu');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/dropdown/dropdown');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/navigator/popupMenu'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cIr2yMj';
	this._flag_='8233a5bf50c0d0ce02c87e98a7e1231c';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"status":{"define":"status","label":"状态","name":"status","relation":"status","type":"String"}},"directDelete":false,"events":{},"idColumn":"status","initData":"[{\"status\":\"0\"}]","limit":20,"xid":"statusData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"status":{"define":"status","label":"状态","name":"status","relation":"status","type":"String"}},"directDelete":false,"events":{},"idColumn":"status","initData":"[{\"status\":\"0\"}]","limit":20,"xid":"contentData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fName":{"define":"fName","label":"内容","name":"fName","relation":"fName","type":"String"}},"directDelete":false,"events":{},"idColumn":"fName","initData":"[{\"fName\":\"北京\"},{\"fName\":\"天津\"},{\"fName\":\"上海\"},{\"fName\":\"重庆\"},{\"fName\":\"河北\"},{\"fName\":\"河南\"},{\"fName\":\"云南\"},{\"fName\":\"辽宁\"},{\"fName\":\"黑龙江\"},{\"fName\":\"湖南\"},{\"fName\":\"安徽\"},{\"fName\":\"山东\"},{\"fName\":\"新疆\"},{\"fName\":\"江苏\"},{\"fName\":\"浙江\"},{\"fName\":\"江西\"},{\"fName\":\"湖北\"},{\"fName\":\"广西\"},{\"fName\":\"甘肃\"},{\"fName\":\"山西\"},{\"fName\":\"内蒙古\"},{\"fName\":\"陕西\"},{\"fName\":\"吉林\"},{\"fName\":\"福建\"},{\"fName\":\"贵州\"},{\"fName\":\"广东\"},{\"fName\":\"青海\"},{\"fName\":\"西藏\"},{\"fName\":\"四川\"},{\"fName\":\"宁夏\"},{\"fName\":\"海南\"},{\"fName\":\"台湾\"},{\"fName\":\"香港\"},{\"fName\":\"澳门\"},{\"fName\":\"钓鱼岛\"}]","limit":20,"xid":"cityData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fName":{"define":"fName","label":"name","name":"fName","relation":"fName","type":"String"}},"directDelete":false,"events":{},"idColumn":"fName","initData":"[{\"fName\":\"-----请选择-------\"},{\"fName\":\"朝阳区\"},{\"fName\":\"海淀区\"},{\"fName\":\"东城区\"},{\"fName\":\"石景山区\"},{\"fName\":\"丰台区\"},{\"fName\":\"宣武区\"},{\"fName\":\"崇文区\"},{\"fName\":\"顺义区\"},{\"fName\":\"怀柔区\"},{\"fName\":\"密云县\"},{\"fName\":\"延庆县\"},{\"fName\":\"昌平区\"},{\"fName\":\"平谷区\"},{\"fName\":\"门沟区\"},{\"fName\":\"房山区\"},{\"fName\":\"通州区\"}]","limit":20,"xid":"areaData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fArea":{"define":"fArea","label":"区域","name":"fArea","relation":"fArea","type":"String"},"fCity":{"define":"fCity","label":"城市","name":"fCity","relation":"fCity","type":"String"},"fStatus":{"define":"fStatus","label":"是否显示","name":"fStatus","relation":"fStatus","type":"String"}},"directDelete":false,"events":{},"idColumn":"fCity","initData":"[{\"fCity\":\"----请选择-----\",\"fArea\":\"\",\"fStatus\":\"0\"}]","limit":20,"xid":"selectData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});