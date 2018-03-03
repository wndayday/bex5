/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var justep = require('$UI/system/lib/justep');
	var scanApi = require('$UI/system/api/native/scan');
	var fileApi = require('$UI/system/components/justep/docCommon/fileApi');
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./scan");
	
	var ComponentConfig = require("./scan.config");
	
	
	var Scan = ViewComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return $("<div componet='$UI/system/components/justep/scan/scan'></div>").attr(config);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.callParent();
		},
		scanQRCode: function(){
			if(!(justep.Browser.isX5App || justep.Browser.isWeChat)){
				justep.Util.hint("当前环境暂不支持扫描");
			}
			var self = this;
			scanApi.scanQRCode({
				needResult : 1,
				desc : '扫一扫',
				success : function(res) {
					var eventData = {
						'data' : res.resultStr,
						'source' : self
					};
					self.resultStr = res.resultStr;
					self.fireEvent("onScanQRCodeSuccess",eventData);
				},
				fail: function(res){
					var eventData = {
						'cancel':false,
						'data':res.errMsg,
						'source' : self
					};
					self.resultStr = "";
					self.fireEvent("onScanQRCodeFail",eventData);
					if(!eventData.cancel){
						justep.Util.hint("扫描遇到问题，请稍后再试");
					}
				}
			});
		},
		openScanResultAsFile: function(){
			if(this.resultStr){
				var self = this;
				fileApi.browse(this.resultStr).fail(function(){
					justep.Util.hint("结果:" + self.resultStr + ",作为文件识别失败");
				});
			}
		},
		
		openScanResultAsUrl: function(){
			if(this.resultStr){
				window.open(this.resultStr,"_blank");
			}
		},
	});
	justep.Component.addOperations(Scan, {
		'openScanResultAsFile' : {
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.openScanResultAsFile();
			}
		},
		'openScanResultAsUrl' : {
			label : "",
			icon : '',
			init : function() {
			},
			method : function(args) {
				return this.owner.openScanResultAsUrl();
			}
		},
		
		'scanQRCode' :{
			label : "",
			icon: 'linear linear-chevronupcircle',
			method : function() {
				return this.owner.scanQRCode();
			}
		}
	});
	Component.register(url, Scan);
	return Scan;
});