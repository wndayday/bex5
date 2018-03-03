define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};

    Model.prototype.modelActive = function(event){
		//this.comp("personData").refresh();
	};
		
	Model.prototype.setChartStatus = function(chartId) {
		var comp = this.comp(chartId);
		if (!comp.loaded) {
			setTimeout(function() {
				comp.refresh();
			}, 200);
			comp.loaded = true;
		}
	};
	
	Model.prototype.tabItem1Click = function(event){
		this.setChartStatus("chart1");
	};
	
	Model.prototype.tabItem2Click = function(event){
		this.setChartStatus("chart3");
	};
	
	Model.prototype.tabItem3Click = function(event){
		this.setChartStatus("report1");
	};
	
	Model.prototype.tabItem4Click = function(event){
		this.setChartStatus("personData");
	};
	
	Model.prototype.modelLoad = function() {
		
	};
	
	Model.prototype.psearchData = function(event){
		var startDate = this.comp('pstartDate').val();
		var endDate = this.comp('pendDate').val();
		var deptName = this.comp('pdeptName').val();
		var personName = this.comp('ppersonName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data1 = this.comp("pie1");
		data1.setStringVar("startDate", startDate);
		data1.setStringVar("endDate", endDate);
		data1.setStringVar("deptName", deptName);
		data1.setStringVar("personName", personName);
	
		this.comp("chart1").refresh();
	};
	
	Model.prototype.bsearchData = function(event){
		var startDate = this.comp('bstartDate').val();
		var endDate = this.comp('bendDate').val();
		var deptName = this.comp('bdeptName').val();
		var personName = this.comp('bpersonName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data2 = this.comp("bar2");
		data2.setStringVar("startDate", startDate);
		data2.setStringVar("endDate", endDate);
		data2.setStringVar("deptName", deptName);
		data2.setStringVar("personName", personName);
		
		this.comp("chart3").refresh();
	};

	Model.prototype.rsearchData = function(event){
	   var startDate = this.comp('rstartDate').val();
		var endDate = this.comp('rendDate').val();
		var deptName = this.comp('rdeptName').val();
		var personName = this.comp('rpersonName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data2 = this.comp("bar2");
		data2.setStringVar("startDate", startDate);
		data2.setStringVar("endDate", endDate);
		data2.setStringVar("deptName", deptName);
		data2.setStringVar("personName", personName);
		
		this.comp("report1").refresh();
	};
	
	return Model;
});
