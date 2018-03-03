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
		this.close();
	};

	
	Model.prototype.modelLoad = function(event){
	};

	Model.prototype.button3Click = function(event){
		this.comp('windowDialog').open();
	};

	
	Model.prototype.shake1ShakeSuccess = function(event){
		alert('d');
	};

	
	Model.prototype.shake1ShakeFail = function(event){
		alert('d2');
	};
	
	return Model;
});
