import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.message.UIMessages;
import com.justep.ui.JustepConfig;
import com.justep.ui.exception.UIException;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;


public class CompareDataObject extends com.justep.ui.impl.JProcessorImpl  {
	protected static final String NEWDATA_PATH = "model/deploy/dataObject";  
	
	
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = request.getParameter("appPath");
		String appPath = path.substring(path.indexOf("/"));
		String OLDDATA_PATH = "model/service"+appPath;
		List<JSONObject> list = new ArrayList<JSONObject>();
		String newPath = JustepConfig.getHome() + File.separator+NEWDATA_PATH+File.separator;
		File file = new File(newPath);
		if(file.exists() && file.list().length>0){
			File[] fileList = file.listFiles();
			for(int i = 0; i<fileList.length; i++){
				if(fileList[i].getName().substring(fileList[i].getName().lastIndexOf(".")).equals(".m")){
					List<Element> eleProperty = getPropertyList(fileList[i]);
					if(eleProperty.size()>0){
						for(int j = 0; j<eleProperty.size(); j++){
							if(eleProperty.get(j).getName().equals("property")){
								String dataType = eleProperty.get(j).attribute("dataType").getValue();
								String name = eleProperty.get(j).attribute("name").getValue();
								JSONObject json = compare(fileList[i].getName(),dataType,name,OLDDATA_PATH);
								if(json.size()>0){
									list.add(json);
								}
							}
						}
					}
				}
			
			}
			
		}
		
		response.setContentType("text/html;charset=UTF-8");
		JSONObject resultObj = new JSONObject();
		resultObj.put("result", list);
		response.getWriter().write(resultObj.toJSONString());
	}
	
	
	public static Document readFile(File file){
		SAXReader reader = new SAXReader();
		try {
			return reader.read(file);
		} catch (DocumentException e) {
			throw UIException.create(e, UIMessages.LOAD_DATA_MODEL_ERROR, file.getAbsolutePath(), e.getMessage());
		}
	}
	public static JSONObject compare(String dataObject,String dataType,String name,String OLDDATA_PATH){
		JSONObject jsonObject = new JSONObject();
		String oldPath = JustepConfig.getHome() + File.separator+OLDDATA_PATH+File.separator+dataObject;
		File file = new File(oldPath);
		if(file.exists()){
			List<Element> elePropertys = getPropertyList(file);
			for(Element ele : elePropertys){
				if(ele.getName().equals("property")){
					if(ele.attribute("name").getValue().equals(name) && !ele.attribute("dataType").getValue().equals(dataType)){
						jsonObject.put("dataObject", dataObject);
						jsonObject.put("dataType", dataType);
						jsonObject.put("newDataType", ele.attribute("dataType").getValue());
						Element eleLabel = ele.element("label");
						if(null!=eleLabel) {
							jsonObject.put("name", eleLabel.getTextTrim());
						}
						
					}
				}
				
			}
		}
		
		
		return jsonObject;
		
	}
	
	@SuppressWarnings("unchecked")
	public static List<Element> getPropertyList(File file){
		List<Element> eleProperty = new ArrayList<Element>();	
		Document document = readFile(file);
		Element element = document.getRootElement();
		Element eleClass = element.element("class");
		if(null!=eleClass){
			eleProperty = eleClass.elements();
		}
		return eleProperty;
		
		
		
	}
}
