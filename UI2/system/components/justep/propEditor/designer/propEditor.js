/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTOutput = require("../propEditor");

	var Output = RTOutput.extend({
		init : function(value, bindingContext) {
			this['bind-ref'] = null;
			this.callParent(value, bindingContext);
			this.set({
				'bind-ref' : this.$domNode.attr('bind-ref')
			});
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "bind-ref":
				//if (oldVal != value)
					//this.$domNode.text(value);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}

	});
	var webIdeEx = {};
	var quickIdeEx = {
			"$UI/system/components/justep/propEditor/propEditor":{
				properties:["targetData","bind-ref"],
				styleConfig:function(designer){ 
					return [
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border')];
				}
			}
	};
	return {
		'$UI/system/components/justep/propEditor/propEditor' : Output,webIdeEx:webIdeEx,quickIdeEx:quickIdeEx
	};
});