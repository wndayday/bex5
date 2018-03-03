define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/
	// var IDEService = require("../../common/IDEService");
	// var xCloudService = IDEService.getXCloudService();
	var xmlUtil = require('$UI/system/lib/base/xml');
	/*-------------------------------------------------------------20160816 新增js---------------------------------------------------------------*/

	var Model = function() {
		this.callParent();
		this.str = "";
		this.protocolParams = [];
		this.strategyParams = [];
		this.name = justep.Bind.observable("");
		this.language = justep.Bind.observable("");
		this.info = justep.Bind.observable("");
		this.canClose = justep.Bind.observable(true);
		this.compileText = justep.Bind.observable("");
		this.state = justep.Bind.observable("");
	};

	// 点击确认按钮
	Model.prototype.OKBtnClick = function(event) {
		var self = this;
		var protocolData = this.comp("protocolData");
		var rows = protocolData.find([ "check" ], [ "1" ]);
		if (rows.length < 1) {
			justep.Util.hint("协议不能为空");
		} else {
			var arr = [];
			for (var i = 0; i < rows.length; i++) {
				arr.push(rows[i].val("pName"));
			}
			var str = this.ident + " " + this.name.get() + " " + arr.join(" ");
			this.compile(str);
			$("[xid='showMsg']").slideUp(300, function() {
				$("[xid='compileModel']").fadeIn();
			});
			$("[xid='OKBtn']").hide();
			$("[xid='cancelBtn']").hide();
		}
	};

	Model.prototype.modelParamsReceive = function(event) {
		if (event.params.path) {
			var path = event.params.path;
			var appName = event.params.appName;
			this.ident = event.params.ident;
			var protocolData = this.comp("protocolData");
			this.name.set(appName);
			this.language.set(event.params.language);
			var protocolArr = event.params.protocol.split(",");
			protocolArr.forEach(function(val, index) {
				protocolData.newData({
					"defaultValues" : [ {
						"pName" : val,
						"check" : "1"
					} ]
				})
			})
		}
	};

	// 获取下拉框的值
	Model.prototype.select1Change = function(event) {
	};

	// strategy的checkbox选择
	Model.prototype.strategyCheckChange = function(event) {
	};

	Model.prototype.protocolCheckChange = function(event) {
		var row = event.bindingContext.$object;
		if (event.checked) {
			row.val("check", "1");
		} else {
			row.val("check", "0");
		}
	};

	// 编译成功
	Model.prototype.compileSuccess = function(info) {
		this.canClose.set(true);
		this.compileText.set(info.reason);
		this.info.set(info.message);
		this.state.set("success");
	};
	// 编译失败
	Model.prototype.compileError = function(info) {
		this.canClose.set(true);
		this.info.set(info.message);
		this.compileText.set(info.reason);
		this.state.set("error");
	};
	// 编译
	Model.prototype.compile = function(args) {
		var model = this;
		this.canClose.set(false);
		this.info.set("模型资源编译中,请稍候...");
		$("[xid='closeBtn']").show().attr("disabled", true);
		this.compileText.set("");
		$.ajax({
			type : "POST",
			dataType : "json",
			url : require.toUrl("$UI/system/designer/gox5/compile/compile.j?args=" + args),
			success : function(data) {
				if (data.flag) {
					model.compileSuccess(data);
				} else
					model.compileError(data);
			},
			error : function(data) {
				model.compileError("");
			}
		});
		$("[xid='closeBtn']").attr("disabled", false);
	};

	return Model;
});