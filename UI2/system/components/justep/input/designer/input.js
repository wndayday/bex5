/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTInput = require("../input");
	var RTPassword = require("../password");
	var RTRange = require("../range");
	var Util = require("$UI/system/components/justep/common/designer/common");

	function createInput(input) {
		input.$domNode = $(input.domNode);
		input.$domNode.on('keypress paste', function(evt) {
			return false;
		});
		var cfg = Util.attr2js(input.$domNode, [ 'placeHolder', 'disabled' ]);
		if (cfg)
			input.set(cfg);
	}

	var _Input = RTInput.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			createInput(this);
		}
	});

	var _Password = RTPassword.extend({
		init : function(value, bindingContext) {
			$(this.domNode).attr('type', 'password');
			this.callParent(value, bindingContext);
			createInput(this);
		}
	});

	var _Range = RTRange.extend({
		init : function(value, bindingContext) {
			$(this.domNode).attr('type', 'range');
			this.callParent(value, bindingContext);
			createInput(this);
		}
	});

	var webIdeEx = {
			"$UI/system/components/justep/input/input":{
				styleConfig:function(designer){ 
					return [
						    designer.getCommonStyleItem('input-size'),designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
			},

			"$UI/system/components/justep/input/password":{
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('input-size'),designer.getCommonStyleItem('font'), 
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
					    ];
				}
			},

			"$UI/system/components/justep/input/range":{
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
					        ];
				}
			}
	
	};
	
	var quickIdeEx = {
			"$UI/system/components/justep/input/input":{
				properties:["bind-ref","format",{name:"value",text:'值'},"placeHolder"],
				events:[{name:"onChange",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){ 
					return [designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border')];
				}
			},
			
			"$UI/system/components/justep/input/password":{
				properties:["bind-ref",{name:"value",text:'值'},"placeHolder"],
				events:[{name:"onChange",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){ 
					return [designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border')];
				}
			},
			"$UI/system/components/justep/input/range":{
				properties:["bind-ref","min","max",{name:"value",text:'值'}],
				events:[{name:"onChange",text:"值改变事件",editor:"eventEditor",noLabel:true}],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
					        ];
				}
			}
	};
	
	return {
		'$UI/system/components/justep/input/input' : _Input,
		"$UI/system/components/justep/input/password" : _Password,
		'$UI/system/components/justep/input/range' : _Range,
		webIdeEx:webIdeEx,
		quickIdeEx:quickIdeEx
	};
});