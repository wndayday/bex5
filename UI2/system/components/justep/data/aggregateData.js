define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Data = require("./data");
	var RestData = require("./restData");

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

		set : function(name, filter) {
			this.filterList[name] = filter;
		},

		get : function(name) {
			return this.filterList[name];
		},

		remove : function(name) {
			delete this.filterList[name];
		}
	};
	
	var FilterContext = function(model,data,vars){
		$.extend(this, {$model:model,$data:data}, vars);
		this.result = [];
	};
	
	var filterFNs = ['eq', 'gt', 'lt', 'gte', 'lte', 'like', 'ilike', 'not'];
	
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

	var AggData;
	AggData = RestData.extend({
		constructor : function(model, config) {
			this.dataType = "json";
			// 创建filters对象
			this.havings = new Filter();
			this.groupBy = [];
			this.callParent(model, config);
			this.clz = AggData;
		},
		getHaving : function(name) {
			return this.havings.get(name);
		},
		setHaving : function(name, filter) {
			return this.havings.set(name, filter);
		},
		_initDefinition : function(model) {
			this.callParent();
			this.autoMode = "";
			//关联的data xid
			this.by = this.definition.by;
			//统计中的分组查询
			if(this.definition.groupBy) this.groupBy = this.definition.groupBy;
			// 处理定义的havings
			// 格式{'filterName':having,...}
			var havings = this.definition.havings;
			for ( var o in havings)
				this.setHaving(o, havings[o]);
		},
		_initDefCols : function() {
			//格式{'别名':{'type类型':'string','field':'对应字段名','label':'','fn':'统计函数/count/sum/avg/min/max'}}
			this.callParent();
			//增加统计的aggDef
			$.each(this.defCols,function(n,v){
				if(v.fn && v.field){
					v['aggDef']=justep.String.format('{0}({1})', v.fn, v.field);
				}
			});
			//处理列定义固定的id列
			this.idColumn = 'idCol';
			this.defCols[this.idColumn] = {type:'String',label:'ID列'};
		},
		_init : function(model, config) {
			this.callParent(model, config);
		},
		_createReadonly : function() {
			this.definition.readonly = "true";
			this.callParent();
		},
		saveData : function(option) {
			showError("不支持保存");
		},
		
		newData : function(option) {
			showError("不支持新增");
		},

		deleteData : function(option) {
			showError("不支持删除");
		},

		_row2Json : function(row,excludeCalculateCol,excludeCols,simple){
			var ret = this.callParent(row,excludeCalculateCol,excludeCols,simple);
			if(ret) delete ret.userdata;
			return ret;
		},

		doRefreshData : function(options) {
			this.byData = Data.$(this.getModel(), this.by);
			if(this.byData instanceof RestData){
				this.className = this.byData.className;
				this.url = this.byData.url;
			}
			if(this.className && this.url)
				return this._doRefreshData(this.getOffset(options ? options.parent : null), this.limit, options);
			else showError("缺少url或者className定义");
		},
		
		_getSelectCol: function(){
			var ret = [];
			var groupBy = this.groupBy;
			$.each(this.defCols,function(n,v){
				if(v.aggDef) ret.push(v.aggDef);
				else if(groupBy.indexOf(n)>-1) ret.push(n); 
			});
			return ret.join();
		},
		
		_getGroupBy: function(){
			return this.groupBy.join();
		},
		
		_createRefreshParam : function(offset, limit, append, options) {
			var queryParam = {};

			var filter = this.buildFilter();
			if (filter)
				queryParam.filter = filter;
			
			var having = this.buildHaving();
			if (having)
				queryParam.having = having;

			queryParam.columns = this._getSelectCol();
			
			queryParam.groupBy = this._getGroupBy();
			
			var o = this.getOrderBys();
			if (o)
				queryParam.orderBy = o;

			return queryParam;
		},

		_getQueryParam : function(queryParam) {
			var ret = [];
			if(queryParam.columns) ret.push("select="+queryParam.columns);
			if(queryParam.orderBy) ret.push(queryParam.orderBy);
			if($.isArray(queryParam.filter))
				$.each(queryParam.filter, function(i,filter){
					ret.push(filter);
				});
			if($.isArray(queryParam.having))
				$.each(queryParam.having, function(i,filter){
					ret.push('having::'+filter);
				});
			if(queryParam.groupBy) ret.push("groupby="+queryParam.groupBy);
			return ret.length>0?ret:null; 
		},
		
		_processHaving : function(filter, variables){
			var ctx = new FilterContext(this.getModel(),this,variables);
			try{
				/* jshint -W085 */
				with (ctx) {
					/*jshint +W085 */
					eval('(' + filter + ')');
				}
			}catch(e){
				throw justep.Error.create("统计过滤表达式["+filter+"]处理时存在问题,详细信息:"+(e.message||""));
			}
			return ($.isArray(ctx.result) && ctx.result.length>0)?ctx.result:null;
		},

		buildHaving : function() {
			var ret = [];
			var havings = this.havings.filterList;
			var variables = this.havings.variables;
			for ( var o in havings) {
				var having = havings[o];
				if (!having) continue;
				var s = this._processHaving(having,variables);
				if($.isArray(s)) ret = ret.concat(s);
			}

			return ret.length>0?ret:null;
		},
		
		buildFilter : function() {
			return this.byData?this.byData.buildFilter():this.callParent();
		},
		//处理统计字段
		_processRow: function(row){
			if(row){
				$.each(this.defCols,function(n,v){
					if(v.aggDef) row[n] = row[v.aggDef];
				});
			}
			return row;
		},
		//重新实现add,完成id列的初始赋值和统计列值转换
		add : function(row, parent, disableCursor, nopush) {
			row = this._processRow(row);
			return this.callParent(row, parent, disableCursor, nopush);
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

			var self = this;
			$.ajax({
				type : "GET",
				dataType : "json",
				headers : headers,
				url : this.buildUrl(params),
				success : function(resultData, textStatus, jqXHR) {
					var o = resultData;
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
			
			return {
				success : true,
				async : true
			};
		}
	});

	return AggData;
});