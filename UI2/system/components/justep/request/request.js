/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var url = require.normalizeName("./request");
	var ComponentConfig = require("./request.config");
	var Expr = justep.Express;

	var Request = justep.BindComponent.extend({
		constructor : function(model,xid) {
			this.callParent();
			this.url = "";
			this.type = "GET";
			this.dataExpr = "";//支持表达式
			this.async = true;
			this.cache = null;
			this.dataType = "json";
			this.headersExpr = "";//支持表达式
			this.processData = true;
			this.timeout = null;
			this.contentType = null;
		},
		getConfig : function() {
			return ComponentConfig;
		},
		_processCfg: function(){
			var ret = {
					type: this.type,
					async: this.async,
					dataType : this.dataType,
					processData: this.processData,
			};
			if(this.url) ret.url = this.url;
			if(this.cache !== null) ret.cache = this.cache;
			if(this.timeout !== null) ret.timeout = this.timeout;
			if(this.contentType !== null) ret.contentType = this.contentType;
			var ctx = justep.Bind.contextFor(this.domNode);
			if(this.dataExpr){
				if(!(this._dataExpr instanceof Expr)) this._dataExpr = new Expr(this.dataExpr);
				ret.data = Expr.eval(this._dataExpr, ctx.$object, ctx);
			}
			if(this.headersExpr){
				if(!(this._headersExpr instanceof Expr)) this._headersExpr = new Expr(this.headersExpr);
				ret.headers = Expr.eval(this._headersExpr, ctx.$object, ctx) || {};
			}
			return ret;
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "dataExpr":
				if (oldVal != value && this._inited){
					this._dataExpr = null;
				}
				break;
			case "headersExpr":
				if (oldVal != value && this._inited){
					this._headersExpr = null;
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		send : function(cfg){
			var options = $.extend({},this._processCfg(),cfg||{});
			var self = this;
			options.error = function(XMLHttpRequest, textStatus, errorThrown){
				self.fireEvent('onError',{source:self,XMLHttpRequest:XMLHttpRequest,textStatus:textStatus,errorThrown:errorThrown});
			};
			options.success = function(data, textStatus, jqXHR){
				self.fireEvent('onSuccess',{source:self,data:data,textStatus:textStatus,jqXHR:jqXHR});
			};
			self.fireEvent('onBeforeRequest',{source:self,options:options});
			if(!options.url)
				throw new Error("url是必须的参数");
			return $.ajax(options);			
		}
	});

	// 操作
	justep.Component.addOperations(Request, {
		'sendRequest' : {
			label : '发送请求',//'data赋值'
			argsDef : [ {
				name : 'options',
				displayName : '参数'
			} ],
			method : function(args) {				
				return this.owner.send(args.options);
			}
		},
		'setRequestOption' : {
			label : '设置请求参数',//'data赋值'
			argsDef : [ {
				name : 'cfg',
				displayName : '参数'
			} ],
			method : function(args) {				
				return this.owner.set(args.cfg);
			}
		}
	});

	justep.Component.register(url, Request);
	return Request;
});