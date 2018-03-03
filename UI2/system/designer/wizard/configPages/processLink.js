define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModeService = require("$UI/system/components/designerCommon/js/bizModelService");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.targetPath = this.templateEngine.targetPath;
		this.realPath = this.targetPath.substring(this.targetPath.indexOf('UI2') + 3, this.targetPath.length);// 截取UI2下一级全目录/demo/misc/process/order
		
		this.model = bizModeService.parseModel(this.realPath);
		var arr = this.model.getProcessList()
		if(arr == undefined){
			alert("请先在流程设计中添加流程图");
			return;
		}
		var jsonprocess = this.model.findProcess(arr[0].name);// 查找process,返回json格式
		
		var proMsg = [];
		var fileName = this.getParent().getParent().comp('fileName').val();
		if (jsonprocess.businessActivityList != undefined) {// jsonprocess.businessActivityList==
			// undefined说明是静态环节
			if (!this.endWith(fileName, '.m')) {
				for ( var i = 0; i < jsonprocess.businessActivityList.length; i++) {
					var temp = jsonprocess.businessActivityList[i];
					proMsg.push({
						"name" : temp.labelList[0].text,
						"identification" : temp.name,
						"crefile" : temp.name,
					});
				}
			} else {
				for ( var i = 0; i < jsonprocess.businessActivityList.length; i++) {
					var temp = jsonprocess.businessActivityList[i];
					proMsg.push({
						"name" : temp.labelList[0].text,
						"identification" : temp.name,
						"crefile" : temp.name + '.m',
					});
				}
			}
		}
		this.comp("processData").clear();
		if (proMsg.length > 0) {
			this.comp("processData").newData({
				defaultValues : proMsg
			})
		}
/*		this.changeData();*/
	};

	Model.prototype.changeData = function() {
		var parent = this.getParent().getParent();
		var fileNameInput = parent.comp('fileName');
		var processData = this.comp("processData");
		var self = this;
		fileNameInput.on('onChange', function(evt) {
			if (self.endWith(evt.value, '.m')) {
				processData.each(function(param) {
					var row = param.row;
					var crefile = row.val('crefile');
					row.val('crefile', crefile + '.m');
				})
			} else {
				processData.each(function(param) {
					var row = param.row;
					var crefile = row.val('crefile');
					if (self.endWith(crefile, '.m')) {
						row.val('crefile', crefile.substring(0, crefile.length - 2));
					}
				})
			}
		})
	}

	Model.prototype.validate = function(wizard) {
		var data = this.comp("processData");
		var msg = "";
		if (data.getCount() == 0) {
			msg += "不存在流程环节，该向导只支持创建流程\n";
		}
		//判断是否存在流程环节页面文件
		var self = this;
		if(this.getParent().getParent().getParent().resourceTreeView){
			var funcTree = this.getParent().getParent().getParent().resourceTreeView.tree.rootNode;
			data.each(function(option){
				var nodes = funcTree.findAll(function(node){
					return (node.key == self.targetPath + "/" + option.row.val("crefile") + ".w");
				});
				if(nodes.length > 0){
					msg += "一个业务只能包含一个流程。删除全部流程环节页面后，才能使用向导重新生成\n";
					option.cancel = true;
				}
			});
		}
		return msg;
	}

	Model.prototype.finish = function(wizard) {
		var processData = this.comp("processData");
		var self = this;
		var keys = [];
		keys.push({
			"key_id" : "mainData"
		})
		for ( var key in this.templateEngine.getConfig().current.datas) {
			keys.push({
				"key_id" : this.templateEngine.getConfig().current.datas[key]['dataId']
			});
		}
		//var index = 1;
		//var parentFileName = processData.getFirstRow().val("crefile");
		var targetFileName = this.templateEngine.targetFileName;
		processData.each(function(param) {
			var creFile = param.row.val('crefile') + '.w';
			var creFileLabel = param.row.val('name');
			//if (index > 1) {
				//self.templateEngine.addContext(self.templateFile, "parent", parentFileName + '.w', creFile, creFileLabel);
			//} else {
				self.templateEngine.addContext(self.templateFile, "keys", keys, creFile, creFileLabel);
				self.templateEngine.addContext(self.templateFile, "parent", targetFileName + ".w", creFile, creFileLabel);
			//}
			//index++;
		});
	}

	Model.prototype.endWith = function(str, endWithStr) {// 判断字符串结尾是否以某字符串结尾
		return str.substring(str.length - endWithStr.length, str.length) === endWithStr;
	}

	return Model;
});