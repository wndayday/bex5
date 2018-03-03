/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	// var $ = require("jquery");
	// var XML = require("$UI/system/lib/base/xml");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelParamsReceive = function(event) {
		var params = event.params;
		this.propName = params.propName;
		var value = params.value;
		var arr = [];
		if(value){
			arr = value.split(',')
		}
		for(var i = 0; i<arr.length; i++){
			var row = this.comp("data").getRowByID(arr[i]);
			this.comp('dataTables1').setRowChecked(row,true);
		}
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		var arr = [];
		var rows = this.comp('dataTables1').getCheckeds();
		for(var i = 0; i<rows.length; i++){
			arr.push(rows[i].val("name"));
		}
		var config = {};
		config[this.propName] = arr.join(',');//选中的值在这里返回，选择多个用逗号分隔
		return config;
	};

	return Model;
});