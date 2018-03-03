define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var resourceTreeViewCls = require("$UI/system/designer/webIde/view/resourceTreeView");//页面导航视图
	var resourceTreeView = new resourceTreeViewCls();
	var appService = require("$UI/system/designer/webIde/common/IDEService");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var docService = require("$UI/system/designer/baas/docService");
	var uploader = require("$UI/system/designer/webIde/uploader/uploader");
	var sessionTool = require("$UI/system/designer/paas/sessionTool");
	
	var xCloudService = appService.getXCloudService();
	
	
	//覆盖docService方法
	var saveContent = docService.setContent.bind(docService);
	docService.setContent = function(str){
		docService.model.isModified.set(true);
		docService.model.content = str;
	};
	
	var Model = function(){
		this.callParent();
		docService.model = this;
		this.isModified = justep.Bind.observable(false);
		this.content = "";
		this.createFlagFile();
		this.createDBConfig();
	};

	Model.prototype.createDBConfig = function(){
		var filePath = "Baas/db.config.m";
		if(!xCloudService.exists({filePath:filePath}))
			xCloudService.createFile({filePath:filePath,content:'<?xml version="1.0" encoding="UTF-8"?><model><datasource name="x5" value="java:comp/env/x5" /></model>'});
	};

	Model.prototype.createFlagFile = function(type){
		type = type || 'java';
		var filePath = "Baas/.m2"+type;
		if(!xCloudService.exists({filePath:filePath}))
			xCloudService.createFile({filePath:filePath,content:'java'});
	};
	
	Model.prototype.createSQLDir = function(){
		var filePath = "Baas/"+this.appPath+"/sql";
		if(!xCloudService.exists({filePath:filePath}))
			xCloudService.createDir({filePath:filePath});
	};

	Model.prototype.uploadBtnClick = function(event){
		var node = resourceTreeView.getSelectionNode();
		if(!node || node.data.flag ===true){
		  justep.Util.hint("请在资源树上选择目标目录", {});
		  return;
		}
		var path = resourceTreeView.getSelection();
		uploader.open({model:this,path:path,onClose:function(){
			resourceTreeView.refresh(path);
		}});
	};
	
	Model.prototype.model1Load = function(event){
		this.appPath =  this.getContext().getRequestParameter("appPath");
		if(!this.appPath){
			this.appPath = sessionStorage.getItem("appPath");
		}
		if(!this.appPath){
			alert("没有传入应用路径");
			return;
		}
 
		this.createSQLDir();//创建初始化SQL目录
		var self = this;
		var menu = {
					'add': { 'name': '新建服务', 'icon': 'addFile',"action":function(){
						self.newBtnClick();
					}}
					/*,
					'compile': { 'name': '模型编译', 'icon': 'addFile',"action":function(){
						self.compileBaas();
					}}*/
		
		};  
		appService.callService({name:"getBaasAppInfo",params:{extName:"m,sql",appPath:this.appPath},success:function(result){ 
			self.baasPath = result.baasPath;
			self.modelPath= result.modelPath;
			self.contextPath = result.contextPath;
			self.baseUrl = result.baseUrl;
			var $tree = $(self.getElementByXid("pageTree"));
			resourceTreeView.init(self,$tree,result.pageTree,menu);
			$tree.on("reName",function(event,data){
				if(data.filePath == self.currentFile){  
					self.setCurrentFile(data.newFilePath);
				}
			});
 			var currentPath = sessionStorage.getItem("currentBaasPath"); 
			if(currentPath && currentPath.indexOf('Baas/'+self.appPath)===0 && xCloudService.exists({filePath:currentPath})){//判断是当前应用下的服务
				self.openPage(currentPath);
			}else resourceTreeView.select('Baas/'+self.appPath);
 		}});
	};

	Model.prototype.newBtnClick = function(event){
		var node = resourceTreeView.getSelectionNode();
		if(!node || node.data.flag ===true){
		  justep.Util.hint("请在资源树上选择目标目录", {});
		  return;
		}
		var path = resourceTreeView.getSelection();
		if("/sql"===path.substring(path.length-4)){
			  justep.Util.hint("SQL目录下不能创建服务", {});
			  return;
		} 
		this.comp('newDlg').open({params:{path:path}});
	};

	Model.prototype.openPage = function(filePath){
		if(filePath){
			if(".m"!==filePath.substring(filePath.length-2)) return alert('该文件暂不支持编辑');
			var self = this;
			if(this.isModified.peek()){
				justep.Util.confirm("当前服务内容已经做了修改未保存，切换服务后修改将会丢失，确认要继续吗？", function(){
					self._openPage(filePath);
				},function(){
					resourceTreeView.select(self.currentFile);
				});
			}else self._openPage(filePath);
		}
	};
	
	Model.prototype._openPage = function(filePath){
		this.setCurrentFile(filePath);
		filePath = this.modelPath + "/" + filePath;
	//"http://localhost:8080/x5/UI2/v_/system/designer/baas/index.w?filePath=D:/myX5Dev/master/model/Baas/taobao/operation.service.m&contextPathName=x5&UIServerPort=8080&port=53730&baasPath=D:/myX5Dev/master/model/Baas&targetUrl=$UI/system/designer/baas/editor/service.w"
		this.createCompose(filePath);
	};
	
	Model.prototype.uiBtnClick = function(event){
		sessionTool.check(function() {
			justep.Shell.showPage('ui');
		}, function(err) {
			alert(err);
		});
	};

	Model.prototype.compileBaas = function(){
		this.comp('compileDlg').open();
	};
	
	Model.prototype.createCompose = function(targetPath) {
		webSocket.currentBaasFilePath = targetPath;
		var src = require.toUrl("$UI/system/designer/baas/editor/service.w");
		if(this.compose){
		   this.removeComponent(this.compose);
		}
		this.compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src+"?filePath="+targetPath
		});
		$(this.compose.domNode).addClass('compose').css('height','100%');
 
	};
	
	Model.prototype.dbBtnClick = function(event){
		sessionTool.check(function() {
			justep.Shell.showPage('db');
		}, function(err) {
			alert(err);
		});
	};

	/**切换到app打包*/
	Model.prototype.appBtnClick = function(event){
		sessionTool.check(function() {
			justep.Shell.showPage('app');
		}, function(err) {
			alert(err);
		});
	};

	Model.prototype.updateModifyStatus = function(flag){
		 this.comp("saveBtn").set({disabled:!flag});
	}
	
	Model.prototype.saveBtnClick = function(event){
		saveContent(this.content);
		this.isModified.set(false);
		justep.Util.hint("模型资源保存成功", {type:'success'});
	};

	Model.prototype.isModified = function(flag){ 
		return !this.comp("saveBtn").get("disabled");
	}
	
	Model.prototype.getFilePath = function(){
		 
	}
	
	Model.prototype.currentFileLabelClick = function(event){
		if(this.currentFile ){
			resourceTreeView.select(this.currentFile);
		}
	};

	Model.prototype.newDlgReceive = function(event){
		//新建
		var filePath = event.data.path+"/"+event.data.name;
		xCloudService.createFile({filePath:filePath,content:'<?xml version="1.0" encoding="UTF-8"?><model></model>'});
		resourceTreeView.refresh(event.data.path);
		this.openPage(filePath);
	};

	Model.prototype.compileBtnClick = function(event){
		this.compileBaas();
	};

	Model.prototype.setCurrentFile = function(filePath){
		resourceTreeView.select(filePath);
		this.currentFile = filePath;
		webSocket.currentBaasFilePath = filePath; 
		sessionStorage.setItem("currentBaasPath",filePath);
		this.getElementByXid("currentFileLabel").innerHTML = "当前文件:"+filePath;
	}

	return Model;
});