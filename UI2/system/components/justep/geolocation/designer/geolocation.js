/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var Rgeolocation = require("../geolocation");

	function create(comp, clz) {
		//var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "30px";
		}
		comp.domNode.style.width = "40px";
		comp.domNode.style.width = "40px";
		comp.domNode.style.border = "1px solid #aaa";
//		$domNode.addClass(clz);
	}

	var geolocation = Rgeolocation.extend({
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
			"$UI/system/components/justep/geolocation/geolocation":{
				properties:["xid",{name:"onGetLocationSuccess",text:"获取地理位置成功",editor:"eventEditor",noLabel:true},{name:"onGetLocationFail",text:"获取地理位置失败",editor:"eventEditor",noLabel:true}],
				//操作配置
				operations:function(){
					return [{groupName:"手机功能",
						items:[{name:'openLocationInBaiduMap',label:"在百度地图中显示当前位置"},
						       {name:'getLocation',label:"获取地理位置"}
							   ]
					}];
				}
			}
	};
	
	return {
		"$UI/system/components/justep/geolocation/geolocation":geolocation,quickIdeEx:quickIdeEx
	};
});

