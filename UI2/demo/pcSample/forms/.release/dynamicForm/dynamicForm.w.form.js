define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/select/radioGroup');
require('$model/UI2/system/components/justep/select/checkboxGroup');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/dynamicForm'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cfQNJr2';
	this._flag_='0453f6d3085db02e74d562a139d7666e';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":false,"autoNew":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"Hobby":{"define":"Hobby","label":"爱好：","name":"Hobby","relation":"Hobby","type":"String"},"QQ":{"define":"QQ","label":"QQ：","name":"QQ","relation":"QQ","type":"String"},"address":{"define":"address","label":"IP地址：","name":"address","relation":"address","type":"String"},"age":{"define":"age","label":"年龄：","name":"age","relation":"age","type":"String"},"col12":{"define":"col12","label":"正负小数：","name":"col12","relation":"col12","type":"String"},"col13":{"define":"col13","label":"正负整数与小数:","name":"col13","relation":"col13","type":"String"},"desc":{"define":"desc","label":"文本域：","name":"desc","relation":"desc","type":"String"},"email":{"define":"email","label":"电子邮件：","name":"email","relation":"email","type":"String"},"name":{"define":"name","label":"姓名：","name":"name","relation":"name","type":"String"},"pass":{"define":"pass","label":"密码：","name":"pass","relation":"pass","type":"String"},"postcode":{"define":"postcode","label":"邮政编码:","name":"postcode","relation":"postcode","type":"String"},"sex":{"define":"sex","label":"性别：","name":"sex","relation":"sex","type":"String"},"tel":{"define":"tel","label":"手机号码：","name":"tel","relation":"tel","type":"String"},"truePwd":{"define":"truePwd","label":"确认密码：","name":"truePwd","relation":"truePwd","type":"String"},"uName":{"define":"uName","label":"用户名:","name":"uName","relation":"uName","type":"String"}},"directDelete":false,"events":{},"idColumn":"uName","initData":"[{\"uName\":\"admin\",\"name\":\"张三\",\"pass\":\"123\",\"truePwd\":\"123\",\"Hobby\":\"游泳\",\"sex\":\"男\",\"age\":\"23\",\"email\":\"wh@123.com\",\"tel\":\"13565667979\",\"postcode\":\"235423\",\"QQ\":\"34566756\",\"address\":\"192.168.1.1\",\"col12\":\"2.43\",\"col13\":\"435\",\"desc\":\"暂无消息\"},{\"uName\":\"tom\",\"name\":\"汤姆\",\"pass\":\"321\",\"truePwd\":\"321\",\"Hobby\":\"打篮球\",\"sex\":\"男\",\"age\":\"21\",\"email\":\"we@.com\",\"tel\":\"123123213123\",\"postcode\":\"123123\",\"QQ\":\"321321\",\"address\":\"192.168.1.1\",\"col12\":\"2.13\",\"col13\":\"23\",\"desc\":\"备注\"}]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"hobby":{"define":"hobby","label":"爱好","name":"hobby","relation":"hobby","type":"String"}},"directDelete":false,"events":{},"idColumn":"hobby","initData":"[{\"hobby\":\"打羽毛球\"},{\"hobby\":\"打篮球\"},{\"hobby\":\"游泳\"},{\"hobby\":\"轮滑\"}]","limit":20,"xid":"hobbyData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"sex","initData":"[{\"sex\":\"男\"},{\"sex\":\"女\"}]","limit":20,"xid":"sexData"});
}}); 
return __result;});