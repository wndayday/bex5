/* ------------------------------------------------------------ 
列表模版处理

参数：
list[{
list_data
list_field1
list_field1Format
list_field2
list_field2Format}]
模版:
{{#each list}}<div class="x-row">
	<div class="x-col">
		<span class="font-bold x-output" component="$UI/system/components/justep/output/output"
			data="{{list_data}}" format="{{list_field1Format}}" bind-ref="ref('{{list_field1}}')" />
	</div>
	<div class="x-col" style="text-align:right;color:gray">
		<span class="x-output" component="$UI/system/components/justep/output/output"
			data="{{list_data}}" format="{{list_field2Format}}" bind-ref="ref('{{list_field2}}')" />
	</div>
</div>{{/each}} 
------------------------------------------------------------ */
	
define(function(require) {
	var $ = require("jquery");
	var Data = require("$UI/system/components/justep/data/data");
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");

	var Model = function() {
		this.callParent();
		window.pageModel = this;
		this.lastConcept = "";
		this.LastReader = "";
	};
	
	Model.prototype.modelLoad = function(event){
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.templateFilePath = this.templateEngine.templatePath + "/" + this.templateFile;
		/*var config = this.templateEngine.getConfig();
		this.dataId = config.current.mainData.dlgDataId ? config.current.mainData.dlgDataId : "mainData";*/
		this.comp('titleInput').val("列表");
	}; 

	Model.prototype.modelParamsReceive = function(event){
		this.showAllColumns();
	};

	Model.prototype.showAllColumns = function() {
		var listData = this.comp('listData');
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
			if(data[i].label == undefined || data[i].name == "version" || data[i].name == "fParent" || data[i].name == "fNodeKind" ){
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
		this.comp('dataTables1').refresh();
		
		this.lastConcept = mainDataConfig.concept;
		this.LastReader = mainDataConfig.reader;
	}; 
	
	Model.prototype.getDataId = function() {
		var config = this.templateEngine.getConfig();
		var mainData = config.current.mainData ? config.current.mainData : {}; 
		return mainData.dlgDataId ? mainData.dlgDataId : "mainData";
	}
	
	Model.prototype.addClick = function(event) {
		var data = this.comp('listData');
		var config = this.templateEngine.getConfig();
		var mainDataConfig = config.current ? config.current.mainData :'';
		var params = {
			title : "选择列", 
			templateFilePath : this.templateFilePath, 
			targetPath : this.templateEngine.getTargetPath(), 
			concept : mainDataConfig.concept,
			reader : mainDataConfig.reader,
			writer : mainDataConfig.writer,
			creator : mainDataConfig.creator,
			relations : mainDataConfig.relations,
			datasource : {mutiSelect : true, method : "RuleRelationDatasource.getDatasource"}
		};
		templateService.openSwtCommonSelectorDialog(params,
			function(result) {
				var iMax = data.max("index") + 1;
				for ( var i = 0; i < result.length; i++) {
					result[i].xid = Data.UUID();
					result[i].colEditor = 'ed';
					result[i].isVisible = '是';
					result[i].index = iMax + i;
					result[i].labelName = result[i].label;
				}
				//data.clear();
				if (result.length > 0) {
					data.newData({
						defaultValues : result
					});
				}
			});
	};
	
	Model.prototype.deleteClick = function(event) {
		var data = this.comp('listData');
		var xid = data.val("xid");
		data.deleteData();
	};

	Model.prototype.upClick = function(event) {
		var data = this.comp('listData');
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
		var data = this.comp('listData');
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

	/** 页面显示之前调用的方法--框架调用 */
	Model.prototype.beforeOpen = function() {
	};
	
	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp('listData');
//		var input = this.comp('titleInput');
//		var title = input.val();
		if (data.datas.get().length <= 0) {
			msg += "请添加数据项";
		}
//		if (!title || "" == title.trim()) {
//			msg += "列表页没有输入标题，";
//		}
		return msg;
	};
	
	Model.prototype.finish = function(wizard) {
		var data = this.comp('listData');
		var list = [];
		var list_columns = [];
		var i = 0;
		var dataId = this.getDataId();
		data.each(function(param) {
			var row = param.row;
			var field = data.getValue("alias", row);
			var label = data.getValue("labelName",row);
			even = i % 2;
			var fieldName = "list_field" + (even + 1);
			var fieldFormat = fieldName + "Format";
			var fieldLabel = "label" + fieldName;
			if (even == 0) {
				list.push({});;
			}
			list[list.length -1][fieldName] = field;
			list[list.length -1][fieldFormat] = "";
			list[list.length -1][fieldLabel] = label;
			list[list.length -1]["list_data"] = dataId;
			i++;
			list_columns.push(field);
		});
		if(list.length > 4)//大于8列时给dataTables组件增加scrollX属性
			this.templateEngine.addContext(this.templateFile, "col_more", "col_more");
		this.templateEngine.addContext(this.templateFile, "list", list);
		this.templateEngine.addContext(this.templateFile, "list_title", this.comp("titleInput").value);
		this.templateEngine.addContext(this.templateFile, "list_data", dataId);
		this.templateEngine.addContext(this.templateFile, "list_columns", list_columns.join(","));

		var config = this.templateEngine.getConfig();
		var dialog = this.getContext().getRequestParameter("dialog");
		dialog = dialog.split(".")[0];
		if(config.dialog[dialog])
			this.templateEngine.addContext(this.templateFile, "dialog_filename", config.dialog[dialog].filename + ".w");
		
	};

	return Model;
});
