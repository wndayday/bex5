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
		this.path = justep.Bind.observable("");
		this.compileName = justep.Bind.observable("");
		this.strategy = justep.Bind.observable("");
		this.filePath = "UI2/system/designer/webIde/config/dscfg.xml";
	};

	// 点击确认按钮
	Model.prototype.OKBtnClick = function(event) {
		var self = this;
		var protocolData = this.comp("protocolData");
		var docData = this.comp("docData");
		if (!this.strategy.get()) {
			justep.Util.hint("策略选项不能为空");
		} else if (!this.compileName.get()) {
			justep.Util.hint("编译模式不能为空");
		} else {
			var strategyName = this.strategy.get();
			if (strategyName.lastIndexOf(",") == strategyName.length - 1) {
				this.strategy.set(strategyName.substr(0, this.strategy.get().lastIndexOf(",")));
			}
			this.owner.send({
				path : this.path,
				compileType : this.compileName.get(),
				strategy : this.strategy.get(),
				domain : docData.getValue("domin") || "",
				output : docData.getValue("output") || "",
			});
			this.owner.close();
		}
	};

	Model.prototype.modelParamsReceive = function(event) {
		var me = this;
		var strategyData = this.comp("strategyData");
		var compileData = this.comp('compileData');
		var docData = this.comp("docData");
		compileData.each(function(option) {
			if (option.row.val('name') == event.params.selected) {
				me.compileName.set(event.params.selected.trim());
			}
		});
		var domain = event.params.domain;
		var output = event.params.output;
		docData.newData();
		domain && docData.setValue("domin", domain);
		output && docData.setValue("output", output);
		this.path = event.params.path;
		var strategy = event.params.strategy;
		this.strategy.set(strategy);
		var strategyArr = strategy.split(",");
		strategyData.each(function(option) {
			for (var i = 0; i < strategyArr.length; i++) {
				if (option.row.val("sName") == strategyArr[i]) {
					option.row.val("state", "1");
				}
			}
		})

	};

	// 获取下拉框的值
	Model.prototype.select1Change = function(event) {
		this.compileVal = event.value;
	};

	// strategy的checkbox选择
	Model.prototype.strategyCheckChange = function(event) {
		var chooseSgy = this.comp("chooseSgy");
		var row = event.bindingContext.$object;
		var strategyName = this.strategy.get();
		if (event.checked) {
			var checkName = row.val("sName");
			if (strategyName.lastIndexOf(",") != strategyName.length - 1) {
				strategyName += "," + row.val("sName");
			} else {
				strategyName += row.val("sName") + ",";
			}
			row.val("state", "1");
			this.strategy.set(strategyName);
		} else {
			var sName = row.val("sName");
			if (strategyName.lastIndexOf(sName + ",") == -1) {
				this.strategy.set(strategyName.replace(sName, ""));
			} else {
				this.strategy.set(strategyName.replace(sName + ",", ""));
			}
			row.val("state", "0");
		}
	};

	return Model;
});