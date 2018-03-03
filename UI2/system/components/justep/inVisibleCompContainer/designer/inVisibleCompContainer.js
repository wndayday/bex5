/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var Model = require("$UI/system/lib/base/viewComponent");
	require('css!./css/inVisibleCompContainer').load();
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var ModelDesigner = Model.extend({
		init: function(value, bindingContext){
			this.$domNode = $(this.domNode);
			var xid = this.$domNode.attr("xid");
			this.$domNode.attr("d_showcomptip","false")
			.attr("d_resizable","false")
			.attr("d_canremove","false");
			var imgUrl = require.toUrl("$UI/system/components/justep/model/designer/img/minimize.gif");
			this.$domNode.addClass('xui-comp-container').prepend("<div class='xui-comp-container-title'><span>功能组件</span><a  title='收缩' style='float:right;margin-top:-2px;'><img src='"+imgUrl+"'/></a></div>"); 
			this.domNode.style.position = "absolute";
			if(!this.domNode.style.top){
				this.domNode.style.top = "10px";
				this.domNode.style.left = "10px";
			}
			this.domNode.style.height = "100px";
			this.domNode.style.width = "120px";
			$(this.domNode).addClass("expanded");
			this.callParent(value, bindingContext);
			var self = this;
			this.$domNode.find(">.title").attr("d_selectable","false").attr("d_canAddChild","false");
			this.$domNode.attr("d_canAddChild","false");
	 
			self.$domNode.find(">*[d_id]").each(function(){  
				$(this).attr("d_resizable","false").attr("d_canMove","false");
			});
			var $title = this.$domNode.find(">.xui-comp-container-title:first").attr("title","功能组件容器");
			$title.on("click","a",function(){
				self.setExpand(!self.$domNode.hasClass("expanded"));
				self.ownerDesigner.reSelectAll();
			});
			self.setExpand(false);
			
			this.$domNode.on("childChanged",function(event,data){  
				if(data && data.type == 'add'){
					self.setExpand(true);					
				}
			});
		},
		
		/**
		 * 设置展开或者搜索，true为展开
		 */
		setExpand:function(flag){  
			if(!flag){
				this.$domNode.css({width:"38px",height:"32px"}).removeClass("expanded");
				this.$domNode.find(">*[d_id]").hide();
				this.$domNode.find("span").hide();
				this.$domNode.find("a").attr("title","展开");
			}else{
				this.$domNode.css({width:"120px",height:"100px"}).addClass("expanded");
				this.$domNode.find(">*[d_id]").show();
				this.$domNode.find("span").show();
				this.$domNode.find("a").attr("title","收缩");
			}
		},
		
		set: function(v){
			this.domNode.style.position = "absolute";
		},
		
		hide : function(){
			this.ownerDesigner.unSelection(this.$domNode[0]);
			this.$domNode.hide();
		},
		
		show : function(){
			this.$domNode.show();
			this.ownerDesigner.setSelection(this.$domNode[0]);
		}
	});
	
	
	var quickIdeEx = {
		"$UI/system/components/justep/inVisibleCompContainer/inVisibleCompContainer":{
	 
			properties:[]
		}
	};
	return {'$UI/system/components/justep/inVisibleCompContainer/inVisibleCompContainer':ModelDesigner,quickIdeEx:quickIdeEx};
});

