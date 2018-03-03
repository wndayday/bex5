define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};

    Model.prototype.psearchData = function(event){
		var startDate = this.comp('pstartDate').val();
		var endDate = this.comp('pendDate').val();
		var processName = this.comp('pprocessName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data1 = this.comp("s1");
		data1.setStringVar("startDate", startDate);
		data1.setStringVar("endDate", endDate);
		data1.setStringVar("processName", processName);
	
		this.comp("chart1").refresh();
	};
	
    Model.prototype.bsearchData = function(event){
		var startDate = this.comp('bstartDate').val();
		var endDate = this.comp('bendDate').val();
		var processName = this.comp('bprocessName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data2 = this.comp("s2");
		data2.setStringVar("startDate", startDate);
		data2.setStringVar("endDate", endDate);
		data2.setStringVar("processName", processName);
	
		this.comp("chart3").refresh();
	};
	
    Model.prototype.rsearchData = function(event){
		var startDate = this.comp('rstartDate').val();
		var endDate = this.comp('rendDate').val();
		var processName = this.comp('rprocessName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data2 = this.comp("s2");
		data2.setStringVar("startDate", startDate);
		data2.setStringVar("endDate", endDate);
		data2.setStringVar("processName", processName);
	
		this.comp("report1").refresh();
	};
	
	Model.prototype.setChartStatus = function(chartId) {
		var comp = this.comp(chartId);
		if (!comp.loaded) {
			setTimeout(function() {
				comp.refresh();
			}, 200);
			comp.loaded = true;
		}
	}
	
	Model.prototype.tabItem2Click = function(event){
		this.setChartStatus("chart3");
	};
	
	Model.prototype.tabItem3Click = function(event){
		this.setChartStatus("report1");
	};
	return Model;
});
