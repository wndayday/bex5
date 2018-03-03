/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var Component = require("$UI/system/lib/base/component");
	//var Observable = require("$UI/system/lib/base/observable");
	//var Object = require("$UI/system/lib/base/object");
	//var justep = require('$UI/system/lib/justep');
	var Str = require("$UI/system/lib/base/string");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var $ = require("jquery");
	var url = require.normalizeName("./content");
	var ComponentConfig = require("./content.config");
	
	
	
    var Content = ViewComponent.extend({
		/**
		 * 当激活进入
		 * @event onActive
		 * @param {slidePanel} source
		 * @param {Integer} index
		 */
		/**
		 * 当离开
		 * @event onInactive
		 * @param {slidePanel} source
		 * @param {Integer} index
		 */
		constructor: function(config){
			this.xid = '';
    		this.callParent(config);
		},
		
		getConfig : function(){
			return ComponentConfig;
		},
    	buildTemplate: function(config){
    		config.xid = config.xid || '';
    		config.body = config.body || '';

    		var html = Str.format("<div component='$model/UI2/system/components/justep/contents/content' " +
    			"class='x-contents-content' >{0}</div>", config.body);
    		html = $(html);
    		html.attr("xid", config.xid);  //解决xid中有单引号的问题, TODO 其它组件动态创建时, 有类似的问题
    		
    		this.owner = config.owner;
    		this.owner.$el.append(html);
    		this.xid = config.xid;
    		return html;
    	},
    	getIndex: function(){
    		return this.$domNode.index();
    	},
		init: function(value, bindingContext){
			this.owner = Component.getComponent(this.$domNode.parent().get(0));
			this.owner.contents.push(this);
			this.xid = this.$domNode.attr('xid');
			this.callParent(value, bindingContext);
		},
		/**
		 * 获取属性值
		 * @method get
		 * @param {String} name 
		 * @returns
		 */
		get: function(name){
			if(this[name] !== undefined)
				return this[name];
			name = 'get' + Str.camelize(name);
			if(this.owner[name])
				return this.owner[name](this.getIndex());
		},
		/**
		 * 设置属性值
		 * @method set
		 * @param {String} name 
		 * @param value 
		 */
		set: function(name, value){
			this[name] = value;
			if(typeof name == 'object'){
				var config = name;
				for(var i in config){
					if(config.hasOwnProperty(i))
						this.set(i, config[i]);
				}
			}else{
	    		name = 'set' + Str.camelize(name);
	    		if(this.owner[name])
	    			this.owner[name](this.getIndex(), value);
			}
		},
		onAfterSelect: function(){ 
			this.owner.to(this.getIndex());
		},
		isActive: function(){
			return this.xid===this.owner.getActiveXid();
		},
		active: function(){
			this.owner.to(this.xid);
		},
		dispose: function(){
			this.owner = null;
			this.callParent();
		},
		doRoute: function(name,param,routeState){
			if(!this.owner.routable){
				return;
			}
			if(routeState == 'enter'){
				this.active();
			}
		}
	});
    
    Component.register(url, Content);

    return Content;
});