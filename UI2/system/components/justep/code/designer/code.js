/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require('css!./css/code').load();
	var Babel = require('../babel.min');
	require('../polyfill.min');
	//var justep = require("$UI/system/lib/justep");
	var RTCode = require("$UI/system/components/justep/code/code");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var CodeEditorHelper = require("$UI/system/designer/webIde/bizDesigner/codeProcess/codeEditorHelper");

	var getParams = function(codeParams){
		if(codeParams){
			try{
				codeParams = eval('('+codeParams+')');
			}catch(e){
				//忽略json序列化错误}
				codeParams = [];
			}
		}
		return codeParams;
	};
	
	var Code = RTCode.extend({
		init : function(value, bindingContext) {
			var xid = this.$domNode.attr("xid");
			this.callParent();
			this.$domNode.append("<div class='x-code'><img align='absmiddle' /><span>" + (xid?xid:'') + "</span></div>");
			var codeParams = xuiDoc.get(this, "params");
			this.params = getParams(codeParams);
			this.$xmlNode = $(this.ownerDesigner.getModelNodeByXid(xid));
		},
		getOperationDefs : function() {
			var operationDefs = this.callParent();
			operationDefs = $.extend({},operationDefs);
			if (operationDefs) {
				for ( var name in operationDefs) {
					var op = this.getOperation(name);
					if(op && $.isFunction(op.argsDef)){
						operationDefs[name].argsDef = op.argsDef();
					}
				}
			}
			return operationDefs;
		},
		set: function(param,option){
			
			if(option && option.name==="xid"){
				this.$domNode.find('.x-code > span').text(option.value);
				var code = xuiDoc.getJSMethodContent({
					name : option.oldValue
				});				
				if(code)xuiDoc.saveJsMethod({oldName:option.oldValue,name:option.value,params:code.params,content:code.content});
			}else{
				this.callParent(param);
			}
		},
		get: function(name){
			if(name==='params' && typeof(this.params)==='string'){
				return getParams(this.params);
			}else return this.callParent(name);
		},
		/*codeEditor: function(config){
			var self = this;
			var codeParams = xuiDoc.get(self, "params"),xid = xuiDoc.get(this, "xid");
			xuiService.openPage("$UI/system/components/justep/code/designer/codeEditor.w", {
				title : "code编辑",
				codeParams : codeParams,
				height: 600,
				width: 800,
				name: xid
			}, function(result) {
				var params = result.params;
				self.params = params;
				if(params) params = JSON.stringify(params);
				xuiDoc.set(self, {params: params});
				var ps = [],xid = xuiDoc.get(self, "xid");
				if($.isArray(result.params)) $.each(result.params,function(i,param){
					ps.push(param.name);
				});
				xuiDoc.saveJsMethod({oldName:xid,name:xid,params:ps.join(","),content:result.code||""});
			});
		},*/
		getCodeModel:function(){
			return this.$xmlNode.find('script[type="code/model"]').text().trim();
		},
		getCodeDiagram:function(){
			return this.$xmlNode.find('script[type="code/diagram"]').text().trim();
		},
		codeEditor: function(config){
			var self = this;
			var xid = this.$domNode.attr("xid");
			
			CodeEditorHelper.openCodeEditor({
				parentNode:this.domNode,
				codeModel:this.getCodeModel(),
				codeDiagram:this.getCodeDiagram(),
				codeType:"wex5",
				xid:this.$domNode.attr("xid"),
				config:config,
				onReceive:function(result){
					var model = result.model;
					var diagram = result.diagram;
					var $model = self.$domNode.find('script[type="code/model"]');
					if($model.length == 0){
						$model = $('<script type="code/model"></script>').appendTo(self.$domNode);
					}
					
					$model.text(model);
					xuiDoc.updateText($model, true);
					var $diagram = self.$domNode.find('script[type="code/diagram"]')
					if($model.length == 0){
						$model = $('<script type="code/diagram"></script>').appendTo(self.$domNode);
					}
					$diagram.text(diagram);
					xuiDoc.updateText($diagram, true);
					self.ownerDesigner.setDirty(true);
					
					var params = result.codeInfo.functions["_generatedCode"].params;
					$.each(params,function(index,param){
						param.displayName = param.value;
					});
					xuiDoc.set(self, {params: JSON.stringify(params)});
					
					
					var ps = [],xid = xuiDoc.get(self, "xid");
					self.set({"params":JSON.stringify(params)});
					$.each(params,function(index,param){
						ps.push(param.value);
					});
					/*var output = Babel.transform(result.code, { 
						presets: ['es2015','stage-0'],
						sourceMaps:true
					});
					var code = output.code;
					var map = "//# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(JSON.stringify(output.map));*/
					//code = "{" + code + "\n" + map + "\n return _generatedCode.apply(this,arguments);" + "\n}";
					xuiDoc.saveJsMethod({oldName:xid,name:xid,params:ps.join(","),content:result.codeInfo.code});
				}
			});
		},
		// 构建操作选择列表
		buildOperationList : function(operations,operationConfigs){
			var operationsInfo = {};
			$.each(operations,function(index,operation){
				var xid = operation.xid;
				$.each(operation.operations,function(_index,item){
					var name = item.name;
					var operationInfo = operationsInfo[name] = operationsInfo[name] || {
						xids:[]
					};
					operationInfo.xids.push(xid);
					operationInfo.argsDef = item.argsDef || [];
				});
			});
							
			var result = [];
			$.each(operationConfigs,function(index,operationConfig){
				var config = {
					"children" : [],
					"label" : operationConfig.label
				};
				$.each(operationConfig.items,function(_index,item){
					var info = operationsInfo[item.name];
					if(info){
						var child = {
							"label" : item.label,
							"name" : item.name,
							"argsDef":info.argsDef,
							"xids":info.xids,
							"argExtends":item.argExtends
						};
						config.children.push(child);
					}
				});
				result.push(config);
			});
			return result;
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/code/code":{
				properties:["xid"],
				
				toolbar:[{text:"编辑代码",method:"codeEditor"}],
				
				//操作配置
				operations:function(){
					return [{
						groupName:"代码",
						items:[
							   {name:'exec',label:'执行'}
						]
					}];
				}
			} 
	};
	
	return {
		'$UI/system/components/justep/code/code' : Code,quickIdeEx:quickIdeEx
	};
});