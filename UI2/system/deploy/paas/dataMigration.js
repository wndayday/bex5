define(function(require) {
	var $ = require("jquery");
	var xpaas = require("$UI/system/deploy/paas/xpaas");
	var justep = require("$UI/system/lib/justep");
	var OperateMfile = require("$UI/system/designer/webIde/quickIde/propPages/common/operateMfile");
	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var DBUtils = require("$UI/system/designer/webIde/quickIde/common/DBUtils");
	var xCloudService = ideService.getXCloudService();

	var Model = function() {
		this.callParent();
		this.isOrNotShow = justep.Bind.observable(false);
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;
		var path = sessionStorage.getItem("appPath");
		this.appPath = path.substring(path.indexOf("/"));
		this.config = JSON.parse(sessionStorage.getItem("config"));
		var self = this;
		var list = OperateMfile.getAllFilesName();
		if (list.length <= 0) {
			this.isOrNotShow.set(true);
		}
		if (xCloudService.exists({
			filePath : "service" + self.appPath + "/init"
		})) {
			var node = xCloudService.getFileTree({
				filePath : "service" + self.appPath + "/init",
				extName : "json"
			});
			if (node.children[0].children.length > 0) {
				var arr = [];
				for (var i = 0; i < node.children[0].children.length; i++) {
					arr.push(node.children[0].children[i].title);
				}

				$.each(list, function(index, value) {
					if (arr.indexOf(value.name + ".json") >= 0) {
						list[index].isOrNotSync = "true";
					}
				})
			}
		}

		this.comp('tableData').loadData({
			"@type" : "table",
			"rows" : list
		});
		this.comp('tableData').first();

	};

	Model.prototype.compareData = function(dtd, successCallback, failCallback) {
		var self = this;
		var tableData = this.comp('tableData');
		// 比较新的数据对象.m文件与原来有无变化
		var url = require.toUrl("$UI/system/deploy/paas/compareDataObject.j");
		$.ajax({
			dataType : 'json',
			type : 'POST',
			url : url,
			async : false,
			data : {
				appPath : self.appPath
			},
			success : function(json) {
				dtd.resolve("true");
				successCallback && successCallback();
				if (json.result.length > 0) {
					String
					confirm = "<h4>警告：</h4>";
					$.each(json.result, function(index, value) {
						var rows = tableData.find([ "name" ], [ value.dataObject.substring(0, value.dataObject.indexOf(".")) ]);
						confirm = confirm + "<span style='padding:0 15px'>" + rows[0].val('label') + "中：" + value.name + "字段类型" + "已由" + value.dataType + "改变为" + value.newDataType + "</span><br/>";
					})
					confirm = confirm + "<p style='margin-top:10px'>上述情况有可能会导致部署出错，确定要继续吗？</p>";

					justep.Util.confirm(confirm, function() {
						self.createBackup();
					}, function() {
					});
				} else {
					self.createBackup();
				}
			},
			error : function(xhr, status, err) {
				dtd.resolve("false");
				failCallback && failCallback();
				var errorMsg = "ajax请求出错：" + [ status, xhr.readyState, err ];
				throw new Error(errorMsg);
			}
		});

	};

	// 创建数据对象数据备份
	Model.prototype.createBackup = function() {

		var self = this;
		// 删除原有备份文件
		/*
		 * if (xCloudService.exists({ filePath : "/deploy/config/init.json" })) {
		 * xCloudService.deleteFile({ filePath : "/deploy/config/init.json" }); }
		 */

		xCloudService.deleteFolder({
			filePath : "service" + self.appPath + "/init"
		});

		// 删除原有备份文件
		if (xCloudService.exists({
			filePath : "deploy/dataObject"
		})) {
			xCloudService.deleteFolder({
				filePath : "deploy/dataObject"
			});
			xCloudService.createDir({
				filePath : "deploy/dataObject"
			});
		} else {
			xCloudService.createDir({
				filePath : "deploy/dataObject"
			});
		}

		var tableData = this.comp('tableData');
		// var arr = [];
		tableData.each(function(option) {
			xCloudService.copyFile({
				filePath : option.row.val('path'),
				parentFilePath : "deploy/dataObject"
			});
			if (option.row.val('isOrNotSync') == "true") {
				self.createDataFile(option.row.val('name'));
				// arr.push(option.row.val('name'));
			}
		});
		/*
		 * if (arr.length > 0) { var content = JSON.stringify({ dataObjects :
		 * arr }); xCloudService.createFile({ filePath :
		 * "/deploy/config/init.json", content : content }); }
		 */

	}

	// 创建数据对象数据备份
	Model.prototype.createDataFile = function(name) {
		var self = this;
		var dbname = DBUtils.getTableName(self.appPath + "/" + name)
		$.ajax({
			type : "GET",
			dataType : "json",
			async : false,
			url : "/postgrest/" + dbname,
			success : function(resultData, textStatus) {
				if (textStatus == "success") {

					var content = JSON.stringify(resultData);
					xCloudService.createFile({
						filePath : "service" + self.appPath + "/init/" + name + ".json",
						content : content
					});

				}
			},

		});
	}

	// 调用保存
	Model.prototype.sendRequest = function(param) {
		var action = param.action;
		var data = param.data;
		data.action = action;
		// data.paasUrl = this.config.paasUrl;
		$.ajax({
			headers : {
				jsessionID : this.config.sessionId
			},
			type : "POST",
			dataType : "json",
			async : param.async || false,
			url : require.toUrl("$UI/system/deploy/common/initEnvironment.j"),
			data : data,
		}).done(function(result) {
			if (result.success) {
				param.callback && param.callback.call(param.self);
			} else {
				alert(result.msg);
			}
		}).fail(function(xhr) {
			var msg = $(xhr.responseText).filter("h1:first").text() || xhr.statusText;
			throw _Error.create(msg);
		});
	};

	Model.prototype.getTitle = function(wizard) {
		return '数据迁移';
	};
	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};
	Model.prototype.hasFinishBtn = function(wizard) {
		return true;
	};

	Model.prototype.finish = function() {
		var self = this;
		var dtd = $.Deferred();
		var promise = dtd.promise();
		this.compareData(dtd, function() {
			self.sendRequest({
				action : "compressTarModel",
				async : false,
				data : {
					orgId : self.config.orgId,
					projectId : self.config.projectId,
					paasUrl : self.config.paasUrl,
				}
			});
			if (xCloudService.exists({
				filePath : "service"
			})) {
				var config = self.appEngine.config;
				config.paasDistFiles = config.paasDistFiles.length == 0 ? xpaas.service.name : config.paasDistFiles + "," + xpaas.service.name
			}
			self.getParent().openPage({
				id : "waittingDialog",
				url : "$UI/system/deploy/paas/waittingDialog.w",
				fromId : "dataMigration"
			});
		});
		return promise;
	}
	Model.prototype.end = function() {
		var self = this;

		var dtd = $.Deferred();
		var promise = dtd.promise();
		if (xCloudService.exists({
			filePath : "service" + self.appPath + "/init"
		})) {
			xCloudService.deleteFolder({
				filePath : "service" + self.appPath + "/init"
			});
		}
		var tableData = this.comp('tableData');
		tableData.each(function(option) {
			if (option.row.val('isOrNotSync') == "true") {
				self.createDataFile(option.row.val('name'));
			}
		});
		this.sendRequest({
			action : "compressTarModel",
			self : this,
			async : false,
			data : {
				orgId : this.config.orgId,
				projectId : this.config.projectId,
				paasUrl : this.config.paasUrl,
			}
		});

		dtd.resolve("true");
		return promise;
	}

	return Model;
});