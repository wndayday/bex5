define(function(require){
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function(){
		this.callParent();
		this.isVisible = Message.flag;
	};
	
	Model.prototype.backMain = function(event){
		justep.Shell.closePage();
	};
	
	Model.prototype.attachmentSimpleEditError = function(event){
          // justep.Util.hint("errorMsg : " + event.event.data.errorMsg);
	};
	  
	Model.prototype.attachmentSimpleEdit = function(event){
        console.log('Edit===url : ' + event.event.data.url);
	};
	  
	Model.prototype.attachmentSimpleBeforeFileOpen = function(event){
       console.log('BeforeFileOpen===fileName : ' + event.event.data.realFileName);
	};
	  
	Model.prototype.attachmentSimpleAfterEdit = function(event){
		 console.log('AfterEdit===fileName : ' + event.event.data.realFileName);
	};
	  
	Model.prototype.attachmentSimpleAfterFileOpen = function(event){
        console.log('AfterFileOpen===fileName : ' + event.event.data.realFileName);
	};
	
	return Model;
});