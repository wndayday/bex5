define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var loadTreeJs = require("$UI/system/components/designerCommon/tree/tree");
	loadTreeJs($);
	var Model = function() {
		this.callParent();
		// 后缀类型
		this.checkType = null;
		this.rootDir = null;
		this.selectedFile = justep.Bind.observable(null);
	};

	Model.prototype._initGridScroll = function() {
		var grid = this.getElementByXid('grid');
		$(grid).jqxGrid('scrolloffset', 0, 0);
	};

	Model.prototype.clGridSize = function(){
		var $root = $(this.getRootNode());
		var height = $root.innerHeight() - $root.find('.file-select-navbar').outerHeight() - this.comp('OKBtn').$domNode.outerHeight()-36;
		var width = $root.innerWidth() - 30;
		return {
			width : width,
			height : height
		};
	};
	
	Model.prototype._changeGridSize = function() {
		if(this.gridHidden) return;
		var grid = this.getElementByXid('grid');
		
		$(grid).jqxGrid(this.clGridSize());
	};

	Model.prototype._changeTreeSize = function() {
		var tree = $('.TreeFile');
		tree.jqxTree(this.clGridSize());
	};

	Model.prototype._hideGrid = function(hidden) {
		var grid = this.getElementByXid('grid');
		this.gridHidden = hidden;
		if (hidden) {
			$(grid).hide();
		} else {
			$(grid).show();
			this._changeGridSize();
		}
	};

	Model.prototype._getExtendConfigCatalog = function(extendConfigCatalog, queryValue) {
		data = {
			extendConfigCatalog : extendConfigCatalog,
			queryValue : queryValue,
			checkType : this.checkType
		};
		var url = require.toUrl("$UI/system/components/designerCommon/propEdtorPages/fileSelector/fileSelectView.j");
		var options = {};
		options.url = url;
		options.dataType = "json";
		options.contentType = "json";
		options.postData = data;
		var objResult = this.getRequest(options);
		var jsonResult = objResult.responseText;
		return jsonResult;
	};

	Model.prototype.getRequest = function(options) {
		var self = this;
		 return $.ajax({
			async : false,
			data : JSON.stringify(options.postData),
			dataType : options.dataType,
			contentType : options.contentType,
			type : 'POST',
			url : options.url,
				success : function(result) {
					if (self.buildFinishedNotify) {
						self.buildFinishedNotify(result);
					}
				},
				error : function(xhr, status, err) {
					if (self.buildFinishedNotify) {
						self.buildFinishedNotify({
							flag : false,
							message : err
						});
					}
				}
		});
	}

	Model.prototype._intTemplateTree = function(source) {
		var tree = $('.TreeFile');
		tree.jqxTree('clear');
		var option = this.clGridSize();
		option.source = source;
		tree.jqxTree(option);
	};

	Model.prototype._intTemplateTreeEvent = function() {
		var self = this;
		var tree = $('.TreeFile');
		tree.on('select', function(event) {
			var args = event.args;
			var item = $('.TreeFile').jqxTree('getItem', args.element);
			var label = item.label;
			// alert("You selected a " + label);
			self.selectFileClick(item.value);
		});
		tree.on('expand', function(event) {
			var label = tree.jqxTree('getItem', event.args.element).label;
			var $element = $(event.args.element);
			var loader = false;
			var loaderItem = null;
			var children = $element.find('ul:first').children();
			$.each(children, function() {
				var item = tree.jqxTree('getItem', this);
				if (item && item.label == 'Loading...') {
					loaderItem = item;
					loader = true;
					return false;
				}
				;
			});
			if (loader) {
				var extendConfigCatalog = self._getExtendConfigCatalog(loaderItem.value);
				var items = jQuery.parseJSON(extendConfigCatalog);
				tree.jqxTree('addTo', items, $element[0]);
				tree.jqxTree('removeItem', loaderItem.element);
			}
		});
	};

	Model.prototype._intTemplateGridEvent = function() {
		var self = this;
		var grid = this.getElementByXid('grid');
		$(grid).on('rowselect', function(event) {
			var args = event.args;
			var value = args.row.colValue;
			var temp = null;
			while (value.indexOf('<') != -1 && value.indexOf('>') != -1) {
				temp = value.substring(value.indexOf('<'), value.indexOf('>') + 1).replace(/\//g, "\\/");
				value = value.replace(new RegExp(temp), "");
			}
			self.selectFileClick(value);
		});
	};

	Model.prototype.modelLoad = function(event) {
		var initData = xuiService.getPageParams();// 获取传入的参数
		if(initData && initData.propName){
			this.checkType = initData.editorParameter;
			this.propName = initData.propName;
		}else
			$(".btn-div").removeClass('hide');
		if (!this.checkType) {
			this.checkType = "*.w";
		}
		if (!this.rootDir) {
			this.rootDir = "/UI2";
		}
		this._hideGrid(true);
		var extendConfigCatalog = this._getExtendConfigCatalog(this.rootDir);
		extendConfigCatalog = eval("(" + extendConfigCatalog + ")");
		this._intTemplateTree(extendConfigCatalog);
		this._intTemplateTreeEvent();
		this._intTemplateGridEvent();
		// 添加浏览器事件
		var self = this;
		$(window).resize(function() {
			self._changeGridSize();
			self._changeTreeSize();
		});
	};

	Model.prototype.queryButtonClick = function(event) {
		$('.TreeFile').hide();
		var queryValue = document.getElementById("queryInput").value;
		if (queryValue == "" || queryValue == null || queryValue.trim() == "") {
			$('.TreeFile').show();
			this._hideGrid(true);
		} else {
			var extendConfigCatalog = this._getExtendConfigCatalog(this.rootDir, queryValue);
			extendConfigCatalog = eval("(" + extendConfigCatalog + ")");
			this._hideGrid(false);
			this.comp('fileSelectData').loadData(extendConfigCatalog.data);
			this._initGridScroll();
			this._changeGridSize();
		}
	};

	Model.prototype.input1Keydown = function(event) {
		if (event.keyCode == 13) {
			this.queryButtonClick();
		}
		return true;
	};

	// 过滤，只有选中指定的文件类型才合法
	var imgTypes = ['.gif','.jpg','.png','.jpeg','.bmp'];
	var isImg = function(fileName){
		var ret = false;
		$.each(imgTypes, function(i,type){
			var s = fileName.toLowerCase();
			if(s.substring(s.length-type.length)==type){
				ret = true;
				return false;
			}
		});
		return ret;
	};
	
	Model.prototype.showImgView = function(fileName){
		var $imgView = $('.imgView',this.getRootNode());
		$imgView.children("img").attr('src',require.toUrl(fileName));
		$imgView.removeClass('hide');
	};
	 
	Model.prototype.hideImgView = function(){
		$('.imgView',this.getRootNode()).addClass('hide');
	};

	Model.prototype.selectFileClick = function(value) {
		var types = this.checkType.split(';');
		for ( var i = 0; i < types.length; i++) {
			if ("" != types[i].trim()) {
				if (value.indexOf(types[i].replace(/\*/, "")) != -1) {
					var parent = value.indexOf('UI2') == -1 ? value.substring(value.indexOf('UI')) : '$UI' + value.substring(value.indexOf('UI2')).substring(3);
					this.selectedFile.set(parent);
					break;
				} else {
					this.selectedFile.set(null);
				}
			} else {
				// 可以选中文件，类型传值时慎重不要轻易传递空，否则可以选择目录了
				var parent = value.indexOf('UI2') == -1 ? value.substring(value.indexOf('UI')) : '$UI' + value.substring(value.indexOf('UI2')).substring(3);
				this.selectedFile.set(parent);
				break;
			}
		}
		var fileName = this.selectedFile.peek();
		(fileName && isImg(fileName))?this.showImgView(fileName):this.hideImgView();
	};
	Model.prototype.OKBtnClick = function(event){
		this.owner.send({file:this.selectedFile.peek()});
		this.owner.close();
	};
	
	Model.prototype.beforeOkAction = function(){
		if(!this.selectedFile.peek()) return '请先选择相关文件!';
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
		var ret = {};
		ret[this.propName] = this.selectedFile.peek();
		return ret;
	};
	
	return Model;
});