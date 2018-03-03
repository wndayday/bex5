define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	//var util = require("$UI/apps/js/util");

	var Model = function() {
		this.callParent();
		this.userName = //util.CURRENT_USER.name;
		this.balance = justep.Bind.observable(0.00);
	};

	// 打开充值明细，支出明细
	Model.prototype.openPage = function(event) {
//		if (!event)
//			return;
//		var url = $(event.currentTarget).attr("url");
//		var title = null;
//		if (!url) {
//			return false;
//		}
//		if ($(event.currentTarget).attr("title")) {
//			title = $(event.currentTarget).attr("title");
//		} else {
//			title = "我的账单";
//		}
//		justep.Shell.showPage(url, null, {
//			title : title
//		});
	};

	Model.prototype.modelActive = function(event) {
//		this.getAccount();
	};

	Model.prototype.getAccount = function() {
//		var self = this;
//		util.sendRequest({
//			url : "/accounts/" + util.CURRENT_USER.id,
//			success : function(result) {
//				if (result.success) {
//					self.balance.set(result.object.balance);
//				}
//			}
//		});
	};

	Model.prototype.modelLoad = function(event) {
		//this.getAccount();
	};

	return Model;
});