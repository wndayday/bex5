define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Push = require("$UI/system/api/push/push");
	var Message = require("$UI/system/api/push/message");

	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.sendBtnClick = function(event){
		var sendData = this.comp("sendData");
		var targets = sendData.getValue("targets");
		var message = new Message(sendData.getValue("message"));
		Push.sendMessage(message, targets);
	};

	Model.prototype.modelLoad = function(event){
		if (justep.Browser.isMobile){
			Push.connect("PSN01", null);
			var self = this;
			Push.on("onMessage", function(event){
				self.comp("receiveData").loadData([{message: JSON.stringify(event.message)}], true);
			});
		}
	};
	
	

	return Model;
});