/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	// var $ = require("jquery");
	// var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xmlUtil = require('$UI/system/lib/base/xml');

	var Model = function() {
		this.callParent();
		this.conceptName = "";
	};

	Model.prototype.modelLoad = function(event) {
		/*
		 * var initData = xuiService.getPageParams();// 获取传入的参数 if(!initData){
		 * return; }
		 */};

	Model.prototype.modelParamsReceive = function(event) {
		var params = event.params;
		this.propName = params.propName;
		this.propValue = params.propValue;

		targetDataXid = params.mainModel.callDesignerMethod("getPropValue", params.d_id, "data");
		if (targetDataXid) {
			var dataModelRootNode = params.mainModel.callDesignerMethod("getRootModeNode");
			var $dataNode = $(dataModelRootNode).find("*[xid='" + targetDataXid + "']");
			if ($dataNode.length > 0) {
				params.nodeXml = xmlUtil.toString($dataNode[0]);

				//获得data组件关联的概念
				var dataXml = params.nodeXml;
				var startPos = dataXml.indexOf("concept=");
				var endPos = dataXml.indexOf("\"", startPos + 10);
				this.conceptName = dataXml.substring(startPos + 9, endPos);

				//获得data组件关联概念中的关系
				var data = IDEService.callService({
					name : "com.justep.studio.servicehanler.RelationDatasource.getDatasource",
					params : params
				});
				var columnData = this.comp('data');
				columnData.loadData({
					"@type" : "table",
					"rows" : data
				});
				columnData.first();
				
				if (this.propValue) {
					//获取已有的mapping文件信息
					var allConfig = IDEService.callService({
						name : "com.justep.studio.servicehanler.ExcelMapping.getMapping",
						params : {
							modelName : this.params.modelName,
							fileName : this.propValue
						}
					});
					
					//设置参数
					this.comp("cfgData").clear();
					this.comp("cfgData").loadData([allConfig.config]);
					this.comp("cfgData").first();
					
					//设置列索引
					$.each(allConfig.colMapping, function(i, e) {
						var rows = columnData.find([ "name" ], [ e.col ]);
						if (rows.length > 0) {
							rows[0].val("colNum", e.num);
						}
					})
				}

			}
		}
	};

	//返回前的校验
	Model.prototype.beforeOkAction = function() {
		var cfgData = this.comp('cfgData');
		if(cfgData.val("allSheet") != "1" && (cfgData.val("sheetStart") == "" || cfgData.val("sheetEnd") == ""))
			return '选择‘全部页’，或者填入‘开始页’和‘结束页’';
		
		if(cfgData.val("allRow") != "1" && (cfgData.val("rowStart") == "" || cfgData.val("rowEnd") == ""))
			return '选择‘全部行’，或者填入‘开始行’和‘结束行’';
		
		var colMapping = [];
		var data = this.comp('data');
		data.each(function(option) {
			if (option.row.val("colNum")) {
				colMapping.push({
					col : option.row.val("name"),
					num : option.row.val("colNum")
				});
			}
		});
		if (colMapping.length == 0)
			return '必须设置列索引!';
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		var cfgData = this.comp('cfgData');
		config = cfgData.toJson({format:"simple"});
		
		var colMapping = [];
		var data = this.comp('data');
		data.each(function(option) {
			if (option.row.val("colNum") && option.row.val("colNum").value != "") {
				colMapping.push({
					col : option.row.val("name"),
					type : option.row.val("data-type"),
					num : option.row.val("colNum")
				});
			}
		});

		var fileName = IDEService.callService({
			name : "com.justep.studio.servicehanler.ExcelMapping.saveMapping",
			params : {
				colMapping : colMapping,
				conceptName : this.conceptName,
				modelName : this.params.modelName,
				fileName : this.propValue,
				config : config.rows[0]
			}
		});

		return {
			mappings : fileName
		};
	};

	Model.prototype.cfgDataAfterNew = function(event){
		event.source.setValue("allSheet", "true");
		event.source.setValue("sheetStart", "1");
		event.source.setValue("sheetEnd", "1");
		
		event.source.setValue("allRow", "true");
		event.source.setValue("rowStart", "3");
		event.source.setValue("rowEnd", "99999");
	};

	return Model;
});