/* ------------------------------------------------------------ 
向导主调度

主页面（wizard）接口：
	openPage = function(params)
	back = function(currentModel)
	refreshWizardPageStatus = function()

子页面接口:
	getTitle = function(wizard)
	hasCancelBtn = function(wizard)
	hasBackBtn = function(wizard)		
	hasNextBtn = function(wizard)
	hasFinishBtn = function(wizard)
	nextPage = function(wizard)
	validate = function(wizard)
	finish = function(wizard)

传入参数
    targetPath: 创建w文件的路径，UI2开头
    mode：简易模式，标准模式、开发模式，可能不是参数，而是通过其它方式获取
    create： 新建功能func，新建页面page
------------------------------------------------------------ */

define(function(require) {
	require("$UI/system/components/bootstrap/lib/js/bootstrap");
	var $ = require("jquery");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var TemplateEngine = require("$UI/system/designer/wizard/common/js/templateEngine");
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");

	var DEFAULT_TITLE = "选择模版";
	var INVALIDATE_SETTING = "模版向导配置不正确，请联系模版开发商！";

	var Model = function() {
		this.callParent();
		this.title = bind.observable(this.DEFAULT_TITLE);
		this.hasCancelBtn = bind.observable(true);
		this.hasBackBtn = bind.observable(false);
		this.hasNextBtn = bind.observable(true);
		this.hasFinishBtn = bind.observable(false);
		this.currentCompose = null;
		this.pageIdx = 0;
		//this.mode = "normal";
		this.mode = "easy";
		this.activityLabel = "activity1";
		this.manualChange = true;
	};

	Model.prototype.modelLoad = function(event) {
		//设置文件名
		var d = new Date()
		this.comp("fileName").val("activity" + d.getTime());

		templateService.targetPath = this.params.targetPath;
		//templateService.targetPath = "UI2/demo/misc/process/order";
		this.mode = this.params.mode;
	
		this.templateEngine = new TemplateEngine(templateService.targetPath);
		this.openPage({
			id : "selection",
			url : require.toUrl("./selection.w")
		});
		
		var self = this;
		
		templateService.openWFile = function(title, icon, filePath) {
			//var modelPath = sessionStorage.getItem("modelPath") || "";
			//filePath = filePath.substring(modelPath.length + 1);

			self.getParent().openEditor({title: title, icon: icon, filePath : filePath});
		};

		/** 重写模板向导服务的相关方法 * */
		templateService.refreshFile = function(filePath) {
			//刷新不在这里刷，因为要刷新的是BIZ目录
			if (!filePath || filePath.indexOf("Native") != -1) {
				return;
			}
			self.getParent().resourceTreeView.refresh(filePath);
		};
		
		templateService.openXuiPropertyEditorDlg = function(options, callBack) {
			//var path = self.getResourceTreeView().getSelection();
			var path = self.templateEngine.getTargetPath();
			options.modelName = path.substring(path.indexOf("/"));
			var url = "";

			// 特殊处理
			if (options.propName == 'concept') {
				url = "$UI/system/designer/wizard/editors/conceptSelector/conceptSelector.w";
			} else if (options.propName == 'reader' || options.propName == 'writer' || options.propName == 'creator') {
				url = "$UI/system/designer/webIde/editors/hasActionSelector/hasActionSelector.w";
			} else if (options.propName == 'columns' || options.propName == 'column') {
				options.nodeXml = '<div autoLoad="false" component="$UI/system/components/justep/data/bizData" concept="' + options.concept + '"  >' + '  <reader action="' + options.reader
						+ '"></reader>' + '</div>';
				url = "$UI/system/designer/wizard/editors/columnsSelector/columnsSelector.w";
				if (options.propName == 'column') {
					options.multiSelect = false;
				}
			}
			self.xuiPropCallBack = callBack;
			self.comp("propEditorDlg").open({
				data : {
					url : url,
					params : options
				}
			});
		};
		
		templateService.openSwtCommonSelectorDialog = function(options, callBack) {
			var ds = options.datasource;

			var url = "";
			if (ds && ds.method == 'RuleRelationDatasource.getDatasource') {
				options.nodeXml = '<div autoLoad="false" component="$UI/system/components/justep/data/bizData" concept="' + options.concept + '"  >' + '  <reader action="' + options.reader
						+ '"></reader>' + '</div>';
				url = "$UI/system/designer/wizard/editors/columnsSelector/columnsSelector.w";
				options.multiSelect = ds.mutiSelect;
			}
			self.xuiPropCallBack = callBack;
			self.comp("propEditorDlg").open({
				data : {
					url : url,
					params : options
				}
			});
		};

		webSocket._callJava = function(className, methodName, params, callback) {
			if (methodName == 'closeDialog') {
				return;
			}
			params = params || {};
			var result = IDEService.callService({
				name : className + "." + methodName,
				params : params
			});
			if (callback) {
				callback(result);
			}
			return result;
		};
	};

	/*
	 * @param {Object} 形如：{url: url, id: id, fromId: formId, refresh: false)
	 * @returns {void}
	 */
	Model.prototype.openPage = function(params) {
		var composes = $(".compose");
		for ( var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var id = params.id || "page_" + (this.pageIdx++);
		var refresh = params.refresh;
		var fromId = params.fromId;
		var composeNode = document.getElementById(id);
		var self = this;
		if (!composeNode) {
			var url = params.url;
			this.currentCompose = this._createCompose(id, params.url, fromId);
			composeNode = this.currentCompose.domNode;
		} else {
			this.currentCompose = Component.getComponent(composeNode);
			if (refresh) {
				this.currentCompose.refresh();
				this.currentCompose.on("onLoad", function() {
					self._initWizardPage(self.currentCompose);
				});
			} else {
				this._initWizardPage(this.currentCompose);
			}
			
			if(params.fromId){
				this.currentCompose.setParams({"fromId": fromId});
				this.currentCompose.load();
			}
		}

		composeNode.style.display = "block";
	};

	Model.prototype.back = function(currentModel) {
		//var fromId = currentModel.getContext().getRequestParameter("fromId");
		var fromId = currentModel.params.fromId;
		this.openPage({
			id : fromId
		});
	},

	Model.prototype.refreshWizardPageStatus = function() {
/*		if(templateService.isRoot || this.currentCompose.getInnerModel().templateEngine.templatePath == "$UI/system/templates2/normal/homePage1"){
				this.comp("fileName").val('index');
			}else{
				this.comp("fileName").val('mainActivity');
			}
*/		this._initWizardPage(this.currentCompose);
	};

	/* 校验 */
	Model.prototype.validate = function() {
		var result = this._checkFileValidate(this.templateEngine.targetPath + "/" + this.comp("fileName").value + ".w");
		if (result) {
			result = !this.currentCompose || this.currentCompose.getInnerModel().validate(this);
		}
		return result;
	};

	/* 完成 */
	Model.prototype.finish = function() {
		//设置文件名
		this.templateEngine.setTargetFileName(this.comp("fileName").value);
		//执行每个配置页的finish
		var composes = $(".compose");
		for ( var i = 0; i < composes.length; i += 1) {
			var currentCompose = Component.getComponent(composes[i]);
			if(currentCompose.getInnerModel().finish)
				currentCompose.getInnerModel().finish(this);
		}
		//设置文件中文名
		this.templateEngine.setTargetFileLabel(this.activityLabel);
		//生成文件
		this.templateEngine.createFiles();
		//创建功能
		var icon = require.toUrl("$UI/system/designer/webIde/img/xml.gif");
		if(this.params.create == "func"){
			templateService.createActivity(	{
				targetPath : this.templateEngine.getTargetPath(),
				activityLabel : this.activityLabel,
				activityName : this.comp("fileName").value
			});
			icon = require.toUrl("$UI/system/designer/webIde/img/U.gif");
		}
		//templateService.refreshFile(this.templateEngine.getTargetPath());
		templateService.openWFile(this.activityLabel, icon, this.templateEngine.getTargetPath() + "/" + this.templateEngine.targetFileName + ".w");
		templateService.closeDialog();
		if(this.owner && this.owner.close){
			this.owner.close();			
		}
	};

	Model.prototype._composeLoaded = function(event) {
		this._initWizardPage(event.source);
	};

	Model.prototype._initWizardPage = function(compose) {
		this.title.set(compose ? compose.getInnerModel().getTitle() : this.DEFAULT_TITLE);
		var rows = this.comp("stepData").find(["step"],[this.title.get()]);
		if(rows.length > 0){
			this.manualChange = false;
			this.comp("stepData").to(rows[0]);
			this.manualChange = true;
		}

		// this.hasCancelBtn.set(compose &&
		// compose.getInnerModel().hasCancelBtn());
		this.hasBackBtn.set(compose && compose.getInnerModel().hasBackBtn());
		this.hasNextBtn.set(compose && compose.getInnerModel().hasNextBtn());
		this.hasFinishBtn.set(compose && compose.getInnerModel().hasFinishBtn());
	};

	Model.prototype._createCompose = function(id, src, fromId) {
		var src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id);
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src,
			params : {"fromId": fromId},
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('compose');
		return compose;
	};

	Model.prototype._checkFileValidate = function(file) {
		return (!templateService.fileExists(file)) || confirm("新建的文件已经存在，是否覆盖？");
	};

	Model.prototype.cancelBtnClick = function(event) {
		templateService.closeDialog();
		if(this.owner && this.owner.close){
			this.owner.close();			
		}
	};

	Model.prototype.backBtnClick = function(event) {
		this.currentCompose.getInnerModel().backPage(this);
		//this.comp("stepData").pre();
	};

	Model.prototype.nextBtnClick = function(event) {
		this.currentCompose.getInnerModel().nextPage(this);
		//this.comp("stepData").next();
	};

	Model.prototype.finishBtnClick = function(event) {
		if (this.validate())
			this.finish();
	};

	Model.prototype.editorDlgReceived = function(event) {
		if (this.xuiPropCallBack) {
			this.xuiPropCallBack.call(this, event.data.returnValue);
		}
	};

	Model.prototype.downloadBtnClick = function(event){
		this.comp("downloadDialog").open({
			params : {
				"type" : 2,
				"tag" : 2
			}
		});
	};

	Model.prototype.downloadDialogReceive = function(event){
		if(event.data.result == "success"){
			var composes = $(".compose");
			for ( var i = 0; i < composes.length; i += 1) {
				if(composes[i].id == "selection"){//刷新模板
					var currentCompose = Component.getComponent(composes[i]);
					currentCompose.refresh();
				}
			}
		}
	};

	Model.prototype.updateBtnClick = function(event){
		this.comp("updateDialog").open({
			params : {
				"type" : 2,
				"tag" : 2
			}
		});
	};

	Model.prototype.updateDialogReceive = function(event){
		if(event.data.result == "success"){
			var composes = $(".compose");
			for ( var i = 0; i < composes.length; i += 1) {
				if(composes[i].id == "selection"){//刷新模板
					var currentCompose = Component.getComponent(composes[i]);
					currentCompose.refresh();
				}
			}
		}
	};

	Model.prototype.stepDataIndexChanging = function(event){
		if(this.manualChange){
			var oldIndex = event.source.getRowIndex(event.originalRow);
			if(oldIndex == -1) return;

			if(event.row.val("id") == "configuration" && !this.needConfig){//空白模板不能切换到模板配置页
				event.cancel = true;
				return;
			}

			var newIndex = event.source.getRowIndex(event.row);
			if(newIndex < oldIndex){//返回以前
				var stepId = event.row.val("id");
				this.openPage({
					id : stepId
				});
			}else if(newIndex == oldIndex + 1){//下一步
				event.cancel = this.currentCompose.getInnerModel().nextPage(this);
			}else{//不需要配置的模板才可以跳步
				event.cancel = this.needConfig;
				if(!this.needConfig)
					this.currentCompose.getInnerModel().nextPage(this);
			}
		}
	};

	return Model;
});
