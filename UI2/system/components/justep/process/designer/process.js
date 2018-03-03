/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var RTProcess = require("../process");
	var url = require.toUrl("./img/process.jpg");
	var Process = RTProcess.extend({
		init: function(value, bindingContext){
			this.$domNode = $(this.domNode);   
			this.$domNode.append("<img src='" + url + "'/>");
			this.domNode.style.position = "absolute";
			if(!this.domNode.style.top){
				this.domNode.style.top = "200px";
				this.domNode.style.left = "0px";
			}
			this.domNode.style.height = "24px";
			this.domNode.style.width = "24px";
			this.domNode.style["z-index"] = "1000";

		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/process/process":{
				//properties:["xid","data","autoClose","autoStart","autoSave","autoFilter","dialog","dialogWidth","dialogHeight"]
				properties:["xid","data","autoClose","autoStart","autoSave"],
				operations:function(){
					return [{groupName:"流程处理",
						items:[
							   {id:"advance",name:'advance',label:'流转'},
							   {id:"transfer",name:'transfer',label:'转发'},
							   {id:"back",name:'back',label:'回退'},
							   {id:"suspend",name:'suspend',label:'暂停'},
							   {id:"abort",name:'abort',label:'终止'},
							   {id:"showChart",name:'showChart',label:'显示流程图'},
							   {id:"processRecord",name:'processRecord',label:'显示流程记录'},
					   ]}];
				}
			}
			
	};
	
	return {'$UI/system/components/justep/process/process':Process,quickIdeEx:quickIdeEx};
});

