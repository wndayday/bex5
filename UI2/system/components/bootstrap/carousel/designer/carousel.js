/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./carousel').load();
	
	var $ = require("jquery");
	var Carousel = require("../carousel");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Component = require("$UI/system/lib/base/component");
	var bind = require("bind");
	
	var xuiDoc = xuiService.getXuiDoc();
	
	var cls = Carousel.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});
 
	var quickIdeEx = {
			"$UI/system/components/bootstrap/carousel/carousel(bootstrap)":{
				canAddChild:false,//不能直接添加子组件
				displaySubComp:true,//是否同事显示子组件属性
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname");

					//鉴别image
					if(element.parentNode && element.parentNode.parentNode && element.parentNode.parentNode.parentNode && 
							element.parentNode.parentNode.parentNode.getAttribute("componentname") == "$UI/system/components/bootstrap/carousel/carousel(bootstrap)"){
						 return this.subComps[componentName];
					}
					
					//鉴别contents
					if(element.parentNode && 
							element.parentNode.getAttribute("component") == "$UI/system/components/bootstrap/carousel/carousel"){ 
						 return this.subComps[componentName];
					}
					
					//鉴别content
					if(element.parentNode && element.parentNode.parentNode && 
							element.parentNode.parentNode.getAttribute("component") == "$UI/system/components/bootstrap/carousel/carousel"){ 
						 return this.subComps[componentName];
					}
				},
				selectChild:function(did,mainModel){ 
					 var element =  mainModel.callDesignerMethod("getElementByDId",did); 
					if(element){
						$(element).closest(".x-contents").children().hide();
						$(element).parent().show();
					}
				},
				toolbar:[{text:"添加轮播图片",method:function(did,mainModel,propEditor){
					var self = this; 
					var element =  mainModel.callDesignerMethod("getElementByDId",did); 
					var $targetE = $(element).find(">*[component='$UI/system/components/justep/contents/contents']:first");
					var templateContent = '<div class="x-contents-content">'+
					   '<img   class="tb-img1 "  style="width:100%;height:100%;" src="$UI/system/designer/webIde/img/default.png"  />'+
					   '</div>';
					xuiDoc.createComponent("image(html)",$targetE.attr("d_id"),{templateContent:templateContent,paintComponent:true,autoSelect:false},function(){
						self.refreshSubCompPropEditors(); 
					});
				}}],
				
				templateContent:function(){ 
					return '<div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel carousel"   auto="true" style="height:140px;"> '+
                    '<ol class="carousel-indicators" />  '+
                    '<div class="x-contents carousel-inner x-full" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="true" swipe="true"   routable="false">'+ 
                    ' <div class="x-contents-content">'+
					' <img   class="tb-img1 "  style="width:100%;height:100%;" src="$UI/system/designer/webIde/img/default.png"  />'+
					'</div>'+
                    '</div> '+
                    '</div> ';
				},
				properties:["auto","interval"],
				
				subCompPath:"img",//子组件搜索路径
				
				subComps:{
					"$UI/system/components/justep/contents/contents":{
						canSelect:false,//不能选中
						canAdd:false//不能添加
					},
					"$UI/system/components/justep/contents/content":{
						canSelect:false,//不能选中
						canAdd:false,//不能添加，
						canAddChild:false//不能直接添加子组件
					},
					"image(html)":{
						text:"轮播图片",
						displayName:function(values,name,idx){ 
							return "轮播图片"+(idx);
						},
						appendTo:">*[component='$UI/system/components/justep/contents/contents']:first",//要添加到哪个节点下
						removeTarget:function(targetId,mainModel){//重新构建删除目标，targetId为当前的目标did
							debugger;
							var modelNode = mainModel.callDesignerMethod("getModelNode",targetId);
							if(modelNode){
								targetId = modelNode.parentNode.getAttribute("d_id");
							}
							return targetId;
						},
						templateContent:function(config){
							return '<div class="x-contents-content">'+
							   '<img   class="tb-img1 "  style="width:100%;height:100%;" src="$UI/system/designer/webIde/img/default.png"  />'+
							   '</div>';
						},
						styleConfig:function(ownerDesigner){return []},
						properties:[{name:'src',editor:'imgSelector'},{name:"onClick",text:"点击事件",editor:"eventEditor",noLabel:true}],
						canSelect:false
					}
				}
			}
	}
	
	var webIdeEx = {
			
	}

	return {'$UI/system/components/bootstrap/carousel/carousel(bootstrap)':cls,quickIdeEx:quickIdeEx,webIdeEx:webIdeEx};
});