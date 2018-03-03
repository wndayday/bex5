define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var getMockData = require("$UI/system/admin/roleBM/mockData/mockData")
	var mockFunctionData = require("$UI/system/admin/roleBM/mockData/functionTree")
	var mockServiceData = require("$UI/system/admin/roleBM/mockData/serviceTree")
	var Model = function() {
		this.callParent();
	};

	Model.prototype.treeDataCustomRefresh = function(event) {
		/*
		 * getMockData().then(function(data){ event.source.loadData(data)
		 * event.source.refreshData() })
		 */
	};

	Model.prototype.modelLoad = function(event) {

	};

	Model.prototype.OkBtnClick = function(event) {
		var self = this
		var treeGrid = this.comp('treeGrid')
		var treeData = this.comp('treeData')
		var rows = []
		if (treeGrid.getCheckeds().length == 0) {
			justep.Util.hint('请选中其中一个权限对象')
			return 

			

		}
		$.each(treeGrid.getCheckeds(), function(i, id) {
			var row = treeData.getRowByID(id)
			var parentId = row.val('parent')
			if (!row.val('isFolder')) {
				rows.push(row)
			} else {
				self.folderName.push(row.val('label'))
			}
		})
		this.owner.send({
			params : {
				rows : rows,
			}
		})
		this.owner.close()
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.owner.close()
	};

	Model.prototype.modelParamsReceive = function(event) {
		var status = event.params;
		var treeData = this.comp("treeData")
		if (status) {
			if (status == "func") {
				if(!this.funcRows){
					this.funcRows = mockFunctionData.createFunctionTree(this.getContext())
						.then(function(funcRows){
							treeData.loadData({rows:funcRows})
						})
				}
			} else if(status == 'service') {
				if(!this.serviceRows){
					this.serviceRows = mockServiceData
				}
				treeData.loadData(this.serviceRows)
			}
			treeData.refreshData()
		}
	};

	return Model;
});