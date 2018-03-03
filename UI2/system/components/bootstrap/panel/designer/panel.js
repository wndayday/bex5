define(function(require){
	require("css!./css/panel").load();
	var $ = require("jquery");
	var RTPanel = require("../panel");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var Panel = RTPanel.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.template = {
				heading: '<div class="panel-heading"><h4 class="panel-title"><a >Title</a></h4></div>',
				body: '<div class="panel-body"/>',
				footer: '<div class="panel-footer"/>'
			};
			this.selector = {
				heading: '>.panel-heading',	
				body: '>.panel-body',
				footer: '>.panel-footer'
			};
			this.initStatus();
		},
		
		initStatus: function(){
			$(this.selector.heading, this.$domNode).attr("d_canMove", false).attr("d_canAddChild", true);
			$(this.selector.body, this.$domNode).attr("d_canMove", false).attr("d_canAddChild", true);
			$(this.selector.footer, this.$domNode).attr("d_canMove", false).attr("d_canAddChild", true);
		},
		
		onBuildMenu:function(event){ 
			event.enableStatus = event.enableStatus || {};
			event.enableStatus.addHeading = ($('>.panel-heading', this.$domNode).length==0); 
			event.enableStatus.addBody = ($('>.panel-body', this.$domNode).length==0); 
			event.enableStatus.addFooter = ($('>.panel-footer', this.$domNode).length==0); 
		},		
		
	
	    addHeading: function(){
	    	this._addItem("$UI/system/components/bootstrap/panel/panel(bootstrap)#heading", "heading");
	    }, 
	    
	    addBody: function(){
	    	this._addItem("$UI/system/components/bootstrap/panel/panel(bootstrap)#body", "body");
	    },	
	    
		addFooter: function(){
	    	this._addItem("$UI/system/components/bootstrap/panel/panel(bootstrap)#footer", "footer");
		},
	    
	    _addItem: function(component, name){
	    	var item = $(this.selector[name], this.$domNode);
	    	if (item.length == 0){
		    	var targetDID = this._getTargetDID(name);
		    	var self = this;
		    	xuiDoc.createComponent(component,this,
						{before: targetDID, templateContent:this.template[name], paintComponent:true},
						function(result){self.initStatus();});
	    	}else{
	    		alert(name + "已经存在，不允许添加多个！");
	    	}
	    },
		
		_getTargetDID: function(name){
			if (name === "heading"){
				return $(":first-child", this.$domNode).attr("d_id");
			}else if (name === "body"){
				return $(this.selector.footer, this.$domNode).attr("d_id");
			}else{
				return null;
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/panel/panel(bootstrap)":{
				properties:["xid"],
				toolbar:[{text:"添加heading",method:"addHeading"},{text:"添加body",method:"addBody"},{text:"添加footer",method:"addFooter"}],
				styleConfig:function(designer){
					return [
						    {
						  		text : '颜色设置',
						  		noLabel : false,//不显示标签
						  		isGroup:true,
						  		
						  		//可选数据
						  		items : [ {
						  			name : '颜色设置',
						  			noLabel : true,//不显示标签
						  			//可选数据
						  			optionData : [{
						  					propName : "class",//属性名
						  					value : "panel-default",//属性值
						  					text : "<button class='btn btn-default btn-sm' style='width:60px;margin:6px'>default</button>"
						  				}, {
						  					propName : "class",
						  					value : "panel-primary",
						  					text : "<button class='btn btn-primary btn-sm' style='width:60px;margin:6px'>primary</button>"
						  				}, {
						  					propName : "class",
						  					value : "panel-success",
						  					text : "<button class='btn btn-success btn-sm' style='width:60px;margin:6px'>success</button>"
						  				} , {
						  					propName : "class",
						  					value : "panel-info",
						  					text : "<button class='btn btn-info btn-sm' style='width:60px;margin:6px'>info</button>"
						  				} , {
						  					propName : "class",
						  					value : "panel-warning",
						  					text : "<button class='btn btn-warning btn-sm' style='width:60px;margin:6px'>warning</button>"
						  				} , {
						  					propName : "class",
						  					value : "panel-danger",
						  					text : "<button class='btn btn-danger btn-sm' style='width:60px;margin:6px'>danger</button>"
						  				}],
						  				editor : "listEditor"
						  			} ]
						    },
							{
								text : '风格',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>默认</button>"},
									              {propName : "class",value : "x-card",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>卡片风格</button>"}],
									              
									editor : "listEditor"
								}]
							},
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('position'),                                                               
						];
				}
			},
			"$UI/system/components/bootstrap/panel/panel(bootstrap)#heading":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			},
			"$UI/system/components/bootstrap/panel/panel(bootstrap)#body":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			},
			"$UI/system/components/bootstrap/panel/panel(bootstrap)#footer":{
				properties:["xid"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('font'), 
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('param'),
						    designer.getCommonStyleItem('position'),                                                               
							];
				}
			}
			
	};
	
	return {'$UI/system/components/bootstrap/panel/panel(bootstrap)':Panel,quickIdeEx:quickIdeEx};
});