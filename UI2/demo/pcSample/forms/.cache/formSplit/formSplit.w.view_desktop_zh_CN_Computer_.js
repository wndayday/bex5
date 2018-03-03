window.__justep.__ResourceEngine.loadCss([{url: '/v_d09d1648047d4e3fb8e225895079325bl_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_e38243409651460f98819850cc456879l_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_dd8a17d8cf984036816bccf1da51be79l_zh_CNs_desktopd_pc/system/components/comp2.min.js','/v_89f8ec7f282747a59ef9e1644e237cc4l_zh_CNs_desktopd_pc/system/core.min.js','/v_14815c4b8aad4225ab8c072f2c34f0ael_zh_CNs_desktopd_pc/system/common.min.js','/v_fb14b33278144b28ac224345cb6e649al_zh_CNs_desktopd_pc/system/components/comp.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/tabs/tabs');
require('$model/UI2/system/components/justep/panel/child');
require('$model/UI2/system/components/justep/windowDialog/windowDialog');
require('$model/UI2/system/components/justep/messageDialog/messageDialog');
require('$model/UI2/system/components/justep/panel/panel');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
require('$model/UI2/system/components/justep/button/buttonGroup');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/formSplit'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='c7Bviqm';
	this._flag_='d0e53fe9112db52ab25b18c2be6d212e';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"address":{"define":"address","label":"用户地址：","name":"address","relation":"address","type":"String"},"email":{"define":"email","label":"用户邮箱：","name":"email","relation":"email","type":"String"},"name":{"define":"name","label":"用户姓名：","name":"name","relation":"name","type":"String"},"pwd":{"define":"pwd","label":"用户密码：","name":"pwd","relation":"pwd","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{\"name\":\"张三\",\"pwd\":\"111\",\"email\":\"123@ee.com\",\"address\":\" 北京\"}]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"check":{"define":"check","label":"是否愿意留下邮箱：","name":"check","relation":"check","type":"String"},"email":{"define":"email","label":"邮箱：","name":"email","relation":"email","type":"String"},"name":{"define":"name","label":"用户名：","name":"name","relation":"name","type":"String"}},"directDelete":false,"events":{},"idColumn":"name","initData":"[{}]","limit":20,"xid":"uData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"num":{"define":"num","label":"数字","name":"num","relation":"num","type":"String"}},"directDelete":false,"events":{},"idColumn":"num","initData":"[{}]","limit":20,"xid":"numData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"emp":{"define":"emp","label":"员工：","name":"emp","relation":"emp","type":"String"}},"directDelete":false,"events":{},"idColumn":"emp","initData":"[{\"emp\":\"员工1\"},{\"emp\":\"员工2\"},{\"emp\":\"员工3\"},{\"emp\":\"员工4\"}]","limit":20,"xid":"empData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"emp":{"define":"emp","label":"你选择的员工是：","name":"emp","relation":"emp","type":"String"}},"directDelete":false,"events":{},"idColumn":"emp","limit":20,"xid":"addData"});
}}); 
return __result;});
