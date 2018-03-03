/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/  
define(function(require) {
	require('css!./css/excel').load();
	var $ = require("jquery");
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var ImportExcelRT = require("../importExcel");

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	}

	var ImportExcel = ImportExcelRT.extend({
		init : function(value, bindingContext) {
			create(this, 'x-import-excel-designer');
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/excel/importExcel":{
				properties:["xid",{name:"data",text:"导入数据",editor:"contextComponent","editor-parameter":"data"},
				            {name:"to",text:"导入到..."},{name:"mappings",editor:"editMapping"},{name:"useDefault",text:"使用参数设置"}],
				operations:function(){
					return [{groupName:"Excel",
						items:[
							   {id:"importExcel",name:'importExcel',label:'导入'},
						   ]}];
				}
			}
			
	};
	return {
		'$UI/system/components/justep/excel/importExcel' : ImportExcel,quickIdeEx:quickIdeEx 
	};
});
