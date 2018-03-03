/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery"),
		Bar = require("../titleBar"),
		xuiService = require("$UI/system/components/designerCommon/js/xuiService"),
		xuiDoc = xuiService.getXuiDoc();

	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$title.attr('d_selectable',true);
			this.$title.attr('d_canaddchild',true);	 
			this.$title.attr('d_canremove',false).attr("d_resizable","false").attr("d_canMove","false");;
		},
		
		//添加左边按钮
		addLeftBtn:function(){
			var self = this;
			var pDid = $(this.domNode).find(">.x-titlebar-left").attr("d_id");
			xuiDoc.createComponent("$UI/system/components/justep/button/button",pDid,{paintComponent:true},function(){
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		},
		
		//添加右边按钮
		addRightBtn:function(){
			var self = this;
			var pDid = $(this.domNode).find(">.x-titlebar-right").attr("d_id");
			xuiDoc.createComponent("$UI/system/components/justep/button/button",pDid,{paintComponent:true},function(){
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		},
		
		setTitle: function(value){
			this.callParent(value);
			xuiDoc.updateText($('>.x-titlebar-title', this.domNode));
		}
	});

	var webIdeEx = {
			"$UI/system/components/justep/titleBar/titleBar":{
				styleConfig:function(designer){
					return [
					  	    designer.getCommonStyleItem('font'),
					  	    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					   	];
				}
			},
			"$UI/system/components/justep/titleBar/titleBar#title":{
				styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),
						  	  {
						  		text : '宽度占比样式',
						  		id:"preStyle",
						  		noLabel : false,//不显示标签
						  		isGroup:true,
						  		
						  		//可选数据
						  		items : [ {
						  			name : 'class',
						  			noLabel : true,//不显示标签
						  			//可选数据
						  			optionData : 
						  				[{propName : "class",value : "flex1",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>flex1</button>"},
						  				  {propName : "class",value : "flex2",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>flex2</button>"},
							              {propName : "class",value : "flex3",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>flex3</button>"},
							              {propName : "class",value : "flex4",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>flex4</button>"},
							              {propName : "class",value : "flex5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>flex5</button>"}, 
							              {propName : "class",value : "flex6",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:70px;'>flex6</button>"}
						  				],
						  				editor : "listEditor"
						  			} ]
						  		},designer.getCommonStyleItem('border')
						   	];
				}
			}
	}
	
	var quickIdeEx = {
			"$UI/system/components/justep/titleBar/titleBar":{
				text:"顶部导航",
				//properties:["title"],
				//canAddChild:false,//不能直接添加子组件
				styleConfig:function(ownerDesigner){ return ownerDesigner.getCompStyleItems("$UI/system/components/justep/titleBar/titleBar");
				},
				//工具栏
				//toolbar:[{text:"添加左边按钮",method:'addLeftBtn'},{text:"添加右边按钮",method:'addRightBtn'}],
				   
		
				//获取子组件配置，作为鉴别是否是当前组件的子的方法
				getSubCompConfig:function(element){ 
					var componentName = element.getAttribute("componentname");
					if($(element.parentNode).hasClass("x-titlebar-title")){
						return ;
					}
					if(element.parentNode && element.parentNode.parentNode && element.parentNode.parentNode.getAttribute("componentname") == "$UI/system/components/justep/titleBar/titleBar"){
						 return this.subComps[componentName];
					}
 
				},
			
			//子组件的路径配置
				subCompPath:[{text:"左边按钮",path:">.x-titlebar-left>*[component='$UI/system/components/justep/button/button']"},
	//		             {text:"",path:">.x-titlebar-title"},
			             {text:"右边按钮",path:">.x-titlebar-right>*[component='$UI/system/components/justep/button/button']"}],//子组件搜索路径
			             
			//子组件的配置
                subComps:{
	//			"$UI/system/components/justep/titleBar/titleBar#title":{
	//				canResize:function(element){
	//					return false;
	//				},
	//				"display-property":function(values){
	//					return values.title || '标题内容';
	//				},
	//				canRemove:false,
	//				text:"标题栏",
	//				canAdd:false,
	//				styleConfig:compStyleConfig["$UI/system/components/justep/titleBar/titleBar#title"],
	//				canAddChild:true,
	//				properties:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}]
	//			},
				"$UI/system/components/justep/button/button":{
					//在标题栏显示的标题
					"displayName":function(values){
						return values.label || '按钮';
					},
					//创建时的模板内容
					templateContent:'<a class="btn btn-link btn-icon-left" component="$UI/system/components/justep/button/button"  label="按钮"><i></i><span>按钮</span></a>',
					styleConfig:function(ownerDesigner){
						return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/button",["icon","preStyle","displayStyle","iconPosition","size"]);
					},
					//显示的属性
					properties:["xid","label","target","icon",{name:"onClick",text:"点击事件",editor:"eventEditor",noLabel:true}]//,
					//canSelect:false//是否能选中
				}
			}
		},
		
		"$UI/system/components/justep/titleBar/titleBar#title":{
			canResize:function(element){
				return false;
			},
			styleConfig:function(ownerDesigner){
				return ownerDesigner.getCompStyleItems("$UI/system/components/justep/titleBar/titleBar#title");
			},
			canAddChild:true,
			properties:["text"],
			events:[{name:"bind-click",text:"点击事件",editor:"eventEditor",noLabel:true}]
		}
	};

	return {'$UI/system/components/justep/titleBar/titleBar':cls,quickIdeEx:quickIdeEx,webIdeEx:webIdeEx};
});