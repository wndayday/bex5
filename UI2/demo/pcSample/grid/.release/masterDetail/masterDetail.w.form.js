define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/bootstrap/tabs/tab');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/bootstrap/tabs/tabs');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/masterDetail'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cjIjuAr';
	this._flag_='54d7398b17d40538910fc2df3c83b59f';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fAddress":{"define":"fAddress","label":"住址","name":"fAddress","relation":"fAddress","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"姓名","name":"fName","relation":"fName","type":"String"},"fPhoneNumber":{"define":"fPhoneNumber","label":"电话","name":"fPhoneNumber","relation":"fPhoneNumber","type":"String"},"orderCount":{"define":"orderCount","label":"订单数","name":"orderCount","relation":"orderCount","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"userDataCustomRefresh"},"idColumn":"fID","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fAddress":{"define":"fAddress","label":"住址","name":"fAddress","relation":"fAddress","type":"String"},"fContent":{"define":"fContent","label":"内容","name":"fContent","relation":"fContent","type":"String"},"fCreateTime":{"define":"fCreateTime","label":"创建时间","name":"fCreateTime","relation":"fCreateTime","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fPhoneNumber":{"define":"fPhoneNumber","label":"电话","name":"fPhoneNumber","relation":"fPhoneNumber","type":"String"},"fSum":{"define":"fSum","label":"总数","name":"fSum","relation":"fSum","type":"String"},"fUserID":{"define":"fUserID","label":"用户ID","name":"fUserID","relation":"fUserID","type":"String"},"fUserName":{"define":"fUserName","label":"用户名","name":"fUserName","relation":"fUserName","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"orderDataCustomRefresh"},"idColumn":"fID","limit":20,"master":{"relation":"fUserID","xid":"userData"},"xid":"orderData"});
}}); 
return __result;});