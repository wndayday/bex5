define(function(require){
	//传过来的参数
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = IDEService.getXCloudService();
		var dataAssembly={
			loadAssemblys:function(filePath,colName){
				var self=this;
				//获取节点下的所有.xml文件
				var item=xCloudService.getFileTree({filePath:filePath,extName:"xml"});
				var itemFiles=item.children[0].children;
				var dataNames=[];
				var dataFiles=[];
				for(var i=0;i<itemFiles.length;i++) {
					var title=itemFiles[i].title;
					if(title.slice(title.indexOf(".")+1,title.lastIndexOf("."))=="data"){
						var obj={};
						//获取所有的data.xml文件
						dataFiles.push(itemFiles[i]);
						//获取所有data文件名
						obj[colName]=self.getFileName(itemFiles[i].title);
						dataNames.push(obj);
					}
				}
				return {
					dataFiles:dataFiles||[],
					dataNames:dataNames||[]
				}
			},
			getFileName:function(fileName){
				return fileName.substr(0,fileName.indexOf("."));
			}
		}
		return dataAssembly;
		
})