define(function(require) {
	// 传过来的参数
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xmlUtil = require('$UI/system/lib/base/xml');
	var xCloudService = IDEService.getXCloudService();
	var dataAssembly = {
		loadAssemblys : function(filePath,fileList,colName) {
			var self = this;
			var dataNames = [];
			var dataFiles = [];
			var currentFiles=this.filterCurrentFiles(filePath);
			fileList.forEach(function(filePath){
				// 获取节点下的所有.m文件
				var item = xCloudService.getFileTree({
					filePath : filePath,
					extName : "m"
				});
				var appName= filePath.substr(filePath.indexOf('/')+1);
				if(item.children.length>0){
					var itemFiles = item.children[0].children;
					for (var i = 0; i < itemFiles.length; i++) {
						var title = itemFiles[i].title;
						console.log('title:'+title);
						if (title.slice(title.indexOf(".") + 1, title.lastIndexOf(".")) == "data") {
							var obj = {};
							if(currentFiles.indexOf(appName+'/'+title.substr(0,title.indexOf('.')))==-1){
								obj[colName] = appName+'/'+title.substr(0,title.indexOf('.'));
							}else {
								obj[colName] = self.getFileName(itemFiles[i].title);
							}
							obj['appName']=filePath.substr(filePath.indexOf('/')+1);
							dataNames.push(obj);
						}
					}
				}
			})
			return {
				dataFiles : dataFiles || [],
				dataNames : dataNames || []
			}
		},
		filterCurrentFiles:function(filePath){
			var self=this;
			var arr=[];
			var item = xCloudService.getFileTree({
				filePath : filePath,
				extName : "m"
			});
			var appName= filePath.substr(filePath.indexOf('/')+1);
			var itemFiles = item.children[0].children;
			for (var i = 0; i < itemFiles.length; i++) {
				var title = itemFiles[i].title;
				console.log('title:'+ title);
				if (title.slice(title.indexOf(".") + 1, title.lastIndexOf(".")) == "data"  ) {
					arr.push(appName+'/'+self.getFileName(itemFiles[i].title));
				}
			}
			return arr
			
		},
		getFileName : function(fileName) {
			return fileName.substr(0, fileName.indexOf("."));
		},
		getCurrentAllFieldsName:function (path,dataName){
			var filePath=path+'/'+dataName+'.data.m';
			/*if(dataName.indexOf('/')!== -1){
				filePath='service/'+ dataName +'.data.m';
			}else {
				filePath="service/" + appName + '/'+ dataName + ".data.m" ;
			}*/
			var fileContent = xCloudService.getFileContent({
				filePath : filePath
			});
			var content = fileContent && fileContent.content;
			var docRoot = xmlUtil.fromString(content).documentElement;
			var $docRoot=$(docRoot);
			var fieldName=[];
			if($docRoot.find('class').length>0 && $docRoot.find('class').children().length>0 ){
				$.each($docRoot.find("class").children(),function(index,property){
					fieldName.push({
						fieldName:$(property).attr('name'),
						status:"0"
					})
				})
			}
			return fieldName;
		},
		getCurrentAppName:function(filePath){
			if(!filePath){
				return ''
			}
			var appName = filePath.slice(filePath.indexOf('/')+1,filePath.lastIndexOf('/')).split('/').join('.')
			debugger
			filePath = filePath.substr(0,filePath.lastIndexOf('/'))
			var fileContent = xCloudService.getFileContent({
				filePath : filePath + "/" + "project.xml"
			});
			var content = fileContent.content;
			if(!content){
				return appName
			}
			var docRoot = xmlUtil.fromString(content).documentElement;
			if($(docRoot).find("serviceName").length>0){
				return ($(docRoot).find("serviceName").html())||appName
			}
			
		}
	}
	return dataAssembly;
})