define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	//var util = require("$UI/apps/js/util");

	var Model = function() {
		this.callParent();
	};

//	Model.prototype.postBtnClick = function(event){
//		var form = this.getElementByXid("postForm");
//		var uploadFileName = this.getElementByXid("uploadFileName");
//		var uploadFile = this.getElementByXid("uploadFile");
//		var postResultIframe = this.getElementByXid("postResultIframe");
//		
//		$(uploadFileName).val(window.encodeURI($(uploadFile).val()));
//	
//		// 提交表单
//		$(form).submit();
//	};


	return Model;
});