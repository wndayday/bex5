/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTRichTextarea = require("../richTextarea");

	var RichTextarea = RTRichTextarea.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.on('onInited',function(evt){
				var editor = evt.source;
				editor.disabledRender();
				//延迟计算宽度
				window.setTimeout(function(){
					editor._resize();
				},100);
			});
		},
		isDisabled: function(){
			return true;
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/richTextarea/richTextarea":{
				properties:["xid",{name:"bind-ref",text:"引用"},"fileActionUrl",
				            {name:"onInit",text:"初始化事件",editor:"eventEditor",noLabel:true},
				            {name:"onInited",text:"初始完成事件",editor:"eventEditor",noLabel:true},
				            {name:"onChange",text:"值改变事件",editor:"eventEditor",noLabel:true},
				            {name:"onFocus",text:"焦点进入事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('pull'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
			}
	
	};

	return {
		'$UI/system/components/justep/richTextarea/richTextarea' : RichTextarea,
		quickIdeEx:quickIdeEx
	};
});