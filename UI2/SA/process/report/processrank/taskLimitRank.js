define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};

    Model.prototype.searchData = function(event){
        var seleValue= this.getElementByXid("selectValue").value;
		var startDate = this.comp('startDate').val();
		var endDate = this.comp('endDate').val();
		var processName = this.comp('processName').val();
		
		if(typeof(startDate)=='undefined') startDate = '';
		if(typeof(endDate)=='undefined') endDate = '';
		
		var data1 = this.comp("s1");
		data1.setStringVar("startDate", startDate);
		data1.setStringVar("endDate", endDate);
		data1.setStringVar("processName", processName);
		data1.setStringVar("orderValue", seleValue);
	
		this.comp("report1").refresh();
	};
	
	return Model;
});
