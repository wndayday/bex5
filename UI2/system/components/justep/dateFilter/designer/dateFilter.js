/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var DateFilter = require("../dateFilter");
	
	var DDateFilter = DateFilter.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode.find("*").attr("d_canRemove",false).attr('d_selectable',false).attr("d_canAddChild", false);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/dateFilter/dateFilter":{
				properties:["xid","filterData","filterMode","dateCol","beginDateCol","endDateCol","defaultValue",
				            {name:"options",text:"过滤可选项",editor:"setOptions"},"autoRefresh"],
				events:["onFilter"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
			}
			
	};
	
	return {'$UI/system/components/justep/dateFilter/dateFilter': DDateFilter,quickIdeEx:quickIdeEx};
});