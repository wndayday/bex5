/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var Pagination = require("../pagination");
	
	var cls = Pagination.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/bootstrap/pagination/pagination(bootstrap)":{
				properties:["xid","length"],
				styleConfig:function(designer){
					return [
						     designer.getCommonStyleItem('pull'),
						     {
								text : '尺寸样式',
					   			noLabel : false,//显示标签
					   			isGroup:true,
					   			
					   			//可选数据
					   			items : [{
					   				name : '尺寸样式',
					   				noLabel : true,//不显示标签
					   				selectMode:"1", //选中无状态变化
					   				//可选数据
					   				optionData : [{propName : "class",value : "pagination-sm",text : "<button class='btn btn-success btn-sm' style='margin:6px'>小尺寸</button>"
					   				},{propName : "class",value : "pagination-lg",text : "<button class='btn btn-success btn-sm' style='margin:6px'>大尺寸</button>"
					   				}],
					   				editor : "listEditor"
					   			} ]
					   		},
						     designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('position')
						                                                                            ];
				}
			}
	}
	return {'$UI/system/components/bootstrap/pagination/pagination(bootstrap)': cls,quickIdeEx:quickIdeEx};
});