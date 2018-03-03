define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/resource_distribute_role'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cbA7Bne';
	this._flag_='1a034b988db9977aad535689ff28ef59';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"组织机构","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"父","name":"fParentID","relation":"fParentID","type":"String"},"fType":{"define":"fType","label":"类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"roleDataCustomRefresh"},"idColumn":"fID","limit":20,"treeOption":{"isDelayLoad":false,"parentRelation":"fParentID"},"xid":"roleData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"组织机构","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"父","name":"fParentID","relation":"fParentID","type":"String"},"fType":{"define":"fType","label":"类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"resoureDataCustomRefresh"},"idColumn":"fID","limit":20,"treeOption":{"isDelayLoad":false,"parentRelation":"fParentID"},"xid":"resourceData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"fName":{"define":"fName","label":"资源","name":"fName","relation":"fName","type":"String"}},"directDelete":false,"events":{},"idColumn":"fName","limit":20,"xid":"selectData"});
}}); 
return __result;});