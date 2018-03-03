/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var removeAll = function (data,disableRecordChange) {
		if(disableRecordChange) data.clear();
		else{
			var confirmDelete = data.confirmDelete;
			try{
				data.confirmDelete = false;
				data.deleteAllData();
			}finally{
				data.confirmDelete = confirmDelete;
			}
		}
	};

	var newRowData = function (data,defaultValue,disableRecordChange) {
		if($.isArray(defaultValue) && defaultValue.length>0){
			data.newData({'defaultValues':defaultValue,'disableRecordChange':disableRecordChange});
		}
	};
	
	var setValue = function (data, mapping, receiveData, rownum, row) {
		var from = mapping.from;
		var to = mapping.to;
		if (!from || from === "" || !to || to === "") return;
		var val = getValue(receiveData[rownum],from);
		'function'===typeof(data.setValue)?data.setValue(to, val, row):(data[to]=val);
	};

	var getValue = function (row, col) {
		if (!row) return;
		return 'function'===typeof(row.val)?row.val(col):row[col];
	};

	var createLocfrom = function (mappingDef, rowIndex, receiveData) {
		var re = [], locfrom = mappingDef.locfrom;
		for (var i = 0, c = locfrom.length; i < c; i++) {
			re.push(getValue(receiveData[rowIndex],locfrom[i]));
		}
		return re;
	};

	var loadMpping = function(comp){
		var mapping = comp['__mapping_def__'];
		if(!mapping){
			var $C = comp.$domNode;
			mapping = {mappings:[],locfrom:[],locto:[]};
			
			mapping.dataID = $C.find('result').attr("concept");
			mapping.operation = $C.find('result').attr("operation");
			$C.find('mapping').each(function(){
				var $m = $(this),locator=$m.attr("locator") === "true";
				if(locator){
					mapping.locfrom.push($m.attr("from"));
					mapping.locto.push($m.attr("to"));
				}
				var m = {};
				m['from'] = $m.attr("from");
				m['to'] = $m.attr("to");
				mapping.mappings.push(m);
			});
			
			comp['__mapping_def__'] = mapping;
		}
		return mapping;
	};
	
	var RMapping = {
		receiveByMapping : function(comp, receiveData){
			if (!comp || !receiveData) return;
			if(!$.isArray(receiveData)) receiveData = [receiveData]; 
			var mappingDef = loadMpping(comp), model = comp.getModel(), i, j, o, mappings = mappingDef.mappings;

			if (!mappingDef.dataID || mappingDef.dataID === "" || !mappingDef.operation || mappingDef.operation === "")
				return;

			var dataTar = model.comp(mappingDef.dataID);
			if (!dataTar) return;
			
			var newData = [];
			if(mappingDef.disableRecordChange) dataTar.disableRecordChange();
			try{				
				if (mappingDef.operation === "new") {
					for (i = 0; i < receiveData.length; i++) {
						o = {};
						for (j = 0; j < mappings.length; j++) {
							setValue(o, mappings[j], receiveData, i);
						}
						newData.push(o);
					}
					newRowData(dataTar,newData,mappingDef.disableRecordChange);
				} else if (mappingDef.operation == "edit") {
					for (i = 0; i < receiveData.length; i++) {
						var query = dataTar.find(mappingDef.locto, createLocfrom(mappingDef, i, receiveData), false,
								false, false);
						
						if (query && query.length > 0) {
							for (var k = 0; k < query.length; k++) {
								for (j = 0; j < mappings.length; j++) {
									setValue(dataTar, mappings[j], receiveData, i, query[k]);
								}
							}
						} else {
							o = {};
							for (j = 0; j < mappings.length; j++) {
								setValue(o, mappings[j], receiveData, i);
							}
							newData.push(o);
						}
					}
					newRowData(dataTar,newData,mappingDef.disableRecordChange);
				} else if (mappingDef.operation == "clear") {
					removeAll(dataTar,mappingDef.disableRecordChange);
					for (i = 0; i < receiveData.length; i++) {
						o = {};
						for (j = 0; j < mappings.length; j++) {
							setValue(o, mappings[j], receiveData, i);
						}
						newData.push(o);
					}
					newRowData(dataTar,newData,mappingDef.disableRecordChange);
				} else if (mappingDef.operation == "modify") {
					for (i = 0; i < receiveData.length; i++) {
						for (j = 0; j < mappings.length; j++) {
							setValue(dataTar, mappings[j], receiveData, i);
						}
					}
				} else {
					return;
				}		
			}finally{
				dataTar.enabledRecordChange();
			}
		}	
	};
	
	return RMapping;
});