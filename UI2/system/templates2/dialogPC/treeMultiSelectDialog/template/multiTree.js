define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.addAllBtnClick = function(event) {
		var isSearch = this.comp("smartFilter1").searchText.get();
		var treeData = !isSearch ? this.comp('dialogData') : this.comp('searchData');
		treeData.each(function(option) {
			if(!this.comp("selectData").isExist(option.row.getID())){
				var rows = this.comp("selectData").newData();
				rows[0].assign(option.row);

				if (!isSearch && this.comp('cbCascade').val()==1) {
					var row = option.row;
					treeData.each(function(option2) {
						if(!this.comp("selectData").isExist(option2.row.getID())){
							var rows = this.comp("selectData").newData();
							rows[0].assign(option2.row);
						}
					}, this, row);
				}
			}
		}, this);
	};

	Model.prototype.removeAllBtnClick = function(event) {
		this.comp('selectData').clear();
	};

	Model.prototype.addBtnClick = function(event) {
		var isSearch = this.comp("smartFilter1").searchText.get();
		var treeData = !isSearch ? this.comp('dialogData') : this.comp('searchData');
		
		if(this.comp("selectData").isExist(treeData.getCurrentRowID())) return;
		
		var rows = this.comp("selectData").newData();
		rows[0].assign(treeData.getCurrentRow());
		
		if (!isSearch && this.comp('cbCascade').val()==1) {
			var row = treeData.getCurrentRow();
			treeData.each(function(option) {
				if(!this.comp("selectData").isExist(option.row.getID())){
					var rows = this.comp("selectData").newData();
					rows[0].assign(option.row);
				}
			}, this, row);
		}
	};

	Model.prototype.treeGridRowDblClick = function(event) {
		this.addBtnClick();
	};

	Model.prototype.searchGridRowDblClick = function(event){
		this.addBtnClick();
	};

	return Model;
});
