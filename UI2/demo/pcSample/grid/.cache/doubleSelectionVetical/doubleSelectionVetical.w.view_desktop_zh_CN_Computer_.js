window.__justep.__ResourceEngine.loadCss([{url: '/v_e896cf82e47d4a96b06b3806b487b297l_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_70bafff4080348c582f0fdefe76167cal_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_8aac5faba38145aaac3d4e54c5a186e1l_zh_CNs_desktopd_pc/system/core.min.js','/v_7e2d94b30e6044f99ed8ecb4e4e57914l_zh_CNs_desktopd_pc/system/common.min.js','/v_29ad7b3da6324bf5935140265c70c2a5l_zh_CNs_desktopd_pc/system/components/comp.min.js','/v_7fade8d7fa3a4043b81de92c06c04083l_zh_CNs_desktopd_pc/system/components/pc.addon.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/popMenu/popMenu');
require('$model/UI2/system/components/justep/menu/menu');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/grid/doubleSelectionVetical'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cNjiI3u';
	this._flag_='83da9970bf8b13694d6344503a6bff5d';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"dept":{"define":"dept","label":"部门","name":"dept","relation":"dept","type":"String"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"},"select":{"define":"select","label":"选择","name":"select","relation":"select","type":"String"},"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"aboveDataCustomRefresh"},"idColumn":"name","limit":20,"xid":"aboveData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"dept":{"define":"dept","label":"部门","name":"dept","relation":"dept","type":"String"},"name":{"define":"name","label":"姓名","name":"name","relation":"name","type":"String"},"select":{"define":"select","label":"选择","name":"select","relation":"select","type":"String"},"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"bottomDataCustomRefresh"},"idColumn":"name","limit":20,"xid":"bottomData"});
}}); 
return __result;});
