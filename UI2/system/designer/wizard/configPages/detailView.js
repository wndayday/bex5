define(function(require) {
	var $ = require("jquery");
	var Data = require("$UI/system/components/justep/data/data");
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");

	var Model = function() {
		this.callParent();
		this.lastConcept = "";
		this.LastReader = "";
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.templateFilePath = this.templateEngine.templatePath + "/" + this.templateFile;
		this.comp('titleInput').val("从详细");
	};

	Model.prototype.modelParamsReceive = function(event){
		this.showAllColumns();
	};

	Model.prototype.showAllColumns = function() {
		var listData = this.comp('detailData');
		var config = this.templateEngine.getConfig();
		var mainDataConfig = config.current ? config.current.detailData :'';
		
		if(mainDataConfig==undefined || mainDataConfig==""){
			alert("请先选择数据对象");
			return;
		}
		if(mainDataConfig.concept==this.lastConcept && mainDataConfig.reader==this.LastReader) return;
		
		//获取数据
		var data = mainDataConfig.relations.slice(0);

		for ( var i = data.length-1; i >= 0 ; i--) {
			//删除主键列、版本列
			if(data[i].label == undefined || data[i].name == "version" || data[i].name == "fMasterID" ){
				data.splice(i,1);
			}else{
				data[i].xid = Data.UUID();
				data[i].colEditor = 'input';
				data[i].colEditorName = '输入框';
				data[i].index = i;
				data[i].labelName = data[i].label;
			}
		}
		listData.loadData({
			"@type" : "table",
			"rows" : data
		},false);
		
		//listData.first();
		this.comp("grid1").refresh();
		
		this.lastConcept = mainDataConfig.concept;
		this.LastReader = mainDataConfig.reader;
	}; 

	Model.prototype.addClick = function(event) {
		var data = this.comp('detailData');
		var config = this.templateEngine.getConfig();
		var detailDataConfig = config.current ? config.current.detailData : {};
		templateService.openSwtCommonSelectorDialog({
			title : "选择列",
			templateFilePath : this.templateFilePath,
			targetPath : this.templateEngine.getTargetPath(),
			concept : detailDataConfig.concept,
			reader : detailDataConfig.reader,
			writer : detailDataConfig.writer,
			creator : detailDataConfig.creator,
			relations : detailDataConfig.relations,
			datasource : {
				mutiSelect : true,
				method : "RuleRelationDatasource.getDatasource"
			}
		}, function(result) {
			for ( var i = 0; i < result.length; i++) {
				result[i].colEditor = 'input';
				result[i].index = i;
				result[i].labelName = result[i].label;
			}
			data.clear();
			if (result.length > 0) {
				data.newData({
					defaultValues : result
				});
			}
		});
	};

	Model.prototype.deleteClick = function(event) {
		var data = this.comp('detailData');
		var xid = data.val("name");
		data.deleteData();
	};

	Model.prototype.upClick = function(event) {
		var data = this.comp('detailData');
		if(data.count() > 0){
			var row1 = data.getCurrentRow();
			if(data.getRowIndex(row1) > 0){
				data.pre();
				var row2 = data.getCurrentRow();
				data.exchangeRow(row1, row2);
				data.to(row1);
			}
		}
	};

	Model.prototype.downClick = function(event) {
		var data = this.comp('detailData');
		if(data.count() > 0){
			var row1 = data.getCurrentRow();
			if(data.getRowIndex(row1) < data.count() - 1){
				data.next();
				var row2 = data.getCurrentRow();
				data.exchangeRow(row1, row2);
				data.to(row1);
			}
		}
	};

	Model.prototype.getConceptByData = function(data, row) {
		var currentDatas = this.templateEngine.getConfig().current.datas;
		for ( var cds in currentDatas) {
			if (cds == data.val("selectDataID", row)) {
				return currentDatas[cds].concept;
			}
		}
		;
	};

	/** 页面显示之前调用的方法--框架调用 */
	Model.prototype.beforeOpen = function() {

	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp('detailData');
//		var input = this.comp('titleInput');
//		var title = input.val();
		var self = this;
		if (data.datas.get().length <= 0) {
			msg += "请添加数据项，\n";
		}
//		if (!title || "" == title.trim()) {
//			msg += "从表页没有输入标题，\n";
//		}
		data.each(function(param) {
			var row = param.row;
			var currentName = data.val("name", row);
			var refID = data.val("refID", row);
			var selectDataID = data.val("selectDataID", row);
			var selectLabelName = data.val("selectLabelName", row);
			if (selectDataID != "") {
				if (refID == "") {
					msg += "‘关系名称’ 为   '" + currentName + "' 的列     '对应ID'  不能为空\n";
				}
				if (selectLabelName == "") {
					msg += "‘关系名称’ 为   '" + currentName + "' 的列     '关联列名'  不能为空\n";
				}
			}
		});
		return msg;
	};

	/*
	 * 获取从data数据
	 * */
	Model.prototype.getData = function() {
		var detailData = [];
		var config = this.templateEngine.getConfig();
		var detailDataConfig = config.current ? config.current.detailData : {};
		detailData.push(detailDataConfig);
		return detailData;
	}
	Model.prototype.finish = function(wizard) {
		var detailData = this.comp('detailData');
		var detail = [];
		var detailForm = [];
		var dataId = "detailData";
		var self = this;
		var i = 0;
		detailData.each(function(param) {
			var row = param.row;
			even = i % 2;
			var fieldName = "fieldName" + (even + 1);
			var field = detailData.getValue("alias", row);
			var refID = detailData.val("refID", row);
			var selectDataID = detailData.val("selectDataID", row);
			var selectLabelName = detailData.val("selectLabelName", row);
			var selectConcept = self.getConceptByData(detailData, row);
			var form_password, form_range, form_output, form_textarea, form_input;
			var colEditor = detailData.val("colEditor", row);
			switch (colEditor) {
			case "password":
				form_password = "form_password";
				break;
			case "range":
				form_range = "form_range";
				break;
			case "output":
				form_output = "form_output";
				break;
			case "textarea":
				form_textarea = "form_textarea";
				break;
			case "input":
				form_input = "form_input";
			}
			var formInput = "input" + fieldName;
			var formPassword = "password" + fieldName;
			var formRange = "range" + fieldName;
			var formOutput = "output" + fieldName;
			var formText = "text" + fieldName;
			if (even == 0) {
				detailForm.push({});
			}
			detailForm[detailForm.length - 1][fieldName] = field;
			detailForm[detailForm.length - 1]["form_data"] = dataId;
			detailForm[detailForm.length - 1]["form_refID"] = refID;
			detailForm[detailForm.length - 1]["form_selectDataID"] = selectDataID;
			detailForm[detailForm.length - 1]["form_selectLabelName"] = selectLabelName;
			detailForm[detailForm.length - 1]["form_selectConcept"] = selectConcept;
			detailForm[detailForm.length - 1][formInput] = form_input;
			detailForm[detailForm.length - 1][formPassword] = form_password;
			detailForm[detailForm.length - 1][formRange] = form_range;
			detailForm[detailForm.length - 1][formOutput] = form_output;
			detailForm[detailForm.length - 1][formText] = form_textarea;
			i++;
			detail.push({
				"detail_field" : field,
				"detail_data" : dataId,
				"detail_refID" : refID,
				"detail_selectDataID" : selectDataID,
				"detail_selectLabelName" : selectLabelName,
				"detail_selectConcept" : selectConcept,
				"detail_input" : form_input,
				"detail_password" : form_password,
				"detail_range" : form_range,
				"detail_output" : form_output,
				"detail_textarea" : form_textarea
			});
		});

		this.templateEngine.addContext(this.templateFile, "detail", detail);
		this.templateEngine.addContext(this.templateFile, "detailForm", detailForm);
		this.templateEngine.addContext(this.templateFile, "detail_title", this.comp("titleInput").value);
		this.templateEngine.addContext(this.templateFile, "detail_data", dataId);
		this.templateEngine.addContext(this.templateFile, "detailFormData", this.getData());
	};

	Model.prototype.input1Change = function(event) {
		/*
		 * TODO: templateService.set("listHeader", { title : event.source.val()
		 * });
		 */
	};

	return Model;
});