/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery"),
		RTCalendar = require("../calendar"),
		Util = require("$UI/system/components/justep/common/designer/common");
	
	var _calendar = RTCalendar.extend({
		init: function(value, bindingContext){
			var cfg = Util.attr2js(this.$domNode,['view', 'views', 'day', 'firstDay', 'timeStart', 'timeEnd', 'timeSplit', 'lunarDay'/*, 'holiday'*/]);
			if(cfg) this.set(cfg);
			this.callParent(value, bindingContext);
		}
	});
	
	var quickIdeEx = {
			"$UI/system/components/justep/calendar/calendar":{
				properties:["xid","bind-ref","view","views","day","firstDay","lunarDay","timeStart","timeEnd","timeSplit",
	            {name:"onEventsLoad",text:"加载日程事件",editor:"eventEditor",noLabel:true},
	            {name:"onEventsSelected",text:"选择日程事件",editor:"eventEditor",noLabel:true},
	            {name:"onAfterEventsLoad",text:"事件加载完成",editor:"eventEditor",noLabel:true},
	            {name:"onAfterViewLoad",text:"视图加载完成",editor:"eventEditor",noLabel:true}],
	        styleConfig:function(designer){
					return [
						    designer.getCommonStyleItem('baseStyle'),designer.getCommonStyleItem('border'),designer.getCommonStyleItem('position')
						];
				}
				
			}
	}
	return {'$UI/system/components/justep/calendar/calendar':_calendar,quickIdeEx:quickIdeEx};
});