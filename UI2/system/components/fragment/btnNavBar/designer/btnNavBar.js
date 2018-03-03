/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var BtnNavBarComp = require("../btnNavBar");
	
	var BtnNavBar = BtnNavBarComp.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode.attr("d_childResizable","false").attr("d_childCanDragMove","false").attr("d_resizable","false");//
			
			var cfg = Util.attr2js(this.$domNode, [ 'vercialImage', 'selectedImage' ]);
			if (cfg)
				this.set(cfg); 			
		}
	});
	
	BtnNavBar.prototype.addBtn = function(){
		var templateContent = '<a class="btn btn-link btn-icon-top" component="$UI/system/components/justep/button/button"   icon="icon-eye" label="标签"   >'+
		'<i class="icon icon-eye"></i>'+
		'<span>标签</span>'+
		'</a>';
		var self = this;
		xuiDoc.createComponent("$UI/system/components/justep/data/bizData"/*组件注册名*/,this/*父组件*/,{templateContent:templateContent,paintComponent:true/*立即绘制组件*/},function(){
			self.ownerDesigner.reSelect(self.domNode,true);
		});
	};
	
	var quickIdeEx = {
			"$UI/system/components/fragment/btnNavBar/btnNavBar":{
				getSubCompConfig:function(element){
					var componentName = element.getAttribute("componentname");
					if(element.parentNode.getAttribute("componentname") == "$UI/system/components/fragment/btnNavBar/btnNavBar"){
						 return this.subComps[componentName];
					}
				},
				
				properties:["xid",{name:"vercialImage",editor:'imgSelector'},{name:"selectedImage",editor:'imgSelector'},
				            {name:"class",text:"自定义样式",editor:"pClassSelector",noLabel:false}],
				styleConfig:function(ownerDesigner){ 
					return [
							{
								text : '分隔线样式',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>默认</button>"},
									              {propName : "class",value : "x-btnNavBar-vlLight",text : "<button class='btn x-gray btn-sm' style='margin:6px;width:60px'>钱竖线</button>"},
									              {propName : "class",value : "x-btnNavBar-vlDark",text : "<button class='btn x-black btn-sm' style='margin:6px;width:60px'>深竖线</button>"},
									              {propName : "class",value : "x-btnNavBar-vlImage",text : "<button class='btn x-blue btn-sm' style='margin:6px;width:60px'>图片</button>"}],
									              
									editor : "listEditor"
								}]
							}, 
							{
								text : '选中样式',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>默认</button>"},
									              {propName : "class",value : "x-btnNavBar-ulWhite",text : "<button class='btn btn-link btn-sm' style='margin:6px;width:60px'>下划线</button>"},
									              {propName : "class",value : "x-btnNavBar-ulOrange",text : "<button class='btn x-orange btn-sm' style='margin:6px;width:60px'>下划线</button>"},
									              {propName : "class",value : "x-btnNavBar-ulRed",text : "<button class='btn x-red btn-sm' style='margin:6px;width:60px'>下划线</button>"},
									              {propName : "class",value : "x-btnNavBar-ulImage",text : "<button class='btn x-blue btn-sm' style='margin:6px;width:60px'>图片</button>"}],
									              
									editor : "listEditor"
								}]
							}, 
				    		ownerDesigner.getCommonStyleItem('baseStyle'),
				        ];
				},				
				
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
							'<span>标签</span><div class="x-btnNavBar-vl"/>'+
							'</a>';
						},
						styleConfig:function(ownerDesigner){ 
							var items =  ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/button",["icon"]);
							items.push(ownerDesigner.getCommonStyleItem('font'));
							items.push(ownerDesigner.getCommonStyleItem('backgroundColor'));
							return items;
						},
						//canSelect:false,
						"displayName":function(values){
							return values.label || '按钮';
						},
						properties:["xid","label","target","bind-text"],
						events:[{name:"onClick",text:"点击事件",editor:"eventEditor",noLabel:true}]
					} 
				}
			}
	};
 
 
	return {"$UI/system/components/fragment/btnNavBar/btnNavBar":BtnNavBar,quickIdeEx:quickIdeEx};
});