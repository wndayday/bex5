define(function(require){
	var $ = require("jquery");
	var biz = require("$UI/system/lib/biz");
	var Model = function(){
		this.callParent();
		this.defaultApp = "";
	};
	Model.prototype.closeBtnClick = function(event){
		this.owner.close();
	};
	Model.prototype.copyNewBtnClick = function(event){
		var client = this.getContext().getClient();
		if (client){
			this.defaultApp = "CT_" + client.toUpperCase();
		}else{
			throw new Error("请指复制后功能的存储目录");
		}
		this.comp("processDialog").open({data : {type: "flow"}});
	};
	Model.prototype.processDialogReceive = function(event){
		var process = event.data.val("process");
		var processName = event.data.val("label");
		
		if (!process){
			justep.Util.confirm("请选择需要复制的功能", null, null, "ok");
			return;
		}
		
		if (!this.defaultApp){
			justep.Util.confirm("请指复制后功能的存储目录", null, null, "ok");
			return;
		}
		var me = this;
		var app = this.defaultApp;
		var loadingDialog = this.comp("loadingDialog");
		justep.Util.confirm("确认复制 <b>\"" + processName + "(" + process + ")\"</b>到<br/>目录<b>\""+ app 
				+"\"</b>下<br/>注意：会将 <b>\""+ app + "\"</b>下存在的 <b>\"" + processName + "\"</b>覆盖！", function(){
			var options = {'url' : require.toUrl("$UI/SA/ide/process/ide/service/copyNewFun.j?appName=" + app + "&process=" + process),
			   'contentType' : "json",
			   'directExecute' : true,
			   'dataType' : "json"};
			loadingDialog.open();   
			biz.Request.sendAsyncHttpRequest(options).done(function(data){
				loadingDialog.close();
				if (data.flag){
					me.currentLayoutConfig.resourceView.refresh(me.currentLayoutConfig.rootPath);
					justep.Util.hint("复制新建\"" + processName + "\"成功");
				}else{
					var msg = (data.message ? ("<br/>" + data.message) : "");
					justep.Util.confirm("复制新建\"" + processName + "\"失败！原因：" + msg, null, null, "ok");
				}
				
			}).fail(function(data){
				loadingDialog.close();
				justep.Util.confirm("复制新建\"" + processName + "\"失败！", null, null, "ok");
			});
		}, function(){
		
		})
		
	};
	return Model;
});