/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./contents').load();
	
	var $ = require("jquery");
	var Contents = require("../contents");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Component = require("$UI/system/lib/base/component");
	var Content = require("../content");
	var bind = require("bind");
	
	xuiService.regComponents({"$UI/system/components/justep/contents/content":Content});//动态注册组件

	var cls = Contents.extend({
		init:function(value, bindingContext){
			$(this.domNode).attr("d_resizable","false").attr("d_canAddChild", "false");
			
			var result = this.callParent(value, bindingContext);
			$('>.x-contents-content', this.$domNode).each(function(i, b){
				$(this).attr("d_canAddChild", "true").attr('d_resizable', false).selectable(true);
			});
			 
			return result;
		},
		
		add: function(){
			var self = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/contents/content", this, {paintComponent:true}, function(el){
				var id = $(el).attr('d_id');
				var $content = $('[d_id=' + id + ']');
				//$content.parent().children().hide();
				$content.attr("d_canAddChild", "true").attr('d_resizable', false).selectable(true);
				//$content.show();
			});
		}
	});
	Content.prototype.compTip = function(compName){
		var pageCount = this.$domNode.parent().children().length;
		var index = this.$domNode.index();
		 return compName+"(<span style='color:red;'>"+(index+1)+"/"+pageCount+"</span>)";
	}

	Content.prototype.add = function(){
		var self = this;
		xuiService.getXuiDoc().createComponent("$UI/system/components/justep/contents/content", this.$domNode.parent().attr("d_id"), {paintComponent:true}, function(el){
			var id = $(el).attr('d_id');
			var $content = $('[d_id=' + id + ']');
			//$content.parent().children().hide();
			$content.attr("d_canAddChild", "true").attr('d_resizable', false).selectable(true);
			//$content.show();
		});
	}
	
	Content.prototype.onRemove = function(event){
		var index = this.$domNode.index();
		this.owner.remove(index);
	}
	var webIdeEx = {
			"$UI/system/components/justep/contents/contents":{
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('layout'),designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border')
					    	];
				}
			}
	}
	
	var quickIdeEx = {
			"$UI/system/components/justep/contents/contents":{
				properties:["wrap","swipe","active","slidable","routable"],
				styleConfig:function(ownerDesigner){ return ownerDesigner.getCompStyleItems("$UI/system/components/justep/contents/contents")},
				
				//操作配置
				operations:function(){return [{groupName:"内容块切换操作",
                    items:[ 
                	       {name:'to',label:"跳转",argExtends:{xid:{editor:"contentXidEditor"}}},//argExtends 参数扩展，主要是加上编辑器
                	       {name:'next',label:"下一页"},
                	       {name:'prev',label:"前一页"}
                	       ]}]}
					 ,
				templateContent:function(config){
					var xfull = "";
					var parent = config.parent;
					//在window或者panel中全屏
					if(parent.getAttribute("component") == '$UI/system/components/justep/window/window' || $(parent).hasClass('x-panel-content')){
						xfull = 'x-full';
					}
				   var content ='<div component="$UI/system/components/justep/contents/contents" class="x-contents '+xfull+'" active="0">'+
		    		'   <div class="x-contents-content"></div>'+
		    		'</div>	';
					return content;
				},

				toolbar:[{text:'添加内容页',method:"add"}]
					 ,
					   
				//获取子组件配置
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname");
					//鉴别contents
					if(element.parentNode && 
							element.parentNode.getAttribute("component") == "$UI/system/components/justep/contents/contents"){ 
						 return this.subComps[componentName];
					}
				},
				
				selectChild:function(did){
					// var element =  mainModel.callDesignerMethod("getElementByDId",did); 
					//if(element){
//						$(element).parent().children().hide().removeClass('x-content-on-right');	
//						$(element).show();
					//}
				},
				
				subComps:{}
			},

			 "$UI/system/components/justep/contents/content":{
				text:"内容块",
	 
				properties:[{name:'label',text:"标签名"}],
				styleConfig:function(designer){
					return [
					 designer.getCommonStyleItem('backgroundColor')
					       ,
					        					        {
				    			id:"padding",
				    			text : '内边距',
				    			isGroup:true,
				    			items : [ {
					    			name:'padding',
					    			noLabel : true,//不显示标签
					    			selectMode:"0",
					    			showMarginOrPadding:"2", //1:外边距 2：内边距  
					    			//可选数据
					    			editor : "marginEditor"
				    		}]
				    		},
					        designer.getCommonStyleItem('font')
					     ];
				}
				//canSelect:false//不能选中
		      }
			
	};

	return {'$UI/system/components/justep/contents/contents':cls,quickIdeEx:quickIdeEx,webIdeEx:webIdeEx};
});