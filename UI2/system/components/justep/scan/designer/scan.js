/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var RTScan = require("../scan");
 
	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "30px";
		}
		comp.domNode.style.width = "40px";
		comp.domNode.style.width = "40px";
		comp.domNode.style.border = "1px solid #aaa"
//		$domNode.addClass(clz);
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
			"$UI/system/components/justep/scan/scan":{
				properties:["xid",{name:"onScanQRCodeFail",text:"扫描失败",editor:"eventEditor",noLabel:true},{name:"onScanQRCodeSuccess",text:"扫描成功",editor:"eventEditor",noLabel:true}],
				//操作配置
				operations:function(){
					return [{groupName:"手机功能",
						items:[{name:'openScanResultAsFile',label:"作为文件打开扫一扫的结果"},
						       {name:'openScanResultAsUrl',label:"在浏览器中打开扫一扫的结果"},
						       {name:'scanQRCode',label:"扫一扫"}
							   ]
					}];
				}
			}
	};
	
	return {
		"$UI/system/components/justep/scan/scan":Scan,quickIdeEx:quickIdeEx
	};
});

