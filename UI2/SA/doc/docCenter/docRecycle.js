define(function(require){
	var $ = require("jquery");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.deleteBtnClick = function(event){
		var self = this;
		var docNodeList = self.comp("docNodeList");
		var docID = docNodeList.getCurrentRowID();//获取当前选中附件数据的rowid,这个rowid就是后面调用删除时需要的docID
		if (docID){
			justep.Util.confirm("删除后不可恢复，确认删除当前选中文档？", function(){
				var params = new biz.Request.ActionParam();
				params.setParam("docID", docID);
				params.setParam("versionID", "");
				params.setParam("isLogicDelete", false);//设置物理删除还是逻辑删除，true是逻辑删除(不会删除文档服务器目录中存的文件)
				//调用deleteDocByIDAction执行删除
				biz.Request.sendBizRequest({
					contentType : "application/json",
					dataType : "application/json",
					action : "deleteDocByIDAction",
					context : self.getContext(),
					parameters : params
				});
				docNodeList.refreshData();
				justep.Util.hint("删除文档成功！");
			});
		}else{
			justep.Util.hint("请选择需要删除的文档");
		}       
	};

	Model.prototype.resetBtnClick = function(event){
		var self = this;
		var docNodeList = self.comp("docNodeList");
		var docID = docNodeList.getCurrentRowID();//获取当前选中附件数据的rowid,这个rowid就是后面调用删除时需要的docID
		if (docID){
			justep.Util.confirm("确认还原当前选中文档及其所有子文档？", function(){
				var params = new biz.Request.ActionParam();
				params.setParam("docID", docID);
				//调用deleteDocByIDAction执行删除
				biz.Request.sendBizRequest({
					contentType : "application/json",
					dataType : "application/json",
					action : "reverseDocAction",
					context : self.getContext(),
					parameters : params
				});
				docNodeList.refreshData();
				justep.Util.hint("还原文档成功！");
			});
		}else{
			justep.Util.hint("请选择需要还原的文档");
		}       
	};

	Model.prototype.deleteAllBtnClick = function(event){
		var self = this;
		var docNodeList = self.comp("docNodeList");
		if (docNodeList.getCount()>0){
			justep.Util.confirm("删除后不可恢复，确认删除所有文档？", function(){
				biz.Request.beginBatch();
				docNodeList.each(function(o){
					var params = new biz.Request.ActionParam();
					params.setParam("docID", o.row.getID());
					params.setParam("versionID", "");
					params.setParam("isLogicDelete", false);//设置物理删除还是逻辑删除，true是逻辑删除(不会删除文档服务器目录中存的文件)
					//调用deleteDocByIDAction执行删除
					biz.Request.sendBizRequest({
						contentType : "application/json",
						dataType : "application/json",
						action : "deleteDocByIDAction",
						context : self.getContext(),
						parameters : params
					});
				});
				biz.Request.endBatch();
				docNodeList.refreshData();
				justep.Util.hint("删除所有文档成功！");
			});
		}       
	};

	return Model;
});
