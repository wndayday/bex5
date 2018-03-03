window.__justep.__ResourceEngine.loadCss([{url: '/v_b3974bcc182149bab7edf898855e231cl_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_e0030061ae09484e8f3fa8298ff669e7l_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_d6d81ba68dc74f278ec731905c6c01fcl_zh_CNs_desktopd_pc/system/core.min.js','/v_4004b945043b4e859fd8ac28f2e13acel_zh_CNs_desktopd_pc/system/common.min.js','/v_c30fb374ff734afabf602bca5adda72dl_zh_CNs_desktopd_pc/system/components/comp.min.js','/v_947742e97bd7464ca2812f0a35290844l_zh_CNs_desktopd_pc/system/components/pc.addon.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/dataSummarization'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cnEjMZf';
	this._flag_='c25a1f1d357b455b8edd7a78635a5e68';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"chinese":{"define":"chinese","label":"语文","name":"chinese","relation":"chinese","rules":{"integer":true},"type":"Integer"},"english":{"define":"english","label":"英语","name":"english","relation":"english","rules":{"integer":true},"type":"Integer"},"math":{"define":"math","label":"数学","name":"math","relation":"math","rules":{"integer":true},"type":"Integer"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"gradeDataCustomRefresh"},"idColumn":"name","limit":20,"xid":"gradeData"});
}}); 
return __result;});
