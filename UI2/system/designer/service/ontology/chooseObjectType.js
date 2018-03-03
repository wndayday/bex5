define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = ideService.getXCloudService();
	
	var Model = function(){
		this.callParent();
		this.list = [];
	};

	Model.prototype.cancelClick = function(event){
		this.comp('windowReceiver').windowCancel();
	};

	Model.prototype.okbtnClick = function(event){
		var objectType = this.comp('tableData').getCurrentRow().val('name');
		this.comp('windowReceiver').windowEnsure({data:objectType});
	};

	Model.prototype.windowReceiverReceive = function(event){
		var self = this;
		var path = event.data;
		var filePath = path.substring(0,path.lastIndexOf("/"));
		
		var nodes = xCloudService.getFileTree({filePath:filePath,extName:"m"});
		this.getAllfiles(nodes);
		
		this.comp('tableData').loadData({
			"@type" : "table",
			"rows" : self.list
		});
		this.comp('dataTables').reload();

	};
	
	Model.prototype.getAllfiles = function(nodes){
		var self = this;
			for(var i = 0; i<nodes.children.length; i++){
				if(nodes.children[i].children && nodes.children[i].children.length>0){
					self.getAllfiles(nodes.children[i]);
				}else{
					var arr = nodes.children[i].title.split(".");
					if(arr[1] == "data"){
						self.list.push({name:arr[0],path:nodes.children[i].key});
					}
				}
			}
	};
	


	
	return Model;
});