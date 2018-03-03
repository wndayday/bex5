define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var sourceMess = require('./sourceMess');
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/

	// @-----20161214新增的引用数据库配置数据
	var sourcedataTypes = require("./databaseType");
	// @--------java配置项的数据
	var javaConfigs = require("$UI/system/designer/gox5/lib/javaConfigServer");
	// @--------获取被选中的数组
	var getCheckedCfg=require("$UI/system/designer/gox5/lib/getCheckedConfig");
	


	var Model = function() {
		this.callParent();
		this.protocolParams = [];
		this.path = justep.Bind.observable("");
		this.name = justep.Bind.observable("");
		this.patternName = justep.Bind.observable("");
		this.httpName = justep.Bind.observable("");
		this.languageVal = justep.Bind.observable("");
	};

	// 点击确认按钮
	Model.prototype.OKBtnClick = function(event) {
		var patternData = this.comp("patternData");
		if (!this.name.get()) {
			justep.Util.hint("应用名称不能为空");
			return;
		}
		if (this.patternName.get() == "普通服务") {
			var protocolData = this.comp("protocolData");
			this.protocolParams=[];
			this.protocolParams=getCheckedCfg({
				data:protocolData,
				column:"check",
				colVal:"1",
				pushName:"pName"
			});
			if((this.protocolParams||[]).length==0){
				justep.Util.hint('服务协议不能为空');
				return
			}
			
			if(this.languageVal.get() === "Java"){
			   var javaConfig = this.comp("javaConfigData");
			   var javaCompilerCfg = [];
			   javaCompilerCfg = getCheckedCfg({
					data:javaConfig,
					column:"status",
					colVal:"1",
					warVal:"源码编译配置不能为空",
					pushName:"configName"
				});
				javaCompilerCfg.length
				if(javaCompilerCfg.length == 0)
					return;
			}
			var docData=this.comp("docData");
			var docCompilerCfg = {
				domain:docData.getValue("domin")||"",
				output:docData.getValue("output")||"",
			};
			var sourceDataArr = sourceMess.getSource(this.comp("sourceData"));
			if(typeof sourceDataArr=== "boolean" ){
				return;
			}
			var patternRow = patternData.find([ 'cN_name' ], [ '普通服务' ]);
			this.owner.send({
				serviceConfig : {
					path : this.path.get(),
					appName : this.name.get(),
					protocol : this.protocolParams.toString()||"",
					devLanguage : this.languageVal.get(),
					patternName : patternRow[0].val('name'),
					/*
					 * sourceName :sourceData.getValue("sourceName"),
					 * connectType : sourceData.getValue("cType"),
					 * database:sourceData.getValue("baseType"),
					 * sourceUrl:sourceData.getValue("url"),
					 * uName:sourceData.getValue("uName"),
					 * uPwd:sourceData.getValue("pwd")
					 */
					sourceData : sourceDataArr.length > 0 ? sourceDataArr : [],
					javaCompilerCfg:javaCompilerCfg||[].toString()||"",
					docCompilerCfg:docCompilerCfg
				}
			});
		} else if (this.patternName.get() == "代理服务") {
			var agentConfig = this.comp("agentConfig");
			if (!agentConfig.getValue("url") || !agentConfig.getValue("test")) {
				justep.Util.hint("所有内容为必填项，不能有空")
				return;
			} else {
				var serviceConfig = {
					path : this.path.get(),
					appName : this.name.get(),
					devLanguage : this.languageVal.get(),
					httpName : this.httpName.get(),
					httpUrl : agentConfig.getValue("url"),
					httpTest : agentConfig.getValue("test"),
					docCompilerCfg:"sidecar"
				}
				this.owner.send({
					serviceConfig : serviceConfig
				});
			}
		}
		this.owner.close();
	};

	// 接受传过来的参数
	Model.prototype.modelParamsReceive = function(event) {
		if (event.params && event.params.path) {
			var devLanguage = this.comp("devLanguageData");
			var patternData = this.comp("patternData");
			var sourceData = this.comp("sourceData");
			var agentConfig = this.comp("agentConfig");
			var protocolData = this.comp("protocolData");
			var self = this;
			var dataBase = this.comp("dataBase");
			this.path.set(event.params.path);
			this.name.set(event.params.property.appName || "");
			var language = event.params.property.devLanguage;
			devLanguage.each(function(option) {
				if (language == option.row.val("name")) {
					self.languageVal.set(option.row.val("name"))
				}
			});
			// 接受传过来的对象
			var propertyObj = event.params.property;
			var patternName = propertyObj.patternName;

			var srcConfigArr=javaConfigs.loadJavaConfig("configName","service");
			if (patternName == "general") {
				var javaSrcConfig = this.comp("javaConfigData");
				javaSrcConfig.loadData(srcConfigArr,true);
				this.patternName.set("普通服务");
				var protocolArr = event.params.property.protocol.split(",");
				protocolArr.forEach(function(val, index) {
					protocolData.each(function(option) {
						if (option.row.val("pName") == val) {
							option.row.val("check", "1");
						}
					});
				})
				// java源码配置
				if (language == "Java") {
					
					var srcCig = event.params.property.srcConfig.split(",");
					if(srcCig){
						var arr=javaConfigs.getConfigNames("service");
						var srcArr=[];
						for(var s=0;s<arr.length;s++){
							srcCig.forEach(function(item){
								if(arr[s].name===item){
									srcArr.push(arr[s]["zn_name"])
								}
							});
						}
						srcArr.forEach(function(val, index) {
							javaSrcConfig.each(function(option) {
								if (option.row.val("configName") == val) {
									option.row.val("status", "1");
								}
							})
						});
					}
				}
				
				// doc配置
				var docData=this.comp("docData");
				docData.newData();
				var docConfig=event.params.property.docConfig;
				docConfig['domain'] && docData.setValue('domin',docConfig['domain']);
				docConfig['output'] && docData.setValue('output',docConfig['output']);
				
				var sourceConfigArr = propertyObj.sourceConfig;
				if (sourceConfigArr.length > 0) {
					sourcedataTypes.loadDatabase("baseType").then(function(value) {
						self.comp("dataBase").loadData(value, true);
					})
					sourcedataTypes.loadDatabase("cType").then(function(value) {
						self.comp("cTypeData").loadData(value, true);
					});
					sourcedataTypes.loadDatabase("show_sql").then(function(value) {
						self.comp("showSql").loadData(value, true);
					});
					sourcedataTypes.loadDatabase("ddl_auto").then(function(value) {
						self.comp("ddlAuto").loadData(value, true);
					})
					for (var i = 0; i < sourceConfigArr.length; i++) {
						var item = sourceConfigArr[i];
						sourceData.newData();
						sourceData.setValue("sourceName", item.sourceName);
						sourceData.setValue("cType", item.connectType);
						var baseType = item.database;
						var isOwner = false;
						sourceData.setValue("baseType", item.database);
						sourceData.setValue("url", item.sourceUrl);
						sourceData.setValue("show_sql", item.showSql);
						sourceData.setValue("ddl_auto", item.ddlAuto);
						sourceData.setValue("uName", item.uName);
						sourceData.setValue("pwd", item.uPwd);
					}
				} else {
					sourceData.clear();
				}
			} else if (patternName == "agent") {
				var httpConfig = propertyObj.httpConfig;
				this.patternName.set("代理服务");
				this.httpName.set(httpConfig.httpName);
				agentConfig.newData();
				agentConfig.setValue("url", httpConfig.httpUrl);
				agentConfig.setValue("test", httpConfig.httpTest);
			}
			;
		}
	};
	// 根据用户设置的数据源，显示不同的
	Model.prototype.sourceMatch = function(data, key) {
		data.each(function(option) {

		})
	}

	// 下拉菜单
	Model.prototype.select1Change = function(event) {
		this.languageVal.set(event.value);
	};

	// protocol的checkbox
	Model.prototype.protocolCheckChange = function(event) {
		var row = event.bindingContext.$object;
		if (event.checked) {
			row.val("check", "1");
		} else {
			row.val("check", "0");
		}
	};

	Model.prototype.isEqual = function(value) {
		var sourceData = this.comp('sourceData');
		if (sourceData.count() > 0) {
			sourceData.each(function(option) {
				if (option.row.val('sourceName') == value) {
					justep.Util.hint('数据源名称不能相同');
					$('[xid="OKBtn"]').attr('disabled', true);
				} else {
					$('[xid="OKBtn"]').attr('disabled', false);
				}
			})
		}
	}

	// 数据源配置改变时
	Model.prototype.sourceDataValueChange = function(event) {
		var newValue = event.newValue;

	};

	// sourceData的必填规则
	Model.prototype.mustWriteRules = function(value) {
		var sourceData = this.comp("sourceData");
		if (!value) {
			justep.Util.hint("所有内容为必填项，不能有空");
			return;
		}
	}
	// 删除数据源
	Model.prototype.deleteBtnClick = function(event) {
		var sourceData = this.comp("sourceData");
		var row = event.bindingContext.$object;
		sourceData.deleteData(row);
	};

	// 添加数据源
	Model.prototype.addBtnClick = function(event) {
		var sourceData = this.comp("sourceData");
		var sourceList = this.comp('sourceList');
		sourceData.newData();
		sourceData.setValue("baseType", "MySql");
	};
	Model.prototype.input10Change = function(event) {
	};
	
	Model.prototype.javaCheckboxChange = function(event){
		var row = event.bindingContext.$object;
		if (event.checked) {
			row.val("status", "1");
		} else {
			row.val("status", "0");
		}
	};
	return Model;
});