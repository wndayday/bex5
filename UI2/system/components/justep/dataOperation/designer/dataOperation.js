/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require('css!./css/operation').load();
	
	//var justep = require("$UI/system/lib/justep");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var RTDataOperation = require("$UI/system/components/justep/dataOperation/dataOperation");
	//var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	//var xuiDoc = xuiService.getXuiDoc();
	
	var DataOperation = RTDataOperation.extend({
		constructor : function(config) {
			if (config && config.templateNode) {
				this._bind(config.templateNode);
			}
			this.callParent(config);
		},
		init : function(value, bindingContext) {
			var xid = this.$domNode.attr("xid");
			this.$domNode.addClass('x-operation').empty().append("<img align='absmiddle'/><span>" + (xid?xid:'') + "</span>");
			var model = this.getModel();
			model.registerComponent(xid, this);
			model.resolvedComponent(xid);
			if(this.ownerDesigner || this.ownerDesigner.isQuickIde){
				this.$domNode.hide();
			}
		},
		_bind : function(element) {
			bind.utils.domData.set(element, Component.BIND_NAME, this);
			this.domNode = element;
			this.$domNode = $(this.domNode);
			bind.utils.domNodeDisposal.addDisposeCallback(element, this.dispose.bind(this));
		},
		_init: function(){
			//没有实现，设计时和运行时差异
		}
	});
	
	var regParamEditor = function(propEditorMng){
		var pageParamSelector = {
				url : "$UI/system/components/justep/dataOperation/designer/pageParam.w",
				buildTemplate : function(propConfig) {
					return "<div class='editor-container' style='position:relative;'>"
							+ "	<input "
							+ propEditorMng.buildCommonAttr(propConfig)
							+ "   readonly style='width:100%;padding-right:56px;' />"
							+ "   <span title='参数设置' class='dialog-btn icon-ios7-more' style='background:#efefef; display:block;width:22px;padding-left:5px;;z-index:100;position:absolute;top:1px;height:26px;line-height:26px;font-size:12px;right:1px'></span>"
							+ "</div>";
				}
			};
		propEditorMng.regEditorBuilder("pageParamSelector", pageParamSelector, "combo");
		
		var styleParamSelector = {
				url : "$UI/system/components/justep/dataOperation/designer/styleParam.w",
				buildTemplate : function(propConfig) {
					return "<div class='editor-container' style='position:relative;'>"
							+ "	<input "
							+ propEditorMng.buildCommonAttr(propConfig)
							+ "   readonly style='width:100%;padding-right:56px;' />"
							+ "   <span title='样式设置' class='dialog-btn icon-ios7-more' style='background:#efefef; display:block;width:22px;padding-left:5px;;z-index:100;position:absolute;top:1px;height:26px;line-height:26px;font-size:12px;right:1px'></span>"
							+ "</div>";
				}
			};
		propEditorMng.regEditorBuilder("styleParamSelector", styleParamSelector, "combo");
		
		var openWindowKindList = {
				dynData : function(config) {
					var items = [['window','浏览器打开(缺省)'],['iframe','嵌入式打开']];
					return items;
				}
			};
		propEditorMng.regEditorBuilder("openWindowKindList", openWindowKindList, "combo");

		var DOMNodeSelector = {
				dynData : function(config) {
					var idName = config.propEditorMng.mainModel.callDesignerMethod("getIdName");
					var nodeList = config.propEditorMng.mainModel.callDesignerMethod("queryModelElements", "a,button,input,div");
					var items = [];
					var fn = function() {
						var xid = this.getAttribute(idName);
						var label = this.getAttribute("label") || xid;
						if (xid) {
							items.push([ xid, label ]);
						}
					};
					for (var i = 0; i < nodeList.length; i += 1) {
						$(nodeList[i]).children().each(fn);
					}
					return items;
				}
			};
		propEditorMng.regEditorBuilder("DOMNodeSelector", DOMNodeSelector, "combo");
	};

	var quickIdeEx = {
			regPropEditor:function(propEditorMng){
				regParamEditor(propEditorMng);
			},
			"$UI/system/components/justep/dataOperation/dataOperation":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
						      designer.getCommonStyleItem('baseStyle'),
						      designer.getCommonStyleItem('position'),
						];
				},
				//操作配置
				operations:function(){
					return [
					         {
					        	groupName:"数据",
					        	items:[ 
		                           {name:'setValue',label:"赋值",
		                        	   argExtends:{value:{editor:'jsExpressionEX'},data:{editor:"dataXidEditor"},
		                        	   col:{editor:"dataRef",'editor-parameter':{"isRelation":"true","data":"data","hasLabel":"false"}},
		                        	   }},
		                           {name:'allSetValue',label:"所有行赋值",
		                        		   argExtends:{value:{editor:'jsExpressionEX'},data:{editor:"dataXidEditor"},
		                        	   col:{editor:"dataRef",'editor-parameter':{"isRelation":"true","data":"data","hasLabel":"false"}},
		                        	   }},
		                           {name:'refreshByGET',label:"请求数据",argExtends:{sync:{editor:"booleanList"}}},
		                           {name:'saveData',label:"保存",argExtends:{data:{editor:"dataXidEditor"}}},
		                           {name:'saveReturn',label:"保存并返回",argExtends:{data:{editor:"dataXidEditor"}}},
		                           {name:'deleteData',label:"删除",argExtends:{data:{editor:"dataXidEditor"}}},	                           
		                           {name:'loadData',label:"加载数据",argExtends:{data:{editor:"dataXidEditor"},rows:{editor:'jsExpressionEX'},append:{editor:'booleanList'},override:{editor:'booleanList'}}}	                           
	                           ]
					         },	                           
                             {
					        	 groupName:"页面操作",
	                        	 items:[
	 		                           {name:'openWindowDialog',label:"打开对话框",argExtends:{params:{label:"参数",editor:'pageParamSelector'},url:{editor:'pageUrlEditor'},receData:{editor:"dataXidEditor"}}},
			                           {name:'openPage',label:"打开页面",argExtends:{params:{label:"参数",editor:'pageParamSelector'},url:{editor:'pageUrlEditor'},data:{editor:"dataXidEditor"}}},
	                        	       {name:'close',label:"关闭页面"},
	                        	       {name:'openWebPage',label:"打开外部页面",argExtends:{url:{},kind:{editor:'openWindowKindList'}}}
	                        	 ]
	                         },
                             {
					        	 groupName:"样式操作",
	                        	 items:[
	 		                           {name:'setCSS',label:"设置样式",argExtends:{selector:{label:"展现组件",editor:'compSelector'},style:{editor:'styleParamSelector'}}},
			                           {name:'addClass',label:"添加Class",argExtends:{selector:{label:"展现组件",editor:'compSelector'},clazz:{editor:'jsExpressionEX'}}},
	                        	       {name:'removeClass',label:"移除Class",argExtends:{selector:{label:"展现组件",editor:'compSelector'},clazz:{editor:'jsExpressionEX'}}},
	                        	       {name:'toggleClass',label:"切换Class",argExtends:{selector:{label:"展现组件",editor:'compSelector'},clazz:{editor:'jsExpressionEX'}}}
	                        	 ]
	                         }
	                ];
				}
			}
	};
	return {
		'$UI/system/components/justep/dataOperation/dataOperation' : DataOperation,quickIdeEx:quickIdeEx
	};
});