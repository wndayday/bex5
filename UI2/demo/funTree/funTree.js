define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};


	Model.prototype.modelLoad = function(event){
		var event = {functionTree: null};
		justep.Shell.fireEvent("onQueryFunctionTree", event);
		var items = [];
		this.getFunctionItem(event.functionTree, items);
		
		var rows = [];
		for (var i = 0; i < items.length; i++) {
			rows.push({
				label : items[i].label,
				url : items[i].url,
				psCount: items[i].psCount
			});
		}
		var funData = this.comp("funData");
		funData.loadData({
			rows : rows
		}, false);
		funData.first();
	};
	
	Model.prototype.getFunctionItem = function(item, result){
		if (item.url && item.label){
			var url = item.url;
			if (item.process && item.activity){
				url += ((url.indexOf("?") == -1) ? "?" : "&");
				url += "process=" + item.process + "&activity=" + item.activity;
			}
			result[result.length] = {
				label: item.label || "",
				url : url,
				psmCount : item.psmCount || 1
			};
		}else if (item.$children){
			for (var i=0; i<item.$children.length; i++){
				this.getFunctionItem(item.$children[i], result);
			}
		}
	};


	Model.prototype.col1Click = function(event){
		debugger;
		var row = event.bindingContext.$object;
		var url = row.val("url");
		var label = row.val("label");
		justep.Shell.showPage({url:url, title: label});
	};


	return Model;
});