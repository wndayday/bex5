window.__justep.__ResourceEngine.loadCss([{url: '/v_cb875d455c6a4d19ba7f03251b4d68c2l_zh_CNs_desktopd_pc/system/components/pc.addon.min.css', include: '$model/system/components/justep/pagerBar/css/pagerBar,$model/system/components/justep/widgets/css/widgets,$model/system/components/justep/absoluteLayout/css/absoluteLayout,$model/system/components/justep/pagerLimitSelect/css/pagerLimitSelect,$model/system/components/justep/cellLayout/css/cellLayout,$model/system/components/justep/smartContainer/css/smartContainer'},{url: '/v_ecfa227cbe9944048440240ab4978ed4l_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_f25f99ac96a2435fbbe62ceb6d6c6ae9l_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_bd45400142cf4d4ebb4c438657e834aal_zh_CNs_desktopd_pc/system/components/comp2.min.js','/v_1af36bf1e8a7481e95407b2207e265fcl_zh_CNs_desktopd_pc/system/core.min.js','/v_1f2117b110d84d28a3df8a104fef656cl_zh_CNs_desktopd_pc/system/common.min.js','/v_e1ca50d5a04d4e0eb269da5ef8f9dabfl_zh_CNs_desktopd_pc/system/components/comp.min.js','/v_c66344ebf3af4a4c9c08d99af0f8b724l_zh_CNs_desktopd_pc/system/components/pc.addon.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/pagerBar/pagerBar');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/bootstrap/pagination/pagination');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/dataTables/dataTables');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/pagerLimitSelect/pagerLimitSelect');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/dictionary_maintenance'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cABfANz';
	this._flag_='f0f1010e0662a40c1c909ce37698054e';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fDescribe":{"define":"fDescribe","label":"字典描述","name":"fDescribe","relation":"fDescribe","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"字典名称","name":"fName","relation":"fName","type":"String"},"fType":{"define":"fType","label":"字典类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"dictionaryDataCustomRefresh"},"idColumn":"fID","initData":"[]","limit":20,"xid":"dictionaryData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"   ","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"字典项名称","name":"fName","relation":"fName","type":"String"},"fOrder":{"define":"fOrder","label":"字典项排列顺序","name":"fOrder","relation":"fOrder","type":"String"},"fRemark":{"define":"fRemark","label":"字典项说明","name":"fRemark","relation":"fRemark","type":"String"},"fValue":{"define":"fValue","label":"字典项值","name":"fValue","relation":"fValue","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"recordDataCustomRefresh"},"idColumn":"fID","initData":"[]","limit":2,"xid":"recordData"});
}}); 
return __result;});
