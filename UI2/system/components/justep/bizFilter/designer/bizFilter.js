/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var BizFilter = require("../bizFilter");
	var imgURL = require.toUrl("./img/bizFilter-show.gif");
	
	var DBizFilter = BizFilter.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);   
			this.$domNode.append("<img src='" + imgURL + "'/>");
			this.domNode.style.position = "absolute";
			this.domNode.style["z-index"] = "1000";
			
			if(!this.domNode.style.top){
				this.domNode.style.top = "100px";
				this.domNode.style.left = "100px";
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/bizFilter/bizFilter":{
				properties:["xid","filterData","filterCols","autoRefresh","process","activity"],
				events:["onFilter"],
				operations:function(){
					return [{groupName:"数据过滤",
						items:[
							   {name:'menu',label:'显示查询菜单'},
							   {name:'show',label:'编辑查询条件'},
							   {name:'loadPattern',label:'编辑查询模板'},
						   ]}];
				}
			}
			
	};
	
	return {'$UI/system/components/justep/bizFilter/bizFilter': DBizFilter,quickIdeEx:quickIdeEx};
});