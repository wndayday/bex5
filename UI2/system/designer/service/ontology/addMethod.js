define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var modeData = require("../lib/serverData");

	var Model = function() {
		this.callParent();
		this.pageable = justep.Bind.observable("false");
		this.modify = justep.Bind.observable("false");
		this.methodFront = justep.Bind.observable("find");
		this.result = justep.Bind.observable("");
		this.status = justep.Bind.observable("");
	};

	Model.prototype.NOBtnClick = function(event) {
		this.comp('windowReceiver1').windowCancel();
	};

	Model.prototype.OkBtnClick = function(event) {
		var self = this;
		this.connectWord = [];
		var By = "By";
		var methodData = this.comp("methodData");
		var propsData = this.comp("propsData");
		var orderByData = this.comp("orderByData");
		var methodName = this.methodFront.get();
		var setName = "Set";
		var str = "";
		var params = "";
		var isNull = false;
		methodData.each(function(option) {
			if (!option.row.val("fieldName")) {
				justep.Util.hint("字段名称不能为空");
				isNull = true;
				return false;
			} else {
				var paramNames = [];
				var keyword = option.row.val("keyword");
				var fieldName = option.row.val("fieldName");
				var connectWord = option.row.val("connect");
				if (keyword == "Set") {
					setName += self.firstLetterToUpperCase(fieldName);
				} else if (keyword == "Equal") {
					self.connectWord.push(connectWord);
					params += self.firstLetterToUpperCase(fieldName) + connectWord;
				} else {
					self.connectWord.push(connectWord);
					params += self.firstLetterToUpperCase(fieldName) + keyword + connectWord;
				}
				self.fieldData.forEach(function(item, index) {
					if (item.value == fieldName) {
						str += "\n<param name='" + fieldName + "' dataType='" + item.dataType + "' keyword='" + keyword + "' connect-type='" + connectWord + "' />";
					}
				})
			}
		});
		if (isNull)
			return;
		var row = methodData.getLastRow();
		params = params.substr(0, params.lastIndexOf(self.connectWord[self.connectWord.length - 1]));
		console.log(params);
		console.log(str)
		// result:
		if (propsData.getValue("result")) {
			var result = "\n<result dataType='" + propsData.getValue("result") + "'  />";
		}

		// sql语句：
		if (propsData.getValue("sql")) {
			var sql = "\n<query sql='" + propsData.getValue("sql") + "' />";
		}

		// orderBy:
		if (propsData.getValue("orderBy") == "true") {
			var fieldName = orderByData.getValue("fieldName");
			if (!fieldName) {
				justep.Util.hint("字段名不能为空");
				return;
			} else {
				var type = orderByData.getValue("type");
				var orderProps = "OrderBy" + self.firstLetterToUpperCase(fieldName) + type;
				var order = " order='" + fieldName + ":" + type + "'";
			}
		}
		if (propsData.getValue("modify") == "true") {
			setName = setName.replace("Set", "");
		}
		methodName = methodName + ((setName !== "Set" && setName) ? setName : "") + By + (params ? params : "") + (orderProps ? orderProps : "");
		if (this.status.get() == "new") {
			var isRepeat = false
			if (this.allNames.length > 0) {
				for (var i = 0; i < this.allNames.length; i++) {
					if (methodName === this.allNames[i]) {
						isRepeat = true;
						break;
					}
				}
			}
			if (isRepeat) {
				justep.Util.hint("方法名不能重复");
				return;
			}
		}
		var methodProps = "<method name='" + methodName + "' pageable='" + propsData.getValue("pageable") + "' modify='" + propsData.getValue("modify") + "' isSql='" + (sql ? "true" : "false") + "' " + (order ? order : "");

		var methodXml = methodProps + ">" + (result ? result : "") + (str ? str : "") + (sql ? sql : "") + "\n</method>\n";
		console.log(methodName);
		console.log(methodXml);
		this.comp('windowReceiver1').windowEnsure({
			data : {
				methodName : methodName,
				pageable : propsData.getValue("pageable") || "false",
				modify : propsData.getValue("modify"),
				sql : sql ? "true" : "false",
				// params:paramNames,
				methodXml : methodXml,
				status : this.status.get()
			}
		});
	};

	Model.prototype.windowReceiver1Receive = function(event) {
		var keywordData = this.comp("keywordData");
		var fieldNameData = this.comp("fieldNameData");
		var methodData = this.comp("methodData");
		var propsData = this.comp("propsData");
		var connectData = this.comp("connectData");
		var resultData = this.comp("resultData");
		var jpaKeyword = modeData.jpaKeyword;
		var connectWord = modeData.jpqConnectWord;
		var resultTypes = modeData.modeTypes;
		keywordData.loadData({
			"@type" : "table",
			"rows" : modeData.loadModeData(jpaKeyword, "value")
		});
		resultData.loadData({
			"@type" : "table",
			"rows" : modeData.loadModeData(resultTypes, "type").concat([ {
				type : "LIST"
			}, {
				type : "THIS"
			} ])
		})
		connectData.loadData({
			"@type" : "table",
			"rows" : modeData.loadModeData(connectWord, "word")
		})
		this.fieldData = event.data.fieldData || [];
		var orderByData = this.comp("orderByData");
		fieldNameData.loadData(event.data.fieldData, true);
		propsData.newData();
		orderByData.newData();
		var status = event.data.status;
		if (status == "new") {
			this.allNames = event.data.methodNames;
			this.comp("orderByData").newData();
			this.comp("orderByData").setValue("type", "Asc");
			methodData.newData();
			methodData.setValue("keyword", this.getDataFirstVal(keywordData, "value"));
			methodData.setValue("connect", this.getDataFirstVal(connectData, "word"));
			propsData.setValue("pageable", "false");
			propsData.setValue("modify", "false");
			propsData.setValue("orderBy", "false");
			this.status.set("new")
		} else if (status == "edit") {
			this.status.set("edit")
			this.allNames = event.data.methodNames;
			var methodProps = event.data.methodList[0];
			var paramList = event.data.paramList;
			var resultList = event.data.resultList[0];
			var querySql = event.data.queryList[0];
			if (methodProps) {
				console.log(methodProps.pageable)
				propsData.setValue("pageable", methodProps.pageable);
				propsData.setValue("modify", methodProps.modify);
				propsData.setValue("result", resultList ? resultList.dataType : "");
				propsData.setValue("sql", querySql ? querySql.sql : "");
				// if(methodProps.modify=="true"){
				// this.methodFront.set("update");
				// }else {
				this.methodFront.set("find");
				// }
			}
			var order = methodProps.order;
			if (order) {
				propsData.setValue("orderBy", "true");
				orderByData.setValue("fieldName", order.substr(0, order.indexOf(":")));
				var type = order.substr(order.indexOf(":") + 1);
				orderByData.setValue("type", type || "");
			}
			if (paramList.length > 0) {
				for (var i = 0; i < paramList.length; i++) {
					methodData.newData({
						"defaultValues" : [ {
							"fieldName" : paramList[i].name,
							"keyword" : paramList[i].keyword,
							"connect" : paramList[i]["connect-type"]
						} ]
					})
				}
			}
		}
	};

	Model.prototype.getDataFirstVal = function(data, colName) {
		return data.getFirstRow().val(colName)
	}

	// 添加参数
	Model.prototype.addParamClick = function(event) {
		var methodData = this.comp("methodData");
		methodData.newData();
		methodData.setValue("keyword", this.getDataFirstVal(this.comp("keywordData"), "value"));
		methodData.setValue("connect", this.getDataFirstVal(this.comp("connectData"), "word"))
	};

	Model.prototype.removeBtnClick = function(event) {
		var methodData = this.comp("methodData");
		var row = event.bindingContext.$object;
		methodData.remove(row)
	};

	Model.prototype.checkbox1Change = function(event) {
		var propsData = this.comp("propsData");
		if (event.checked) {
			propsData.setValue("pageable", "true");
			// this.methodFront.set("find");
			propsData.getValue("modify") != "false" && propsData.setValue("modify", "false");
		} else {
			propsData.setValue("pageable", "false");
			// this.methodFront.set("update");
		}
		this.methodFront.set("find");
	};

	Model.prototype.checkbox2Change = function(event) {
		var propsData = this.comp("propsData");
		this.methodFront.set("find");
		if (event.checked) {
			propsData.setValue("modify", "true");
			// this.methodFront.set("update");
			propsData.getValue("pageable") != "false" && propsData.setValue("pageable", "false"), propsData.setValue("orderBy", "false");
			// } else {
			// this.methodFront.set("find");
		}
	};

	Model.prototype.isNotSetKeywordRow = function(data) {
		var lastRow = data.getLastRow();
		if (lastRow.val("connect") === "Set") {
			var index = lastRow.index();
		}
	};

	Model.prototype.firstLetterToUpperCase = function(word) {
		return word.replace(word.substr(0, 1), function(key) {
			return key.toUpperCase();
		})
	}

	Model.prototype.checkbox3Change = function(event) {
		var propsData = this.comp("propsData");
		this.methodFront.set("find");
		if (event.checked) {
			propsData.setValue("orderBy", "true");
			// this.methodFront.set("find");
			propsData.getValue("modify") != "false" && propsData.setValue("modify", "false");
		} else {
			propsData.setValue("orderBy", "false");
			// this.methodFront.set("update");
		}
	};

	Model.prototype.AscCheckboxChange = function(event) {
		var orderBy = this.comp("orderByData");
		if (event.checked) {
			orderBy.setValue("type", "Asc");
		} else {
			orderBy.setValue("type", "Desc");
		}
	};

	Model.prototype.DescCheckboxChange = function(event) {
		var orderBy = this.comp("orderByData");
		if (event.checked) {
			orderBy.setValue("type", "Desc");
		} else {
			orderBy.setValue("type", "Asc");
		}
	};

	return Model;
});