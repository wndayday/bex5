define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.addAllBtnClick = function(event){
		var dialogData = this.comp('dialogData');
		dialogData.eachAll(function(option){
			if(!this.comp("selectData").isExist(option.row.getID())){
				var rows = this.comp("selectData").newData();
				rows[0].assign(option.row);
			}
		},this);
	};

	Model.prototype.removeAllBtnClick = function(event){
		this.comp('selectData').clear();
	};

	Model.prototype.addBtnClick = function(event){
		if(this.comp("selectData").isExist(this.comp("dialogData").getCurrentRowID())) return;
		
		var rows = this.comp("selectData").newData();
		rows[0].assign(this.comp("dialogData").getCurrentRow());
	};

	Model.prototype.searchGridRowDblClick = function(event){
		if(this.comp("selectData").isExist(this.comp("dialogData").getCurrentRowID())) return;

		var rows = this.comp("selectData").newData();
		rows[0].assign(this.comp("dialogData").getCurrentRow());
	};

	return Model;
});
