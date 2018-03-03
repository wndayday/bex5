/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
 
	var CellLayout = function(config) {
		this.domNode = config.templateNode;
	};
	
	CellLayout.prototype = {
		init : function(){ 
			$(this.domNode).attr("d_canAddChild","false");
			$(">table>tbody>tr",this.domNode).each(function(){
				var cells = this.cells;
				for(var i = 0;i<cells.length;i+=1){
					$(">*",cells[i]).attr("d_resizable","false").attr("d_canMove","false");//.attr("d_canRemove","false");
				}
			});
		}
	};
	
	var quickIdeEx = {
			"$UI/system/components/justep/excelLayout/excelLayout":{
				properties:["title"],
				//canAddChild:false,//不能直接添加子组件
				styleConfig:function(designer){
					return [
							{
								text : '基础布局',
								noLabel : false,//不显示标签
								isGroup:true,
								//可选数据
								items : [ {
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : 
										[{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>无</button>"},
										 {propName : "class",value : "x-excel-layout",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>excel布局</button>"}
										],
										editor : "listEditor"
									} ]
							},
					  	    designer.getCommonStyleItem('font'),
					  	    designer.getCommonStyleItem('baseStyle'),
					  	    designer.getCommonStyleItem('border'),
					  	    designer.getCommonStyleItem('position'),
					   	];
				}
		}
	};
 
	return {
		'$UI/system/components/justep/excelLayout/excelLayout' : CellLayout,quickIdeEx:quickIdeEx
	};
});