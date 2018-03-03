/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery"),
		AttachmentImageSimple = require("../attachmentImageSimple"),
		Component = require("$UI/system/lib/base/component"),
		justep = require('$UI/system/lib/justep'),
		bind = require("bind"),
		xuiService = require("$UI/system/components/designerCommon/js/xuiService"),
		xuiDoc = xuiService.getXuiDoc();
	
	var AttachmentImageSimpleDesign = AttachmentImageSimple.extend({
		init:function(value, bindingContext){
			this.$domNode.attr("d_canAddChild","false").attr("d_resizable","false");	
			this.$domNode.find('div').attr('d_selectable',"false").attr("d_canAddChild","false");
			this.$domNode.find('img').attr('d_selectable', false).hide();
		}
	});

	var quickIdeEx = {
			"$UI/system/components/justep/attachment/attachmentImageSimple":{
				text: '图片',
				properties:["xid","bind-ref","compress","imageCut","readonly"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				},
		        operations:function(){
		        	return [{groupName:"图片",
		        		items:[{name:'selectFile',label:"选择图片"}
		        		]}];
		        },
				templateContent :"<div component=\"$UI/system/components/justep/attachment/attachmentImageSimple\"  actionUrl=\"/storage\""+
			            " preSignMode=\"true\" style = 'height:120px;width:120px;' class = 'x-attachmentImageSimple img-thumbnail'>"+ 
			                 "<div class ='x-attachmentImageSimpleDiv'>"+
			                 "<div class ='x-attachmentImageSimpleForeachDiv' data-bind=\"foreach:$attachmentItems\">"+ 
			                       "<img class=\"x-autofill\" bind-attr-src=\"$model.previewPicture.bind($model,$object)()\" />"+ 
			                    "</div>"+ 
			                "</div>"+  
			          "</div>" 
			}
	};
	return {
		'$UI/system/components/justep/attachment/attachmentImageSimple':AttachmentImageSimpleDesign,quickIdeEx:quickIdeEx
	};
});