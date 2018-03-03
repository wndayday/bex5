import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.justep.client.ClientUtils;
import com.justep.common.ServerConfig;
import com.justep.common.SystemUtils;
import com.justep.license.LicenseChecker;
import com.justep.system.data.KSQL;
import com.justep.system.data.Row;
import com.justep.system.data.Table;

/**
	initGlobal: 第一次初始化系统模块的时候会调用；
	init: 每次添加新租户和第一次初始化系统的时候会调用；
	initModelGlobal: 创建应用模块表时，会针对应用模块下每个init模块调用，参数model就是当前的init模块；
	initModel: 初始化应用模块时，会针对应用模块下每个init模块调用，参数model就是当前的init模块；
 */
public class SystemInitProcedure {
	
	
	public static void init(){
		//System.out.println("............系统模块租户数据初始化............");
		
		//添加"定制开发"相关的角色，并将相应的角色分配给system账号
		if (LicenseChecker.instance().getLicense().isClient() && !"manager".equals(ClientUtils.getClientValue()) 
				&& SystemUtils.isNotEmptyString(ServerConfig.getWebIDEProperty("prod-home"))
				&& SystemUtils.isNotEmptyString(ClientUtils.getClientCode())){
			String xml = "'<xml><a name=\"*\" type=\"ide.path.perm\" kind=\"custom\" label=\"ide.path.perm\"><v>/UI2/CT_" + ClientUtils.getClientCode().toUpperCase() + "</v><v>/BIZ/CT_" + ClientUtils.getClientCode().toUpperCase() + "</v></a></xml>'";
			String[] ksqls = new String[]{
				"insert into SA_OPRole t  (t, t.sName, t.sCode, t.sCatalog, t.sRoleKind, t.sParentRolesNames, t.sDescription, t.sSequence, t.sValidState, t.version) " +
				"values('RL-WEB-IDE-DEV', '定制开发-开发', 'WEB-IDE-DEV', '定制开发', 'fun', null, null, 0, 1, 0)",	

				"insert into SA_OPRole t  (t, t.sName, t.sCode, t.sCatalog, t.sRoleKind, t.sParentRolesNames, t.sDescription, t.sSequence, t.sValidState, t.version) " +
				"values('RL-WEB-IDE-DEPLOY', '定制开发-发布', 'WEB-IDE-DEPLOY', '定制开发', 'data', null, null, 0, 1, 0)",	

				"insert into SA_OPPermission t  (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" +
				"values( 'WEB-IDE-DEPLOY-000', 'RL-WEB-IDE-DEPLOY', '*', '*', '*', null, " + xml +", null, 1, null, 1, 1, 0)",
				
				
				"insert into SA_OPAuthorize t (t, t.sOrgFID, t.sOrgFName, t.sOrgID, t.sOrgName, t.sAuthorizeRoleID, t.sDescription, t.sCreatorFID, t.sCreatorFName, t.sCreateTime, t.version) " +
				"values( 'AHR-WEB-IDE-DEV', '/ORG01.ogn/PSN01@ORG01.psm', '/起步软件/system', 'PSN01@ORG01', 'system', 'RL-WEB-IDE-DEV', null, '/ORG01.ogn/PSN01@ORG01.psm', '/起步软件/system', :currentDate(), 0)",

				"insert into SA_OPAuthorize t (t, t.sOrgFID, t.sOrgFName, t.sOrgID, t.sOrgName, t.sAuthorizeRoleID, t.sDescription, t.sCreatorFID, t.sCreatorFName, t.sCreateTime, t.version) " +
				"values( 'AHR-WEB-IDE-DEPOLY', '/ORG01.ogn/PSN01@ORG01.psm', '/起步软件/system', 'PSN01@ORG01', 'system', 'RL-WEB-IDE-DEPLOY', null, '/ORG01.ogn/PSN01@ORG01.psm', '/起步软件/system', :currentDate(), 0)",

				"insert into SA_OPPermission t  (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" +
				"values( 'WEB-IDE-DEV-000', 'RL-WEB-IDE-DEV', '/SA/ide/process/ide/ideProcess', '/定制开发/定制开发', 'devActivity', null, null, null, 0, null, 1, 1, 0)",
					
				"insert into SA_OPPermission t  (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" +
				"values( 'WEB-IDE-DEV-001', 'RL-WEB-IDE-DEV', '/SA/ide/process/ide/ideProcess', '/定制开发/发布到服务器', 'deployActivity', null, null, null, 0, null, 1, 1, 0)"
			};
			for (String ksql : ksqls){
				KSQL.executeUpdate(ksql, null, "/system/data", null);
			}
		}
	}
	
	public static void initGlobal(){
		if (LicenseChecker.instance().getLicense().isClient()){
			String[] ksqls = new String[]{
					"insert into SA_OPPermission t  (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" +
					"values( 'SYS-OPM-000', 'RL-SYSTEM', '/SA/client/clientProcess', '/协同平台/租户管理/租户管理', 'mainActivity', null, null, null, 0, null, 1, 1, 0)",
						
					"insert into SA_OPPermission t  (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" +
					"values( 'SYS-OPM-001', 'RL-SYSTEM', '/SA/client/clientProcess', '/协同平台/租户管理/应用管理', 'appActivity', null, null, null, 0, null, 1, 1, 0)",
					
					"insert into SA_OPPermission t (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" + 
					"values ('SYS-TOOLS-07', 'RL-SYSTEM', '/SA/init/initProcess', '/协同办公/系统工具/应用库管理', 'appDbManagerActivity', null, null, null, 0, null, 47, 1, 0)"
				};
				for (String ksql : ksqls){
					KSQL.executeUpdate(ksql, null, "/system/data", null);
				}
				/*
				String ksql = "insert into SA_OPPermission t  (t, t.sPermissionRoleID, t.sProcess, t.sActivityFName, t.sActivity, t.sActionsNames, t.sActions, t.sSemanticDP, t.sPermissionKind, t.sDescription, t.sSequence, t.sValidState, t.version)" +
						"values( 'SYS-OPM-00', 'RL-SYSTEM', '/SA/init/initProcess', '/协同平台/系统工具/应用库管理', 'appDbManagerActivity', null, null, null, 0, null, 1, 1, 0)";
						
				KSQL.executeUpdate(ksql, null, "/system/data", null);
				*/
		}
	}
}
