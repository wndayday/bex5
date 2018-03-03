define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		this.checkedClass = "";
		var parentHeight = this.comp('content3').domNode.offsetHeight;
		var btns = $(this.getElementByXid('content3')).find('a');
		for(var i = 0;i<btns.length;i++){
			var j=(i+1).toString();
			var height = parentHeight/btns.length;
			$(btns[i]).attr('style','height:' + height + 'px; line-height:' + height + 'px;');
		}
	};
	
	Model.prototype.loadDataFromFile = function(url, objData, operation) {
		if (operation) {
			objData.clear();
		}
		$.ajaxSettings.async = false;
		$.getJSON(url, function(data) {
			objData.loadData(data);
		});
	};
	
	Model.prototype.listDataCustomRefresh = function(event){
		var url = require.toUrl("./json/listData.json");
		
		this.loadDataFromFile(url, event.source, true);
	};
	


	
	Model.prototype.liClick = function(event){
		this.comp('windowDialog').open();
	};
	

	
	return Model;
});