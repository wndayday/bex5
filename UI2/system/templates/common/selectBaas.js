define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var BAASModel = require("$UI/system/designer/baas/BAASModel");

	var Model = function() {
		
		this.callParent();
		this.services;
		this.type='service';
		this.actionType = justep.Bind.observable("query");
		this.filter = justep.Bind.observable("");
	};
	
	
	Model.prototype.modelParamsReceive = function(event){
		this.serviceURL = this.params.data.serviceURL;
		this.queryAction = this.params.data.queryAction;
		this.saveAction = this.params.data.saveAction;
		this.table = this.params.data.table;
		this.db = this.params.data.db;
		this.baasDataXid = this.params.data.baasDataXid;
		this.setActionType = this.params.data.actionType;
	};
	
	Model.prototype._recalcHeight = function() {
		var height = $(this.getRootNode()).height() - $('.nav-row').height();
		$('.data-nav').height(height);
		$('.data-form').height(height);
	};
	
	

	Model.prototype.beforeOkAction = function() {
		if (!this.serviceURL.get())
			return '请选择BAAS Service';
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		return {
			url : this.serviceURL.peek(),
			queryAction : this.queryAction.peek(),
			tableName: this.table.peek(),
			saveAction: this.saveAction.peek()
		};
	};

	Model.prototype.modelLoad = function(event) {
		
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");

		//每次打开都重新加载baas模型
		BAASModel.loadBaasModel();
		this.services = BAASModel.getServices();
		this.comp('dataService').refreshData();
		
		//监控filter变化
		this.filter.subscribe(function(){
			this.comp('dataService').refreshData();
		},this);
		
		this._recalcHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcHeight();
		});
	};

	Model.prototype.dataServiceCustomRefresh = function(event) {
		
		if (this.services) {
			var datas = [],type=this.type,model=this;			
			$.each(this.services, function(path, service) {
				if(type!=='service' && path!==model.serviceURL.peek()) return;
				var actionType = model.actionType.get();
				var filter = model.filter.get();
				var actions = service.actions;
				if (actions) {
					$.each(actions, function(i, action) {
						if(action.private) return;//禁用的不提供选择
						if(actionType==='query' && action.name.indexOf('query')<0 && 'action:common/CRUD/query'!=action.impl && 'action:common/sqlQuery'!=action.impl) return;
						else if(actionType==='save' && action.name.indexOf('save')<0 && 'action:common/CRUD/save'!=action.impl) return; 
						//不区分大小写  
						if(filter && (path+"/"+action.name).toLowerCase().indexOf(filter.toLowerCase())<0) return; 
						var table = action.privateParams && action.privateParams['tableName'] ? action.privateParams['tableName'].value : "";
						var db = action.privateParams && action.privateParams['db'] ? action.privateParams['db'].value : "";
						datas.push({
							path : path,
							action : action.name,
							table : table,
							db : db
						});
					});
				}
			});
			event.source.loadData(datas);
		} else
			event.source.clear();
	};



	Model.prototype.getSaveActionByTable = function(serviceURL,table){
		var service = this.services[serviceURL];
		var ret;
		if(service && $.isArray(service.actions)){
			var saveAction = "save" + table.substring(0, 1).toUpperCase() + table.substring(1);
			$.each(service.actions, function(i,action){
				if(action.name == saveAction){
					ret = action.name;
					return false;
				}
			});
		}
		return ret;
	};
	
	Model.prototype.dataServiceValueChanged = function(event) {
		
		
		
		if ("checked" == event.col && true === event.value) {
			//目前radio组件同name的不能出发onchange事件，通过下面代码进行处理
			event.source.each(function(p){
				if(p.row!==event.row) p.row.val("checked",false); 
			});
			if (this.type == "service") {
				var serviceURL = event.row.val("path"),table = event.row.val("table"),db=event.row.val('db');
				this.serviceURL.set(serviceURL);
			
				if(this.setActionType == 'query'){
					this.queryAction.set(event.row.val("action"));
				}else if(this.setActionType == 'save'){
					this.saveAction.set(event.row.val("action")); 
				}
				this.table.set(table);
				this.db.set(db);
				var saveAction = this.getSaveActionByTable(serviceURL,table);
				//如果我是选择查询action,并且存在saveAction,就自定赋值saveAction
				if(saveAction && this.setActionType == 'query') this.saveAction.set(saveAction); 
				
				
				var config = this.templateEngine.getConfig();
				config.current = config.current || {};
				config.current.db=this.db.peek();
				config.current.table=this.table.peek();
				config.current.serviceURL=this.serviceURL.peek();
				config.current.queryAction=this.queryAction.peek();
				config.current.saveAction=this.saveAction.peek();
				config.current.baasDataXid=this.baasDataXid.peek();
				
			}else{
				this.saveAction.set(event.row.val("action"));
			}
		}
	};

	Model.prototype.select1Change = function(event){
		this.comp('dataService').refreshData();
	};




	return Model;
});