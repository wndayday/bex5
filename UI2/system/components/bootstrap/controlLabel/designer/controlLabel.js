/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	var $ = require("jquery"),
	ViewComponent = require("$UI/system/lib/base/viewComponent");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var ControlLabel = ViewComponent.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			if(xuiDoc.getLabel){
				this.$domNode.text(xuiDoc.getLabel(this.$domNode.attr("d_id"),this.$domNode.attr('bind-text')));
			}else{
				this.$domNode.text(this.$domNode.attr('bind-text'));				
			}
		},
        set: function(values){
        	if('bind-text' in values){
        		
        		var text = xuiDoc.get(this,'text');
        		bindText = values['bind-text'];
        		if(bindText && xuiDoc.getLabel){
        			bindText = xuiDoc.getLabel(this.$domNode.attr("d_id"),bindText);
    			}
        		this.$domNode.text(bindText?bindText:text);
        		
        	}else if('text' in values){
        		this.$domNode.text(values['text']);
        	}
        }
		
	});
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/controlLabel/controlLabel(bootstrap)":{
				properties:["xid","text"]
			}
	};
	
	return {'$UI/system/components/bootstrap/controlLabel/controlLabel(bootstrap)':ControlLabel,quickIdeEx:quickIdeEx};
});