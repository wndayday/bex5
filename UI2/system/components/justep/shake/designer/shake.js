/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var RTScan = require("../shake");

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "30px";

		}
		comp.domNode.style.width = "40px";
		comp.domNode.style.width = "40px";
		comp.domNode.style.border = "1px solid #aaa";
		$domNode.addClass(clz);
	}

	var Scan = RTScan.extend({
		init : function(value, bindingContext) {  
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.$domNode.attr("d_resizable","false");
			var config = this.compConfig; 
			var imgUrl = require.toUrl(this.$domNode.attr("component")+"/../designer/img/"+config.icon);
			if(this.ownerDesigner.isQuickIde){	
				this.$domNode.attr("d_showcomptip","false");
				this.$domNode.attr("d_canmove","false");
				
				this.$domNode.html("<img src='"+imgUrl+"' />");
				if(config.text){
					this.$domNode.attr("title",config.text);
				}
			}else{
				create(this, 'x-scan');	
				this.$domNode.html("<img src='"+imgUrl+"'  style='width:100%;height:100%;'/>");
			}

		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/shake/shake":{
				properties:[{name:"onShakeSuccess",text:"摇一摇成功",editor:"eventEditor",noLabel:true},{name:"onShakeFail",text:"不支持摇一摇",editor:"eventEditor",noLabel:true}],
				//操作配置
				operations:function(){
					return [{groupName:"手机功能",
						items:[{name:'startShake',label:"开始监听摇一摇"},
						       {name:'stopShake',label:"停止监听摇一摇"},
						       {name:'openShakePage',label:"打开摇一摇功能"}
							   ]}];
				}
			}
	};
	
	return {
		"$UI/system/components/justep/shake/shake":Scan,quickIdeEx:quickIdeEx
	};
});

