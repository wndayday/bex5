import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.justep.common.SystemUtils;
import com.justep.system.context.ContextHelper;
import com.justep.system.data.KSQL;
import com.justep.system.data.Row;
import com.justep.system.data.Table;
import com.justep.system.process.TemplateHelper;


public class ProcessTemplateFn {
	public static String findTemplateByPerson(String personID){
		return TemplateHelper.findTemplateByPerson(personID, ContextHelper.getActionContext().getProcess().getFullName());
	}
	
	public static String findTemplateByPersonMember(String fid){
		return TemplateHelper.findTemplateByPersonMember(fid, ContextHelper.getActionContext().getProcess().getFullName());
	}
	
	public static String findTemplateByCurrentPerson(){
		return TemplateHelper.findTemplateByCurrentPerson(ContextHelper.getActionContext().getProcess().getFullName());
	}

	public static String findTemplateByCurrentPersonMember(){
		return TemplateHelper.findTemplateByCurrentPersonMember(ContextHelper.getActionContext().getProcess().getFullName());
	}
	
	public static String findTemplateByOrg(String fid, boolean includeParent){
		String process = ContextHelper.getActionContext().getProcess().getFullName();
		if (SystemUtils.isEmptyString(fid) || SystemUtils.isEmptyString(process)){
			return null;
		}
		
		Map<String, Object> var = new HashMap<String, Object>();
		
		String condition = null;
		if (includeParent){
			condition = "((:fid like concat(rc.sOrgFID, '%')) and (rc.sOrgFID like '/%'))";
		}else{
			condition = "rc.sOrgFID = :fid"; 
		}
		var.put("fid", fid);
		String query = "select t from SA_ProcessTemplate t join SA_ResourceControl rc on t=rc.sResourceID where " +
				"rc.sTypeID='PROCESS_TEMPLATE2' and t.sValidState=1 " +
				"and t.sProcess=:process and t.sKindID='template' and t.sTypeID='PROCESS_TEMPLATE' " + condition;
		var.put("process", process);
		Table t = KSQL.select(query, var, "/system/data", null);
		Iterator<Row> it = t.iterator();
		while(it.hasNext()){
			Row r = it.next();
			String cur = r.getString("t");
			if (SystemUtils.isNotEmptyString(cur)){
				return cur;
			}
		}
		return null;
	}
	
}
