define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.addBtnClick = function(event) {
		this.comp('filterData').newData();
	};

	Model.prototype.deleteBtnClick = function(event) {
		var row = this.comp('filterData').getCurrentRow();
		if (!row) {
			justep.Util.hint("请先选中一行");
			return;
		}
		this.comp("filterData").remove(row);
	};

	Model.prototype.okBtnClick = function(event) {
		var data = this.comp('filterData');
		var columns = data.getColumnIDs().split(",");
		var flag = false;
		data.each(function(option) {
			for (var i = 0; i < columns.length; i++) {
				if (!option.row.val(columns[i])) {
					flag = true;
				}
			}

		});
		if (flag) {
			justep.Util.hint("请将规则填写完整");
			return;
		}
		this.comp('windowReceiver1').windowEnsure({
			data : data
		});
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.comp('windowReceiver1').windowCancel();
	};

	Model.prototype.windowReceiver1Receive = function(event) {
		var propertyList = event.data.list;
		var value = event.data.havingValue;
		if (!propertyList) {
			this.filePath = event.data.path;
			this.bizDoc = bizModel.loadFile(this.filePath, true);
			propertyList = this.queryPropertyList();
		}

		this.comp('propertyData').loadData({
			"@type" : "table",
			"rows" : propertyList
		});

		value = event.data.havingValue;
		if (value) {
			var ret = [];
			this.pfilter(ret,value);
			for (var i = 0; i < ret.length; i++) {
				var operator = ret[i].op;
				var param = ret[i].param;
				var column = param.substring(2, param.indexOf("',"));
				var aggDef = this.getAggDef(column);
				var val = param.substring(param.indexOf(",")+1,param.length-1);
				var rows1 = this.comp('propertyData').find([ "name" ], [ aggDef.col ]);
				var columnLabel = rows1[0].val('label');
				var rows3 = this.comp('aggOperatorsData').find([ "value" ], [ aggDef.fn ]);
				var aggOpLabel = rows3[0].val('label');				
				var rows2 = this.comp('operatorsData').find([ "value" ], [ operator ]);
				var operatorLabel = rows2[0].val('label');
				this.comp('filterData').newData({
					defaultValues : [ {
						value : val,
						column : aggDef.col,
						aggOp : aggDef.fn,
						operator : operator,
						aggOpLabel : aggOpLabel,
						columnLabel : columnLabel,
						operatorLabel : operatorLabel
					} ]
				});
			}
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

	Model.prototype.filterDataValueChange = function(event) {
		/*
		var rows,label;
		if (event.col == "column") {
			rows = this.comp('propertyData').find([ "name" ], [ event.newValue ]);
			if (rows.length > 0) {
				label = rows[0].val('label');
				this.comp('filterData').setValue("columnLabel", label);
			}

		} else if (event.col == "operator") {
			rows = this.comp('operatorsData').find([ "value" ], [ event.newValue ]);
			if (rows.length > 0) {
				label = rows[0].val('label');
				this.comp('filterData').setValue("operatorLabel", label);
			}

		}
		*/
	};

	Model.prototype.exprBtnClick = function(event) {
		var row = event.bindingContext.$object;
		xuiService.openEditor("jSExpressionEditor", {
			propName : "OPParam",
			propValue : row.val('value')
		}, function(result) {
			row.val('value', result.value);
		});
	};

	Model.prototype.get = function(filter) {
		var filterFNs = [ 'gte', 'lte','eq', 'gt', 'lt',  'ilike', 'like', 'is', 'inn', 'not' ];
		var ret = null;
		$.each(filterFNs, function(i, v) {
			var idx = filter.indexOf(v);
			if (idx > -1) {
				if (ret) {
					if (idx < ret.idx)
						ret = {
							op : v,
							idx : idx
						};
				} else
					ret = {
						op : v,
						idx : idx
					};
			}
		});
		return ret;
	};
	
	Model.prototype.pfilter = function(ret, filter) {
		var o = this.get(filter);
		var len = ret.length, po;
		if (o) {
			if (len > 0) {
				po = ret[len - 1];
				po['param'] = filter.substring(0, o.idx - 1);
			}
			ret.push(o);
			this.pfilter(ret, filter.substring(o.idx + o.op.length));
		} else {
			if (len > 0) {
				po = ret[len - 1];
				po['param'] = filter;
			}
		}
	};

	Model.prototype.getAggDef = function(str) {
		var ret;
		if(str){
			var aggFNs = [ 'count', 'sum','avg', 'min', 'max' ];
			$.each(aggFNs, function(i, v) {
				var idx = str.indexOf(v);
				if (0===idx) {
						ret = {
							fn : v,
							col : str.substring(v.length+1, str.length-1)
						};
				}
			});
		}
		return ret;
	};

	return Model;
});