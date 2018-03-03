/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var List = require("../list");
	require('css!./css/list').load();
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc(); 
	var ListDesigner = List.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
	        var $domNode = this.$domNode;
			this.$domNode.attr("d_canAddChild", "true").attr("d_resizable","false").children('div.x-list-head').addClass('x-min-height').attr("d_canAddChild", "true");
			this.$domNode.children('.x-list-content').attr('d_selectable', false);
			this.$domNode.find('.x-list-template').addClass('x-min-height').attr("d_canAddChild", "true").attr(
					'd_selectable', false).children().addClass('x-min-height');
			this.$domNode.find('>.x-list-template>*').attr("d_resizable","false");
		    
			this.$domNode.on("childChanged",function(event,data){
				if(event.target != $domNode[0]){
					return;
				}
				if(data && data.type == 'styleChanged' && data.attrName =='class'){
					var value = data.value;
					if(value){
						var values = value.split(" ");
						var $template;
						for(var i = 0;i<values.length;i+=1){
							if(values[i] == 'x-cards'){//同步给模板节点加上list-group样式
								$template = $(">.x-list-template",$domNode);
								if($template.length>0){
									if(!$template.hasClass("list-group")){
										$template.addClass("list-group");
										$(">*",$template).addClass("list-group-item");
										xuiDoc.updateNodes($template,null,function(){
											xuiDoc.updateNodes($(">*",$template));											
										});
									}
								}
								return;
							}
						}
						if($domNode.hasClass('x-cards')){
							return;
						}
						$template = $(">.x-list-template",$domNode);
						if($template.length>0){ //同步去掉list-group样式
							$template.removeClass("list-group");
							$(">*",$template).removeClass("list-group-item");
							xuiDoc.updateNodes($template,null,function(){
								xuiDoc.updateNodes($(">*",$template));								
							});
						}
					}
				}	
			});
		},
		addDivTemplate: function(){
			xuiDoc.createComponent("$UI/system/components/justep/list/list#listTemplateDiv", this, {
				paintComponent : true
			});
		},
		addULTemplate: function(){
			xuiDoc.createComponent("$UI/system/components/justep/list/list#listTemplateUl", this, {
				paintComponent : true
			});
		},
		addTableTemplate: function(){
			xuiDoc.createComponent("$UI/system/components/justep/list/list#listTemplateTable", this, {
				paintComponent : true
			});
		}
	});

	var webIdeEx = {
			"$UI/system/components/justep/list/list(UL)":{
				styleConfig:function(designer){
					return [
						   designer.getCommonStyleItem('card-style'),commonStyleItemConfig.getConfig('baseStyle'),commonStyleItemConfig.getConfig('position'),
							];
				}
			},

			"$UI/system/components/justep/list/list(Table)":{
				styleConfig:function(designer){
					return [
					       designer.getCommonStyleItem('card-style'),commonStyleItemConfig.getConfig('baseStyle'),commonStyleItemConfig.getConfig('position'),
					    	];
				}
			},

			"$UI/system/components/justep/list/list":{
				styleConfig:function(designer){
					return [
					        
					       designer.getCommonStyleItem('card-style'),commonStyleItemConfig.getConfig('baseStyle'),commonStyleItemConfig.getConfig('position'),
					    	];
				}
			}
	
	}
	var quickIdeEx = {
			"$UI/system/components/justep/list/list":{
				properties:[{name:"data",editor:"dataSelector"},{name:'label',text:"标签"},"dataItemAlias","limit","filter","autoLoad","disablePullToRefresh","disableInfiniteLoad"],
				
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname");

		 
					//鉴别content
					if(element.parentNode && element.parentNode.parentNode && 
							element.parentNode.parentNode.getAttribute("component") == "$UI/system/components/justep/list/list"){ 
						 return this.subComps[componentName];
					}
				},
				subCompPath:">*>li",
				subComps:{
					"li(html)":{
						
//						canSelect:false,//不能选中
						canAdd:false,//不能添加
						canRemove:false,
						compTip:function(){
							return "动态列表模板";
						},
						text:"动态列表模板",
						properties:[ {name:"class",text:"自定义样式",editor:"pClassSelector",noLabel:false}] ,
						events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}],
						styleConfig:function(designer){
							return [
									designer.getCommonStyleItem('font'),
							        designer.getCommonStyleItem('border'),
									
							    	];
						}
					} 
				},
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('card-style'),
					        designer.getCommonStyleItem('baseStyle'),
							designer.getCommonStyleItem('font'),
					        designer.getCommonStyleItem('border'),
					    	];
				}
				
			}
	}

	return {
		'$UI/system/components/justep/list/list' : ListDesigner,quickIdeEx:quickIdeEx,webIdeEx:webIdeEx
	};
});