/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var justep = require('$UI/system/lib/justep');

	var url = require.normalizeName("./controlGroup");
	var ComponentConfig = require("./controlGroup.config");

	var ControlGroup = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.title = '';
			this.collapsible = false;
			this.collapsed = false;
			this.callParent(options);
		},
		dispose : function() {
			this.callParent();
		},
		doInit : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			if(!this.title)this._getTitleNode().hide();
			var self = this;
			this._getTitleNode().on('click',function(evt){
				if(self.collapsible){
					self.collapsed?self.expand():self.collapse();
				}
			});
			if(this.collapsible && this.collapsed) this.collapse();
		},
		collapse : function(){
			this.$domNode.addClass('x-collapsed').children(':not(.x-control-group-title)').slideUp("fast");
			this.collapsed = true;
		},
		expand: function(){
			this.$domNode.removeClass('x-collapsed').children(':not(.x-control-group-title)').removeClass('hide').slideDown("fast");
			this.collapsed = false;
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "title":
				if (oldVal !== value) {
					var func = value ? 'show' : 'hide';
					var $title = this._getTitleNode();
					var $titleSpan = $title.children('span');
					if($titleSpan.length>0)	$titleSpan.text(value);
					else $title.text(value);
					$title[func]();
				}
				break;
			case "collapsed":
				if (oldVal !== value) value?this.collapse():this.expand();
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'x-control-group';
			return "<div class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' " + " >" + "<div class='x-control-group-title'><span>"
					+ (config.title ? config.title : '') + "</span></div>" + "</div>";
		},

		_getTitleNode : function() {
			return this.$domNode.find('div.x-control-group-title:first');
		}
	});

	justep.Component.register(url, ControlGroup);
	return ControlGroup;
});