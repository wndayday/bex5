window.__justep.__ResourceEngine.loadCss([{url: '/v_e9a22dfe3a2b439da933cb7d0eb1adbel_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_3ab827a47c554e98a535fd86a864fce5l_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_1e644a3ec4e6497f8e5f14d080fa2030l_zh_CNs_desktopd_pc/system/components/comp2.min.js','/v_0e50a73642aa4aa99cce07ca026557ael_zh_CNs_desktopd_pc/system/core.min.js','/v_4dc2c4a717bb4230976c7663f661f2fdl_zh_CNs_desktopd_pc/system/common.min.js','/v_4805844e9baa4183876b3d7f10524b4fl_zh_CNs_desktopd_pc/system/components/comp.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/select/radioGroup');
require('$model/UI2/system/components/justep/select/checkboxGroup');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/popOver/popOver');
require('$model/UI2/system/components/justep/button/checkbox');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/button/radio');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/asynchronous'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='ciAZzMv';
	this._flag_='13e4f3efc0ac033c41132b0e194b8ac3';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"Hobby":{"define":"Hobby","label":"爱好：","name":"Hobby","relation":"Hobby","type":"String"},"QQ":{"define":"QQ","label":"QQ：","name":"QQ","relation":"QQ","type":"String"},"address":{"define":"address","label":"IP地址：","name":"address","relation":"address","type":"String"},"age":{"define":"age","label":"年龄：","name":"age","relation":"age","type":"String"},"col12":{"define":"col12","label":"正负小数：","name":"col12","relation":"col12","type":"String"},"col13":{"define":"col13","label":"正负整数与小数:","name":"col13","relation":"col13","type":"String"},"desc":{"define":"desc","label":"文本域：","name":"desc","relation":"desc","type":"String"},"email":{"define":"email","label":"电子邮件：","name":"email","relation":"email","type":"String"},"name":{"define":"name","label":"姓名：","name":"name","relation":"name","type":"String"},"pass":{"define":"pass","label":"密码：","name":"pass","relation":"pass","type":"String"},"postcode":{"define":"postcode","label":"邮政编码:","name":"postcode","relation":"postcode","type":"String"},"sex":{"define":"sex","label":"性别：","name":"sex","relation":"sex","type":"String"},"tel":{"define":"tel","label":"手机号码：","name":"tel","relation":"tel","type":"String"},"truePwd":{"define":"truePwd","label":"确认密码：","name":"truePwd","relation":"truePwd","type":"String"},"uName":{"define":"uName","label":"用户名:","name":"uName","relation":"uName","type":"String"}},"directDelete":false,"events":{},"idColumn":"uName","initData":"[{\"uName\":\"\",\"name\":\"\",\"desc\":\"\"}]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"hobby":{"define":"hobby","label":"爱好","name":"hobby","relation":"hobby","type":"String"}},"directDelete":false,"events":{},"idColumn":"hobby","initData":"[{\"hobby\":\"打羽毛球\"},{\"hobby\":\"打篮球\"},{\"hobby\":\"游泳\"},{\"hobby\":\"轮滑\"}]","limit":20,"xid":"hobbyData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"sex":{"define":"sex","label":"性别","name":"sex","relation":"sex","type":"String"}},"directDelete":false,"events":{},"idColumn":"sex","initData":"[{\"sex\":\"男\"},{\"sex\":\"女\"}]","limit":20,"xid":"sexData"});
}}); 
return __result;});
