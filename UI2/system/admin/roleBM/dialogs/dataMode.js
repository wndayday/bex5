define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var operateMfile = require("$UI/system/designer/webIde/quickIde/propPages/common/operateMfile")
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelParamsReceive = function(event){
		/*var list = [{
			id:003,
			name:'request',
			label:'发帖',
			path:'comp/requrest'
		},
		{
			id:004,
			name:'res',
			label:'商品',
			path:'comp/product'
		},
		{
			id:005,
			name:'buy',
			label:'购买',
			path:'comp/buy'
		}
		]
		var dataList = [];
		list.forEach(function(item,index){
			dataList.push({
				id:justep.UUID.createUUID(),
				name:item.name,
				label:item.label,
				path:item.path
			})
		})*/
		var dataList = operateMfile.getAllFilesName()
		var tableData = this.comp('tableData')
		
		tableData.loadData({
			"@type" : "table",
			"rows" : dataList
		});
		tableData.refreshData()
		if(tableData.count()){
			tableData.first();
		}
	};

	Model.prototype.cancelBtnClick = function(event){
		this.owner.close()
	};

	Model.prototype.okBtnClick = function(event){
		var tableData = this.comp("tableData")
		var currentRow = tableData.getCurrentRow();
		if(!currentRow){
			justep.Util.hint('请选中一行')
			return 
		}
		this.owner.send({params:currentRow})
		this.owner.close()
	};

	Model.prototype.tableDataCustomRefresh = function(event){ 
		event.source.setTotal(event.source.count())
		
	};

	return Model;
});