import java.util.List;

import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.ui.xml.XMLConstants;
import com.justep.ui2.system.component.data.BaseDataUtils;
import com.justep.ui2.system.component.data.restdata.RestDataModel;


public class AggregateData extends RestData {
	public static final String AGG_DATA_URL = "$UI/system/components/justep/data/aggregateData";
	protected static final String HAVING_ELEMENT = "having";
	protected static final QName HAVING_QNAME = new QName(HAVING_ELEMENT, XMLConstants.XHTML_NAMESPACE);

	protected String getURl(){
		return AGG_DATA_URL;
	}

	protected String getDataClassName() {
		return "__AggData__";
	}

	protected String getIdColumn(){
		return null;
	}
	
	protected boolean isTree(){
		return false;
	}
	
	protected JSONObject getHavingsDef() {
		//		 *  havings : "{'havingID':having,...}",
		@SuppressWarnings("unchecked")
		List<Element> filterEs = dataDef.getDataDef().elements(HAVING_QNAME);
		if(!filterEs.isEmpty()){
			JSONObject def = new JSONObject();
			
			for (Element filterE : filterEs) {
				String name = filterE.attributeValue("name");
				String text = filterE.getTextTrim();
				if (!BaseDataUtils.isStringEmpty(name)) {
					def.put(name, text);
				}
			}
			return def;
		}else return null;
	}	
	
	protected JSONArray getGroupByDef() {
		Element ele = dataDef.getDataDef();
		String groupBy = ele.attributeValue("groupBy");
		if (!BaseDataUtils.isStringEmpty(groupBy)) {
			String[] groupBys = groupBy.split(",");
			JSONArray ret = new JSONArray();
			for(int i=0; i<groupBys.length; i++){
				ret.add(groupBys[i]);
			}
			return ret;
		}else return null;
	}
	
	protected JSONObject processDataConfig(){
		JSONObject cfg = super.processDataConfig();
		Element ele = dataDef.getDataDef();
		cfg.put("by", ele.attributeValue("by"));
		cfg.put("havings", getHavingsDef());
		cfg.put("groupBy", getGroupByDef());
		
		return cfg;
	}

	protected JSONObject getColDef() {
		JSONObject def = new JSONObject();

		@SuppressWarnings("unchecked")
		List<Element> cols = eDataDef.elements("column");
		if (null != cols && !cols.isEmpty()) {
			for (Element col : cols) {
				String colName = col.attributeValue("name");
				String fn = col.attributeValue("fn");
				String label = col.attributeValue("label");
				String field = col.attributeValue("field");
				String type = "String";
				RestDataModel.Property prop = restDataModel.getProp(colName);
				if(null!=prop){
					type = prop.getDataType();
				}
				JSONObject relationDef = new JSONObject();
				relationDef.put("type", type);
				relationDef.put("relation", colName);
				relationDef.put("define", colName);
				relationDef.put("label", label);
				relationDef.put("name", colName);
				relationDef.put("fn", fn);
				relationDef.put("field", field);
				
				def.put(colName, relationDef);
			}
		}

		return def;
	}	
}
