define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	var EditorManager = require("$UI/system/designer/webIde/lib/editorManager");
	var TextEditor = require("$UI/system/designer/webIde/common/TextEditor");
	var xmlUtil = require('$UI/system/lib/base/xml');

	/* 新增的** -------------------------------------- */
	var constraintsArr = require("../lib/constraintsTags");

	var loadMode = require("../lib/serverData");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		// 获取文件路径
		this.filePath = this.getContext().getRequestParameter("filePath");
		// 加载文档模型对象
		this.bizDoc = bizModel.loadFile(this.filePath, true);

		var propertyData = this.comp("propertyData");
		var constraintsData = this.comp("constraintsData");
		var fieldData = this.comp("fieldData");
		// 加载关系数据
		var list = this.queryPropertyList();
		var typeData = this.comp('typeData');
		/* 新增的**-------------------------------------- */
		var arr = loadMode.modeTypes;

		typeData.loadData({
			"@type" : "table",
			"rows" : loadMode.loadModeData(arr, "value")
		})
		/*
		 * for (var i = 0; i < list.length; i++) { if
		 * ($.inArray(list[i]["dataType"], arr) == -1) {
		 * arr.push(list[i]["dataType"]); } }
		 */
		this.comp('propertyData').loadData({
			"@type" : "table",
			"rows" : list
		});
		this.comp('propertyData').first();

		var mappingList = this.queryMappingList();
		this.comp('propertyMappingData').loadData({
			"@type" : "table",
			"rows" : mappingList
		});
		this.comp('propertyMappingData').first();

		var tableArr = this.filePath.split("/");
		var table = tableArr[tableArr.length - 1].substring(0, tableArr[tableArr.length - 1].indexOf("."));
		var mappingTableName = this.queryMappingTableName();
		if (mappingTableName.length > 0) {
			this.comp('tableInput').val(mappingTableName[0].table);
		} else {
			this.comp('tableInput').val(table);
		}

		var methodList = this.queryMethodList();
		this.comp('methodData').loadData({
			"@type" : "table",
			"rows" : methodList
		});
		this.comp('methodData').first();

		if (this.comp('methodData').count() > 0) {
			var name = this.comp('methodData').getCurrentRow().val('name');
			var paramList = this.queryParams(name);
			this.comp('paramData').loadData({
				"@type" : "table",
				"rows" : paramList
			});
			this.comp('paramData').first();
		}

		var validationList = this.queryValidationList();
		constraintsData.loadData({
			"@type" : "table",
			"rows" : validationList
		});
		// constraintsData.first();

		// 加载实体字段选项
		this.loadValidFieldData(propertyData, fieldData);
		this.addValidation();

	};

	/** 标准接口-是否已经改动 * */
	Model.prototype.isModified = function() {

	}

	/** 查询当前的property** */
	Model.prototype.queryCurrentProps = function(name) {
		return this.bizDoc.queryAsJson("class>property[name='" + name + "']", function($node, jsonItem) {

		})
	};

	/** 查询property* */
	Model.prototype.queryPropertyList = function() {
		var list = this.bizDoc.queryAsJson("class>property", function($node, jsonItem) {

		});
		return list;
	}
	/** 查询mappingTable* */
	Model.prototype.queryMappingTableName = function() {
		var list = this.bizDoc.queryAsJson("mapping", function($node, jsonItem) {

		});
		return list;
	}

	/** 查询mapping* */
	Model.prototype.queryMappingList = function() {
		var list = this.bizDoc.queryAsJson("mapping>property", function($node, jsonItem) {

		});
		return list;
	}
	/** 查询param* */
	Model.prototype.queryParams = function(name) {
		var list = this.bizDoc.queryAsJson("access>method[name='" + name + "']>param", function($node, jsonItem) {

		});
		return list;
	}
	/** 查询validation* */
	Model.prototype.queryValidationList = function(name) {
		var list = this.bizDoc.queryAsJson("validator>constraints", function($node, jsonItem) {
		});
		return list;
	}

	/** 查询method* */
	Model.prototype.queryMethodList = function() {
		var list = this.bizDoc.queryAsJson("access>method", function($node, jsonItem) {
			var dataType = $node.find("result").attr("dataType");
			if (dataType) {
				jsonItem.dataType = dataType;
			}
			var modify = $node.find("query").attr("modify");
			if (modify) {
				jsonItem.modify = modify;
			}
			var query = $node.find("query").attr("sql");
			if (query) {
				jsonItem.query = query;
			}
		});
		return list;
	}

	/** 删除property * */
	Model.prototype.removePropertyData = function(name) {
		this.bizDoc.remove("class>property[name = '" + name + "']:first");

	}
	/** 删除mappingProperty * */
	Model.prototype.removeMappingPropertyData = function(name) {
		this.bizDoc.remove("mapping>property[name = '" + name + "']:first");

	}

	/** 删除method * */
	Model.prototype.removeMethod = function(name) {
		this.bizDoc.remove("access>method[name = '" + name + "']:first");

	}
	/** 删除result * */
	Model.prototype.removeResult = function(name) {
		this.bizDoc.remove("access>method[name = '" + name + "']>result:first");

	}
	/** 删除param * */
	Model.prototype.removeParam = function(name, paramName) {
		this.bizDoc.remove("access>method[name = '" + name + "']>param[name = '" + paramName + "']:first");

	}
	/** 删除validation * */
	Model.prototype.removeValidation = function(target) {
		this.bizDoc.remove("validator>constraints[target = '" + target + "']:first");

	}

	/** 添加property * */
	Model.prototype.addProperty = function(attrs) {
		if ($(this.bizDoc.docRoot).find("class").length == 0) {
			this.bizDoc.append("", "<class></class>");
		}
		this.bizDoc.append("class", "<property></property>", attrs);

	}
	/** 添加mapping * */
	Model.prototype.addMapping = function(attrs) {
		if ($(this.bizDoc.docRoot).find("mapping").length == 0) {
			this.bizDoc.append("", "<mapping></mapping>");
		}
		this.bizDoc.append("mapping", "<property></property>", attrs);

	}
	/** 添加method * */
	Model.prototype.addAccessMethod = function(attrs) {
		if ($(this.bizDoc.docRoot).find("access").length == 0) {
			this.bizDoc.append("", "<access></access>");
		}
		this.bizDoc.append("access", "<method></method>", attrs);

	}
	/** 添加result * */
	Model.prototype.addResult = function(name, attrs) {
		this.bizDoc.append("access>method[name='" + name + "']", "<result></result>", attrs);

	}
	/** 添加sql * */
	Model.prototype.addSQL = function(name, attrs) {
		this.bizDoc.append("access>method[name='" + name + "']", "<query></query>", attrs);

	}
	/** 添加param * */
	Model.prototype.addParam = function(name, attrs) {
		this.bizDoc.append("access>method[name='" + name + "']", "<param></param>", attrs);

	}
	/** 添加validation * */
	Model.prototype.addValidation = function(attrs) {

		if ($(this.bizDoc.docRoot).find("validator").length == 0) {
			this.bizDoc.append("", "<validator></validator>");
		}
		// this.bizDoc.append("validations", "<validation></validation>",
		// attrs);

	}

	/** 设置property属性* */
	Model.prototype.setProperyAttrs = function(name, attrs) {
		this.bizDoc.setAttr("class>property[name='" + name + "']:first", attrs);
	}
	/** 设置mapping属性* */
	Model.prototype.setMappingAttrs = function(name, attrs) {
		this.bizDoc.setAttr("mapping>property[name='" + name + "']:first", attrs);
	}
	/** 设置method属性* */
	Model.prototype.setMethodAttrs = function(name, attrs) {
		this.bizDoc.setAttr("access>method[name='" + name + "']:first", attrs);
	}
	/** 设置sql属性* */
	Model.prototype.setSQLAttrs = function(name, attrs) {
		this.bizDoc.setAttr("access>method[name='" + name + "']>query:first", attrs);
	}
	/** 设置param属性* */
	Model.prototype.setParamAttrs = function(name, paramName, attrs) {
		this.bizDoc.setAttr("access>method[name='" + name + "']>param[name='" + paramName + "']:first", attrs);
	}
	/** 设置param属性* */
	Model.prototype.setValidationAttrs = function(property, type, attrs) {
		this.bizDoc.setAttr("validations>validation[property = '" + property + "'][type = '" + type + "']:first", attrs);
	}
	/** 设置mappingtable属性* */
	Model.prototype.setMappingTableAttrs = function(attrs) {
		if ($(this.bizDoc.docRoot).find("mapping").length == 0) {
			this.bizDoc.append("", "<mapping></mapping>");
		}
		this.bizDoc.setAttr("mapping", attrs);
	}

	/** 删除method属性* */
	Model.prototype.deleteMethodAttrs = function(name, attrName) {
		this.bizDoc.removeAttr("access>method[name='" + name + "']:first", attrName);
	}
	// 删除SQL属性
	Model.prototype.removeSQLAttrs = function(name, attrName) {
		this.bizDoc.removeAttr("access>method[name='" + name + "']>query:first", attrName)
	}

	Model.prototype.deleteRelationBtnClick = function(event) {
		var row = this.comp('propertyData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中行");
			return;
		}
		this.comp('propertyData').remove(row);
		this.removePropertyData(row.val('name'));
	};

	Model.prototype.moveUpBtnClick = function(event) {
		var row1 = this.comp('propertyData').getCurrentRow();
		if (!row1) {
			justep.Util.hint("请先选中一行");
			return;
		}
		var name = row1.val('name');
		this.comp('propertyData').pre();
		var row2 = this.comp('propertyData').getCurrentRow();
		var namePre = row2.val('name');
		if (name == namePre) {
			justep.Util.hint("已经是第一行");
			return;
		}
		this.comp('propertyData').exchangeRow(row1, row2);
		this.comp('propertyData').pre();
		var demo = $(this.bizDoc.docRoot).find("class>property[name='" + name + "']:first");
		var xml = xmlUtil.toString(demo[0]).replace("xmlns=\"http://www.justep.com/model\"", "");
		this.removePropertyData(name);
		this.bizDoc.insertBefore("class>property[name='" + namePre + "']:first", xml);
	};

	Model.prototype.moveDownBtnClick = function(event) {
		var row1 = this.comp('propertyData').getCurrentRow();
		if (!row1) {
			justep.Util.hint("请先选中一行");
			return;
		}
		var name = row1.val('name');
		this.comp('propertyData').next();
		var row2 = this.comp('propertyData').getCurrentRow();
		var nameNext = row2.val('name');
		if (name == nameNext) {
			justep.Util.hint("已经是最后一行");
			return;
		}
		this.comp('propertyData').exchangeRow(row1, row2);
		this.comp('propertyData').next();

		var demo = $(this.bizDoc.docRoot).find("class>property[name='" + nameNext + "']:first");
		var xml = xmlUtil.toString(demo[0]).replace("xmlns=\"http://www.justep.com/model\"", "");
		this.removePropertyData(nameNext);
		this.bizDoc.insertBefore("class>property[name='" + name + "']:first", xml);
	};

	// 生成数据库表

	Model.prototype.button2Click = function(event) {
		var modelPath = bizModel.fetchModelPath(this.filePath);
		modelPath = modelPath.replace("/ontology", "/data");
		this.comp("windowDialog1").open({
			params : {
				modelPath : modelPath
			}
		});
	};

	// 源码按钮
	Model.prototype.sourceBtnClick = function(event) {
		// this.bizDoc.save();
		var self = this;
		if (!self.sourceEditor) {
			self.bracketsEditorManager = EditorManager.createBracketsEditor(self.getElementByXid('content3'));
			self.bracketsEditorManager.then(function(manager) {
				$(self.getElementByXid("loadingLabel")).hide();
				self.sourceEditor = new TextEditor({
					mode : "xml",
					contentChange : function() {debugger
						if (!self.isFirst) {
							self.xmlChanged = true;
							// if(self.timer){
							// clearTimeout(self.timer);
							// }
							// self.timer = setTimeout(function(){ //源码修改后要更新模型
							// self.xmlChanged = true;
							// self.bizDoc.setContent(self.sourceEditor.getContent());
							// },500);
							self.bizDoc.setContent(self.sourceEditor.getContent());
						}
						self.isFirst = false;
					},
					mainModel : self,
					filePath : self.filePath,
					autoLoad : false,
					manager : manager
				});
				self.sourceEditor.setContent(self.bizDoc.asXml(),true);
				self.sourceEditor.show();
			});
		}else {
			self.sourceEditor.setContent(self.bizDoc.asXml());
		}

	};

	Model.prototype.designBtnClick = function(event) {
		this.isSourceEditor = false;
		if(this.xmlChanged){//如果源码修改，需要重新加载流程图
			this.bizDoc.setContent(this.sourceEditor.getContent());
		}
		this.xmlChanged = false;
	};

	// 反向生成本体
	Model.prototype.d2oBtnClick = function(event) {
		var modelPath = bizModel.fetchModelPath(this.filePath);
		modelPath = modelPath.replace("/ontology", "/data");
		this.comp("d2oDlg").open({
			params : {
				modelPath : modelPath,
				filePath : this.filePath,
				mappingFilePath : this.mappingFilePath
			}
		});
	};

	// 反向生成本体结束
	Model.prototype.d2oDlgReceived = function(event) {
		// 重新初始化界面数据
	};

	Model.prototype.addPropertyClick = function(event) {
		var arr = [];
		var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
		this.comp('propertyData').each(function(option) {
			arr.push(option.row.val('name'));
		})
		var data = {
			arr : arr,
			path : path
		}
		this.comp('addPropertyDialog').open({
			data : {
				status : "new",
				path : path,
				arr : arr,
				fullPath : this.filePath
			},
		});
	};

	Model.prototype.addPropertyDialogReceived = function(event) {
		var param = event.data.data.param;
		var status = event.data.data.status;
		var propertyData = this.comp("propertyData");
		var attrs = {};
		if (param) {
			if (status == "new") {
				propertyData.newData({
					defaultValues : [ {
						name : param.name,
						dataType : param.dataType
					} ]
				});
				attrs = {
					name : param.name,
					dataType : param.dataType
				}
				this.addProperty(attrs);
			} else if (status == "edit") {
				var self = this;
				propertyData.each(function(option) {
					if (self.editRow.val("name") == option.row.val("name")) {
						option.row.val("name", param.name);
						option.row.val("dataType", param.dataType);
						attrs = {
							name : param.name,
							dataType : param.dataType
						}
					}
				})
				self.setProperyAttrs(self.editRow.val("name"), attrs)
			}
		}
	};

	Model.prototype.propertyDataValueChange = function(event) {
		var me = this;
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		if (col == "primary") {
			if (newValue) {
				var rows2 = me.comp('propertyData').find([ 'primary' ], [ newValue ]);
				if (rows2.length > 0) {
					event.oldValue = newValue;
					event.newValue = oldValue;
					justep.Util.hint("不能同时含有两个主键");
					return;

				}
			}
		}
		var attr = {};
		attr[col] = newValue;
		this.setProperyAttrs(name, attr);

	};

	// 添加字段映射
	Model.prototype.addPropertyMap = function(event) {
		var me = this;
		var arr = [];
		this.comp('propertyMappingData').each(function(option) {
			arr.push(option.row.val('name'));
		})
		var data = {
			path : me.filePath,
			arr : arr
		}
		this.comp('addPropertyMappingDialog').open({
			data : data
		});
	};

	// 删除字段映射
	Model.prototype.deletePropertyMap = function(event) {
		var row = this.comp('propertyMappingData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中行");
			return;
		}
		this.comp('propertyMappingData').remove(row);
		this.removeMappingPropertyData(row.val('name'));

	};

	Model.prototype.addPropertyMappingDialogReceived = function(event) {
		var rows = event.data.data;
		var me = this;
		var propertyMappingData = this.comp('propertyMappingData');
		for (var i = 0; i < rows.length; i++) {
			propertyMappingData.newData({
				defaultValues : [ {
					name : rows[i].val('name'),
					column : rows[i].val('name')
				} ]
			});
			var attrs = {
				name : rows[i].val('name'),
				column : rows[i].val('name')
			}
			me.addMapping(attrs);

		}
	};

	Model.prototype.propertyMappingDataValueChange = function(event) {
		var me = this;
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		
		var attr = {};
		attr[col] = newValue;
		console.log(attr)
		if(name){
			this.setMappingAttrs(name, attr);
		}
	};

	Model.prototype.deleteMethod = function(event) {
		var row = this.comp('methodData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中行");
			return;
		}
		this.comp('methodData').remove(row);
		this.removeMethod(row.val('name'));

		this.comp('paramData').clear();
		var paramList = this.queryParams(row.val('name'));
		this.comp('paramData').loadData({
			"@type" : "table",
			"rows" : paramList
		});
		this.comp('paramData').first();

	};

	Model.prototype.methodDataValueChange = function(event) {
		var me = this;
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		if (col == "name") {
			var rows2 = me.comp('methodData').find([ 'name' ], [ newValue ]);
			/*
			 * if (rows2.length > 0) { event.oldValue = newValue; event.newValue =
			 * oldValue; justep.Util.hint("name不能重名"); return;
			 *  } ; if (!newValue) { event.oldValue = newValue; event.newValue =
			 * oldValue; justep.Util.hint("name不能为空"); return;
			 *  }
			 */
			;

			var attr = {};
			attr[col] = newValue;
			me.setMethodAttrs(name, attr);
		} else if (col == "type") {
			if (newValue) {
				var attr = {};
				attr[col] = newValue;
				me.setMethodAttrs(name, attr);
			} else {
				me.deleteMethodAttrs(name, col);

			}
		} else if (col == "dataType") {
			if (newValue) {
				me.removeResult(name);
				var attr = {};
				attr[col] = newValue;
				me.addResult(name, attr);
			}

		} else if (col == "sql") {
			var demo = $(me.bizDoc.docRoot).find("access>method[name='" + name + "']>query");
			var attr = {};
			attr[col] = newValue;
			if (demo.length > 0) {
				me.setSQLAttrs(name, attr);
			} else {
				me.addSQL(name, attr);
			}
		} else if (col == "modify") {
			var demo = $(me.bizDoc.docRoot).find("access>method[name='" + name + "']>sql");
			var attr = {};
			attr[col] = newValue;
			if (demo.length > 0) {
				if (newValue) {
					me.setSQLAttrs(name, attr);
				} else {
					me.removeSQLAttrs(name, col);
				}
			} else {
				if (newValue) {
					me.addSQL(name, attr);
				}
			}

		}

	};

	Model.prototype.addMethodDialogReceived = function(event) {
		/*
		 * this.comp('methodData').newData({ defaultValues:[{
		 * name:event.data.data }] })
		 * 
		 * var attrs = { name:event.data.data } this.addAccessMethod(attrs);
		 * 
		 * 
		 * this.comp('paramData').clear(); var paramList =
		 * this.queryParams(event.data.data); this.comp('paramData').loadData({
		 * "@type" : "table", "rows" : paramList });
		 * this.comp('paramData').first();
		 */
		var methodName = event.data.data.methodName
		var methodXml = event.data.data.methodXml;
		var modify = event.data.data.modify;
		var pageable = event.data.data.pageable;
		var sql = event.data.data.sql;
		var status = event.data.data.status;
		if ($(this.bizDoc.docRoot).find("access").length == 0) {
			this.bizDoc.append("", "<access></access>");
		}
		if (status == "new") {
			this.comp('methodData').newData({
				defaultValues : [ {
					name : methodName,
					modify : modify,
					pageable : pageable,
					isSql : sql
				} ]
			})

		} else if (status == "edit") {
			var self = this;
			this.comp("methodData").each(function(option) {
				if (option.row.val("name") == self.methodRow.val("name")) {
					option.row.val("name", methodName);
					option.row.val("modify", modify);
					option.row.val("pageable", pageable);
					option.row.val("isSql", sql);
				}
			})
			var methodData = this.comp("methodData");
			this.removeMethod(methodName);
		}
		this.bizDoc.append("access", methodXml);
	};

	Model.prototype.addParams = function(event) {
		var row = this.comp('methodData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中一行");
			return;
		}
		var paramData = this.comp('paramData')
		var count = paramData.count();
		count = count + 1;
		paramData.newData({
			defaultValues : [ {
				name : "param" + count

			} ]
		});

		var attr = {
			name : "param" + count
		}
		this.addParam(row.val('name'), attr);

	};

	Model.prototype.deleteParams = function(event) {
		var row = this.comp('paramData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中行");
			return;
		}
		this.comp('paramData').remove(row);
		var name = this.comp('methodData').getCurrentRow().val('name');
		this.removeParam(name, row.val('name'));
	};

	// 点击切换方法
	Model.prototype.td4Click = function(event) {
		this.comp('paramData').clear();
		var name = event.bindingContext.$object.val('name');
		var paramList = this.queryParams(name);
		this.comp('paramData').loadData({
			"@type" : "table",
			"rows" : paramList
		});
		this.comp('paramData').first();

	};

	Model.prototype.paramDataValueChange = function(event) {
		var me = this;
		var methodName = this.comp('methodData').getCurrentRow().val('name');
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		/*
		 * if (col == "name") { var rows2 = me.comp('paramData').find([ 'name' ], [
		 * newValue ]); if (rows2.length > 0) { event.oldValue = newValue;
		 * event.newValue = oldValue; justep.Util.hint("name不能重名"); return;
		 *  } ; if (!newValue) { event.oldValue = newValue; event.newValue =
		 * oldValue; justep.Util.hint("name不能为空"); return;
		 *  } ; }
		 */
		var attr = {};
		attr[col] = newValue;
		me.setParamAttrs(methodName, name, attr);
	};

	Model.prototype.addValidationBtn = function(event) {
		var arr = [];
		this.comp('validationData').each(function(option) {
			arr.push(option.row.val('property') + option.row.val('type'));
		})

		this.comp('addValidationDialog').open({
			data : arr
		});
	};

	Model.prototype.deleteValidationBtn = function(event) {
		var row = this.comp('validationData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中行");
			return;
		}
		this.comp('validationData').remove(row);
		this.removeValidation(row.val('property'), row.val('type'));

	};

	// 接收传过来的参数
	Model.prototype.addValidationDialogReceived = function(event) {
		var xmlStrs = event.data.data.xmlStrs;
		var target = event.data.data.target;
		this.removeValidation(target);
		this.bizDoc.append("validator", "<constraints />", {
			target : target
		});
		this.bizDoc.append("validator>constraints[target='" + target + "']", xmlStrs);
	};

	Model.prototype.validationDataValueChange = function(event) {
		var property = event.row.val('property');
		var type = event.row.val('type');
		var newValue = event.newValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		this.setValidationAttrs(property, type, attr);
	};

	Model.prototype.tableNameDataValueChange = function(event) {
		this.setMappingTableAttrs({
			table : event.newValue
		});
	};

	Model.prototype.chooseObjectBtnClick = function(event) {
		var row = event.bindingContext.$object;
		this.editRow = row;
		var propsList = this.queryCurrentProps(row.val("name"));
		var self = this;
		var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
		this.comp('addPropertyDialog').open({
			data : {
				path : path,
				status : "edit",
				propsList : propsList,
				fullPath : this.filePath
			}
		});
	};

	Model.prototype.chooseObjectDialogReceive = function(event) {
		var type = event.data.data;
		var dataType = this.comp('propertyData').getCurrentRow().val('dataType');
		if (dataType == "List") {
			this.comp('propertyData').setValue("dataType", "list<" + type + ">");
		} else {
			this.comp('propertyData').setValue("dataType", type);
		}
	};

	/**
	 * @ 2016-12-19
	 *   新增内容----------------------------------------------------------------------------------------------------start
	 */
	Model.prototype.loadValidFieldData = function(quoteData, targetData) {
		quoteData.each(function(option) {
			targetData.newData({
				"defaultValues" : [ {
					"fieldName" : option.row.val('name'),
				} ]
			})
		})
	}

	// 查询所有的信息

	Model.prototype.queryAllConstraints = function(arr, targetName) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			var array = this.queryConstraints(targetName, arr[i]);
			if (array.length > 0) {
				newArr.push(array[0]);
			}
		}
		return newArr;
	}

	// 查询当前 constraints下的单个标签的信息
	Model.prototype.queryConstraints = function(targetName, childTag) {
		var tagName = "";
		var arr = this.bizDoc.queryAsJson("validator>constraints[target='" + targetName + "']>" + childTag, function($node, jsonItem) {
			tagName = $node[0].tagName || "";
		});
		if (arr.length > 0) {
			arr[0]['name'] = tagName;
		}
		return arr
	}

	Model.prototype.dataCheckBtnClick = function(event) {
		var row = event.bindingContext.$object;
		var targetName = row.val("name");
		var list = this.queryAllConstraints(constraintsArr, targetName) || [];
		row && this.comp("addValidationDialog").open({
			params : {
				field : targetName,
				data : list
			}
		});
	};
	/**
	 * @ 2016-12-19
	 *   新增内容-----------------------------------------------------------------------------------------------------end
	 */

	/**
	 * @ 2016-12-26
	 *   新增的内容---------------------------------------------------------------------------------
	 */

	Model.prototype.addMethod = function(event) {
		var property = this.comp("propertyData");
		var arr = [];
		if (property.count() == 0) {
			return

			

						

			

									

			

						

			

		}
		property.each(function(option) {
			arr.push({
				value : option.row.val("name"),
				dataType : option.row.val("dataType")
			})
		})
		var data = this.comp('methodData');
		this.comp('addMethodDialog').open({
			data : {
				fieldData : arr,
				methodNames : this.getAllMethodNames(data),
				status : "new"
			}
		});
	};

	// 获取所有的方法名：
	Model.prototype.getAllMethodNames = function(data) {
		if (data.count() == 0) {
			return [];
		}
		var arr = [];
		data.each(function(option) {
			arr.push(option.row.val("name"));
		})
		return arr;
	}

	// 查询方法
	Model.prototype.queryMethod = function(key) {
		var list = this.bizDoc.queryAsJson("access>method[name='" + key + "']", function($node, jsonItem) {
			var dataType = $node.find("result").attr("dataType");
			if (dataType) {
				jsonItem.dataType = dataType;
			}
			var modify = $node.find("query").attr("modify");
			if (modify) {
				jsonItem.modify = modify;
			}
			var query = $node.find("query").attr("sql");
			if (query) {
				jsonItem.query = query;
			}
		});
		return list;
	}

	// 查询方法的参数
	Model.prototype.queryParamList = function(key) {
		return this.bizDoc.queryAsJson("access>method[name='" + key + "']>param", function($node, jsonItem) {
		})
	}

	// 查询method的result
	Model.prototype.queryResult = function(key) {
		return this.bizDoc.queryAsJson("access>method[name='" + key + "']>result", function($node, jsonItem) {
		})
	}
	Model.prototype.removeMethod = function(key) {
		this.bizDoc.remove("access>method[name='" + key + "']");
	}

	Model.prototype.removeSQL = function(key) {
		this.bizDoc.remove("access>method[name='" + key + "']>query")
	}

	Model.prototype.querySql = function(key) {
		return this.bizDoc.queryAsJson("access>method[name='" + key + "']>query", function($node, jsonItem) {
		})
	}

	Model.prototype.editBtnClick = function(event) {
		var row = event.bindingContext.$object;
		this.methodRow = row;
		var property = this.comp("propertyData");
		var methodList = this.queryMethod(row.val("name"));
		var paramList = this.queryParamList(row.val("name"));
		var resultList = this.queryResult(row.val("name"));
		var queryList = this.querySql(row.val("name"));
		var arr = [];
		property.each(function(option) {
			arr.push({
				value : option.row.val("name"),
				dataType : option.row.val("dataType")
			})
		})
		var data = this.comp("methodData");
		this.comp('addMethodDialog').open({
			data : {
				fieldData : arr,
				methodList : methodList,
				paramList : paramList,
				resultList : resultList,
				methodNames : this.getAllMethodNames(data),
				status : "edit",
				queryList : queryList
			}
		});
	};

	Model.prototype.delBtnClick = function(event) {
		var methodData = this.comp("methodData");
		var row = event.bindingContext.$object;
		methodData.remove(row);
		this.removeMethod(row.val("name"));
	};

	Model.prototype.checkbox5Change = function(event) {
		if (!event.checked) {

		}
	};

	return Model;
});