window.__justep.__ResourceEngine.loadCss([{url: '/v_773ed7ef3e784901ace128e500315bb4l_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_8aef4eddf797476987e38cac0f35ff5el_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_3db1b900119b4c098531b4360f30c4e9l_zh_CNs_desktopd_pc/system/core.min.js','/v_6c9d082bf4e74a25a6533dd059f067d4l_zh_CNs_desktopd_pc/system/common.min.js','/v_ac0399261b5a4163a784b4efe44e1936l_zh_CNs_desktopd_pc/system/components/comp.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/filterConditionThree'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cmeUz6n';
	this._flag_='2b8c7ee0d64f8cb73ea919739a9d77d9';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"amount":{"define":"amount","label":"起购金额","name":"amount","relation":"amount","type":"String"},"deadline":{"define":"deadline","label":"认购期限","name":"deadline","relation":"deadline","type":"String"},"earnings":{"define":"earnings","label":"年收益","name":"earnings","relation":"earnings","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"financialperiod":{"define":"financialperiod","label":"理财期限","name":"financialperiod","relation":"financialperiod","type":"String"},"productType":{"define":"productType","label":"产品类型","name":"productType","relation":"productType","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"true\",\"deadline\":\"全部\",\"productType\":\"全部\",\"amount\":\"全部\",\"financialperiod\":\"全部\",\"earnings\":\"全部 \"},{\"fID\":\"true\",\"deadline\":\"在售\",\"productType\":\"定期\",\"amount\":\"5千以下(不含)\",\"financialperiod\":\"1个月以下(不含)\",\"earnings\":\"3%以下(不含)\"},{\"fID\":\"true\",\"deadline\":\"预售\",\"productType\":\"活期\",\"amount\":\"5千到5万(不含)\",\"financialperiod\":\"1-6个月(不含)\",\"earnings\":\" 3%-5%(不含)\"},{\"fID\":\"true\",\"deadline\":\"已停售\",\"productType\":\"通知存款\",\"amount\":\"5万以上\",\"financialperiod\":\"6个月-1年(不含)\",\"earnings\":\" 5%及以上\"},{\"fID\":\"true\",\"productType\":\"理财产品\",\"financialperiod\":\"1-5年\"},{\"fID\":\"true\",\"productType\":\"无抵押贷款\",\"financialperiod\":\"不定期\"}]","limit":20,"xid":"deadlineData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"checked":{"define":"checked","label":"选中","name":"checked","relation":"checked","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","limit":20,"xid":"checkData"});
}}); 
return __result;});
