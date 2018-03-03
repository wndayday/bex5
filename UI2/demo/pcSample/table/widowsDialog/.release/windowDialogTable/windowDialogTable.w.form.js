define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/windowReceiver/windowReceiver');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/dataTables/dataTables');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/table/widowsDialog/windowDialogTable'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cme6RNb';
	this._flag_='f905e1351bd604380188d307a82b2328';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"tAddress":{"define":"tAddress","label":"地址","name":"tAddress","relation":"tAddress","type":"String"},"tAge":{"define":"tAge","label":"年龄","name":"tAge","relation":"tAge","rules":{"number":true},"type":"Float"},"tID":{"define":"tID","label":"ID","name":"tID","relation":"tID","type":"String"},"tJob":{"define":"tJob","label":"职业","name":"tJob","relation":"tJob","type":"String"},"tName":{"define":"tName","label":"姓名","name":"tName","relation":"tName","type":"String"},"tPhone":{"define":"tPhone","label":"手机","name":"tPhone","relation":"tPhone","type":"String"},"tRemark":{"define":"tRemark","label":"备注","name":"tRemark","relation":"tRemark","type":"String"},"tSex":{"define":"tSex","label":"性别","name":"tSex","relation":"tSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"tID","initData":"[{\"tID\":\"1\",\"tName\":\"张小三\",\"tSex\":\"男\",\"tAge\":21,\"tJob\":\"Java开发工程师\",\"tPhone\":\"18985141393\",\"tAddress\":\"北京市东城区西长安街\",\"tRemark\":\"北京市东城区西长安街天安门广场\"},{\"tID\":\"2\",\"tName\":\"李小四\",\"tSex\":\"女\",\"tAge\":20,\"tJob\":\"平面设计工程师\",\"tPhone\":\"15178897336\",\"tAddress\":\"北京市朝阳区十里河\",\"tRemark\":\"十里河万家灯火欢乐无限,万家灯火欢乐无限\"},{\"tID\":\"3\",\"tName\":\"张三\",\"tSex\":\"男\",\"tAge\":41,\"tJob\":\"中层领导\",\"tPhone\":\"15197620236\",\"tAddress\":\"北京市东城区西长安街\",\"tRemark\":\"北京市东城区西长安街\"},{\"tID\":\"4\",\"tName\":\"王五\",\"tSex\":\"男\",\"tAge\":44,\"tJob\":\"销售总监\",\"tPhone\":\"183698527167\",\"tAddress\":\"上海市浦东新区黄浦江边\",\"tRemark\":\"上海自来水来自海上\"},{\"tID\":\"5\",\"tName\":\"王小五\",\"tSex\":\"男\",\"tAge\":22,\"tJob\":\"销售员\",\"tPhone\":\"13251786736\",\"tAddress\":\"上海市浦东新区黄浦江边\",\"tRemark\":\"上海市浦东新区黄浦江边上海自来水来自海上\"},{\"tID\":\"6\",\"tName\":\"王李马\",\"tSex\":\"男\",\"tAge\":51,\"tJob\":\"老板\",\"tPhone\":\"18888888888\",\"tAddress\":\"北京市东城区西长安街\",\"tRemark\":\"北京市东城区西长安街北京市东城区西长安街北京市东城区西长安街\"},{\"tID\":\"7\",\"tName\":\"李四\",\"tSex\":\"女\",\"tAge\":40,\"tJob\":\"部门经理\",\"tPhone\":\"13517897336\",\"tAddress\":\"北京市朝阳区十里河\",\"tRemark\":\"十里河万家灯火欢乐无限,万家灯火欢乐无限\"},{\"tID\":\"8\",\"tName\":\"小明\",\"tSex\":\"男\",\"tAge\":22,\"tJob\":\"学生\",\"tPhone\":\"183698527167\",\"tAddress\":\"新疆维吾尔族自治区\",\"tRemark\":\"根据给定的ID匹配一个元素。 如果选择器中包含特殊字符，可以用两个斜杠转义。\"},{\"tID\":\"9\",\"tName\":\"晓红\",\"tSex\":\"女\",\"tAge\":18,\"tJob\":\"学生\",\"tPhone\":\"15178897336\",\"tAddress\":\"北京市东城区西长安街\",\"tRemark\":\"。。。。。。。。。。。。。\"},{\"tID\":\"10\",\"tName\":\"小明\",\"tSex\":\"男\",\"tAge\":20,\"tJob\":\"学生\",\"tPhone\":\"13289643725\",\"tAddress\":\"新疆维吾尔族自治区\",\"tRemark\":\"根据给定的ID匹配一个元素。 如果选择器中包含特殊字符，可以用两个斜杠转义。\"}]","limit":20,"xid":"tableData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"sName":{"define":"sName","label":"名称","name":"sName","relation":"sName","type":"String"}},"directDelete":false,"events":{},"idColumn":"sName","initData":"[{\"sName\":\"院系一\"},{\"sName\":\"院系二\"},{\"sName\":\"院系三\"}]","limit":20,"xid":"selectData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});