import java.util.HashMap;

import org.apache.commons.lang.StringUtils;

import com.justep.system.data.DatabaseProduct;
import com.justep.system.data.SQL;
import com.justep.system.data.Table;

public class ProcessCaseProcedure {

	/**
	 * 流程待办情况统计
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table groupExecutingQuery(String startDate, String endDate, String processName) {
		String[] sql = getSQLMesssage(startDate, endDate, processName, "execute","T.sActualStartTime");
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 流程完成情况统计
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table groupFinishedQuery(String startDate, String endDate, String processName) {
		String[] sql = getSQLMesssage(startDate, endDate, processName, "finish","T.sActualFinishTime");
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 流程待办和完成统计SQL
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param procType
	 * @param dateType
	 * @return
	 */
	public static String[] getSQLMesssage(String startDate, String endDate, String processName, String procType,String dateType) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		String procStatus = "";
		if("execute".equals(procType)){//流程待办
			procStatus = "'tesExecuting','tesReady','tesRemain','tesSleeping','tesPaused','tesWaited'";
		}else{//流程完成
			procStatus = "'tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited'";
		}
		oracle.append(" SELECT ROWNUM NONUM,K.INSTANCENAME,K.SPROCESSNAME,K.SACTUALSTARTTIME,K.SACTUALFINISHTIME,K.TASKNUM FROM");
		oracle.append(" (SELECT  T.sName INSTANCENAME,T.sProcessName SPROCESSNAME,T.sActualStartTime SACTUALSTARTTIME,t.sActualFinishTime SACTUALFINISHTIME,");
		oracle.append(" TO_CHAR(T.sActualStartTime,'YYYY-MM-DD HH:MI:SS') SACTUALSTARTTIME,TO_CHAR(T.sActualFinishTime,'YYYY-MM-DD HH:MI:SS') SACTUALFINISHTIME,");
		oracle.append(" (SELECT COUNT(M.sKindID) FROM SA_TASK M WHERE M.sStatusID IN (").append(procStatus).append(") AND (M.sKindID = 'tkTask' OR M.sKindID = 'tkExecutor')  AND M.sExecutorFID <> '' AND M.sCatalogID = 'tsProcess' AND M.sParentID = T.sID ) TASKNUM");
		oracle.append(" FROM SA_TASK T");
		oracle.append(" WHERE T.sStatusID IN (").append(procStatus).append(") AND T.sKindID = 'tkProcessInstance' ");
		
		
		mssql.append(" SELECT (@i:=@i+1) NONUM,K.INSTANCENAME,K.SPROCESSNAME,K.SACTUALSTARTTIME,K.SACTUALFINISHTIME,K.TASKNUM FROM");
		mssql.append(" (SELECT  T.sName INSTANCENAME,T.sProcessName SPROCESSNAME,");
		mssql.append(" DATE_FORMAT(T.sActualStartTime,'%Y-%c-%d %h:%i:%s') SACTUALSTARTTIME,DATE_FORMAT(T.sActualFinishTime,'%Y-%c-%d %h:%i:%s') SACTUALFINISHTIME,");
		mssql.append(" (SELECT COUNT(M.sKindID) FROM SA_TASK M WHERE M.sStatusID IN (").append(procStatus).append(") AND (M.sKindID = 'tkTask' OR M.sKindID = 'tkExecutor')  AND M.sExecutorFID <> '' AND M.sCatalogID = 'tsProcess' AND M.sParentID = T.sID ) TASKNUM");
		mssql.append(" FROM SA_TASK T");
		mssql.append(" WHERE T.sStatusID IN (").append(procStatus).append(") AND T.sKindID = 'tkProcessInstance' ");
	
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			oracle.append(" AND TO_DATE(").append(dateType).append(",'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(").append(dateType).append(",'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(").append(dateType).append("'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(").append(dateType).append(",'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(").append(dateType).append(",'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			oracle.append(" AND TO_DATE(").append(dateType).append(",'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(").append(dateType).append(",'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(").append(dateType).append(",'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}

		if (StringUtils.isNotBlank(processName)) {
			oracle.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
			mssql.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
		}
		oracle.append(" ORDER BY T.sProcess)K WHERE K.TASKNUM > 0");
		mssql.append(" ORDER BY T.sProcess)K,(select @i:=0)B WHERE K.TASKNUM > 0");

		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 流程类型统计 饼图
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Table processTypePieQuery(String startDate, String endDate,String processName) {
		String[] sql = procTypeSearch(startDate, endDate,processName);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 流程类型统计 柱状图
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Table processTypeBarVQuery(String startDate, String endDate,String processName) {
		String[] sql = procTypeSearch(startDate, endDate,processName);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 流程类型统计SQL
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static String[] procTypeSearch(String startDate, String endDate, String processName) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" SELECT ROWNUM NONUM,M.SPROCESSNAME,M.INSTANCENUM,M.TASKNUM FROM (SELECT T.SPROCESS,MAX(T.SPROCESSNAME) SPROCESSNAME,COUNT(T.sKindID) INSTANCENUM,");
		oracle.append(" (SELECT COUNT(M.sKindID) FROM SA_TASK M WHERE (M.sKindID = 'tkTask' OR M.sKindID = 'tkExecutor')  AND M.sExecutorFID <> '' AND M.sCatalogID = 'tsProcess' AND M.SPROCESS = T.SPROCESS ");
		mssql.append(" SELECT (@i:=@i+1) NONUM,M.SPROCESSNAME,M.INSTANCENUM,M.TASKNUM FROM (SELECT T.SPROCESS,MAX(T.SPROCESSNAME) SPROCESSNAME,COUNT(T.sKindID) INSTANCENUM,");
		mssql.append(" (SELECT COUNT(M.sKindID) FROM SA_TASK M WHERE (M.sKindID = 'tkTask' OR M.sKindID = 'tkExecutor')  AND M.sExecutorFID <> '' AND M.sCatalogID = 'tsProcess' AND M.SPROCESS = T.SPROCESS ");

		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			oracle.append(" AND TO_DATE(M.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')) TASKNUM ");
			mssql.append(" AND DATE_FORMAT(M.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')) TASKNUM ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(M.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')) TASKNUM ");
			mssql.append(" AND DATE_FORMAT(M.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')) TASKNUM ");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(M.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			oracle.append(" AND TO_DATE(M.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')) TASKNUM ");
			mssql.append(" AND DATE_FORMAT(M.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(M.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')) TASKNUM ");
		} else {
			oracle.append(" ) TASKNUM ");
			mssql.append(" ) TASKNUM ");
		}
		oracle.append(" FROM SA_TASK T  WHERE T.sKindID = 'tkProcessInstance'");
		mssql.append(" FROM SA_TASK T  WHERE T.sKindID = 'tkProcessInstance'");
		if (StringUtils.isNotBlank(processName)) {
			oracle.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
			mssql.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
		}
		oracle.append(" GROUP BY T.sProcess) M");
		mssql.append(" GROUP BY T.sProcess) M,(select @i:=0)B");
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 流程超期统计 报表
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param orderValue
	 * @return
	 */
	public static Table processLimitTimeQuery(String startDate, String endDate,String processName,String orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = processLimitTimeSearch(startDate, endDate,processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 流程超期统计SQL
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param orderValue
	 * @return
	 */
	public static String[] processLimitTimeSearch(String startDate, String endDate, String processName,String orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");		
		mssql.append(" SELECT (@i:=@i+1) NONUM,A.sName INSTANCENAME,A.sProcessName SPROCESSNAME,A.sStatusName SSTATUSNAME,A.limittime LIMITTIME,A.LONGTIME FROM");
		mssql.append(" (SELECT O.SID,O.sName,O.sProcessName,O.sStatusName,P.limittime,");
		mssql.append(" CONCAT((CASE WHEN TRUNCATE(P.limittime/60/60/24,0)>0 THEN CONCAT(TRUNCATE(P.limittime/60/60/24,0),'天') ELSE '' END ),");
		mssql.append(" TRUNCATE(SUBSTRING_INDEX(TRUNCATE(P.limittime/60/60/24,2),'.',-1)*24/100,0),'小时',MOD(TRUNCATE(P.limittime/60,0),60),'分钟',MOD(P.limittime,60),'秒') LONGTIME");
		mssql.append(" FROM (SELECT s.sID,s.sName,s.sProcessName,s.sStatusName FROM sa_task s WHERE s.sKindID = 'tkProcessInstance'");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(s.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(s.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(s.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(s.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		}
		mssql.append(" )O LEFT JOIN (SELECT K.sParentID,SUM(K.limittime) limittime FROM (SELECT m.sParentID,(m.subseconds-m.sLimitSecond) limittime FROM (");
		mssql.append(" SELECT t.sParentID,t.sLimitSecond,TIMESTAMPDIFF(SECOND,t.sActualStartTime,t.sActualFinishTime) subseconds FROM sa_task t");
		mssql.append(" WHERE t.sActualFinishTime IS NOT NULL AND (t.sKindID = 'tkTask' OR t.sKindID = 'tkExecutor') AND t.sExecutorFID <> '' AND t.sCatalogID = 'tsProcess'");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(t.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(t.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		}
		mssql.append(" ) m WHERE m.subseconds > m.sLimitSecond UNION");
		mssql.append(" SELECT n.sParentID,TIMESTAMPDIFF(SECOND,n.limitdate, NOW()) limittime");
		mssql.append(" FROM (SELECT t.sParentID,DATE_ADD(t.sActualStartTime, INTERVAL t.sLimitSecond SECOND) limitdate FROM sa_task t");
		mssql.append(" WHERE t.sActualFinishTime IS NULL AND (t.sKindID = 'tkTask' OR t.sKindID = 'tkExecutor') AND t.sExecutorFID <> '' AND t.sCatalogID = 'tsProcess'");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		}
		mssql.append(" ) n WHERE n.limitdate < NOW())K WHERE K.sParentID IS NOT NULL");				
		mssql.append(" GROUP BY K.sParentID)P ON O.sID = P.sParentID )A,(SELECT @i:=0) B ");
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" WHERE A.sProcessName LIKE '%").append(processName).append("%'");
		}
		mssql.append("  ORDER BY A.LIMITTIME ").append(orderValue);
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
}
