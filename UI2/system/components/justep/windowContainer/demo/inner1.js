/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var Model = function(){
		this.callParent();
	};

	Model.prototype.inner1 = function() {
		alert(111)
	};

	return Model;
});

