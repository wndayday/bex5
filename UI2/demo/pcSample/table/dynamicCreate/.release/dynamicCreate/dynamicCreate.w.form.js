define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/select/radioGroup');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/dataTables/dataTables');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/table/dynamicCreate/dynamicCreate'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cu26Bv2';
	this._flag_='dc7523e9c81bb049113a81e19c309b29';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"tAddress":{"define":"tAddress","label":"地址","name":"tAddress","relation":"tAddress","type":"String"},"tAge":{"define":"tAge","label":"年龄","name":"tAge","relation":"tAge","type":"String"},"tID":{"define":"tID","label":"编号","name":"tID","relation":"tID","type":"String"},"tName":{"define":"tName","label":"姓名","name":"tName","relation":"tName","type":"String"},"tOperation":{"define":"tOperation","label":"操作","name":"tOperation","relation":"tOperation","type":"String"},"tSex":{"define":"tSex","label":"性别","name":"tSex","relation":"tSex","type":"String"}},"directDelete":false,"events":{},"idColumn":"tID","initData":"[{\"tID\":\"1\",\"tName\":\"李四\",\"tSex\":\"女\",\"tAge\":\"20\",\"tAddress\":\"北京市海淀区中关村\",\"tOperation\":\"\"}]","limit":20,"xid":"data"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"address":{"define":"address","label":"地址","name":"address","relation":"address","type":"String"},"age":{"define":"age","label":"年龄","name":"age","relation":"age","type":"String"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"},"phone":{"define":"phone","label":"手机","name":"phone","relation":"phone","type":"String"},"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"张三\",\"sex\":\"男\",\"age\":\"38\",\"phone\":\"18736982573\",\"address\":\"北京海淀中关村\"},{\"name\":\"张小三\",\"sex\":\"男\",\"age\":\"15\",\"phone\":\"13568715996\",\"address\":\"北京海淀牡丹园\"}]","limit":20,"xid":"createTableData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"sType":{"define":"sType","label":"性别","name":"sType","relation":"sType","type":"String"}},"directDelete":false,"events":{},"idColumn":"sType","initData":"[{\"sType\":\"男\"},{\"sType\":\"女\"}]","limit":20,"xid":"sexData"});
}}); 
return __result;});