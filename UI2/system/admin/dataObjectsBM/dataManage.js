define(function(require) {
	var $ = require("jquery");
	//var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.appPath= "";
	};

	Model.prototype.modelLoad = function(event) {
		var self = this;
		//var url = require.toUrl("$UI/system/admin/dataObjectsBM/dataObject.json");
		
		var url = "";
		
		$.ajax({
			dataType : 'text',
			url : require.toUrl("$UI/app.json"),
			async:false,
			success : function(json) {
				var appPathJson = JSON.parse(json);
				url = require.toUrl(appPathJson.appPath.replace("UI2", "$UI")+"/dataObject.json");
			}
		});
		
		
		if(url){
			$.ajax({
				dataType : 'text',
				url : url,
				success : function(json) {
					if(json){
						var dataJson = JSON.parse(json);
						self.comp('tableData').loadData(dataJson.dataObjects);
						self.comp('tableData').first();
						var row = self.comp('tableData').getCurrentRow();
						if (!row) {
							return;
						}
						var name = row.val('name');
						self.appPath = dataJson.appPath;
						if(self.appPath){
							sessionStorage.setItem("appPath",self.appPath);
							var path = self.appPath.replace("UI2", "$UI");
							$(self.getElementByXid("iframe1")).attr("src",require.toUrl(path + "/SA/DMPages/" + name + "/index.w"));
						}
					}
				}
			});
		}


	};

	Model.prototype.tr2Click = function(event) {
		var name = event.bindingContext.$object.val('name');
		var name2 = this.comp('tableData').getCurrentRow().val('name');
		if(name != name2){
			var path = this.appPath;
			if(path.indexOf("UI2")>= 0){
				path = path.replace("UI2", "$UI");
			}
			$(this.getElementByXid("iframe1")).attr("src",require.toUrl(path + "/SA/DMPages/" + name + "/index.w"));
		} 
	};

	return Model;
});