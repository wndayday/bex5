define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/text/articleList'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cY3eUZz';
	this._flag_='8cae9debdbff2d8b84d1630709bace8d';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"content":{"define":"content","label":"内容","name":"content","relation":"content","type":"String"}},"directDelete":false,"events":{},"idColumn":"content","initData":"[{\"content\":\"第十三届运动大会即将开始，请大家抓紧时间报名\"},{\"content\":\"部门质量保证文件发布\"},{\"content\":\"请新同事将网站个人信息补充完整\"},{\"content\":\"关于成立技术沙龙通知\"},{\"content\":\"关于组织助理系列活动工作\"}]","limit":20,"xid":"singleRowData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"content":{"define":"content","label":"内容","name":"content","relation":"content","type":"String"}},"directDelete":false,"events":{},"idColumn":"content","limit":20,"xid":"popOverData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"content":{"define":"content","label":"内容","name":"content","relation":"content","type":"String"},"time":{"define":"time","label":"时间","name":"time","relation":"time","type":"String"}},"directDelete":false,"events":{},"idColumn":"content","initData":"[{\"content\":\"第十三届运动大会即将开始，请大家抓紧时间报名\",\"time\":\"2010-09-07\"},{\"content\":\"部门质量保证文件发布\",\"time\":\"2010-09-07\"},{\"content\":\"请新同事将网站个人信息补充完整\",\"time\":\"2010-09-07\"},{\"content\":\"关于成立技术沙龙通知\",\"time\":\"2010-09-07\"},{\"content\":\"关于组织助理系列活动工作\",\"time\":\"2010-09-07\"}]","limit":20,"xid":"doublRowData"});
}}); 
return __result;});