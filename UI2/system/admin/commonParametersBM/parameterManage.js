define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.newTextClick = function(event){
		this.comp('newParameteDialog').open({data:"text"});
	};

	Model.prototype.newFileClick = function(event){
		this.comp('newParameteDialog').open({data:"file"});
	};

	Model.prototype.editBtnClick = function(event){
		var row = event.bindingContext.$object;
		this.comp('editParameteDialog').open({data:row});
	};

	Model.prototype.delBtnClick = function(event){
		var row = event.bindingContext.$object;
		this.comp('parameterData').deleteData(row);
	};

	Model.prototype.windowDialog1Receive = function(event){
		var name = event.data.val('name');
		var value = event.data.val('value');
		var classify = event.data.val('classify');
		var flag = event.data.val('flag');
		var id = event.data.val('id');
		var type = "";
		if(flag == "file"){
			type = "文件";
		}else{
			type = "文本";
		}
		
		this.comp('parameterData').newData({
			defaultValues:[{
				fid:id,
				name:name,
				value:value,
				classify:classify,
				type:type,
				tag:"用户"
			}]
		})
		this.comp('parameterData').saveData();
	};

	return Model;
});