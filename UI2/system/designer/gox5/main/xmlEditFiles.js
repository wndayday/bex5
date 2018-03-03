define(function(require) {
	var $ = require('jquery');
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xmlUtil = require('$UI/system/lib/base/xml');
	var xCloudService = IDEService.getXCloudService();

	var docCompiler = require("$UI/system/designer/gox5/lib/javaConfigServer");
	/**
	 * @newProXml ------------ 新建project.xml文件和修改时的逻辑
	 * 
	 * @newBuildXml ----------- 新建build.xml文件和修改时的逻辑
	 * 
	 * @queryXml ----------- 查询project.xml和build.xml文件时的逻辑
	 */
	var editProjectXml = {
		newProXml : function(params) {
			var path = params.path;
			var appName = params.appName;
			var patternName = params.patternName;
			var fileContent = xCloudService.getFileContent({
				filePath : path + "/" + "project.xml"
			});
			var content = fileContent.content;
			if (content) {
				xCloudService.deleteFile({
					filePath : "service/" + appName + "/" + "project.xml"
				});
			}
			var docRoot = xmlUtil.fromString(content).documentElement;
			if (patternName) {
				var srcConfig = params.javaCompilerCfg.toString();
				var arr = docCompiler.getConfigNames("service");
				for (var i = 0; i < arr.length; i++) {
					srcConfig = srcConfig.replace(arr[i]["zn_name"], arr[i].name);
				}
				// srcConfig=srcConfig.replace(arr[0]["zn_name"],"configServer").replace(arr[1]["zn_name"],"eurekaServer").replace(arr[2]["zn_name"],"discoveryClient");
				var publicContent = '<!-- 服务名称 -->\n<serviceName>' + params.appName + '</serviceName>\n' + '<!-- 开发语言  -->\n' + '<language>' + params.devLanguage + '</language>\n';
				var srcCfgContent = '<!-- 源码编译配置 -->\n<src>\n<enable>' + srcConfig + '</enable>\n</src>\n';
				if (patternName == "general") {
					var sourceDataArr = params.sourceData;
					var docConfig = params.docCompilerCfg;
					var docContent = '<!-- 文档编译配置 -->\n<doc>\n<domain>' + docConfig.domain + '</domain>\n<output>' + docConfig.output + '</output>\n</doc>\n';
					var sourceContent = "";
					if (sourceDataArr.length > 0) {
						for (var i = 0; i < sourceDataArr.length; i++) {
							sourceContent += '<datasource name="' + sourceDataArr[i].sourceName + '" connect-type="' + sourceDataArr[i].connectType + '" database-type="' + sourceDataArr[i].database
									+ '" show-sql="' + sourceDataArr[i].showSql + '" ddl-auto="' + sourceDataArr[i].ddlAuto + '">\n' + '<url>' + sourceDataArr[i].sourceUrl + '</url>\n' + '<username>'
									+ sourceDataArr[i].uName + '</username>\n' + '<password>' + sourceDataArr[i].uPwd + '</password>\n</datasource>\n';
						}
					}
					;
					var datacontent = '<?xml version="1.0" encoding="UTF-8"?>\n<project mode="' + params.patternName.trim() + '">\n' + publicContent + '<!-- 服务协议  -->\n' + '<protocol>' + params.protocol.trim() + '</protocol>\n'
							+ '<!-- 数据源配置 -->\n' + '<pool>\n' + sourceContent + '</pool>\n' + srcCfgContent + docContent + '\n</project>'
				} else if (patternName == 'agent') {
					var httpName = params.httpName;
					var httpUrl = params.httpUrl;
					var httpTest = params.httpTest;
					var datacontent = '<?xml version="1.0" encoding="UTF-8"?>\n<project mode="' + params.patternName.trim() + '">\n' + publicContent + '<!-- 代理服务协议 -->\n' + '<protocol>' + httpName + '</protocol>\n'
							+ '<!--  代理服务配置 -->\n<sidecar>\n<url>' + httpUrl + '</url>\n' + '<test>' + httpTest + '</test>\n' + '</sidecar>\n' + srcCfgContent + '</project>';
				}
				xCloudService.createFile({
					filePath : 'service/' + appName + "/" + "project.xml",
					content : datacontent
				});
			}
		},
		modifyBuildXml : function(params) {
			var path = params.path;
			var fileContent = xCloudService.getFileContent({
				filePath : path + "/" + "build.xml"
			});
			var content = fileContent.content;
			var docRoot = xmlUtil.fromString(content).documentElement;
			var strategy = params.strategy;
			var selected = params.compileType || "";
			$(docRoot).find("compile").attr("selected", selected);
			$(docRoot).find("strategy").html(strategy);
			if ($(docRoot).find("doc")) {
				$(docRoot).find("doc>domain").html(params.domain || "");
				$(docRoot).find("doc>output").html(params.output || "");
			}
			xCloudService.saveFile({
				filePath : path + "/" + "build.xml",
				content : $(docRoot)[0].outerHTML
			});
		},
		queryXml : function(path) {
			var fileContent = xCloudService.getFileContent({
				filePath : path
			});
			var content = fileContent.content;

			if (path.substr(path.lastIndexOf("/") + 1) == "project.xml") {
				if (!content) {
					throw new Error("请确认文件夹有project.xml文件");
				}
				;

				if (!content) {
					justep.Util.hint("请确认文件夹有project.xml或build.xml文件");
					return;
				}
				;
				var docRoot = xmlUtil.fromString(content).documentElement;
				var appName = $(docRoot).find("serviceName").html().trim();
				if (!appName) {
					justep.Util.hint("请检查project.xml的结构")
				}
				;
				var devLanguage = $(docRoot).find("language").html().trim();
				var patternName = $(docRoot).attr("mode");
				if (devLanguage != "Java" && devLanguage != "PHP") {
					throw new Error("暂时只支持Java和PHP两种开发语言");
				}
				if (patternName == "general") {
					var sourceDataArr = [];
					var $dataSource = $(docRoot).find("datasource");
					if ($dataSource.length > 0) {
						$.each($dataSource, function(i, item) {
							sourceDataArr.push({
								sourceName : $(item).attr("name"),
								connectType : $(item).attr("connect-type"),
								database : $(item).attr("database-type"),
								showSql : $(item).attr('show-sql'),
								ddlAuto : $(item).attr('ddl-auto'),
								sourceUrl : $(item).find("url") && $(item).find("url").html() || "",
								uName : $(item).find("username") && $(item).find("username").html() || "",
								uPwd : $(item).find('password').length > 0 && $(item).find('password').html() || ""
							})
						})
					}
					var itemsConfig = {
						appName : appName,
						devLanguage : devLanguage,
						patternName : patternName,
						protocol : $(docRoot).find("protocol").html() || "",
						sourceConfig : sourceDataArr.length > 0 ? sourceDataArr : [],
						docConfig : {
							domain : $(docRoot).find("doc>domain").html() || "",
							output : $(docRoot).find("doc>output").html() || ""
						},
						srcConfig : $(docRoot).find("src>enable").html() || ""
					}
					return itemsConfig;
				} else if (patternName == "agent") {
					var sideCar = $(docRoot).find("sidecar");
					var itemsConfig = {
						appName : appName,
						devLanguage : devLanguage,
						patternName : patternName,
						httpConfig : {
							httpName : $(docRoot).find("protocol").html() || "",
							httpUrl : sideCar.find("url").html() || "",
							httpTest : sideCar.find("test").html() || ""
						}
					}
					return itemsConfig;
				}
			} else if (path.substr(path.lastIndexOf("/") + 1) == "build.xml") {
				if (!content) {
					// this.newBuildXml({path:path});
				} else {
					var docRoot = xmlUtil.fromString(content).documentElement;
					var strategy = $(docRoot).find("strategy").html();
					var selected = $(docRoot).find("compile").attr("selected");
					var domain = $(docRoot).find("doc") && $(docRoot).find("doc>domain").html() || "";
					var output = $(docRoot).find("doc") && $(docRoot).find("doc>output").html() || "";
					return {
						strategy : strategy,
						selected : selected,
						domain : domain,
						output : output,
					}
				}
			}
		}
	};
	return editProjectXml;

})