define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/pagerBar/pagerBar');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
require('$model/UI2/system/components/justep/attachment/attachmentSimple');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/bar/bar');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/table/tableTemplate/tableTemplate'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cRfAf2y';
	this._flag_='d3f53e66c832c31f1cce77db8545d3c9';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"uAge":{"define":"uAge","label":"年龄","name":"uAge","relation":"uAge","rules":{"number":true},"type":"Float"},"uEducation":{"define":"uEducation","label":"学历","name":"uEducation","relation":"uEducation","type":"String"},"uHiredate":{"define":"uHiredate","label":"入职日期","name":"uHiredate","relation":"uHiredate","rules":{"date":true},"type":"Date"},"uName":{"define":"uName","label":"姓名","name":"uName","relation":"uName","type":"String"},"uRemark":{"define":"uRemark","label":"备注","name":"uRemark","relation":"uRemark","type":"String"},"uSex":{"define":"uSex","label":"性别","name":"uSex","relation":"uSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"uName","limit":20,"xid":"popOverdata"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":false,"defCols":{"uAge":{"define":"uAge","label":"年龄","name":"uAge","relation":"uAge","type":"String"},"uEducation":{"define":"uEducation","label":"学历","name":"uEducation","relation":"uEducation","type":"String"},"uHiredate":{"define":"uHiredate","label":"入职日期","name":"uHiredate","relation":"uHiredate","type":"String"},"uId":{"define":"uId","label":"ID","name":"uId","relation":"uId","type":"String"},"uName":{"define":"uName","label":"姓名","name":"uName","relation":"uName","type":"String"},"uPassword":{"define":"uPassword","label":"密码","name":"uPassword","relation":"uPassword","type":"String"},"uRemark":{"define":"uRemark","label":"备注","name":"uRemark","relation":"uRemark","type":"String"},"uSex":{"define":"uSex","label":"性别","name":"uSex","relation":"uSex","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"userDataCustomRefresh"},"idColumn":"uId","initData":"[]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fFile":{"define":"fFile","label":"文件","name":"fFile","relation":"fFile","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"1\",\"fFile\":\"\"}]","limit":20,"xid":"fileData"});
}}); 
return __result;});