/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	
	var Media = ViewComponent.extend({
		init : function() {  
			this.$domNode = $(this.domNode);  
			$(">*", this.$domNode).attr("d_resizable", "false");
		},
		
		addMediaLeft : function(){
			var bodyDid = this.$domNode.children('.media-body').attr('d_id');
			xuiDoc.createComponent("$UI/system/components/bootstrap/media/media(bootstrap)#mediaLeft", this, {
				paintComponent : true,
				before:bodyDid
			});
		},
		addMediaRight : function(){
			xuiDoc.createComponent("$UI/system/components/bootstrap/media/media(bootstrap)#mediaRight", this, {
				paintComponent : true
			});
		},
		addMediaBody : function(){
			xuiDoc.createComponent("$UI/system/components/bootstrap/media/media(bootstrap)#mediaBody", this, {
				paintComponent : true
			});
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/media/media(bootstrap)":{
				properties:["xid"],
				toolbar:[{text:"添加media-left",method:"addMediaLeft"},{text:"添加media-right",method:"addMediaRight"},{text:"添加media-body",method:"addMediaBody"}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			},
			"$UI/system/components/bootstrap/media/media(bootstrap)#mediaLeft":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			},
			"$UI/system/components/bootstrap/media/media(bootstrap)#mediaRight":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			},
			"$UI/system/components/bootstrap/media/media(bootstrap)#mediaBody":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			}
	}
	return {
		'$UI/system/components/bootstrap/media/media(bootstrap)' : Media,quickIdeEx:quickIdeEx
	};
});