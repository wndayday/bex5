import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSONObject;
import com.justep.common.SystemUtils;


public class DataRule {
	private Map<String, RelationRule> relationRules = new HashMap<String, RelationRule>();
	private static final String DATA_RULE_KEY = "";
	private static final String READONLY_RULE = "readonly";
	private static final String REQUIRED_RULE = "required";
	private static final String CONSTRAINT_RULE = "constraint";
	private static final String CALCULATE_RULE = "calculate";
	private static final String DEFAULTVALUE_RULE = "defaultValue";

	public Object getReadonly(String relation){
		return getRelationRule(relation, READONLY_RULE);
	}
	
	public Object getDefaultValueDef(String relation){
		return getRelationRule(relation, DEFAULTVALUE_RULE);
	}
	
	public Object getCalculate(String relation){
		return getRelationRule(relation, CALCULATE_RULE);
	}
	
	public Object getRelationRuleDef(String relation, String ruleName){
		Object result = null;
		if (SystemUtils.isEmptyString(relation))
			relation = "";
		RelationRule rr = relationRules.get(relation);
		if (rr != null){
			RelationRuleItem item = rr.items.get(ruleName);
			if (item != null && SystemUtils.isNotEmptyString(item.expr)){
				JSONObject def = new JSONObject();
				JSONObject param = new JSONObject();
				def.put("params", param);
				param.put("expr", item.expr);
				if (SystemUtils.isNotEmptyString(item.message)){
					def.put("message", item.message);
				}
				
				result = def;
			}
		}
		
		
		return result;
		
	}
	
	private Object getRelationRule(String relation, String ruleName){
		String result = null;
		if (SystemUtils.isEmptyString(relation))
			relation = "";
		RelationRule rr = relationRules.get(relation);
		if (rr != null){
			RelationRuleItem item = rr.items.get(ruleName);
			if (item != null){
				result = item.expr;
			}
		}
		
		if (SystemUtils.isEmptyString(result))
			result = null;
		return result;
	}
	
	@SuppressWarnings("unchecked")
	public DataRule(Element data){
		for (Element rule : (List<Element>)data.elements("rule")){
			//针对data的规则
			relationRules.put(DATA_RULE_KEY, new RelationRule(rule));
			
			for (Element col : (List<Element>)rule.elements("col")){
				String relation = col.attributeValue("name");
				if (SystemUtils.isNotEmptyString(relation)){
					relationRules.put(relation, new RelationRule(col));
				}
			}
		}
	}
	
	public class RelationRule{
		public Map<String, RelationRuleItem> items = new HashMap<String, RelationRuleItem>();
		@SuppressWarnings("unchecked")
		public RelationRule(Element e){
			for (Element child : (List<Element>)e.elements()){
				String name = child.getName();
				if (READONLY_RULE.equals(name) || REQUIRED_RULE.equals(name) 
						|| CONSTRAINT_RULE.equals(name) || CALCULATE_RULE.equals(name) || DEFAULTVALUE_RULE.equals(name)){
					String expr = (child.element("expr")!=null) ? child.elementText("expr") : null;
					String message = (child.element("message")!=null) ? child.elementText("message") : null;
					items.put(name, new RelationRuleItem(name, expr, message));
				}
			}
		}
	}
	
	
	public class RelationRuleItem{
		public String type = null;
		public String expr = null;
		public String message = null;
		public RelationRuleItem(String type, String expr, String message){
			this.type = type;
			this.expr = expr;
			if(null!=this.expr) this.expr = this.expr.trim();
			this.message = message;
			if(null!=this.message) this.message = this.message.trim();
		}
			
	}
	
}


