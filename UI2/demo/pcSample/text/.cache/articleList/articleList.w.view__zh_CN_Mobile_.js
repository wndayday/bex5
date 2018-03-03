window.__justep.__ResourceEngine.loadCss([{url: '/v_5f5134f638404d83b5861e0f125dbcdfl_zh_CNs_d_m/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_73e632c80b304970adbecffc46b9de1cl_zh_CNs_d_m/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_792e90ea3527428e91d7de2bcda05adbl_zh_CNs_d_m/system/core.min.js','/v_84a0522b33994c33a76815378fe56550l_zh_CNs_d_m/system/common.min.js','/v_94e0364abb9146b3a3e32dac42d267dfl_zh_CNs_d_m/system/components/comp.min.js']);define(function(require){
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
