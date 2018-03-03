define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");

	var Model = function() {
		this.callParent();
		this.bizDoc;
		this.filterValue = "";
		this.arr = [];
	};

	Model.prototype.windowReceiverReceive = function(event) {
		var propertyData = this.comp('propertyData');
		var me = this;
		this.bizDoc = bizModel.loadFile(event.data.path);
		var list = this.queryProperties();
		this.arr = event.data.arr;
			for(var i = 0;i<list.length; i++){
				if(me.arr.indexOf(list[i].name) >= 0){
					list.splice(i,1);
					i--;
				}
			}
	
		propertyData.loadData({
			"@type" : "table",
			"rows" : list
		});
		this.comp('dataTables').reload();


	};

	// 查询property
	Model.prototype.queryProperties = function() {
		var list = this.bizDoc.queryAsJson("class>property");
		return list;
	};

	
	
	

	Model.prototype.okbtnClick = function(event) {
		var rows = this.comp('dataTables').getCheckeds();

		this.comp('windowReceiver').windowEnsure({
			data : rows
		});
	};

	Model.prototype.cancelClick = function(event) {
		this.comp('windowReceiver').windowCancel();
	};

	Model.prototype.filter = function(name) {
		if (this.filterValue === "") {
			return true;
		} else {
			if (name.toLowerCase().indexOf(this.filterValue.toLowerCase()) > -1) {
				return true;
			} else {
				return false;
			}
		}
	};

	Model.prototype.searchInputKeyup = function(event) {
		if (this.timer) {
			clearTimeout(this.timer);
		}
		var self = this;
		this.timer = setTimeout(function() {
			var v = self.comp("searchInput").$domNode.val();
			self.filterValue = v;
			self.comp('dataTables').reload();
			//
		}, 100)

	};

	return Model;
});