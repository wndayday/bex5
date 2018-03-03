define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/
	var xmlUtil = require('$UI/system/lib/base/xml');
	var sourceMess=require('./sourceMess');
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/
    
    /**
	 * @-----20161214新增的引用数据库配置数据
	 */
    var sourcedataTypes=require("./databaseType");
    /**
	 * @--------java配置项的数据
	 */
    var javaConfigs=require("$UI/system/designer/gox5/lib/javaConfigServer");
    
    /**
	 * @---获取被选中的数组
	 */
    var getCheckedCfg=require("$UI/system/designer/gox5/lib/getCheckedConfig");
     
     
	var Model = function() {
		this.callParent();
		this.protocolParams = [];
		this.path = justep.Bind.observable("");
		this.name = justep.Bind.observable("");
		this.patternName = justep.Bind.observable("");
		this.httpName = justep.Bind.observable("");
		this.languageVal = justep.Bind.observable("");
		this.isShow=justep.Bind.observable(false);
		this.devLagConfig=justep.Bind.observable("");
		this.compile_type=justep.Bind.observable("");
	};

	// 点击确认按钮
	Model.prototype.OKBtnClick = function(event) {
		var patternData=this.comp("patternData");
		if (!this.name.get()) {
			justep.Util.hint("应用名不能有空");
			return;
		}
		if(this.patternName.get()=="普通服务"){			
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
			/*
			 * var rows = protocolData.find([ "check" ], [ "1" ]); if
			 * (rows.length < 1) { justep.Util.hint("服务协议不能为空") return; } else {
			 * for (var i = 0; i < rows.length; i++) {
			 * this.protocolParams.push(rows[i].val("pName")); } }
			 */
			if(this.languageVal.get()==="Java"){
			   var javaConfig=this.comp("javaConfigData");
			   var javaCompilerCfg=[];
			   javaCompilerCfg=getCheckedCfg({
					data:javaConfig,
					column:"status",
					colVal:"1",
					pushName:"configName"
				});
			}
			var docData=this.comp("docData");
			var docCompilerCfg={
					domain:docData.getValue("domin")||"",
					output:docData.getValue("output")||"",
			};
			var sourceData = this.comp("sourceData");
			var sourceDataArr=sourceMess.getSource(this.comp("sourceData"));
			if(typeof sourceDataArr=== "boolean" ){
				return
			}
			var patternRow=patternData.find(['cN_name'],['普通服务']);
			this.owner.send({serviceConfig:{
				path : this.path.get(),
				appName : this.name.get(),
				protocol : this.protocolParams.toString(),
				devLanguage : this.languageVal.get(),
				patternName:patternRow[0].val('name'),
				sourceData:sourceDataArr||[],
				javaCompilerCfg:(javaCompilerCfg||[]).toString()||"",
				docCompilerCfg:docCompilerCfg
			}});
		}else if(this.patternName.get()=="代理服务"){
			var patternRow=patternData.find(['cN_name'],['代理服务']);
			var agentConfig=this.comp("agentConfig");
			if(!agentConfig.getValue("url")|| !agentConfig.getValue("test")){
				justep.Util.hint("所有内容为必填项，不能有空")
				return 
			}else {
				var serviceConfig={
					path : this.path.get(),
					appName : this.name.get(),
					patternName:patternRow[0].val('name'),
					devLanguage : this.languageVal.get(),
					httpName:this.httpName.get(),
					httpUrl:agentConfig.getValue("url"),
					httpTest:agentConfig.getValue("test"),
					docCompilerCfg:"sidecar"
				}
				this.owner.send({
					serviceConfig:serviceConfig
				});
			}
		}
		this.owner.close();

	};

	Model.prototype.modelParamsReceive = function(event) {
		if (event.params && event.params.path) {
			var patternData = this.comp("patternData");
			var agentConfig = this.comp("agentConfig");
			var javaConfig=this.comp("javaConfigData");
			this.path.set(event.params.path);
			this.name.set(event.params.name || "");
			this.patternName.set("普通服务");
			this.httpName.set("HTTP");
			this.languageVal.set("Java");
			this.compile_type.set(event.params.$$__compile_type);
			agentConfig.newData();
			if(event.params.$$__compile_type=="spring"){
					javaConfig.loadData(javaConfigs.loadJavaConfig("configName",event.params.path),true);
			}
		}
	};
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

	Model.prototype.isEqual=function(value){
		var sourceData=this.comp('sourceData');
		if(sourceData.count()>0){
			sourceData.each(function(option){
				if(option.row.val('sourceName')==value){
					justep.Util.hint('数据源名称不能相同');
					$('[xid="OKBtn"]').attr('disabled',true);
				}else {
					$('[xid="OKBtn"]').attr('disabled',false);
				}
			})
		}
	}

	/**
	 * *开发模式切换
	 */
	Model.prototype.select3Change = function(event) {
		this.patternName.set(event.value);
	};

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
	
	
	// 添加数据源
	Model.prototype.addBtnClick = function(event){
		var sourceData=this.comp("sourceData");
		if(sourceData.count()>=1)return;
		var sourceList=this.comp('sourceList');
		var database=this.comp("dataBase");
		var cTypeData=this.comp("cTypeData");
		var showSqlData=this.comp("showSql");
		var ddlAutoData=this.comp("ddlAuto");
		sourcedataTypes.loadDatabase("baseType")
			.then(function(value){
				database.loadData(value,true);
			})
		sourcedataTypes.loadDatabase("cType")
			.then(function(value){
				cTypeData.loadData(value,true);
			});
		sourcedataTypes.loadDatabase("show_sql")
			.then(function(value){
				showSqlData.loadData(value,true);
			});
		sourcedataTypes.loadDatabase("ddl_auto")
			.then(function(value){
				ddlAutoData.loadData(value,true);
			})
		sourceData.newData();
		sourceData.setValue("baseType", "mysql");
		sourceData.setValue("cType","jpa");
		sourceData.setValue("show_sql","true");
		sourceData.setValue("ddl_auto","update");
	};
	
	Model.prototype.modelLoad = function(event){
	};

	// 删除数据源
	Model.prototype.deleteBtnClick = function(event){
		var sourceData=this.comp("sourceData");
		var row = event.bindingContext.$object;
		sourceData.deleteData(row);
		
	};

	Model.prototype.input1Change = function(event){
		this.isEqual(event.value);
	};

	/**
	 * java server config
	 */
	Model.prototype.javaCheckboxChange = function(event){
		var row = event.bindingContext.$object;
		if(event.checked){
			row.val("status","1");
		}else {
			row.val("status","0");
		}
	};

	return Model;
});