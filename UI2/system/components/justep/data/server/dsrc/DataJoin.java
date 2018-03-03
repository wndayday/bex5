import java.util.List;

import org.dom4j.Element;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.ui2.system.component.data.BaseDataUtils;

public class DataJoin {
	public static final String DATA_JOIN_KEY = "join";
	public static final String LEFT_TABLE_NAME = "leftTable";
	public static final String RIGHT_TABLE_NAME = "rightTable";
	public static final String JOIN_TYPE_NAME = "type";
	public static final String JOIN_TYPE_DEFAULT = "inner";
	public static final String LEFT_FIELD_NAME = "leftField";
	public static final String RIGHT_FIELD_NAME = "rightField";
	public static final String COMP_FN_NAME = "fn";
	public static final String COMP_FN_DEFAULT = "eq";
	public static final String JOIN_ON_NAME = "on";
	public static final String AGGREGATE_KEY = "aggregate";
	public static final String AGGREGATE_FN_NAME = "fn";
	public static final String AGGREGATE_ITEM_NAME = "item";
	public static final String FILTER_KEY = "filter";
	public static final String COLUMN_KEY = "column";
	public static final String FIELD = "field";
	public static final String NAME = "name";
	public static final String LABEL = "label";
	public static final String FILTER = "filter";
	
	public static final String FILTERS_NAME = "filters";
	public static final String COLUMNS_NAME = "columns";
	public static final String AGGREGATE_NAME = "aggregate";
	
	
	private JSONArray DataJoinItems = new JSONArray();
	
	private JSONArray loadFilters(Element eJoin){
		if(null!=eJoin){
			@SuppressWarnings("unchecked")
			List<Element> eFilters =  eJoin.elements(FILTER_KEY);
			if(null!=eFilters && !eFilters.isEmpty()){
				JSONArray filters = new JSONArray();
				for(Element eFilter : eFilters){
					String name = eFilter.attributeValue(NAME);
					String filterText = eFilter.getTextTrim();
					if(!BaseDataUtils.isStringEmpty(name) && !BaseDataUtils.isStringEmpty(filterText)){
						JSONObject filter = new JSONObject();
						filter.put(NAME, name);
						filter.put(FILTER, filterText);
						filters.add(filter);
					}
				}
				return filters;
			}
		}
		return null;
	}
	
	private JSONArray loadColumns(Element eJoin){
		if(null!=eJoin){
			@SuppressWarnings("unchecked")
			List<Element> eCols =  eJoin.elements(COLUMN_KEY);
			if(null!=eCols && !eCols.isEmpty()){
				JSONArray cols = new JSONArray();
				for(Element eCol : eCols){
					String name = eCol.attributeValue(NAME);
					String field = eCol.attributeValue(FIELD);
					String label = eCol.attributeValue(LABEL);
					if(BaseDataUtils.isStringEmpty(label)) label = name;
					if(!BaseDataUtils.isStringEmpty(name) && !BaseDataUtils.isStringEmpty(field)){
						JSONObject col = new JSONObject();
						col.put(NAME, name);
						col.put(FIELD, field);
						col.put(LABEL, label);
						cols.add(col);
					}
				}
				return cols;
			}
		}
		return null;
	}
	
	private JSONArray loadAggregate(Element eJoin){
		if(null!=eJoin){
			Element eAgg =  eJoin.element(AGGREGATE_KEY);
			if(null!=eAgg){
				@SuppressWarnings("unchecked")
				List<Element> eItems = eAgg.elements(AGGREGATE_ITEM_NAME);
				if(null!=eItems && !eItems.isEmpty()){
					JSONArray aggs = new JSONArray();
					for(Element eItem : eItems){
						String name = eItem.attributeValue(NAME);
						String field = eItem.attributeValue(FIELD);
						String fn = eItem.attributeValue(AGGREGATE_FN_NAME);
						if(!BaseDataUtils.isStringEmpty(name) && !BaseDataUtils.isStringEmpty(fn) && !BaseDataUtils.isStringEmpty(field)){
							JSONObject agg = new JSONObject();
							agg.put(NAME, name);
							agg.put(FIELD, field);
							agg.put(AGGREGATE_FN_NAME, fn);
							aggs.add(agg);
						}
					}
					return aggs;
				}
			}
		}
		return null;
	}
	
	//返回join定义
	/*
      <join leftTable="/datas/table1" rightTable="/datas/table2" type="inner">
      	<on leftField="fParent" rightField="fid" fn="eq"/>
      	<column label="***" name="table2Name" field="name"/>
      	<filter name="test">ilike('site_url','*北京*')</filter>
	    <aggregate> 
	      <item name="sum" fn="avg" field="age"/>  
	      <item name="minAge" fn="min" field="age"/> 
	    </aggregate>
      </join> 
	 * 
	 * [{
	 * 	leftTable:"",
	 *  rightTable:"",
	 *  type:"inner",
	 *  on:[{
	 *  	leftField:'fParent',
	 *  	rightField:'fid',
	 *  	fn:'eq'
	 *  }],  
	 * }]
	 */
	public DataJoin(Element eData){
		@SuppressWarnings("unchecked")
		List<Element> items =  eData.elements(DATA_JOIN_KEY);
		if(null!=items && !items.isEmpty()){
			for(Element item : items){
				String leftTable = item.attributeValue(LEFT_TABLE_NAME);
				String rightTable = item.attributeValue(RIGHT_TABLE_NAME);
				String type = item.attributeValue(JOIN_TYPE_NAME);
				if(!BaseDataUtils.isStringEmpty(leftTable)
						&& !BaseDataUtils.isStringEmpty(rightTable)){
					JSONObject def = new JSONObject();
					def.put(LEFT_TABLE_NAME, leftTable);
					def.put(RIGHT_TABLE_NAME, rightTable);
					def.put(JOIN_TYPE_NAME, !BaseDataUtils.isStringEmpty(type)?type:JOIN_TYPE_DEFAULT);
					@SuppressWarnings("unchecked")
					List<Element> eONs =  item.elements(JOIN_ON_NAME);
					if(null!=eONs && !eONs.isEmpty()){
						JSONArray joinONs = new JSONArray();
						for(Element eON : eONs){
							String leftField = eON.attributeValue(LEFT_FIELD_NAME);
							String rightField = eON.attributeValue(RIGHT_FIELD_NAME);
							String fn = eON.attributeValue(COMP_FN_NAME);
							if(!BaseDataUtils.isStringEmpty(leftField)
									&& !BaseDataUtils.isStringEmpty(rightField)){
								JSONObject on = new JSONObject();
								on.put(LEFT_FIELD_NAME, leftField);
								on.put(RIGHT_FIELD_NAME, rightField);
								on.put(COMP_FN_NAME, !BaseDataUtils.isStringEmpty(fn)?fn:COMP_FN_DEFAULT);
								joinONs.add(on);
							}
						}
						def.put(JOIN_ON_NAME, joinONs);
					}
					DataJoinItems.add(def);
					
					//加载cols
					JSONArray cols = loadColumns(item);
					if(null!=cols && cols.size()>0)
						def.put(COLUMNS_NAME, cols);
					
					//加载filter
					JSONArray filters = loadFilters(item);
					if(null!=filters && filters.size()>0)
						def.put(FILTERS_NAME, filters);

					//加载aggregate
					JSONArray aggregate = loadAggregate(item);
					if(null!=aggregate && aggregate.size()>0)
						def.put(AGGREGATE_NAME, aggregate);
				}
			}
		}		
	}
			
			
	
	public JSONArray getDataJoinItems(){
		return DataJoinItems;
	}
	
	public boolean hasJoin(){
		return DataJoinItems.size()>0;
	}
	
	public boolean hasJoinON(JSONObject dataJoinItem){
		return null!=dataJoinItem && dataJoinItem.containsKey(JOIN_ON_NAME) && dataJoinItem.getJSONArray(JOIN_ON_NAME).size()>0;
	}
	
	public JSONArray getJoinON(JSONObject dataJoinItem){
		return hasJoinON(dataJoinItem)?dataJoinItem.getJSONArray(JOIN_ON_NAME):null;
	}
	
	public boolean hasFilter(JSONObject dataJoinItem){
		return null!=dataJoinItem && dataJoinItem.containsKey(FILTERS_NAME) && dataJoinItem.getJSONArray(FILTERS_NAME).size()>0;
	}

	public JSONArray getFilters(JSONObject dataJoinItem){
		return hasFilter(dataJoinItem)?dataJoinItem.getJSONArray(FILTERS_NAME):null;
	}

	public boolean hasColumn(JSONObject dataJoinItem){
		return null!=dataJoinItem && dataJoinItem.containsKey(COLUMNS_NAME) && dataJoinItem.getJSONArray(COLUMNS_NAME).size()>0;
	}

	public JSONArray getColumns(JSONObject dataJoinItem){
		return hasColumn(dataJoinItem)?dataJoinItem.getJSONArray(COLUMNS_NAME):null;
	}

	public boolean hasAggregate(JSONObject dataJoinItem){
		return null!=dataJoinItem && dataJoinItem.containsKey(AGGREGATE_NAME) && dataJoinItem.getJSONArray(AGGREGATE_NAME).size()>0;
	}

	public JSONArray getAggregate(JSONObject dataJoinItem){
		return hasAggregate(dataJoinItem)?dataJoinItem.getJSONArray(AGGREGATE_NAME):null;
	}
}
