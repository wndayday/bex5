define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/table/basic/basicsixteen'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cNRnuYb';
	this._flag_='78794d3dfab6982d8a89576e5d4850c4';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"tAddress":{"define":"tAddress","label":"详细地址","name":"tAddress","relation":"tAddress","type":"String"},"tAge":{"define":"tAge","label":"年龄","name":"tAge","relation":"tAge","type":"String"},"tDegree":{"define":"tDegree","label":"学历","name":"tDegree","relation":"tDegree","type":"String"},"tEmail":{"define":"tEmail","label":"邮箱","name":"tEmail","relation":"tEmail","type":"String"},"tJob":{"define":"tJob","label":"职业","name":"tJob","relation":"tJob","type":"String"},"tName":{"define":"tName","label":"姓名","name":"tName","relation":"tName","type":"String"},"tNation":{"define":"tNation","label":"民族","name":"tNation","relation":"tNation","type":"String"},"tNative":{"define":"tNative","label":"籍贯","name":"tNative","relation":"tNative","type":"String"},"tPhone":{"define":"tPhone","label":"手机","name":"tPhone","relation":"tPhone","type":"String"},"tSex":{"define":"tSex","label":"性别","name":"tSex","relation":"tSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"tName","initData":"[{\"tName\":\"张小三\",\"tAge\":\"21\",\"tNative\":\"北京\",\"tSex\":\"男\",\"tNation\":\"汉族\",\"tJob\":\"软件设计师\",\"tDegree\":\"本科\",\"tPhone\":\"18888888888\",\"tEmail\":\"tiananmen@sina.com\",\"tAddress\":\"北京市东城区西长安街天安门广场\"}]","limit":20,"xid":"data"});
}}); 
return __result;});