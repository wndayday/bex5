/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var GridSelectRT = require("../gridSelect");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	var GridSelect = GridSelectRT.extend({
		_showOption: function(){
			//设计时没有逻辑
		},
		set: function(v){
			//屏蔽所有属性赋值
			if(v && v.hasOwnProperty("data")){//data特殊处理，因为option需要使用
				var op = this.getOption();
				if(op) op.set({data:v.data});
			}
		},
		getOption: function(){
			var op = this.$domNode.find('option')[0];
			return this.getModel().comp(op);
		},
		doInit : function() {// 去除运行时的事件处理
			this.$domNode.append('<input class="form-control x-gridSelect-input">');
			this.$domNode.children().attr('d_selectable', false);
		}
	});

	var GridSelectOption = justep.BindComponent.extend({
		constructor : function(config) {
			this.data = null;
			this.callParent(config);
		},
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			this.columns_did = $domNode.children('columns').attr('d_id');
			this.data = $domNode.attr('data');
		},
		appendColumn: function(config) {
			var self = this;
			//获取data的did
			var dataID = this.get('data');
			var data = this.getModel().comp(dataID);
			if(!data){
				alert('请先设置option的data属性');
				return;
			}
			var data_did = data.$domNode.attr('d_id');
			// 获取data列信息
			var cols = xuiDoc.getEditorDataSource("RuleRelationDatasource.getDatasource",null,data_did);
			//打开编辑器
			xuiService.openPage("$UI/system/components/justep/dataTables/designer/appendColumn.w", {
				xml : config.nodeXml,
				cols : cols
			}, function(result) {
				var cols = result.cols, htmlcols = [];
				if($.isArray(cols)){
					for(var i=0;i<cols.length;i++){
						htmlcols.push('<column width="100" name="'+cols[i]+'"/>'); 
					}
					//创建列组件
					if(self.columns_did){
						var configs = [];
						for(i=0;i<htmlcols.length;i++){
							configs.push({
								componentName : "$UI/system/components/justep/grid/grid#column",
								parentElementId : self.columns_did,
								templateContent : htmlcols[i]
							});
						}
						//批量创建列
						xuiDoc.batchCreateComponent(configs);
					}else{
						xuiDoc.createComponent("$UI/system/components/justep/gridSelect/gridSelect#columns",self,{
							templateContent : '<columns>'+htmlcols.join("")+'</columns>'
						},function(node){self.columns_did = $(node).attr('d_id');});
					}
				}
			});
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/gridSelect/gridSelect":{
				properties:["xid",{text:"引用",name:"bind-ref"},{text:"显示名引用",name:"bind-labelRef"},{text:"扩展引用",name:"bind-extRef"},
				            {text:"空值时显示",name:"defaultLabel"},"valueSeparator",{text:"多选标签分隔符",name:"labelSeparator"},
				            {text:"多选扩展分隔符",name:"extSeparator"},"multiselect","clearButton","optionHeight","autoOptionWidth",
				            {text:"允许直接输入",name:"inputChangeable"},{text:"允许输入过滤",name:"inputFilterable"},"selectFilter",
				            {name:"option",text:"下拉选项",properties:["data",
				            {text:"行过滤表达式",name:"filter"},{text:"下拉值",name:"value"},{text:"下拉显示名",name:"label"},
				            {text:"下拉扩展",name:"ext"},{text:"选项自动加载",name:"autoLoad"},"multikey","multiboxonly","multiselectWidth","serverSort",
				            "appearance","expandColumn","useVirtualRoot","virtualRootLabel","altRows",{text:"行交替样式",name:"altclass"},
				            "showRowNumber","rowNumberWidth"]},"tabindex","accesskey","disabled"],
				events:[{name:"onShowOption",text:"显示下拉事件"},{name:"onHideOption",text:"关闭下拉事件"},{name:"onTreeIconRender",text:"树形图标渲染"},
				            {name:"onUpdateValue",text:"更新值事件"},{name:"onFilterInputChange",text:"输入改变事件"},{name:"onOptionFilter",text:"行过滤事件"}],
				styleConfig:function(designer){
					return [
						     designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('position'),
						 	];
				}
			},
			"$UI/system/components/justep/gridSelect/gridSelect#option":{
				properties:["xid","data","filter",{text:"下拉值",name:"value"},{text:"下拉显示名",name:"label"},
				            {text:"下拉扩展",name:"ext"},{text:"选项自动加载",name:"autoLoad"},"multikey","multiboxonly","multiselectWidth","serverSort",
				            "appearance","expandColumn","useVirtualRoot","virtualRootLabel","altRows","altclass","showRowNumber","rowNumberWidth"],
				toolbar:[{text:"添加列",method:"appendColumn"}],
			},
			"$UI/system/components/justep/gridSelect/gridSelect#column":{
				properties:[{name:"ref",text:"引用"},"label","width","align","hidden","resizable","formatter","sortable","sorttype",
				            {name:"NumberFormatOptions",text:"数值格式选项",properties:["thousandsSeparator",
				                "decimalPlaces","defaultValue","prefix","suffix"]},				            
					        {name:"DateFormatOptions",text:"日期格式选项",properties:[{name:"dateFormat",text:"格式","default-value":"例如：Y-m-d H:i"}]}],
			},
			"$UI/system/components/justep/gridSelect/gridSelect#columns":{
				properties:[{name:"xid",text:"编号"}]
			}
	}
	
	return {
		'$UI/system/components/justep/gridSelect/gridSelect' : GridSelect,
		'$UI/system/components/justep/gridSelect/gridSelect#option' : GridSelectOption,
		quickIdeEx:quickIdeEx
	};
});