define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var modesData = require("$UI/system/designer/service/lib/serverData");
	var dataAssembly = require("$UI/system/designer/service/lib/dataAssembly")

	var Model = function() {
		this.callParent();
		this.isAssembly = justep.Bind.observable("0");
		this.pageNum = justep.Bind.observable("");
		this.status = justep.Bind.observable("new");
	};

	// 数据加载
	Model.prototype.modelLoad = function(event) {
	};

	// 数据加载
	Model.prototype.modelParamsReceive = function(event) {
		this.filePath = this.params.data.path;
		var fullPath = this.params.data.fullPath;
		var currentPath = fullPath.slice(fullPath.lastIndexOf("/") + 1, fullPath.indexOf(".data.m"));
		this.status.set(this.params.data.status);
		this.paramFieldNames = this.params.data.arr;
		var modeTypeData = this.comp("modeTypeData");
		var basicData = this.comp("basicData");
		var quoteData = this.comp("qutoData");
		var nameData = this.comp("nameData");
		var modeTypes = modesData.modeTypes;
		var contents = this.comp("contents1");
		// 加载模型数据类型
		modeTypeData.loadData({
			"@type" : "tabel",
			"rows" : modesData.loadModeData(modeTypes, "type")
		});

		if (!this.filePath) {
			justep.Util.hint("请传入正确路径");
		} else {
			// 加载集合类型
			var assemblyData = this.comp("assemblyData");
			var assemblys = dataAssembly.loadAssemblys(this.filePath,[this.filePath], "value");
			var dataNames = assemblys.dataNames.filter(function(item) {
				return item["value"] !== currentPath;
			})
			assemblyData.loadData({
				"@type" : "table",
				"rows" : dataNames
			})
		}

		quoteData.newData();
		basicData.newData();
		nameData.newData();
		this.pageNum.set(1);
		if (this.status.get() == "new") {
			contents.to(0);
			this.isAssembly.set("0");
			this.status.set("new");
		} else if (this.status.get() == "edit") {
			this.status.set("edit");
			this.isAssembly.set("0");
			var propsList = this.params.data.propsList[0];
			if (propsList) {
				nameData.setValue("name", propsList.name);
				dataType = propsList.dataType;
				if (dataType.indexOf("[") != -1) {
					dataType = dataType.slice(dataType.indexOf("[") + 1, dataType.lastIndexOf("]"));
					this.isAssembly.set("1");
					if (modeTypes.indexOf(dataType) == -1) {
						contents.to(1);
						quoteData.setValue("dataType", this.firstLetterToLowerCase(dataType));
					} else {
						/*
						 * if(propsList.dataType.indexOf("List")!=-1){ }
						 */
						contents.to(0);
						basicData.setValue("dataType", dataType);
					}
				} else {
					if (modeTypes.indexOf(dataType) == -1) {
						contents.to(1);
						quoteData.setValue("dataType", this.firstLetterToLowerCase(dataType));
					} else {
						/*
						 * if(propsList.dataType.indexOf("List")!=-1){ }
						 */
						contents.to(0);
						basicData.setValue("dataType", dataType);
					}
				}
			}

		}
	};

	// 删除当前行
	Model.prototype.removeBtnClick = function(event) {
	};

	// 页面切换时的事件
	Model.prototype.contents1ActiveChange = function(event) {
		if (event.source.active == 0) {
			this.pageNum.set(2);
		} else {
			this.pageNum.set(1)
		}
	};

	// 是否是集合
	Model.prototype.checkbox1Change = function(event) {
		debugger
		if (event.checked) {
			this.isAssembly.set("1");
		} else {
			this.isAssembly.set("0");
		}
	};

	// 取消
	Model.prototype.NOBtnClick = function(event) {
		this.owner.close();
	};

	// 首字母换成大写
	Model.prototype.firstLetterToUpperCase = function(word) {
		return word.replace(word.substr(0, 1), function(key) {
			return key.toUpperCase();
		})
	}

	// 首字母换成小写
	Model.prototype.firstLetterToLowerCase = function(word) {
		return word.replace(word.substr(0, 1), function(key) {
			return key.toLowerCase();
		})
	}

	// ok
	Model.prototype.OkBtnClick = function(event) {
		var param = {};
		var nameData = this.comp("nameData");
		var name = nameData.getValue("name");
		if (!name) {
			justep.Util.hint("名称不能为空")
			return;
		}
		if (this.status.get() == "new") {
			if (this.paramFieldNames.length > 0) {
				if (this.paramFieldNames.indexOf(name) != -1) {
					justep.Util.hint("名称不能重复");
					return;
				}
			}
		}
		param.name = name;
		// 如果切换到引用页面时
		if (this.comp("contents1").active == 1) {
			var quoteData = this.comp("qutoData");
			if (!quoteData.getValue("dataType")) {
				justep.Util.hint("数据类型不能为空")
				return;
			}
			if (this.isAssembly.get() == "1") {
				param.dataType = "List[" + this.firstLetterToUpperCase(quoteData.getValue("dataType")) + "]";
			} else {
				param.dataType = this.firstLetterToUpperCase(quoteData.getValue("dataType"));
			}
		} else if (this.comp("contents1").active == 0) { // 切换到基本页面时
			var basicData = this.comp("basicData");
			if (!basicData.getValue("dataType")) {
				justep.Util.hint("数据类型不能为空")
				return;
			}
			param.dataType = basicData.getValue("dataType");
		}
		this.owner.send({
			data : {
				param : param,
				status : this.status.get()
			}
		})
		this.owner.close();
	};

	return Model;
});