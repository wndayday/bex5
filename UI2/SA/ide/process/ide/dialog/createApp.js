define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {

	};
	
	Model.prototype.OKBtnClick = function(event) {
		var path = this.comp("appData").getValue("path");
		if (!path){
			justep.Util.hint("请输入应用名");
			return;
		}
		
		var datasource = this.comp("appData").getValue("datasource");
		if (!datasource){
			justep.Util.hint("请输入数据源");
			return;
		}
		
	
		var options = {};
		options.context = this.getContext();
		options.action = "createAppAction";
		options.directExecute = true;
		options.contentType = biz.Request.JSON_TYPE;
		options.dataType = biz.Request.JSON_TYPE;

		var params = new biz.Request.ActionParam();
		params.setString("path", path);
		params.setString("datasource", datasource);
		options.parameters = params;
		options.directExecute = true;
		var self = this;
		options.callback = function(data) {
			if (data.state) {
				self.comp("wReceiver").windowEnsure({});
			} else {
				data.ignoreError = false;
			}
		};
		biz.Request.sendBizRequest(options);

		
	};

	return Model;
});