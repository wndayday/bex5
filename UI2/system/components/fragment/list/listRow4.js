/*! 
 * X5 v3 (http://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var Component = require("$UI/system/lib/base/component"), ViewComponent = require("$UI/system/lib/base/viewComponent"), url = require.normalizeName("./listRow4");
	require("$UI/system/components/justep/common/res");
	require('css!./css/list').load();

	var Dcomponent = ViewComponent.extend({

		constructor : function(options) {
			this.callParent(options);
		},
	});

	Component.register(url, Dcomponent);
	return Dcomponent;
});
