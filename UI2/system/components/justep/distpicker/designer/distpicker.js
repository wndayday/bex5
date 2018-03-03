/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	//var $ = require("jquery");
	var RTProvinceSelect = require("../provinceSelect");
	var RTCitySelect = require("../citySelect");
	var RTDistrictSelect = require("../districtSelect");
	var RTDistpicker =  require("../distpicker");
	
	var PopPicker =  require("$UI/system/components/justep/picker/designer/picker");

	var ProvinceSelect = RTProvinceSelect.extend({
		doInit : function(value, bindingContext, allBindings) {
		},
		doUpdate : function(value, bindingContext, allBindings) {
		}
	});

	var CitySelect = RTCitySelect.extend({
		doInit : function(value, bindingContext, allBindings) {
		},
		doUpdate : function(value, bindingContext, allBindings) {
		}
	});

	var DistrictSelect = RTDistrictSelect.extend({
		doInit : function(value, bindingContext, allBindings) {
		},
		doUpdate : function(value, bindingContext, allBindings) {
		}
	});

	var Distpicker = RTDistpicker.extend({
		doInit : function(value, bindingContext, allBindings) {
			this['bind-provinceRef'] = null;
			this['bind-cityRef'] = null;
			this['bind-districtRef'] = null;
		},
		doUpdate : function(value, bindingContext, allBindings) {
		},
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
			var $select;
			if ('bind-provinceRef' == key) {
				$select = this._get$Select('province');
				if($select.size()>0){
					$select.attr('bind-ref',value);
					xuiDoc.updateProperties($select,['bind-ref']);
				}
			}else if('bind-cityRef' == key){
				$select = this._get$Select('city');
				if($select.size()>0){
					$select.attr('bind-ref',value);
					xuiDoc.updateProperties($select,['bind-ref']);
				}
			}else if('bind-districtRef' == key){
				$select = this._get$Select('district');
				if($select.size()>0){
					$select.attr('bind-ref',value);
					xuiDoc.updateProperties($select,['bind-ref']);
				}
			}
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/distpicker/provinceSelect":{
				properties:["xid","bind-ref","optionsCaption","tabindex","accesskey","disabled"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('input-size'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
				
			},
			"$UI/system/components/justep/distpicker/citySelect":{
				properties:["xid","bind-ref","bind-provinceRef","optionsCaption","tabindex","accesskey","disabled"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('input-size'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
				
			},
			"$UI/system/components/justep/distpicker/districtSelect":{
				properties:["xid","bind-ref","bind-cityRef","optionsCaption","tabindex","accesskey","disabled"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('input-size'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
				
			},
			"$UI/system/components/justep/distpicker/distpicker":{
				properties:["xid","bind-provinceRef","bind-cityRef","bind-districtRef"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('input-size'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				}
				
			},
			"$UI/system/components/justep/distpicker/distpicker2":{
				properties:["xid","opacity"],
				events:["onOK","onShow","onHide"],
				styleConfig:function(designer){
					return [
					        designer.getCommonStyleItem('input-size'),
						    designer.getCommonStyleItem('baseStyle'),
						    designer.getCommonStyleItem('border'),
						    designer.getCommonStyleItem('position')
						];
				},
				operations:function(){
		        	return [{groupName:"地址选择",
		        		items:[{name:'show',label:"显示"}
		        		]}];
		        }
			}
	};

	return {
		'$UI/system/components/justep/distpicker/provinceSelect' : ProvinceSelect,
		'$UI/system/components/justep/distpicker/citySelect' : CitySelect,
		'$UI/system/components/justep/distpicker/districtSelect' : DistrictSelect,
		'$UI/system/components/justep/distpicker/distpicker' : Distpicker,
		'$UI/system/components/justep/distpicker/distpicker2' : PopPicker['$UI/system/components/justep/picker/popPicker'],
		quickIdeEx:quickIdeEx
	};
});