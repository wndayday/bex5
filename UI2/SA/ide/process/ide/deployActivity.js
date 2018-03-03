define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require("$UI/system/lib/biz");
	var treeSelector = require("$UI/system/designer/webIde/common/treeSelector");
	var ideService = require("$UI/system/designer/webIde/common/IDEService");
	var xCloudService = ideService.getXCloudService();
	/*-------------------------------引入：fancytree.all.js start 20160612------------------------------------------*/
	require("$UI/system/designer/webIde/lib/fancytree/fancytree.all");
	/*-------------------------------引入：fancytree.all.js end   20160612------------------------------------------*/
	
	
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		var biz = xCloudService.getFileTree({filePath:"BIZ",extName:"m,xml,w,html", enabledPathPermission: true, bsessionid: this.getContext().getBSessionID()});
		var ui = xCloudService.getFileTree({filePath:"UI2",extName:"m,xml,w,html", enabledPathPermission: true, bsessionid: this.getContext().getBSessionID()});
		
		
		if (biz && biz.children && ui && ui.children){
			var data = [];
			if (biz.children[0]){
				biz.children[0].unselectable = true; //让根目录不可选
				data.push(biz.children[0]);
			}
			if (ui.children[0]){
				ui.children[0].unselectable = true;//让根目录不可选
				data.push(ui.children[0]);
			}
			
			if (data.length == 0){
				justep.Util.confirm("当前用户不允许发布资源，请联系管理员！", null, null, "ok");
				return;
			}
		
			this.funTree = new treeSelector({
				multiSelect : true,
				selectMode: 2,
				data : data,
				parent : this.getElementByXid('resourcesContainer'),
				clickHandler : function(path, node) {
					/*	
					if (node && node.key != 'root' && node.parent && node.parent.key.indexOf("root_") == -1) {
						self.lastSelection.set({
							concept : node.parent.key,
							relation : node.key
						});
					} else {
						self.lastSelection.set(null);
					}
					*/
				},
				dblClickHandler : function(event) {
	
				}
			});
		}else{
			justep.Util.hint("加载资源树失败！");
		}
	};

	Model.prototype.tableBtnClick = function(event){
		if (this.funTree){
			var items = this.funTree.getSelections();
			items = this.preparePaths(items);
			if (items && items.length>0){
				var models = [];
				for (var i=0; i<items.length; i++){
					var item = items[i];
					if (item && (item.indexOf("BIZ/") == 0)){
						item = item.substr(3);
						models.push(item);
					}else if (item && item == "BIZ"){
						justep.Util.hint("数据库发布时，不能选择BIZ根目录！");
						return;
					}
				}
				if (models.length == 1){
					this.comp("deployTableDialog").open({params: {modelPath: models[0]}});
				}else if (models.length > 1){
					justep.Util.hint("数据库发布时，只能选择BIZ下的一个目录！");
				}else{
					justep.Util.hint("数据库发布时，必须请选择BIZ下的一个目录！");
				}
				
			}else{
				justep.Util.hint("数据库发布时，必须请选择BIZ下的一个目录！");
			}
		}
	};
	
	
	//删除重复的子目录
	Model.prototype.preparePaths = function(paths){
		var result = [];
		if (paths && (paths.length>0)){
			for (var i=0; i<paths.length; i++){
				this.addArray(result, paths[i].key);
			}
		}
		
		return result;
	};
	
	Model.prototype.addArray = function(paths, path){
		if (paths){
			var add = true;
			for (var i=paths.length-1; i>=0; i--){
				var item = paths[i];
				if (item.indexOf(path) == 0){
					if (item == path){
						add = false;
						break;
					}else{
						add = true;
						paths.split(i, 1); 
					}
				}else if (path.indexOf(item) == 0){
					add = false;
					break;
				}
			}
			if (add){
				paths.push(path);
			}
			
		}
	}

	Model.prototype.resourceBtnClick = function(event){
		if (this.funTree){
			var items = this.funTree.getSelections();
			items = this.preparePaths(items);
			if (items && items.length>0){
				var msg = "";
				for (var i=0; i<items.length; i++){
					if (msg) msg += "<br/>";
					msg += items[i];
				}
				
				var loadingDialog = this.comp("loadingDialog");
				justep.Util.confirm("确认将<br/><b>" + msg + "</b><br/>资源发布到正式服务器上？", function(){
					var options = {'url' : require.toUrl("$UI/SA/ide/process/ide/service/deployResources.j"),
					   'postData' : {paths: items},		
					   'contentType' : "json",
					   'directExecute' : true,
					   'dataType' : "json"};
					loadingDialog.open();   
					biz.Request.sendAsyncHttpRequest(options).done(function(data){
						loadingDialog.close();
						if (data.flag){
							justep.Util.hint("资源发布成功！");
						}else{
							var msg = (data.message ? ("<br/>" + data.message) : "");
							justep.Util.confirm("资源发布失败！ " + msg, null, null, "ok");
						}
						
					}).fail(function(data){
						loadingDialog.close();
						justep.Util.confirm("资源发布失败！", null, null, "ok");
					});
				}, function(){
				
				})
			}else{
				justep.Util.hint("请选择需要发布的资源！");
			}
		}
	};

	return Model;
});