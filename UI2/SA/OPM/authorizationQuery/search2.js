define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");

	var Model = function() {
		this.callParent();
		this.v = justep.Bind.observable();
	};

	Model.prototype.funcListDataCustomRefresh = function(event) {
		biz.Request.sendHttpRequest({
			"contentType" : "application/json",
			"url" : require.toUrl("$UI/SA/OPM/dialogs/selectFunction/getFunctionData.j?mode=list"),
			"callback" : function(xhr, ts) {
				if (biz.Request.isSuccess(xhr)) {
					event.source.loadData(xhr.responseJSON);
				}
			}
		});
	};
	
	Model.prototype.filter = function(row) {
		if (row.val('label').indexOf(this.v.get()) == -1) {
			return false;
		} else {
			return true;
		}
	}

	Model.prototype.modelParamsReceive = function(event) {
		var v = event.data.data;
		this.v.set(v);
		this.comp('searchGrid').reload();
	};


	Model.prototype.positionBtnClick = function(event) {
		var row = this.comp('searchGrid').getSelection()
		if(row != null){
			var path = row.val('path');
			var arr = path.split("/");
			
			this.comp('windowReceiver').windowEnsure(arr);
		}else{
			this.comp('windowReceiver').windowCancel();
		}
	};

	Model.prototype.searchBtnClick = function(event) {
		var v = this.comp('filter').val();
		this.v.set(v);
		this.comp('searchGrid').reload();
	};

	Model.prototype.filterChange = function(event) {
		var v = event.source.val();
		if (!v)
			this.searchBtnClick();
	};

	Model.prototype.filterKeypress = function(event) {
		if (event.keyCode === 13) {
			this.searchBtnClick();
		}
	};

	return Model;
});