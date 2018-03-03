/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var XML = require("$UI/system/lib/base/xml");
	var RTData = require("../data");
	var RTAggregateData = require("../aggregateData");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	require('css!./css/data').load();
	
	var filterNO = 0;

	var createData = function(data, clz) {
		var $domNode = $(data.domNode), xid = $domNode.attr("xid"), model = data.getModel();
		data.xid = xid;
		initDefinition(data);
		RTData.registerData(model, xid, data);
		var label = data.domNode.getAttribute("label") ||xid ||"data";
		$domNode.empty().css("height", "22px").css("display", "block").addClass(clz).append(
				"<img align='absmiddle' style='width:16px;height:18px;'/><span>" + (label) + "</span>");
		model.resolvedComponent(xid);
	};

	var initDefinition = function(data){
		var xuiNode = xuiDoc.getNodeByDId(data.$domNode.attr('d_id'));
		if(xuiNode){
			var $data = $(XML.fromString(xuiNode).documentElement);
			if('true'==$data.attr('isTree')){
				var $defTreeOption = $data.children("treeOption");
				data.defTreeOption.isTree = true;
				data.defTreeOption.option = {
						isDelayLoad:'true'==$defTreeOption.attr('delayLoad'),
						parentRelation:$defTreeOption.attr('parentRelation'),
						childrenRelation:$defTreeOption.attr('childrenRelation'),
						rootFilter:$defTreeOption.attr('rootFilter'),
						nodeKindRelation:$defTreeOption.attr('nodeKindRelation'),
						nodeLevelRelation:$defTreeOption.attr('nodeLevelRelation')
				};
			}else data.defTreeOption.isTree = false;
		}
	};

	var set = function set(data, value) {
		if ('xid' in value || 'label' in value) {
			var field = 'xid' in value?'xid':'label';
			var $domNode = $(data.domNode), oldxid = $domNode.attr(field);
			RTData.unRegisterData(data.getModel(), oldxid);
			RTData.registerData(data.getModel(), value[field], data);
			$domNode.children('span').text(value[field] ? value[field] : '');
		}else if('isTree' in value || 'parentRelation' in value) initDefinition(data);
	};

	var getCols = function(xml){
		var cols = [];
		$(xml).children("column").each(function(){
			var $col = $(this);
			cols.push({'alias':$col.attr('name'),
				'data-type':$col.attr('type'),
				'label':$col.attr('label')});
		});
		return cols;
	};
	
	var editRule = function(data, config) {
		var cols = xuiDoc.getEditorDataSource("RuleRelationDatasource.getDatasource",null,config.d_id)||getCols(config.nodeXml);// 获取列信息
		xuiService.openPage("$UI/system/components/justep/data/designer/editRule.w", {
			title : "data规则编辑",
			xml : config.nodeXml,
			"d_id":config["d_id"],
			cols : cols
		}, function(result) {
			xuiDoc.replaceChild(data, result.def, {
				xpathCondition : "*[local-name()='rule']",
				jqCondition : "rule",
				paintComponent : false
			});
		});
	};

	/*
	var editData = function(data, config) {
		xuiService.openPage("$UI/system/components/justep/data/designer/editColumn.w", {
			title : "data列编辑",
			"d_id":config["d_id"],
			xml : config.nodeXml
		}, function(result) {
			xuiDoc.replaceChild(data, result.def.join(""), {
				paintComponent : false,
				jqCondition : "column"
				//xpathCondition : "*[local-name()='column']"
			});
			xuiDoc.set(data, {
				idColumn : result.idColumn
			});
		});
	};

	
	var editExtendType = function(data, config) {
		var model = data.getModel();
		var extendTypes = {}, l = model.getExtendTypes?model.getExtendTypes():[];
		$.each(l, function(n,v){
			extendTypes[n] = {
				"name" : v.name,
				"dataType" : v.dataType,
				"editor" : v.editor
			};
		});
		var cols = xuiDoc.getEditorDataSource("RuleRelationDatasource.getDatasource",null,config.d_id)||getCols(config.nodeXml);// 获取列信息
		xuiService.openPage("$UI/system/components/justep/data/designer/editExtendType.w", {
			title : "data扩展类型设置",
			xml : config.nodeXml,
			"d_id":config["d_id"],
			extendTypes: extendTypes, 
			cols : cols
		}, function(result) {
			xuiDoc.replaceChild(data, result.def, {
				xpathCondition : "*[local-name()='extendType']",
				jqCondition : "extendType",
				paintComponent : false
			});
		});
	};
	*/
	
	var AggregateData = RTAggregateData.extend({
		constructor : function(config) {
			if (config && config.templateNode) {
				this._bind(config.templateNode);
			}
			this.callParent(config);
		},
		_bind : function(element) {
			bind.utils.domData.set(element, Component.BIND_NAME, this);
			this.domNode = element;
			this.$domNode = $(this.domNode);
			bind.utils.domNodeDisposal.addDisposeCallback(element, this.dispose.bind(this));
		},
		
		isTree: function(){
			return false;
		},
		
		editData:function(){
			
		},
		getTreeOption: function(){
			return {
				parentRelation:	xuiDoc.get(this,"parentRelation"),
				nodeKindRelation: xuiDoc.get(this,"nodeKindRelation"),
				delayLoad: 'true'==xuiDoc.get(this,"delayLoad"),
				rootFilter: xuiDoc.get(this,"rootFilter")
			};
		},
		init : function(value, bindingContext) {
			createData(this, 'x-biz-data');
		},
		set : function(v) {
			set(this, v);
		},
		editRule : function(config) {
			editRule(this, config);
		},
		newFilter : function(config,designer) { 
			xuiDoc.createComponent("$UI/system/components/justep/data/aggregateData#filter", this, {
				autoSelect:true,
				defaultProperties : {
					name : "filter" + (filterNO++)
				}
			},function(){ 
				if(designer){
					designer.callPropEditorMethod("refreshSubCompPropEditors");
				}
			});
		},
		newHaving : function(config,designer) { 
			xuiDoc.createComponent("$UI/system/components/justep/data/aggregateData#having", this, {
				autoSelect:true,
				defaultProperties : {
					name : "having" + (filterNO++)
				}
			},function(){ 
				if(designer){
					designer.callPropEditorMethod("refreshSubCompPropEditors");
				}
			});
		}
	});

	var quickIdeEx = {
			"$UI/system/components/justep/data/aggregateData":{				
				properties:["label",{name:"groupBy",readonly:true},{name:"className",readonly:true}],
				events:[{name:"onCustomRefresh",text:"刷新事件",editor:"eventEditor",noLabel:true},{name:"onAfterRefresh",text:"刷新后事件",editor:"eventEditor",noLabel:true}],
				
				toolbar:[{text:"编辑",method:function(did,mainModel,propEditor){
					   var params = {};
					   var element =  mainModel.callDesignerMethod("getElementByDId",did); 
					   params.modelXml = mainModel.callDesignerMethod("getModelXml");
					   params.mainModel = mainModel;
					   params.xid = element.getAttribute("xid");

					   mainModel.openEditorDialog({params:params,url:"$UI/system/components/justep/data/designer/dlg/aggregateData.w",callback:function(){
						   propEditor.refresh(did);							   
					   }});
				}}
				],
				
				//操作配置
				operations:function(){
					return [{
						groupName:"数据",
						items:[
							   {name:'refresh',label:'刷新'},
							   {name:'firstRow',label:'移动到首行'},
							   {name:'lastRow',label:'移动到尾行'},
							   {name:'prevRow',label:'移动到上一行'},
							   {name:'nextRow',label:'移动到下一行'}
						]
					}];
				},
				
				displaySubComp:false,//是否同事显示子组件属性
				subCompPath:"filter",
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname") || element.getAttribute("componentName");
					//鉴别contents
					if(element.parentNode && 
							element.parentNode.getAttribute("component") == "$UI/system/components/justep/data/aggregateData"){ 
						 return this.subComps[componentName];
					} 
				},
				subComps:{
					"$UI/system/components/justep/data/aggregateData#filter":{
						text:"过滤",
						displayName:function(values,name,idx){ 
							return "过滤"+(idx);
						},
						appendTo:">*[component='$UI/system/components/justep/data/aggregateData']:first",//要添加到哪个节点下
		 
						templateContent:function(config){
							return '<filter name=""></filter>';
						},
			 
						properties:["filter"],
						canSelect:false
					}
				}
			}
			 
	};
	return {
		'$UI/system/components/justep/data/aggregateData' : AggregateData,quickIdeEx:quickIdeEx
	};
});