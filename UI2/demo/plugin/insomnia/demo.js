define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("cordova!cordova-plugin-insomnia");
	var utils = require("$UI/demo/plugin/utils");
	var base=require("$UI/system/api/native/base");
	var setState=require("$UI/demo/plugin/disabled");
	var Model = function(){
		this.callParent();
		this.wx=base.getWx();
	};
	//保持屏幕常亮
	Model.prototype.button1_3Click = function(event){
		plugins.insomnia.keepAwake(function(){
			justep.Util.hint("设置常亮成功");
		}, function(){
			justep.Util.hint("设置失败");
		});
	};
	
	//允许息屏
	Model.prototype.button2_4Click = function(event){
		plugins.insomnia.allowSleepAgain(function(){
			justep.Util.hint("设置成功");
		}, function(){
			justep.Util.hint("设置失败");
		});
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "button1_3Click");
		utils.showCode(this, "button2_4Click");
		utils.prettyPrint();
	};
	Model.prototype.modelLoad = function(event){
		if(this.wx){
			setState.state(".insomnia-content","a[xid^='button']");
		}
	};
	return Model;
});