define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/pagerBar/pagerBar');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/user_manage'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cMB32Un';
	this._flag_='988730cb0b1118363a56ef211dc32ea3';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"组织机构","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"父","name":"fParentID","relation":"fParentID","type":"String"},"fType":{"define":"fType","label":"类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"menuDataCustomRefresh"},"idColumn":"fID","limit":3,"treeOption":{"isDelayLoad":false,"parentRelation":"fParentID"},"xid":"menuData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fDept":{"define":"fDept","label":"部门","name":"fDept","relation":"fDept","type":"String"},"fEducation":{"define":"fEducation","label":"学历","name":"fEducation","relation":"fEducation","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"姓名","name":"fName","relation":"fName","type":"String"},"fSex":{"define":"fSex","label":"性别","name":"fSex","relation":"fSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"001\",\"fName\":\"员工1\",\"fSex\":\"男\",\"fDept\":\"部门1\",\"fEducation\":\"大专\"},{\"fID\":\"002\",\"fName\":\"员工2\",\"fSex\":\"女\",\"fDept\":\"部门1\",\"fEducation\":\"大专\"},{\"fID\":\"003\",\"fName\":\"员工3\",\"fSex\":\"男\",\"fDept\":\"部门1\",\"fEducation\":\"大专\"},{\"fID\":\"004\",\"fName\":\"员工4\",\"fSex\":\"女\",\"fDept\":\"部门1\",\"fEducation\":\"本科\"},{\"fID\":\"005\",\"fName\":\"员工5\",\"fSex\":\"男\",\"fDept\":\"部门1\",\"fEducation\":\"本科\"},{\"fID\":\"006\",\"fName\":\"员工6\",\"fSex\":\"男\",\"fDept\":\"部门2\",\"fEducation\":\"本科\"},{\"fID\":\"007\",\"fName\":\"员工7\",\"fSex\":\"男\",\"fDept\":\"部门2\",\"fEducation\":\"本科\"},{\"fID\":\"008\",\"fName\":\"员工8\",\"fSex\":\"女\",\"fDept\":\"部门2\",\"fEducation\":\"本科\"}]","limit":20,"xid":"userData"});
}}); 
return __result;});