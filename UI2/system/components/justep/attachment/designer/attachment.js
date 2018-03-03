/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery"),
		Attachment = require("../attachment"),
		Component = require("$UI/system/lib/base/component"),
		justep = require('$UI/system/lib/justep'),
		bind = require("bind"),
		xuiService = require("$UI/system/components/designerCommon/js/xuiService"),
		xuiDoc = xuiService.getXuiDoc();
	
	var AttachmentDesign = Attachment.extend({
		init:function(value, bindingContext){
			this.$domNode.find('div').attr('d_selectable',"false");
		}
	});
	
	var AttachmentPCDesign = Attachment.extend({
		init:function(value, bindingContext){
			this.$domNode.find('div').attr('d_selectable',"false");
		}
	});
	
	var AttachmentImageDesign = Attachment.extend({
		init:function(value, bindingContext){
			this.$domNode.find('div').attr('d_selectable',"false");
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/attachment/attachment":{
				properties:["xid","bind-ref","keyID","limit","subPath","access"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
			},
			"$UI/system/components/justep/attachment/attachmentPC":{
				properties:["xid","bind-ref","keyID","limit","subPath","access"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
			},
			"$UI/system/components/justep/attachment/attachmentImage":{
				properties:["xid","bind-ref","keyID","subPath","access"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
			}
			
	};
	
	return {
		'$UI/system/components/justep/attachment/attachment':AttachmentDesign,
		'$UI/system/components/justep/attachment/attachmentPC':AttachmentPCDesign,
		'$UI/system/components/justep/attachment/attachmentImage':AttachmentImageDesign,
		quickIdeEx:quickIdeEx
	};
});