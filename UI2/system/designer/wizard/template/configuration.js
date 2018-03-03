/* ------------------------------------------------------------ 
配置页面主调度
配置页面本身作为向导主页面（wizard）的子页面，提供通用的多页配置

配置页面接口：
	getTitle = function(wizard)
	hasCancelBtn = function(wizard)
	hasBackBtn = function(wizard)		
	hasNextBtn = function(wizard)
	hasFinishBtn = function(wizard)
	nextPage = function(wizard)
	validate = function(wizard)
	finish = function(wizard)

配置页面子页面接口:
	validate = function(wizard)
	finish = function(wizard)
------------------------------------------------------------ */

define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	//var XML = require("$UI/system/lib/base/xml");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");

	var Model = function() {
		this.callParent();

		this.pageIdx = 0;
		this.itemElementMap = {};
		this.idNode = [];
	};

	Model.prototype._createCompose = function(id, src, templateFile, dialog) {
		var src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id 
				+ (templateFile ? ("&templateFile=" + templateFile) : "")
				+ (dialog ? ("&dialog=" + dialog) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src,
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('cfg-compose');
		return compose;
	};

	Model.prototype._openPage = function(id, url, templateFile, dialog) {
		var composes = $(".cfg-compose");
		for ( var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var composeNode = document.getElementById(id);
			if (!composeNode) {
				this.currentCompose = this._createCompose(id, url, templateFile, dialog);
				composeNode = this.currentCompose.domNode;
				this.idNode.push(composeNode);
			} else {
				this.currentCompose = Component.getComponent(composeNode);
				this.currentCompose.load();//这样会触发参数接收事件，可用于刷新页面
			}

		composeNode.style.display = "block";
	};

	Model.prototype._composeLoaded = function(event) {
	};

	Model.prototype._recalcNavHeight = function() {
		$('.cfg-nav').height($(this.getRootNode()).height());
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		var items = this.templateEngine.getConfig().items;
		
		var defaultValues = [];
		for ( var i = 0; i < items.length; i++) {
			var templateFile = items[i].file;
			if (items[i].configPage) {
				defaultValues.push({
					require : items[i].require,
					setting : items[i].text,
					configPage : items[i].configPage,
					file : items[i].file,
					dialog : items[i].dialog,
					id : "id" + i
				});
			}
		}
		
		var data = this.comp('data');
		data.newData({
			defaultValues : defaultValues
		});
		data.first();

		this._recalcNavHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcNavHeight();
		});
		
	};

	Model.prototype.pageClick = function(event) {
		var data = this.comp("data");
		data.to(data.getRowID(event.bindingContext.$object));
	};

	Model.prototype.dataIndexChanged = function(event) {
		var data = event.source; 
		this._openPage(data.val("id"), require.toUrl(data.val("configPage")), data.val("file"), data.val("dialog"));
	};

	Model.prototype.getTitle = function(wizard) {
		return '模板配置';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.validate = function(wizard) {
		var data = this.comp("data");
		var validated = true;
		data.each(function(options) {
			var row = options.row;
			var id = data.val('id', row);
			var pageName = data.getValue('setting', row);
			var composeNode = document.getElementById(id);
			if (!composeNode) {
				alert(pageName + '：没有配置');
				validated = false;
				return;
			} else if (composeNode) {
				var currentCompose = Component.getComponent(composeNode);
				var pageModel = currentCompose.getInnerModel();
				if (pageModel && pageModel.validate) {
					var msg = pageModel.validate(wizard);
					if (msg) {
						alert(pageName + '：' + msg);
						validated = false;
						return;
					}
				}
			}
		});
		return validated;
	};

	/**
	 * 向导完成.
	 * 
	 * @param event
	 */
	Model.prototype.finish = function(wizard) {
		/* 调用每个配置项的完成操作 */
		var composes = $(".cfg-compose");
		for ( var i = 0; i < composes.length; i++) {
			Component.getComponent(composes[i]).getInnerModel().finish(wizard);
		}
	};

	Model.prototype.getItemAttr = function(attr) {
		var data = this.comp('data');
		return data.val(attr);
	};

	Model.prototype.getItemPramValue = function(paramId) {
		var item = this.itemElementMap[this.getItemAttr("id")];
		var param = $("param[id='" + paramId + "']", item).eq(0);
		if (param && param.length > 0)
			return param.attr("value");
		else
			return "";
	};

	Model.prototype.validatePage = function() {
		var validated = true;
		var data = this.comp("data");
		var id = data.getValue('id');
		var pageName = data.getValue('setting');
		var composeNode = document.getElementById(id);
		if (!composeNode) {
			alert(pageName + '：没有配置');
			validated = false;
		} else if (composeNode) {
			var currentCompose = Component.getComponent(composeNode);
			var pageModel = currentCompose.getInnerModel();
			if (pageModel && pageModel.validate) {
				var msg = pageModel.validate();
				if (msg) {
					alert(pageName + '：' + msg);
					validated = false;
				}
			}
		}
		return validated;
	};

	Model.prototype.backPage = function(wizard) {
		var data = this.comp("data");
		if(data.getRowIndex(data.getCurrentRow()) == 0){
			var len = this.idNode.length;
			if ( len> 0) {
				for(var key in this.idNode){
					if (this.idNode[key]) {
						this.idNode[key].remove();
					}
				}
			}
			var config = this.templateEngine.getConfig();
			config.current = {};
		
			wizard.back(this);
		}else{
			data.pre();
		}
	};

	Model.prototype.nextPage = function(wizard) {
		if(this.validatePage()){
			var data = this.comp("data");
			if(data.getRowIndex(data.getCurrentRow()) == data.getCount() - 1){
		
				this.getParent().openPage({
					id : "filename",
					url: require.toUrl("./filename.w"),
					fromId: this.getContext().getRequestParameter("id")
				});
				return false;
			}else{
				data.next();
				return true;
			}
		}else
			return true;
	};

	return Model;
});


