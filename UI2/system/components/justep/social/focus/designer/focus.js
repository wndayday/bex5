/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var RTFocus = require("../focus");
	
	var Focus = RTFocus.extend({
		init: function(value, bindingContext){
			this.$domNode = $(this.domNode);
			this.$domNode.addClass("x-focus-star");
		}
		
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/social/focus/focus":{
				properties:["xid","data","bind-ref","bind-nameRef","process","activity","url"],
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
			}
			
	};
	
	return {'$UI/system/components/justep/social/focus/focus':Focus,quickIdeEx:quickIdeEx};
});

