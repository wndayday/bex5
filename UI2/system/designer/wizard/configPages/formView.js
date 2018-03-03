/* ------------------------------------------------------------ 
表单模版处理

参数：
form[{
form_data
form_label
form_field}]
模版:
{{#each form}}<div component="$UI/system/components/justep/labelEdit/labelEdit"
	class="x-label-edit">
	<label class="x-label left" bind-text="$model.{{form_data}}.label('{{form_field}}')" />
	<div class="x-edit">
		<input class="form-control" component="$UI/system/components/justep/input/input"
			data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')" />
	</div>
</div>{{/each}}  
------------------------------------------------------------ */
	
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
//		var config = this.templateEngine.getConfig();
//		this.dataId = config.current.mainData.dlgDataId ? config.current.mainData.dlgDataId : "mainData";
		this.comp('titleInput').val("标题");
	}; 
	
	Model.prototype.modelParamsReceive = function(event){
		this.showAllColumns();
	};

	Model.prototype.showAllColumns = function() {
		var listData = this.comp('formData');
		var config = this.templateEngine.getConfig();
		var mainDataConfig = config.current ? config.current.mainData :'';
		
		if(mainDataConfig==undefined || mainDataConfig==""){
			alert("请先选择数据对象");
			return;
		}
		if(mainDataConfig.concept==this.lastConcept && mainDataConfig.reader==this.LastReader) return;
		
		//获取数据
		var data = mainDataConfig.relations.slice(0);

		for ( var i = data.length-1; i >= 0 ; i--) {
			//删除主键列、版本列
			if(data[i].label == undefined || data[i].name == "version" || data[i].name == "fParent" || data[i].name == "fNodeKind"){
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
		this.comp('grid1').refresh();
		
		this.lastConcept = mainDataConfig.concept;
		this.LastReader = mainDataConfig.reader;
	}; 
	
	Model.prototype.getDataId = function() {//判断该配置项是否为dialog页
		var config = this.templateEngine.getConfig();
		var dialogData = config.current.dialogData ? config.current.dialogData : {}; 
		return dialogData.dlgDataId ? dialogData.dlgDataId : "mainData";
	}
	
	Model.prototype.addClick = function(event) {
		var data = this.comp('formData');
		var config = this.templateEngine.getConfig();
		var mainDataConfig = config.current ? config.current.mainData :'';
		templateService.openSwtCommonSelectorDialog({
			title : "选择列", 
			templateFilePath : this.templateFilePath, 
			targetPath : this.templateEngine.getTargetPath(), 
			concept : mainDataConfig.concept,
			reader : mainDataConfig.reader,
			writer : mainDataConfig.writer,
			creator : mainDataConfig.creator,
			relations : mainDataConfig.relations,
			datasource : {mutiSelect : true, method : "RuleRelationDatasource.getDatasource"}}, 
			function(result) {
				var iMax = data.max("index") + 1;
				for ( var i = 0; i < result.length; i++) {
					result[i].colEditor = 'input';
					result[i].index = iMax + i;
					result[i].labelName = result[i].label;
				}
				//data.clear();
				if(result.length>0){
					data.newData({
						defaultValues : result
					});
				}
			});
	};
	
	Model.prototype.deleteClick = function(event) {
		var data = this.comp('formData');
		var xid = data.val("name");
		data.deleteData();
	};

	Model.prototype.upClick = function(event) {
		var data = this.comp('formData');
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
		var data = this.comp('formData');
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
	
	// 下拉
	Model.prototype.gridColEditor = function(event) {
		var list = [ 'input','password','range','output','textarea' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};
	
		//外部引用概念
	Model.prototype.gridColIsSelectDataID = function(event) {
		var currentDatas = this.templateEngine.getConfig().current.datas;
		var list = [''];
		for(var d in currentDatas){
			list.push(d);
		}
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};
	
	//外键ID
	Model.prototype.gridColIsRefID = function(event) {
		var mainDataRelations = this.templateEngine.getConfig().current.mainData.relations;
		if(mainDataRelations != null) {
			var list = mainDataRelations.split(',');
			list.unshift('');
			event.editor.jqxDropDownList({
				autoDropDownHeight : true,
				source : list
			});
		}
	};
	//外部引用列
	Model.prototype.gridColIsSelectLabelName = function(event) {
		var self = this;
		event.editor.on('open', function (openEvent) {
			var currentDatas = self.templateEngine.getConfig().current.datas;
			var data = self.comp('formData');
			var list = [];
			for(var cds in currentDatas){
				if(cds == data.val("selectDataID") && currentDatas[cds].relations != null){
					list = currentDatas[cds].relations.split(',');
					list.unshift('');
					break;
				}
			};
			event.editor.jqxDropDownList({
				autoDropDownHeight : true,
				source : list
			});
		});
	};
	
	Model.prototype.getConceptByData = function(data,row) {
		var currentDatas = this.templateEngine.getConfig().current.datas;
		for(var cds in currentDatas){
			if(cds == data.val("selectDataID",row)){
				return currentDatas[cds].concept;
			}
		};
	};
	
	
	/** 页面显示之前调用的方法--框架调用 */
	Model.prototype.beforeOpen = function() {

	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp('formData');
//		var input = this.comp('titleInput');
//		var title = input.val();
		var self = this;
		if (data.datas.get().length <= 0) {
			msg += "请添加数据项，\n";
		}
//		if (!title || "" == title.trim()) {
//			msg += "详细页没有输入标题，\n";
//		}
		data.each(function(param) {
			var row = param.row;
			var currentName = data.val("name",row);
			var refID = data.val("refID",row);
			var selectDataID = data.val("selectDataID",row);
			var selectLabelName = data.val("selectLabelName",row);
			if(selectDataID != ""){
				if(refID == ""){
					msg += "‘关系名称’ 为   '" + currentName +"' 的列     '对应ID'  不能为空\n"; 
				}
				if(selectLabelName == ""){
					msg += "‘关系名称’ 为   '" + currentName +"' 的列     '关联列名'  不能为空\n";
				}
			}
		});
		return msg;
	};

	Model.prototype.finish = function(wizard) {
		var data = this.comp('formData');
		var form = [];
		var form1 = [];
		var dataId = this.getDataId();
		var self = this;
		var i = 0;
		data.each(function(param) {
			var row = param.row;
			even = i % 2;
			var fieldName = "fieldName" + (even+1);
			var field = data.getValue("alias", row);
			var refID = data.val("refID",row);
			var selectDataID = data.val("selectDataID",row);
			var selectLabelName = data.val("selectLabelName",row);
			var selectConcept = self.getConceptByData(data,row);
			var form_password,form_range,form_output,form_textarea,form_input;
			var colEditor = data.val("colEditor",row);
			switch(colEditor){
				case "password":
					form_password =  "form_password";
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
					form_input =  "form_input";
			}
			var formInput = "input"+fieldName;
			var formPassword = "password"+fieldName;
			var formRange = "range"+fieldName;
			var formOutput = "output"+fieldName;
			var formText = "text"+fieldName;
			if(even == 0){
				form1.push({});
			}
			form1[form1.length -1][fieldName] = field;
			form1[form1.length -1]["form_data"] = dataId;
			form1[form1.length -1]["form_refID"] = refID;
			form1[form1.length -1]["form_selectDataID"] = selectDataID;
			form1[form1.length -1]["form_selectLabelName"] = selectLabelName;
			form1[form1.length -1]["form_selectConcept"] = selectConcept;
			form1[form1.length -1][formInput] = form_input;
			form1[form1.length -1][formPassword] = form_password;
			form1[form1.length -1][formRange] = form_range;
			form1[form1.length -1][formOutput] = form_output;
			form1[form1.length -1][formText] = form_textarea;
			i++;
			form.push({
				"form_field": field,
				"form_data": dataId,
				"form_refID": refID,
				"form_selectDataID": selectDataID,
				"form_selectLabelName": selectLabelName,
				"form_selectConcept": selectConcept,
				"form_input":form_input,
				"form_password":form_password,
				"form_range":form_range,
				"form_output":form_output,
				"form_textarea":form_textarea
			});
		});
		
		this.templateEngine.addContext(this.templateFile, "form", form);
		this.templateEngine.addContext(this.templateFile, "form1", form1);
		this.templateEngine.addContext(this.templateFile, "form_title", this.comp("titleInput").value);
		this.templateEngine.addContext(this.templateFile, "form_data", dataId);
	};

	Model.prototype.input1Change = function(event) {
		/* TODO:
		templateService.set("listHeader", {
			title : event.source.val()
		});
		*/
	};

	return Model;
});
