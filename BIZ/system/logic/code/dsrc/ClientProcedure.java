import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.justep.client.ClientUtils;
import com.justep.common.SystemUtils;
import com.justep.model.Model;
import com.justep.model.ModelUtils;
import com.justep.system.client.AppHelper;
import com.justep.system.client.ClientAppHelper;
import com.justep.system.client.ClientHelper;
import com.justep.system.data.BizData;
import com.justep.system.data.DataPermission;
import com.justep.system.data.ModifyState;
import com.justep.system.data.Row;
import com.justep.system.data.Table;
import com.justep.system.data.TableUtils;
import com.justep.system.opm.api.OrgHelper;
import com.justep.util.InitUtils;
import com.justep.util.Utils;


public class ClientProcedure {
	public static void initSysDb(String client, String code){
		InitUtils.initSysDb(client, code, true);
	}
	
	public static void initAppDb(String apps){
		if (SystemUtils.isEmptyString(apps)){
			return;
		}
		for (String app : apps.split(",")){
			app = app.trim();
			if (SystemUtils.isNotEmptyString(app)){
				InitUtils.createAppDb(app);
				InitUtils.initAppDb(null, app);
			}
		}
	}

	public static void addClient(String id, String code, String name, Map<String, Object> options){
		ClientHelper.addClient(id, code);
		if (ClientUtils.enabledClient() && Utils.isNotEmptyString(name)){
			String old = ClientUtils.getClientValue();
			String oldCode = ClientUtils.getClientCode();
			try{
				ClientUtils.setClientValue(id);
				ClientUtils.setClientCode(code);
				
				//修改新建租户的机构名
				OrgHelper.updateOrg("ORG01", null, null, name, name, null);
				
			}finally{
				ClientUtils.setClientValue(old);
				ClientUtils.setClientCode(oldCode);
			}
		}
	}
	
	
	public static void addApp(String appModel, Map<String, Object> options){
		AppHelper.addApp(appModel);
	}
	
	public static void addClientApp(String client, String appModel, Map<String, Object> options){
		ClientAppHelper.addClientApp(client, appModel);
	}
	
	public static JSONArray getAllApps2(){
		List<String> apps = AppHelper.getAllApps();
		JSONArray result = new JSONArray();
		result.addAll(apps);
		return result;
	}
	
	
	public static Table getAllApps(){
		Model model = ModelUtils.getModel("/system/data");
		Table result = TableUtils.createTable(model, "index", "Integer", "app", "String", "create", "String", "init", "String");
		int index = 1;
		for (String app : AppHelper.getAllApps()){
			Row r = result.appendRow();
			r.setInt("index", index++);
			r.setString("app", app);
		}
		
		return result;
	}
	
	public static List<String> getClientApps(){
		return ClientAppHelper.getClientApps();
	}
	
	public static int saveApp(Table table, String concept, List<DataPermission> insertRange, List<DataPermission> deleteRange,
			List<DataPermission> updateRange, String readOnly, String notNull, String dataModel, String fnModel) {
			Iterator<Row> it = table.iterator();
			while (it.hasNext()){
				Row r = it.next();
				if (ModifyState.NEW.equals(r.getState())){
					String appModel = r.getString("sModel");
					addApp(appModel, null);
				}
			}
			
			return BizData.save(table, concept, insertRange, deleteRange, updateRange, readOnly, notNull, dataModel, fnModel);
	}
	
	public static int saveClient(Table table, String concept, List<DataPermission> insertRange, List<DataPermission> deleteRange,
			List<DataPermission> updateRange, String readOnly, String notNull, String dataModel, String fnModel) {
			Iterator<Row> it = table.iterator();
			while (it.hasNext()){
				Row r = it.next();
				if (ModifyState.NEW.equals(r.getState())){
					String client = r.getString("SA_Client");
					addClient(client, r.getString("sCode"), r.getString("sName"),  null);
				}
			}
			
			return BizData.save(table, concept, insertRange, deleteRange, updateRange, readOnly, notNull, dataModel, fnModel);
	}


	public static int saveClientApp(Table table, String concept, List<DataPermission> insertRange, List<DataPermission> deleteRange,
			List<DataPermission> updateRange, String readOnly, String notNull, String dataModel, String fnModel) {
			Iterator<Row> it = table.iterator();
			while (it.hasNext()){
				Row r = it.next();
				if (ModifyState.NEW.equals(r.getState())){
					String client = r.getString("sClientID");
					String appModel = r.getString("sAppModel");
					addClientApp(client, appModel, null);
				}
			}
			
			return BizData.save(table, concept, insertRange, deleteRange, updateRange, readOnly, notNull, dataModel, fnModel);
	}
}
