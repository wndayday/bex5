window.__justep.__ResourceEngine.loadCss([{url: '/v_ef7c03ddb4764ed38e4d3432f0b42251l_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_48ec455d86804188a17751c2a7344f47l_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_426066e137d34942a7bd10c96dfdf9adl_zh_CNs_desktopd_pc/system/core.min.js','/v_8f6c7960d99f40cfb9165921438e3085l_zh_CNs_desktopd_pc/system/common.min.js','/v_fb059de690e6460eb07d960c41b9ccfbl_zh_CNs_desktopd_pc/system/components/comp.min.js','/v_1289102f4beb4730a0aa9f6ea7479599l_zh_CNs_desktopd_pc/system/components/pc.addon.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/grid/grid');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/layout/resource_distribute_role'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cbA7Bne';
	this._flag_='1a034b988db9977aad535689ff28ef59';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"组织机构","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"父","name":"fParentID","relation":"fParentID","type":"String"},"fType":{"define":"fType","label":"类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"roleDataCustomRefresh"},"idColumn":"fID","limit":20,"treeOption":{"isDelayLoad":false,"parentRelation":"fParentID"},"xid":"roleData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fName":{"define":"fName","label":"组织机构","name":"fName","relation":"fName","type":"String"},"fParentID":{"define":"fParentID","label":"父","name":"fParentID","relation":"fParentID","type":"String"},"fType":{"define":"fType","label":"类型","name":"fType","relation":"fType","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"resoureDataCustomRefresh"},"idColumn":"fID","limit":20,"treeOption":{"isDelayLoad":false,"parentRelation":"fParentID"},"xid":"resourceData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"fName":{"define":"fName","label":"资源","name":"fName","relation":"fName","type":"String"}},"directDelete":false,"events":{},"idColumn":"fName","limit":20,"xid":"selectData"});
}}); 
return __result;});
