/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
//	var $ = require("jquery");
	var SmartFilter = require("../smartFilter");
	
	var DSmartFilter = SmartFilter.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode.find("*").attr('d_selectable',false).attr("d_canAddChild", false);
			this.$domNode.find("input").attr("d_canRemove",false);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/smartFilter/smartFilter":{
				properties:["xid","filterData","filterCols","caseSensitive","autoRefresh","autoRefreshMode"],
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
	
	return {'$UI/system/components/justep/smartFilter/smartFilter': DSmartFilter,quickIdeEx:quickIdeEx};
});