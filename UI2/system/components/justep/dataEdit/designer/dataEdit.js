/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTDataEdit = require("../dataEdit");

	var _DataEdit = RTDataEdit.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		}
	});
	var quickIdeEx = {
			"$UI/system/components/justep/dataEdit/dataEdit":{
				styleConfig:function(designer){
					return [
						  {
								text : '默认展现形式',
								noLabel : false,//不显示标签
								isGroup:true,
								//可选数据
								items : [ {
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : 
										[{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>无</button>"},
										 {propName : "class",value : "form-control",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>表单控件</button>"}
										],
										editor : "listEditor"
									} ]
						   },
					  	  designer.getCommonStyleItem('font'), 
					      designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),                                                     
					    ];
				}
			}
	}
	return {
		'$UI/system/components/justep/dataEdit/dataEdit' : _DataEdit,quickIdeEx:quickIdeEx
	};
});