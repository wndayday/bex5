/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var justep = require('$UI/system/lib/justep');
	var geoApi = require('$UI/system/api/native/geo');
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./geolocation");
	
	var ComponentConfig = require("./geolocation.config");
	
	
	var Geolocation = ViewComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.errorHint = false;
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return $("<div componet='$UI/system/components/justep/geolocation/geolocation'></div>").attr(config);
		},
		
		getConfig: function(){
			return ComponentConfig;
		},
		
		init: function(){
			this.callParent();
		},
		getLocation: function(){
			if(!(justep.Browser.isX5App || justep.Browser.isWeChat)){
				justep.Util.hint("当前环境暂不支持地理位置获取");
			}
			var self = this;
			geoApi.getLocation({
				success : function(res) {
					var eventData = {
						'data' : res,
						'source' : self
					};
					self.position = res;
					self.fireEvent("onGetLocationSuccess",eventData);
					
				},
				fail: function(res){
					var eventData = {
						'cancel':false,
						'data':res.errMsg,
						'source' : self
					};
					self.position = null;
					self.fireEvent("onGetLocationFail",eventData);
					if(this.errorHint && !eventData.cancel){
						justep.Util.hint("获取位置信息遇到问题，请稍后再试");
					}
				}
			});
		},
		openLocationInBaiduMap: function(){
			
			if(this.position){
				geoApi.openLocation(this.position);
			}
		}
	});
	justep.Component.addOperations(Geolocation, {
		'openLocationInBaiduMap' : {
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.openLocationInBaiduMap();
			}
		},
		'getLocation' :{
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.getLocation();
			}
		}
	});
	Component.register(url, Geolocation);
	return Geolocation;
});