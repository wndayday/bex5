define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/pagerBar/pagerBar');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/role_manage'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cAFRfqm';
	this._flag_='ee64dc11d2362e3bb2e66da458902461';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fDescribe":{"define":"fDescribe","label":"角色描述","name":"fDescribe","relation":"fDescribe","type":"String"},"fHandle":{"define":"fHandle","label":"操作","name":"fHandle","relation":"fHandle","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"角色名称","name":"fName","relation":"fName","type":"String"},"fRelevancy":{"define":"fRelevancy","label":"关联资源","name":"fRelevancy","relation":"fRelevancy","type":"String"},"fType":{"define":"fType","label":"角色分类","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"001\",\"fName\":\"系统管理员\",\"fDescribe\":\"可以管理所有权\",\"fType\":\"超级管理员\",\"fRelevancy\":\"已关联\",\"fHandle\":\"\"},{\"fID\":\"002\",\"fName\":\"角色2\",\"fDescribe\":\"\",\"fType\":\"\",\"fRelevancy\":\"已关联\"},{\"fID\":\"003\",\"fName\":\"角色3\",\"fDescribe\":\"\",\"fType\":\"\",\"fRelevancy\":\"已关联\"},{\"fID\":\"004\",\"fName\":\"角色4\",\"fRelevancy\":\"已关联\"},{\"fID\":\"005\",\"fName\":\"角色5\",\"fRelevancy\":\"已关联\"},{\"fID\":\"006\",\"fName\":\"角色6\",\"fRelevancy\":\"已关联\"},{\"fID\":\"007\",\"fName\":\"角色7\",\"fRelevancy\":\"已关联\"},{\"fID\":\"008\",\"fName\":\"角色8\",\"fRelevancy\":\"已关联\"},{\"fID\":\"009\",\"fName\":\"角色9\",\"fRelevancy\":\"已关联\"},{\"fID\":\"010\",\"fName\":\"角色10\",\"fRelevancy\":\"已关联\"}]","limit":20,"xid":"roleData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fDept":{"define":"fDept","label":"部门","name":"fDept","relation":"fDept","type":"String"},"fEducation":{"define":"fEducation","label":"学历","name":"fEducation","relation":"fEducation","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"姓名","name":"fName","relation":"fName","type":"String"},"fSex":{"define":"fSex","label":"性别","name":"fSex","relation":"fSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"001\",\"fName\":\"员工1\",\"fSex\":\"男\",\"fDept\":\"部门1\",\"fEducation\":\"大专\"},{\"fID\":\"002\",\"fName\":\"员工2\",\"fSex\":\"女\",\"fDept\":\"部门1\",\"fEducation\":\"大专\"},{\"fID\":\"003\",\"fName\":\"员工3\",\"fSex\":\"男\",\"fDept\":\"部门1\",\"fEducation\":\"大专\"},{\"fID\":\"004\",\"fName\":\"员工4\",\"fSex\":\"女\",\"fDept\":\"部门1\",\"fEducation\":\"本科\"},{\"fID\":\"005\",\"fName\":\"员工5\",\"fSex\":\"男\",\"fDept\":\"部门1\",\"fEducation\":\"本科\"},{\"fID\":\"006\",\"fName\":\"员工6\",\"fSex\":\"男\",\"fDept\":\"部门2\",\"fEducation\":\"本科\"},{\"fID\":\"007\",\"fName\":\"员工7\",\"fSex\":\"男\",\"fDept\":\"部门2\",\"fEducation\":\"本科\"},{\"fID\":\"008\",\"fName\":\"员工8\",\"fSex\":\"女\",\"fDept\":\"部门2\",\"fEducation\":\"本科\"}]","limit":20,"xid":"userata"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"资源树","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"父","name":"fParentID","relation":"fParentID","type":"String"},"fType":{"define":"fType","label":"类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"resourceDataCustomRefresh"},"idColumn":"fID","limit":20,"treeOption":{"isDelayLoad":false,"parentRelation":"fParentID"},"xid":"resourceData"});
}}); 
return __result;});