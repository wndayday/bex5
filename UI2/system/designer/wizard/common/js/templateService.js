define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var XML = require('$UI/system/lib/base/xml');

	var templateServiceName = "com.justep.studio.servicehanler.TemplateServiceHandler2";
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");

	function _callJava(className, methodName, params, callback) {
		params = params || {};
		if (!params.async) {
			params.async = false;
		}
		params["javaModelPath"] = "/system/designer/wizard/common";
		return webSocket._callJava(className, methodName, params, callback);
	}

	var templateService = {

		callJava : _callJava,
		/**
		 * 获取文件 params:
		 *  { 'function' : 'getFiles', 
		 *  'params' : {
		 *  path :"/BIZ",
		 *  baseDir : "/BIZ", 
		 * 	fileTypes : [ '.process.m' ], 
		 * 	blackList : ['system' ]
		 *  } };
		 */
		getFiles : function(params) {
			var self = this;
			var result = $.ajax({
				async : false,
				data : JSON.stringify(params),
				dataType : "json",
				contentType : "json",
				type : 'POST',
				url : require.toUrl("$UI/system/designer/wizard/common/templateHelper.j"),
				success : function(result) {
				},
				error : function(xhr, status, err) {
				}
			}).responseJSON;
			if (result && result.flag) {
				return result.files
			} else {
				return [];
			}
		},

		/**
		 * 关闭模板向导对话框.
		 * 
		 * @returns
		 */
		closeDialog : function(params) {
			return;
/*			params = params || {};
			params.pageId = params.pageId || webSocket.getRequestParameter("pageId");
			params.async = true;
			return this.callJava(templateServiceName, "closeDialog", params);
*/		},

		/**
		 * xml转化为excel.
		 * 
		 * @param url,pathname
		 */
		xmlToExcel : function(pathName) {
			var url = require.toUrl("$UI/system/designer/wizard/server/XmlToExcel.j");
			var data = {
				pathname : pathName
			};
			$.post(url, data, function() {
			});
		},

		/**
		 * 获取模板目录数据.
		 * 
		 * @returns
		 */
		getTemplateConfigCatalog : function() {
			//return this.callJava(templateServiceName, "getTemplateConfigCatalog");
			return IDEService.callService({
				name : templateServiceName + ".getTemplateConfigCatalog"
			});
		},

		/**
		 * 获取chartType数据.
		 * 
		 * @returns
		 */
		getChartTypeCatalog : function() {
			return this.callJava(templateServiceName, "getChartTypeSource");
		},

		getAppBuilderServerUrl : function() {
			return this.callJava(templateServiceName, "getAppBuilderServerUrl");
		},
		
		getCloudX5ConsoleUrl:function(){
			return this.callJava(templateServiceName, "getXCloudConsoleUrl");
		},

		setAppBuilderServerUrl : function(url) {
			return this.callJava(templateServiceName, "setAppBuilderServerUrl", {
				url : url
			});
		},

		getNativePath : function() {
			return this.callJava(templateServiceName, "getNativePath");
		},

		/**
		 * 获取listView.xml数据.
		 * 
		 * @returns
		 */
		getChartListCatalog : function() {
			return this.callJava(templateServiceName, "getChartListSource");
		},

		getTemplateConfig : function(templatePath) {
			return this.readFile(templatePath + "/" + "template.config.xml");
		},

		/**
		 * 读取文件内容.
		 * 
		 * @param filePath
		 *            需要读取的文件路径，形如 $UI\MyApp\MyW.w
		 * @returns 如果成功，返回文件内容，否则返回空
		 */
		readFile : function(filePath) {
			// TODO: 需要做权限控制，安全漏洞
/*			return this.callJava(templateServiceName, "readFile", {
				filePath1 : filePath
			});
*/
			return IDEService.callService({
				name : templateServiceName + ".readFile",
				params : {
					filePath1 : filePath
				}
			});
		},

		/**
		 * 保存文件内容.
		 * 
		 * @param filePath
		 *            需要写入的文件路径，形如 $UI\MyApp\MyW.w
		 * @param content
		 *            需要写入的内容
		 * @returns 写入成功返回True，否则False
		 */
		writeFile : function(filePath, content) {
			// TODO: 需要做权限控制，安全漏洞
/*			return this.callJava(templateServiceName, "writeFile", {
				filePath1 : filePath,
				content : content
			});*/
			return IDEService.callService({
				name : templateServiceName + ".writeFile",
				params : {
					filePath1 : filePath,
					content : content
				}
			});
		},

		/**
		 * 检查文件是否存在.
		 * 
		 * @param filePath
		 *            需要写入的文件路径，形如 $UI\MyApp\MyW.w
		 * @returns 如果存在返回True，否则False
		 */
		fileExists : function(filePath) {
/*			return this.callJava(templateServiceName, "fileExists", {
				filePath1 : filePath,
			}) === "true";
*/
			return IDEService.callService({
				name : templateServiceName + ".fileExists",
				params : {
					filePath1 : filePath
				}
			})=== "true";
		},

		copyResourceFiles : function(templatePath, targetPath, excludeFiles) {
/*			return this.callJava(templateServiceName, "copyResourceFiles", {
				templatePath : templatePath,
				targetPath : targetPath,
				excludeFiles : excludeFiles
			});*/
			return IDEService.callService({
				name : templateServiceName + ".copyResourceFiles",
				params : {
					templatePath : templatePath,
					targetPath : targetPath,
					excludeFiles : excludeFiles
				}
			});
		},

		/**
		 * 选择文件或者文件夹.
		 * 
		 * @param targetPath
		 *            需选择的文件路径
		 * @returns
		 */
		selectFile : function(targetPath) {
			return this.callJava(templateServiceName, "selectFile", {
				targetPath : targetPath
			});
		},

		/**
		 * 获取所有的应用名称.
		 */
		getAllAppNames : function() {
			var returnData = this.callJava(templateServiceName, "getAllAppNames", {
				async : false
			});
			return returnData;
		},
		/**
		 * 用浏览器打开URL
		 */
		openBrowser : function(url) {
			var returnData = this.callJava(templateServiceName, "openBrowser", {
				url : url
			});
			return returnData;
		},

		createActivity : function(params) {
			IDEService.callService({
				name : templateServiceName + ".createActivity",
				params : params
			});
		},
		
		updateLabel : function(filePath, label) {
			IDEService.callService({
				name : "com.justep.studio.servicehanler.QuickAppService.updateLabel",
				params : {label: label, filePath: filePath}
			});
		},
		
		getRelations : function(concept, reader) {
			var params = {
				nodeXml : '<div autoLoad="false" component="$UI/system/components/justep/data/bizData" concept="' + concept 
					+ '"  >' + '  <reader action="' + reader	+ '"></reader>' + '</div>',
			};

			return IDEService.callService({
				name:"com.justep.studio.servicehanler.RelationDatasource.getDatasource",
				params:params
			});
		}
		
	};

	return templateService;
});
