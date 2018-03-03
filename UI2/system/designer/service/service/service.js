define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var button = require("$UI/system/components/justep/button/button");
	var EditorManager = require("$UI/system/designer/webIde/lib/editorManager");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	var TextEditor = require("$UI/system/designer/webIde/common/TextEditor");
	var CodeEditorHelper = require("$UI/system/designer/webIde/bizDesigner/codeProcess/codeEditorHelper");
	var xuiService = require("$UI/system/designer/webIde/common/xuiService");
	// @ serveTagNames
	var serveTNames = require("$UI/system/designer/service/lib/serverData").serveTags;
	var modesData = require("$UI/system/designer/service/lib/serverData");
	
	var DataAssembly = require("$UI/system/designer/service/lib/dataAssembly")

	// 引入uses

	var Uses = require("$UI/system/designer/service/lib/usesData");

	// 定义了所有的serve标签名
	var $$__action = serveTNames.action;
	var $$__uses = serveTNames.uses;
	var $$__use = serveTNames.use;
	var $$__label = serveTNames.label;
	var $$__descr = serveTNames.descr;
	var $$__reply = serveTNames.reply;
	var $$__http = serveTNames.http;
	var $$__field = serveTNames.field;
	var $$__param = serveTNames.param;

	// exception 标签
	var $$__exception = serveTNames.exception.exception;
	var $$__circuit = serveTNames.exception.circuit;
	var $$__messageKey = serveTNames.exception.messageKey;
	var $$__messageDetail = serveTNames.exception.messageDetail;

	var __exceptionTags = "<" + $$__exception + "></" + $$__exception + ">";
	var __circuitTags = "<" + $$__circuit + "></" + $$__circuit + ">";
	var __messageKeyTags = "<" + $$__messageKey + "></" + $$__messageKey + ">";
	var __messageDetailTags = "<" + $$__messageDetail + "></" + $$__messageDetail + ">";

	var __actionTags = "<" + $$__action + "></" + $$__action + ">";
	var __usesTags = "<" + $$__uses + "></" + $$__uses + ">";
	var __useTags = "<" + $$__use + "></" + $$__use + ">";

	// kind取值方式
	var kindParams = {
		$$__RequestBody : "RequestBody",
		$$__RequestHeader : "RequestHeader",
		$$__RequestPart : "RequestPart",
		$$__RequestParam : "RequestParam",
		$$__CookieValue : "CookieValue",
		$$__ModelAttribute : "ModelAttribute",
	};

	// @----------------------------------------------------

	var Model = function() {
		this.callParent();
		this.deleteRow;
		this.isActionPages = justep.Bind.observable("");
		this.switchs = justep.Bind.observable("");
		this.customMethodName = justep.Bind.observable("");
	};

	Model.prototype.queryUses = function(data) {
		this.bizDoc.queryAsJson($$__uses, function($node, jsonItem) {
			var $arr = $node.children();
			$.each($arr, function(i, v) {
				data.newData({
					defaultValues : [ {
						quoteName : $(v).attr("useName") || ($(v).attr("name") + "." + $(v).attr("service")),
						name : "",
						status : "quote"
					} ]
				});
			})
		});
	}

	Model.prototype.queryUse = function(data) {
		this.bizDoc.queryAsJson($$__use, function($node, jsonItem) {
			if (!$node) {
				return;
			}
			data.newData({
				"defaultValues" : [ {
					"parentName" : jsonItem.useName,
					"serName" : jsonItem.service,
					"name" : jsonItem.name
				} ]
			})
		})
	}

	// 添加服务
	Model.prototype.addRpcClick = function(event) {
		var rpcNameData = this.comp("rpcNameData");
		var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
		var list = [];
		if (rpcNameData.count() > 0) {
			rpcNameData.each(function(option) {
				list.push(option.row.val("name"))
			})
		}
		this.comp("actionDialog").open({
			data : list
		});
		// this.comp("rpcNameDialog").show();
	};

	// action返回的数据
	Model.prototype.actionDialogReceived = function(event) {
		var param = event.data.data || {};
		var name = param.name;
		var data = this.comp("rpcNameData");
		data.newData({
			defaultValues : [ {
				name : name,
				status : "action",
				quoteName : ""
			} ]
		});
		this.addConcept({
			name : name
		});
		// this.getElementByXid('rpcBtn').click();
		// this.comp("rpcBtn").click();
		// 生成action结构
		this.bizDoc.append($$__action + "[name='" + name + "']", "<label language='zh-CN'>" + param.dec + "</label>");
		this.bizDoc.append($$__action + "[name='" + name + "']", "<description language='zh-CN'>" + param.content + "</description>", {
			language : "zh-CN"
		});
		this.bizDoc.append($$__action + "[name='" + name + "']", "<param></param>");
		this.bizDoc.append($$__action + "[name='" + name + "']", "<reply></reply>");
		this.bizDoc.append($$__action + "[name='" + name + "']", "<http></http>");
		this.bizDoc.append($$__action + "[name='" + name + "']", __exceptionTags);
		this.queryHasRelationList(name);
		$("[xid='chooseImplBtn']").attr("disabled", false);
	};
	// 添加action
	Model.prototype.rpcNameDialogOK = function(event) {
	};

	// 弹出对话框
	Model.prototype.addQuoteClick = function(event) {
		this.comp("quoteDialog").open();
	}

	// 接收quoteDialog传来的参数
	Model.prototype.quoteDialogReceive = function(event) {
		var serviceName = event.data.serviceName;
		this.appNames = serviceName.slice(serviceName.lastIndexOf("/") + 1, serviceName.lastIndexOf("service.m") - 1);
		this.sevName = serviceName.slice(serviceName.indexOf("/") + 1, serviceName.lastIndexOf("/"));
		var quoteName = '';
		if (serviceName.includes('service/comp')) {
			quoteName = this.sevName.split("/").join('.') + "." + this.appNames;
		} else {
			quoteName = this.sevName + "." + this.appNames;
		}
		this.addQuoteData(quoteName);
	};

	// 添加外部引用的actionData
	Model.prototype.addQuoteData = function(quoteName) {
		var data = this.comp("rpcNameData");
		var self = this;
		data.newData({
			"defaultValues" : [ {
				quoteName : quoteName,
				status : "quote",
				name : ""
			} ]
		});

		this.adduseAttr({
			service : this.sevName,
			name : this.appNames,
		});
		this.addQuoteParamsData({
			name : this.appNames,
			serName : this.sevName,
			parentName : quoteName,
		})
	};

	// 添加外部引用的uses
	Model.prototype.addUsesTag = function() {
		var uses = this.bizDoc.query($$__uses);
		if (uses.length == 0) {
			this.bizDoc.insertBefore("", __usesTags);
		}
	}

	// 添加外部引用的use
	Model.prototype.adduseAttr = function(attr) {
		var attr = attr || {};
		this.addUsesTag();
		// 生成uses结构
		this.bizDoc.append($$__uses, __useTags, attr);
	}

	// 生成quoteData的数据:
	Model.prototype.addQuoteParamsData = function(paramsData) {
		var paramsData = paramsData || {};
		var data = this.comp("quoteParamsData");
		data.newData({
			"defaultValues" : [ paramsData ]
		})
	}
	// 引用action删除时
	Model.prototype.deleteQuoteClick = function(event) {
		var quoteParamsData = this.comp("quoteParamsData");
		var row = quoteParamsData.getCurrentRow();
		if (row) {
			quoteParamsData.deleteData(row);
			var actionName = row.val("parentName");
			if (actionName) {
				this.bizDoc.remove($$__use + "[useName='" + actionName + "']");
			}
		}
	};

	// 引用action 参数值改变时
	Model.prototype.quoteParamsDataValueChange = function(event) {
		var col = event.col;
		var row = event.row;
		var newValue = event.newValue;
		var data = {};
		data[col] = newValue;
		this.bizDoc.setAttr($$__use + "[useName='" + row.val("parentName") + "']", data);
	};

	Model.prototype.modelLoad = function(event) {
		// 获取文件路径
		this.filePath = this.getContext().getRequestParameter("filePath");
		// 加载文档模型对象
		this.bizDoc = bizModel.loadFile(this.filePath, true);
		this.queryUses(this.comp("rpcNameData"));
		this.queryUse(this.comp("quoteParamsData"));
		var rpcNameData = this.comp("rpcNameData");
		var list = this.getActionNameList();
		if (list && list.length > 0) {
			this.queryHasRelationList(list[0].name);
			$("[xid='chooseImplBtn']").attr("disabled", false);
		} else {
			this.queryHasRelationList();
			$("[xid='chooseImplBtn']").attr("disabled", true);
		}
		this.isActionPages.set("action");
		this.comp("typeData").loadData(modesData.loadModeData(modesData.modeTypes, "value"), true);
	};

	/** actionName * */
	Model.prototype.getActionNameList = function() {
		var data = this.comp("rpcNameData");
		return this.bizDoc.queryAsJson($$__action, function($node, jsonItem) {
			data.newData({
				defaultValues : [ {
					name : jsonItem.name,
					quoteName : "",
					status : "action"
				} ]
			});
			data.first();
		});
	}

	/** 查询has-relation * */
	Model.prototype.queryHasRelationList = function(rpcName) {
		var self = this;
		var data = this.comp("rpcNameData");
		var rpcData = this.comp("rpcData");
		var implData = this.comp("implData");
		var paramsData = this.comp("paramsData");
		var replyData = this.comp("replyData");
		var httpRequest = this.comp("httpRequest");
		var httpParams = this.comp("httpParams");
		var paramsNameData = this.comp("paramsNameData");
		var MsgKey = this.comp("exceptionMsgKey");
		var MsgDetail = this.comp("exceptionMsgDetail");
		var fallback = this.comp("exceptionBackData");
		var exceptionParams = this.comp("exceptionParams");
		var requestFieldName = this.comp("requestFieldName");
		var resultFieldNameData = this.comp("resultFieldName");
		if (!rpcName) {
			this.bizDoc.queryAsJson($$__action, function($node, jsonItem) {
				data.newData({
					defaultValues : [ {
						name : jsonItem.name,
						quoteName : "",
						status : "action"
					} ]
				});
			});
		} else {
			paramsData.clear();
			rpcData.clear();
			replyData.clear();
			httpRequest.clear();
			httpParams.clear();
			paramsNameData.clear();
			implData.clear();
			rpcData.newData();
			exceptionParams.clear();
			MsgKey.clear();
			MsgDetail.clear();
			fallback.clear();
			requestFieldName.clear();
			resultFieldNameData.clear();
			rpcData.setValue("parent", rpcName);
			// 生成impl方法
			self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']", function($node, jsonItem) {
				var implName = jsonItem.impl;
				implData.newData();
				if (implName) {
					implData.setValue("implName", implName)
				}
			});

			// 生成描述
			self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']", function($node, jsonItem) {
				var dom = $node[0];
				var label = $node.find("label").html();
				var desc = $node.find("description").html();
				rpcData.setValue("parent", rpcName);
				rpcData.setValue("label", label);
				rpcData.setValue("description", desc);
				rpcData.setValue("impl", jsonItem.impl || "");
				if (jsonItem.impl) {
					self.customMethodName.set('custom')
				} else {
					self.customMethodName.set('')
				}
			});

			// 生成参数定义
			var resultList = self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>param>field", function($node, jsonItem) {
				jsonItem.rpcName = rpcName
			});

			paramsData.loadData({
				"@type" : "table",
				"rows" : resultList
			})
			// 生成request的子字段
			if (resultList.length > 0) {
				var requestFieldChildArray = [];
				resultList.forEach(function(item) {
					var arr = self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>param>field[name='" + item.name + "']>field", function($node, jsonItem) {
						jsonItem.actionName = rpcName;
					});
					if (arr.length > 0) {
						requestFieldChildArray = requestFieldChildArray.concat(arr);
					}
				})
				console.log('requestField:----------------------------' + JSON.stringify(requestFieldChildArray))
				requestFieldName.loadData({
					"@type" : 'table',
					'rows' : requestFieldChildArray
				})
			}
			;

			// 生成返回值
			var resultDataList = self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>reply>field", function($node, jsonItem) {
				replyData.newData();
				replyData.setValue("rpcName", rpcName);
				replyData.setValue("name", jsonItem.name);
				replyData.setValue("dataType", jsonItem.dataType);
			});
			// 生成result的子字段

			if (resultDataList.length > 0) {
				var resultFieldChildArray = self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>reply>field[name='result']>field", function($node, jsonItem) {
					jsonItem.actionName = rpcName;
				});
				console.log('resultFieldChildArray:----------------------------' + JSON.stringify(resultFieldChildArray));
				if (resultFieldChildArray.length > 0) {
					resultFieldNameData.loadData({
						"@type" : 'table',
						"rows" : resultFieldChildArray
					})
				}
			}

			// 生成 exception Params 的属性
			self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>" + $$__exception, function($node, jsonItem) {
				var obj = jsonItem || {};
				exceptionParams.newData();
				exceptionParams.setValue("actionName", rpcName);
				exceptionParams.setValue("trigger", obj.trigger || "");
				exceptionParams.setValue("timeout", obj.timeout || "");
				exceptionParams.setValue("switch", obj["switch"] || "circuit");
				self.switchs.set(obj["switch"] || "");
			})

			fallback.newData();
			fallback.setValue("actionName", rpcName);
			MsgKey.newData();
			MsgKey.setValue("actionName", rpcName);
			// MsgKey.setValue("value","");*/

			// 生成 exception msg Key

			MsgDetail.newData();
			MsgDetail.setValue("actionName", rpcName);
			if (this.switchs.get() == "circuit") {
				// fallback.setValue("fallback","")
				self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>" + $$__exception + ">" + $$__circuit, function($node, jsonItem) {
					// jsonItem.rpcName=rpcName
					// fallback.newData();
					fallback.setValue("fallback", jsonItem.fallback || "");
				})

			} else {

				self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>" + $$__exception + ">" + $$__messageDetail, function($node, jsonItem) {
					MsgDetail.setValue("value", jsonItem.value)

				})
				self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>" + $$__exception + ">" + $$__messageKey, function($node, jsonItem) {
					MsgKey.setValue("value", jsonItem.value);
				})
			}

			/*
			 * fallback.loadData({ "@type":"table", "rows":fallbackList })
			 */
			// 生成 exception msgDetail
			// 生成http相关描述
			paramsData.each(function(obj) {
				var row = obj.row;
				paramsNameData.newData();
				paramsNameData.setValue("name", row.val("name"));
			});

			self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>http", function($node, jsonItem) {
				httpRequest.newData();
				httpRequest.setValue("rpcName", rpcName);
				httpRequest.setValue("method", jsonItem.method);
				httpRequest.setValue("url", jsonItem.url)
			})
			// var http = $(this.bizDoc.docRoot).find();
			self.bizDoc.queryAsJson($$__action + "[name='" + rpcName + "']>http>param", function($node, jsonItem) {
				httpParams.newData();
				httpParams.setValue("rpcName", rpcName);
				httpParams.setValue('name', jsonItem.name);
				if (jsonItem.to) {
					httpParams.setValue("to", jsonItem.to);
				}
				httpParams.setValue("kind", jsonItem.kind);
			})

		}
	}

	Model.prototype.sourceBtnClick = function(event) {
		// this.bizDoc.save();
		var self = this;
		if (!self.sourceEditor) {
			self.bracketsEditorManager = EditorManager.createBracketsEditor(self.getElementByXid('content3'));
			self.bracketsEditorManager.then(function(manager) {
				$(self.getElementByXid("loadingLabel")).hide();
				self.sourceEditor = new TextEditor({
					mode : "xml",
					contentChange : function() {
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
				self.sourceEditor.setContent(self.bizDoc.asXml(), true);
				self.sourceEditor.show();
			});
		} else {
			self.sourceEditor.setContent(self.bizDoc.asXml());
		}
	};

	// 添加action
	Model.prototype.addConcept = function(attrs) {
		this.bizDoc.append("", __actionTags, attrs);
	}

	/** 设置关系属性* */
	Model.prototype.setHasRelationTreeAttrs = function(conceptName, relationName, attrs) { // attrs
		this.bizDoc.setAttr($$__action + "[name='" + conceptName + "']>label", attrs);
	}

	Model.prototype.rpcBtnClick = function(event) { 
		// 获取每个点击的rpc名称
		var row = event.bindingContext.$object;
		if (row.val('name')) {
			this.isActionPages.get() != "action" && (this.isActionPages.set("action"));
			var implData = this.comp("implData");
			var rpcName = event.source.$domNode.children("span").html();
			this.queryHasRelationList(row.val('name'));
			$("[xid='chooseImplBtn']").attr("disabled", false);
		}
		if (row.val("quoteName")) {
			this.isActionPages.get() != "quote" && (this.isActionPages.set("quote"));
		}
		this.saveBtnClick();
	};
	
	
	
	Model.prototype.saveBtnClick = function(event) {
		this.bizDoc.save();
	};

	Model.prototype.removeRpcClick = function(event) {
		var data = this.comp("rpcData");
		var rpcNameData = this.comp("rpcNameData");
		var row = event.bindingContext.$object;
		rpcNameData.deleteData(row);
		if (rpcNameData.count() == 0) {
			this.comp("paramsData").clear();
			this.comp("implData").clear();
			this.comp("httpParams").clear();
			this.comp("replyData").clear();
			this.comp("httpRequest").clear();
			this.comp("rpcNameData").clear();
			this.comp("rpcData").clear();
			this.comp("exceptionBackData").clear();
			this.comp("exceptionMsgDetail").clear();
			this.comp("exceptionMsgKey").clear();
			this.comp("exceptionParams").clear();
			this.comp("requestFieldName").clear();
			this.comp("resultFieldName").clear();
			$("[xid='chooseImplBtn']").attr("disabled", true);
		}
	};

	Model.prototype.deleteUse = function(quoteName) {
		this.bizDoc.remove("uses>use[useName = '" + quoteName + "']:first");
	}

	Model.prototype.deleteDialogOK = function(event) {
		var rpcNameData = this.comp("rpcNameData");
		var data = this.comp("rpcData");
		if (this.deleteRow) {
			rpcNameData.deleteData(rpcNameData.getRowByID(this.deleteRow.val("parent")));
		}

	};

	Model.prototype.paramNameDialogOK = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var data = this.comp("paramsData");
		var rows = data.find([ "name" ], [ event.input ]);
		if (event.input) {
			var paramsNameData = this.comp("paramsNameData");
			paramsNameData.newData({
				defaultValues : [ {
					name : event.input,
				} ]
			});
			if (rows.length == 0) {
				data.newData({
					defaultValues : [ {
						rpcName : rpcName,
						name : event.input,
						dataType : "",
						required : "",
						desc : "",
						"default" : ""
					} ]
				});
			} else {
				justep.Util.hint("参数名不允许重复！", {
					type : "danger"
				});
			}
		} else {
			justep.Util.hint("参数名称必填！", {
				type : "danger"
			});
		}
	};

	Model.prototype.paramsDataAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		if (rpcName) {
			if (event.rows[0].val("name")) {
				var attrs = {
					name : event.rows[0].val("name") || "",
					dataType : event.rows[0].val("dataType") || "",
					requestType : event.rows[0].val("requestType") || ""
				}
				this.addRequestField(rpcName, attrs)
			}
		}
	};

	Model.prototype.deleteRelationBtnClick = function(event) {
		var param = this.comp("paramsData");
		var row = param.getCurrentRow();

		if (row) {
			var paramsNameData = this.comp("paramsNameData");
			var rows = paramsNameData.find([ 'name' ], [ row.val('name') ], true);
			this.deleteRowsAll(paramsNameData, rows);
			this.deleteRowsAll(param, row);
			var rpcName = row.val("rpcName");
			if (rpcName) {
				this.bizDoc.remove($$__action + "[name='" + rpcName + "']>param>field[name='" + row.val("name") + "']");
			}
		}
	};

	Model.prototype.addReplyClick = function(event) {
		var rpcData = this.comp("rpcData");
		if (rpcData.count() == 0) {
			justep.Util.hint("请选择服务！", {
				type : "danger"
			});
		} else {
			var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
			this.comp("resultDialog").open({
				data : {
					path : path,
					status : "new",
					fullPath : this.filePath
				}
			});
		}
	};

	Model.prototype.replyDataAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		if (rpcName) {
			if (event.rows[0].val("name")) {
				var attrs = {
					name : event.rows[0].val("name") || "",
					dataType : event.rows[0].val("dataType") || "",
					resultType : event.rows[0].val("resultType") || ""
				}
				this.addResultField(rpcName, attrs)
			}
		}
	};

	Model.prototype.paramsDataValueChange = function(event) {
		var rpcData = this.comp("rpcData");
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		this.setRequestAttr(rpcData.getValue("parent"), name, attr);
	};

	Model.prototype.replyDataValueChange = function(event) {
		var rpcData = this.comp("rpcData");
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		this.setResultAttr(rpcData.getValue("parent"), name, attr);
	};

	Model.prototype.replyDialogOK = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var data = this.comp("replyData");
		if (event.input) {
			data.newData({
				defaultValues : [ {
					rpcName : rpcName,
					name : event.input,
				} ]
			});
		} else {
			justep.Util.hint("返回值名称必填！", {
				type : "danger"
			});
		}
	};

	Model.prototype.deleteReplyClick = function(event) {
		var reply = this.comp("replyData");
		var paramsNameData = this.comp("paramsNameData");
		var row = reply.getCurrentRow();
		if (row) {
			reply.deleteData(row);
			var rpcName = row.val("rpcName");
			if (rpcName) {
				this.bizDoc.remove($$__action + "[name='" + rpcName + "']>reply>field[name='" + row.val("name") + "']")
			}
		}
	};

	Model.prototype.httpRequestValueChange = function(event) {
		var http = this.comp("httpRequest");
		var col = event.col;
		var row = event.row;
		var data = {};
		data[col] = event.newValue;
		/*
		 * if (!row.val("url")) { this.bizDoc.setAttr($$__action + "[name=" +
		 * row.val("rpcName") + "]>http", { url : "" }) }
		 */
		this.bizDoc.setAttr($$__action + "[name=" + row.val("rpcName") + "]>http", data);
		if (row.val("method")) {
		}
	};
	Model.prototype.httpRequestAfterNew = function(event) {
	};

	Model.prototype.httpParamsValueChange = function(event) {
		var rpcData = this.comp("rpcData");
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		this.setHttpParams(rpcData.getValue("parent"), name, attr);
	};

	Model.prototype.httpParamsAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		if (rpcName) {
			if (event.rows[0].val("kind")) {
				var attrs = {
					name : event.rows[0].val("name") || "",
					kind : event.rows[0].val("kind") || ""
				// requestType : event.rows[0].val("requestType") || ""
				}
				this.addHttpParams(rpcName, attrs);
			}
		}

	};

	Model.prototype.addHttpParamClick = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var http = this.comp("httpParams");
		var flag = true;
		if (http.count() > 0) {
			http.each(function(obj) {
				var row = obj.row;
				if (row.val("name") == false) {
					flag = false;
				}
			});
		}

		if (rpcData.count() > 0) {
			if (flag) {
				this.comp("httpParams").newData({
					defaultValues : [ {
						rpcName : rpcName,
						name : "",
						to : "",
						kind : "RequestParam"
					} ]
				});
			} else {
				justep.Util.hint("请设置上一个参数的名称！", {
					type : "danger"
				});
			}
		} else {
			justep.Util.hint("请选择服务！", {
				type : "danger"
			});
		}
	};

	Model.prototype.httpParamDialogOK = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var data = this.comp("httpParams");
		if (event.input) {
			data.newData({
				defaultValues : [ {
					rpcName : rpcName,
					name : event.input,
					to : "",
					kind : ""
				} ]
			});
		} else {
			justep.Util.hint("返回值名称必填！", {
				type : "danger"
			});
		}
	};

	Model.prototype.deleteHttpParamClick = function(event) {
		var data = this.comp("httpParams");
		var row = data.getCurrentRow();
		if (row) {
			data.deleteData(row);
			var rpcName = row.val("rpcName");
			if (rpcName) {
				this.bizDoc.remove($$__action + "[name='" + rpcName + "']>http>param[name='" + row.val("name") + "']")
			}
		}
	};

	Model.prototype.paramSelectFocus = function(event) {
	};

	Model.prototype.rpcNameDataAfterDelete = function(event) {
		var row = event.deleteRows[0];
		if (row.val("name")) {
			this.bizDoc.remove($$__action + "[name='" + row.val("name") + "']:first");
		}
		if (row.val("quoteName")) {
			var quoteName = row.val("quoteName");
			this.bizDoc.remove($$__use + "[name='" + quoteName.substr(0, quoteName.indexOf(".")) + "'][service='" + quoteName.substr(quoteName.indexOf(".") + 1) + "']:first");
		}
	};

	Model.prototype.rpcDataValueChanged = function(event) {
		var rpc = this.comp("rpcData");
		var col = event.col;
		var data = {};
		var row = event.row;
		data[col] = event.value;
		if (event.value) {
			/*
			 * if (col == "label") { var $dom =
			 * $(this.bizDoc.docRoot).find($$__action + "[name='" +
			 * row.val("parent") + "']>label"); if ($dom.length > 0) {
			 * 
			 * $dom.html(event.value).attr("language", "zh-CN"); } else {
			 * this.bizDoc.insertBefore($$__action + "[name='" +
			 * row.val("parent") + "']>description", "<label>" + event.value + "</label>", {
			 * language : "zh-CN" }); } // this.bizDoc.setAttr("rpc[name='" +
			 * row.val("parent") + //
			 * "']>label[name="+event.value+"]:first",data); } else {
			 * 
			 * var $dom = $(this.bizDoc.docRoot).find($$__action + "[name='" +
			 * row.val("parent") + "']>description"); if ($dom.length > 0) {
			 * $dom.html(event.value).attr('language', 'zh-CN'); } else {
			 * this.bizDoc.insertBefore($$__action + "[name='" +
			 * row.val("parent") + "']>param", "<description>" + event.value + "</description>", {
			 * language : "zh-CN" }); } }
			 */
		}
	};
	/**
	 * @author 内置方法的返回
	 */

	// 添加服务页面传过来的参数
	Model.prototype.windowDialogReceive = function(event) { 
		var self = this;
		var currentMethod = event.data.data;
		console.log(currentMethod)
		var rpc = this.comp("rpcData");
		var name = rpc.getValue('parent')
		// var dataName = event.data.dataName;
		var paramsData = this.comp("paramsData");
		var replyData = this.comp("replyData");
		var paramsNameData = this.comp("paramsNameData")
		var httpParamData = this.comp("httpParams")
		rpc.setValue("impl", currentMethod.impl);

		// 内置方法 和 自定义方法 的 返回
		if (currentMethod) { 
			paramsData.clear();
			replyData.clear();
			httpParamData.clear()
			paramsNameData.clear();
			this.removeAllParam(name)
			this.removeAllReply(name)
			this.removeAllHttpField(name)
			var pageableParam = [ {
				name : 'limit',
				dataType : 'INTEGER'
			}, {
				name : 'offset',
				dataType : 'INTEGER'
			} ];
			
			var pageableReply = [{
				name:'total',
				dataType:'LONG'
			}]
			if (currentMethod.pageable === "true") {
				if (currentMethod.param && currentMethod.param.length > 0) {
					paramsData.loadData(pageableParam.concat(currentMethod.param),true)
					paramsNameData.loadData(pageableParam.concat(currentMethod.param),true)
					pageableParam.concat(currentMethod.param).forEach(function(item) {
						self.addRequestField(name, item)
					})
				}else {
					paramsData.loadData(currentMethod.param,true)
					paramsNameData.loadData(currentMethod.param,true)
					currentMethod.param.forEach(function(item) {
						self.addRequestField(name, item)
					})
				}
				
				if (currentMethod.reply && currentMethod.reply.length > 0) {
					replyData.loadData(pageableReply.concat(currentMethod.reply), true)
					pageableReply.concat(currentMethod.reply).forEach(function(item) {
						self.addReplyField(name, item)
					})
				}else {
					replyData.loadData(currentMethod.reply, true)
					currentMethod.reply.forEach(function(item) {
						self.addReplyField(name, item)
					})
				}
				
				
			}else {
				if(currentMethod.param && currentMethod.param.length > 0){
					paramsData.loadData(currentMethod.param,true)
					paramsNameData.loadData(currentMethod.param,true)
					currentMethod.param.forEach(function(item) {
						self.addRequestField(name, item)
					})
				}
				
				if (currentMethod.reply && currentMethod.reply.length > 0) {
					replyData.loadData(currentMethod.reply, true)
					currentMethod.reply.forEach(function(item) {
						self.addReplyField(name, item)
					})
				}
				
			}
			this.customMethodName.set('custom')
		}

		var implData = this.comp("implData");
		var httpParams = this.comp("httpParams");
		var httpRequest = this.comp("httpRequest");
		var rpcNameData = this.comp("rpcNameData");
	};
	
	Model.prototype.chooseImplBtnClick = function(event) {
		var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
		this.comp("rpcDialog").open({
			data : {
				path : path
			}
		});
	};

	// 选择impl的实现方法
	Model.prototype.customImplClick = function(event) {
		var self = this;
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent")
		var $code = $(this.bizDoc.docRoot).find($$__action + "[name='" + rpcName + "']>code");
		
		if($code.length == 0){
			$code = $('<code><model></model><diagram></diagram></code>');
			$(this.bizDoc.docRoot).find($$__action + "[name='" + rpcName + "']").append($code);
			$code.removeAttr("xmlns");
		}
		
		var codeModel = $code.find("model").text().trim();
		var codeDiagram = $code.find("diagram").text().trim();
		var params = this.getRequestParamList();
		var output = this.getReplyOutput();
		CodeEditorHelper.openCodeEditor({
			parentNode:this.getRootNode(),
			servicePath:this.getAppName(),
			params:params,
			output:output,
			codeModel:codeModel,
			codeDiagram:codeDiagram,
			codeType:"gox5",
			onReceive:function(result){
				var model = result.model;
				var diagram = result.diagram;
				var code = result.codeInfo.code;
				var params = result.codeInfo.functions["_inlineCode"].params;
				var resultType = result.codeInfo.functions["_inlineCode"].outputType;
				var resultGType = result.codeInfo.functions["_inlineCode"].outputGType;
				
				CodeEditorHelper.setCData($code.find("model"),model);
				CodeEditorHelper.setCData($code.find("diagram"),diagram);
				self.bizDoc.modified = true;
				self.bizDoc.setDirty(true);
				xuiService.getXuiDoc().saveJavaMethod({
					oldName:rpcName,
					name:rpcName,
					params:CodeEditorHelper.transformParams("gox5",params),
					content:code,
					resultType:CodeEditorHelper.transformOutput("gox5",resultType,resultGType),
					filePath: self.getServiceJavaPath()
				});
			}
		});
	};
	
	// typeData新增数据
	Model.prototype.typeDataAfterNew = function(event) {
		var replyData = this.comp("replyData");
		replyData.getCurrentRow().val("dataType", event.rows[0].val("value"))

	};

	// 删除数据的方法
	Model.prototype.deleteRowsAll = function(data, row) {
		var confirmDelete = data.confirmDelete;
		var directDeleteMode = data.directDeleteMode;
		data.confirmDelete = false;
		data.directDeleteMode = true;
		data.deleteData(row);
	}
	/***************************************************************************
	 * 2016-12-16 的修改内容 circuit
	 **************************************************************************/
	// 
	Model.prototype.addCallBackBtnClick = function(event) {
	};
	Model.prototype.exceptionBackDialog = function(event) {
	};
	Model.prototype.exceptionBackDataValueChange = function(event) {
		var oldValue = event.oldValue;
		var newValue = event.newValue;
		var actionName = this.comp("rpcData").getValue("parent");
		var col = event.col;
		var row = event.row;
		var data = {};
		data[col] = newValue;
		if (col == "fallback") {
			if (newValue) {
				this.setExceptionCircuit(actionName, {
					fallback : newValue
				});
			}
		}
	};
	Model.prototype.exceptionBackDataAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var attrs = {
			fallback : event.rows[0].val("fallback") || "",
		}
	};

	Model.prototype.deleteFallBackClick = function(event) {
		var fallback = this.comp("exceptionBackData");
		var row = fallback.getCurrentRow();
		if (row) {
			fallback.deleteData(row);
			var rpcName = row.val("actionName");
			if (rpcName) {
				this.bizDoc.remove($$__action + "[name='" + rpcName + "']>" + $$__exception + ">" + $$__circuit + "[fallback='" + row.val("value") + "']")
			}
		}
	};

	/***************************************************************************
	 * 2016-12-17 的修改内容 messageKey
	 **************************************************************************/

	Model.prototype.addErrorKeyClick = function(event) {
	};
	Model.prototype.exceptionKeyDialogOK = function(event) {
	};

	Model.prototype.exceptionMsgKeyAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var attrs = {
			value : event.rows[0].val("value") || "",
		}
	};

	Model.prototype.exceptionMsgKeyValueChange = function(event) {
		var col = event.col;
		var row = event.row;
		var newValue = event.newValue;
		var data = {};
		data[col] = event.newValue;
		var actionName = this.comp("rpcData").getValue("parent");
		if (col == "value") {
			if (newValue) {
				this.setExceptionMsgKey(actionName, {
					value : newValue
				})
			}
		}
	};

	Model.prototype.deleteKeyClick = function(event) {
		var MsgKey = this.comp("exceptionMsgKey");
		var row = MsgKey.getCurrentRow();
		if (row) {
			MsgKey.deleteData(row);
			var rpcName = row.val("actionName");
			if (rpcName) {
				this.bizDoc.remove($$__action + "[name='" + rpcName + "']>" + $$__exception + ">" + $$__messageKey + "[value='" + row.val("key") + "']")
			}
		}
	};

	/***************************************************************************
	 * 2016-12-17 的修改内容 messageDetail
	 **************************************************************************/
	Model.prototype.addErrorDetailClick = function(event) {
	};
	Model.prototype.exceptionDetailDialogOK = function(event) {
	};

	Model.prototype.exceptionMsgDetailValueChange = function(event) {
		var col = event.col;
		var row = event.row;
		var newValue = event.newValue;
		var data = {}
		data[col] = event.newValue;
		var actionName = this.comp("rpcData").getValue("parent");
		if (col == "value") {
			if (newValue) {
				this.setExceptionMessage(actionName, {
					value : newValue
				});
			}

		}
	};

	Model.prototype.exceptionMsgDetailAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var attrs = {
			value : event.rows[0].val("value") || "",
		}
	};
	Model.prototype.deleteDetailClick = function(event) {
		var MsgDetail = this.comp("exceptionMsgDetail");
		var row = MsgDetail.getCurrentRow();
		if (row) {
			MsgDetail.deleteData(row);
			var rpcName = row.val("actionName");
			if (rpcName) {
				this.bizDoc.remove($$__action + "[name='" + rpcName + "']>" + $$__exception + ">" + $$__messageDetail + "[value='" + row.val("value") + "']")
			}
		}
	};

	Model.prototype.exceptionParamsValueChange = function(event) {
		var col = event.col;
		var row = event.row;
		var data = {};
		data[col] = event.newValue;
		this.bizDoc.setAttr($$__action + "[name=" + row.val("actionName") + "]>" + $$__exception, data)
	};

	/***************************************************************************
	 * @---------------------------------------------------------12-27新加的内容
	 **************************************************************************/

	// 参数dialog的返回值
	Model.prototype.requestDialogReceived = function(event) {
		var param = event.data.data.param;
		var fieldNameList = event.data.data.param.fieldNameList;
		var status = event.data.data.status;
		var paramsData = this.comp("paramsData");
		var paramsNameData = this.comp("paramsNameData");
		var requestFieldNameData = this.comp("requestFieldName");
		var attrs = {};
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		if (status == "new") {
			paramsNameData.newData({
				defaultValues : [ {
					name : param.name,
				} ]
			});
			paramsData.newData({
				defaultValues : [ {
					rpcName : rpcName,
					name : param.name,
					dataType : param.dataType,
					requestType : param.requestType,
					required : "",
					desc : "",
					"default" : ""
				} ]
			});
			if (fieldNameList && fieldNameList.length > 0) {
				console.log('fieldNameList：-------------------' + JSON.stringify(fieldNameList));
				// this.removeQequestChildField(rpcName, param.name);
				// requestFieldNameData.clear();
				fieldNameList.forEach(function(item) {
					requestFieldNameData.newData({
						defaultValues : [ {
							actionName : rpcName,
							parentField : param.name,
							name : item.name
						} ]
					})
				})
			}
		} else if (status == "edit") {
			var self = this;
			paramsData.each(function(option) {
				if (self.editRow.val("name") == option.row.val("name")) {
					option.row.val("name", param.name);
					option.row.val("dataType", param.dataType)
				}
			})
			paramsNameData.each(function(option) {
				if (self.editRow.val("name") == option.row.val("name")) {
					option.row.val("name", param.name)
				}
			});
			if (fieldNameList && fieldNameList.length > 0) {
				console.log('fieldNameList：-------------------' + JSON.stringify(fieldNameList));
				var rows = requestFieldNameData.find([ 'parentField' ], [ self.editRow.val('name') ], true);
				if (rows.length > 0) {
					requestFieldNameData.deleteData(rows);
					this.removeQequestChildField(rpcName, self.editRow.val('name'));
				}
				fieldNameList.forEach(function(item) {
					requestFieldNameData.newData({
						defaultValues : [ {
							actionName : rpcName,
							parentField : param.name,
							name : item.name
						} ]
					});
				})
			}
		}

	};

	// 获取引用类型的应用名称:
	Model.prototype.getQuoteAppName = function() {
		return this.bizDoc.queryAsJson('uses>use', function($node, jsonItem) {
		})
	}

	// 添加 param字段
	Model.prototype.addRelationClick = function(event) {
		var rpcData = this.comp("rpcData");
		var paramNames = this.comp("paramsNameData");
		if (rpcData.count() == 0) {
			justep.Util.hint("请选择服务！", {
				type : "danger"
			});
		} else {
			var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
			this.comp("requestDialog").open({
				data : {
					path : path,
					status : "new",
					paramFieldNames : this.getAllParamFieldNames(paramNames),
					fullPath : this.filePath,
					quoteAppName : this.getQuoteAppName()
				}
			});
			// this.comp("paramNameDialog").show();
		}
	};

	// 修改param 字段
	Model.prototype.editParamClick = function(event) {
		var row = event.bindingContext.$object;
		this.editRow = row;
		var paramNames = this.comp("paramsNameData");
		var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent")
		var fieldList = this.queryParamFieldList(rpcName, row.val("name"));
		var fieldChildList = this.queryQequestChildField(rpcName, row.val('name'));
		console.log('fieldChildList：----------------' + JSON.stringify(fieldChildList));
		if (row.val("requestType") == "invariable") {
			justep.Util.hint("分页数据不能修改");
			return

		}
		this.comp("requestDialog").open({
			data : {
				fieldList : fieldList || [],
				status : "edit",
				path : path,
				paramFieldNames : this.getAllParamFieldNames(paramNames),
				quoteAppName : this.getQuoteAppName(),
				fieldChildList : fieldChildList
			}
		})
	};

	// 获取所有的param的字段名称:
	Model.prototype.getAllParamFieldNames = function(data) {
		var arr = [];
		if (data.count() > 0) {
			data.each(function(option) {
				arr.push(option.row.val("name"));
			})
		}
		return arr;
	}

	/** *********所以的查询********************* */

	/** ********2017-1-17 start-------------------* */
	
	
	
	// 添加requestChildField
	Model.prototype.addQequestChildField = function(actionName, fieldName, attrs) {
		this.bizDoc.append($$__action + "[name='" + actionName + "']>param>field[name='" + fieldName + "']", "<field></field>", attrs);
	};

	// 删除requestChildField字段
	Model.prototype.removeQequestChildField = function(actionName, fieldName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>param>field[name='" + fieldName + "']>field");
	}

	// 查询requestChildField字段
	Model.prototype.queryQequestChildField = function(actionName, fieldName) {
		return this.bizDoc.queryAsJson($$__action + "[name='" + actionName + "']>param>field[name='" + fieldName + "']>field", function($node, jsonItem) {
		})
	}

	// 设置requestChildField字段
	Model.prototype.setAttrQequestChildField = function(params) {
		this.bizDoc.setAttr($$__action + "[name='" + params.actionName + "']>param>field[name='" + params.name + "']>field[name='" + params.child + "']", params.attrs);
	}

	// 添加resultChildField
	Model.prototype.addResultChildField = function(actionName, fieldName, attrs) {
		this.bizDoc.append($$__action + "[name='" + actionName + "']>reply>field[name='" + fieldName + "']", "<field></field>", attrs);
	};

	// 删除resultChildField字段
	Model.prototype.removeResultChildField = function(actionName, fieldName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>reply>field[name='" + fieldName + "']>field");
	}

	// 查询resultChildField字段
	Model.prototype.queryResultChildField = function(actionName, fieldName) {
		console.log('result' + name);
		return this.bizDoc.queryAsJson($$__action + "[name='" + actionName + "']>reply>field[name='" + fieldName + "']>field", function($node, jsonItem) {
		})
	}

	// 设置resultChildField字段
	Model.prototype.setAttrResultChildField = function(params) {
		this.bizDoc.setAttr($$__action + "[name='" + params.actionName + "']>reply>field[name='" + params.name + "']>field[name='" + params.child + "']", params.attrs);
	}

	/** ********2017-1-17 end-------------------* */

	// 查询param的当前字段
	Model.prototype.queryParamFieldList = function(actionName, fieldName) {
		return this.bizDoc.queryAsJson($$__action + "[name='" + actionName + "']>param>field[name='" + fieldName + "']", function($node, jsonItem) {
		})
	}
	
	// 删除 http下所有的字段
	Model.prototype.removeAllHttpField = function(actionName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>http>param")
	}
	
	// 删除 param 下 所有的字段

	Model.prototype.removeAllParam = function(actionName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>param")
	}

	Model.prototype.removeAllReply = function(actionName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>reply")
	}

	// 删除param的当前字段
	Model.prototype.removeParamField = function(actionName, fieldName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>param>field[name='" + fieldName + "']");
	}

	Model.prototype.removeResultField = function(actionName, name) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>reply>field[name='" + name + "']");
	}
	
	// 查询 当前action 的 param
	Model.prototype.queryParamVal = function(actionName) {
		return this.bizDoc.queryAsJson($$__action + "[name='" + actionName + "']>param>field", function($node, jsonItem) {
		})
	}
	
	// 查询当前 action 的 result
	
	Model.prototype.queryResultValByAction = function(actionName) {
		return this.bizDoc.queryAsJson($$__action + "[name='" + actionName + "']>reply>field", function($node, jsonItem) {
		})
	}
	
	// 查询返回值
	Model.prototype.queryResultVal = function(actionName, resultName) {
		return this.bizDoc.queryAsJson($$__action + "[name='" + actionName + "']>reply>field[name='" + resultName + "']", function($node, jsonItem) {
		})
	}

	// 添加请求字段
	Model.prototype.addRequestField = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>param").length == 0) {
			if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>reply").length > 0) {
				this.bizDoc.insertBefore($$__action + "[name='" + actionName + "']>reply", "<param></param>")
			} else if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>http").length > 0) {
				this.bizDoc.insertBefore($$__action + "[name='" + actionName + "']>http", "<param></param>")
			} else {
				this.bizDoc.append($$__action + "[name='" + actionName + "']", "<param></param>");
			}
		}
		this.bizDoc.append($$__action + "[name='" + actionName + "']>param", "<field></field>", attrs);
	}

	// 添加 返回 字段
	Model.prototype.addReplyField = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>reply").length == 0) {
			if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>http").length > 0) {
				this.bizDoc.insertBefore($$__action + "[name='" + actionName + "']>http", "<reply></reply>")
			} else {
				this.bizDoc.append($$__action + "[name='" + actionName + "']", "<reply></reply>");
			}
		}
		this.bizDoc.append($$__action + "[name='" + actionName + "']>reply", "<field></field>", attrs);
	}

	// 添加httpParams
	Model.prototype.addHttpParams = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>http").length == 0) {
			this.bizDoc.append($$__action + "[name='" + actionName + "']", "<http></http>");
		}
		this.bizDoc.append($$__action + "[name='" + actionName + "']>http", "<param></param>", attrs);
	}

	// 设置httpParams属性
	Model.prototype.setHttpParams = function(actionName, name, attrs) {
		this.bizDoc.setAttr($$__action + "[name='" + actionName + "']>http>param[name='" + name + "']:first", attrs);
	};

	// 添加返回字段
	Model.prototype.addResultField = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>reply").length == 0) {
			this.bizDoc.append($$__action + "[name='" + actionName + "']", "<reply></reply>");
		}
		this.bizDoc.append($$__action + "[name='" + actionName + "']>reply", "<field></field>", attrs);
	}
	// 添加错误信息
	Model.prototype.addExceptionList = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>exception").length > 0) {
			this.remove($$__action + "[name='" + actionName + "']>exception");
		}
		this.bizDoc.append($$__action + "[name='" + actionName + "']", "<exception></exception>", attrs)
	}

	// 添加错误的请求转发字段
	Model.prototype.setExceptionCircuit = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>exception>circuit").length == 0) {
			this.bizDoc.append($$__action + "[name='" + actionName + "']>exception", "<circuit></circuit>");
		}
		this.bizDoc.setAttr($$__action + "[name='" + actionName + "']>exception>circuit", attrs);
	}

	// 添加错误的msgKey
	Model.prototype.setExceptionMsgKey = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>exception>messageKey").length == 0) {
			this.bizDoc.append($$__action + "[name='" + actionName + "']>exception", "<messageKey></messageKey>");
		}
		this.bizDoc.setAttr($$__action + "[name='" + actionName + "']>exception>messageKey", attrs);
	}
	// 添加错误的megdetail
	Model.prototype.setExceptionMessage = function(actionName, attrs) {
		if ($(this.bizDoc.docRoot).find("action[name='" + actionName + "']>exception>message").length == 0) {
			this.bizDoc.append($$__action + "[name='" + actionName + "']>exception", "<message></message>");
		}
		this.bizDoc.setAttr($$__action + "[name='" + actionName + "']>exception>message", attrs);
	}

	// 设置请求数据的field属性
	Model.prototype.setRequestAttr = function(actionName, name, attrs) {
		this.bizDoc.setAttr($$__action + "[name='" + actionName + "']>param>field[name='" + name + "']:first", attrs);
	};

	// 设置返回数据的field属性
	Model.prototype.setResultAttr = function(actionName, name, attrs) {
		this.bizDoc.setAttr($$__action + "[name='" + actionName + "']>reply>field[name='" + name + "']:first", attrs);
	}

	// 移除错误的请求转发字段
	Model.prototype.removeExceptionCircuit = function(actionName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>exception>circuit");
	}

	// 移除错误的msgKey
	Model.prototype.removeExceptionMsgKey = function(actionName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>exception>messageKey");
	}

	// 移除错误的msgdetail
	Model.prototype.removeExceptionMessage = function(actionName) {
		this.bizDoc.remove($$__action + "[name='" + actionName + "']>exception>message");
	}

	/** ****************************************************************************** */

	// 删除字段
	Model.prototype.delParamClick = function(event) {
		var paramsData = this.comp("paramsData");
		var paramsNameData = this.comp("paramsNameData");
		var row = event.bindingContext.$object;
		paramsData.remove(row);
		paramsNameData.remove(row);
		this.removeParamField(row.val("rpcName"), row.val("name"));
	};

	// 返回设置的参数

	Model.prototype.resultDialogReceived = function(event) {
		var param = event.data.data.param;
		var status = event.data.data.status;
		var replyData = this.comp("replyData");

		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var fieldNameList = event.data.data.param.fieldNameList;
		var resultFieldNameData = this.comp("resultFieldName");
		var attrs = {};
		if (status == "new") {
			replyData.newData({
				defaultValues : [ {
					rpcName : rpcName,
					name : param.name,
					dataType : param.dataType,
					resultType : param.resultType
				} ]
			});

			if (fieldNameList && fieldNameList.length > 0) {
				console.log('fieldNameList：-------------------' + JSON.stringify(fieldNameList));
				fieldNameList.forEach(function(item) {
					resultFieldNameData.newData({
						defaultValues : [ {
							actionName : rpcName,
							parentField : param.name,
							name : item.name
						} ]
					})
				})
			}
		} else if (status == "edit") {
			var self = this;
			var rows = replyData.find([ "name" ], [ "result" ]);
			console.log(rows[0]);
			if (rows.length > 0) {
				rows[0].val("dataType", param.dataType);
				rows[0].val("resultType", param.resultType);
			}
			if (fieldNameList && fieldNameList.length > 0) {
				console.log('fieldNameList：-------------------' + JSON.stringify(fieldNameList));
				var rows = resultFieldNameData.find([ 'parentField' ], [ "result" ], true);
				console.log('rows:--------' + rows.length);
				if (rows.length > 0) {
					resultFieldNameData.deleteData(rows);
					this.removeResultChildField(rpcName, "result");
				}
				fieldNameList.forEach(function(item) {
					resultFieldNameData.newData({
						defaultValues : [ {
							actionName : rpcName,
							parentField : param.name,
							name : item.name
						} ]
					})
				})
			}
		}

	};

	// 修改reslut
	Model.prototype.editResultClick = function(event) {
		var row = event.bindingContext.$object;
		this.resultRow = row;
		var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent")
		var result = this.queryResultVal(rpcName, row.val("name"));
		var fieldChildList = this.queryResultChildField(rpcName, row.val('name'));
		console.log('fieldChildList：----------------' + JSON.stringify(fieldChildList));
		if (row.val("resultType") == "invariable") {
			justep.Util.hint("分页数据不能修改");
			return

			

						

			

									

			

						

			

												

			

						

			

									

			

						

			

		}

		this.comp("resultDialog").open({
			data : {
				resultList : result || [],
				status : "edit",
				path : path,
				quoteAppName : this.getQuoteAppName(),
				fieldChildList : fieldChildList
			}
		})
	};

	Model.prototype.requestPageableConfig = function(rpcName) {
		var arr = [ {
			rpcName : rpcName,
			name : "offset",
			dataType : "INTEGER",
			requestType : "invariable",
			defaultValue : ""
		}, {
			rpcName : rpcName,
			name : "limit",
			dataType : "INTEGER",
			requestType : "invariable",
			defaultValue : ""
		} ];
		return arr;
	}

	// 分页请求信息
	Model.prototype.pageable = function(data, arr) {
		for (var i = 0; i < arr.length; i++) {
			data.newData({
				"defaultValues" : [ {
					"rpcName" : arr[i].rpcName,
					"name" : arr[i].name,
					"dataType" : arr[i].dataType
				} ]
			})
		}
	}

	Model.prototype.addPageable = function(data) {
		var arr = [ "offset", "limit" ];
		arr.forEach(function(item) {
			data.newData({
				"defaultValues" : [ {
					"name" : item
				} ]
			})
		})
	}

	// 分页的返回信息
	Model.prototype.pageableResultConfig = function(rpcName) {
		var arr = [ {
			rpcName : rpcName,
			name : "total",
			resultType : "invariable",
			dataType : "LONG"
		} ]
		return arr;
	}

	// 添加分页的字段
	Model.prototype.addPageableClick = function(event) {
		var rpcData = this.comp("rpcData");
		if (rpcData.count() == 0) {
			justep.Util.hint("请选择服务！", {
				type : "danger"
			});
		} else {
			var paramsNameData = this.comp("paramsNameData");
			var paramsData = this.comp("paramsData");
			var replyData = this.comp("replyData");
			var rpcName = rpcData.getValue("parent")
			var offsetRow = paramsData.find([ "name" ], [ "offset" ]);
			var limitRow = paramsData.find([ "name" ], [ "limit" ]);
			offsetRow.length > 0 && paramsData.remove(offsetRow)
			limitRow.length > 0 && paramsData.remove(limitRow)

			var requestArr = this.requestPageableConfig(rpcName);
			var resultArr = this.pageableResultConfig(rpcName);
			this.pageable(paramsData, requestArr);
			this.pageable(replyData, resultArr);
			this.addPageable(paramsNameData);
		}
	};

	// 删除返回值
	Model.prototype.delResultClick = function(event) {
		var replyData = this.comp("replyData");
		var row = event.bindingContext.$object;
		replyData.remove(row);
		this.removeResultField(row.val("rpcName"), row.val("name"));
	};

	// 添加返回值
	Model.prototype.addResultClick = function(event) {
		var rpcData = this.comp("rpcData");
		var replyData = this.comp("replyData");
		if (rpcData.count() == 0) {
			justep.Util.hint("请选择服务！", {
				type : "danger"
			});
		} else {
			var path = this.filePath.substr(0, this.filePath.lastIndexOf('/'));
			this.comp("resultDialog").open({
				data : {
					path : path,
					status : "new",
					fullPath : this.filePath,
					quoteAppName : this.getQuoteAppName()
				}
			});
		}
	};

	// 错误属性新建时
	Model.prototype.exceptionParamsAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var attrs = {
			trigger : event.rows[0].val("trigger") || "",
			tiemout : event.rows[0].val("tiemout") || "",
			"switch" : event.rows[0].val("switch") || ""
		}
	};

	Model.prototype.urlCheckboxChange = function(event) {
		var data = this.comp("exceptionParams");
		var rpcData = this.comp("rpcData");
		var message = this.comp("exceptionMsgDetail");
		var mesKey = this.comp("exceptionMsgKey");
		var fallBack = this.comp("exceptionBackData");
		var actionName = rpcData.getValue("parent")
		var rows = data.find([ "actionName" ], [ rpcData.getValue("parent") ]);
		if (rows.length > 0) {
			if (event.checked) {
				this.switchs.set("circuit");
				rows[0].val("switch", "circuit");
				this.removeExceptionMessage(actionName);
				this.removeExceptionMsgKey(actionName);
				message.setValue("value", "");
				mesKey.setValue("value", "");
			} else {
				this.switchs.set("message");
				rows[0].val("switch", "message");
				this.setExceptionMessage(actionName, {
					value : mesKey.getValue("value")
				});
				this.setExceptionMsgKey(actionName, {
					value : message.getValue("value")
				})
			}
		}
	};

	Model.prototype.msgCheckboxChange = function(event) {
		var data = this.comp("exceptionParams");
		var message = this.comp("exceptionMsgDetail");
		var fallBack = this.comp("exceptionBackData");
		var mesKey = this.comp("exceptionMsgKey");
		var rpcData = this.comp("rpcData");
		var actionName = rpcData.getValue("parent")
		var fallback = fallBack.getValue("fallback");
		var rows = data.find([ "actionName" ], [ actionName ]);
		if (rows.length > 0) {
			if (event.checked) {
				this.switchs.set("message");
				rows[0].val("switch", "message");
				this.removeExceptionCircuit(actionName);
				fallBack.setValue("fallback", "");
			} else {
				this.switchs.set("circuit");
				rows[0].val("switch", "circuit");
				this.setExceptionCircuit(actionName, {
					fallback : fallback
				})
			}
		}
	};

	Model.prototype.paramsDataDeleteError = function(event) {
	};

	Model.prototype.rpcDataValueChange = function(event) {
		var rpcData = this.comp("rpcData");
		var name = event.row.val('parent');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		if (name) {
			if (col == "label") {
				$(this.bizDoc.docRoot).find($$__action + "[name='" + name + "']>label").text(newValue);
			} else if (col == "description") {
				$(this.bizDoc.docRoot).find($$__action + "[name='" + name + "']>description").text(newValue);
			} else if (col == "impl") {
				this.bizDoc.setAttr($$__action + "[name='" + name + "']", {
					impl : newValue
				})
			}
			this.bizDoc.fireEvent("contentChange", {
				type : 'removeAttr'
			});
		}
	};
	/***************************************************************************
	 * 
	 * 2017-1-17新增
	 **************************************************************************/

	// 新建时请求的子字段
	Model.prototype.requestFieldNameAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		if (rpcName) {
			if (event.rows[0].val("name")) {
				var attrs = {
					name : event.rows[0].val("name") || "",
					parentField : event.rows[0].val("parentField") || "",
				}
				this.addQequestChildField(rpcName, event.rows[0].val("parentField"), attrs);
			}
		}
	};

	Model.prototype.requestFieldNameValueChange = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var name = event.row.val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		if (name) {
			this.setAttrQequestChildField({
				actionName : rpcName,
				name : event.row.val('parentField'),
				child : event.row.val('name'),
				attrs : attr
			});
		}
	};

	Model.prototype.resultFieldNameValueChange = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		var name = event.rows[0].val('name');
		var newValue = event.newValue;
		var oldValue = event.oldValue;
		var col = event.col;
		var attr = {};
		attr[col] = newValue;
		if (name) {
			this.setAttrResultChildField({
				actionName : rpcName,
				name : event.rows[0].val('parentField'),
				child : event.rows[0].val('name'),
				attrs : attr
			});
		}
	};

	Model.prototype.resultFieldNameAfterNew = function(event) {
		var rpcData = this.comp("rpcData");
		var rpcName = rpcData.getValue("parent");// 当前rpcName
		if (rpcName) {
			if (event.rows[0].val("name")) {
				var attrs = {
					name : event.rows[0].val("name") || "",
					parentField : event.rows[0].val("parentField") || "",
				}
				this.addResultChildField(rpcName, event.rows[0].val("parentField"), attrs);
			}
		}
	};

	Model.prototype.designBtnClick = function(event) {
		this.isSourceEditor = false;
		if (this.xmlChanged) {// 如果源码修改，需要重新加载流程图
			this.bizDoc.setContent(this.sourceEditor.getContent());
		}
		this.xmlChanged = false;
	};
	
	Model.prototype.getFirstWordToUpperCase = function (word) {
	    word = word.toLowerCase()
		return word.replace(word.substr(0,1),function(key){
				return key.toUpperCase()
		})
	}
	
	Model.prototype.getRequestParamList = function(actionName){
		var rpcNameData = this.comp("rpcNameData")
		var row = rpcNameData.getCurrentRow()
		if(!actionName && !row ){
			return []
		}
		var list = this.queryParamVal(actionName || row.val('name'))
		var self = this
		if(list && list.length>0){
			var paramList = []
			list.forEach(function(item){
				if(item.dataType.indexOf('[')!= -1){
					paramList.push({
						gType: self.getFirstWordToUpperCase(item.dataType.slice(item.dataType.indexOf("[")+1,item.dataType.lastIndexOf("]"))),
						type:item.dataType.slice(0,item.dataType.indexOf("[")),
						value: item.name
					})
				}else {
					paramList.push({
						type: self.getFirstWordToUpperCase(item.dataType),
						value: item.name
					})
				}
			})
			return paramList
		}
		return []
	}
	
	Model.prototype.getReplyOutput = function(actionName){
		var rpcNameData = this.comp("rpcNameData")
		var row = rpcNameData.getCurrentRow()
		if(!actionName && !row){
			return []
		}
		var list = this.queryResultValByAction(actionName ||row.val('name'))
		var self = this
		if(list && list.length>0){
			output = {};
			var result = list[0]
			if(result.dataType.indexOf('[')!= -1){
				output.gType = self.getFirstWordToUpperCase(result.dataType.slice(result.dataType.indexOf("[")+1,result.dataType.lastIndexOf("]")))
				output.type = result.dataType.slice(0,result.dataType.indexOf("["))
			}else {
				output.type=self.getFirstWordToUpperCase(result.dataType)
			}
			return output
		}
		return {}
	}
	
	
	
	Model.prototype.getServiceJavaPath = function(){
		if(!this.filePath){
			return ''
		}
		var filePath = this.filePath  // service/comp/send/send.service.m
		var appPath = filePath.substr(0,filePath.lastIndexOf('/'))  // service/comp/send
		//var appName = filePath.slice(filePath.indexOf('/')+1,filePath.lastIndexOf('/')) // comp.send
		var appName = this.getAppName().replace(/\./g,"/")
		var modeName = this.getFirstWordToUpperCase(filePath.substr(filePath.lastIndexOf('/')+1).split('.')[0]) // send
		return appPath + '/src/main/java/'+ appName+'/service/'+ modeName+'UserService.java'
	}
	
	Model.prototype.getAppName = function(){
		return DataAssembly.getCurrentAppName(this.filePath)
	}
	return Model;
});