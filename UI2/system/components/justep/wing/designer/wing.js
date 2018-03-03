/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var Panel = require("$UI/system/components/justep/wing/wing");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Child = require('../child');

	
	xuiService.regComponents({"$UI/system/components/justep/wing/wing#left":Child,"$UI/system/components/justep/wing/wing#content":Child,"$UI/system/components/justep/wing/wing#right":Child});//动态注册组件
	
	var cls = Panel.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.animate = false;
			this.display = 'overlay';
			this.onlyOne = 'true'; 
			$(this.domNode).attr("d_resizable","false").attr("d_canAddChild", "false");
			this.$left.attr("d_canAddChild", "true").attr("d_resizable",false);
			this.$content.attr("d_canAddChild", "true").attr("d_canRemove",false).attr("d_resizable",false).attr("d_selectable",false);
			this.$right.attr("d_canAddChild", "true").attr("d_resizable",false);
			
		},
		_showLeft:function(){
			this.toggleLeft();
		},
 
		_showRight:function(){
			this.toggleRight();
		},
		addLeft: function(){
			var id = this.$content.attr('d_id');
			var self = this;
			var d_id = $(this.domNode).attr("d_id");
			if($(this.domNode).find("*[componentname='$UI/system/components/justep/wing/wing#left']").length>0){
				return;
			}
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/wing/wing#left", this, {before:id, paintComponent:true},function(){
				self.ownerDesigner.repaintComponent({"d_id":d_id});
			});
		},
		addRight: function(){ 
			var id = this.$content.attr('d_id');
			var self = this;
			var d_id = $(this.domNode).attr("d_id");
			if($(this.domNode).find("*[componentname='$UI/system/components/justep/wing/wing#right']").length>0){
				return;
			}
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/wing/wing#right", this, {before:id, paintComponent:true},function(){
				self.ownerDesigner.repaintComponent({"d_id":d_id});
			});
		},
		propertyChangedHandler: function(key, oldValue, value){
			switch(key){
			case 'animate':
				break;
			default:
				this.callParent(key, oldValue, value);
			}
		},
		onBuildMenu: function(event){
			event.enableStatus = event.enableStatus || {}; 
			if($('>.x-wing-left', this.$el).length>0)
				event.enableStatus.addLeft = false;
			if($('>.x-wing-right', this.$el).length>0)
				event.enableStatus.addRight = false;
		}		
	});

	var webIdeEx = {
			"$UI/system/components/justep/wing/wing":{
				styleConfig:function(designer){
					return [
						    {
						    	name : 'class',
								noLabel : false,//不显示标签
								selectMode:"0", //选中无状态变化
								//可选数据
								optionData : [{propName : "class",value : "x-wing-xs",text : "<button class='btn btn-default' style='margin:6px'>x-wing-xs</button>"}],
								editor : "listEditor"
						    },                                                        
					  	    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					   	];
				}
			}
	}
	
	var quickIdeEx = {
			"$UI/system/components/justep/wing/wing":{
				properties:["animate","display","routable"],
				
				//操作配置
				operations:function(){
					return [
					        {groupName:"wing",
	                         items:[ 
                	       {name:'toggleLeft',label:"显示左边栏"}, 
                	       {name:'toggleRight',label:"显示右边栏"}
                	       ]}];
				},
				toolbar:[{text:"左边栏",method:'_showLeft'},{text:"右边栏",method:'_showRight'}],
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname");
					//鉴别contents
					if(element.parentNode && 
							element.parentNode.getAttribute("component") == "$UI/system/components/justep/wing/wing"){ 
						 return this.subComps[componentName];
					}
					
					//鉴别content
					if(element.parentNode && element.parentNode.parentNode && 
							element.parentNode.parentNode.getAttribute("component") == "$UI/system/components/justep/wing/wing"){ 
						 return this.subComps[componentName];
					}
				},
				styleConfig:function(designer){
					return [
						    {
					    		text : '尺寸样式',
					    		noLabel : false,//显示标签
					    		isGroup:true,
					    		
					    		//可选数据
					    		items : [ {
					    			name : 'class',
					    			noLabel : true,//不显示标签
					    			selectMode:"1", //0选中无状态变化
					    			//可选数据
					    			optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px'>标准尺寸</button>"},
									              {propName : "class",value : "x-wing-xs",text : "<button class='btn btn-success btn-sm' style='margin:6px'>小尺寸</button>"}],
					    			editor : "listEditor"
					    		} ]
					    	},
					  	    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					   	];
				},
				subComps:{
					"$UI/system/components/justep/wing/wing#left":{
						text:"左边区域",
						"displayName":function(values){
							return "左边区域";
						},
						properties:["xid"]
					},
					
					"$UI/system/components/justep/wing/wing#right":{
						text:"右边区域",
						"displayName":function(values){
							return "右边区域";
						},
						properties:["xid"]
					},
					"$UI/system/components/justep/contents/contents":{	
						properties:["wrap","swipe","active","slidable","routable"],
						canAdd:false//不能添加
						}
				}
			},

			
			"$UI/system/components/justep/wing/wing#content":{
				text:"内容区域",
				"displayName":function(values){
					return "内容区域";
				},
				canRemove:false,
				properties:["xid"]
			}
	}

	return {'$UI/system/components/justep/wing/wing':cls,quickIdeEx:quickIdeEx};
});