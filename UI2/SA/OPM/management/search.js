define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelParamsReceive = function(event) {
		var v = event.data.data;
		var searchData = this.comp('orgSearchData');
				searchData.setFilter('_dialog_ValidFilter_', "SA_OPOrg.sValidState = 1");
		searchData.setFilter('_search_filter_', this.getSearchFilter([ "SA_OPOrg.sCode", "SA_OPOrg.sName" ], v));
		searchData.refreshData();
	};

	Model.prototype.getSearchFilter = function(fields, text) {
		var searchText = text.replace(/'/g, "''").toUpperCase();
		var filters = [];
		for (var i = 0; i < fields.length; i++) {
			filters.push("(UPPER(" + fields[i] + ") LIKE '%" + searchText + "%')");
		}
		return filters.join("OR");
	};

	Model.prototype.positionBtnClick = function(event){
		var row = this.comp('orgSearchData').getCurrentRow();
		if(row != null){
			var sFID = row.val('sFID');
			this.comp('windowReceiver').windowEnsure(sFID);
		}else{
			this.comp('windowReceiver').windowCancel();
		}
	};

	Model.prototype.searchBtnClick = function(event){
		var v = this.comp('filter').val();
		if(v){
			var searchData = this.comp('orgSearchData');
					searchData.setFilter('_dialog_ValidFilter_', "SA_OPOrg.sValidState = 1");
			searchData.setFilter('_search_filter_', this.getSearchFilter([ "SA_OPOrg.sCode", "SA_OPOrg.sName" ], v));
			searchData.refreshData();
		}
	};
	
	
		Model.prototype.filterChange = function(event){
		var v = event.source.val();
		if(!v) this.searchBtnClick();
	};
	
	
	Model.prototype.filterKeypress = function(event){
		if(event.keyCode===13){
			this.searchBtnClick();
		}
	};

	return Model;
});