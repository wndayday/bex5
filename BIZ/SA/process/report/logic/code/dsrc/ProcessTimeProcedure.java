import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import com.justep.system.data.DatabaseProduct;
import com.justep.system.data.SQL;
import com.justep.system.data.Table;

public class ProcessTimeProcedure {

	/**
	 * 流程耗时统计
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table processLongTimeQuery(String startDate, String endDate, String processName,String orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = procLongTimeSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 流程耗时查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] procLongTimeSearch(String startDate, String endDate, String processName,String orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL ");
		mssql.append(" SELECT (@i:=@i+1) NONUM,P.INSTANCENAME,P.SPROCESSNAME,P.SSTATUSNAME,");
		mssql.append(" DATE_FORMAT(P.sActualStartTime,'%Y-%m-%d %H:%i:%s') SACTUALSTARTTIME,DATE_FORMAT(P.ActualFinishTime,'%Y-%m-%d %H:%i:%s') SACTUALFINISHTIME,");
		mssql.append(" TIMESTAMPDIFF(MINUTE,P.sActualStartTime, P.ActualFinishTime) SECONDSTIME,");
		mssql.append(" CONCAT(TIMESTAMPDIFF(DAY, P.sActualStartTime, P.ActualFinishTime),'天', MOD(TIMESTAMPDIFF(HOUR,P.sActualStartTime, P.ActualFinishTime), 24),'小时',");
		mssql.append("  MOD(TIMESTAMPDIFF(MINUTE,P.sActualStartTime, P.ActualFinishTime), 60),'分钟', MOD(TIMESTAMPDIFF(SECOND,P.sActualStartTime, P.ActualFinishTime), 60),'秒') LONGTIME FROM");
		mssql.append(" (SELECT S.sname INSTANCENAME,S.SPROCESS,S.SPROCESSNAME, S.sStatusNAME SSTATUSNAME, S.sActualStartTime,");
		mssql.append(" (CASE WHEN S.sActualFinishTime IS NOT NULL  THEN S.sActualFinishTime ELSE NOW() END) ActualFinishTime");
		mssql.append(" FROM SA_TASK S WHERE S.sKindID = 'tkProcessInstance' )P,(select @i:=0)B WHERE 1=1");
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(P.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(P.ActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(P.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(P.ActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND P.SPROCESSNAME LIKE '%").append(processName).append("%'");
		}
		mssql.append(" ORDER BY SECONDSTIME ").append(orderValue);
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 平均流程处理时间
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table avgProcessTimeQuery(String startDate, String endDate, String processName,String orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = avgProcTimeSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 平均流程查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] avgProcTimeSearch(String startDate, String endDate, String processName,String orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL");
		mssql.append(" SELECT (@i:=@i+1) NONUM,N.SPROCESS, N.SPROCESSNAME,N.INSTANCENUM,N.TASKNUM,N.MINUTES,");
		mssql.append(" CONCAT((CASE WHEN ROUND(N.MINUTES/60/24,0)>0 THEN CONCAT(ROUND(N.MINUTES/60/24,0),'天') ELSE '' END ),");
		mssql.append(" TRUNCATE(SUBSTRING_INDEX(ROUND(N.MINUTES/60/24,2),'.',-1)*24/100,0),'小时',MOD(N.MINUTES,60),'分钟') TOTALTIME,");
		mssql.append(" CONCAT((CASE WHEN ROUND(N.MINUTES/N.INSTANCENUM/60/24,0)>0 THEN CONCAT(ROUND(N.MINUTES/N.INSTANCENUM/60/24,0),'天') ELSE '' END ),");
		mssql.append(" TRUNCATE(SUBSTRING_INDEX(ROUND(N.MINUTES/N.INSTANCENUM/60/24,2),'.',-1)*24/100,0),'小时',MOD(ROUND(N.MINUTES/N.INSTANCENUM),60),'分钟') LONGTIME");
		mssql.append(" FROM");
		mssql.append(" (SELECT M.SPROCESS, MAX(M.SPROCESSNAME) SPROCESSNAME,COUNT(M.SPARENTID) INSTANCENUM,SUM(M.TASKNUM) TASKNUM,SUM(M.MINUTES) MINUTES FROM");
		mssql.append(" (SELECT MAX(K.SPROCESS) SPROCESS, MAX(K.SPROCESSNAME) SPROCESSNAME,K.SPARENTID,COUNT(K.SID) TASKNUM,SUM(K.MINUTES) MINUTES  FROM");
		mssql.append(" (SELECT S.SPROCESS, S.SPROCESSNAME,S.SPARENTID,S.SID,TIMESTAMPDIFF(MINUTE, S.sActualStartTime, S.sActualFinishTime) MINUTES FROM SA_TASK S");
		mssql.append(" WHERE (S.sKindID = 'tkTask' OR S.sKindID = 'tkExecutor')  AND S.sExecutorFID <> '' AND S.sCatalogID = 'tsProcess' AND S.SPARENTID IN (SELECT T.SID FROM SA_TASK T WHERE T.sKindID = 'tkProcessInstance' ");
		mssql.append(" AND T.sStatusID IN ('tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited')");

		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(T.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(T.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
		}
		mssql.append(" ))K GROUP BY K.SPARENTID)M,(SELECT @i:=0) B");
		mssql.append(" GROUP BY M.SPROCESS)N ORDER BY N.MINUTES ").append(orderValue);
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 平均任务处理时间
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table avgTaskTimeQuery(String startDate, String endDate, String processName,String orderValue) {
		if(StringUtils.isBlank(orderValue)){
			orderValue = "desc";
		}
		String[] sql = avgProcTaskSearch(startDate, endDate, processName,orderValue);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}
	
	/**
	 * 平均任务查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] avgProcTaskSearch(String startDate, String endDate, String processName,String orderValue) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" ORACLE SQL");
		mssql.append(" SELECT (@i:=@i+1) NONUM,K.INSTANCENUM,K.SPROCESSNAME,K.TASKNUM,K.TOTALTIME,K.MINUTES,");
		mssql.append(" CONCAT((CASE WHEN TRUNCATE(K.MINUTES/K.TASKNUM/60/24,0)>0 THEN CONCAT(TRUNCATE(K.MINUTES/K.TASKNUM/60/24,0),'天') ELSE '' END ),");
		mssql.append(" TRUNCATE(SUBSTRING_INDEX(ROUND(K.MINUTES/K.TASKNUM/60/24,2),'.',-1)*24/100,0),'小时',MOD(ROUND(K.MINUTES/K.TASKNUM),60),'分钟') LONGTIME");
		mssql.append(" FROM");
		mssql.append(" (SELECT S.sname INSTANCENUM,S.SPROCESS,S.SPROCESSNAME,");
		mssql.append(" CONCAT(TIMESTAMPDIFF(DAY, S.sActualStartTime, S.sActualFinishTime),'天', MOD(TIMESTAMPDIFF(HOUR,S.sActualStartTime, S.sActualFinishTime), 24),'小时', MOD(TIMESTAMPDIFF(MINUTE,S.sActualStartTime, S.sActualFinishTime), 60),'分钟') TOTALTIME,");
		mssql.append(" (SELECT COUNT(A.sKindID) FROM SA_TASK A WHERE (A.sKindID = 'tkTask' OR A.sKindID = 'tkExecutor')  AND A.sExecutorFID <> '' AND A.sCatalogID = 'tsProcess' AND  A.sStatusID IN ('tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited') AND A.SPARENTID = S.SID) TASKNUM,");
		mssql.append(" TIMESTAMPDIFF(MINUTE,S.sActualStartTime, S.sActualFinishTime) MINUTES FROM SA_TASK S");
		mssql.append(" WHERE S.sKindID = 'tkProcessInstance' AND S.sStatusID IN ('tesFinished','tesAborted','tesCanceled','tesReturned','tesTransmited')");
		
		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			mssql.append(" AND DATE_FORMAT(S.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(S.sActualFinishTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d') ");
		}
		if (StringUtils.isNotBlank(processName)) {
			mssql.append(" AND S.sProcessName LIKE '%").append(processName).append("%'");
		}
		mssql.append(" )K,(SELECT @i:=0) B ORDER BY K.MINUTES ").append(orderValue);;
		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
}
