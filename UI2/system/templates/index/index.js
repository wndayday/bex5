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
------------------------------------------------------------ */

define(function(require) {
	require("$UI/system/components/bootstrap/lib/js/bootstrap");
	var $ = require("jquery");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var TemplateEngine = require("$UI/system/templates/common/js/templateEngine");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var DEFAULT_TITLE = "模版选择";
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
	};

	Model.prototype.modelLoad = function(event) {
 
		this.templateEngine = new TemplateEngine(templateService.targetPath || this.getContext().getRequestParameter("targetPath"));
		this.openPage({
			id : "main",
			url : require.toUrl("$UI/system/templates/index/selection.w")
		});

		var result = $.ajax({
			async : false,
			data : JSON.stringify({
				"function" : "getActivity",
				"params" : {
					"targetPath" : this.templateEngine.targetPath
				}
			}),
			dataType : "json",
			contentType : "json",
			type : 'POST',
			url : require.toUrl("$UI/system/templates/common/templateHelper.j"),
			success : function(result) {
			
			},
			error : function(xhr, status, err) {
			}
		}).responseJSON;
		var menuItems = $('<ul xid="menuItems" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu"></ul>');
		var activity;
		if (result.flag && result.activity.length >= 1) {
			activity = result.activity;
		} else {
			activity = [ templateService.isRoot?'index':'mainActivity' ];
		}
		var self = this;
		for ( var i = 0; i <= activity.length - 1; i++) {
			menuItems.append($('<li role="presentation"><a role="menuitem" href="#" onclick="">' + activity[i] + '</a></li>').on('click', function() {
				self.comp("fileName").val($(this).text());
			}));
		}
		$(this.getElementByXid("dropMenu")).append(menuItems);

		this.comp("fileName").val(templateService.isRoot?'index':'mainActivity');
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
		}

		composeNode.style.display = "block";
	};

	Model.prototype.back = function(currentModel) {
		var fromId = currentModel.getContext().getRequestParameter("fromId");
		this.openPage({
			id : fromId
		});
	},

	Model.prototype.refreshWizardPageStatus = function() {
		if(templateService.isRoot || this.currentCompose.getInnerModel().templateEngine.templatePath == "$UI/system/templates/normal/homePage1"){
				this.comp("fileName").val('index');
			}else{
				this.comp("fileName").val('mainActivity');
			}
		this._initWizardPage(this.currentCompose);
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
		this.templateEngine.setTargetFileName(this.comp("fileName").value);
		this.currentCompose.getInnerModel().finish(this);
		this.templateEngine.createFiles();

		templateService.refreshFile(this.templateEngine.getTargetPath());
		templateService.openWFile(this.templateEngine.getTargetPath() + "/" + this.templateEngine.targetFileName + ".w");
		templateService.closeDialog();
		/*hcr 早期版本的webide, 现在不用了, 但会影响studio中用到excel的向导
		if(this.owner && this.owner.close){
			this.owner.close();			
		}
		*/
	};

	Model.prototype._composeLoaded = function(event) {
		this._initWizardPage(event.source);

	};

	Model.prototype._initWizardPage = function(compose) {
		
		this.title.set(compose ? compose.getInnerModel().getTitle() : this.DEFAULT_TITLE);
		// this.hasCancelBtn.set(compose &&
		// compose.getInnerModel().hasCancelBtn());
		this.hasBackBtn.set(compose && compose.getInnerModel().hasBackBtn());
		this.hasNextBtn.set(compose && compose.getInnerModel().hasNextBtn());
		this.hasFinishBtn.set(compose && compose.getInnerModel().hasFinishBtn());
	};

	Model.prototype._createCompose = function(id, src, fromId) {
		var src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (fromId ? ("&fromId=" + fromId) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src,
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
		/*hcr 早期版本的webide, 现在不用了, 但会影响studio中用到excel的向导
		if(this.owner && this.owner.close){
			this.owner.close();			
		}
		*/
	};

	Model.prototype.backBtnClick = function(event) {
		this.currentCompose.getInnerModel().backPage(this);
	};

	Model.prototype.nextBtnClick = function(event) {
		this.currentCompose.getInnerModel().nextPage(this);
	};

	Model.prototype.finishBtnClick = function(event) {
		if (this.validate())
			this.finish();
	};

	return Model;
});
