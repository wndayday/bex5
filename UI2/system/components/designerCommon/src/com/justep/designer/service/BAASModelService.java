package com.justep.designer.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.studio.ui.editors.WebEditorPart;
import com.justep.studio.util.FileHelper;
import com.justep.studio.util.StudioConfig;

public class BAASModelService {
    /**
     * 获取数据源名称.
     * @param context
     * @return
     */
	@SuppressWarnings("unchecked")
	public static String getDsNames(Map<String,Object> context){
		String path =  StudioConfig.getModelPath()+"/../apache-tomcat/conf/context.xml";
		if(!new File(path).exists()){
			path = "/usr/local/tomcat/webapps/BusinessServer/META-INF/context.xml";
		}
		Document doc = null;
		try {
			doc =  FileHelper.readFileAsXML(path);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if(doc != null){
			StringBuffer sbf = new StringBuffer();
			List<Element> resourceList = doc.selectNodes("//Resource");
			for(Element e:resourceList){
				 sbf.append(","+e.attributeValue("name"));
			}
			if(sbf.length()>0){
				return sbf.toString().substring(1);
			}
		}
  
		return "";
	}
	 
	/**
	 *  .
	 * @param context
	 * @return
	 */
	public static String getContent(Map<String,Object> context){
		WebEditorPart webeditorPart = WebEditorPart.getInstance((String)context.get("filePath"));
		if(webeditorPart != null){
			return webeditorPart.getContent();
		}
		return "";
	}
	
	/**
	 *  
	 * @param context
	 * @return
	 */
	public static void setContent(Map<String,Object> context){
		WebEditorPart webeditorPart = WebEditorPart.getInstance((String)context.get("filePath"));
		if(webeditorPart != null){
			webeditorPart.setContent((String)context.get("content"));
		}
	}
 
}
