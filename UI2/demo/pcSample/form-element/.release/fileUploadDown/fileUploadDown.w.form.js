define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/attachment/attachmentSimple');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/fileUploadDown'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cIvIz6f';
	this._flag_='d589314949d3f3a82c1c9f7dcd4949c7';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fAttchment":{"define":"fAttchment","label":"上传文件","name":"fAttchment","relation":"fAttchment","type":"String"},"fFileNum":{"define":"fFileNum","label":"上传文件个数","name":"fFileNum","relation":"fFileNum","type":"String"},"fFileSize":{"define":"fFileSize","label":"上传文件大小","name":"fFileSize","relation":"fFileSize","type":"String"},"fFileType":{"define":"fFileType","label":"上传文件类型","name":"fFileType","relation":"fFileType","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"funUpload":{"define":"funUpload","label":"不能下载","name":"funUpload","relation":"funUpload","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"0\"}]","limit":20,"xid":"fileData"});
}}); 
return __result;});