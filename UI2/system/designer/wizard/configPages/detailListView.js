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
		this.comp('titleInput').val("从列表");
		this.dataId = "detailData";
	};
	
	Model.prototype.modelParamsReceive = function(event){
		this.showAllColumns();
	};

	Model.prototype.showAllColumns = function() {
		var listData = this.comp('detailData');
		var config = this.templateEngine.getConfig();
		var detailDataConfig = config.current ? config.current.detailData : '';
		
		if(detailDataConfig==undefined || detailDataConfig==""){
			alert("请先选择数据对象");
			return;
		}
		if(detailDataConfig.concept==this.lastConcept && detailDataConfig.reader==this.LastReader) return;
		
		
		//获取数据
		var data = detailDataConfig.relations.slice(0);
		var hasMaster = false;
		
		//检查是否从数据
		$.each(data, function(){
			if(this.name=='fMasterID'){
				hasMaster = true;
				return false;
			}
		})

		if(!hasMaster){
			alert("请选择一个从数据对象");
			return;
		}

		for ( var i = data.length-1; i >= 0 ; i--) {
			//删除主键列、版本列
			if(data[i].label == undefined || data[i].name == "version" || data[i].name == "fMasterID" ){
				data.splice(i,1);
			}else{
				data[i].xid = Data.UUID();
				data[i].colEditor = 'ed';
				data[i].isVisible = '是';
				data[i].index = i;
				data[i].labelName = data[i].label;
			}
		}
		listData.loadData({
			"@type" : "table",
			"rows" : data
		},false);
		
		//listData.first();
		this.comp("dataTables1").refresh();
		
		this.lastConcept = detailDataConfig.concept;
		this.LastReader = detailDataConfig.reader;
	}; 

	Model.prototype.addClick = function(event) {
		var data = this.comp('detailData');
		var config = this.templateEngine.getConfig();
//		var DataConfig = config.current ? config.current.detailData :{};
		/*var keys = [];
		var detailDataConfig = DataConfig["id_0"] ? DataConfig["id_0"] :'';*/
		var detailDataConfig = config.current ? config.current.detailData :{};
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

	Model.prototype.finish = function(wizard) {
		var detailData = this.comp('detailData');
		var detail_list = [];
		var i = 0;
		var dataId = this.dataId;
		var self = this;
		detailData.each(function(param) {
			var row = param.row;
			var field = detailData.getValue("alias", row);
			var fieldLabel = detailData.getValue("labelName", row);
			even = i % 2;
			var fieldName = "list_field" + (even + 1);
			var fieldFormat = fieldName + "Format";
			var fieldLabels = fieldName + "Label";
			if (even == 0) {
				detail_list.push({});;
			}
			detail_list[detail_list.length -1][fieldName] = field;
			detail_list[detail_list.length -1][fieldFormat] = "";
			detail_list[detail_list.length -1]["list_data"] = dataId;
			detail_list[detail_list.length -1][fieldLabels] = fieldLabel;
			i++;
		});
		if(detail_list.length > 4)//大于8列时给dataTables组件增加scrollX属性
			this.templateEngine.addContext(this.templateFile, "col_more", "col_more");
		this.templateEngine.addContext(this.templateFile, "detail_list", detail_list);
		this.templateEngine.addContext(this.templateFile, "detail_title", this.comp("titleInput").value);
		this.templateEngine.addContext(this.templateFile, "detail_data", dataId);

		var config = this.templateEngine.getConfig();
		var dialog = this.getContext().getRequestParameter("dialog");
		dialog = dialog.split(".")[0];
		if(config.dialog[dialog])
			this.templateEngine.addContext(this.templateFile, "dialog_filename", config.dialog[dialog].filename + ".w");
	};

	Model.prototype.input1Change = function(event) {
		/*
		 * TODO: templateService.set("listHeader", { title : event.source.val()
		 * });
		 */
	};
	return Model;
});
