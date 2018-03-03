define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var util = require("$UI/system/components/justep/common/common");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.employeeDataCustomRefresh = function(event) {
		var employee = event.source;

		$.ajax({
			type : "GET",
			url : require.toUrl('./json/employee.json'),
			dataType : 'json',
			async : false,
			cache : false,
			success : function(data) {
				employee.loadData(data);// 将返回的数据加载到data组件
			},
			error : function() {
				throw justep.Error.create("加载数据失败");
			}
		});
	};

	// 动态选中
	Model.prototype.selectClick = function(event) {
		var me = this.comp("employeeGrid")
		this.comp('employeeData').each(function(options) {

			if (options.index == 3) {
				var id = options.row.val("id");
				me.setRowChecked(id, true);
			}
		});
	};
	//js代码
	Model.prototype.jsClick = function(event) {
		util.showSource({
			self : this,
			data : "demo/pcSample/grid/dynamicSelect.js"
		},true);
	};
	//源码
	Model.prototype.sourceClick = function(event) {
		util.showSource({
			self : this,
			type : true,
			data : "demo/pcSample/grid/dynamicSelect.w&xid=employeeGrid"
		},true);
	};

	return Model;
});