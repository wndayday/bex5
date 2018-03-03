import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.justep.message.SystemMessages;
import com.justep.model.Model;
import com.justep.model.ModelUtils;
import com.justep.system.context.ContextHelper;
import com.justep.system.opm.OrgConstants;
import com.justep.system.opm.Person;
import com.justep.system.opm.PersonMember;
import com.justep.system.util.CommonUtils;
import com.justep.util.Utils;

public class SystemProcedure {
	/**
	 * 获取
	 * @param process
	 * @return
	 */
	public static String getDataModelList(String process){
		String processModel = process.substring(0, process.lastIndexOf("/"));
		Model model = null;
		while(!processModel.equals("") && model==null){
			try {	
				processModel = processModel.substring(0, processModel.lastIndexOf("/"));
				model = ModelUtils.getModel(processModel+"/data");
			} catch (Exception e) {
			}
		}
		if(model!=null){
			return model.getFullName();
		}
		return "/system/data";         
	}
	
	public static Object getProcessList() {
		Document result = DocumentHelper.createDocument();
		Element root = DocumentHelper.createElement("items");
		result.setRootElement(root);
		Person psn = ContextHelper.getPerson();
		for (String proc : ContextHelper.getProcessList()) {
			Utils.check(Utils.isNotEmptyString(proc), SystemMessages.class, SystemMessages.PROCESS_LIST_NULL);
			Element procElem = root.addElement("item");
			String process = CommonUtils.getPathOfFile(proc);
			String activ = CommonUtils.getNameOfFile(proc);
			//Utils.check(!OrgConstants.ANY.equals(activ), "目前不支持activity为*的授权！");
			if (!OrgConstants.ANY.equals(activ)){
				procElem.addAttribute("process", process);
				procElem.addAttribute("activity", activ);
				procElem.addAttribute("url", proc);
				procElem.addAttribute("psm-count", Integer.toString(psn.getPersonMemberCount() == 1 ? 1 : psn.getAuthorizedCount(process, activ)));
			}
		}
		return result;
	}

	public static Object getAgentList(String type) {
		if (Utils.isEmptyString(type)){
			type = "xml";
		}

		if (!type.equals("xml")){
			List<Map<String, String>> result = new ArrayList<Map<String, String>>();
			
			for (Person psn : ContextHelper.getOperator().getAgents()) {
				Map<String, String> item = new HashMap<String, String>();
				item.put("id", psn.getID());
				item.put("name", psn.getName());
				
				result.add(item);
			}
			
			return result;

		}else{
			Document result = DocumentHelper.createDocument();
			Element root = DocumentHelper.createElement("items");
			result.setRootElement(root);
			for (Person psn : ContextHelper.getOperator().getAgents()) {
				Element procElem = root.addElement("psn");
				procElem.addAttribute("id", psn.getID());
				procElem.addAttribute("name", psn.getName());
			}
			return result;
		}
	}

	public static Object getPersonMembers(String process, String activity, String type) {
		if (Utils.isEmptyString(type)){
			type = "xml";
		}
		
		if (!type.equals("xml")){
			Map<String, String> result = new HashMap<String, String>();
			for (PersonMember pm : ContextHelper.getOperator().getAuthorizedPersonMembers(process, activity, ContextHelper.getPerson().getID())) {
				result.put(pm.getFID(), pm.getFName());
			}
			return result;
		}else{
			Document result = DocumentHelper.createDocument();
			Element root = DocumentHelper.createElement("items");
			result.setRootElement(root);
			for (PersonMember pm : ContextHelper.getOperator().getAuthorizedPersonMembers(process, activity, ContextHelper.getPerson().getID())) {
				Element psmElem = root.addElement("psm");
				psmElem.addAttribute("fid", pm.getFID());
				psmElem.addAttribute("fname", pm.getFName());
			}
			return result;
		}
	}

	public static Object getSysParams() {
		return ContextHelper.getSysParams();
	}
	
	public static void openActivity(){
		//不处理，为了记录操作日志和添加事件使用
	}
	
	public static void getSysCode(){
		//不处理，获取系统代码
	}

	public static void closeActivity(){
		//不处理，为了记录操作日志和添加事件使用
	}
	
	public static void createTaskRemindProcedure(String sid){
		
	}
	
	public static String getActivationPackage(){
		return Utils.getActivationPackage();
	}
	
	public static java.sql.Date getActivationTime(){
		return Utils.getActivationTime();
	}
	
	public static boolean regActivationPackage(String sPackage){
		return Utils.regActivationPackage(sPackage);
	}
}
