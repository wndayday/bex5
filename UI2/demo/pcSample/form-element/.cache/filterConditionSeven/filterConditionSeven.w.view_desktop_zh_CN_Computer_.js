window.__justep.__ResourceEngine.loadCss([{url: '/v_ff5ecd338990457382c332327c5cba38l_zh_CNs_desktopd_pc/system/components/bootstrap.min.css', include: '$model/system/components/bootstrap/lib/css/bootstrap,$model/system/components/bootstrap/lib/css/bootstrap-theme'},{url: '/v_d5ab41f859e4476cb3549eea01870798l_zh_CNs_desktopd_pc/system/components/comp.min.css', include: '$model/system/components/justep/lib/css2/dataControl,$model/system/components/justep/input/css/datePickerPC,$model/system/components/justep/messageDialog/css/messageDialog,$model/system/components/justep/lib/css3/round,$model/system/components/justep/input/css/datePicker,$model/system/components/justep/row/css/row,$model/system/components/justep/attachment/css/attachment,$model/system/components/justep/barcode/css/barcodeImage,$model/system/components/bootstrap/dropdown/css/dropdown,$model/system/components/justep/dataTables/css/dataTables,$model/system/components/justep/contents/css/contents,$model/system/components/justep/common/css/forms,$model/system/components/justep/locker/css/locker,$model/system/components/justep/menu/css/menu,$model/system/components/justep/scrollView/css/scrollView,$model/system/components/justep/loadingBar/loadingBar,$model/system/components/justep/dialog/css/dialog,$model/system/components/justep/bar/css/bar,$model/system/components/justep/popMenu/css/popMenu,$model/system/components/justep/lib/css/icons,$model/system/components/justep/lib/css4/e-commerce,$model/system/components/justep/toolBar/css/toolBar,$model/system/components/justep/popOver/css/popOver,$model/system/components/justep/panel/css/panel,$model/system/components/bootstrap/carousel/css/carousel,$model/system/components/justep/wing/css/wing,$model/system/components/bootstrap/scrollSpy/css/scrollSpy,$model/system/components/justep/titleBar/css/titleBar,$model/system/components/justep/lib/css1/linear,$model/system/components/justep/numberSelect/css/numberList,$model/system/components/justep/list/css/list,$model/system/components/justep/dataTables/css/dataTables'}]);window.__justep.__ResourceEngine.loadJs(['/v_a6f96c96d9604d53b868b6c5d7b164c6l_zh_CNs_desktopd_pc/system/core.min.js','/v_a764de56da90431b8114cd84442e8b4bl_zh_CNs_desktopd_pc/system/common.min.js','/v_dd2b1bf11de9419b92863c0a136c1c37l_zh_CNs_desktopd_pc/system/components/comp.min.js']);define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/titleBar/titleBar');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/filterConditionSeven'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cbQbuqu';
	this._flag_='81104deef6ed56a4f049fb6bee8b589b';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"age":{"define":"age","label":"年龄","name":"age","relation":"age","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"property":{"define":"property","label":"属性","name":"property","relation":"property","type":"String"},"type":{"define":"type","label":"类型","name":"type","relation":"type","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"type\":\"全部\",\"property\":\"正片\",\"age\":\"全部\"},{\"type\":\"战斗\",\"property\":\"连载\",\"age\":\"6岁以下\"},{\"type\":\"热血\",\"property\":\"完结\",\"age\":\"6-12岁\"},{\"type\":\"冒险励志\",\"property\":\"短片\",\"age\":\"12-18岁\"},{\"type\":\" 英雄\",\"age\":\"18岁以上\"},{\"type\":\" 后宫 \"},{\"type\":\"耽美\"},{\"type\":\" 魔法\"},{\"type\":\" 奇幻\"},{\"type\":\" 搞笑\"},{\"type\":\" 恋爱\"},{\"type\":\" 校园 \"},{\"type\":\"宠物\"},{\"type\":\" 日常 \"},{\"type\":\"童话\"},{\"type\":\" 惊悚\"},{\"type\":\"竞技\"},{\"type\":\"都市\"},{\"type\":\"动作\"},{\"type\":\"科幻\"}]","limit":20,"xid":"data"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":false,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"num":{"define":"num","label":"数字","name":"num","relation":"num","type":"String"},"text":{"define":"text","label":"内容","name":"text","relation":"text","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"num\":\"1\"}]","limit":20,"xid":"numData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"checked":{"define":"checked","label":"选中项","name":"checked","relation":"checked","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","limit":20,"xid":"checkedData"});
}}); 
return __result;});
