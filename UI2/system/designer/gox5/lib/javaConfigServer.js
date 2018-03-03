define(function(require) {
	var $=require('jquery');
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xmlUtil = require('$UI/system/lib/base/xml');
	var xCloudService = IDEService.getXCloudService();
	return {
		getConfigNames:function(path){
			var fileContent = xCloudService.getFileContent({
				filePath : path + "/" +"build.xml"
			});
			var content = fileContent.content;
			var docRoot = xmlUtil.fromString(content).documentElement;
			var generalArr=[];
			var agentArr=[];
			var $child=$(docRoot).find("compile>spring>java").children();
			$.each($child,function(index,item){
				if($(item).attr("target")=="general"){
					generalArr.push({
						zn_name:$(item).attr("name"),
						name:item.tagName
					});
				}else {
					agentArr.push({
						zn_name:$(item).attr("name"),
						name:item.tagName
					})
				}
			})
			return generalArr;
			/*var configServer=$(docRoot).find("ConfigServer").attr("name")||"服务一";
			var eurekaServer=$(docRoot).find("EurekaServer").attr("name")||"服务二";
			var discoveryClient=$(docRoot).find("DiscoveryClient").attr("name")||"服务三";
			return [ {name:'configServer',zn_name:configServer},{name:"eurekaServer",zn_name: eurekaServer},{name:"discoveryClient",zn_name: discoveryClient }]*/
		},
		loadJavaConfig : function(keyword,path) {
			var self = this;
				var newArr = [];
				var arr = self.getConfigNames(path);
				for (var i = 0; i < arr.length; i++) {
					var obj = {};
					obj[keyword] = arr[i]['zn_name'];
					obj["status"] = "0";
					newArr.push(obj)
				}
				return newArr;
		},
	}
})

str="服务一,服务二,服务三";

str.replace(/服务一/,"configServer").replace(/服务二/,"eurekaServer").replace(/服务三/,"discoveryClient");