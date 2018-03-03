/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./alert').load();
	var Alert = require("../alert");
	
	var cls = Alert.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/bootstrap/alert/alert(bootstrap)":{
				properties:["xid","title","autoHide","visible"],
				//操作配置
				styleConfig:function(designer){
					return [
				{
					text : '类型',
					noLabel : false,//显示标签
					isGroup:true,
					items :[{
						name : 'class',
						noLabel : true,//不显示标签
						//可选数据
						optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>默认</button>"},
						              {propName : "class",value : "alert-success",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>成功</button>"},
						              {propName : "class",value : "alert-info",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>信息</button>"},
						              {propName : "class",value : "alert-warning",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>警告</button>"},
						              {propName : "class",value : "alert-danger",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>错误</button>"}],
						              
						editor : "listEditor"
					}]
				},
				];
				},
				
				operations:function(){
					return [{groupName:"Alert(bootstrap)",
						items:[{name:'alertShow',label:"显示"},
						       {name:'alertHide',label:"隐藏"}
							   ]}];
				}
			}
	};
	return {'$UI/system/components/bootstrap/alert/alert(bootstrap)':cls,quickIdeEx:quickIdeEx};
});