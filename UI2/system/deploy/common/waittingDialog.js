define(function(require) {
	var bind = require("bind");
	var Model = function() {
		this.callParent();
		this.needServerLog = bind.observable("false");
	};

	Model.prototype.modelLoad = function(event) {
		this.parent = this.getParent();
		this.appEngine = this.parent.appEngine;
		this.logFrame = document.createElement('iframe');
		this.logFrame.style.cssText = "border:0;width:100%;height:100%";
		var self = this;
		var logFrameLoad = function() {
			self.logFrame.contentWindow.scroll(0, 99999);
		};
		if (this.logFrame.attachEvent) {
			this.logFrame.attachEvent("onload", logFrameLoad);
		} else {
			this.logFrame.onload = logFrameLoad;
		}
		this.getElementByXid("iframeDiv").appendChild(this.logFrame);
		var refreshID = window.packRefreshID = window.setInterval(justep.Util.bindModelFn(self, function() {
			self._refreshLogFrame(self.getParent().buildResult);
		}), 2500);

		this.showServerLog = false;
		var hasServerLog = this.appEngine.getConfig().useProxyBuilderServer && this.appEngine.reqURL && this.appEngine.reqURL.indexOf('/pack.j') > 0;
		this.needServerLog.set(!!hasServerLog);
		var serverLogDiv = this.getElementByXid("useServerDiv");
		if (serverLogDiv) {
			serverLogDiv.style.display = hasServerLog ? "block" : "none";
		}
		if (!this.getParent().buildFinished) {
			this.getParent().buildFinishedNotify = function(result) {
				this.building = false;
				window.clearInterval(refreshID);
				self._showBuildStatus(result);
			};
			this.building = true;
		} else {
			window.clearInterval(refreshID);
			self._showBuildStatus(this.getParent().buildResult);
		}

		this._recalcHeight();
		$(window).resize(function() {
			self._recalcHeight();
		});
	};

	Model.prototype._recalcHeight = function() {
		var height = $(this.parent.getElementByXid("content1")).height() - $(this.getElementByXid("infoDiv")).outerHeight(true) - $(this.getElementByXid("useServerDiv")).outerHeight(true) - 28;
		$(this.getElementByXid("logDiv")).height(height);
	};

	Model.prototype._refreshLogFrame = function(result) {
		if ((this.getElementByXid("logDiv").style.display == "block") && (this.building || result)) {
			if (this.building || result.flag) {
				var config = this.appEngine.getConfig();
				this.logFrame.src = require.toUrl("$UI/system/deploy/common/buildLog.j?projectName=" + config.projectName) + "&serverLog=" + this.showServerLog + "&appBuilderServer="
						+ config.appBuilderServer + "&appID=" + config.appID + "&remoteBuildServer=" + config.useProxyBuilderServer + "&r=" + Math.random();
			} else {
				var serverLogDiv = this.getElementByXid("useServerDiv");
				if (serverLogDiv) {
					serverLogDiv.style.display = "none";
				}
				this.logFrame.contentDocument.writeln('<pre style="word-wrap: break-word; white-space: pre-wrap;">' + result.message + '\r\n错误原因：' + result.reason + '\r\n调用栈：' + result.stack
						+ '</pre>');
			}
		}
	};

	Model.prototype._showBuildStatus = function(result) {
		if (result.flag) {
			if (result.code == "ERROR") {
				this.getElementByXid("info").innerText = "执行失败！，请下方文本框了解具体错误（复制信息：Windows用Ctrl+C复制，Mac OS X用鼠标右键选择“拷贝”）";
				this.getElementByXid("logDiv").style.display = "block";
				if (this.needServerLog.get()) {
					this.comp("logTypeRadio2").val(true);
					this.showServerLog = true;
				}
			} else {
				this.getElementByXid("info").innerText = this.getSucessInfo();
			}
		} else {
			this.getElementByXid("info").innerText = "调用服务请求失败！，请下方文本框了解具体错误（复制信息：Windows用Ctrl+C复制，Mac OS X用鼠标右键选择“拷贝”）";
			this.getElementByXid("logDiv").style.display = "block";
		}
		this._refreshLogFrame(result);
	};

	Model.prototype.getTitle = function(wizard) {
		return '执行';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.finish = function(wizard) {
		return false;
	};

	Model.prototype.detailClick = function(event) {
		var div = this.getElementByXid("logDiv");
		div.style.display = div.style.display == "block" ? "none" : "block";
		this._refreshLogFrame(this.getParent().buildResult);
	};

	Model.prototype.logTypeRadioChange = function(event) {
		this.showServerLog = !this.showServerLog;
		this._refreshLogFrame(this.getParent().buildResult);
	};

	Model.prototype.getSucessInfo = function(result) {
		return "执行成功！";
	};

	return Model;
});