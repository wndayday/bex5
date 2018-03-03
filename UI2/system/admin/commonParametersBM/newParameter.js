define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var uploader = require("$UI/system/designer/webIde/uploader/uploader");
	var Model = function() {
		this.callParent();
		this.isOrNotShow = justep.Bind.observable(false);
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.close();
	};

	Model.prototype.okBtnClick = function(event) {
		var self = this;
		
		var name = this.comp("parameterData").val("name");
		var value = this.comp('parameterData').val("value");
		var classify = this.comp('parameterData').val("classify");
		
		if (!name) {
			justep.Util.hint('参数名称不能为空!', {
				'type' : 'danger'
			});
			return;
		}
		if (!value) {
			justep.Util.hint('参数值不能为空!', {
				'type' : 'danger'
			});
			return;
		}
		if (!classify) {
			justep.Util.hint('参数分类不能为空!', {
				'type' : 'danger'
			});
			return;
		} 
		
		
		var data = this.comp('parameterData').getCurrentRow();
		
		self.owner.send(data);
		self.close();
		
		}
	

	
	Model.prototype.modelParamsReceive = function(event){
		var data = event.data.data;
		this.comp('parameterData').setValue("flag",data)
		if(data === "file"){
			this.isOrNotShow.set(true);
		}
	};
	

	

	
	return Model;
});