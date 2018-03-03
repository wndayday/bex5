define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.saveCommit = function(event){
		alert("保存数据成功！");
	};

	Model.prototype.showDetailClick = function(event){
		if(this.comp("controlData").getValue("edit") == 1){
			var oldValue = this.comp("mainData").getValue("calcCheckBox");
			var newValue = oldValue ? 0 : 1;
			this.comp("mainData").setValue("calcCheckBox", newValue);
		}else{
			this.comp('contents').to('detail');
		}
	};
	
	return Model;
});
