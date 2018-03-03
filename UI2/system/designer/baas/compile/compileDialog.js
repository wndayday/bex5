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

	Model.prototype.modelLoad = function(event) {
		this.compile();
	};
	
	Model.prototype.compileSuccess = function(info){
		this.canClose.set(true);
		this.info.set("Baas模型资源编译完成");
		this.compileText.set(info);
		this.state.set("success");
	};
	
	Model.prototype.compileError = function(info){
		this.canClose.set(true);
		this.info.set("Baas模型资源编译失败");
		this.compileText.set(info);
		this.state.set("error");
	};

	Model.prototype.compile = function(){
			this.canClose.set(false);
			this.info.set("Baas模型资源编译中,请稍候......");
			this.compileText.set("");
			var model = this;
			$.ajax({
				type : "POST",
				dataType : "json",
				contentType : "application/json",
				processData : false,
				url : require.toUrl("$UI/system/designer/baas/compile/compile.j"),
				success : function(data) {
					if(data.flag)
						model.compileSuccess(data.reason);
					else 
						model.compileError(data.reason);
				},
				error : function() {debugger;
					model.compileError("");
				}
			});
	};

	return Model;
});