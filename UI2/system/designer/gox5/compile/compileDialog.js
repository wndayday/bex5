define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.info = justep.Bind.observable("");
		this.canClose = justep.Bind.observable(true);
		this.compileText = justep.Bind.observable("");
		this.state = justep.Bind.observable("");
	};

	Model.prototype.modelParamsReceive = function(event) {
		var ident = event.params.ident;
		var appName = event.params.appName;
		if (appName) {
			this.compile(ident + " " + appName)
		} else {
			this.compile(ident);
		}
	};

	Model.prototype.compileSuccess = function(info) {
		this.canClose.set(true);
		this.info.set(info.message)
		this.compileText.set(info.reason);
		this.state.set("success");
	};
	Model.prototype.compileError = function(info) {
		this.canClose.set(true);
		this.info.set(info.message)
		this.compileText.set(info.reason);
		this.state.set("error");
	};

	Model.prototype.compile = function(args) {
		var self = this;
		this.canClose.set(false);
//		this.info.set("GoX5模型资源编译中,请稍候......");
		this.compileText.set("");
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "text/plain",
			url : require.toUrl("$UI/system/designer/gox5/compile/compile.j?args=" + args),
			success : function(data) {
				if (data.flag) {
					self.compileSuccess(data);
				} else
					self.compileError(data);
			},
			error : function(data) {
				self.compileError("");
			}
		});
	};

	return Model;
});