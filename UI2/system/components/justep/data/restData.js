define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Data = require("./data");

	var Filter = function() {
		this.filterList = {};
		this.variables = {};
	};

	Filter.prototype = {
		clear : function() {
			for ( var o in this.filterList)
				delete this.filterList[o];
			this.clearVars();
		},

		clearVars : function() {
			this.variables = {};
		},

		getVar : function(name) {
			return this.variables["__"+name];
		},

		setVar : function(name, ver) {
			return this.variables["__"+name] = ver;
		},

		setFilter : function(name, filter) {
			this.filterList[name] = filter;
		},

		getFilter : function(name) {
			return this.filterList[name];
		},

		deleteFilter : function(name) {
			delete this.filterList[name];
		}
	};
	
	var FilterContext = function(model,data,vars){
		$.extend(this, {$model:model,$data:data}, vars);
		this.result = [];
	};
	
	var filterFNs = ['eq', 'gt', 'lt', 'gte', 'lte', 'like', 'ilike', 'is', 'inn', 'not'];
	
	$.each(filterFNs, function(i,fn){
		FilterContext.prototype[fn] = function(name,value){
			if(fn=='like'||fn=='ilike'){
				if(value){
					if((value+'').indexOf('*')<0) value = '*' + value + '*';
				}else value = '*'; 
			}
			this.result.push(justep.String.format("{0}={1}.{2}", name, 'inn'!==fn?fn:'in', !$.isArray(value)?value: value.join(',')));
			return this;
		};
	});

	var showError = function(resultData) {
		resultData = resultData || {};
		justep.Util.hint(justep.String.format("错误编码:{0}<br>错误信息:{1}{2}{3}", resultData.code || '无', resultData.message || '未知错误', resultData.hint ? ('<br>' + resultData.hint) : '',
				resultData.details ? ('<br>' + resultData.details) : ''), {
			type : 'danger',
			delay : 8000
		});
	};

	var getTableName = function(name){
		var list = name.split('/');
		return list.join('__')+"__";
	};

	var RestData;
	RestData = Data.extend({
		constructor : function(model, config) {
			this.dataType = "json";
			// 创建filters对象
			this.filters = new Filter();
			this.callParent(model, config);
			this.clz = RestData;
			this.directDeleteMode = true;
		},
		buildUrl : function(params) {
			var webapp_name_prefix = justep.Util.getCookie("WEBAPP-NAME-PREFIX");
			var url = webapp_name_prefix?('/'+webapp_name_prefix+'dbrest'):this.url;
			url = url + "/" + getTableName(this.className);
			if (params) {
				url += "?";
				if ($.isArray(params)) {
					for (var i = 0; i < params.length; i++) {
						url += ((i === 0 ? "" : "&") + params[i]);
					}
				} else
					url += params;
			}
			return url;
		},
		getFilter : function(name) {
			return this.filters.getFilter(name);
		},
		setFilter : function(name, filter) {
			return this.filters.setFilter(name, filter);
		},
		_initDefinition : function(model) {
			this.className = this.definition.className || "";
			this.url = this.definition.url || "";
			this.autoMode = this.definition.autoMode;
			this.join = this.definition.join;
			//this.definition.isAllColumns;
			if(!this._existIDContext(model)){
				if('load'===this.autoMode){
					this.autoLoad = true;
					this.autoNew = false;
				}else if('new'===this.autoMode){
					this.autoLoad = false;
					this.autoNew = true;
				}
			}
			/*
			 * <aggregate>
			 *   <item name="count" fn="count(*)"/>
			 *   <item name="minAge" fn="min(age)"/>
			 * </aggregate>
			 * 
			 * {'count':'count(*)','minAge':'min(age)'}
			 */
			//this.defAgg = this.definition.defAgg;
			this.callParent();
		},
		_init : function(model, config) {
			this.callParent(model, config);
			//增加上下文查询,新增感知
			if (model && config){
				var self = this;
				var doAuto = function(ev) {
					if(self._existIDContext(model)){
						self.clear();
						if('load'===self.autoMode){
							self.refreshData({confirm:false});
						}else if('new'===self.autoMode){
							self.newData({});
						}
					}
				};
				if(justep.ModelBase.MODEL_STATUS_LOAD>model.getStatus()) model.on(justep.ModelBase.PARAMS_RECEIVE_EVENT, doAuto);
				else doAuto();
			}
		},

		/**
		 * 执行保存的动作
		 * 
		 * @param {function}
		 *            callback 回调
		 * @param {boolean}
		 *            useTrans 使用事务，批提交，默认true
		 * @param {boolean}
		 *            ignoreInvalid 保存时忽略有效性校验，默认false
		 * @return {boolean}
		 */
		doSaveData : function(option) {
			var result = false;
			option = option || {};
			var row = option.row || this.getCurrentRow(true);
			if (row) {
				var state = row.data.getRowState(row);
				if (Data.STATE.NEW == state || Data.STATE.EDIT == state) {
					var isNew = Data.STATE.NEW === state;
					var type = isNew ? "POST" : "PATCH";
					var param = !isNew ? justep.String.format("{0}=eq.{1}", this.idColumn, row.getID()) : null;
					var self = this;
					$.ajax({
						type : type,
						dataType : "json",
						contentType : "application/json",
						processData : false,
						url : this.buildUrl(param),
						data : JSON.stringify(row.toJson({
							format : 'simple'
						})),// 提交当前行数据，指定格式返回简单json格式
						complete: function(xhr, textStatus){
							if(xhr.status>=200 && xhr.status<300)
								self._saveSuccess(null, option);
							else
								self._saveError(xhr, option);
						}
					});
					result = true;
				}
			}

			return {
				success : result,
				async : true
			};
		},

		_row2Json : function(row,excludeCalculateCol,excludeCols,simple){
			var ret = this.callParent(row,excludeCalculateCol,excludeCols,simple);
			if(ret) delete ret.userdata;
			return ret;
		},
		
		_saveSuccess : function(data, options) {
			var eventData = {
				source : this,
				data : data
			};
			this.doSaveAfter(true, options, eventData);
		},
		_saveError : function(xhr, options) {
			// 派发error事件
			var eventData = {
				'errorType' : 'server',
				'errorNode' : xhr.responseJSON,
				'httpState' : xhr.status,
				'source' : this
			};
			var b = (options && options.onError && $.isFunction(options.onError)) || this.hasListener(Data.EVENT_SAVEDATA_ERROR);
			if (!b) {
				showError(xhr.responseJSON);
			}
			this.doSaveAfter(false, options, eventData);
		},

		getDeleteParam : function(rowList) {
			if (!rowList)
				return;
			var ids = [];
			var len = rowList.length;
			for (var i = 0; i < len; i++) {
				var row = rowList[i];
				if (Data.STATE.NEW != this.getRowState(row)) {
					ids.push(row.getID());
				}
			}

			return ids.length > 0 ? this.idColumn + "=in." + ids.join(",") : null;
		},

		doDirectDeleteData : function(rows, options) {
			var param = this.getDeleteParam(rows);

			if (!param)
				return {
					success : true,
					async : false
				};

			var self = this;

			if (param) {
				var result = true;
				$.ajax({
					type : "DELETE",
					dataType : "json",
					url : this.buildUrl(param),
					success : function() {
						var eventData = {
							'source' : self,
							'deleteRows' : rows
						};
						self.doDeleteAfter(true, options, eventData);
					},
					error : function(xhr) {
						var onError = options ? options.onError : null;
						var eventData = {
							'errorType' : 'server',
							'errorNode' : xhr.responseJSON,
							'httpState' : xhr.status,
							'source' : self
						};
						var b = (onError && $.isFunction(onError)) || self.hasListener(Data.EVENT_DELETEDATA_ERROR);
						if (!b) {
							showError(xhr.responseJSON);
						}
						self.doDeleteAfter(false, options, eventData);
					}
				});
				return {
					success : result,
					async : true
				};
			}
			return {
				success : true,
				async : false
			};
		},

		doRefreshData : function(options) {
			return this._doRefreshData(this.getOffset(options ? options.parent : null), this.limit, options);
		},

		// 重新实现orderBy
		getOrderBys : function() {
			var ret = [];
			for ( var i=0;i<this.orderBys.length;i++) {
				var o = this.orderBys[i];
				ret.push(justep.String.format("{0}.{1}", o.relation, 0 === o.type ? 'desc' : 'asc'));
			}
			return ret.length>0?"order="+ret.join(","):null;
		},

		_existIDContext: function(model){
			var paramName = this.className+".id";
			return this._existParamContext(model,paramName);					
		},
		
		_existMasterIDContext: function(model){
			var paramName = this.className+".master.id";
			return this._existParamContext(model,paramName);					
		},

		_existMasterRelationContext: function(model){
			var paramName = this.className+".master.column";
			return this._existParamContext(model,paramName);					
		},
		
		_createRefreshParam : function(offset, limit, append, options) {
			var queryParam = {};
			// 主从过滤处理
			if (this.master) {
				//TODO 主从数据查询处理
				var masterData = this.master.masterData, masterRow = masterData.getCurrentRow();
				if (!masterRow)
					return false;
				if (masterData) {
					var masterRowId = masterData.getRowID(masterRow);
					var masterRelationName = this.defCols[this.master.relation].relation;
					queryParam.master = {
						field : masterRelationName,
						value : masterRowId
					};
				}
			}

			// 树形数据处理
			if (this.isTree()) {
				var treeOption = this.defTreeOption.option;
				var parentId = null;
				if (options.parent) {
					queryParam.tree.parentValue = this.getRowID(options.parent);
				}
				this.setFilter("_sys_parent_filter_",justep.String.format("{0}('{1}','{2}')", parentId!==null?"eq":"is", treeOption.parent, parentId));
			}else{
				//增加id自动过滤
				var m = this.getModel();
				var paramName = this.className+".id";
				if(this._existIDContext()){					
					this.setFilter("_sys_id_filter_",justep.String.format("eq('{0}','{1}')",this.idColumn,m.params[paramName]));
				}
				
				if(this._existMasterIDContext() && this._existMasterRelationContext()){
					var masterRelation = m.params[this.concept+".master.column"];
					var masterId = m.params[this.concept+".master.id"];
					if(masterRelation){
						this.setFilter('_sys_master_id_filter_',justep.String.format("eq('{0}','{1}')",masterRelation,masterId));
					}
				}
			}

			var filter = this.buildFilter();
			if (filter)
				queryParam.filter = filter;

			queryParam.offset = offset;
			queryParam.limit = limit;

			//查询全部列时不传递列
			queryParam.columns = this.getSelectColumns();
			
			//生成join
			if(this.join){
				var joins = [];
				$.each(this.join,function(i,join){
					var leftTable = join['leftTable'];
					var rightTable = join['rightTable'];
					var joinOn = join['on'][0];//目前支持一个
					joins.push(justep.String.format("{0}.{1}.{2}.{3}.{4}", getTableName(leftTable),joinOn.leftField,joinOn.fn,getTableName(rightTable),joinOn.rightField));
				});
				queryParam.join = joins.join();
			}
			
			//生成统计列
			if(0===offset && !$.isEmptyObject(this.defAggCols)){
				var temps = [];
				for ( var c in this.defAggCols) {
					temps.push(this.defAggCols[c]);
				}
				queryParam.aggColumns = temps.join();
			}
			var o = this.getOrderBys();
			if (o)
				queryParam.orderBy = o;

			return queryParam;
		},

		hasJoinCol: function(){
			if($.isArray(this.join) && this.join.length>0){
				for(var i=0;i<this.join.length;i++){
					var columns = this.join[i].columns;
					if($.isArray(columns) && columns.length>0) return true;
				}
			}
			return false;
		},
		
		getSelectColumns : function() {
			if(!this.hasJoinCol()){
				return this.definition.isAllColumns?'*':this.getColumnIDs();
			}else{
				var result = [];
				if(this.definition.isAllColumns) result.push(getTableName(this.className)+".*");
				for ( var o in this.defCols) {
					var tableName = this.defCols[o].table;
					if(this.definition.isAllColumns && !tableName) continue;
					tableName = tableName || this.className;
					var field = this.defCols[o].define;
					result.push(justep.String.format("{0}.{1} as {2}", getTableName(tableName), field, o));
				}
				return result.join(this.delim);
			}
		},
		
		_getQueryParam : function(queryParam) {
			var ret = [];
			if(queryParam.columns) ret.push("select="+queryParam.columns);
			if(queryParam.join) ret.push("join="+queryParam.join);
			if(queryParam.orderBy) ret.push(queryParam.orderBy);
			if($.isArray(queryParam.filter))
				$.each(queryParam.filter, function(i,filter){
					ret.push(filter);
				});
			return ret.length>0?ret:null; 
		},
		
		_getQueryAggregateParam : function(queryParam) {
			var ret = [];
			if(queryParam.aggColumns) ret.push("select="+queryParam.aggColumns);
			if($.isArray(queryParam.filter))
				$.each(queryParam.filter, function(i,filter){
					ret.push(filter);
				});
			return ret.length>0?ret:null; 
		},

		_processFilter : function(filter, variables){
			var ctx = new FilterContext(this.getModel(),this,variables);
			try{
				/* jshint -W085 */
				with (ctx) {
					/*jshint +W085 */
					eval('(' + filter + ')');
				}
			}catch(e){
				throw justep.Error.create("过滤表达式["+filter+"]处理时存在问题,详细信息:"+(e.message||""));
			}
			return ($.isArray(ctx.result) && ctx.result.length>0)?ctx.result:null;
		},

		buildHaving : function() {
			var ret = [];
			var havings = this.defAgg.havings;
			for ( var o in havings) {
				var having = havings[o];
				if (!having) continue;
				var s = this._processFilter(having,null);
				if($.isArray(s)) ret = ret.concat(s);
			}

			return ret.length>0?ret:null;
		},
		
		buildFilter : function() {
			var ret = [];
			var filterList = this.filters.filterList;
			var variables = this.filters.variables;
			for ( var o in filterList) {
				var filter = filterList[o];
				if (!filter) continue;
				var s = this._processFilter(filter,variables);
				if($.isArray(s)) ret = ret.concat(s);
			}

			return ret.length>0?ret:null;
		},

		_doRefreshData : function(offset, limit, options) {
			var onError = null, onSuccess = null, onLoad;
			if (options) {
				if ($.isFunction(options))
					onSuccess = options;
				else {
					onError = options.onError;
					onSuccess = options.onSuccess;
					onLoad = options.onLoad;
				}
			}

			var queryParam = this._createRefreshParam(offset, limit, options ? options.append : false, options);
			if (!queryParam)
				return false;

			var params = this._getQueryParam(queryParam);
			var headers = {};
			if ($.isNumeric(queryParam.limit) && queryParam.limit > 0) {
				headers['Range-Unit'] = 'items';
				headers['Range'] = justep.String.format("{0}-{1}", queryParam.offset, queryParam.offset + queryParam.limit - 1);
			}

			var self = this;
			$.ajax({
				type : "GET",
				dataType : "json",
				headers : headers,
				url : this.buildUrl(params),
				success : function(resultData, textStatus, jqXHR) {
					var o = resultData;
					if (0 === offset) {// 需要放在前面
						var count = jqXHR.getResponseHeader('Content-Range');
						if (count) {
							var ipos = count.lastIndexOf("/");
							if (ipos > -1)
								count = count.substring(ipos + 1);
							count = parseInt(count, 10);
							self.setTotal(count, options ? options.parent : null);
						}
					}
					if (onLoad && $.isFunction(onLoad))
						onLoad({
							source : self,
							rows : o
						});
					self.loadData(o, options ? options.append : false, options ? options.parent : null);
					var eventData = {
						source : self,
						rows : o
					};
					self.doRefreshAfter(true, options, eventData);
				},
				error : function(xhr) {
					var eventData = {
						'errorType' : 'server',
						'errorNode' : xhr.responseJSON,
						'httpState' : xhr.status,
						'source' : self
					};
					var b = (onError && $.isFunction(onError)) || self.hasListener(Data.EVENT_REFRESHDATA_ERROR);
					if (!b) {
						showError(xhr.responseJSON);
					}
					self.doRefreshAfter(false, options, eventData);
				}
			});
			
			//默认查询首页数据时查询统计数据
			if(0===queryParam.offset && !$.isEmptyObject(this.defAggCols)){
				this.refreshAggregateValue(options ? options.parent : null);
			}
			
			return {
				success : true,
				async : true
			};
		},
		
		refreshAggregateValue: function(parent){
			var queryParam = this._createRefreshParam(0, 20, false, {parent:parent});
			if (!queryParam)
				return false;
			var params = this._getQueryAggregateParam(queryParam);
			var self = this;
			$.ajax({
				type : "GET",
				dataType : "json",
				url : this.buildUrl(params),
				success : function(resultData, textStatus, jqXHR) {
					var o = $.isArray(resultData)?(resultData.length>0?resultData[0]:{}):resultData,fn;
					for ( var c in self.defAggCols) {
						fn = self.defAggCols[c];
						if(o.hasOwnProperty(fn))
							self.setUserData(c, o[fn], parent);
					}

				},
				error : function(xhr) {
					showError(xhr.responseJSON);
				}
			});
		},
		
		_newDataDefaultvalue : function(rows){
			if (!rows || rows.length <= 0)
				rows = [ {} ];
			var idColumn = this.idColumn;
			var defcol = this.defCols[idColumn];
			if(defcol){
				$.each(rows, function(i,row){
					if(row && !row.hasOwnProperty(idColumn)){
						if('String'===defcol.type) row[idColumn] = justep.UUID.createUUID();
					}						
				});
			}
			//处理上下文默认打开传递的参数
			var m = this.getModel();
			if(this._existMasterIDContext() && this._existMasterRelationContext()){
				var masterRelation = m.params[this.concept+".master.column"];
				var masterRowId = m.params[this.concept+".master.id"];
				if(masterRelation){
					$.each(rows, function(i,row){
						row[masterRelation] = masterRowId;
					});
				}
			}
			return rows;
		},
		
		doNewData : function(rows, options) {
			rows = this._newDataDefaultvalue(rows);
			return this.callParent(rows, options);
		}
	});

	return RestData;
});