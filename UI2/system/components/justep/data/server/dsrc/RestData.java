import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Element;
import org.dom4j.QName;


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.ui.system.SystemComponentException;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.xml.XMLConstants;
import com.justep.ui2.system.component.data.BaseDataUtils;
import com.justep.ui2.system.component.data.restdata.RestDataModel;
import com.justep.xbl.Utils;



public class RestData extends Data {
	public static final String BAAS_DATA_URL = "$UI/system/components/justep/data/restData";
	protected static final String FILTER_ELEMENT = "filter";
	protected static final QName FILTER_QNAME = new QName(FILTER_ELEMENT, XMLConstants.XHTML_NAMESPACE);
	
	protected RestDataModel restDataModel;
	
	protected DataJoin dataJoin;
	
	protected Map<String, RestDataModel> restDataModels = new HashMap<String, RestDataModel>();
	
	protected RestDataModel getRestDataModel(String className){
		RestDataModel ret;
		if(!restDataModels.containsKey(className))
			restDataModels.put(className, new RestDataModel(className));
		ret = restDataModels.get(className);
		return ret;
	}
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		String className = bound.attributeValue("className");
		if(!Utils.isStringEmpty(className)) restDataModel = getRestDataModel(className);
		dataJoin = new DataJoin(bound);
		super.execute(bound, dataItems, props, events, context);
	}
	
	protected String getURl(){
		return BAAS_DATA_URL;
	}

	protected String getDataClassName() {
		return "__RestData__";
	}

	protected JSONObject processDataConfig(){
		JSONObject cfg = super.processDataConfig();
		Element ele = dataDef.getDataDef();
		cfg.put("className", restDataModel.getOriginalClassName());
		cfg.put("url", ele.attributeValue("url"));
		cfg.put("autoMode", getAutoMode());
		cfg.put("defAggCols", getAggDef());
		cfg.put("join", getJoinDef());
		String sColumns = ele.attributeValue("columns");
		if(BaseDataUtils.isStringEmpty(sColumns)) cfg.put("isAllColumns", true);
		
		return cfg;
	}
	
	//返回统计定义
	/*
	 * <aggregate>
	 *   <item name="count" fn="count" field="*"/>
	 *   <item name="minAge" fn="min" field="age"/>
	 * </aggregate>
	 * 
	 * {'count':'count(*)','minAge':'min(age)'}
	 */
	@SuppressWarnings("unchecked")
	protected JSONObject getAggDef(){
		JSONObject def = new JSONObject();
		Element eGroup =  eDataDef.element("aggregate");
		if(null!=eGroup){
			List<Element> items = eGroup.elements("item");
			if(null!=items && !items.isEmpty()){
				for(Element item : items){
					String name = item.attributeValue("name");
					String fn = item.attributeValue("fn");
					String field = item.attributeValue("field");
					if(!BaseDataUtils.isStringEmpty(name) && !BaseDataUtils.isStringEmpty(fn)){
						if(BaseDataUtils.isStringEmpty(field))//兼容原<item name="count" fn="count(*)"/>格式
							def.put(name,fn);
						else def.put(name,fn+"("+field+")");
					}
				}
			}
		}
		
		return def.isEmpty()?def:null;
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
	protected JSONArray getJoinDef(){
		return dataJoin.hasJoin()?dataJoin.getDataJoinItems():null;
	}
	
	protected String getAutoMode() {
		Element ele = dataDef.getDataDef();
		String ret = ele.attributeValue("auto");
		return !Utils.isStringEmpty(ret)?ret:"";
	}

	protected boolean isTree(){
		return restDataModel.isTree() && !"false".equalsIgnoreCase(dataDef.getDataDef().attributeValue("isTree"));
	}
	
	protected String getIdColumn(){
		RestDataModel.Property prop = restDataModel.getPrimaryProp();
		if(null==prop) throw SystemComponentException.create(UISystemMessages.LOAD_DATA_PRIMARY_NOTDEF_ERROR,restDataModel.getClassName());
		return prop.getName();
	}
	
	protected JSONObject getTreeDef() {
		////treeOption : "{'isDelayLoad':true,'parentRelation':'父子关联的relation','virtualRootLabel':'','rootFilter':'','nodeKindRelation':'','nodeLevelRelation':''}"
		if (restDataModel.isTree()) {
			JSONObject def = new JSONObject();

			String rootFilter = BaseDataUtils.getTreeRootFilter(eDataDef);
			String parent = restDataModel.getTreeOption().getParentCol();
			String path = restDataModel.getTreeOption().getPathCol();

			def.put("isDelayLoad", true);
			if (!BaseDataUtils.isStringEmpty(parent))
				def.put("parent", parent);
			if (!BaseDataUtils.isStringEmpty(path))
				def.put("path", path);
			if (!BaseDataUtils.isStringEmpty(rootFilter))
				def.put("rootFilter", rootFilter);
			return def;
		} else
			return null;
	}

	protected List<RestDataModel.Property> getProps(){
		Element ele = dataDef.getDataDef();
		String sColumns = ele.attributeValue("columns");
		List<RestDataModel.Property> ret = new ArrayList<RestDataModel.Property>();
		if(Utils.isStringEmpty(sColumns)){
			Map<String, RestDataModel.Property> props = restDataModel.getPropertys();
			if (null != props && !props.isEmpty()) {
				for (String colName : props.keySet()) {
					ret.add(props.get(colName));
				}
			}
		}else{
			String[] sColumnArray = sColumns.split(",");
			for(int i=0; i<sColumnArray.length; i++){
				RestDataModel.Property prop = restDataModel.getProp(sColumnArray[i]);
				if(null!=prop) ret.add(prop);
				else throw SystemComponentException.create(UISystemMessages.LOAD_DATA_COL_NOTDEF_ERROR,dataDef.getDataXID(),sColumnArray[i]);
			}
		}
		return ret;
	}
	
	protected JSONObject getColDef() {
		JSONObject def = new JSONObject();
		List<RestDataModel.Property> props = getProps();
		if (null != props && !props.isEmpty()) {
			for (RestDataModel.Property prop : props) {
				String colName = prop.getName();
				String type = prop.getDataType();
				String label = prop.getLabel();

				JSONObject relationDef = new JSONObject();
				relationDef.put("type", type);
				relationDef.put("relation", colName);
				relationDef.put("define", colName);
				relationDef.put("label", label);
				relationDef.put("name", colName);
				
				/*
				if("String".equals(type)){
					//字符串增加最大长度定义
					String sSize = relation.attributeValue("size");
					if(!BaseDataUtils.isStringEmpty(sSize)){
						Integer size = Integer.parseInt(sSize);
						if(null!=size)	relationDef.put("size", size);
					}
				}
				*/
				relationDef.put("extendType", getExtendTypeDef(colName));
				relationDef.put("rules", getRuleDef(colName));
				def.put(colName, relationDef);
			}
		}
			
		if(dataJoin.hasJoin()){
			JSONArray joinItems = dataJoin.getDataJoinItems();
			for(int i=0; i<joinItems.size(); i++){
				JSONObject joinItem = joinItems.getJSONObject(i);
				if(dataJoin.hasColumn(joinItem)){
					String table = joinItem.getString(DataJoin.RIGHT_TABLE_NAME);
					RestDataModel dModel = getRestDataModel(table);
					JSONArray cols = dataJoin.getColumns(joinItem);
					for(int j=0; j<cols.size(); j++){
						JSONObject col = cols.getJSONObject(j);
						String colName = col.getString(DataJoin.NAME);
						String label = col.getString(DataJoin.LABEL);
						String field = col.getString(DataJoin.FIELD);
						RestDataModel.Property prop = dModel.getProp(field);

						if(null!=prop){
							String type = prop.getDataType();
							JSONObject relationDef = new JSONObject();
							relationDef.put("type", type);
							relationDef.put("relation", field);
							relationDef.put("table", table);
							relationDef.put("define", field);
							relationDef.put("label", label);
							relationDef.put("name", colName);
							
							relationDef.put("extendType", getExtendTypeDef(colName));
							relationDef.put("rules", getRuleDef(colName));
							def.put(colName, relationDef);
						}
					}
				}
			}
		}

		return def;
	}

	protected Object getOrderByDef() {
		//*  orderBys : "[{'relation':'sName','type':1},...]",
		String orderBy = dataDef.getDataDef().attributeValue("orderBy");
		if (!BaseDataUtils.isStringEmpty(orderBy)) {
			JSONArray def = new JSONArray();
			String[] orderBys = orderBy.split(",");
			for (int i = 0; i < orderBys.length; i++) {
				JSONObject o = new JSONObject();
				String s = orderBys[i];
				String[] s1 = s.split(":");
				if(s1.length<=1) s1 = s.split(" ");
				o.put("relation", s1[0]);
				o.put("type", (s1.length <= 1 ? 1 : "desc".equalsIgnoreCase(s1[1]) ? 0 : 1));
				def.add(o);
			}
			return def;
		}else return null;		
	}
	
	protected JSONObject getFiltersDef() {
		//		 *  filters : "{'filterID':filter,...}",
		JSONObject def = new JSONObject();
		@SuppressWarnings("unchecked")
		List<Element> filterEs = dataDef.getDataDef().elements(FILTER_QNAME);
		if(!filterEs.isEmpty()){
			
			for (Element filterE : filterEs) {
				String name = filterE.attributeValue("name");
				String text = filterE.getTextTrim();
				if (!BaseDataUtils.isStringEmpty(name)) {
					def.put(name, text);
				}
			}
		}
		
		return def;
	}	
}
