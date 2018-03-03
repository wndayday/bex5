define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var modesData = require("$UI/system/designer/service/lib/serverData");

	var dataAssembly = require("$UI/system/designer/service/lib/dataAssembly")

	var Model = function() {
		this.callParent();
		this.isAssembly = justep.Bind.observable("0");
		this.pageNum = justep.Bind.observable("");
		this.resultType = justep.Bind.observable("");
	};

	// 数据加载
	Model.prototype.modelLoad = function(event) {

	};

	// 数据加载
	Model.prototype.modelParamsReceive = function(event) {
		this.fullPath = this.params.data.fullPath;
		this.filePath = this.params.data.path;
		this.status = this.params.data.status;
		//this.paramFieldNames = this.params.data.paramFieldNames;
		var modeTypeData = this.comp("modeTypeData");
		var basicData = this.comp("basicData");
		var quoteData = this.comp("qutoData");
		var modeTypes = modesData.modeTypes;
		var contents = this.comp("contents1");
		// 加载模型数据类型
		modeTypeData.loadData({
			"@type" : "tabel",
			"rows" : modesData.loadModeData(modeTypes, "type")

		});

		if (!this.filePath) {
			justep.Util.hint("请传入正确路径");
			return

		} else {
			// 加载集合类型
			var assemblyData = this.comp("assemblyData");
			this.quoteAppNames = this.params.data.quoteAppName;
			var quoteFileList = [];
			if (this.quoteAppNames && this.quoteAppNames.length > 0) {
				this.quoteAppNames.forEach(function(item) {
					quoteFileList.push('service/' + item.service);
				})
			}
			this.assemblys = dataAssembly.loadAssemblys(this.filePath, quoteFileList.concat(this.filePath), "value");
			assemblyData.loadData({
				"@type" : "table",
				"rows" : this.assemblys.dataNames
			})
		}

		quoteData.newData();
		quoteData.setValue("checked", "false");
		basicData.newData();
		basicData.setValue("checked", "false");
		this.pageNum.set(1);
		if (this.status == "new") {
			contents.to(0);
			this.isAssembly.set("0");
			this.status = "new";
			this.resultType.set("basic")
		} else if (this.status == "edit") {
			this.status = "edit";
			this.isAssembly.set("0");
			var result = this.params.data.resultList[0];
			if (result) {
				var dataType = result.dataType;
				if (result.resultType == "basic") {
					basicData.setValue("name", result.name);
					this.resultType.set(result.resultType);
					contents.to(0);
					if (dataType.indexOf("List") == -1) {
						basicData.setValue("dataType", dataType);
						basicData.setValue("checked", "false");
					} else {
						dataType = dataType.slice(dataType.indexOf("[") + 1, dataType.lastIndexOf("]"));
						basicData.setValue("dataType", dataType);
						basicData.setValue("checked", "true");
					}
				} else if (result.resultType == "quote") {
					this.resultType.set(result.resultType);
					quoteData.setValue("name", result.name);
					//quoteData.setValue("resultType", result.resultType);
					contents.to(1);
					if (dataType.indexOf("List") == -1) {
						quoteData.setValue("dataType", this.firstLetterToLowerCase(dataType));
						quoteData.setValue("checked", "false");
					} else {
						dataType = dataType.slice(dataType.indexOf("[") + 1, dataType.lastIndexOf("]"));
						quoteData.setValue("dataType", this.firstLetterToLowerCase(dataType));
						quoteData.setValue("checked", "true");
					}
					//2017-1-17
					var fieldNameData = this.comp("fieldNameData");
					this.getCurrentObjfieldName(this.firstLetterToLowerCase(dataType));
					var fieldChildList = this.params.data.fieldChildList;
					console.log('fieldChildList:-------------------' + JSON.stringify(fieldChildList));
					console.log('count:----------'+fieldNameData.count())
					if (fieldChildList.length > 0) {
						fieldChildList.forEach(function(item) {
							fieldNameData.each(function(option) {
								if (item.name === option.row.val('fieldName')) {
									option.row.val('status', '1');
								}
							})
						})
					}
				}
				/*
				 * if (modeTypes.indexOf(dataType) == -1) { debugger
				 * contents.to(1); this.pageNum.set(2);
				 * quoteData.setValue("name", fieldList.name);
				 * quoteData.setValue("dataType",
				 * this.firstLetterToLowerCase(dataType)); } else {
				 * basicData.setValue("name", fieldList.name);
				 * basicData.setValue("dataType", dataType); contents.to(0);
				 * this.isAssembly.set("1"); }
				 */
			}

		}
	};
	
	// 获取引用数据的appName/dataName
	Model.prototype.getQuoteAppNameAndDataName = function(appName, dataName) {
		return this.firstLetterToUpperCase(appName) + '/' + this.firstLetterToUpperCase(dataName);
	}

	// 获取引用数据的路径
	Model.prototype.getQuoteFilePath = function(arr) {
		var newArr = [];
		arr.forEach(function(item) {
			newArr.push('service/' + item.name)
		})
		return newArr;
	}
	
	
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
		if (event.checked) {
			this.comp("basicData").setValue("checked", "true");
		} else {
			this.comp("basicData").setValue("checked", "false");
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
		if (!this.pageNum.get())
			return

		

						

		

		console.log(this.comp("contents1").active)
		// 如果切换到引用页面时
		if (this.comp("contents1").active == 1) {
			this.resultType.set("quote");
			var quoteData = this.comp("qutoData");
			 if (!quoteData.getValue("dataType")) {
				justep.Util.hint("集合名称不能为空")
				return;
			}
			//var quoteName = quoteData.getValue("name");
			/*if (this.status == "new") {
				if (this.paramFieldNames.length > 0) {
					if (this.paramFieldNames.indexOf(quoteName) != -1) {
						justep.Util.hint("名称不能重复");
						return;
					}
				}
			}*/
			
			//2017-1-17新增内容
			 var fieldNameData = this.comp("fieldNameData");
			 var fieldRows = fieldNameData.find([ 'status' ], [ '1' ]);
			if (fieldRows.length > 0) {
				var fieldNameList = [];
				fieldRows.forEach(function(row) {
					fieldNameList.push({
						name : row.val('fieldName')
					})
				})
				param.fieldNameList = fieldNameList;
			}
			 
			if (quoteData.getValue("checked") == "true") {
				param.dataType = "List[" + this.firstLetterToUpperCase(quoteData.getValue("dataType")) + "]";
			} else {
				param.dataType = this.firstLetterToUpperCase(quoteData.getValue("dataType"));
			}
			//param.name = quoteName;
		} else if (this.comp("contents1").active == 0) { // 切换到基本页面时
			this.resultType.set("basic");
			var basicData = this.comp("basicData");
			if (!basicData.getValue("dataType")) {
				justep.Util.hint("集合名称不能为空")
				return;
			}
			//var basicName = basicData.getValue("name");
			/*if (this.status == "new") {
				if (this.paramFieldNames.length > 0) {
					if (this.paramFieldNames.indexOf(basicName) != -1) {
						justep.Util.hint("名称不能重复");
						return;
					}
				}
			}*/
			if (basicData.getValue("checked") == "true") {
				param.dataType = "List[" + basicData.getValue("dataType") + "]";
			} else {
				param.dataType = basicData.getValue("dataType");
			}
			//param.name = basicName
		}
		param.resultType = this.resultType.get();
		param.name="result";
		console.log(param);
		this.owner.send({
			data : {
				param : param,
				status : this.status
			}
		})
		this.owner.close();
	};

	Model.prototype.quoteCheckboxChange = function(event) {
		if (event.checked) {
			this.comp("qutoData").setValue("checked", "true");
		} else {
			this.comp("qutoData").setValue("checked", "false");
		}
	};

	/**

	2017/1-17修改的内容
*/

	Model.prototype.quoteObjChange = function(event){
		var quoteData = this.comp("qutoData");
		this.getCurrentObjfieldName(quoteData.getValue('dataType'));
	};
	
	Model.prototype.getCurrentObjfieldName = function(quote_dataType) {
		console.log('quote_dataType:_-------'+quote_dataType)
		var fieldNameData = this.comp("fieldNameData");
		var dataNames = this.assemblys.dataNames;
		var currentData = dataNames.filter(function(item) {
			return item.value == quote_dataType
		})
		console.log('appName: ' + currentData[0].appName);
		var fieldAllName = dataAssembly.getCurrentAllFieldsName(this.filePath,quote_dataType);
		console.log('fieldAllName:' + fieldAllName)
		fieldNameData.clear();
		fieldNameData.loadData({
			'@type' : 'table',
			'rows' : fieldAllName
		})
	}
	
	
	Model.prototype.fieldCheckboxChange = function(event){
		var row = event.bindingContext.$object;
		if (event.checked) {
			row.val('status', '1');
		} else {
			row.val('status', '0');
		}
	};

	return Model;
});