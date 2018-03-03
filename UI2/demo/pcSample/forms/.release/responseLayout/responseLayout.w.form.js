define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/textarea/textarea');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/responseLayout'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='ceuAfE3';
	this._flag_='95e2a52d2e238f329bee8931b8ebf002';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"Household":{"define":"Household","label":"户口所在地：","name":"Household","relation":"Household","type":"String"},"IDcode":{"define":"IDcode","label":"身份证号码：","name":"IDcode","relation":"IDcode","type":"String"},"age":{"define":"age","label":"年龄：","name":"age","relation":"age","type":"String"},"birthday":{"define":"birthday","label":"出生日期：","name":"birthday","relation":"birthday","type":"String"},"culture":{"define":"culture","label":"文化程度：","name":"culture","relation":"culture","type":"String"},"desc":{"define":"desc","label":"备注：","name":"desc","relation":"desc","type":"String"},"family":{"define":"family","label":"名族：","name":"family","relation":"family","type":"String"},"height":{"define":"height","label":"身高：","name":"height","relation":"height","type":"String"},"live":{"define":"live","label":"现居住地：","name":"live","relation":"live","type":"String"},"marry":{"define":"marry","label":"婚姻状况：","name":"marry","relation":"marry","type":"String"},"name":{"define":"name","label":"姓名：","name":"name","relation":"name","type":"String"},"politics":{"define":"politics","label":"政治面貌：","name":"politics","relation":"politics","type":"String"},"sex":{"define":"sex","label":"性别：","name":"sex","relation":"sex","type":"String"},"uname":{"define":"uname","label":"曾用名：","name":"uname","relation":"uname","type":"String"},"vocation":{"define":"vocation","label":"职业：","name":"vocation","relation":"vocation","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"张三\",\"sex\":\"男\",\"uname\":\"张小三\",\"age\":\"15\",\"height\":\"178\",\"IDcode\":\"1234\",\"birthday\":\"0812\",\"vocation\":\"软件工程师\",\"culture\":\"本科\",\"politics\":\"团员\",\"marry\":\"未婚\",\"family\":\"汉族\",\"Household\":\"北京\",\"live\":\"北京\",\"desc\":\"无备注信息\"}]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"Household":{"define":"Household","label":"户口所在地：","name":"Household","relation":"Household","type":"String"},"IDcode":{"define":"IDcode","label":"身份证号码：","name":"IDcode","relation":"IDcode","type":"String"},"age":{"define":"age","label":"年龄：","name":"age","relation":"age","type":"String"},"birthday":{"define":"birthday","label":"出生日期：","name":"birthday","relation":"birthday","type":"String"},"culture":{"define":"culture","label":"文化程度：","name":"culture","relation":"culture","type":"String"},"desc":{"define":"desc","label":"备注：","name":"desc","relation":"desc","type":"String"},"family":{"define":"family","label":"名族：","name":"family","relation":"family","type":"String"},"height":{"define":"height","label":"身高：","name":"height","relation":"height","type":"String"},"live":{"define":"live","label":"现居住地：","name":"live","relation":"live","type":"String"},"marry":{"define":"marry","label":"婚姻状况：","name":"marry","relation":"marry","type":"String"},"name":{"define":"name","label":"姓名：","name":"name","relation":"name","rules":{"required":{"params":{"expr":"true"}}},"type":"String"},"politics":{"define":"politics","label":"政治面貌：","name":"politics","relation":"politics","type":"String"},"sex":{"define":"sex","label":"性别：","name":"sex","relation":"sex","type":"String"},"uname":{"define":"uname","label":"曾用名：","name":"uname","relation":"uname","type":"String"},"vocation":{"define":"vocation","label":"职业：","name":"vocation","relation":"vocation","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"uDataCustomRefresh","onCustomSave":"uDataCustomSave"},"idColumn":"name","initData":"[{}]","limit":20,"xid":"uData"});
}}); 
return __result;});