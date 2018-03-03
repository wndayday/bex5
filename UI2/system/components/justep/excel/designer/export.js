/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/  
define(function(require) {
	require('css!./css/excel').load();
	var $ = require("jquery");
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var ExportExcelRT = require("../exportExcel");

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	}

	var ExportExcel = ExportExcelRT.extend({
		init : function(value, bindingContext) {
			create(this, 'x-export-excel-designer');
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/excel/exportExcel":{
				properties:["xid",{name:"data",text:"导出数据",editor:"contextComponent","editor-parameter":"data"},
				            {name:"from",text:"数据来源"},"downloadFilename",{name:"exportKey",text:"导出主键列"},
				            {name:"exportCalculate",text:"导出计算咧"},{name:"useConfigDlg",text:"显示配置页面"}],
				events:["onExportCreateParam","onBeforeExport","onSuccess","onError"],
				operations:function(){
					return [{groupName:"Excel",
						items:[
							   {id:"exportExcel",name:'exportExcel',label:'导出'},
						   ]}];
				}
			}
			
	};
	
	
	return {
		'$UI/system/components/justep/excel/exportExcel' : ExportExcel,quickIdeEx:quickIdeEx 
	};
});
