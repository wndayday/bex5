define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Data = require("$UI/system/components/justep/data/data");
	var templateService = require("$UI/system/designer/wizard/common/js/templateService");
	
	var Model = function() {
		this.callParent();
		this.lastConcept = "";
		this.LastReader = "";
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.templateFilePath = this.templateEngine.templatePath + "/" + this.templateFile;
	};
		
	Model.prototype.modelParamsReceive = function(event){
		var config = this.templateEngine.getConfig();
		var mainDataConfig = config.current ? config.current.mainData :'';

		if(mainDataConfig==undefined || mainDataConfig==""){
			alert("请先选择数据对象");
			return;
		}
		if(mainDataConfig.concept==this.lastConcept && mainDataConfig.reader==this.LastReader) return;
		//获取数据
		var data = mainDataConfig.relations.slice(0);
		
		var hasParent = false;
		var hasNodeKind = false;
		var treeNodeName = "",treeNodeLabel="";
		
		//检查是否树形数据
		$.each(data, function(){
			if(this.name=='fParent')
				hasParent = true;
			if(this.name=='fNodeKind')
				hasNodeKind = true;
			if(treeNodeName == "" && this.label != undefined && this.name != "version" && this.name != "fParent"  && this.name != "fNodeKind"  ){
				treeNodeName = this.name;
				treeNodeLabel = this.label;
			}
		})
		var treeData = this.getTreeData();
		treeData.clear();

		if(!hasParent){
			alert("请选择一个树形数据对象");
			return;
		}
		
		treeData.newData({
			defaultValues : [ {
				id : "id1",
				rootNodeLable : mainDataConfig.conceptName,
				treeNodeName : treeNodeName,
				treeNodeLabel : treeNodeLabel,
				parentRelation : "fParent",
				nodeKindRelation : hasNodeKind ? 'fNodeKind' : "" 
			} ]
		});
		treeData.first();
//		this._addSelectData();
		this.lastConcept = mainDataConfig.concept;
		this.LastReader = mainDataConfig.reader;

	};
	
	
	Model.prototype.addField = function(callback) {
		var config = this.templateEngine.getConfig();
		var mainDataConfig = config.current ? config.current.mainData :'';
		templateService.openSwtCommonSelectorDialog({
			title : "选择列", 
			templateFilePath : this.templateFilePath, 
			targetPath : this.templateEngine.getTargetPath(), 
			concept : mainDataConfig.concept,
			reader : mainDataConfig.reader,
			writer : mainDataConfig.writer,
			creator : mainDataConfig.creator,
			relations : mainDataConfig.relations,
			datasource : {mutiSelect : false, method : "RuleRelationDatasource.getDatasource"}}, 
			callback
		);
	};

	Model.prototype.getTreeData = function() {
		return this.comp("treeData");
	}

	Model.prototype.validate = function(wizard) {
		var data = this.getTreeData();
		var msg = "";
		if(data.count()==0){
			msg = "请选择一个树形数据对象"
		}else{
			data.each(function(p) {
				var row = p.row;
				var parentRelation = data.getValue("parentRelation",row);
				var treeNodeName = data.getValue("treeNodeName",row);
				if (treeNodeName === 'undefined') {
					msg += "显示列(*):不能为空，";
				}
				if (parentRelation === 'undefined') {
					msg += "parent-relation(*):不能为空，";
				}
			})
		}
		return msg;
	};

	Model.prototype.finish = function(wizard) {
		var treeData = this.getTreeData();
		var tree = [];
		treeData.each(function(param) {
			var row = param.row;
			var parentRelation = row.val("parentRelation");
			var rootNodeLable = row.val("rootNodeLable");
			var treeNodeName = row.val("treeNodeName");
			var treeNodeLabel = row.val("treeNodeLabel");
			var nodeKindRelation = row.val("nodeKindRelation");
			var nodeLevelRelation = row.val("nodeLevelRelation");
			var rootFilter = row.val("rootFilter");
			tree.push({
				"parent_relation" : parentRelation,
				"root_nodeLable" : rootNodeLable,
				"tree_nodeName" : treeNodeName,
				"tree_nodeLabel" : treeNodeLabel,
				"node_kindRelation" : nodeKindRelation,
				"node_levelRelation" : nodeLevelRelation,
				"root_filter" : rootFilter,
			})
		})
		this.templateEngine.addContext(this.templateFile, "tree", tree);
	};

	Model.prototype.selectRootLabel = function(event){
		var self = this;
		this.addField(function(result) {
			self.getTreeData().setValue("treeNodeName", result[0].name);
			self.getTreeData().setValue("treeNodeLabel", result[0].label);
		})
	};
	
	Model.prototype.selectParentRelation = function(event){
		var self = this;
		this.addField(function(result) {
			self.getTreeData().setValue("parentRelation", result[0].name);
		})
	};
	
	Model.prototype.selectNodeKind = function(event){
		var self = this;
		this.addField(function(result) {
			self.getTreeData().setValue("nodeKindRelation", result[0].name);
		})
	};
	
	return Model;
});