define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/fragment/list/listTable');
require('$model/UI2/system/components/bootstrap/table/table');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/table/fatherAndSon/nestedTable'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cbQniY3';
	this._flag_='394470a7de194a8432ab5d3ec9b96bff';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"mAge":{"define":"mAge","label":"年龄","name":"mAge","relation":"mAge","type":"String"},"mID":{"define":"mID","label":"ID","name":"mID","relation":"mID","type":"String"},"mName":{"define":"mName","label":"姓名","name":"mName","relation":"mName","type":"String"},"mRemark":{"define":"mRemark","label":"备注","name":"mRemark","relation":"mRemark","type":"String"},"mSex":{"define":"mSex","label":"性别","name":"mSex","relation":"mSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"mID","initData":"[{\"mID\":\"1\",\"mName\":\"张三\",\"mSex\":\"男\",\"mAge\":\"23\",\"mRemark\":\"大家好，我叫张三，性别男，爱好女，身高180cm，体重180斤，有车有房有存款。\"},{\"mID\":\"2\",\"mName\":\"李四\",\"mSex\":\"女\",\"mAge\":\"19\",\"mRemark\":\"五十六个民族，五十六枝花，五十六个兄弟姐妹是一家，五十六种语言汇成一句话：钱不够花，钱不够花，钱不够花！！！\"},{\"mID\":\"3\",\"mName\":\"小明\",\"mSex\":\"男\",\"mAge\":\"21\",\"mRemark\":\"无所不能的小明是个传说，江湖中一直在流传，小明的传奇故事\"}]","limit":20,"xid":"mainData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"parent":{"define":"parent","label":"parent","name":"parent","relation":"parent","type":"String"},"sOne":{"define":"sOne","label":"课程","name":"sOne","relation":"sOne","type":"String"},"sThree":{"define":"sThree","label":"描述","name":"sThree","relation":"sThree","type":"String"},"sTwo":{"define":"sTwo","label":"成绩","name":"sTwo","relation":"sTwo","type":"String"},"sid":{"define":"sid","label":"ID","name":"sid","relation":"sid","type":"String"}},"directDelete":false,"events":{},"idColumn":"sid","initData":"[{\"sid\":\"1\",\"sOne\":\"语文\",\"sTwo\":\"110\",\"sThree\":\"3+大综合\",\"parent\":\"1\"},{\"sid\":\"2\",\"sOne\":\"数学\",\"sTwo\":\"120\",\"sThree\":\"3+大综合\",\"parent\":\"1\"},{\"sid\":\"3\",\"sOne\":\"英语\",\"sTwo\":\"110\",\"sThree\":\"3+大综合\",\"parent\":\"1\"},{\"sid\":\"4\",\"sOne\":\"综合\",\"sTwo\":\"210\",\"sThree\":\"3+大综合\",\"parent\":\"1\"},{\"sid\":\"5\",\"sOne\":\"语文\",\"sTwo\":\"120\",\"sThree\":\"语数外\",\"parent\":\"2\"},{\"sid\":\"6\",\"sOne\":\"数学\",\"sTwo\":\"105\",\"sThree\":\"语数外\",\"parent\":\"2\"},{\"sid\":\"7\",\"sOne\":\"英语\",\"sTwo\":\"125\",\"sThree\":\"语数外\",\"parent\":\"2\"},{\"sid\":\"8\",\"sOne\":\"语文\",\"sTwo\":\"110\",\"sThree\":\"语文\",\"parent\":\"3\"},{\"sid\":\"9\",\"sOne\":\"数学\",\"sTwo\":\"110\",\"sThree\":\"数学\",\"parent\":\"3\"}]","limit":20,"xid":"secondData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"mAge":{"define":"mAge","label":"年龄","name":"mAge","relation":"mAge","type":"String"},"mID":{"define":"mID","label":"ID","name":"mID","relation":"mID","type":"String"},"mName":{"define":"mName","label":"姓名","name":"mName","relation":"mName","type":"String"},"mRemark":{"define":"mRemark","label":"备注","name":"mRemark","relation":"mRemark","type":"String"},"mSex":{"define":"mSex","label":"性别","name":"mSex","relation":"mSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"mID","initData":"[{\"mID\":\"1\",\"mName\":\"张三\",\"mSex\":\"男\",\"mAge\":\"15\",\"mRemark\":\"张三是何许人也\"},{\"mID\":\"2\",\"mName\":\"李四\",\"mSex\":\"女\",\"mAge\":\"19\",\"mRemark\":\"奋战高考300天\"},{\"mID\":\"3\",\"mName\":\"王二\",\"mSex\":\"男\",\"mAge\":\"8\",\"mRemark\":\"小P孩儿\"}]","limit":20,"xid":"aData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"parent":{"define":"parent","label":"parent","name":"parent","relation":"parent","type":"String"},"sCourse":{"define":"sCourse","label":"课程","name":"sCourse","relation":"sCourse","type":"String"},"sDescribe":{"define":"sDescribe","label":"描述","name":"sDescribe","relation":"sDescribe","type":"String"},"sId":{"define":"sId","label":"ID","name":"sId","relation":"sId","type":"String"},"sScore":{"define":"sScore","label":"成绩","name":"sScore","relation":"sScore","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"bDataCustomRefresh"},"idColumn":"sId","initData":"[]","limit":20,"xid":"bData"});
 var __ListTable__ = require("$UI/system/components/fragment/list/listTable");__ListTable__.dataEventBind(this,'mainData','secondData','parent');
 __ListTable__.dataEventBind(this,'mainData','secondData','parent');
 __ListTable__.dataEventBind(this,'aData','bData','parent');
}}); 
return __result;});