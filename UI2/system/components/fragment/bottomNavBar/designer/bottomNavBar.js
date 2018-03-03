/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
 
	var quickIdeEx = {
			"$UI/system/components/fragment/btnNavBar":{
				getSubCompConfig:function(element){
					var componentName = element.getAttribute("componentname");
					if(element.parentNode.getAttribute("componentname") == "$UI/system/components/fragment/btnNavBar"){
						 return this.subComps[componentName];
					}
				},
				
				properties:["xid"],
				
				//选择组件以后触发的事件
				afterSelect:function(compDid,target,mainModel){ 
					if(target){  
						if(!$(target).hasClass("btn")){
							target = $(target).closest(".btn")[0];
						}
						$(target).closest(".btn-group").find(">*").removeClass('active');
						$(target).addClass('active');
							var targetContent = mainModel.callDesignerMethod("getPropValue",target.getAttribute("d_id"),"target"); 
							if(targetContent){
								var contentNode = mainModel.callDesignerMethod("getElementByXid",targetContent);
								if(contentNode){//显示对应的content内容
									setTimeout(function(){
										mainModel.callDesignerMethod("onAfterSelect",$(contentNode).attr("d_id"));										
									},100);
									// $(contentNode).parent().children().removeClass("x-content-on-right").hide();
									//$(contentNode).addClass('active').show();
								}
							}
					}
				},
				
				subComps:{
					"$UI/system/components/justep/button/button":{
						text:"按钮",
						templateContent:function(config){
							return '<a class="btn btn-link btn-icon-top" component="$UI/system/components/justep/button/button"   icon="icon-eye" label="标签"   >'+
							'<i class="icon icon-eye"></i>'+
							'<span>标签</span>'+
							'</a>';
						},
						styleConfig:function(ownerDesigner){ return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/button",["icon"])},
						canSelect:false,
						"displayName":function(values){
							return values.label || '按钮';
						},
						properties:["xid","label","target","bind-text",{name:"onClick",text:"点击事件",editor:"eventEditor",noLabel:true}]
					} 
				}
			}
	};
 
 
	return {quickIdeEx:quickIdeEx};
});