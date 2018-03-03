define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var util = require("$UI/system/components/justep/common/common");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.jsClick = function(event) {
		util.showSource({
			self : this,
			data : "./treeGrid-onceLoading.js"
		},true);
	};

	Model.prototype.sourceClick = function(event) {
		util.showSource({
			self : this,
			type : true,
			data : "./treeGrid-onceLoading.w&xid=areaGrid"
		},true);
	};


	return Model;
});