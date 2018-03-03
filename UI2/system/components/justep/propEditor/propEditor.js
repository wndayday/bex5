/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var justep = require("$UI/system/lib/justep");
	var Bind = justep.Bind;

	var url = require.normalizeName("./propEditor");
	var ComponentConfig = require("./propEditor.config");

	var PropEditorMng = require("$UI/system/designer/webIde/base/propEditor/propEditorMng");
	
	var propEditor = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.value = "";
			this.format = "";
			this.targetData = "";
			this.dataType = "String";
		},
		getData : function() { 
			if(this.$object && this.$object.toJson){
				return this.$object;
			}
			return this.getDataByExpr(this.targetData);
		},
		dispose : function() {
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) { 
			if (!config)
				config = {};
			this.set(config);
 
			return "<input class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "'") : "")
			+ (config.xid ? (" xid='" + config.xid + "'") : "") + " component='" + url + "'" + " />";
		},

		// 初始化
		doInit : function(value, bindingContext) { 
			if(!bindingContext){
				return;
			}
			this.$object = bindingContext.$object;
		     this.refFieldName = this.getRefFieldName();
			if (Bind.isObservable(this.ref) && this.ref['define']) {
				var t = this.ref['define'].defCol.type;
				if (t !== this.dataType)
					this.dataType = t;
			}  
			$(this.domNode).css("min-height","20px");
			var self = this;
			var model = this.getModel();
			model.on(justep.ModelBase.MODEL_CONSTRUCT_DONE_EVENT, function(){
				self.initEditor();
			})
		},
		
		getRefFieldName:function(){ 
			var bind = this.$domNode.data("bind");
			if(bind){
				var idx = bind.indexOf('ref("');
				if(idx>0){
					var idx1 = bind.indexOf('"',idx+7);
					return bind.substring(idx+5,idx1);
				}
			}
		},
		
		/**
		 * 初始化编辑器.
		 */
		initEditor:function(value){
			var model = this.getModel();
			var context = {};
			if(model.getPropEditorContext){
				context = model.getPropEditorContext();
			} 
			context = $.extend(context,{$parent:$(this.domNode)});
			this.propEditorMng = new PropEditorMng({propContainer:this.domNode});
			this.propEditorMng.setEditorUIConfig({displayLabel:false});
			var config = {};
			var dataObj = this.getData();
 
			if(dataObj){
				var json = dataObj.toJson(); 
				var rows = json.rows?json.rows:[json];
				if(rows.length == 0){
					return;
				}
				for(var i = 0;i<rows.length;i+=1){
					var row = rows[i];
					for(var p in row){
						config[p] = row[p].value;
					}
					break;
				}
			} 
			var $domNode = $(this.domNode);
			var type = $domNode.data("type");
			if(type && !config["type"]){
				config["type"] = type;
			}
			var name = $domNode.data("name");
			if(name && !config["name"]){
				config["name"] = name;
			}
			
			var editor = $domNode.data("editor");
			if(editor && !config["editor"]){
				config["editor"] = editor;
			}
			
			var target = $domNode.data("target");
			if(editor && !config["target"]){
				config["target"] = target;
			}
			var compName = config["className"]||config["memberof"]||config["compName"];
			
			 this.propEditorMng.loadPropEditor(compName,function(){
					this.editor = this.propEditorMng.createPropEditor(config,context);
					this.editor.setValue(value || this.value);			
			 },this);
	 
			 var self = this;
			this.propEditorMng.addPropValueChangeListner(function(event){  
				if(dataObj.setValue){
					dataObj.setValue(self.refFieldName,event.value);					
				}else{ 
					dataObj.val(self.refFieldName,event.value);
				}
			});
			if(this.isInitEditor){
				return;
			}
			this.isInitEditor = true;	
		},
		
		render : function() {  
			this.callParent();
			if (Bind.isObservable(this.ref) && this.ref['define']) {
				var t = this.ref['define'].defCol.type;
				if (t !== this.dataType)
					this.dataType = t;
			}
			var val = this.value;
			var d;
			if (val === undefined || val === null)
				val = '';
			var eData = {
				source : this,
				value : this.value,
				html : val
			};
			this.fireEvent('onRender', eData);
			if(!this.editor){
				this.initEditor(val);
			}else{
				this.editor.setValue(val);								
			}
		},
 
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "value":
				if (oldVal != value) {
					if (this._inited) {
						this.fireEvent('onChange', {
							source : this,
							originalValue : oldVal,
							value : value
						});
						this.needRender = true;
					}
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		
		dispose:function(){
			this.callParent();
			this.free();
		},
		
		free:function(){
			this.propEditorMng.clearEditor();
			this.callParent();
		}
	});
	
	justep.Component.register(url, propEditor);
	return propEditor;
});