define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var xpaas = require("$UI/system/deploy/paas/xpaas");
	var justep = require("$UI/system/lib/justep");
	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = ideService.getXCloudService();
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	
	
	var Model = function(){
		this.callParent();
		this.isOrNotShow = justep.Bind.observable(false);
		this.arr = [];
	};

	Model.prototype.modelLoad = function(event){
		this.appEngine = this.getParent().appEngine;
		var self = this;
		var path = "BIZ/"+sessionStorage.getItem("appPath");
		
		this.config = JSON.parse(sessionStorage.getItem("config"));
		
		var node = xCloudService.getFileTree({
				filePath : path,
				extName : "m"
			});
		this.getTableInfo(node.children);
		
		if (this.arr.length <= 0) {
			this.isOrNotShow.set(true);
		}
		this.comp('tableData').loadData({
			"@type" : "table",
			"rows" : self.arr
		});
		this.comp('tableData').first();
		
		
	};
	
	Model.prototype.getTableInfo = function(node){
		var self = this;
		for(var i =0; i<node.length; i++){
			if(node[i].children && node[i].children.length>0){
				self.getTableInfo(node[i].children);
			}else{
				if(node[i].key.indexOf(".ontology.m")>0){
					var bizDoc = bizModel.loadFile(node[i].key, true);
					var list = bizDoc.queryAsJson("concept");
					$.each(list,function(index,value){
						var filePath = node[i].key.replace("ontology/"+node[i].title,"data/init/");
						var flag = xCloudService.exists({filePath : filePath+value.name+".json"})?"true":"false";
						self.arr.push({
							name:value.name,
							label:value.label,
							isOrNotSync:flag,
							path:node[i].key,
							title:node[i].title
						})
					})
				}
			}
		}
	}
	
	
	// 创建数据对象数据备份
	Model.prototype.createDataFile = function(name,path,title) {
		var self = this;
		$.ajax({
			type : "GET",
			dataType : "json",
			async : false,
			url : "/postgrest/"+name,
			//headers: { "X-Tenant-Key": "001" },
			success : function(resultData, textStatus) {
				if (textStatus == "success") {
					if(resultData.length>0){
						var content = JSON.stringify(resultData);
						content = '{'+'"mode":"UpdateAndInsert","datas":'+content+"}";
						var filePath = path.replace("ontology/"+title,"data/init/")+ name+".json";
						
						if(xCloudService.exists({filePath :filePath })){
							xCloudService.deleteFile({ filePath : filePath});
						}
						xCloudService.createFile({
							filePath : filePath,
							content : content
					});
					}

				}
			}

		});
	}
	
	// 创建系统表数据对象数据备份
	Model.prototype.createSystemFile = function(name) {
		var self = this;
		$.ajax({
			type : "GET",
			dataType : "json",
			async : false,
			url : "/postgrest/"+name,
			//headers: { "X-Tenant-Key": "001" },
			success : function(resultData, textStatus) {
				if (textStatus == "success") {
					if(resultData.length>0){
						var content = JSON.stringify(resultData);
						content = '{'+'"mode":"Insert","datas":'+content+"}";
						var filePath = "BIZ/system_X/data/init/"+ name+".json";
						
						if(xCloudService.exists({filePath :filePath })){
							xCloudService.deleteFile({ filePath : filePath});
						}
						xCloudService.createFile({
							filePath : filePath,
							content : content
					});
					}

				}
			}

		});
	}
	
	

	
/*	// 调用保存
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
	};*/
	
	
	Model.prototype.end = function() {
		var self = this;

		var dtd = $.Deferred();
		var promise = dtd.promise();
		
		var tableData = this.comp('tableData');
		tableData.each(function(option) {
			if (option.row.val('isOrNotSync') == "true") {
				self.createDataFile(option.row.val('name'),option.row.val('path'),option.row.val('title'));
			}else{
				var filePath = option.row.val('path').replace("ontology/"+option.row.val('title'),"data/init/")+ option.row.val('name')+".json";
						
						if(xCloudService.exists({filePath :filePath })){
							xCloudService.deleteFile({ filePath : filePath});
						}
			}
		});
		
		var sysTable = ["SA_OPAgent","SA_OPAuthorize","SA_OPCustomGroup","SA_OPManagement","SA_OPManageType","SA_OPOrg","SA_OPParentRole","SA_OPPermission","SA_OPPerson","SA_OPRole","SA_OPRoleManagement"];
		if(self.comp('checkbox2').value){
			for(var i = 0; i<sysTable.length; i++){
				self.createSystemFile(sysTable[i]);
			}
		}else{
			var filePath = "BIZ/system_X/data/init";
						
						if(xCloudService.exists({filePath :filePath })){
							xCloudService.deleteFile({ filePath : filePath});
						}
		}
		
		
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
		
		var self = this;
		var tableData = this.comp('tableData');
		tableData.each(function(option) {
			if (option.row.val('isOrNotSync') == "true") {
				self.createDataFile(option.row.val('name'),option.row.val('path'),option.row.val('title'));
			}else{
				var filePath = option.row.val('path').replace("ontology/"+option.row.val('title'),"data/init/")+ option.row.val('name')+".json";
						
						if(xCloudService.exists({filePath :filePath })){
							xCloudService.deleteFile({ filePath : filePath});
						}
			}
		});
		
		var sysTable = ["SA_OPAgent","SA_OPAuthorize","SA_OPCustomGroup","SA_OPManagement","SA_OPManageType","SA_OPOrg","SA_OPParentRole","SA_OPPermission","SA_OPPerson","SA_OPRole","SA_OPRoleManagement"];
		if(self.comp('checkbox2').value){
			for(var i = 0; i<sysTable.length; i++){
				self.createSystemFile(sysTable[i]);
			}
		}else{
			var filePath = "BIZ/system_X/data/init";
						
						if(xCloudService.exists({filePath :filePath })){
							xCloudService.deleteFile({ filePath : filePath});
						}
		}
		
		self.sendRequest({
				action : "compressTarModel",
				async : false,
				data : {
					orgId : self.config.orgId,
					projectId : self.config.projectId,
					paasUrl : self.config.paasUrl,
				}
			});
			
		self.getParent().openPage({
				id : "waittingDialog",
				url : "$UI/system/deploy/paas/waittingDialog.w",
				fromId : "bizDataMigration"
			});
		
		
		dtd.resolve("true");
		return promise;
	}
	
	
	
	return Model;
});