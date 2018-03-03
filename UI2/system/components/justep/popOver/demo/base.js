/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function(){
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.showPopOver = function(event){
		this.comp("demoPopOver").show();
	};

	Model.prototype.backBtn = function(event){
		justep.Shell.closePage();
	};

	Model.prototype.showPopOverSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/popOver/demo/base.w&xid=demoPopOver"
		});
	};

	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/popOver/demo/base.js"
		});
	};

	Model.prototype.a1Click = function(event){
		this.comp("demoPopOver").hide();
	};

	Model.prototype.modelLoad = function(event){
		var isPC = justep.Browser.isPC;
		if (!isPC) {
			this.comp("windowDialog").set({'status':'maximize'});
		}
	};

	return Model;
});