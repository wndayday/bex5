/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	//var $ = require("jquery");
	//var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.beforeOkAction = function(){
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){ 
		var def = [],label=[];//, 
 
	    def = this.xmlModel.childAsArray();	
	    var newDef = [];
	    for(var i = 0;i<def.length;i+=1){
	    	var item = def[i];
	    	if(item.substring(0,18) == '<calculateRelation'){
	    		newDef.push(item);
	    	}	    	
	    }
 		if(newDef.length>0){
 			xuiDoc.replaceChild(this.did, newDef.join(""), {
 				paintComponent : false,
 				jqCondition : "calculateRelation"
 					//xpathCondition : "*[local-name()='column']"
 			});
 		}
		
		var dataComp = this.comp("data");
		dataComp.each(function(param){
			label.push(param.row.val('displayName'));
		});
		return label.length>0?{calculateRelations:label.join(',')}:""; 
	};
	
//	Model.prototype.xml2data = function(xmlStr){
//		if(xmlStr){
//			var $data = $(XML.fromString(xmlStr).documentElement), data = this.comp('data'), idColumn=$data.attr('idColumn');
//			$data.children('column').each(function(){
//				var $col = $(this);
//				data.add({
//						xid : $col.attr('xid'),
//						name : $col.attr('name'),
//						type : $col.attr('type'),
//						displayName : $col.attr('label'),
//						isIDColumn: $col.attr('name')!==idColumn?false:true
//					});
//			});
//			data.first();
//		}
//	};
	
	Model.prototype.modelLoad = function(event) {
		//var self = this;
		//window.setTimeout(function(){
			//创建grid的下拉选择
			
		var initData = xuiService.getPageParams();// 获取传入的参数
		this.mainModel = initData.mainModel;
		this.did = initData.d_id;
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
		"name":"@relation",
		"type":"@type",
		"displayName":"@label"};
		
		this.type = initData.type; 
		var config = {xmlData:initData.nodeXml,
		rowIdPath:"@xid",  //行id映射
		rowNodePath:"calculateRelation", //行节点映射
		idField:"xid", //data
		data:dataComp,//data组件
		binding:binding};
		this.xmlModel = xuiService.createXmlModel(config);
	};

	Model.prototype.removeRow = function(up){
		var data = this.comp('data'), row1 = data.getCurrentRow(true);
		var index = data.getRowIndex(row1);
		index += (up?-1:1);
		if(index<0 || index>=data.getCount()) return;
		var datas = data.datas.peek();
		var row2 = datas[index];
		data.exchangeRow(row1,row2);
	};

	
	Model.prototype.upClick = function(event){
		this.removeRow(true);
	};

	
	Model.prototype.downClick = function(event){
		this.removeRow(false);
	};

	
	Model.prototype.dataBeforeDelete = function(event){
	};

	
	Model.prototype.dataBeforeNew = function(event){
		if(!event.option || !event.option.defaultValues || event.option.defaultValues.length<=0){
			var data = event.source, col = 'col' + data.getCount();
			event.option.defaultValues = [{
				name : col,
				displayName : col,
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