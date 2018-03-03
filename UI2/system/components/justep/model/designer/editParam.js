/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	//var $ = require("jquery");
	//var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.beforeOkAction = function(){
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){ 
		var def = [];//, 
 
	    def = this.xmlModel.childAsArray();	
	    var newDef = [];
	    for(var i = 0;i<def.length;i+=1){
	    	var item = def[i];
	    	if(item.substring(0,6) == '<param'){
	    		newDef.push(item);
	    	}
	    	
	    }
		return {def:newDef}; 
	};
	
	Model.prototype.modelLoad = function(event) {
		//var self = this;
		//window.setTimeout(function(){
			//创建grid的下拉选择
			
		var initData = xuiService.getPageParams();// 获取传入的参数
		if(!initData){
			return;
		}
		this.initColum(initData);
		
			//// 初始化属性值
		//}, 1000);
	};
	Model.prototype.initColum = function(initData){
	//self.xml2data(initData.xml);
		var dataComp = this.comp("data");
		
		//data列与xml节点属性值的映射
		 var binding = {
		"name":"@name",
		"type":"@type",
		"displayName":"@label"};
		
		var config = {xmlData:initData.xml,
		rowIdPath:"@xid",  //行id映射
		rowNodePath:"param", //行节点映射
		idField:"xid", //data
		data:dataComp,//data组件
		binding:binding};
		this.xmlModel = xuiService.createXmlModel(config);
	};

	Model.prototype.dataBeforeDelete = function(event){
	};

	
	Model.prototype.dataBeforeNew = function(event){
		if(!event.option || !event.option.defaultValues || event.option.defaultValues.length<=0){
			var data = event.source, name = 'param' + data.getCount();
			event.option.defaultValues = [{
				name : name,
				type : 'String'
			}]; 
		}
	};

	
	Model.prototype.modelParamsReceive = function(event){
		var params = event.params;  
		if(params && params.xmlData){
			this.initColum(params);		
		}
	};

	return Model;
});