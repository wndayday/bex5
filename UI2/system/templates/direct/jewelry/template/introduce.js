define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};
	
	
	Model.prototype.toURL = function(imgUrl){
		  return imgUrl ? require.toUrl(imgUrl) : "";
		
	};
	
	return Model;
});