define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var bind = require("bind");
	var XML = require('$UI/system/lib/base/xml');
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");

	var Model = function() {
		this.callParent();
		this.templateSelected = bind.observable(false);
	};

	Model.prototype.modelLoad = function(event) { 
/*		this.templateEngine = this.getParent().templateEngine;
		this.currentTemplateUrl = null;
		this.lastUrl = null;
		this.currentId = "";
		this.customNeeded = true;
 
		var getTemplateConfigCatalog = templateService.getTemplateConfigCatalog();
		this._intTemplateTree(getTemplateConfigCatalog);
		
		this._recalcTreeHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcTreeHeight();
		});
		this._imgScrollBtn();
		var self = this;
		$(window).resize(function() {
			self._changeArrowBtnLocation();
		});*/
	};
	
	Model.prototype.getTitle = function(wizard) {
		return '功能确认';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};
	
	Model.prototype.hasBackBtn = function(wizard) {		
		return true;
	};
	
	Model.prototype.hasNextBtn = function(wizard) {
		return false;//(!this.notSupport) && this.customNeeded;
	};
	
	Model.prototype.hasFinishBtn = function(wizard) {
		return true;//!this.customNeeded;
	};
	
	Model.prototype.nextPage = function(wizard) {
		var fileName = this.comp("fileName").val();
		if(fileName == undefined || fileName == ""){
			alert('请输入功能名称');
			return;
		}
		//将activityName和activityLabel写入index.w
		var d = new Date()
		this.getParent().comp("fileName").val("activity" + d.getTime());
		this.getParent().activityLabel = fileName;
		
		this.getParent().openPage({
			id : "selection",
			url: require.toUrl("./selection.w"),
			fromId: this.getContext().getRequestParameter("id")
		});
	};

	Model.prototype.validate = function(wizard){
		var validated = true;
		if(this.comp("fileName").val() == undefined || this.comp("fileName").val() == ""){
			alert('请输入功能名称');
			validated = false;
		}
		return validated;
	};
	
	Model.prototype.backPage = function(wizard) {
		wizard.back(this);
	};

	Model.prototype.finish = function(wizard) {
		//将activityName和activityLabel写入index.w
		//var d = new Date()
		//this.getParent().comp("fileName").val("activity" + d.getTime());
		this.getParent().activityLabel = this.comp("fileName").val();;
	};

	return Model;
});
