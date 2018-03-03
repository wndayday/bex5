define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};

    Model.prototype.psearchData = function(event){
		var startDate = this.comp('pstartDate').val();
		var endDate = this.comp('pendDate').val();
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data1 = this.comp("s1");
		data1.setStringVar("startDate", startDate);
		data1.setStringVar("endDate", endDate);
	
		this.comp("chart1").refresh();
	};
	
	 Model.prototype.bsearchData = function(event){
			var startDate = this.comp('bstartDate').val();
			var endDate = this.comp('bendDate').val();
			if(typeof(startDate)=='undefined') startDate = '';
			if(typeof(endDate)=='undefined') endDate = '';
			
			var data2 = this.comp("s2");
			data2.setStringVar("startDate", startDate);
			data2.setStringVar("endDate", endDate);
		
			this.comp("chart3").refresh();
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
	return Model;
});
