/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require('$UI/system/lib/justep');
	var Radio = require("./radio");

	var $ = require("jquery");
	var url = require.normalizeName("./toggle");
	var ComponentConfig = require("./toggle.config");

	var Toggle = Radio.extend({
		constructor : function(options) {
			this.callParent(options);
			this.type = 'checkbox';
			this._defaultClass = 'x-toggle';
		},
		getConfig : function() {
			return ComponentConfig;
		},
		
		//解决点圆圈不切换的问题
		doInit : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			if (justep.Browser.isIOS){
				var $label = this._getLabel();
				$label.children("span").on("click", function(e1){
					$label.trigger("click");
				});
			}
		},
		

		_buildInput : function(config) {
			var $ret = $("<input " 
					+ (config['name'] ? (" name='" + config['name'] + "'") : "") 
					+ (config['checked'] ? " checked='checked'" : "") 
					+ " type='" + config['type'] 
					+ "' class='" + this._defaultClass + "'/>");
			if(undefined!==config['value']) $ret.attr("value", config['value']);
			return $ret;
		},
		_buildLabel : function(config) {
			var $ret = $("<label></label>");
			$ret.attr("data-on", ((config['label'] && config['label'].on)?config['label'].on : 'ON')); 
			$ret.attr("data-off", ((config['label'] && config['label'].off)? config['label'].off : 'OFF'));
			$ret.append('<span/>');
			return $ret;
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "type":
				if (oldVal != value && this._inited)
					this._getInput().attr('type', value);
				break;
			case "label":
				if (this._inited) {
					if (!value)
						value = {};
					if (!value.on)
						value.on = 'ON';
					if (!value.off)
						value.off = 'OFF';
					this._getLabel().attr('data-on', value.on).attr('data-off', value.off);
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}

	});

	justep.Component.register(url, Toggle);
	return Toggle;
});