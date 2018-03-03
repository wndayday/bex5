define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/select/radioGroup');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/formMode'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cfeyma2';
	this._flag_='d52fd4f2440aae814edd956d4e5998d2';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"sex","initData":"[{\"sex\":\"男\"},{\"sex\":\"女\"}]","limit":20,"xid":"SexData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"marriage":{"define":"marriage","label":"婚姻情况","name":"marriage","relation":"marriage","type":"String"}},"directDelete":false,"events":{},"idColumn":"marriage","initData":"[{\"marriage\":\"已婚\"},{\"marriage\":\"未婚\"}]","limit":20,"xid":"marryData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"Jurisdiction":{"define":"Jurisdiction","label":"权限：","name":"Jurisdiction","relation":"Jurisdiction","type":"String"},"code":{"define":"code","label":"邮政编码：","name":"code","relation":"code","type":"String"},"desc":{"define":"desc","label":"备注：","name":"desc","relation":"desc","type":"String"},"edu":{"define":"edu","label":"学历：","name":"edu","relation":"edu","type":"String"},"family":{"define":"family","label":"名族：","name":"family","relation":"family","type":"String"},"org":{"define":"org","label":"籍贯：","name":"org","relation":"org","type":"String"},"tel":{"define":"tel","label":"固定电话：","name":"tel","relation":"tel","type":"String"},"update1":{"define":"update1","label":"上传附件：","name":"update1","relation":"update1","type":"String"},"update2":{"define":"update2","label":"上传文档：","name":"update2","relation":"update2","type":"String"}},"directDelete":false,"events":{},"idColumn":"org","initData":"[{\"org\":\"北京\",\"family\":\"汉族\",\"edu\":\"本科\",\"Jurisdiction\":\"\",\"code\":\"111111\",\"tel\":\"123456\",\"update1\":\"\",\"update2\":\"\",\"desc\":\"\"}]","limit":20,"xid":"userDeTailData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"juri":{"define":"juri","label":"权限","name":"juri","relation":"juri","type":"String"}},"directDelete":false,"events":{},"idColumn":"juri","initData":"[{\"juri\":\"添加\"},{\"juri\":\"删除\"},{\"juri\":\"修改\"},{\"juri\":\"查看\"}]","limit":20,"xid":"juriData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});