/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	/**
		{
			aps: {
				alert: "xx", //消息标题
			}
			url: "",
			type: "",
			e: {}
		}
	*/

	var DEFAULT_TYPE = "";
	var Message = function(alert, exts, url, type){
		this.alert = alert;
		this.url = url;
		this.e = exts;
		this.type = type;
	}
	
	Message.prototype.getAlert = function(){
		return this.alert;
	}
	
	Message.prototype.setAlert = function(alert){
		this.alert = alert;
	}
	
	Message.prototype.getUrl = function(){
		return this.alert;
	}
	
	Message.prototype.setUrl = function(url){
		this.url = url;
	}
	
	Message.prototype.getType = function(){
		return this.type;
	}
	
	Message.prototype.setType = function(type){
		this.type = type;
	}

	Message.prototype.addExt = function(name, value){
		this.e = this.e || {};
		this.e[name] = value;
	}
	
	Message.prototype.getExt = function(name){
		this.e = this.e || {};
		return this.e[name];
	}
	
	Message.prototype.clearExts = function(){
		this.e = {};
	}
	
	Message.prototype.getExts = function(){
		return this.e;
	}
	
	Message.prototype.setExts = function(exts){
		this.e = exts;
	}
	
	Message.prototype.toJson = function(){
		var result = {
			aps: {alert: this.alert || ""},	
			url: this.url || "",
			type: this.type || DEFAULT_TYPE
		};
		if (this.e){
			result.e = this.e;
		}
		
		return result;
	}
	
	return Message;
});