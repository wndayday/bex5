define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var XML = require('$UI/system/lib/base/xml');
	var Handlebars = require("$UI/system/designer/wizard/common/js/handlebars-v1.3.0");
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");

	var TemplateEngine = function(targetPath) {
		this.constructor(targetPath);
	};

	TemplateEngine.prototype = {
		_getRealTargetFile : function(templateFile, targetFileName) {
			var fileNames = templateFile.split("/");
			var exts = fileNames[fileNames.length - 1].split(".");
			return targetFileName + "." + exts[exts.length - 1];
		},

		_getTempleteFile : function(filePath, context) {
			var file = templateService.readFile(filePath);
			var template = Handlebars.compile(file);
			//注册索引+1的helper
			 var handleHelper = Handlebars.registerHelper("addOne",function(index){
			    //返回+1之后的结果
			   return index+1;
			  });
			return template(context);
		},

		constructor : function(targetPath) {
			this.targetPath = targetPath;
		},

		resetTemplatePath : function(templatePath) {
			if (this.templatePath != templatePath) {
				this.templatePath = templatePath;
				delete this.config;
			}
		},

		/*
		 * config.items[n] config.images[n] config.context[templateFile]
		 * config.context[templateFile].targetFiles[targetFile] config.current
		 * 当前配置信息，例如 mainData.concept mainData.reader 等
		 */
		getConfig : function() {
			if (!this.config) {
				this.config = {};
				var configXml = templateService.getTemplateConfig(this.templatePath);
				var root = $(XML.fromString(configXml).documentElement);
				// 目前选项中的并非全部可用，这里做一下标记
				this.config.notSupport = configXml == "";
				this.config.desc = root.attr("desc");
				this.config.custom = root.attr("custom");

				var templatePath = this.templatePath;
				var itemsE = root.children('items');
				var items = [];
				var context = {};
				var dialog = {};
				if (itemsE) {
					var templateFile = itemsE.attr("file");
					if (templateFile) {
						context[templateFile] = {};
					}
					$("item", itemsE).each(function() {
						var $this = $(this);
						var realTemplateFile = $this.attr("file") || templateFile;
						if (!realTemplateFile) {
							throw "模版定义错误，获取模版文件名失败！模版目录：" + templatePath;
						}
						items.push({
							file : realTemplateFile,
							text : $this.attr("text"),
							configPage : $this.attr("configPage"),
							otherFiles : $this.attr("otherFiles"),
							dialog : $this.attr("dialog")
						});
						context[realTemplateFile] = {};
						context.handlebarsExpre = {};

						if($this.attr("dialog")){//使用dialog
							var dialogFile = $this.attr("dialog");
							dialogFile = dialogFile.split(".")[0];
							if(!dialog[dialogFile]){
								dialog[dialogFile] = {};
								var d = new Date()
								dialog[dialogFile].filename = "activity" + d.getTime();
							}
						}
					});
				}
				this.config.items = items;
				this.config.context = context;
				this.config.dialog = dialog;

				var imagesE = root.children('images');
				var images = [];
				if (imagesE) {
					var templateFile = imagesE.attr("file");
					$("image", imagesE).each(function() {
						var $this = $(this);
						images.push($this.attr("src"));
					});
				}
				this.config.images = images;

			}
			;

			return this.config;
		},

		getTargetPath : function() {
			return this.targetPath;
		},

		setTargetFileName : function(targetFileName) {
			this.targetFileName = targetFileName;
		},

		setTargetFileLabel : function(targetFileLabel) {
			this.targetFileLabel = targetFileLabel;
		},

		addContext : function(templateFile, name, value, targetFile, targetFileLabel) {
			var config = this.getConfig();
			if (!targetFile) {
				targetFile = this.targetFileName + ".w";
			}
			if (!config.context[templateFile].targetFiles) {
				config.context[templateFile].targetFiles = {};
			}
			if (!config.context[templateFile].targetFiles[targetFile]) {
				config.context[templateFile].targetFiles[targetFile] = {};
			}
			config.context[templateFile].targetFiles[targetFile][name] = value;
			config.context.handlebarsExpre[name] = value;
			
			if(targetFileLabel)
				config.context[templateFile].targetFiles[targetFile]['fileLabel'] = targetFileLabel;
		},

		removeContext : function(templateFile, targetFile, name) {
			var config = this.getConfig();
			if (!name) {
				delete config.context[filename].targetFiles[targetFile];
			} else {
				delete config.context[filename].targetFiles[targetFile][name];
			}
		},

		_createFile : function(templateFile, context, targetFile) {
			//给对话框中使用的文件重命名
			var dialog = this.getConfig().dialog;
			var iPos = templateFile.indexOf(".");
			var dialogFileName = templateFile.substr(0,iPos);
			if (dialog[dialogFileName]) {
				targetFile = dialog[dialogFileName].filename + templateFile.substr(iPos);
			}
			
			//写文件
			var file = this._getTempleteFile(this.templatePath + '/' + templateFile, context);
			var targetFilePath = this.targetPath + "/" + targetFile;
			templateService.writeFile(targetFilePath, file);
			
			//写文件的中文名 
			if(targetFile.endsWith(".w")){
				if(targetFile == this.targetFileName + ".w")
					templateService.updateLabel(targetFilePath, this.targetFileLabel);
				else if(context.fileLabel)//流程环节对应的w文件使用流程环节的名称
					templateService.updateLabel(targetFilePath, context.fileLabel);
				else
					templateService.updateLabel(targetFilePath, this.targetFileLabel+"对话框");
			}
		},

		_copyResourceFiles : function(excludeFiles) {
			templateService.copyResourceFiles(this.templatePath, this.targetPath, excludeFiles);
		},

		createFiles : function() {
			var context = this.getConfig().context;
			var excludeFiles = [];
			
			for ( var templateFile in context) {
				if (templateFile !=='handlebarsExpre') {
					if (context[templateFile].targetFiles) {
						for ( var targetFile in context[templateFile].targetFiles) {
							if (templateFile.indexOf(",") != -1) {
								templatefile = templateFile.split(",")[0];
								
								this._createFile(templatefile, context[templateFile].targetFiles[targetFile], '');
								excludeFiles.push(templatefile);
							}else {
								this._createFile(templateFile, context[templateFile].targetFiles[targetFile], targetFile);
								excludeFiles.push(templateFile);
							}
						}
					} else {
						this._createFile(templateFile, context.handlebarsExpre, this._getRealTargetFile(templateFile, this.targetFileName));
						excludeFiles.push(templateFile);
					}
				}
			}
			this._copyResourceFiles(excludeFiles);
		},

		getOtherFiles : function(configPage) {
			var items = this.getConfig().items;
			var otherFiles = "";
			$.each(items, function() {
				if(this.configPage == configPage){
					otherFiles = this.otherFiles;
					return false;
				}
					
			});
			return otherFiles;
		}

	};

	return TemplateEngine;
});
