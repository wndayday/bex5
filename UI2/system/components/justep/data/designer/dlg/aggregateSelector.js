define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService")

	var Model = function() {
		this.callParent();
	};

	Model.prototype.addBtnClick = function(event) {
		this.comp('aggData').newData();
	};

	Model.prototype.deleteBtnClick = function(event) {
		var row = this.comp('aggData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中一行");
			return;
		}
		this.comp("aggData").remove(row);
	};

	Model.prototype.okBtnClick = function(event) {
		var data = this.comp('aggData');
		var groupBy = this.GroupBy;
		var agg = [],aggLabel = [],isOK = true,errorInfo='';
		data.each(function(option) {
			var label = option.row.val('label');
			var name = option.row.val('name');
			var op = option.row.val('operator');
			var col = option.row.val('column');
			if(!col){
				option.cancel = true;
				isOK = false;
				errorInfo = '请选择列,列不能为空';
				return;
			}
			if(!name){
				option.cancel = true;
				isOK = false;
				errorInfo = justep.String.format('列[{0}]必须定义别名',col);
				return;
			}
			if(!op && groupBy.indexOf(col)<0){
				option.cancel = true;
				isOK = false;
				errorInfo = justep.String.format('非统计列[{0}]必须定义统计函数',col);
				return;
			}
			if (col) {
				agg.push({
					name : name,
					label : label||name,
					fn : op,
					field: col
				});					
				if(op) aggLabel.push(justep.String.format("{0}[{1}({2})]", label, op, col));
				else aggLabel.push(justep.String.format("{0}[{1}]", label, col));
			}
		});
		if(isOK){
			this.comp('windowReceiver1').windowEnsure({
				data : {agg:JSON.stringify(agg),aggLabel:aggLabel.join()}
			});
		}else
			justep.Util.hint(errorInfo);
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.comp('windowReceiver1').windowCancel();
	};

	Model.prototype.windowReceiver1Receive = function(event) {
		var propertyList = event.data.list;
		if (!propertyList) {
			this.filePath = event.data.path;
			this.bizDoc = bizModel.loadFile(this.filePath, true);
			propertyList = this.queryPropertyList();
		}

		this.comp('propertyData').loadData({
			"@type" : "table",
			"rows" : propertyList
		});

		this.GroupBy = event.data.groupBy?event.data.groupBy.split(','):[];
		var aggDef = event.data.agg;
		if (aggDef) {
			aggDef = JSON.parse(aggDef);
			var defaultValues = [];
			if($.isArray(aggDef) && aggDef.length>0)
					$.each(aggDef, function(i,v){
						defaultValues.push({
							name : v.name,
							label : v.label || v.name,
							operator : v.fn,
							column : v.field 
						});
					});
			if(defaultValues.length>0)
				this.comp('aggData').newData({
					defaultValues : defaultValues
				});
		}
	};

	/** 查询property* */
	Model.prototype.queryPropertyList = function() {
		var list = this.bizDoc.queryAsJson("data>class>property", function($node, jsonItem) {
			var label = $node.find("label").text();
			if (label) {
				jsonItem.label = label;
			}
			jsonItem.name = jsonItem.name;
		});
		return list;
	};

	Model.prototype.aggDataValueChange = function(event) {
		var rows,s,needSetName = false,
			col = event.row.val("column"),
			op = event.row.val("operator"),
			name = event.row.val("name"),
			label = event.row.val("label");
		if (event.col == "column") {
			col = event.newValue;
			needSetName = true;
		} else if (event.col == "operator") {
			op = event.newValue;
			needSetName = true;
		}
		if(needSetName){
			//给columnLabel赋值
			rows = this.comp('propertyData').find([ "name" ], [ col ]);
			s = event.newValue;
			if (rows.length > 0) {
				s = rows[0].val('label');
			}
			event.row.val("columnLabel", s||'');
			//给operatorLabel赋值
			rows = this.comp('operatorsData').find([ "value" ], [ op ]);
			s = event.newValue;
			if (rows.length > 0) {
				s = rows[0].val('label');
			}
			event.row.val("operatorLabel", s||'');
			var colLabel = event.row.val("columnLabel");
			var opLabel = event.row.val("operatorLabel");
			name = (op||"")+col;
			event.row.val("name", name);
			label = colLabel + (opLabel||"");
			event.row.val("label", label);
		}
	};

	return Model;
});