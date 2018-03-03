define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/tabs/tabs');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/formSplit'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='c7Bviqm';
	this._flag_='d0e53fe9112db52ab25b18c2be6d212e';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"address":{"define":"address","label":"用户地址：","name":"address","relation":"address","type":"String"},"email":{"define":"email","label":"用户邮箱：","name":"email","relation":"email","type":"String"},"name":{"define":"name","label":"用户姓名：","name":"name","relation":"name","type":"String"},"pwd":{"define":"pwd","label":"用户密码：","name":"pwd","relation":"pwd","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"张三\",\"pwd\":\"111\",\"email\":\"123@ee.com\",\"address\":\" 北京\"}]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"check":{"define":"check","label":"是否愿意留下邮箱：","name":"check","relation":"check","type":"String"},"email":{"define":"email","label":"邮箱：","name":"email","relation":"email","type":"String"},"name":{"define":"name","label":"用户名：","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{}]","limit":20,"xid":"uData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"num":{"define":"num","label":"数字","name":"num","relation":"num","type":"String"}},"directDelete":false,"events":{},"idColumn":"num","initData":"[{}]","limit":20,"xid":"numData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"emp":{"define":"emp","label":"员工：","name":"emp","relation":"emp","type":"String"}},"directDelete":false,"events":{},"idColumn":"emp","initData":"[{\"emp\":\"员工1\"},{\"emp\":\"员工2\"},{\"emp\":\"员工3\"},{\"emp\":\"员工4\"}]","limit":20,"xid":"empData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"emp":{"define":"emp","label":"你选择的员工是：","name":"emp","relation":"emp","type":"String"}},"directDelete":false,"events":{},"idColumn":"emp","limit":20,"xid":"addData"});
}}); 
return __result;});