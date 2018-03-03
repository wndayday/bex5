/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Data = require('$UI/system/components/justep/data/data');
	var RestData = require('$UI/system/components/justep/data/restData');
	var url = require.normalizeName("./dataOperation");
	var ComponentConfig = require("./dataOperation.config");
	var Expr = justep.Express;
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");

	require('$UI/system/resources/system.res');

	var DataOperation = justep.ModelComponent.extend({
		constructor : function(model,xid) {
			this.callParent();
			this._init(model,xid);
		},
		_init : function(model,xid){
			this.setModel(model);
			model.registerComponent(xid, this);
			model.resolvedComponent(xid);
		},
		getConfig : function() {
			return ComponentConfig;
		},
		setValue: function(dataXid,col,value,row){
			var model = this.getModel();
			var data = typeof(dataXid)==='string'?model.comp(dataXid):dataXid;
			if(data instanceof Data){
				data.setValue(col,value,row);
			}else{
				var msg = new justep.Message(justep.Message.JUSTEP231002, dataXid);//data[{0}]不存在！
				throw justep.Error.create(msg);
			}
		},
		allSetValue: function(dataXid,col,value){
			var model = this.getModel();
			var data = typeof(dataXid)==='string'?model.comp(dataXid):dataXid;
			if(data instanceof Data){
				data.each(function(param){
					param.row.val(col,value);
				});
			}else{
				var msg = new justep.Message(justep.Message.JUSTEP231002, dataXid);//data[{0}]不存在！
				throw justep.Error.create(msg);
			}
		},
		refreshByGET: function(url,sync,event){
			var compData = event.source;
			if(compData instanceof Data){
				var deferred = $.Deferred();
				event.promise = deferred.promise();
				$.ajax({
					type: "GET",
					url: url,
					dataType: 'json',
					async: !sync,//使用同步方式，目前data组件有同步依赖
					success: function(data){
						compData.loadData(data);//将返回的数据加载到data组件
						deferred.resolve();
					},
					error: function(){
						deferred.reject();
						var msg = new justep.Message(justep.Message.JUSTEP231142, url);//"url["+url+"]加载数据失败"
						throw justep.Error.create(msg);
					}
				});
			}
		},
		_getResult: function(data,filter){
			var m = this.getModel();
			var ret = [];
			if(data instanceof Data){				
				data.eachByPeek(function(param){
					var row = param.row;
					var ctx = {$model:m,$row:row};
					if (!(filter instanceof Expr) || Expr.eval(filter, row, ctx))
						ret.push(row.toJson({
							format : 'simple'
						}));
				});
			}
			return ret;
		},
		saveReturn: function(data,filter){
			var m = this.getModel();
			if(data instanceof Data){
				var self = this;
				var fn = function(){
					if($.isFunction(m.owner.send))
						m.owner.send(self._getResult(data,filter));
					m.owner.close();
				};
				if(data.isChanged()) 
					data.saveData({onSuccess:fn});
				else fn();
			}else m.owner.close();
		},
		_createWinDlg: function(dlgXid,dataXid,option){
			var m = this.getModel();
			//创建对话框
			var dlgCfg = $.extend({},option.dlgOption,{
					showTitle : justep.Browser.isPC,
					src : option.src,
					xid : dlgXid,
					status:!justep.Browser.isPC?'maximize':'normal',
					parentNode : m.getRootNode()
			});
			var dlg = new WindowDialog(dlgCfg);
			if(dataXid){
				//创建对话框mapping
				var data = dataXid instanceof Data?dataXid:m[dataXid];
				if(data instanceof Data){
					var idCol = data.idColumn;
					var mapping = {dataID:dataXid,operation:'edit',mappings:[],locfrom:[idCol],locto:[idCol],disableRecordChange:true};
					for ( var o in data.defCols) {
						mapping.mappings.push({from:o,to:o});
					}
					dlg['__mapping_def__'] = mapping;
				}
			}
			return dlg;
		},
		openWindowDialog: function(dlgXid,dataXid,option){
			//option: src,params
			var m = this.getModel();
			var dlg = m.comp(dlgXid);
			if(!dlg){
				dlg = this._createWinDlg(dlgXid,dataXid,option);
			}
			
			var data = dataXid instanceof Data?dataXid:m.comp(dataXid);
			if(data && data.className){
				if(!option.params) option.params = {};
				var pname = data.className + '.id';
				if(!option.params.hasOwnProperty(pname))
					option.params[pname] = data.getRowID();
			}

			dlg.open(option);
		},
		deleteData: function(data,filter){
			if(data instanceof Data){
				var m = this.getModel();
				var rows = [];
				if(filter instanceof Expr){//有条件按条件删除
					data.eachByPeek(function(param){
						var row = param.row;
						var ctx = {$model:m,$row:row};
						if (!(filter instanceof Expr) || Expr.eval(filter, row, ctx))
							rows.push(row);
					});
					if(rows.length>0) data.deleteData(rows,{async:true});
				}else{//否则删除当前行
					data.deleteData(null,{async:true});
				} 
			}
		},
		saveData: function(data){
			if(data instanceof RestData){
				data.eachByPeek(function(param){
					var row = param.row;
					data.saveData({row:row});
				});
			}else if(data instanceof Data){
				data.saveData();
			}
		},
		openWebPage: function(url, kind){
			if(url){
				if(url.substring(0,3).toLowerCase() !== 'http') url = 'http://'+url;
				kind = kind || 'window';
				if('window'===kind) window.open(url, "_system");
				else{
					justep.Shell.showPage({iframeFunc:url,url:'$UI/system/components/justep/dataOperation/plugin/iframeFunc.w'});
				}
			}
		},
		_get$domNode: function(selector){
			var m = this.getModel();
			return m.getElementByXid(selector);
		},
		setCSS: function(selector, style){
			var $domNode = this._get$domNode(selector);
			$($domNode).css(style || {});
		},
		addClass: function(selector, clazz){
			if(clazz){
				var $domNode = this._get$domNode(selector);
				$($domNode).addClass(clazz);
			}
		},
		removeClass: function(selector, clazz){
			if(clazz){
				var $domNode = this._get$domNode(selector);
				$($domNode).removeClass(clazz);
			}
		},
		toggleClass: function(selector, clazz){
			if(clazz){
				var $domNode = this._get$domNode(selector);
				$($domNode).toggleClass(clazz);
			}
		}
	});

	// 操作
	justep.Component.addOperations(DataOperation, {
		'setValue' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231134),//'data赋值'
			argsDef : [ {
				name : 'data',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231137),//'data组件'
				required : true
			},{
				name : 'col',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231139),//'列'
				required : true
			},{
				name : 'value',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231140),//'值'
				required : true
			},{
				name : 'row',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231138),//'行,缺省当前行'
			} ],
			method : function(args) {				
				return this.owner.setValue(args.data,args.col,args.value,args.row);
			}
		},
		'allSetValue' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231135),//'data所有行赋值'
			argsDef : [ {
				name : 'data',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231137),//'data组件'
				required : true
			},{
				name : 'col',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231139),//'列'
				required : true
			},{
				name : 'value',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231140),//'值'
				required : true
			} ],
			method : function(args) {
				return this.owner.allSetValue(args.data,args.col,args.value);
			}
		},
		'refreshByGET' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231136),//'get请求'
			argsDef : [ {
				name : 'url',
				displayName : 'url',
				required : true
			},{
				name : 'sync',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231141),//'同步请求，默认异步'
			}],
			method : function(args,ctx) {
				return this.owner.refreshByGET(args.url,args.sync,ctx.$event);
			}
		},
		'saveReturn' : {
			argsDef: [{name:'data',displayName:'数据'},{name:'filter',displayName:'返回数据过滤'}],
			method : function(args,ctx) {
				var filter = args.filter;
				var data = args.data instanceof Data?args.data:(ctx.$model[args.data] || Data.getMainData(ctx.$model));
				if (filter && 'string' == typeof (filter))
					filter = new Expr(filter);
				this.owner.saveReturn(data,filter);
			}
		},
		'deleteData' : {
			argsDef: [{name:'data',displayName:'数据'},{name:'filter',displayName:'删除数据过滤'}],
			method : function(args,ctx) {
				var filter = args.filter;
				if (filter && 'string' == typeof (filter))
					filter = new Expr(filter);
				var data = ctx.$model[args.data];
				if(data instanceof Data){
					this.owner.deleteData(data,filter);
				}else if(ctx.$object&&ctx.$object instanceof Data.Row){
					ctx.$object.data.deleteData([ctx.$object],{async:true});
				}else if(Data.getMainData(ctx.$model)){
					this.owner.deleteData(Data.getMainData(ctx.$model),filter);
				}
			}
		},
		'saveData' : {
			argsDef: [{name:'data',displayName:'数据'}],
			method : function(args,ctx) {
				var filter = args.filter;
				if (filter && 'string' == typeof (filter))
					filter = new Expr(filter);
				var data = ctx.$model[args.data];
				if(data instanceof Data){
					this.owner.saveData(data);
				}else if(ctx.$object&&ctx.$object instanceof Data.Row){
					ctx.$object.data.saveData({row:ctx.$object});
				}else if(Data.getMainData(ctx.$model)){
					this.owner.saveData(Data.getMainData(ctx.$model),filter);
				}
			}
		},
		'openWindowDialog' : {
			argsDef: [{name:'url',displayName:'页URL'},{name:'params',displayName:'参数'},{name:'receData',displayName:'数据对象'},{name:'option',displayName:'对话框配置'}],
			method : function(args,ctx) {
				//对话框打开,ctx.$object
				var option = {src:args.url,params:(args.params||{}),dlgOption:(args.option||{})};
				var dataXid,data,concept,mData,row;
				if(args.receData){
					dataXid = args.receData;
					data = Data.$(ctx.$model,dataXid);
					concept = data.className||data.concept;
					row = data.getCurrentRow(true);
					if(row) option.params[concept+'.id'] = row.getID();
					//增加主从的参数，传递concept.master.id和concept.master.column
					if(data.master && data.master.masterData instanceof Data){
						mData = data.master.masterData;
						row = mData.getCurrentRow(true);
						if(row){
							option.params[concept+'.master.id'] = row.getID();
							if(data.master.relation) option.params[concept+'.master.column'] = data.master.relation;
						}
					}
				}else if(ctx.$object&&ctx.$object.data&&(ctx.$object.data.className||ctx.$object.data.concept)&&$.isFunction(ctx.$object.getID)){
					data = ctx.$object.data;
					concept = data.className||data.concept;
					option.params[concept+'.id'] = ctx.$object.getID();
					dataXid = data.xid;
					//增加主从的参数，传递concept.master.id和concept.master.column
					if(data.master && data.master.masterData instanceof Data){
						mData = data.master.masterData;
						row = mData.getCurrentRow(true);
						if(row){
							option.params[concept+'.master.id'] = row.getID();
							if(data.master.relation) option.params[concept+'.master.column'] = data.master.relation;
						}
					}
				}else if(Data.getMainData(ctx.$model)){
					var mainData = Data.getMainData(ctx.$model);
					if(mainData instanceof Data){
						var currRow = mainData.getCurrentRow(true);
						if(currRow){
							concept = mainData.className||mainData.concept;
							option.params[concept+'.id'] = currRow.getID();
						}
						dataXid = mainData.xid;
						//增加主从的参数，传递concept.master.id和concept.master.column
						if(mainData.master && mainData.master.masterData instanceof Data){
							mData = mainData.master.masterData;
							row = mData.getCurrentRow(true);
							if(row){
								option.params[concept+'.master.id'] = row.getID();
								if(mainData.master.relation) option.params[concept+'.master.column'] = mainData.master.relation;
							}
						}
					}
				}
				
				if(ctx.$event){
					var dlgXid;
					if(ctx.$event.source&&ctx.$event.source.$domNode) dlgXid = '_'+ctx.$event.source.$domNode.attr('xid')+'_dlg_';
					else if(ctx.$event.currentTarget) dlgXid = '_'+$(ctx.$event.currentTarget).attr('xid')+'_dlg_';
					else dlgXid = (new Date()).getTime();
					if(dlgXid) this.owner.openWindowDialog(dlgXid,dataXid,option);
				}
			}
		},
		'openPage' : {
			argsDef: [{name:'url',displayName:'页URL'},{name:'params',displayName:'参数'},{name:'data',displayName:'数据对象'}],
			method : function(args,ctx) {
				var params = args.params||{},concept,mData,row,dataXid,data;
				if(args.data){
					dataXid = args.data;
					data = Data.$(ctx.$model,dataXid);
					concept = data.className||data.concept;
					row = data.getCurrentRow(true);
					if(row) params[concept+'.id'] = row.getID();
					//增加主从的参数，传递concept.master.id和concept.master.column
					if(data.master && data.master.masterData instanceof Data){
						mData = data.master.masterData;
						row = mData.getCurrentRow(true);
						if(row){
							params[concept+'.master.id'] = row.getID();
							if(data.master.relation) params[concept+'.master.column'] = data.master.relation;
						}
					}
				}else if(ctx.$object&&ctx.$object.data&&(ctx.$object.data.className||ctx.$object.data.concept)&&$.isFunction(ctx.$object.getID)){
					data = ctx.$object.data;
					concept = data.className||data.concept;
					params[concept+'.id'] = ctx.$object.getID();
					//增加主从的参数，传递concept.master.id和concept.master.column
					if(data.master && data.master.masterData instanceof Data){
						mData = data.master.masterData;
						row = mData.getCurrentRow(true);
						if(row){
							params[concept+'.master.id'] = row.getID();
							if(data.master.relation) params[concept+'.master.column'] = data.master.relation;
						}
					}
				}else if(Data.getMainData(ctx.$model)){
					var mainData = Data.getMainData(ctx.$model);
					if(mainData instanceof Data){
						var currRow = mainData.getCurrentRow(true);
						if(currRow){
							concept = mainData.className||mainData.concept;
							params[concept+'.id'] = currRow.getID();
						}
						//增加主从的参数，传递concept.master.id和concept.master.column
						if(mainData.master && mainData.master.masterData instanceof Data){
							mData = mainData.master.masterData;
							row = mData.getCurrentRow(true);
							if(row){
								params[concept+'.master.id'] = row.getID();
								if(mainData.master.relation) params[concept+'.master.column'] = mainData.master.relation;
							}
						}
					}
				}
				justep.Shell.showPage(args.url, params);
			}
		},
		'openWebPage' : {
			argsDef: [{name:'url',displayName:'网页地址'},{name:'kind',displayName:'打开模式'}],
			method : function(args,ctx) {
				this.owner.openWebPage(args.url, args.kind);
			}
		},
		'setCSS' : {
			argsDef: [{name:'selector',displayName:'选择器'},{name:'style',displayName:'样式'}],
			method : function(args,ctx) {
				this.owner.setCSS(args.selector, args.style);
			}
		},
		'addClass' : {
			argsDef: [{name:'selector',displayName:'选择器'},{name:'clazz',displayName:'样式class'}],
			method : function(args,ctx) {
				this.owner.addClass(args.selector, args.clazz);
			}
		},
		'removeClass' : {
			argsDef: [{name:'selector',displayName:'选择器'},{name:'clazz',displayName:'样式class'}],
			method : function(args,ctx) {
				this.owner.removeClass(args.selector, args.clazz);
			}
		},
		'toggleClass' : {
			argsDef: [{name:'selector',displayName:'选择器'},{name:'clazz',displayName:'样式class'}],
			method : function(args,ctx) {
				this.owner.toggleClass(args.selector, args.clazz);
			}
		},
		'loadData' : {
			argsDef: [{name:'data',displayName:'数据组件'},{name:'rows',displayName:'数据'},{name:'append',displayName:'增量模式'}, {name:'override',displayName:'覆盖模式'}],//{name:'parent',displayName:'父'}, {name:'index',displayName:'加载位置'},
			method : function(args,ctx) {
				if(args.data){
					var data = args.data;
					if('string'==typeof(data))
						data = Data.$(ctx.$model, data);
					if(data instanceof Data){
						var rows = args.rows || [], append = args.append, parent = args.parent, index = args.index, override = args.override;
						var ret = data.loadData(rows, append, parent, index, override);
						if($.isArray(ret) && ret.length>0) data.to(ret[0]);
					}else justep.Util.hint("加载数据时指定的数据组件["+args.data+"]不存在");
				}else justep.Util.hint("加载数据操作必须指定数据组件");
			}
		}
	});

	justep.Component.register(url, DataOperation);
	return DataOperation;
});