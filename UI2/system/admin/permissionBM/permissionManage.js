define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var OperateMfile = require("$UI/system/designer/webIde/quickIde/propPages/common/operateMfile");
	var DBUtils = require("$UI/system/designer/webIde/quickIde/common/DBUtils");
	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var Data = require("$UI/system/components/justep/data/data");
		var XML = require("$UI/system/lib/base/xml");
			var Handlebars = require("$UI/system/templates/common/js/handlebars-v1.3.0");
	var xCloudService = ideService.getXCloudService();
	var UUID = require("$UI/system/lib/base/uuid");
	var baseUrl = require.toUrl('$UI/system/admin/permissionBM/roleDialog/role.w')
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		var path2 = sessionStorage.getItem("appPath");
		this.appPath = path2.substring(path2.indexOf("/"));
		this.config = JSON.parse(sessionStorage.getItem("config"));
		var list = OperateMfile.getAllFilesName();
		this.comp('tableData').loadData({
			"@type" : "table",
			"rows" : list
		});
		this.comp('tableData').first();
		
		var row = this.comp('tableData').getCurrentRow();
		if(!row){
			return;
		}
		/*var list = [{
			id:003,
			name:'request',
			label:'发帖',
			path:'comp/requrest'
		},
		{
			id:004,
			name:'res',
			label:'商品',
			path:'comp/product'
		},
		{
			id:005,
			name:'buy',
			label:'购买',
			path:'comp/buy'
		}
		]
		var dataList = [];
		list.forEach(function(item,index){
			dataList.push({
				id:UUID.createUUID(),
				name:item.name,
				label:item.label,
				path:item.path
			})
		})
		
		this.comp('tableData').loadData({
			"@type" : "table",
			"rows" : dataList
		});
		this.comp('tableData').first();
		
		var row = this.comp('tableData').getCurrentRow();
		if(!row){
			return;
		}
		var url = require.toUrl('./dataTable.w');*/	
		var params = {
			id:row.val('id'),
			path: row.val('path'),
			name:row.val('name'),
			label:row.val('label')
		}
		this.comp('windowContainer1').load(baseUrl,params);
		
	};
	
	
	//调用保存
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

	Model.prototype.tr2Click = function(event){
		var self = this;
		var row2 = this.comp('tableData').getCurrentRow();
		if(!row2){
			return;
		}
		var row = event.bindingContext.$object;
		if(row2.val('name') !==  row.val('name')){
			var url = require.toUrl('./dataTable.w');	
			var params = {
							path : row.val('path'),
							name:row.val('name'),
							id:row.val('id'),
							label:row.val('label')
					}
			
			this.comp('windowContainer1').load(baseUrl, params);
			//var row2 = this.comp('tableData').getCurrentRow();
			
			/*var bizDoc = this.comp('windowContainer1').getInnerModel().bizDoc;
			var propertyData = this.comp('windowContainer1').getInnerModel().propertyData;
			if(bizDoc.isModified()){
				var label = this.comp('windowContainer1').getInnerModel().tableData.val('label');
				justep.Util.confirm("当前内容已经做了修改，切换文件后修改将会丢失，是否保存？", function(){
					//self.createDataMaintain(row2.val('name'), bizDoc, propertyData, label)
					self.saveDoc(bizDoc,row2,label);
					self.comp('windowContainer1').load(url, params);
				},function(){
					self.comp('windowContainer1').load(url, params);
				});
			}else{
				
				this.comp('windowContainer1').load(url, params);
			}*/
		}
	
		
		
	
	
		
	};
	
	Model.prototype.saveDoc = function(bizDoc,row2,label){
		var self = this;
		bizDoc.save();
		this.comp('tableData').setValue("label",label,row2);
		if (window.location.href.indexOf("localhost") < 0) {
			this.sendRequest({
				action : "compressTarModel",
				self : this,
				async : true,
				data : {
					orgId : this.config.orgId,
					projectId : this.config.projectId,
					paasUrl : this.config.paasUrl,
				}
			});
		}
	}
	
	
	
	
	Model.prototype.deleteBtnClick = function(event){
		var row = this.comp('tableData').getCurrentRow();
		
		var self = this;
		if(!row){
			justep.Util.hint("请先选中行");
			return;
		}
		
		justep.Util.confirm("确认要删除吗？", function(){
				var tableData = self.comp('tableData');
				if(Data.STATE.NEW !== tableData.getRowState(row)) DBUtils.deleteDataTable(self.appPath+"/"+row.val('name'));
				tableData.remove(row);
				xCloudService.deleteFile({filePath:row.val('path')});
				var path = sessionStorage.getItem("appPath");
			//path= (path||"UI2/apps/images").replace("UI2","$UI")
			xCloudService.deleteFolder({
				filePath : path+"/SA/DMPages/"+row.val('name')
			});
				OperateMfile.deleteFileInList(row.val('name'));
				OperateMfile.dataObjectsRecord();
				var row2 = self.comp('tableData').getCurrentRow();
				if(!row2){
					return;
				}
				var url = require.toUrl('./dataTable.w');	
				var params = {
						path : row2.val('path'),
						name: row.val('name')
				}
				self.comp('windowContainer1').load(url, params);

				
				},function(){
				});
		
		
	};

	Model.prototype.addDataBtnClick = function(event){
		var row2 = this.comp('tableData').getCurrentRow();
		var self = this;
		if(row2){
			var bizDoc = this.comp('windowContainer1').getInnerModel().bizDoc;
			var propertyData = this.comp('windowContainer1').getInnerModel().propertyData;
			if(bizDoc.isModified()){
				var label = this.comp('windowContainer1').getInnerModel().tableData.val('label');
				justep.Util.confirm("当前内容已经做了修改，切换文件后修改将会丢失，是否保存？？", function(){
					self.saveDoc(bizDoc,row2,label);
					//self.createDataMaintain(row2.val('name'), bizDoc, propertyData, label)
					self.addDataObject();
				},function(){
					self.addDataObject();
				});
			}else{
				this.addDataObject();
			}
		}else{
			this.addDataObject();
		}
		

	};
	
	Model.prototype.addDataObject = function(){
		var arr = [];
		var list = OperateMfile.getAllFilesName();
		for(var i = 0; i<list.length; i++){
			if(list[i].name.indexOf("table")>=0){
				arr.push(list[i].name.substring(5,list[i].name.length));
			}
		}
		arr.sort(function(a,b){
			return a-b;
		});
		var count = 1;
		if(arr.length>0){
			count = parseInt(arr[arr.length-1])+1;
		}
		var name = "table"+count;
		var label = "示例数据对象"+count;
		var path2 = sessionStorage.getItem("appPath");
		var appPath = path2.substring(path2.indexOf("/"));
		var path = "service"+appPath+"/"+name+".data.m";
		 var datacontent = '<?xml version="1.0" encoding="utf-8"?><data><class><label>'+label+'</label><property name=\"fid\" did =\"'+justep.UUID.createUUID()+'\" primary=\"true\" dataType=\"String\"><label>主键</label></property></class></data>';
		  xCloudService.createFile({filePath:path,content:datacontent});
		 OperateMfile.addFileInList(name,label,path);
		 OperateMfile.dataObjectsRecord();
		this.comp('tableData').newData({
			defaultValues:[{
				name:name,
				label:label,
				path:path
				}]
		});
		
		var url = require.toUrl('$UI/system/designer/webIde/quickIde/propPages/roleDialog/role.w');	
		var params = {
			path : path,
			name:name
		}
		this.comp('windowContainer1').load(url, params);
	};
	
	
	
	Model.prototype.saveBtnClick = function(event){
		var self = this;
		var row = this.comp('tableData').getCurrentRow();
		if(!row){
			return;
		}
		var path = sessionStorage.getItem("appPath");
		
		var label = this.comp('windowContainer1').getInnerModel().tableData.val('label');
		this.comp('tableData').setValue("label",label,row);
		
		var bizDoc = this.comp('windowContainer1').getInnerModel().bizDoc; 
		if(!bizDoc.isModified()){
			return;
		}
		
		var name = this.comp('tableData').getCurrentRow().val('name');
		var propertyData = this.comp('windowContainer1').getInnerModel().propertyData;
		//this.createDataMaintain(name, bizDoc, propertyData, label)
		bizDoc.save();	
	
		//DBUtils.createDataTable(bizDoc,self.appPath+"/"+row.val('name'),row.val('label'));
		if (window.location.href.indexOf("localhost") < 0) {
			this.sendRequest({
				action : "compressTarModel",
				self : this,
				async : true,
				data : {
					orgId : this.config.orgId,
					projectId : this.config.projectId,
					paasUrl : this.config.paasUrl,
				}
			});
		}
	};
	
	
	
	
	return Model;
});