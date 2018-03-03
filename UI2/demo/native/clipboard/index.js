define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var base=require("$UI/system/api/native/base");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!com.verso.cordova.clipboard");

	var Model = function() {
		this.callParent();
		this.wx=base.getWx();
	};

	Model.prototype.modelLoad = function(event){
		if(this.wx){
			justep.Util.hint("本应用暂时只支持android和ios平台");
		}
	};
	Model.prototype.copyClick = function(event) {
		if(this.wx){
			return;
		}else {
			var text = this.comp("data").val("text");
			if (!text) {
				justep.Util.hint("请在复制文本框中输入内容，用于复制");
				return ;
			}
			cordova.plugins.clipboard.copy(text,function(evt){
				justep.Util.hint("复制成功！");
			});
		}
	};

	Model.prototype.pasteClick = function(event) {
		if(this.wx){
			return;
		}else {
		
			var self = this;
			cordova.plugins.clipboard.paste(function(text) {
				self.comp("data").setValue("copyText", text);
				justep.Util.hint("粘贴成功！");
			});
		}
	};


	return Model;
});