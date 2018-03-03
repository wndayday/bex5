define(function(require){
require('$model/UI2/system/components/justep/model/model');
require('$model/UI2/system/components/bootstrap/form/form');
require('$model/UI2/system/components/justep/loadingBar/loadingBar');
require('$model/UI2/system/components/justep/button/button');
require('$model/UI2/system/components/justep/controlGroup/controlGroup');
require('$model/UI2/system/components/justep/input/input');
require('$model/UI2/system/components/justep/labelEdit/labelEdit');
require('$model/UI2/system/components/justep/textarea/textarea');
require('$model/UI2/system/components/justep/contents/content');
require('$model/UI2/system/components/justep/select/select');
require('$model/UI2/system/components/justep/row/row');
require('$model/UI2/system/components/justep/output/output');
require('$model/UI2/system/components/justep/contents/contents');
require('$model/UI2/system/components/justep/data/data');
require('$model/UI2/system/components/justep/window/window');
var __parent1=require('$model/UI2/system/lib/base/modelBase'); 
var __parent0=require('$model/UI2/demo/pcSample/forms/formLayout'); 
var __result = __parent1._extend(__parent0).extend({
	constructor:function(contextUrl){
	this.__sysParam='true';
	this.__contextUrl=contextUrl;
	this.__id='';
	this.__cid='cZR7Jze';
	this._flag_='f17907b961939ae832eb2bed9c074eb2';
	this.callParent(contextUrl);
 var __Data__ = require("$UI/system/components/justep/data/data");new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"family":{"define":"family","label":"名族：","name":"family","relation":"family","type":"String"}},"directDelete":false,"events":{},"idColumn":"family","initData":"[{\"family\":\"汉族\"},{\"family\":\"回族\"},{\"family\":\"彝族\"},{\"family\":\"维吾尔族\"},{\"family\":\"哈尼族\"}]","limit":20,"xid":"familyData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"userAddress":{"define":"userAddress","label":"地址：","name":"userAddress","relation":"userAddress","type":"String"},"userEdu":{"define":"userEdu","label":"学历：","name":"userEdu","relation":"userEdu","type":"String"},"userEmail":{"define":"userEmail","label":"邮箱：","name":"userEmail","relation":"userEmail","type":"String"},"userFamily":{"define":"userFamily","label":"名族：","name":"userFamily","relation":"userFamily","type":"String"},"userHobby":{"define":"userHobby","label":"爱好：","name":"userHobby","relation":"userHobby","type":"String"},"userJob":{"define":"userJob","label":"职业：","name":"userJob","relation":"userJob","type":"String"},"userName":{"define":"userName","label":"用户名：","name":"userName","relation":"userName","type":"String"},"userPwd":{"define":"userPwd","label":"密码：","name":"userPwd","relation":"userPwd","type":"String"},"userQQ":{"define":"userQQ","label":"QQ：","name":"userQQ","relation":"userQQ","type":"String"},"userTel":{"define":"userTel","label":"电话：","name":"userTel","relation":"userTel","type":"String"}},"directDelete":false,"events":{"onCustomRefresh":"userDataCustomRefresh"},"idColumn":"userName","initData":"[{\"userName\":\"小明\",\"userPwd\":\"123\",\"userFamily\":\"汉族\",\"userTel\":\"1234565\",\"userQQ\":\"54322\",\"userAddress\":\"北京\",\"userEmail\":\"123@.com\",\"userHobby\":\"打球\",\"userJob\":\"软件工程师\",\"userEdu\":\"本科\"}]","limit":20,"xid":"userData"});
 new __Data__(this,{"autoLoad":true,"confirmDelete":true,"confirmRefresh":true,"defCols":{"desc":{"define":"desc","label":"备注：","name":"desc","relation":"desc","type":"String"},"userAddress":{"define":"userAddress","label":"地址：","name":"userAddress","relation":"userAddress","type":"String"},"userEdu":{"define":"userEdu","label":"学历：","name":"userEdu","relation":"userEdu","type":"String"},"userEmail":{"define":"userEmail","label":"邮箱：","name":"userEmail","relation":"userEmail","type":"String"},"userFamily":{"define":"userFamily","label":"名族：","name":"userFamily","relation":"userFamily","type":"String"},"userHobby":{"define":"userHobby","label":"爱好：","name":"userHobby","relation":"userHobby","type":"String"},"userJob":{"define":"userJob","label":"职业：","name":"userJob","relation":"userJob","type":"String"},"userName":{"define":"userName","label":"用户名：","name":"userName","relation":"userName","type":"String"},"userPwd":{"define":"userPwd","label":"密码：","name":"userPwd","relation":"userPwd","type":"String"},"userQQ":{"define":"userQQ","label":"QQ：","name":"userQQ","relation":"userQQ","type":"String"},"userTel":{"define":"userTel","label":"电话：","name":"userTel","relation":"userTel","type":"String"}},"directDelete":false,"events":{},"idColumn":"userName","initData":"[{\"userName\":\"小明\",\"userPwd\":\"123\",\"userFamily\":\"汉族\",\"userTel\":\"1234565\",\"userQQ\":\"54322\",\"userAddress\":\"北京\",\"userEmail\":\"123@.com\",\"userHobby\":\"打球\",\"userJob\":\"软件工程师\",\"userEdu\":\"本科\"}]","limit":20,"xid":"detailData"});
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
 var justep = require('$UI/system/lib/justep');if(!this['__justep__']) this['__justep__'] = {};if(!this['__justep__'].selectOptionsAfterRender)	this['__justep__'].selectOptionsAfterRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._addDefaultOption();	};if(!this['__justep__'].selectOptionsBeforeRender)	this['__justep__'].selectOptionsBeforeRender = function($element) {		var comp = justep.Component.getComponent($element);		if(comp) comp._optionsBeforeRender();	};
}}); 
return __result;});