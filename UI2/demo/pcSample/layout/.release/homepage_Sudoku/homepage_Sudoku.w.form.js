define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/homepage_Sudoku'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cvQ7Jf2';
	this._flag_='285b45c156af753d39aeae02c6b6d020';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fImg":{"define":"fImg","label":"图片","name":"fImg","relation":"fImg","type":"String"},"fOptions1":{"define":"fOptions1","label":"功能1","name":"fOptions1","relation":"fOptions1","type":"String"},"fOptions2":{"define":"fOptions2","label":"功能2","name":"fOptions2","relation":"fOptions2","type":"String"},"fOptions3":{"define":"fOptions3","label":"功能3","name":"fOptions3","relation":"fOptions3","type":"String"},"fTitle":{"define":"fTitle","label":"标题","name":"fTitle","relation":"fTitle","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"001\",\"fTitle\":\"个人中心\",\"fImg\":\"1.png\",\"fOptions1\":\"个人基础信息设置\",\"fOptions2\":\"手机短信提醒设置\",\"fOptions3\":\"更改密码\"},{\"fID\":\"002\",\"fTitle\":\"个人收藏夹\",\"fImg\":\"2.png\",\"fOptions1\":\"查看曾经加入到收藏夹中的数据\"},{\"fID\":\"003\",\"fTitle\":\"高级搜索\",\"fImg\":\"3.png\",\"fOptions1\":\"可搜索整个系统的数据\",\"fOptions2\":\"可选择多种过滤条件\"},{\"fID\":\"004\",\"fTitle\":\"文档中心\",\"fImg\":\"4.png\",\"fOptions1\":\"保存了自己的文档附件和别人转发的文档\",\"fOptions2\":\"\",\"fOptions3\":\"\"},{\"fID\":\"005\",\"fTitle\":\"帮助中心\",\"fImg\":\"5.png\",\"fOptions1\":\"系统使用常见问题\",\"fOptions2\":\"用户手册\",\"fOptions3\":\"系统更新日志等\"},{\"fID\":\"006\",\"fTitle\":\"个人存储空间\",\"fImg\":\"6.png\",\"fOptions1\":\"每个用户在系统中有100M的存储空间。在这里可进行管理\"},{\"fID\":\"007\",\"fTitle\":\"附件管理\",\"fImg\":\"7.png\",\"fOptions1\":\"保存了自己上传的附件 可进行下载、删除等操作\"},{\"fID\":\"008\",\"fTitle\":\"通知消息\",\"fImg\":\"8.png\",\"fOptions1\":\"系统发送的消息\",\"fOptions2\":\"其他用户发送的消息\",\"fOptions3\":\"\"},{\"fID\":\"009\",\"fTitle\":\"回收站\",\"fImg\":\"9.png\",\"fOptions1\":\"保存了曾经删除的数据和文档资料等\"}]","limit":20,"xid":"sudokuData"});
}}); 
return __result;});