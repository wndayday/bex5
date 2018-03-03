define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/input/password');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/text-box'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cVNjuEn';
	this._flag_='8277d59dceda4d44d0299fce8a429646';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"dataValue":{"define":"dataValue","label":"设置日期","name":"dataValue","relation":"dataValue","rules":{"date":true},"type":"Date"},"date":{"define":"date","label":"日期","name":"date","relation":"date","type":"String"},"example":{"define":"example","label":"示例","name":"example","relation":"example","type":"String"},"flag":{"define":"flag","label":"判断值","name":"flag","relation":"flag","type":"Boolean"},"init":{"define":"init","label":"初始值","name":"init","relation":"init","type":"String"},"inputpassword":{"define":"inputpassword","label":"输入密码","name":"inputpassword","relation":"inputpassword","type":"String"},"lock":{"define":"lock","label":"大写锁定","name":"lock","relation":"lock","type":"String"},"minDate":{"define":"minDate","label":"日期最小值","name":"minDate","relation":"minDate","rules":{"date":true},"type":"Date"},"name":{"define":"name","label":"姓名:","name":"name","relation":"name","type":"String"},"output":{"define":"output","label":"输出","name":"output","relation":"output","type":"String"},"password":{"define":"password","label":"密码:","name":"password","relation":"password","type":"String"},"strength":{"define":"strength","label":"强度等级","name":"strength","relation":"strength","type":"String"},"text":{"define":"text","label":"提示","name":"text","relation":"text","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"\",\"password\":\"\",\"example\":\"\",\"output\":\"\",\"lock\":\"\",\"strength\":\"\",\"inputpassword\":\"\",\"init\":\"123456\",\"date\":\"\",\"dataValue\":\"2015-02-12\"},{\"strength\":\"222222222222\"}]","limit":20,"xid":"name"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"disabled":{"define":"disabled","label":"禁用","name":"disabled","relation":"disabled","type":"String"}},"directDelete":false,"events":{},"idColumn":"disabled","initData":"[{\"disabled\":\"\"}]","limit":20,"xid":"enableData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"num":{"define":"num","label":"字数","name":"num","relation":"num","type":"String"}},"directDelete":false,"events":{},"idColumn":"num","initData":"[{}]","limit":20,"xid":"numData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"input":{"define":"input","label":"Input","name":"input","relation":"input","type":"String"},"num":{"define":"num","label":"数字","name":"num","relation":"num","type":"String"}},"directDelete":false,"events":{},"idColumn":"num","initData":"[{}]","limit":20,"xid":"data"});
}}); 
return __result;});