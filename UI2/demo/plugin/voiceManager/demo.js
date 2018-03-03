define(function(require){
	var $ = require("jquery");
	require("cordova!com.justep.cordova.plugin.voiceManager");
	var voiceManager = navigator.voiceManager;
	var utils = require("$UI/demo/plugin/utils");
	var base=require("$UI/system/api/native/base")
	var setState=require("$UI/demo/plugin/disabled");
	
	var Model = function(){
		this.callParent();
		this.wx=base.getWx();
	};
	function success(){
		alert("成功");
	}
	function fail(){
		alert("失败");
	}
	//选择听筒模式
	Model.prototype.button1_16Click = function(event){
//		alert(voiceManager.Mode.CALL);
		navigator.voiceManager.setPlayMode(voiceManager.Mode.CALL,success,fail);
	};
	//选择外放模式
	Model.prototype.button2_16Click = function(event){
//		alert(voiceManager.Mode.NORMAL);
		navigator.voiceManager.setPlayMode(voiceManager.Mode.NORMAL,success,fail);
	};
	Model.prototype.modelModelConstructDone = function(event){
		utils.showCode(this, "button1_16Click");
		utils.showCode(this, "button2_16Click");
		utils.prettyPrint();
	};
	Model.prototype.modelLoad = function(event){
		if(this.wx){
			setState.state(".manager-content","a[xid$='_16']");
		}
	};
	return Model;
	
});