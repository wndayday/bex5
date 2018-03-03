define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var commonSelector = require("$UI/system/designer/webIde/common/commonSelector");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = ideService.getXCloudService();

	var Model = function() {
		this.callParent();
	};

	Model.prototype.getReturnValue = function() {
		// 这里实现返回的逻辑
		var cfg = {
			value : this.selector.getValue()
		};
		if (this.propName) {
			cfg[this.propName] = cfg.value;
		}
	};

	Model.prototype.modelLoad = function(event) {
	};

	Model.prototype.modelParamsReceive = function(event) {
		var initData = {"extName" : "service.m"}// xuiService.getPageParams();
		this.propName = initData.propName;
		initData.parent = this.getElementByXid("content");
		// var appPath = sessionStorage.getItem("appPath");
		var item = xCloudService.getFileTree({
			filePath : "service",
			extName : initData.extName
		});
		if (item.children.length != 0 && item.children[0].children != undefined) {
			item = item.children[0].children;
		}
		initData.data = item;
		initData.isTree = true;
		initData.className = 'fileTreeSelector';
		this.selector = new commonSelector(initData);

		this.comp('panel').$domNode.css({
			height : 'auto',
			width : '100%'
		});
	};

	Model.prototype.okBtnClick = function(event) {
		var value = this.selector.getValue();
		if (!value) {
			justep.Util.hint("选择不能为空");
			return;
		}
		/*
		 * if(this.key==="chooseApp"){ if(/\.xml$/.test(value)){
		 * justep.Util.hint("请选择应用的目录，非文件"); return; }else {
		 * value=value.substr(value.lastIndexOf("/")+1); } }
		 */
		if (value.lastIndexOf(".service.m") == -1) {
			justep.Util.hint("请选择后缀为service.m的文件");
			return;
		}
		this.owner.send({
			serviceName : value
		});
		this.selector.dispose();
		this.owner.close()
	};

	Model.prototype.noBtnClick = function(event) {
		this.selector.dispose();
		this.owner.close();
	};

	return Model;
});