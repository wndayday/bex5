/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTNumberSelect = require("../numberSelect");
	var Util = require("$UI/system/components/justep/common/designer/common");

	function createInput(input) {
		input.$domNode = $(input.domNode);
		var cfg = Util.attr2js(input.$domNode, [ 'placeHolder', 'disabled' ]);
		if (cfg)
			input.set(cfg);
	}

	var _NumberSelect = RTNumberSelect.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			createInput(this);
		},
		_bindEvent:function(){
			//设计时去除相关逻辑
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/numberSelect/numberSelect":{
				properties:["bind-ref","min","max",{name:"showItemSize",text:"下拉显示数目"},{name:"showCharSize",text:"数字显示位数"},"placeHolder"],
				events:["onChange"],
				styleConfig:function(designer){
					return [
						  {
								text : '尺寸样式',
								noLabel : false,//不显示标签
								isGroup:true,
								//可选数据
								items : [ {
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : 
										[{propName : "class",value : "input-lg",text : "<button class='btn btn-success btn-lg' style='margin:6px;width:70px;'>大尺寸</button>"},
										 {propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px;width:70px;'>默认尺寸</button>"},
										 {propName : "class",value : "input-sm",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>小尺寸</button>"}
										],
										editor : "listEditor"
									} ]
						   },
					  	  designer.getCommonStyleItem('font'), 
					      designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),                                                     
					    ];
				}
			}
	};

	return {
		'$UI/system/components/justep/numberSelect/numberSelect' : _NumberSelect,quickIdeEx:quickIdeEx
	};
});