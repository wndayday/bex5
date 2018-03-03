define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/data/baasData');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/treeGrid'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cAnIVVn';
	this._flag_='8a3686c3438e11091ab573e82aa40126';
	this.callParent(contextUrl);
 var __BaasData__ = require("$UI/system/components/justep/data/baasData");new __BaasData__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"fID","name":"fID","relation":"fID","rules":{"integer":true},"type":"Integer"},"fName":{"define":"fName","label":"fName","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"fParentID","name":"fParentID","relation":"fParentID","rules":{"integer":true},"type":"Integer"},"fPhoneNumber":{"define":"fPhoneNumber","label":"fPhoneNumber","name":"fPhoneNumber","relation":"fPhoneNumber","type":"String"},"fPostCode":{"define":"fPostCode","label":"fPostCode","name":"fPostCode","relation":"fPostCode","type":"String"},"fType":{"define":"fType","label":"fType","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","limit":20,"queryAction":"queryRegionTree","tableName":"takeout_region","treeOption":{"isDelayLoad":true,"parentRelation":"fParentID"},"url":"/justep/demo","xid":"areaData"});
}}); 
return __result;});