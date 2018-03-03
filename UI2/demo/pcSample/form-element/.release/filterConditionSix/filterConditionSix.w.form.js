define(function(require){
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
var __parent0=require('$model/UI2/demo/pcSample/form-element/filterConditionSix'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cNJjUji';
	this._flag_='7c11e89d06c8e3daa0b29ba2f7be242a';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"age":{"define":"age","label":"年龄","name":"age","relation":"age","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"property":{"define":"property","label":"属性","name":"property","relation":"property","type":"String"},"type":{"define":"type","label":"类型","name":"type","relation":"type","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"type\":\"全部\",\"property\":\"正片\",\"age\":\"全部\"},{\"type\":\"战斗\",\"property\":\"连载\",\"age\":\"6岁以下\"},{\"type\":\"热血\",\"property\":\"完结\",\"age\":\"6-12岁\"},{\"type\":\"冒险励志\",\"property\":\"短片\",\"age\":\"12-18岁\"},{\"type\":\" 英雄\",\"age\":\"18岁以上\"},{\"type\":\" 后宫 \"},{\"type\":\"耽美\"},{\"type\":\" 魔法\"},{\"type\":\" 奇幻\"},{\"type\":\" 搞笑\"},{\"type\":\" 恋爱\"},{\"type\":\" 校园 \"},{\"type\":\"宠物\"},{\"type\":\" 日常 \"},{\"type\":\"童话\"},{\"type\":\" 惊悚\"},{\"type\":\"竞技\"},{\"type\":\"都市\"},{\"type\":\"动作\"},{\"type\":\"科幻\"},{\"type\":\"治愈\"},{\"type\":\"教育\"},{\"type\":\"怪物\"},{\"type\":\"成人\"},{\"type\":\"轻松\"},{\"type\":\"神话\"},{\"type\":\"生活\"},{\"type\":\"益智\"},{\"type\":\"机战\"},{\"type\":\"运动\"},{\"type\":\"神魔\"},{\"type\":\"真人\"},{\"type\":\"魔幻\"},{\"type\":\"LOLI\"},{\"type\":\"女性向\"},{\"type\":\"美少女\"},{\"type\":\"男性向\"},{\"type\":\"悬疑推理\"}]","limit":20,"xid":"data"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"},"num":{"define":"num","label":"数字","name":"num","relation":"num","type":"String"},"text":{"define":"text","label":"内容","name":"text","relation":"text","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","initData":"[{\"num\":\"1\"}]","limit":20,"xid":"numData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":false,"confirmRefresh":true,"defCols":{"checked":{"define":"checked","label":"选中项","name":"checked","relation":"checked","type":"String"},"fID":{"define":"fID","label":"ID","name":"fID","relation":"fID","type":"String"}},"directDelete":false,"events":{},"idColumn":"fID","limit":20,"xid":"checkedData"});
}}); 
return __result;});