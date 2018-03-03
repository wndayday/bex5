define(function(require){
	var $ = require("jquery");
	var dropListPropEditor = require("$UI/system/designer/webIde/base/propEditor/dropListPropEditor");
	
	/**
	 * 获取content
	 */
	var ContentXidEditor = dropListPropEditor.extend({
		init:function(){
			//this.callParent();
			debugger;
		    var context = this.context; 
		    var mainModel = context.mainModel; 
		    var target = this.propConfig.target;
		    var modelNode = mainModel.callDesignerMethod("getElementByXid",target);
		    if(modelNode){		    	
		    	//构建选项数据
		    	var options = [];
		    	$(modelNode).find(">*").each(function(){
		    		var $this = $(this); 
		    		var xid = $this.attr("xid");
		    		var label = $this.attr("label")||xid;
		    		options.push([xid,label]);
		    	});
 
		    	this.setData(options);
		    }
		}
	});
	
	return {"contentXidEditor":ContentXidEditor};
});
