define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");
	

	var Model = function() {
		this.callParent();
	};

	Model.prototype.refreshBtnClick = function(event) {
		this.comp("appData").refreshData();
	};

	Model.prototype.appDataCustomRefresh = function(event) {
		var options = {};
		options.context = this.getContext();
		options.action = "getAllApps2Action";
		options.directExecute = true;
		options.contentType = biz.Request.JSON_TYPE;
		options.dataType = biz.Request.JSON_TYPE;
		var self = this;
		options.callback = function(data) {
			if (data.state) {
				var items = data.response || [];
				var rows = [];
				for (var i = 0; i < items.length; i++) {
					rows.push({
						appModel : items[i]
					});
				}
				event.source.loadData({
					rows : rows
				}, false);
			} else {
				data.ignoreError = false;
			}
		};
		biz.Request.sendBizRequest(options);
	};

	Model.prototype.initBtnClick = function(event) {
		var appTable = this.comp("appTable");
		if (appTable.getCheckeds().length == 0) {
			justep.Util.hint("请勾选要初始化的应用！");
			return;
		}
		var loadingDialog = this.comp("loadingDialog");
		var context = this.getContext();
		justep.Util.confirm("确实要初始化当前勾选的应用吗？", function() {
			var apps = "";
			var rows = appTable.getCheckeds();
			for (var i = 0; i < rows.length; i++) {
				apps += "," + rows[i].val("appModel");
			}
			var options = {};
			
			options.context = context;
			options.action = "initAppDbAction";
			var params = new biz.Request.ActionParam();
			params.setString("apps", apps);
			options.parameters = params;
			options.directExecute = true;
			options.contentType = biz.Request.JSON_TYPE;
			options.dataType = biz.Request.JSON_TYPE;
			var self = this;
			options.callback = function(data) {
				loadingDialog.close();
				if (data.state) {
					justep.Util.hint("初始化成功！");
				} else {
					data.ignoreError = false;
				}
			};
			loadingDialog.open();
			biz.Request.sendAsyncBizRequest(options);
		});

	};

	return Model;
});