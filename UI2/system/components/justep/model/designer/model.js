/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var Model = require("../model");
	require('css!./css/model').load();
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var ModelDesigner = Model.extend({
		init: function(value, bindingContext){
			this.$domNode = $(this.domNode); 
			//var xid = this.$domNode.attr("xid");
			if (this.ownerDesigner.isQuickIde) //云环境
				this.$domNode.attr("d_resizable","false");
			var imgUrl = require.toUrl("$UI/system/components/justep/model/designer/img/minimize.gif");
			this.$domNode.addClass('xui-model').attr("d_showcomptip","false").prepend("<div class='xui-model-title'><span>数据</span><a  title='收缩' style='float:right;margin-top:-2px;'><img src='"+imgUrl+"'/></a></div>"); 
			this.domNode.style.position = "absolute";
			if(!this.domNode.style.top){
				this.domNode.style.top = "10px";
				this.domNode.style.left = "10px";
			}
			this.domNode.style.height = "auto";
			this.callParent(value, bindingContext);
			var self = this;
			
			var $title = this.$domNode.attr("d_canRemove","false").find(">.xui-model-title:first").attr("title","数据");
			$title.find(">a").on("click",function(){
				self.setExpand(self.$domNode.hasClass("xui-model-close"));
				self.ownerDesigner.reSelectAll();
			});
			
			self.setExpand(false);		
			this.$domNode.on("childChanged",function(event,data){
				if(data && data.type == 'add'){
					self.setExpand(true);					
				}
			});
		},
		/**
		 * 设置展开或者搜索，true为展开
		 */
		setExpand:function(flag){ 
			if(flag){
				this.$domNode.removeClass("xui-model-close");
				this.$domNode.find("span").show();
				this.$domNode.find("a").attr("title","收缩");
			}else{
				this.$domNode.addClass("xui-model-close");
				this.$domNode.find("span").hide();
				this.$domNode.find("a").attr("title","展开");
			}
		},
 
		set: function(v){
			if('xid' in v){
				this.$domNode.children('.xui-model-title').text(v['xid']);
			}
		},
		hide : function(){
			this.ownerDesigner.unSelection(this.$domNode[0]);
			this.$domNode.hide();
		},
		show : function(){
			this.$domNode.show();
			this.ownerDesigner.setSelection(this.$domNode[0]);
		},
		addBizData:function(config){
			var self = this;
			xuiDoc.createComponent("$UI/system/components/justep/data/bizData"/*组件注册名*/,this/*父组件*/,{paintComponent:true/*立即绘制组件*/},function(){
				self.setExpand(true);
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		},
		addRestData:function(config){
			var self = this;
			xuiDoc.createComponent("$UI/system/components/justep/data/restData"/*组件注册名*/,this/*父组件*/,{paintComponent:true/*立即绘制组件*/},function(){
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		},
		addData:function(config){
			var self = this;
			xuiDoc.createComponent("$UI/system/components/justep/data/data",this,{paintComponent:true},function(){
				self.setExpand(true);
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		}
	});
	
	
	var quickIdeEx = {
		"$UI/system/components/justep/model/model":{
			
			displayName:function(){
				return "数据";
			},
			
			toolbar:[{text:"添加静态数据",method:"addData"},
			      {text:"添加动态数据",visible:function(mainModel){
			    	  return mainModel.isQuickIde?true:false;
			      },
			      method:function(did,mainModel,propEditor){
				   var params = {}; 
				   params.modelXml = mainModel.callDesignerMethod("getModelXml");
				   params.mainModel = mainModel;
				   params.propName = "xid";
				   mainModel.openEditorDialog({params:params,url:"$UI/system/designer/webIde/quickIde/propPages/dataSetting/chooseData.w",callback:function(param){
					   setTimeout(function(){
						   if(param.xid){
							   var e = mainModel.callDesignerMethod("getElementByXid",param.xid);
							   if(e){
								   mainModel.callDesignerMethod("setSelectionByIds",{ids:[e.getAttribute("d_id")]});
							   }
						   }
					   },400);
				   }});
			}},{text:"添加统计数据",visible:function(mainModel){
		    	  return mainModel.isQuickIde?true:false;
		      },
		      method:function(did,mainModel,propEditor){
				   var params = {}; 
				   params.modelXml = mainModel.callDesignerMethod("getModelXml");
				   params.mainModel = mainModel;
				   params.propName = "xid";
				   mainModel.openEditorDialog({params:params,url:"$UI/system/components/justep/data/designer/dlg/aggregateData.w",callback:function(param){
					   setTimeout(function(){
						   if(param.xid){
							   var e = mainModel.callDesignerMethod("getElementByXid",param.xid);
							   if(e){
								   mainModel.callDesignerMethod("setSelectionByIds",{ids:[e.getAttribute("d_id")]});
							   }
						   }
					   },400);
				   }});
			}}],

			subComps:{
//					"$UI/system/components/justep/data/data":{
//						text:"静态数据",
//						appendTo:">*[component='$UI/system/components/justep/model/model']:first",
//						//在标题栏显示的标题
//						"displayName":function(values){
//							return values.label || '静态数据'+"("+values['xid']+")";
//						},
//		
//						toolbar:[{text:"编辑列",method:"editColumn"},{text:"编辑数据",method:"editData"},{text:"规则设置",method:"editRule"}],
//						
//						//显示的属性
//						properties:[{name:'label',text:'标签1'},"idColumn","autoload"],
//						canSelect:false//是否能选中
//				},
	
//			 "$UI/system/components/justep/data/restData":{
//					text:"动态数据",
//					appendTo:">*[component='$UI/system/components/justep/model/model']:first",
//					//在标题栏显示的标题
//					"displayName":function(values){
//						return values.label || 'restData'+"("+values['xid']+")";
//					},
//					
//					toolbar:[{text:"编辑",method:function(did,mainModel,propEditor){
//						   var params = {};
//						   var element =  mainModel.callDesignerMethod("getElementByDId",did); 
//						   params.modelXml = mainModel.callDesignerMethod("getModelXml");
//						   params.maiModel = mainModel;
//						   params.xid = element.getAttribute("xid");
//	
//						   mainModel.openEditorDialog({params:params,url:"$UI/system/designer/webIde/quickIde/propPages/dataSetting/chooseData.w",callback:function(){
//							   propEditor.refresh(did);							   
//						   }});
//					}},{text:"规则设置",method:"editRule"}],
//					
//					//显示的属性
//					properties:["label","className","columns","limit","offset","orderBy","auto"],
//					canSelect:false//是否能选中
//				}
			   }
		}
	};
	return {'$UI/system/components/justep/model/model':ModelDesigner,quickIdeEx:quickIdeEx};
});

