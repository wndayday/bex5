/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTTextarea = require("../textarea");
	var Util = require("$UI/system/components/justep/common/designer/common");

	var _Textarea = RTTextarea.extend({
		init : function(value, bindingContext) {
			this.$domNode = $(this.domNode);
			var cfg = Util.attr2js(this.$domNode, [ 'placeHolder', 'disabled' ]);
			this.callParent(value, bindingContext);
			if (cfg)
				this.set(cfg);
			
			this.$domNode.on('keypress paste', function(evt) {
				return false;
			});
		}
	});
	var webIdeEx = {
			"$UI/system/components/justep/textarea/textarea":{
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
					    ];
				}
			} 
	
	};
	
	var quickIdeEx = {
			  "$UI/system/components/justep/textarea/textarea":{
				  properties:["bind-ref"],
				  events:[{name:"onChange",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				  styleConfig:function(designer){
						return [
						        designer.getCommonStyleItem('font'), 
						        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border')
						    ];
					}
			  }
	};
	return {
		'$UI/system/components/justep/textarea/textarea' : _Textarea,webIdeEx:webIdeEx,quickIdeEx:quickIdeEx
	};
});