/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var Tree = require("../tree");
	require('css!./css/tree').load();

	var TreeDesigner = Tree.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);

			this.$domNode.children('div.x-tree-head').addClass('x-min-height').attr("d_canAddChild", "true").attr("d_canRemove", false);
			this.$domNode.children('.x-tree-content').attr("d_canRemove", false).attr('d_selectable', false);
			this.$domNode.find('.x-tree-template').addClass('x-min-height').attr("d_canAddChild", "true").attr("d_canRemove", false).attr(
					'd_selectable', false).children().addClass('x-min-height');
			this.$domNode.find('.x-tree-head .breadcrumb').attr("d_canRemove", false);

			this.$domNode.find('.x-scroll').attr("d_selectable", false);//不允许选中scrollView
		},
		_bindEvent : function() {
			var label = this.$domNode.attr('rootLabel');
			if (!label)
				label = '根';
			this.getModel().componentPromise(this.$domNode.find('.x-tree-head .breadcrumb')[0]).done(function(bar) {
				bar.push({
					label : label
				});
			});
		},
		dispose : function() {// 覆盖组件的实现
		}
	});
	var quickIdeEx = {
			"$UI/system/components/justep/tree/tree":{
				properties:["xid","data","labelColumn","rootLabel","limit","filter","autoLoad","disablePullToRefresh","disableInfiniteLoad"],
				styleConfig:function(designer){
					return [  //
					          {
					  			text : '扩展样式',
					     			noLabel : false,//显示标签
					     			isGroup:true,
					     			
					     			//可选数据
					     			items : [{
					     				name : 'class',
					     				noLabel : true,//不显示标签
					     				selectMode:"1", //选中无状态变化
					     				//可选数据
					     				optionData : [{propName : "class",value : "x-inner-scroll",text : "<button class='btn btn-success btn-sm' style='margin:6px'>内部出现滚动条</button>"
					     				},{propName : "class",value : "",text : "<button class='btn btn-success btn-sm' style='margin:6px'>内容自增长</button>"
					     				}],
					     				editor : "listEditor"
					     			} ]
					     		}, 
					     		designer.getCommonStyleItem('baseStyle'),
					     		designer.getCommonStyleItem('position')
					  	];
				}
			}
	}
	return {
		'$UI/system/components/justep/tree/tree' : TreeDesigner,quickIdeEx:quickIdeEx
	};
});