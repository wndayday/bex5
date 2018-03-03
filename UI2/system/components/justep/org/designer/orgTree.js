/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var TreeDesigner = require("$UI/system/components/justep/tree/designer/tree")['$UI/system/components/justep/tree/tree'];

	var OrgTreeDesigner = TreeDesigner.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode.css({
				position : 'relative'
			});
			this.$domNode.find("div[component='$UI/system/components/justep/data/bizData']").css({
				position : 'absolute',
				left : 80
			});
			this.$domNode.find('.x-tree-template').children('li').attr("d_canAddChild", "true").attr("d_canRemove", false)
					.attr('d_selectable', false);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/org/orgTree":{
				properties:["xid","rootLabel",{name:"limit",text:"一页显示条数"},"filter","multiSelection","autoLoad"],
				//events:["onBeforeLoadChildren","onCustomLoadChildren"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
			},
			"$UI/system/components/justep/org/orgTreePC":{
				properties:["xid","manageCodes",
				            {name:"includeOrgKind",editor:"orgKindSelector"},
				            "includeDisabled"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
			}
	};

	return {
		'$UI/system/components/justep/org/orgTree' : OrgTreeDesigner,
		quickIdeEx:quickIdeEx
	};
});