define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");
	var mode = 2;

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		if (mode == 1) { // 第一个版本
			var process = this.getContext().getProcess();
			var activity = this.getContext().getActivity();
			var bsessionid = this.getContext().getBSessionID();
			var src = require.toUrl("$UI/SA/ide/process/ide/devActivityImpl.w?process=" + process + "&activity=" + activity + "&bsessionid=" + bsessionid);
			this.comp("devDialog").open({
				src : src
			});
		}
	};

	Model.prototype.devDialogClose = function(event) {
		//this.owner.close();
	};

	Model.prototype.appDataCustomRefresh = function(event) {
		var options = {};
		options.context = this.getContext();
		options.action = "queryAppAction";
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
						path : items[i]
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

	Model.prototype.deleteBtnClick = function(event) {
		var appData = this.comp("appData");
		var path = appData.getValue("path");
		if (!path) {
			justep.Util.hint("请选择删除的应用");
			return;
		}
		var self = this;
		justep.Util.confirm("确定要删除应用\"" + path + "\"", function() {
			var options = {};
			options.context = self.getContext();
			options.action = "deleteAppAction";
			options.directExecute = true;
			options.contentType = biz.Request.JSON_TYPE;
			options.dataType = biz.Request.JSON_TYPE;

			var params = new biz.Request.ActionParam();
			params.setString("path", path);
			options.parameters = params;
			options.directExecute = true;
			options.callback = function(data) {
				if (data.state) {
					appData.refreshData();
				} else {
					data.ignoreError = false;
				}
			};
			biz.Request.sendBizRequest(options);

		})

	};

	Model.prototype.newBtnClick = function(event) {
		this.comp("createAppDialog").open();

	};

	Model.prototype.createAppDialogReceive = function(event) {
		var appData = this.comp("appData");
		appData.refreshData();
	};

	Model.prototype.editBtnClick = function(event) {
		var appData = this.comp("appData");
		var path = appData.getValue("path");
		if (!path) {
			justep.Util.hint("请选择要编辑的应用");
			return;
		}
		var process = this.getContext().getProcess();
		var activity = this.getContext().getActivity();
		var bsessionid = this.getContext().getBSessionID();
		var src = require.toUrl("$UI/system/designer/webIde/main/main2.w?process=" + process + "&activity=" + activity + "&bsessionid=" + bsessionid + "&appPath=" + path);
		this.comp("devDialog").open({
			src : src
		});
	};
	return Model;
});