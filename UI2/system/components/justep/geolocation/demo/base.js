/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");	
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};
	
	Model.prototype.closeWin = function(event){
		justep.Shell.closePage();
	};

	
	Model.prototype.modelLoad = function(event){
	};

	Model.prototype.geolocation1GetLocationSuccess = function(event){
		
	};

	Model.prototype.geolocation1GetLocationFail = function(event){
		alert('geolocation1GetLocationFail');
	};

	Model.prototype.shake1ShakeSuccess = function(event){
		justep.Util.hint("" + event.data);
	};

	return Model;
});
