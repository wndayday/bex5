package com.justep.studio.ui.editors.property.strategy;

import java.util.ArrayList;
import java.util.List;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;

public class AllConceptsStrategy implements IPropertyValueStrategy {

	public String transformPropertyValue(DataSet dataset) {
		List<DataRecord> rcList = dataset.getSelectedRecord();
		if(rcList.size()>0){
			String nodeType = rcList.get(0).getString("nodeType");
			if(!("false".equals(rcList.get(0).getString("asPath")))){
				return getPath(rcList.get(0));
			}
		}
		return "";
	}
	
	private String getPath(DataRecord record){
		List<DataRecord> valueList = new ArrayList();
		buildPath(record,valueList);
		StringBuilder path = new StringBuilder();
		for(int i=valueList.size()-1;i>=0;i--){
			DataRecord tmpRecord = valueList.get(i);
			String name = tmpRecord.getString("name");
			if(name == null || "".equals(name)){
				name = record.getString("text");
			}
			String type = tmpRecord.getString("nodeType");			
			if("concept".equals(type)){
				path.append(name);
			}		
		}		
		return path.toString();
	}
	
	private void  buildPath(DataRecord record,List valueList){		
		valueList.add(record);
		DataRecord pNode = record.getParent();
		if(pNode != null && !("false".equals(pNode.getString("asPath")))){
			buildPath(pNode,valueList);
		}
	}

}
