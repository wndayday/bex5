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
		this.i = 0;
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.returnMain = function(event) {
		justep.Shell.closePage();
	};

	Model.prototype.radioChange = function(event) {
		Message.message("aler", "radio change事件,获取value值");
		this.comp("showValue").set({"value":"选择的值:"+this.comp("radioVal").value});
	};

	Model.prototype.dataValueChange = function(event) {
		Message.message("aler", " radioGroup需结合data组件使用,获取value值");
		this.comp("showValue").set({"value":"选择的值:"+event.newValue});
	};
	
	Model.prototype.controlRadio = function(event){
		var radioObj = this.comp('radioVal');
		radioObj.get('checked')?radioObj.set({'checked':null}):radioObj.set({'checked':'true'});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/button/demo/radio.js"
		});
	};

	Model.prototype.showStyleSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/radio.w&xid=radioStyle"
		});
	};

	Model.prototype.showEventSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/radio.w&xid=radioEvent"
		});
	};

	Model.prototype.showRadioGroupSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/radio.w&xid=showRadioGroup"
		});
	};

	Model.prototype.model1Load = function(event){
		var isPC = justep.Browser.isPC;
		if (!isPC) {
			this.comp("windowDialog").set({'status':'maximize'});
		}
	};

	return Model;
});