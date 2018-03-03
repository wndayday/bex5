import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.dom4j.Element;
import org.dom4j.QName;

import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.xml.XMLConstants;

public class User implements ComponentTemplate {
	private static List<Map<String, String>> COLUMN_DEFS = new ArrayList<Map<String, String>>();
	static {
		Map<String, String> colDef = new HashMap<String, String>();
		colDef.put("name", "id");
		colDef.put("type", "String");
		COLUMN_DEFS.add(colDef);
		colDef = new HashMap<String, String>();
		colDef.put("name", "name");
		colDef.put("type", "String");
		COLUMN_DEFS.add(colDef);
		colDef = new HashMap<String, String>();
		colDef.put("name", "phone");
		colDef.put("type", "String");
		COLUMN_DEFS.add(colDef);
		colDef = new HashMap<String, String>();
		colDef.put("name", "email");
		colDef.put("type", "String");
		COLUMN_DEFS.add(colDef);
		colDef = new HashMap<String, String>();
		colDef.put("name", "isLogined");
		colDef.put("type", "Boolean");
		COLUMN_DEFS.add(colDef);
	}

	private Element eDef;
	Map<String, Object> context;
	String dataXid = null;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		eDef = bound;
		this.context = context;
		processUserData();
	}

	/*
		<div autoLoad="true" component="$UI/system/components/justep/data/data"	idColumn="id" label="登录者数据">
			<column name="id" type="String"></column>
			<column name="name" type="String"></column>
			<column name="phone" type="String"></column>
			<column name="email" type="String"></column>
			<column name="isLogined" type="Boolean"></column>
			<data>
				<![CDATA[[{"isLogined":false}]]]>
			</data>
			<rule>
				<readonly><expr>true</expr></readonly>
			</rule>
		</div>
	*/
	protected void processUserData() {
		Element userDataE = (Element) eDef.selectSingleNode("./*[contains(@component,'/system/components/justep/data/data')]");
		if (null == userDataE) {
			userDataE = eDef.addElement(new QName("div", XMLConstants.XHTML_NAMESPACE));
			userDataE.addAttribute("component", "$UI/system/components/justep/data/data");
			userDataE.addAttribute("autoLoad", "true");
			userDataE.addAttribute("idColumn", "id");
			userDataE.addAttribute("label", "登录者数据");
			for (Map<String, String> colDef : COLUMN_DEFS) {
				Element colE = userDataE.addElement(new QName("column", XMLConstants.XHTML_NAMESPACE));
				colE.addAttribute("name", colDef.get("name"));
				colE.addAttribute("type", colDef.get("type"));
			}
			Element dataE = userDataE.addElement(new QName("data", XMLConstants.XHTML_NAMESPACE));
			dataE.addCDATA("[{\"isLogined\":false}]");
			userDataE.addElement(new QName("rule", XMLConstants.XHTML_NAMESPACE)).addElement(new QName("readonly", XMLConstants.XHTML_NAMESPACE))
					.addElement(new QName("expr", XMLConstants.XHTML_NAMESPACE)).setText("true");
		}

		dataXid = userDataE.attributeValue("xid");
		if (null == dataXid || "".equals(dataXid)) {
			dataXid = "U" + UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");
			userDataE.addAttribute("xid", dataXid);
		}
		eDef.addAttribute("data", dataXid);
	}
}
