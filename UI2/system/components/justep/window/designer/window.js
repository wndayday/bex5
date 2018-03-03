/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
    var $ = require("jquery");
    var RTWindow = require("../window");
    var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var fileSelectorUrl  = "$UI/system/designer/webIde/editors/fileSelector/fileSelector.w";
	
    var Window = RTWindow.extend({
    	
		init : function(value, bindingContext) {
			this.$domNode.css("width","100%").css("height","100%").attr("d_canAddChild","true").attr("d_canRemove","false");
			this.callParent(value, bindingContext);
			if(this.$domNode.css('backgroundImage')){
				this.$domNode.css('backgroundImage',"url("+this.buildSrc(this.$domNode.css('backgroundImage'))+")");
				this.$domNode.css('backgroundSize',"cover");
			}
		},
		
		initTitle: function(){
			//不处理title
		},
		
		propertyChangedHandler : function(key, oldVal, value) {
			if (key === "title"){
				return;
			}else{
				this.callParent(key, oldVal, value);
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
		
		getResource:function(){
			var resourceNode = xuiDoc.dataModel.$root.find("resource:first")[0];
			if(!resourceNode){
				this.addDir();
			}
			resourceNode = xuiDoc.dataModel.$root.find("resource:first")[0];
			return resourceNode;
		},
		
		/**添加js引用*/
		addJS:function(event){
			var resouce = this.getResource();
			xuiService.openPage(fileSelectorUrl, {
				title : "js文件选择",
				width:480,
				extName:"js"
			}, function(result) {
				var value = result.value;
				if(value){
					var idx = value.lastIndexOf(".");
					if("js" != value.substring(idx+1)){
						alert("必须选择一个js文件");
						return;
					}
					value = value.substring(0,idx);
					var templateContent = '<require   url="'+value+'"></require>';
					xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
				}
			});
		},

		/**添加css引用*/
		addCSS:function(event){
			var resouce = this.getResource();
			xuiService.openPage(fileSelectorUrl, {
				title : "css文件选择",
				width:480,
				extName:"css"
			}, function(result) {
				var value = result.value;
				if(value){
					var idx = value.lastIndexOf(".");
					if("css" != value.substring(idx+1)){
						alert("必须选择一个css文件");
						return;
					}
					value = value.substring(0,idx);
					var templateContent = '<require   url="css!'+value+'"></require>';
					xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
				}
			});
		},
		
		/**添加Cordova 插件引用*/
		addCordovaPlugin:function(){
			var resouce = this.getResource();
			xuiService.openPage("$UI/system/components/justep/resource/designer/selectCordovaPlugins.w", {
				title : "cordova插件选择"
			}, function(result) {
				var values = result; 
				if(values){
					values = values.split(",");
					var configs = [];
					for(var i = 0;i<values.length;i+=1){
						var templateContent = '<require   url="cordova!'+values[i]+'"></require>';
						xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
					}
				}
			});			
		},
		
		/**添加w文件引用*/
		addWFileRef:function(){
			var resouce = this.getResource();
			xuiService.openPage(fileSelectorUrl, {
				title : "w文件选择",
				width:480,
				extName:"w,html"
			}, function(result) {
				var value = result.value;
				if(value){
					var idx = value.lastIndexOf(".");
					if("w" != value.substring(idx+1) && "html" != value.substring(idx+1)){
						alert("必须选择一个w文件");
						return;
					}
					value = value.substring(0,idx);
					var templateContent = '<require   url="w!'+value+'"></require>';
					xuiDoc.createComponent("$/UI2/system/components/justep/resource#require",resouce.getAttribute("d_id"),{templateContent:templateContent,paintComponent:true});
				}
			});
		},
		
		addDir:function(){
			xuiDoc.createComponent("$/UI2/system/components/justep/resource",this,{paintComponent:true});
		},
		
		/**添加资源目录*/
		addResource : function(event){
		    xuiDoc.createComponent("$/UI2/system/components/justep/resource",this,{paintComponent:true});
		},
		
		/**quick ide**/
		addData:function(event){
			
		}
    });
 
    var webIdeEx = {
    		"$UI/system/components/justep/button/toggle":{
    			styleConfig:function(designer){
    				return [
    				        designer.getCommonStyleItem('toggle-size'),designer.getCommonStyleItem('position'),
    				        ];
    			}
    		},
//    		"$UI/system/components/justep/button/radio":{
//    			styleConfig:function(designer){
//    				return [
//    				        designer.getCommonStyleItem('radio-size'),
//    				   	   designer.getCommonStyleItem('radio-group-ext'),
//    				  		designer.getCommonStyleItem('radio-group-color'),
//    				  		designer.getCommonStyleItem('position')
//    				     ];
//    			}
//    		},
//    		"$UI/system/components/justep/button/checkbox":{
//    			styleConfig:function(designer){
//    				return [
//    				        designer.getCommonStyleItem('checkbox-size'),
//    				    	designer.getCommonStyleItem('checkbox-group-ext'),
//    					    designer.getCommonStyleItem('checkbox-group-color'),
//    					    designer.getCommonStyleItem('position')
//    				    ];
//    			}
//    		},
    		"$UI/system/components/justep/button/radioPC":{
    			styleConfig:function(designer){
    				return [
    				          {
    				     			text : '排列样式',
    				     			noLabel : false,//显示标签
    				     			isGroup:true,
    				     			
    				     			//可选数据
    				     			items : [{
    				     				name : 'class',
    				     				noLabel : true,//不显示标签
    				     				selectMode:"0", //选中无状态变化
    				     				//可选数据
    				     				optionData : [{propName : "class",value : "radio-inline",text : "<button class='btn btn-default' style='margin:6px'>行内样式</button>"
    				     				}],
    				     				editor : "listEditor"
    				     			} ]
    				     		},designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('position')
    				       ];
    			}
    		},
    		"$UI/system/components/justep/button/checkboxPC":{
    			styleConfig:function(designer){
    				return [
    				        {
    				   			text : '排列样式',
    				   			noLabel : false,//显示标签
    				   			isGroup:true,
    				   			
    				   			//可选数据
    				   			items : [{
    				   				name : 'class',
    				   				noLabel : true,//不显示标签
    				   				selectMode:"0", //选中无状态变化
    				   				//可选数据
    				   				optionData : [{propName : "class",value : "checkbox-inline",text : "<button class='btn btn-default' style='margin:6px'>行内样式</button>"
    				   				}],
    				   				editor : "listEditor"
    				   			} ]
    				   		},designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('position')
    				     ];
    			}
    		},
    		"$UI/system/components/justep/button/buttonGroup":{
    			styleConfig:function(designer){
    				return [
    					   designer.getCommonStyleItem('btn-group-size'),
    					    {
    							text : '排列方式',
    							noLabel : false,//显示标签
    							isGroup:true,
    							
    							//可选数据
    							items : [{
    								name : 'class',
    								noLabel : true,//不显示标签
    								selectMode:"0", //选中无状态变化
    								//可选数据
    								optionData : [{propName : "class",value : "btn-group-vertical",text : "<button class='btn btn-default' style='margin:6px'>垂直布局</button>"
    								},{propName : "class",value : "btn-group-justified",text : "<button class='btn btn-default' style='margin:6px'>两端对齐</button>"}],
    								editor : "listEditor"
    							} ]
    						},designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('position'),
    					];
    			}
    		}
    };
    
    var quickIdeEx = {
    		'$UI/system/components/justep/window/window':{
    			displaySubComp:true,
    			operations:function(){
					return [{groupName:"页面操作",
						items:[{name:'close',label:"关闭"}]
					}];
				},
				properties:[{name:"extends",editor:"pageUrlEditor",},{name:"title",editor:"jsExpressionEX"},{name:'backgroundImage',text:"背景图片",editor:'imgSelector'}],
		
	    toolbar:[{text:"页面参数设置",method:function(did,mainModel,propEditor){
			   var params = {}; 
			   var eWin = mainModel.callDesignerMethod("getModelNode",did);
			   var eM = $(eWin).children('[component="$UI/system/components/justep/model/model"]');
			   if(eM.size()>0){
				   var modelDid = eM.attr('d_id');
				   params.xml = mainModel.callDesignerMethod("toHtml",eM[0]);
				   mainModel.openEditorDialog({params:params,url:"$UI/system/components/justep/model/designer/editParam.w",callback:function(param){
					   setTimeout(function(){
						   xuiDoc.replaceChild(modelDid, param.def.join(""), {
							   paintComponent : false,
							   jqCondition : "param"
								   //xpathCondition : "*[local-name()='column']"
						   });
					   },400);
				   }});
			   }else alert('缺少model定义');
		}}],

		displayName:function(values){
			return "页面";
		},
		
		styleConfig:function(ownerDesigner){
			//ownerDesigner.getCommonStyleItem('baseStyle');
		},

		//获取子组件配置，作为鉴别是否是当前组件的子的方法
		getSubCompConfig:function(element){
			var componentName = element.getAttribute("componentname");
			if(element.parentNode &&  element.parentNode.getAttribute("componentname") == "$UI/system/components/justep/model/model"){ 
				 return this.subComps[componentName];
			}
			
			 
		},
	 
		//子组件的配置
		subComps:{
			"$UI/system/components/justep/model/model":{
			    canRemove:false, 
				properties:[
					{name:"onModelConstruct",editor:"eventEditor",text:"页面创建时",noLabel:true},
					{name:"onModelConstructDone",editor:"eventEditor",text:"页面创建完成",noLabel:true},
					{name:"onLoad",editor:"eventEditor",noLabel:true,text:"页面加载完成"},
					{name:"onParamsReceive",editor:"eventEditor",noLabel:true,text:"参数接收事件"},
					{name:"onInactive",editor:"eventEditor",text:"页面离开",noLabel:true},
					{name:"onunLoad",editor:"eventEditor",noLabel:true,text:"页面关闭时"}
				            ],
			 
				"displayName":function(values){
					return "页面事件";
				} 
			}
 
		}  
      }

    }
	
    return {'$UI/system/components/justep/window/window':Window,quickIdeEx:quickIdeEx,webIdeEx:webIdeEx};
});