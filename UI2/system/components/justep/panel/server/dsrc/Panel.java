import java.util.HashMap;
import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Element;

import com.justep.common.SystemUtils;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.util.CssUtils;
import com.justep.ui.util.PageUtils;

public class Panel implements ComponentTemplate {

	private Element eDef;

	// 固定常量
	private int iosStatusBarHeight = 20;
	private int defaultTopHeight = 48;
	
	private static final String TOP = "x-panel-top";
	private static final String CONTENT = "x-panel-content";
	private static final String BOTTOM = "x-panel-bottom";
	private static final String[] TOP_CONTENT_BOTTOM  = new String[]{TOP, CONTENT, BOTTOM};
	
	//为了性能优化, 不使用selectSingleNode, 通过遍历的方式获取; 广度遍历
	private void findTopContentBottom(Element e, Map<String, Element> result){
		for (Object obj : e.elements()){
			Element child = (Element)obj;
			String classAttr = child.attributeValue("class");
			if (SystemUtils.isNotEmptyString(classAttr)){
				for (String item : TOP_CONTENT_BOTTOM){
					if (!result.containsKey(item) && classAttr.contains(item)){
						result.put(item, child);
					}
				}
			}
		}
		if (result.size() == 3) return; //已经找到了
		
		for (Object obj : e.elements()){
			findTopContentBottom((Element)obj, result);
		}
	}

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events, Map<String, Object> context) {
		this.eDef = bound;

		String thValue = null;
		String bhValue = null;
		int oValueInt = 0;
		int thValueInt = 0;
		
		// 生成class
        String windowURL = (String)context.get(PageUtils.WINDOW_FILE_URL);
        String xid = "p" + CssUtils.generateCID(windowURL + bound.getUniquePath());
		String className = xid + "-iosstatusbar";
		Element styleElement = eDef.addElement("style");

		
		Map<String, Element> topContentBottom = new HashMap<String, Element>();
		findTopContentBottom(eDef, topContentBottom);
		//Element top = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-top')]");
		Element top = topContentBottom.get(TOP);
		if (top != null) {
			top.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
			thValue = top.attributeValue("height");
			if (thValue != null){
				oValueInt = Integer.parseInt(thValue);
				top.remove(top.attribute("height"));
			}else
				oValueInt = defaultTopHeight;
			thValueInt = oValueInt + iosStatusBarHeight;
		}

		//Element bottom = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-bottom')]");
		Element bottom = topContentBottom.get(BOTTOM);
		if (bottom != null) {
			bottom.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
			bhValue = bottom.attributeValue("height");
		}

		//Element content = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-content')]");
		Element content = topContentBottom.get(CONTENT);
		if(content != null){
			content.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
		}
		
		if (eDef.attribute("class") != null) {
			Attribute styleAttr = eDef.attribute("class");
			String style = styleAttr.getValue();
			style = style + " " + className;
			styleAttr.setValue(style);
		} else {
			eDef.addAttribute("class", className);
		}
		
		String tStyle = ".x-panel.%s >.x-panel-top {" + 
					"height: %dpx;" + 
				"}" + 
				".x-panel.%s >.x-panel-content {	" + 
					"top: %dpx;" +
					"bottom: %spx;" +
				"}" +
				".x-panel.%s >.x-panel-bottom {" + 
					"height: %spx;" + 
				"}" +
				".iosstatusbar .x-panel.%s >.x-panel-top,.iosstatusbar .x-panel .x-panel-content .x-has-iosstatusbar.x-panel.%s >.x-panel-top {" + 
					"height: %dpx;" + 
				"}" + 
				".iosstatusbar .x-panel.%s >.x-panel-content,.iosstatusbar .x-panel .x-panel-content .x-has-iosstatusbar.x-panel.%s >.x-panel-content {	" + 
					"top: %dpx;" +
				"}" + 
				".iosstatusbar .x-panel .x-panel-content .x-panel.%s >.x-panel-top {" + 
					"height: %dpx;" + 
				"}" + 
				".iosstatusbar .x-panel .x-panel-content .x-panel.%s >.x-panel-content {" + 
					"top: %dpx;" + 
				"}";
		
		styleElement.addText(String.format(tStyle, 
			className, oValueInt, className, oValueInt, bhValue, className, bhValue,
			className, className, thValueInt, className, className, thValueInt, className, oValueInt, className, oValueInt));
		
	}

}
