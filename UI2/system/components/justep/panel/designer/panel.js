/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./panel').load();
	
	var $ = require("jquery");
	var Panel = require("$UI/system/components/justep/panel/panel");
	var Component = require("$UI/system/lib/base/component");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var bind = require("bind");
	var Child = require('./child');
	var Util = require("$UI/system/components/justep/common/designer/common");
 
	xuiService.regComponents({"$UI/system/components/justep/panel/panel#top":Child,"$UI/system/components/justep/panel/panel#content":Child,"$UI/system/components/justep/panel/panel#bottom":Child});//动态注册组件
	
	var cls = Panel.extend({
		init:function(value, bindingContext){
			var result = this.callParent(value, bindingContext);
			var me = this;
			this.initStatus();
			
			$('.ctn').mouseover(function(){
				$(this).addClass('outline');
			}).mouseout(function(){
				$(this).removeClass('outline');
			});
			return result;
		},

		//初始化设计时控制状态
		initStatus:function(){
			$(this.domNode).attr("d_resizable","false").attr("d_canAddChild", "false");
        	this.$top = $('>.x-panel-top', this.domNode);
        	this.$content = $('>.x-panel-content', this.domNode);
        	this.$bottom = $('>.x-panel-bottom', this.domNode);
        	
			this.$top.attr("d_canAddChild", "true").attr('d_resizable', false);
			this.$content.attr("d_canAddChild", "true").attr("d_canRemove",false).attr('d_resizable', false).attr("d_selectable",false);
			this.$bottom.attr("d_canAddChild", "true").attr('d_resizable', false);
		},
		
		setVisible: function(){
			//忽略了设置
		},
		addTop: function(){
			var id = this.$content.attr('d_id'), me = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/panel/panel#top", this, {before:id, paintComponent:true,autoSelect:false}, function(){
        		$('>.x-panel-content', me.$domNode).css('top', $('>.x-panel-top', me.$domNode).height());
        		me.initStatus();   
			});
		},
		addBottom: function(){
			var id = this.$content.attr('d_id'), me = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/panel/panel#bottom", this, {paintComponent:true,autoSelect:false}, function(){
        		$('>.x-panel-content', me.$domNode).css('bottom', $('>.x-panel-bottom', me.$domNode).height());
        		me.initStatus();
			});
		},
		onBuildMenu:function(event){
		  event.enableStatus = event.enableStatus || {}; 
		  if($('>.x-panel-top', this.$el).length>0)
			  event.enableStatus.addTop = false;
		  if($('>.x-panel-bottom', this.$el).length>0)
			  event.enableStatus.addBottom = false;
		}		
	});

	var content = justep.ViewComponent.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			if(this.$domNode.css('backgroundImage')){
				this.$domNode.css('backgroundImage',"url("+this.buildSrc(this.$domNode.css('backgroundImage'))+")");
				this.$domNode.css('backgroundSize',"cover");
			}
		},
		set: function(values){
        	if('backgroundImage' in values){
        		if(values['backgroundImage'] == ""){
        			this.$domNode.css('backgroundImage',"");
        		}else{
        			this.$domNode.css('backgroundImage',"url("+this.buildSrc(values['backgroundImage'])+")");
        			this.$domNode.css('backgroundSize',"cover");
        		}
        	}
        },
		buildSrc:function(src){
			if(src){
				if(src.indexOf("$UI") !=-1){
					src = require.toUrl(src);
				}
			}
			return src||"";
		},
	});

	var webIdeEx = {
			"$UI/system/components/justep/panel/panel":{
				styleConfig:function(designer){
					return [
					        
					    	designer.getCommonStyleItem('card-style'),{
					    		text : '常用布局',
					    		noLabel : false,//显示标签
					    		isGroup:true,
					    		
					    		//可选数据
					    		items : [ {
					    			name : 'class',
					    			noLabel : true,//不显示标签
					    			selectMode:"1", //0选中无状态变化
					    			//可选数据
					    			optionData : [{propName : "class",value : "x-full",text : "<button class='btn btn-success' style='margin:6px'>全屏显示</button>"
					    			},{propName : "class",value : "",text : "<button class='btn btn-success' style='margin:6px'>非全屏显示</button>"},
					    			{propName : "class",value : "x-has-iosstatusbar",text : "<button class='btn btn-success' style='margin:6px'>设置苹果机状态栏同色</button>"}],
					    			editor : "listEditor"
					    		} ]
					    	},designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border')
					     	];
				}
			}
	}
 
	
	var quickIdeEx = {
			"$UI/system/components/justep/panel/panel":{
				displayName:function(){
					return "面板";
				},
				
				properties:[],
				
				styleConfig:function(ownerDesigner){ return ownerDesigner.getCompStyleItems("$UI/system/components/justep/panel/panel");},
				
//				toolbar:{
//				   addTop:{text:"添加头部区域",componentName:"$UI/system/components/justep/panel/panel#top",method:function(targetId,config,mainModel){//构件组件配置
//			 
//					   var modelNode = mainModel.callDesignerMethod("getModelNode",targetId);
//					   
//					   if($(modelNode).find(">.x-panel-top:first").length == 1){
//						   return {cancel:true};
//					   }
//					   
//					   mainModel.callDesignerMethod("menuItemHandler",targetId,"addTop");
//					   return {cancel:true};
//				   	 }
//				   },
//				
//				   addBottom:{text:"添加底部区域",componentName:"$UI/system/components/justep/panel/panel#bottom",method:function(targetId,config,mainModel){//构件组件配置
//					   var modelNode = mainModel.callDesignerMethod("getModelNode",targetId);
//					   if($(modelNode).find(">.x-panel-bottom:first").length == 1){
//						  return {cancel:true};
//					   }
//					   mainModel.callDesignerMethod("menuItemHandler",targetId,"addBottom");
//					   return {cancel:true};
//				   }}},
				   
				 templateContent:function(config){
					var xfull = "";
					var parent = config.parent;
					//在window中全屏
					if(parent.getAttribute("component") == '$UI/system/components/justep/window/window' ){
						xfull = 'x-full x-has-iosstatusbar';
					}
				   var content ='<div component="$UI/system/components/justep/panel/panel" class="x-panel '+xfull+'">'+
				    	'<div class="x-panel-top" />'+
			    	' <div class="x-panel-content">'+
			    	' </div>'+
			    	' <div class="x-panel-bottom"/>'+
			    	' </div>	';
					return content;
				},
				
//				subComps:{
//					"$UI/system/components/justep/panel/panel#top":{
//						text:"头部区域",
//						"displayName":function(values){
//							return "头部区域";
//						}//,
//						//properties:["height"]
//					},
//					
//					"$UI/system/components/justep/panel/panel#content":{
//						canRemove:false,
//						text:"内容区域",
//						"displayName":function(values){
//							return "内容区域";
//						},
//						properties:["xid"]
//					},
//
//					"$UI/system/components/justep/panel/panel#bottom":{
//						text:"底部区域",
//						"displayName":function(values){
//							return "底部区域";
//						},
//						properties:["height"]
//					}
//				}
			},
			
			"$UI/system/components/justep/panel/panel#top":{
				text:"头部区域",
				"displayName":function(values){
					return "面板头部区域";
				},
				properties:["height"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'),
					        designer.getCommonStyleItem('border'),
					        designer.getCommonStyleItem('backgroundColor')
					     ];
				}
			},
			
			"$UI/system/components/justep/panel/panel#content":{
				canRemove:false,
				text:"内容区域",
				"displayName":function(values){
					return "面板内容区域";
				},
				properties:["xid",{name:'backgroundImage',text:"背景图片",editor:'imgSelector'}],
			},

			"$UI/system/components/justep/panel/panel#bottom":{
				text:"底部区域",
				"displayName":function(values){
					return "面板底部区域";
				},
				properties:["height"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'),
					        designer.getCommonStyleItem('border'),
					        designer.getCommonStyleItem('backgroundColor')
					     ];
				}
			}
	}

	return {'$UI/system/components/justep/panel/panel':cls,
		'$UI/system/components/justep/panel/panel#content':content,
		quickIdeEx:quickIdeEx,webIdeEx:webIdeEx};
});