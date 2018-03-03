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
	var RTBizData = require("../bizData");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	require('css!./css/data').load();

	var createData = function(data, clz) {
		var $domNode = $(data.domNode), xid = $domNode.attr("xid"), model = data.getModel();
		data.xid = xid;
		initDefinition(data);
		RTData.registerData(model, xid, data);
		$domNode.empty().css("height", "22px").css("display", "block").addClass(clz).append(
				"<img align='absmiddle' style='width:16px;height:18px;'/><span>" + (xid?xid:'') + "</span>");
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
		if ('xid' in value) {
			var $domNode = $(data.domNode), oldxid = $domNode.attr("xid");
			RTData.unRegisterData(data.getModel(), oldxid);
			RTData.registerData(data.getModel(), value['xid'], data);
			$domNode.children('span').text(value['xid'] ? value['xid'] : '');
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

	var filterNO = 0;
	var aggregateNO = 0;
	var calculateNO = 0;

	var BizData = RTBizData.extend({
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
			return 'true'==this.$domNode.attr('isTree');
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

		editExtendType : function(config){
			editExtendType(this, config);
		},
		
		newFilter : function(config) {
			xuiDoc.createComponent("$UI/system/components/justep/data/bizData#filter", this, {
				defaultProperties : {
					name : "filter" + (filterNO++)
				}
			});
		},

		newCalculate : function() {
			xuiDoc.createComponent("$UI/system/components/justep/data/bizData#calculateRelation", this, {
				defaultProperties : {
					relation : "relation" + (calculateNO++)
				}
			});
		},

		newAggregate : function() {
			xuiDoc.createComponent("$UI/system/components/justep/data/bizData#aggregateRelation", this, {
				defaultProperties : {
					relation : "aggregate" + (aggregateNO++)
				}
			});
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/data/bizData":{
				properties:["xid",{name:"concept",text:"数据对象"},{name:"reader",text:"加载数据动作"},{name:"writer",text:"保存数据动作"},
				            {name:"creator",text:"新增数据动作"},{name:"columns",text:"包含数据项"},{name:"limit",text:"一次加载条数"},
				            "offset",
				            {name:"orderBy",text:"数据排序规则"},
				            
				            "directDelete","confirmDelete",
				            "confirmDeleteText","confirmRefresh","confirmRefreshText","autoLoad","autoNew","isTree",
				            {name:"calculateCol",text:"计算关系",properties:[{name:"calculateRelations",readonly:true,text:"计算关系",editor:{url:"$UI/system/components/justep/data/designer/editCalcColumn.w"}}]},
				            {name:"filterGroup",text:"过滤条件",properties:[{name:"filter",text:"过滤条件",path:"filter/text()",editor:{url:"$UI/system/designer/webIde/editors/bizDataFilterSelector/bizDataFilterSelector.w"}}]},
				            {name:"treeOption",text:"树选项",properties:[
				                     {name:"parentRelation",text:"父","enabled-condition":"@isTree='true'"},
				                     {name:"nodeKindRelation",text:"节点类型","enabled-condition":"@isTree='true'"},
				                     {name:"delayLoad","enabled-condition":"@isTree='true'"},
				                     {name:"rootFilter","enabled-condition":"@isTree='true'"}]},
				            {name:"master",text:"主从选项",properties:["data",{name:"column","default-value":"fMasterID"}]}				            
				            ],
				events:[{name:"onIndexChanged",text:"索引改变事件"},
				            {name:"onValueChanged",text:"数据改变事件"},
				            {name:"onBeforeNew",text:"新增前事件"},
				            {name:"onBeforeDelete",text:"删除前事件"},
				            {name:"onBeforeRefresh",text:"刷新前事件"},
				            {name:"onAfterRefresh",text:"刷新后事件"},
				            {name:"onBeforeSave",text:"保存前事件"},
				            {name:"onSaveCommit",text:"保存后事件"}],
				toolbar:[{text:"编辑规则",method:"editRule"}//{text:"增加过滤条件",method:"newFilter"},
				         /*,{text:"增加计算关系",method:"newCalculate"}
				         ,{text:"添加过滤条件",method:function(did,mainModel,propEditor){
								var self = this; 
								var templateContent = '<filter name=""></filter>';
								xuiDoc.createComponent("$UI/system/components/justep/data/bizData#filter",did,{templateContent:templateContent,autoSelect:false,
									defaultProperties : {
										name : "filter" + (filterNO++)
									}},function(){
									self.refreshSubCompPropEditors(); 
								});
							}}*/
							],
				operations:function(){
					return [{groupName:"数据",
						items:[
							   {name:'new',label:'新增',argExtends:{defaultValues:{editor:"jsExpressionEX"}}},
							   {name:'refresh',label:'刷新'},
							   {name:'save',label:'保存'},
							   {name:'firstPage',label:'显示首页'},
							   {name:'prevPage',label:'显示上一页'},
							   {name:'nextPage',label:'显示下一页'},
							   {name:'lastPage',label:'显示尾页'},
							   {name:'firstRow',label:'移动到首行'},
							   {name:'lastRow',label:'移动到尾行'},
							   {name:'prevRow',label:'移动到上一行'},
							   {name:'nextRow',label:'移动到下一行'}
					    ]},
					    {groupName:"树形数据",
						items:[
							   {name:'newBrother',label:'新增同级节点'},
							   {name:'newChild',label:'新增子节点'},
						]}];
				},
				displaySubComp:true,//是否同事显示子组件属性
				subCompPath:"filter",
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname") || element.getAttribute("componentName");
					//鉴别contents
					if(element.parentNode && 
							element.parentNode.getAttribute("component") == "$UI/system/components/justep/data/bizData"){ 
						 return this.subComps[componentName];
					} 
				},
				
				subComps:{
					"$UI/system/components/justep/data/bizData#filter":{
						text:"过滤",
						displayName:function(values,name,idx){ 
							return "过滤"+(idx);
						},
						appendTo:">*[component='$UI/system/components/justep/data/bizData']:first",//要添加到哪个节点下
		 
						templateContent:function(config){
							return '<filter name=""></filter>';
						},
			 
						properties:["filter"],
						canSelect:false
					}
				}
			},
//			"$UI/system/components/justep/data/bizData#filter":{
//				properties:["name",{name:"filter",editor:"input",path:"text()"}],
//			},
			"$UI/system/components/justep/data/bizData#calculateRelation":{
				properties:["relation","label","type",{name:"size",text:"最大长度"}],
			},
			
			"$UI/system/components/justep/data/bizData#aggregateRelation":{
				properties:["relation","calculate"],
			}
	};

	return {
		'$UI/system/components/justep/data/bizData' : BizData,quickIdeEx:quickIdeEx
	};
});