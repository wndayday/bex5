/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var justep = require("$UI/system/lib/justep");
	//var Bind = justep.Bind;

	var url = require.normalizeName("./cellLayout");
	//var $ = require("jquery");
	require('css!./css/cellLayout').load();
 
	var cellLayout = justep.BindComponent.extend({
 
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},

		dispose : function() {
			this.callParent();
		},

		// 初始化
		doInit : function(value, bindingContext) {},
		render : function() {},
		
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) { 
			case "rowheight":
			 
				break;
			case "columnwidth":
 
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	justep.Component.register(url, cellLayout);
	return cellLayout;
});