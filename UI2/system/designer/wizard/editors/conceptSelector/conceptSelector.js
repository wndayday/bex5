define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var treeSelector = require("$UI/system/designer/webIde/common/treeSelector");
	var bizModel = require("$UI/system/designer/webIde/bizDesigner/common/bizModel");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
		
	var Model = function(){
		this.callParent();
		this.concept = justep.Bind.observable();
		this.conceptName = justep.Bind.observable();
		this.reader = justep.Bind.observable();
		this.writer = justep.Bind.observable();
		this.creator = justep.Bind.observable();
	};

	//初始化树
	Model.prototype.initTree = function(){
		var self = this;
 
		this.funTree = new treeSelector({data:this.getConceptData(),parent:this.getElementByXid('content1'),
		clickHandler:function(path,node){ 
			if(node && node.key!='root'){ 
				self.selectConcept(node.key, node.title);
			}
		},
		dblClickHandler:function(event){
			
		}});
	};
	
	/**获取概念数据**/
	Model.prototype.getConceptData = function(){
		var conceptData = IDEService.callService({name:"com.justep.studio.servicehanler.ConceptDatasource.getConceptDataSetAsStr",params:{modelName:this.modelName}});
		this.actionMap = conceptData.actionMap;
		conceptData = eval("("+conceptData.conceptList+")");
		var appConceptList = [];
		var sysConceptList = [];
		if(conceptData){ 
			for(var i = 0; i < conceptData.length; i += 1){
				conceptData[i].key = conceptData[i].label;
				var label = conceptData[i].name;
				//conceptData[i].title = conceptData[i].label + (label?"("+label+")":"");
				conceptData[i].title = label ? label : conceptData[i].label;
				
				if(conceptData[i].key.indexOf("SA_") == 0)
					sysConceptList.push(conceptData[i]);
				else
					appConceptList.push(conceptData[i]);
			}
		}
		 
		//var root = [{key:'root',expanded:true,title:"应用数据对象",children:appConceptList},{key:'root2',expanded:true,title:"系统数据对象",children:sysConceptList}];
		var root = [{key:'root',expanded:true,title:"应用数据对象",children:appConceptList}];
		return root;
	}

	/**选中一个概念的时候**/
	Model.prototype.selectConcept = function(concept, conceptName){
		var currentModel = bizModel.get(this.modelName);  
		var self = this;
		self.concept.set(concept); 
		self.conceptName.set(conceptName); 
		
		self.reader.set(this.actionMap["q-"+concept]||"");	
		self.writer.set(this.actionMap["s-"+concept]||"");	
		self.creator.set(this.actionMap["c-"+concept]||"");
	}
	
	Model.prototype.modelParamsReceive = function(event){ 
		var params = event.params;
		if(params){
			this.modelName = params.modelName;		
		}
		if(!this.modelName){
			alert("模块不能为空！");
		  return;
		}
		this.initTree();
	};
	
	Model.prototype.modelUnLoad = function(event){
		if(!this.funTree){
			this.funTree.dispose();
		}
	};
	
	Model.prototype.getReturnValue = function(){
		//这里实现返回的逻辑
		return {concept:this.concept.get(),conceptName:this.conceptName.get(),reader:this.reader.get(),writer:this.writer.get(),creator:this.creator.get()};
	};
	
	Model.prototype.modelLoad = function(event){
		this.comp("panel1").hideBottom();
	};
	
	return Model;
});