/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/  
define(function(require) {
	//var $ = require("jquery");
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var ReportRT = require("../report");

	var Report = ReportRT.extend({
		
	});
	var quickIdeEx = {
			"$UI/system/components/justep/report/report":{
				properties:["selecth","colspan","rowspan","is-master-dataset","master-dataset","record-per-page","auto-fill-row","colcount"],
			}
	};
	
	return {
		'$UI/system/components/justep/report/report' : Report,
		quickIdeEx:quickIdeEx
	};
});

