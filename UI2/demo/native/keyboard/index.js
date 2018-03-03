define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!cordova-plugin-keyboard");

	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.modelLoad = function(event){
		if(this.wx){
			justep.Util.hint("本应用暂时只支持android和ios平台");
		}
	};

	Model.prototype.showshowkeyboardClick = function(event) {
		if(this.wx){
			return;
		}else {
			window.Keyboard.show();//显示软键盘
		}
	};

	Model.prototype.hiddenkeyboardClick = function(event) {
		if(this.wx){
			return;
		}else {
			window.Keyboard.hide();
		}
	};

	Model.prototype.disShrinkViewClick = function(event){
		if(this.wx){
			return;
		}else {
			window.Keyboard.shrinkView(true);
		}
	};


	return Model;
});