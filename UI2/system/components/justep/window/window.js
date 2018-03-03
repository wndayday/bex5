/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/
define(function(require) {
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./window");

	var Window = justep.ViewComponent.extend({
		getConfig: function(){
			return {};
		},
		constructor : function(options) {
			this.callParent(options);
			this.backgroundImage="";
    		this.title = '';
		}, 
		init:function(value, bindingContext) {
			this.callParent(value, bindingContext);
			//解决backgroundImage与style属性的冲突问题
			var image = this.buildSrc(this.$domNode.attr('backgroundImage'));
			if (image){
				this.setBackgroundImage(image);	
			}
        	
			this.title = this.$domNode.attr('title');
			this.$domNode.removeAttr('title');//移出节点title属性
			this.initTitle();
		},
		
		initTitle: function(){
			if(this.title){
        		this._titleExpr = justep.Bind.observable(new justep.Express(this.title));
        		var self = this;
        		justep.Bind.computed(function(){
        			var expr = self._titleExpr.get();
        			if(expr instanceof justep.Express){
        				var t = justep.Express.eval(expr, this, {'$model':this});
        				this.setTitle(t || "");
        			}
        		},this.getModel());
        	}
		},
		
		buildSrc:function(src){
			if(src){
				if(src.indexOf("$UI") !=-1){
					src = require.toUrl(src);
				}
			}
			return src||"";
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "backgroundImage":
				this.setBackgroundImage(this.buildSrc(value));
				break;
			case "title":
				if(value){
					this._titleExpr.set(new justep.Express(value));
				}
				break;
			}
		},
		setBackgroundImage : function(url){
			this.$domNode.css('background-image', url ? ("url("+url+")") : "");
			this.$domNode.css('backgroundSize',"cover");
			this.$domNode.css('width',"100%");
			if(justep.Browser.isMobile) this.$domNode.css('height',"100%");
		},
		close: function(){
			var m = this.getModel();
			m.owner.close(); //调用model上的owner的close方法
		}
	});

	justep.Component.addOperations(Window, {
		'close' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP230096),
			icon : 'icon-chevron-left',
			method : function(args) {
				this.owner.close();
			}
		}});
	
	justep.Component.register(url, Window);
	return Window;
});