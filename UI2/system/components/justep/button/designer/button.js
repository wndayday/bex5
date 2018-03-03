/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var Button = require("../button");
	var ButtonGroup = require("../buttonGroup");
	var Radio = require("../radio");
	var Checkbox = require("../checkbox");
	var RadioPC = require("../radioPC");
	var CheckboxPC = require("../checkboxPC");
	var Toggle = require("../toggle");
	require('css!./css/button').load();

	var _Button = Button.extend({
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);

			this.callParent(value, bindingContext);
			var cfg = Util.attr2js($domNode, [ 'label', 'icon', 'image' ]);
			if (cfg)
				this.set(cfg); 			
			var onclick = xuiDoc.get(this,'onClick');
			if (onclick && 0 < onclick.indexOf('operation')) {
				// 操作感知
				this.on('onClick', onclick);
			}
			$domNode.removeAttr('onclick').off('click');
			this._d_inited_ = true;
			this._getLabelNode().attr('d_selectable', false).attr("d_canRemove", false).attr("d_canAddChild", false);
			this._getIconNode().attr('d_selectable', false).attr("d_canRemove", false).attr("d_canAddChild", false);
			this._getImgNode().attr('d_selectable', false).attr("d_canRemove", false).attr("d_canAddChild", false);
		},
		set:function(v,value){
			this.callParent(v,value);
			this.bindOperation(value);
		},
		bindOperation : function(data) { 
			if (data && data.name && data.name=='onClick')
				this.on(data.name, data.value||'{}');
		},
		_getImgUrl : function(icon) {// "icon-refresh"/"img:xxx.png|xxx.png"
			if (typeof (icon) === 'string' && 0 === icon.indexOf('img:')) {
				var ipos = icon.indexOf('|');
				if(!this.disabled || ipos < 0){
					if (ipos < 0)
						ipos = icon.length;
					return icon.slice(4, ipos);
				}else	return icon.slice(ipos);
			} 
		},
		propertyChangedHandler : function(key, oldVal, value) { 
			var $img,$icon,url,newImg; 
			switch (key) {
			case "label":
				this.callParent(key, oldVal, value);
				if (this._d_inited_)
					xuiDoc.updateText(this._getLabelNode());
				break;
			case "disabled":
				if (this.$domNode) {
					if (this.isImgIcon) {
						$img = this._getImgNode();
						$icon = this._getIconNode();
						$icon.removeAttr('class');
						xuiDoc.updateProperties($icon, [ 'class' ]);
						newImg = false;
						if ($img.size() <= 0){
							newImg = true;
							this._getLabelNode().before('<img d_selectable="false" d_canRemove="false"/>');
						}
						$img = this._getImgNode();
						//这个逻辑是为了同步设计时模型，同步后在刷新设计器显示，特殊处理
						url = this._getImgUrl(value);
						$img.attr('src', url?url:'');
						if(newImg) xuiDoc.updateNodes($img);
						else xuiDoc.updateProperties($img, ['src']);
						//这是为了在设计器正常显示
						$img.attr('src', this.imgIcon[this.disabled ? 1 : 0]);
					}
				}
				break;
			case "icon":
				if (oldVal != value) {
					this._setIcon(this.icon || this.opIcon);
					if (this.$domNode) {
						if (!this.isImgIcon) {
							$icon = this._getIconNode();
							if (oldVal)
								$icon.removeClass(oldVal);
							if (this.opIcon)
								$icon.removeClass(this.opIcon);
							if (value)
								$icon.addClass(this.icon || this.opIcon);
							xuiDoc.updateProperties($icon, [ 'class' ]);
							$img = this._getImgNode();
							if ($img.size() > 0) {
								if( $img.attr('d_id')){
									xuiDoc.deleteComponent([ $img.attr('d_id') ]);									
								}
								$img.remove();
							}
						} else {
							$img = this._getImgNode();
							if (value) {
								$icon = this._getIconNode();
								$icon.removeAttr('class');
								xuiDoc.updateProperties($icon, [ 'class' ]);
								newImg = false;
								if ($img.size() <= 0){
									newImg = true;
									this._getLabelNode().before('<img d_selectable="false" d_canRemove="false"/>');
								}
								$img = this._getImgNode();
								//这个逻辑是为了同步设计时模型，同步后在刷新设计器显示，特殊处理
								url = this._getImgUrl(value);
								$img.attr('src', url?url:'');
								if(newImg) xuiDoc.updateNodes($img);
								else xuiDoc.updateProperties($img, ['src']);
								//这是为了在设计器正常显示
								$img.attr('src', this.imgIcon[this.disabled ? 1 : 0]);
							}
						}
					}
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	var _ButtonGroup = ButtonGroup.extend({
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			var cfg = Util.attr2js($domNode, [ 'selected' ]);
			this.callParent(value, bindingContext);
			if (cfg)
				this.set(cfg);
			this.$domNode.off('click');
		},
		addButton : function() {
			xuiDoc.createComponent('$UI/system/components/justep/button/button', this, {
				paintComponent : true
			});
		}
	});

	function createRadioButton(button, type) {
		button.$domNode = $(button.domNode);
		button.$domNode.append("<input type='" + type + "'/><label/>");
		var cfg = Util.attr2js(button.$domNode, [ 'label', 'name', 'value' ]);
		if (cfg)
			button.set(cfg);
	}

	var _Radio = Radio.extend({
		init : function(value, bindingContext) {
			createRadioButton(this, 'radio');
			this.callParent(value, bindingContext);
			this._getInput().off('click');
		}
	});

	var _Checkbox = Checkbox.extend({
		init : function(value, bindingContext) {
			createRadioButton(this, 'checkbox');
			this.callParent(value, bindingContext);
			this._getInput().off('click');
		}
	});

	function createRadioPC(button, type) {
		button.$domNode = $(button.domNode);
		button.$domNode.append("<label><input type='" + type + "'/><span/></label>");
		var cfg = Util.attr2js(button.$domNode, [ 'label', 'name', 'value' ]);
		if (cfg)
			button.set(cfg);
	}

	var _RadioPC = RadioPC.extend({
		init : function(value, bindingContext) {
			createRadioPC(this, 'radio');
			this.callParent(value, bindingContext);
			this._getInput().off('click');
		}
	});

	var _CheckboxPC = CheckboxPC.extend({
		init : function(value, bindingContext) {
			createRadioPC(this, 'checkbox');
			this.callParent(value, bindingContext);
			this._getInput().off('click');
		}
	});

	function createToggle(button) {
		button.$domNode = $(button.domNode);
		var type = button.$domNode.attr('type'), onLabel = button.$domNode.attr('ON'), offLabel = button.$domNode.attr('OFF');
		if (!type)
			type = 'radio';
		if (!onLabel)
			onLabel = 'ON';
		if (!offLabel)
			offLabel = 'OFF';
		button.$domNode.append("<input type='" + type + "'/><label data-on='" + onLabel + "' data-off='" + offLabel + "'><span/></label>");
		var cfg = Util.attr2js(button.$domNode, [ 'name', 'value' ]);
		if (!cfg)
			cfg = {};
		cfg['label'] = {
			on : onLabel,
			off : offLabel
		};
		if (cfg)
			button.set(cfg);
	}

	var _Toggle = Toggle.extend({
		init : function(value, bindingContext) {
			createToggle(this);
			this.callParent(value, bindingContext);
			this._getInput().off('click');
			this.ON = this.label.on;
			this.OFF = this.label.off;
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "ON":
			case "OFF":
				if (this._inited) {
					this.set({
						label : {
							on : this.ON,
							off : this.OFF
						}
					});
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});
	
	var webIdeEx = {
		"$UI/system/components/justep/button/button":{
			styleConfig:function(ownerDesigner){
				var dafaultstyle= "color: #ffffff !important; background-color: #3399f3 !important;  border-color: #3399f3 !important;";
				var primarystyle= "color: #ffffff; background-color: #2fa4e7; border-color: #2fa4e7;";
				var infostyle= "color: #ffffff;  background-color: #033c73; border-color: #033c73;";
				var warningstyle= "color: #ffffff; background-color: #dd5600;  border-color: #dd5600;";
				if(ownerDesigner.isBizIde){
					dafaultstyle = "";
					primarystyle = "";
					infostyle = "";
					warningstyle = "";
				}
				return [
				    	{
				    		text : '预定义样式',
				    		id:"preStyle",
				    		noLabel : false,//不显示标签
				    		isGroup:true,
				    		
				    		//可选数据
				    		items : [ {
				    			name : 'class',
				    			noLabel : true,//不显示标签
				    			//可选数据
				    			optionData : 
				    				[
				    				    {propName : "class",value : "btn-default",text : "<button class='btn btn-default' style='"+dafaultstyle+"width:60px;margin:5px'>default1</button>"}, 
					    			        {propName : "class",value : "btn-primary",text : "<button class='btn btn-primary' style='"+primarystyle+"width:60px;margin:5px'>primary</button>"}, 
					    					{propName : "class",value : "btn-info",text : "<button class='btn btn-info' style='"+infostyle+"width:60px;margin:5px'>info</button>"}, 
					    					{propName : "class",value : "btn-success",text : "<button class='btn btn-success' style='width:60px;margin:5px'>success</button>"}, 
					    					{propName : "class",value : "btn-warning",text : "<button class='btn btn-warning' style='"+warningstyle+"width:60px;margin:5px'>warning</button>"}, 
				    					{propName : "class",value : "btn-danger",text : "<button class='btn btn-danger' style='width:60px;margin:5px'>danger</button>"}, 
				    					{propName : "class",value : "x-black",text : "<button class='btn x-black' style='width:60px;margin:5px'>black</button>"}, 
				    					{propName : "class",value : "x-blue",text : "<button class='btn x-blue' style='width:60px;margin:5px'>blue</button>"}, 
				    					{propName : "class",value : "x-orange",text : "<button class='btn x-orange' style='width:60px;margin:5px'>orange</button>"}, 
				    					{propName : "class",value : "x-green",text : "<button class='btn x-green' style='width:60px;margin:5px'>green</button>"}, 
				    					{propName : "class",value : "x-red",text : "<button class='btn x-red' style='width:60px;margin:5px'>red</button>"}, 
				    					{propName : "class",value : "x-yellow",text : "<button class='btn x-yellow' style='width:60px;margin:5px'>yellow</button>"}, 
				    					{propName : "class",value : "x-purple",text : "<button class='btn x-purple' style='width:60px;margin:5px'>purple</button>"},
				    					{propName : "class",value : "btn-link",text : "<button class='btn btn-link' style='width:60px;margin:5px'>link</button>"}
				    				],
				    				editor : "listEditor"
				    			} ]
				    		},{
				    			text : '形状',
				    			id:"shage",
				    			isGroup:true,
				    			
				    			//可选数据
				    			items : [{
				    				name : 'style',
				    				noLabel : true,//不显示标签
				    				optionData : [ {
				    					propName : "style",//属性名
				    					value : "border-radius:5px",//属性值
				    					text : "<button class='btn btn-success' style='width:70px;margin:6px'>方角</button>"
				    				},  {
				    					propName : "style",
				    					value : "border-radius:15px",
				    					text : "<button class='btn btn-success' style='border-radius:15px;width:70px;margin:6px'>圆角</button>"
				    				} ],
				    				editor : "listEditor"
				    			}]
				    		},{
				    			text : '图标',
				    			id:"icon",
				    			isGroup:true,
				    			items : [ {
				    			name:'icon',
				    			noLabel : true,//不显示标签
				    			selectMode:"0", //选中无状态变化
				    			//可选数据
				    			optionData : [ {
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "",//属性值
				    					text : "<a class='font-icon-a linear ' style='font-size: 20px;'>无</a>"
				    				} ,{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-sync",//属性值
				    					text : "<a class='font-icon-a linear linear-sync' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",
				    					name:"icon",
				    					value : "linear linear-users",
				    					text : "<a class='font-icon-a linear linear-users' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-user",//属性值
				    					text : "<a class='font-icon-a linear linear-user' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-undo",//属性值
				    					text : "<a class='font-icon-a linear linear-undo' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-trash",//属性值
				    					text : "<a class='font-icon-a linear linear-trash' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-bubble",//属性值
				    					text : "<a class='font-icon-a linear linear-bubble' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-chevronleft",//属性值
				    					text : "<a class='font-icon-a linear linear-chevronleft' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-chevronright",//属性值
				    					text : "<a class='font-icon-a linear linear-chevronright' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",//属性名
				    					name:"icon",
				    					value : "linear linear-chevronup",//属性值
				    					text : "<a class='font-icon-a linear linear-chevronup' style='font-size: 18px;padding: 0px 3px;'></a>"
				    				}, {
				    					propName : "class",
				    					name:"icon",
				    					value : "linear linear-cog",
				    					text : "<a class='font-icon-a linear linear-cog' style='font-size: 18px;padding: 0px 3px;'></a>"
				    				}, {
				    					propName : "class",
				    					name:"icon",
				    					value : "linear linear-cross",
				    					text : "<a class='font-icon-a linear linear-cross' style='font-size: 17px;padding: 0px 3px;'></a>"
				    				}, {
				    					propName : "class",
				    					name:"icon",
				    					value : "linear linear-arrowupcircle",
				    					text : "<a class='font-icon-a linear linear-arrowupcircle' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				}, {
				    					propName : "class",
				    					name:"icon",
				    					value : "linear linear-arrowup",
				    					text : "<a class='font-icon-a linear linear-arrowup' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				}, {
				    					propName : "class",
				    					name:"icon",
				    					value : "linear linear-arrowrightcircle",
				    					text : "<a class='font-icon-a linear linear-arrowrightcircle' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",
				    					name:"icon",
				    					value : "e-commerce e-commerce-jiahao",
				    					text : "<a class='font-icon-a e-commerce e-commerce-jiahao' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				},{
				    					propName : "class",
				    					name:"icon",
				    					value : "e-commerce e-commerce-gou",
				    					text : "<a class='font-icon-a e-commerce e-commerce-gou' style='font-size: 19px;padding: 0px 3px;'></a>"
				    				}],
				    				editor : "listEditor"
				    			}]
				    		},{
				    			id:"iconPosition",
				    			text : '图标位置',
				    			isGroup:true,
				    			items : [ {
				    			name:'class',
				    			noLabel : true,//不显示标签
				    			//可选数据
				    			optionData : [ {
			    					propName : "class",//属性名 btn-icon-left btn-icon-top btn-icon-bottom btn-icon-right
			    					value : "btn-icon-left",//属性值
			    					text : "<button class='btn btn-success ' style='margin:6px;width:66px;'>居左</button>"
			    				}, {
			    					propName : "class",
			    					value : "btn-icon-top",
			    					text : "<button class='btn btn-success ' style='margin:6px;width:66px;'>居上</button>"
			    				}, {
			    					propName : "class",
			    					value : "btn-icon-bottom",
			    					text : "<button class='btn btn-success ' style='margin:6px;width:66px;'>居下</button>"
			    				}, {
			    					propName : "class",
			    					value : "btn-icon-right",
			    					text : "<button class='btn btn-success ' style='margin:6px;width:66px;'>居右</button>"
			    				}],
				    			editor : "listEditor"
				    		}]
				    		},{
				    			id:"displayStyle",
				    			text : '按钮展现形式',
				    			isGroup:true,
				    			items : [ {
				    			name:'class',
				    			noLabel : true,//不显示标签
				    			//可选数据
				    			optionData : [ {
				    					propName : "class",//属性名 btn-icon-left btn-icon-top btn-icon-bottom btn-icon-right
				    					value : "btn-only-icon",//属性值
				    					text : "<button class='btn btn-success btn-icon-left e-commerce e-commerce-tupian' style='margin:6px'></button>"
				    				}, {
				    					propName : "class",
				    					value : "btn-only-label",
				    					text : "<button class='btn btn-success' style='margin:8px 12px;'>只显示标签</button>"
				    				}, {
				    					propName : "class",
				    					value : "",
				    					text : "<button class='btn btn-success e-commerce e-commerce-tupian' style='margin:6px'>默认全显示</button>"
				    			}],
				    			editor : "listEditor"
				    			}]
				    		},{
				    			id:"size",
				    			text : '尺寸样式',
				    			isGroup:true,
				    			items : [ {
				    			name:'class',
				    			noLabel : true,//不显示标签
				    			//可选数据
				    			optionData : [ {
				    				propName : "class",//属性名
				    				value : "btn-lg",//属性值
				    				text : "<button class='btn btn-success btn-lg' style='margin:6px'>大按钮</button>"
				    			}, {
				    				propName : "class",
				    				value : "btn-sm",
				    				text : "<button class='btn btn-success btn-sm' style='margin:6px'>小按钮</button>"
				    			}, {
				    				propName : "class",
				    				value : "btn-xs",
				    				text : "<button class='btn btn-success btn-xs' style='margin:6px'>超小按钮</button>"
				    			}, {
				    				propName : "class",
				    				value : "",
				    				text : "<button class='btn btn-success' style='margin:6px'>默认大小</button>"
				    			}],
				    			editor : "listEditor"
				    		}]
				    		},{
				    			id:"border",
				    			text : '边距',
				    			isGroup:true,
				    			items : [ {
					    			name:'边距',
					    			noLabel : true,//不显示标签
					    			selectMode:"0",
//					    			showMarginOrPadding:"2", //1:外边距 2：内边距  
					    			//可选数据
					    			editor : "marginEditor"
				    		}]
				    		},
				    		ownerDesigner.getCommonStyleItem('font'),
				    		ownerDesigner.getCommonStyleItem('border'),
				    		ownerDesigner.getCommonStyleItem('baseStyle'),
				    		ownerDesigner.getCommonStyleItem('position')
				       ];
			}
		}	,
		"$UI/system/components/justep/button/radio":{
			styleConfig:function(designer){
				return [
				        designer.getCommonStyleItem('radio-size'),
				   	   designer.getCommonStyleItem('radio-group-ext'),
				  		designer.getCommonStyleItem('radio-group-color'),
				  		designer.getCommonStyleItem('position')
				     ];
			}
		},
		"$UI/system/components/justep/button/checkbox":{
			styleConfig:function(designer){
				return [
				        designer.getCommonStyleItem('checkbox-size'),
				    	designer.getCommonStyleItem('checkbox-group-ext'),
					    designer.getCommonStyleItem('checkbox-group-color'),
					    designer.getCommonStyleItem('position')
				    ];
			}
		}
	};
	
	var quickIdeEx = {
            "$UI/system/components/justep/button/button":{
            	properties:["xid",
            	{name:"label"},
            	"target",
            	"icon"],
            	events:["onClick"],
            	styleConfig:function(ownerDesigner){
            		return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/button");
            	}
            },
            
            "$UI/system/components/justep/button/radio":{
            	properties:["bind-ref","bind-label","name","bind-value","label","value","checkedValue","uncheckedValue","checked"],
            	events:["onChange"],
				styleConfig:function(ownerDesigner){ 
					return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/radio");
				}
            },
            
            "$UI/system/components/justep/button/radioPC":{
            	properties:["xid","bind-ref","bind-label","name","bind-value","label","value","checkedValue","uncheckedValue","checked"],
            	events:["onChange"],
				styleConfig:function(ownerDesigner){ 
					return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/radio");
				}
            },
            
            "$UI/system/components/justep/button/checkbox":{
            	properties:["bind-ref","name","label","value","bind-label","bind-value","checkedValue","uncheckedValue","checked"],
            	events:["onChange"],
				styleConfig:function(ownerDesigner){ 
					return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/checkbox");
				}
            },
            
            "$UI/system/components/justep/button/checkboxPC":{
            	properties:["xid","bind-ref","name","label","value","bind-label","bind-value","checkedValue","uncheckedValue","checked"],
            	events:["onChange"],
				styleConfig:function(ownerDesigner){ 
					return ownerDesigner.getCompStyleItems("$UI/system/components/justep/button/checkbox");
				}
            },
            
            "$UI/system/components/justep/button/toggle":{
            	properties:["bind-ref", "value","checkedValue","uncheckedValue","checked","ON","OFF"]
            },
            
			"$UI/system/components/justep/button/buttonGroup":{
            	properties:["xid","tabbed",{name:"selected",editor:"buttonXidEditor"}],
            	events:["onSelect"],
				toolbar:[{text:"增加按钮",method:"addButton"}],
				styleConfig:function(ownerDesigner){ 
					return [
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
							{
								text : '尺寸样式',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "btn-group-lg",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>大</button>"},
									              {propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>中</button>"},
									              {propName : "class",value : "btn-group-sm",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>小</button>"},
									              {propName : "class",value : "btn-group-xs",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>很小</button>"}],
									              
									editor : "listEditor"
								}]
							}, 
							{
								text : '排列方式',
								noLabel : false,//显示标签
								isGroup:true,
								items :[{
									name : 'class',
									noLabel : true,//不显示标签
									//可选数据
									optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>水平</button>"},
									              {propName : "class",value : "btn-group-vertical",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>垂直</button>"},
									              {propName : "class",value : "btn-group-justified",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>水平充满</button>"}],
									              
									editor : "listEditor"
								}]
							} 
							
					        ];
				}				
			}
	};

	return {
		'$UI/system/components/justep/button/button' : _Button,
		'$UI/system/components/justep/button/buttonGroup' : _ButtonGroup,
		'$UI/system/components/justep/button/radio' : _Radio,
		'$UI/system/components/justep/button/checkbox' : _Checkbox,
		'$UI/system/components/justep/button/radioPC' : _RadioPC,
		'$UI/system/components/justep/button/checkboxPC' : _CheckboxPC,
		'$UI/system/components/justep/button/toggle' : _Toggle,
		webIdeEx:webIdeEx,
		quickIdeEx:quickIdeEx
	};
});