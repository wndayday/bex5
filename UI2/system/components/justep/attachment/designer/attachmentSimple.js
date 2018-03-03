/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery"),
		AttachmentSimple = require("../attachmentSimple"),
		Component = require("$UI/system/lib/base/component"),
		justep = require('$UI/system/lib/justep'),
		bind = require("bind"),
		xuiService = require("$UI/system/components/designerCommon/js/xuiService"),
		xuiDoc = xuiService.getXuiDoc();
	
	var AttachmentSimpleDesign = AttachmentSimple.extend({
		init:function(value, bindingContext){
			this.$domNode.attr("d_canAddChild","false").attr("d_resizable","false");	
			this.$domNode.find('div').attr('d_selectable',"false").attr("d_canAddChild","false");
		}
	});

	var quickIdeEx = {
			"$UI/system/components/justep/attachment/attachmentSimple":{
				properties:["xid","bind-ref","actionUrl","accept","compress","preSignMode"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				},
				//创建时的模板内容
				templateContent:"<div component=\"$UI/system/components/justep/attachment/attachmentSimple\" actionUrl=\"/storage\" preSignMode='true'>"
					+"<div class=\"x-attachment\">"
				        +"<div class=\"x-attachment-content x-card-border\" style=\"border: none;\">"
				            +"<div class=\"x-doc-process\">"
							   +"<div class=\"progress-bar x-doc-process-bar\" role=\"progressbar\" style=\"width:0%;\"></div>"
						    +"</div>"
				        	+"<div data-bind=\"foreach:$attachmentItems\">"
				            	+"<div class=\"x-attachment-cell\">"
				                    +"<div class=\"x-attachment-item x-item-other\" data-bind=\"click:$model.previewOrRemoveItem.bind($model),style:{backgroundImage:($model.previewPicture.bind($model,$object))()}\">"
				                         +"<a data-bind=\"visible:$model.$state.get() == 'remove'\" class=\"x-remove-barget\"></a>"
				                    +"</div>"
				                +"</div>"
				            +"</div>"
				            +"<div class=\"x-attachment-cell\" data-bind=\"visible:$state.get() == 'upload'\">"
				                +"<div class=\"x-attachment-item x-item-upload\" data-bind=\"visible:$state.get() == 'upload'\">"
				                +"</div>"
				            +"</div>"
				            +"<div class=\"x-attachment-cell\" data-bind=\"visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length > 0\">"
				            	+"<div class=\"x-attachment-item x-item-remove\" data-bind=\"click:changeState.bind($object,'remove')\">"
				                +"</div>"
				            +"</div>"
				     +"<div style=\"clear:both;\"></div>"
				   +"</div>"
				 +"</div>"
				+"</div>"
			}
	};
	return {
		'$UI/system/components/justep/attachment/attachmentSimple':AttachmentSimpleDesign,quickIdeEx:quickIdeEx
	};
});