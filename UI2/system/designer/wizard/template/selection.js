define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var bind = require("bind");
	var XML = require('$UI/system/lib/base/xml');
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");
	var loadTreeJs = require("$UI/system/components/designerCommon/tree/tree");

	loadTreeJs($);

	var Model = function() {
		this.callParent();
		this.templateSelected = bind.observable(false);
		this.showArrow = bind.observable(false);
	};

	Model.prototype.changeIconPath = function(items) { 
		var me = this;
		$.each(items, function(i, item){
			if(item.icon.substr(0,3)=="$UI"){
				item.icon = require.toUrl(item.icon);
			}
			if(item.items)
				me.changeIconPath(item.items);
		});
	};

	Model.prototype._intTemplateTree = function(source) { 
		this.changeIconPath(source);
			
		$('#jqxTree').jqxTree({
			source : source,
		});
/*		$('#jqxTree').jqxTree('collapseAll');
		var firstChild = $("#jqxTree").find('li:first')[0];
		
		if (firstChild != null) {
			$('#jqxTree').jqxTree('selectItem', firstChild);
			$('#jqxTree').jqxTree('expandItem', firstChild);
		}*/

		var onSelect = function(event) {
			this._initImgScroll(); 
			var args = event.args;
			var item = $('#jqxTree').jqxTree('getItem', args.element);
			/* 叶子节点是模版定义，父节点都是分类 */
			if (!item.hasItems) {
				this.currentTemplateUrl = item.value;
				var sParam = this.currentTemplateUrl.substring(this.currentTemplateUrl.indexOf("?") + 1);
				var paramItems = sParam.split("&");
				var templatePath = "";
				var id = "";
				paramItems.forEach(function(value, key) {
					var param = value.split('=');
					if (param[0] == "templatePath") {
						templatePath = param[1];
					}
					else if (param[0] == "id") {
						id = param[1];
					}
				});
				this.currentTemplatePath = templatePath;
				this.currentId = id;
				
				this.templateEngine.resetTemplatePath(this.currentTemplatePath);
				var config = this.templateEngine.getConfig();
				this.notSupport = config.notSupport; 
				if (!this.notSupport) {
					$("#templateDesc").html(config.desc || "");
					
					this.customNeeded = !(config.custom == "false"); 
					this.getParent().needConfig = this.customNeeded;
					
					var carousel = this.comp("carousel2");
					if(config.images.length >= carousel.contents.getLength()){//图片数量大于页面数量
						for (var i = 0; i < carousel.contents.getLength(); i++) {
							var fImgUrl = require.toUrl(this.currentTemplatePath + '/' + config.images[i]);
							$(carousel.domNode).find("img").eq(i).attr("src" , fImgUrl);
						}
						for (var i = carousel.contents.getLength(); i < config.images.length; i++) {
							var fImgUrl = require.toUrl(this.currentTemplatePath + '/' + config.images[i]);
							carousel.add('<img src="' + fImgUrl + '" style="display:block; margin:0 auto;"/>');
						}
					}else{//页面数量大于图片数量
						for (var i = 0; i < config.images.length; i++) {
							var fImgUrl = require.toUrl(this.currentTemplatePath + '/' + config.images[i]);
							$(carousel.domNode).find("img").eq(i).attr("src" , fImgUrl);
						}
						for (var i = config.images.length; i < carousel.contents.getLength(); i++) {
							carousel.remove(i);
						}
					}
					this.showArrow.set(config.images.length > 1);
				}else {
					$("#templateDesc").html("尚未支持，敬请关注后续版本！");
					$("#imgContainer").html("");
				}
				this.getParent().refreshWizardPageStatus();
			} else {
				this.currentTemplateUrl = null;
				//$("#templateDesc,#imgContainer").html("");
				this.currentTemplatePath = null;
			}
			this.templateSelected.set(!!(this.currentTemplateUrl));			
		};		
		$('#jqxTree').on('select', onSelect.bind(this));
	};
	
	Model.prototype._initImgScroll = function() {
		this.mouseoverImgCount = 0;
		$("#imgWindow").scrollLeft(0);
	};
	
	Model.prototype._recalcTreeHeight = function() {
		//lzg 不需要计算自动高度
		//$('#jqxTree').height($(this.getRootNode()).height());
	};
	
	Model.prototype.modelLoad = function(event) { 
		this.templateEngine = this.getParent().templateEngine;
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
		});
	};
	
	Model.prototype._changeArrowBtnLocation = function() {
		$(".arrow-right").css('left',$("#imgWindow").width()-30);
		$(".lr-btn").css('top',$("#imgContainer").height()/2);
	};
	
	Model.prototype._imgScrollBtn = function() {
		var self=this;
		this.mouseoverImgCount = 0;
		$("#descriptionDiv").mouseover(function(){
			$(".lr-btn").show();
			if(self.mouseoverImgCount==0){
				self._changeArrowBtnLocation();
				self.mouseoverImgCount=1;
			}
		});
		$("#descriptionDiv").mouseout(function(){$(".lr-btn").hide();});
	};
	
	Model.prototype.getTitle = function(wizard) {
		return '选择模板';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};
	
	Model.prototype.hasBackBtn = function(wizard) {		
		return false;
	};
	
	Model.prototype.hasNextBtn = function(wizard) {
		return true;//(!this.notSupport) && this.customNeeded;
	};
	
	Model.prototype.hasFinishBtn = function(wizard) {
		return false;//!this.customNeeded;
	};
	
	Model.prototype.backPage = function(wizard) {
		wizard.back(this);
	};

	Model.prototype.nextPage = function(wizard) {
		if (!this.currentTemplateUrl) 
			return true;
		if(this.customNeeded){
			this.getParent().openPage({
				url: this.currentTemplateUrl,
				id: "configuration",//this.currentId,
				fromId: this.getContext().getRequestParameter("id"), 
				refresh: true//this.lastUrl != this.currentTemplateUrl
			});
			this.lastUrl = this.currentTemplateUrl;
		}else{
			this.getParent().openPage({
				id : "filename",
				url: require.toUrl("./filename.w"),
				fromId: this.getContext().getRequestParameter("id")
			});
		}
		return false;
	};

	Model.prototype.validate = function(wizard){
		return true;
	};
	
	Model.prototype.finish = function(wizard) {
		if (!this.customNeeded) {
		}
	};

	Model.prototype.rightMousedown = function(event){
		var imgWindow=$("#imgWindow");
		var imgContainer=$("#imgContainer");
		if(imgContainer.width()-imgWindow.width()-imgWindow.scrollLeft()>=0){
			imgWindow.scrollLeft(imgWindow.scrollLeft()+300);
			if(imgContainer.width()-imgWindow.width()-imgWindow.scrollLeft()<0)
				imgWindow.scrollLeft(imgContainer.width()-imgWindow.width());
		}
	};
	Model.prototype.leftMousedown = function(event){
		var imgWindow=$("#imgWindow");
		if(imgWindow.scrollLeft()>0){
			imgWindow.scrollLeft(imgWindow.scrollLeft()-100);
		}
	};
	return Model;
});
