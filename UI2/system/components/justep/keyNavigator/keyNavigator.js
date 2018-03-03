/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var Component = require("$UI/system/lib/base/component");
	var Browser = require("$UI/system/lib/base/browser");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var $ = require("jquery");
	var url = require.normalizeName("./keyNavigator");
	var ComponentConfig = require("./keyNavigator.config");
	var keyNavigator = require("$UI/system/lib/keyNavigator/keyNavigator");
	var justep = require("$UI/system/lib/justep");
	var _KeyNavigator = ViewComponent.extend({
		constructor : function(options) {
			this.callParent(options);
		},
		getConfig : function() {
			return ComponentConfig;
		},
		init : function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.$domNode);
			this.selector = this.$domNode.attr("selector");
			this.keepSourceGroupXids = this.$domNode.attr("keepSourceGroupXids");
			keyNavigator.config({
				focusableSelector : this.selector,
				keepSourceGroupXids : this.keepSourceGroupXids
			});
			this.reachEnd();
		},
		reachEnd : function(){
			var self = this;
			keyNavigator.on("reachEnd",function(event){
				var from = event.from;
				var direction = event.direction;
				if(direction == 'down'){
					self.fireEvent("reachEndDown",{
						source : self,
						from : from,
						direction : direction
					})
				};
				if(direction == 'up'){
					self.fireEvent("reachEndup",{
						source : self,
						from : from,
						direction : direction
					})
				};
				if(direction == 'left'){
					self.fireEvent("reachEndLeft",{
						source : self,
						from : from,
						direction : direction
					})
				};
				if(direction == 'right'){
					self.fireEvent("reachEndRight",{
						source : self,
						from : from,
						direction : direction
					})
				}
			})
		}
	});
	justep.Component.register(url, _KeyNavigator);
	return _KeyNavigator;
});