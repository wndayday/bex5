define(function(require){
	var $ = require("jquery");
	var dropListPropEditor = require("$UI/system/designer/webIde/base/propEditor/dropListPropEditor");
	var IDEService = require("$UI/system/designer/webIde/common/IDEService");
	var xmlUtil = require('$UI/system/lib/base/xml');
	var cacheMap = {};
	
	function getRelationList(target,modelNode){
		var key = target+"_"+modelNode.getAttribute("concept");
		var list = cacheMap[key]||[];
    	if(list.length != 0){
    		return list;
    	}
 
		var concept = modelNode.getAttribute("concept");
		if(concept){
	    	var params = {concept:modelNode.getAttribute("concept"),nodeXml:xmlUtil.toString(modelNode)};
	    	var data = IDEService.callService({name:"com.justep.studio.servicehanler.RelationDatasource.getDatasource",params:params});
	    	
	    	for(var i=0;i<data.length;i+=1){
	    		var item = data[i];
	    		list.push([item.alias||item.name,item.label||item.alias]);
	    	}
	    	cacheMap[key] = list;
		}
		return list;
	}
	
	/**
	 * 数据列编辑器
	 */
	var ColumnEditor = dropListPropEditor.extend({
		init:function(){ 
			this.callParent();
		    var context = this.context; 
		    var mainModel = context.mainModel; 
		    var target = this.propConfig.target||"bizData1";;
		    var modelNode = mainModel.callDesignerMethod("getModelNodeByXid",target);
		    
		    if(modelNode){		    	 
		    	//构建选项数据
		    	var options = [];
		    	if(modelNode.getAttribute("concept")){
		    		options = getRelationList(target,modelNode);
		    	}else{
			    	$(modelNode).find("column").each(function(){
			    		var $this = $(this);
			    		var name = $this.attr("name");
			    		var label = $this.attr("label")||name;
			    		options.push([name,label]);
			    	});
		    	}
		    	this.setData(options);
		    } 
		}
	});
	
	
	var relation = dropListPropEditor.extend({
		init:function(){
			this.callParent();debugger;
		    var context = this.context; 
		    var mainModel = context.mainModel; 
		    var target = this.propConfig.target||"bizData1";
		    var modelNode = mainModel.callDesignerMethod("getModelNodeByXid",target);
		    if(modelNode){ 
		    	var key = target+"_"+modelNode.getAttribute("concept");
		    	var list = getRelationList(target,modelNode);
		    	this.setData(list);
		    } 
		}
	});
 
	return {columnEditor:ColumnEditor,column:ColumnEditor,col:ColumnEditor,relation:relation};
});
