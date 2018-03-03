define(function(require){
	var $ = require("jquery");
	require("$UI/system/components/justep/common/res");
	require('css!./row').load();
	var rtRow = require("../row");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	
	var Row = rtRow.extend({
		constructor: function(config){
			this.callParent();
			this.domNode = config.templateNode;
			this.domNode.componentObj = this;
		},
		addRowAtBefore:function(){
			var parent_d_id = $(this.domNode).parent().attr('d_id'),
				d_id = $(this.domNode).attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row(bootstrap)", parent_d_id,{paintComponent:true, before: d_id});
		},
		addRowAtAfter:function(){
			var parent_d_id = $(this.domNode).parent().attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row(bootstrap)", parent_d_id,{paintComponent:true});
		},
		addCol:function(){
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row(bootstrap)#col",this,{paintComponent:true});
		},
		dispose:function(){
			this.domNode.componentObj = null;
		}
	});
	
	var Col = function(config){
		this.domNode = config.templateNode;
		this.domNode.componentObj = this;
		this.domNode.setAttribute("d_canAddChild","true");
	};
	
	Col.prototype = {
		dispose:function(){
			this.domNode.componentObj = null;
		},
		addRow:function(){
			var parent_d_id = $(this.domNode).attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row(bootstrap)", parent_d_id,{paintComponent:true});
		}
    };
	
	var quickIdeEx = {
			"$UI/system/components/bootstrap/row/row(bootstrap)":{
				toolbar:[{text:"添加列",method:"addCol"},{text:"在上边添加行",method:"addRowAtBefore"},{text:"在下边添加行",method:"addRowAtAfter"}],
				styleConfig:function(designer){
					return [
					  	  designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					   	];
				}
			},
			"$UI/system/components/bootstrap/row/row(bootstrap)#col":{
				toolbar:[{text:"添加行",method:"addRow"}],
/*				styleConfig:function(designer){
					return [
					  	  designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position'),
					   	];
				}
*/				styleConfig:function(designer){
					return [
					   designer.getCommonStyleItem('baseStyle'),
					   designer.getCommonStyleItem('font'),
						{
							text : '非常小(<768px)屏幕',
							noLabel : false,//显示标签
							isGroup:true,
							items :[{
								name : 'class',
								noLabel : true,//不显示标签
								//可选数据
								optionData : [{propName : "class",value : "col-xs-1",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>1/12</button>"},
								              {propName : "class",value : "col-xs-2",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>2/12</button>"},
								              {propName : "class",value : "col-xs-3",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>3/12</button>"},
								              {propName : "class",value : "col-xs-4",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>4/12</button>"},
								              {propName : "class",value : "col-xs-5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>5/12</button>"},
								              {propName : "class",value : "col-xs-6",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>6/12</button>"},
								              {propName : "class",value : "col-xs-7",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>7/12</button>"},
								              {propName : "class",value : "col-xs-8",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>8/12</button>"},
								              {propName : "class",value : "col-xs-9",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>9/12</button>"},
								              {propName : "class",value : "col-xs-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>10/12</button>"},
								              {propName : "class",value : "col-xs-11",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>11/12</button>"},
								              {propName : "class",value : "col-xs-12",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>12/12</button>"}],
								              
								editor : "listEditor"
							}]
						} ,	{
							text : '小(≥768px)屏幕',
							noLabel : false,//显示标签
							isGroup:true,
							items : [{
								name : 'class',
								noLabel : true,//不显示标签
								//可选数据
								optionData : [{propName : "class",value : "col-sm-1",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>1/12</button>"},
								              {propName : "class",value : "col-sm-2",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>2/12</button>"},
								              {propName : "class",value : "col-sm-3",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>3/12</button>"},
								              {propName : "class",value : "col-sm-4",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>4/12</button>"},
								              {propName : "class",value : "col-sm-5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>5/12</button>"},
								              {propName : "class",value : "col-sm-6",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>6/12</button>"},
								              {propName : "class",value : "col-sm-7",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>7/12</button>"},
								              {propName : "class",value : "col-sm-8",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>8/12</button>"},
								              {propName : "class",value : "col-sm-9",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>9/12</button>"},
								              {propName : "class",value : "col-sm-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>10/12</button>"},
								              {propName : "class",value : "col-sm-11",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>11/12</button>"},
								              {propName : "class",value : "col-sm-12",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>12/12</button>"}],
								editor : "listEditor"
							}]
						}, {
							text : '中(≥992px)屏幕',
							noLabel : false,//显示标签
							isGroup:true,
							items :[{
								name : 'class',
								noLabel : true,//不显示标签
								//可选数据
								optionData : [{propName : "class",value : "col-md-1",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>1/12</button>"},
								              {propName : "class",value : "col-md-2",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>2/12</button>"},
								              {propName : "class",value : "col-md-3",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>3/12</button>"},
								              {propName : "class",value : "col-md-4",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>4/12</button>"},
								              {propName : "class",value : "col-md-5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>5/12</button>"},
								              {propName : "class",value : "col-md-6",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>6/12</button>"},
								              {propName : "class",value : "col-md-7",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>7/12</button>"},
								              {propName : "class",value : "col-md-8",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>8/12</button>"},
								              {propName : "class",value : "col-md-9",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>9/12</button>"},
								              {propName : "class",value : "col-md-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>10/12</button>"},
								              {propName : "class",value : "col-md-11",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>11/12</button>"},
								              {propName : "class",value : "col-md-12",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>12/12</button>"}],
								editor : "listEditor"
							}]
						}, {
							text : '大(≥1200px)屏幕',
							noLabel : false,//显示标签
							isGroup:true,
							items :[{
								name : 'class',
								noLabel : true,//不显示标签
								//可选数据
								optionData : [{propName : "class",value : "col-lg-1",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>1/12</button>"},
								              {propName : "class",value : "col-lg-2",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>2/12</button>"},
								              {propName : "class",value : "col-lg-3",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>3/12</button>"},
								              {propName : "class",value : "col-lg-4",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>4/12</button>"},
								              {propName : "class",value : "col-lg-5",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>5/12</button>"},
								              {propName : "class",value : "col-lg-6",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>6/12</button>"},
								              {propName : "class",value : "col-lg-7",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>7/12</button>"},
								              {propName : "class",value : "col-lg-8",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>8/12</button>"},
								              {propName : "class",value : "col-lg-9",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>9/12</button>"},
								              {propName : "class",value : "col-lg-10",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>10/12</button>"},
								              {propName : "class",value : "col-lg-11",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>11/12</button>"},
								              {propName : "class",value : "col-lg-12",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>12/12</button>"}],
								editor : "listEditor"
							}]
						}, {
							text : '分割线',
							noLabel : false,//显示标签
							isGroup:true,
							items :[{
								name : 'class',
								noLabel : true,//不显示标签
								//可选数据
								optionData : [{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>不显示</button>"},
								              {propName : "class",value : "col-spliter-left",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>在左侧</button>"},
								              {propName : "class",value : "col-spliter-right",text : "<button class='btn btn-success btn-sm' style='margin:6px;width:60px'>在右侧</button>"}],
								editor : "listEditor"
							}]
							
						}                                           
					];
			}
		},
	}
	return {
		"$UI/system/components/bootstrap/row/row(bootstrap)":Row,
		"$UI/system/components/bootstrap/row/row(bootstrap)#col":Col,
		quickIdeEx:quickIdeEx
	};
});

