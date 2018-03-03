/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require('css!./css/btnNavBar').load();
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./btnNavBar");

	var BtnNavBar = justep.ViewComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.vercialImage = "";
			this.selectedImage = "";
			this.callParent(options);
		},
		init:function(value, bindingContext) {
			var self = this;
			this.callParent(value, bindingContext);
			this.$domNode.on("childChanged",function(event,data){
				if(data.attrName=="class" && data.type=="styleChanged"){
					self.showVercialLine(self.vercialImage, data.value);
					self.showUnderLine(self.selectedImage, data.value);
				}
			});
		},
		showVercialLine : function(image, classAttr){
			//显示竖线图
			if(classAttr.indexOf("x-btnNavBar-vlImage")>=0){
				if(image){
					this.$domNode.find(".x-btnNavBar-vl").css("background","url("+require.toUrl(image)+") no-repeat");
				}else{
					alert("请设置分隔线图片");
				}
			//不显示竖线图
			}else{
				this.$domNode.find(".x-btnNavBar-vl").css("background","none");
			} 
		},
		showUnderLine : function(image, classAttr){
			if(classAttr.indexOf("x-btnNavBar-ulImage")>=0){
				if(!image){
					alert("请设置选中图片");
					return;
				}
			}
			var cssRules;
			if (document.all){
				cssRules = 'rules';
			}else if (document.getElementById){
				cssRules = 'cssRules';
			}

			for (var S = 0; S < document.styleSheets.length; S++){
				for (var R = 0; R < document.styleSheets[S][cssRules].length; R++){
					if (document.styleSheets[S][cssRules][R].selectorText == ".x-btnNavBar-ulImage .btn.active"){
						if(classAttr.indexOf("x-btnNavBar-ulImage")>=0){
							if(image){
								//显示选中图
								document.styleSheets[S][cssRules][R].style["background"] = "url("+require.toUrl(image)+") bottom center no-repeat";
							}
						//不显示选中图
						}else{
							document.styleSheets[S][cssRules][R].style["background"] = "none";
						} 
					}
				}
			}
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "vercialImage":
				if (oldVal != value && this.$domNode){
					this.showVercialLine(value, this.$domNode.attr("class"));
				}
				break;
			case "selectedImage":
				if (oldVal != value && this.$domNode){
					this.showUnderLine(value, this.$domNode.attr("class"));
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
	});

	justep.Component.register(url, BtnNavBar);
	return BtnNavBar;
});