define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/list/list');
require('$model/UI2/system/components/bootstrap/row/row');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/form-element/filterConditionOne'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='caUBriq';
	this._flag_='16ad255a163a7d3ea22707fde1551850';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"curSel":{"define":"curSel","label":"选中项","name":"curSel","relation":"curSel","rules":{"calculate":"\"起止时间：\"+ $model.dateData.val(\"startDate\")+\"--\"+ $model.dateData.val(\"endDate\")+\" 交易类型： \"+ $model.tradeTypeData.val(\"tradeType\")+\" 交易状态：\" + $model.datas.val(\"tradeState\")+\" 时间类型：\" + $model.datetypeData.val(\"dateType\")+\" 资金流向：\"+ $model.fundFlowData.val(\"fundFlow\")+\" 金额范围：\" + $model.moneyRangeData.val(\"minMoney\")+\"--\"+ $model.moneyRangeData.val(\"maxMoney\")+\" 关键词： \"+ $model.keywordData.val(\"keyword\")"},"type":"String"},"date":{"define":"date","label":"起止日期","name":"date","relation":"date","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"keyword":{"define":"keyword","label":"关键词","name":"keyword","relation":"keyword","type":"String"},"moneyRange":{"define":"moneyRange","label":"金额范围","name":"moneyRange","relation":"moneyRange","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"1\"},{\"fID\":\"2\"},{\"fID\":\"3\"},{\"fID\":\"4\"},{\"fID\":\"5\"},{\"fID\":\"6\"},{\"fID\":\"7\"},{\"fID\":\"8\"}]","limit":20,"xid":"data"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"tradeState":{"define":"tradeState","label":"交易状态","name":"tradeState","relation":"tradeState","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fID\":\"1\",\"tradeState\":\"全部\"},{\"fID\":\"2\",\"tradeState\":\"进行中\"},{\"fID\":\"3\",\"tradeState\":\"未付款\"},{\"fID\":\"4\",\"tradeState\":\"等待发货\"},{\"fID\":\"5\",\"tradeState\":\"未确认收货\"},{\"fID\":\"6\",\"tradeState\":\"成功\"},{\"fID\":\"7\",\"tradeState\":\"失败\"},{\"fID\":\"8\",\"tradeState\":\"退款\"}]","limit":20,"xid":"datas"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"dateType":{"define":"dateType","label":"时间类型","name":"dateType","relation":"dateType","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"dateType\":\"创建时间\"},{\"dateType\":\"付款时间\"},{\"dateType\":\"收款时间\"}]","limit":20,"xid":"datetypeData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"fundFlow":{"define":"fundFlow","label":"资金流向","name":"fundFlow","relation":"fundFlow","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"fundFlow\":\"全部\"},{\"fundFlow\":\"收入\"},{\"fundFlow\":\"支出\"}]","limit":20,"xid":"fundFlowData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"display":{"define":"display","label":"显示隐藏","name":"display","relation":"display","type":"String"}},"directDelete":false,"events":{},"idColumn":"display","initData":"[{\"display\":\"1\"}]","limit":20,"xid":"displayData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"tradeType":{"define":"tradeType","label":"交易类型","name":"tradeType","relation":"tradeType","type":"String"}},"directDelete":false,"events":{},"idColumn":"tradeType","initData":"[{\"tradeType\":\"全部\"},{\"tradeType\":\"淘宝购物\"},{\"tradeType\":\"收款\"},{\"tradeType\":\"付款\"},{\"tradeType\":\"缴水电煤\"},{\"tradeType\":\"信用卡还款\"},{\"tradeType\":\"转账到银行卡\"},{\"tradeType\":\"理财\"}]","limit":20,"xid":"tradeTypeData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"endDate":{"define":"endDate","label":"结束时间","name":"endDate","relation":"endDate","rules":{"date":true},"type":"Date"},"startDate":{"define":"startDate","label":"开始时间","name":"startDate","relation":"startDate","rules":{"date":true},"type":"Date"}},"directDelete":false,"events":{},"idColumn":"startDate","initData":"[{}]","limit":20,"xid":"dateData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"maxMoney":{"define":"maxMoney","label":"最大金额","name":"maxMoney","relation":"maxMoney","rules":{"number":true},"type":"Float"},"minMoney":{"define":"minMoney","label":"最小金额","name":"minMoney","relation":"minMoney","rules":{"number":true},"type":"Float"}},"directDelete":false,"events":{},"idColumn":"minMoney","initData":"[{\"minMoney\":0,\"maxMoney\":0}]","limit":20,"xid":"moneyRangeData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"keyword":{"define":"keyword","label":"关键词","name":"keyword","relation":"keyword","type":"String"}},"directDelete":false,"events":{},"idColumn":"keyword","initData":"[{\"keyword\":\"\"}]","limit":20,"xid":"keywordData"});
}}); 
return __result;});