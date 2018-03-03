import java.util.HashMap;

import org.apache.commons.lang.StringUtils;



import com.justep.system.data.DatabaseProduct;
import com.justep.system.data.SQL;
import com.justep.system.data.Table;


public class ProcessRankProcedure {

	/**
	 * 流程活跃排名
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table processRankQuery(String startDate, String endDate, String processName,String  orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = processRankSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 活跃查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] processRankSearch(String startDate, String endDate, String processName,String  orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");

		mssql.append(" SELECT (@i:=@i+1) NONUM,A.SPROCESS,A.INSTANCENUM,A.PROCESSNAME,A.CREATOROGNNAME, A.CREATORPERSONNAME,A.CREATETIME FROM");
		mssql.append(" (SELECT M.sProcess SPROCESS, M.INSTANCENUM, M.PROCESSNAME,M.CREATOROGNNAME, M.CREATORPERSONNAME,DATE_FORMAT(M.CREATETIME,'%Y-%m-%d %H:%i:%s') CREATETIME FROM");
		mssql.append(" (SELECT T.sProcess, COUNT(T.sProcess) INSTANCENUM, MAX(T.sProcessName) PROCESSNAME,MAX(T.sCreatorOgnName) CREATOROGNNAME, MAX(T.sCreatorPersonName) CREATORPERSONNAME,MIN(T.sCreateTime) CREATETIME");
		mssql.append(" FROM SA_TASK T WHERE T.sKindID = 'tkProcessInstance'");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
		}
		mssql.append(" GROUP BY T.sProcess)M ORDER BY M.INSTANCENUM ").append(orderValue).append(" )A,(SELECT @i:=0) B");
		
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 流程耗时排名
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table longTimeRankQuery(String startDate, String endDate, String processName,String  orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = longTimeRankSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 耗时查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] longTimeRankSearch(String startDate, String endDate, String processName,String  orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");
		
		mssql.append(" SELECT (@i:=@i+1) NONUM,M.INSTANCENAME,M.SPROCESSNAME,M.TASKNUM,M.SACTUALSTARTTIME, M.SACTUALFINISHTIME,M.LONGTIME FROM");
		mssql.append(" (SELECT S.sname INSTANCENAME,S.SPROCESS,S.SPROCESSNAME,DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d %H:%i:%s') SACTUALSTARTTIME,DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d %H:%i:%s') SACTUALFINISHTIME,");
		mssql.append(" (SELECT COUNT(A.sKindID) FROM SA_TASK A WHERE (A.sKindID = 'tkTask' OR A.sKindID = 'tkExecutor')  AND A.sExecutorFID <> '' AND A.sCatalogID = 'tsProcess' AND A.sStatusID IN ('tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited') AND A.SPARENTID = S.SID ) TASKNUM, ");
		mssql.append(" CONCAT(TIMESTAMPDIFF(DAY, S.sActualStartTime, S.sActualFinishTime),'天', MOD(TIMESTAMPDIFF(HOUR,S.sActualStartTime, S.sActualFinishTime), 24),'小时',MOD(TIMESTAMPDIFF(MINUTE,S.sActualStartTime, S.sActualFinishTime), 60),'分钟',");
		mssql.append(" MOD(TIMESTAMPDIFF(SECOND,S.sActualStartTime, S.sActualFinishTime), 60),'秒') LONGTIME,TIMESTAMPDIFF(MINUTE,S.sActualStartTime, S.sActualFinishTime) TOTALTIME");
		mssql.append(" FROM SA_TASK S");
		mssql.append(" WHERE S.sKindID = 'tkProcessInstance' AND S.sStatusID IN ('tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited')");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND S.sProcessName LIKE '%").append(processName).append("%'");
		}
		mssql.append(" )M,(select @i:=0)  B ORDER BY M.TOTALTIME ").append(orderValue);
		
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 任务效率排名
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table shortTimeRankQuery(String startDate, String endDate, String processName,String  orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "asc";
		}
		String[] sql = shortTimeRankSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 任务效率查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] shortTimeRankSearch(String startDate, String endDate, String processName,String  orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");
		mssql.append(" SELECT (@i:=@i+1) NONUM,M.SACTIVITYNAME,M.SPROCESSNAME,M.INSTANCENAME,M.SACTUALSTARTTIME, M.SACTUALFINISHTIME,M.LONGTIME FROM");
		mssql.append(" (SELECT S.sActivityName SACTIVITYNAME,S.SPROCESSNAME,");
		mssql.append(" (SELECT D.sName FROM SA_TASK D WHERE D.sKindID = 'tkProcessInstance' AND D.sID = S.sParentID) INSTANCENAME,");
		mssql.append(" DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d %H:%i:%s') SACTUALSTARTTIME,DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d %H:%i:%s') SACTUALFINISHTIME,");
		mssql.append(" CONCAT((CASE WHEN TIMESTAMPDIFF(DAY, S.sActualStartTime, S.sActualFinishTime)>0 THEN CONCAT(TIMESTAMPDIFF(DAY, S.sActualStartTime, S.sActualFinishTime),'天') ELSE '' END),");
		mssql.append(" (CASE WHEN  MOD(TIMESTAMPDIFF(HOUR,S.sActualStartTime, S.sActualFinishTime), 24)>0 THEN CONCAT(MOD(TIMESTAMPDIFF(HOUR,S.sActualStartTime, S.sActualFinishTime), 24),'小时') ELSE '' END),");
		mssql.append(" (CASE WHEN  MOD(TIMESTAMPDIFF(MINUTE,S.sActualStartTime, S.sActualFinishTime), 60)>0 THEN CONCAT(MOD(TIMESTAMPDIFF(MINUTE,S.sActualStartTime, S.sActualFinishTime), 60),'分钟') ELSE '' END),");
		mssql.append("  MOD(TIMESTAMPDIFF(SECOND,S.sActualStartTime, S.sActualFinishTime), 60),'秒') LONGTIME,");
		mssql.append(" TIMESTAMPDIFF(SECOND,S.sActualStartTime, S.sActualFinishTime) TOTALTIME");
		mssql.append(" FROM SA_TASK S");
		mssql.append(" WHERE (S.sKindID = 'tkTask' OR S.sKindID = 'tkExecutor') AND S.sExecutorFID <> '' AND S.sCatalogID = 'tsProcess' AND S.sStatusID IN ('tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited')");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND S.sProcessName LIKE '%").append(processName).append("%'");
		}
		mssql.append(" )M ,(select @i:=0)  B ORDER BY M.TOTALTIME ").append(orderValue);
		
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 超期任务统计
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param orderValue
	 * @return
	 */
	public static Table taskLimitRankQuery(String startDate, String endDate, String processName,String  orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = taskLimitRankSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 超期任务统计查询
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param orderValue
	 * @return
	 */
	public static String[] taskLimitRankSearch(String startDate, String endDate, String processName,String  orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");	
		mssql.append(" SELECT (@i:=@i+1) NONUM,P.SACTIVITYNAME,P.SPROCESSNAME,P.INSTANCENAME,P.SACTUALSTARTTIME,P.SSTATUSNAME,P.SACTUALFINISHTIME,P.LIMITTIME,P.LONGTIME  FROM");
		mssql.append(" (SELECT m.sActivityName SACTIVITYNAME,m.sProcessName SPROCESSNAME,m.instanceName INSTANCENAME, m.sActualStartTime SACTUALSTARTTIME,");
		mssql.append(" m.sStatusName SSTATUSNAME,m.limitdate SACTUALFINISHTIME,m.subtimes LIMITTIME, ");
		mssql.append(" CONCAT((CASE WHEN TRUNCATE(m.subtimes/60/60/24,0)>0 THEN CONCAT(TRUNCATE(m.subtimes/60/60/24,0),'天') ELSE '' END),");
		mssql.append(" TRUNCATE(SUBSTRING_INDEX(TRUNCATE(m.subtimes/60/60/24,2),'.',-1)*24/100,0),'小时', MOD(TRUNCATE(m.subtimes/60,0),60),'分钟', MOD(m.subtimes,60),'秒') LONGTIME");
		mssql.append(" FROM (SELECT K.sActivityName,K.sProcessName,K.sActualStartTime,DATE_FORMAT(k.limitdate,'%Y-%m-%d %H:%i:%s') limitdate,K.instanceName,K.sStatusName,K.subtimes FROM ");
		mssql.append(" (SELECT t.sActivityName,t.sProcessName, DATE_FORMAT(t.sActualStartTime,'%Y-%m-%d %H:%i:%s') sActualStartTime,");
		mssql.append(" (CASE WHEN t.sActualFinishTime IS NOT NULL THEN  t.sActualFinishTime ELSE  DATE_ADD(t.sActualStartTime, INTERVAL t.sLimitSecond SECOND) END) limitdate,");
		mssql.append(" (CASE WHEN t.sActualFinishTime IS NOT NULL THEN  ABS(TIMESTAMPDIFF(SECOND,t.sActualStartTime,t.sActualFinishTime)-t.sLimitSecond)");
		mssql.append(" ELSE  ABS(TIMESTAMPDIFF(SECOND,(DATE_ADD(t.sActualStartTime, INTERVAL t.sLimitSecond SECOND)),NOW())) END) subtimes,t.sStatusName,t.sLimitSecond,");
		mssql.append(" (SELECT s.sName FROM sa_task s WHERE s.sKindID = 'tkProcessInstance' AND s.sID = t.sParentID) instanceName FROM sa_task t");
		mssql.append(" WHERE  (t.sKindID = 'tkTask' OR t.sKindID = 'tkExecutor') AND t.sExecutorFID <> '' AND t.sCatalogID = 'tsProcess')K ");
		mssql.append(" WHERE K.subtimes-K.sLimitSecond > 0)m)P,(select @i:=0) B WHERE 1=1");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(P.SACTUALSTARTTIME,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(P.SACTUALFINISHTIME,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(P.SACTUALSTARTTIME,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(P.SACTUALFINISHTIME,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND P.SPROCESSNAME LIKE '%").append(processName).append("%'");
		}
		mssql.append(" ORDER BY P.LIMITTIME ").append(orderValue);
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 超期人员统计
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param orderValue
	 * @return
	 */
	public static Table personLimitRankQuery(String startDate, String endDate, String processName,String  orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = personLimitRankSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 超期人员统计查询
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @param orderValue
	 * @return
	 */
	public static String[] personLimitRankSearch(String startDate, String endDate, String processName,String  orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");
		mssql.append(" SELECT (@i:=@i+1) NONUM,P.SEXECUTORPERSONNAME,P.SEXECUTORDEPTNAME,P.TASKNUM,P.SPROCESSNAME,P.LIMITTIME,P.LONGTIME FROM");
		mssql.append(" (SELECT m.sExecutorPersonID SEXECUTORPERSONID,MAX(m.sExecutorPersonName) SEXECUTORPERSONNAME,MAX(m.sExecutorDeptName) SEXECUTORDEPTNAME,COUNT(m.sID) TASKNUM,");
		mssql.append(" MAX(m.sProcessName) SPROCESSNAME,SUM(m.subtimes) LIMITTIME,");
		mssql.append(" CONCAT((CASE WHEN TRUNCATE(SUM(m.subtimes)/60/60/24,0)>0 THEN CONCAT(TRUNCATE(SUM(m.subtimes)/60/60/24,0),'天') ELSE '' END),");
		mssql.append(" TRUNCATE(SUBSTRING_INDEX(TRUNCATE(SUM(m.subtimes)/60/60/24,2),'.',-1)*24/100,0),'小时', MOD(TRUNCATE(SUM(m.subtimes)/60,0),60),'分钟', MOD(SUM(m.subtimes),60),'秒') LONGTIME FROM (");
		mssql.append(" SELECT k.sID,k.sExecutorPersonID,k.sExecutorPersonName,k.sExecutorDeptName,k.sProcessName,k.sActualStartTime,k.limitdate,k.sStatusName,k.subtimes FROM");
		mssql.append(" (SELECT t.sID,t.sExecutorPersonID,t.sExecutorPersonName,t.sExecutorDeptName,t.sProcessName,t.sActualStartTime,");
		mssql.append(" (CASE WHEN t.sActualFinishTime IS NOT NULL THEN  t.sActualFinishTime ELSE  DATE_ADD(t.sActualStartTime, INTERVAL t.sLimitSecond SECOND) END) limitdate,");
		mssql.append(" (CASE WHEN t.sActualFinishTime IS NOT NULL THEN  ABS(TIMESTAMPDIFF(SECOND,t.sActualStartTime,t.sActualFinishTime)-t.sLimitSecond)");
		mssql.append(" ELSE  ABS(TIMESTAMPDIFF(SECOND,(DATE_ADD(t.sActualStartTime, INTERVAL t.sLimitSecond SECOND)),NOW())) END) subtimes,t.sStatusName,t.sLimitSecond");
		mssql.append(" FROM sa_task t WHERE  (t.sKindID = 'tkTask' OR t.sKindID = 'tkExecutor') AND t.sExecutorFID <> '' AND t.sCatalogID = 'tsProcess')k ");
		mssql.append(" WHERE k.subtimes - k.sLimitSecond > 0 AND k.sExecutorPersonID <> ''");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(k.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(k.limitdate,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(k.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(k.limitdate,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}
		mssql.append(" )m GROUP BY m.sExecutorPersonID)P, (select @i:=0) B");
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" WHERE P.SPROCESSNAME LIKE '%").append(processName).append("%'");
		}
		mssql.append(" ORDER BY P.LIMITTIME ").append(orderValue);
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
}
