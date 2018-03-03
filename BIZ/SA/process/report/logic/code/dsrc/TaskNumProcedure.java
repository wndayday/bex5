import java.util.HashMap;

import org.apache.commons.lang.StringUtils;

import com.justep.system.data.DatabaseProduct;
import com.justep.system.data.SQL;
import com.justep.system.data.Table;

public class TaskNumProcedure {

	/**
	 * 部门任务数统计 饼图
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Table deptPieQuery(String startDate, String endDate) {
		String[] sql = deptSearch(startDate, endDate);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 部门任务数统计 柱状图
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static Table deptBarVQuery(String startDate, String endDate) {
		String[] sql = deptSearch(startDate, endDate);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 部门查询条件
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static String[] deptSearch(String startDate, String endDate) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" SELECT M.DEPTNAME,M.TASKNUM FROM (SELECT T.sExecutorDeptID DEPTID, MAX(T.sExecutorDeptName) DEPTNAME, COUNT(T.sKindID) TASKNUM FROM SA_TASK T WHERE (T.sKindID = 'tkTask' OR T.sKindID = 'tkExecutor')  AND T.sExecutorFID <> '' AND T.sCatalogID = 'tsProcess'");
		mssql.append(" SELECT M.DEPTNAME,M.TASKNUM FROM (SELECT T.sExecutorDeptID DEPTID, MAX(T.sExecutorDeptName) DEPTNAME, COUNT(T.sKindID) TASKNUM FROM SA_TASK T WHERE (T.sKindID = 'tkTask' OR T.sKindID = 'tkExecutor')  AND T.sExecutorFID <> '' AND T.sCatalogID = 'tsProcess'");

		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		}

		oracle.append(" GROUP BY T.sExecutorDeptID) M");
		mssql.append(" GROUP BY T.sExecutorDeptID) M");

		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}

	/**
	 * 人员任务数统计 饼图
	 * @param startDate
	 * @param endDate
	 * @param deptName
	 * @param personName
	 * @return
	 */
	public static Table personPieQuery(String startDate, String endDate, String deptName, String personName) {
		String[] sql = personSearch(startDate, endDate, deptName, personName);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 人员任务数统计 报表
	 * @param startDate
	 * @param endDate
	 * @param deptName
	 * @param personName
	 * @return
	 */
	public static Table personBarVQuery(String startDate, String endDate, String deptName, String personName) {
		String[] sql = personSearch(startDate, endDate, deptName, personName);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 人员查询条件
	 * @param startDate
	 * @param endDate
	 * @param deptName
	 * @param personName
	 * @return
	 */
	public static String[] personSearch(String startDate, String endDate, String deptName, String personName) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" SELECT ROWNUM NONUM,M.PERSONID,M.PERSONNAME,M.DEPTNAME,M.TASKNUM FROM (SELECT T.sExecutorPersonID PERSONID, MAX(T.sExecutorPersonName) PERSONNAME,MAX(T.sExecutorDeptName) DEPTNAME, COUNT(T.sKindID) TASKNUM FROM SA_TASK T WHERE (T.sKindID = 'tkTask' OR T.sKindID = 'tkExecutor')  AND T.sExecutorFID <> '' AND T.sCatalogID = 'tsProcess'");
		mssql.append(" SELECT (@i:=@i+1) NONUM,M.PERSONID,M.PERSONNAME,M.DEPTNAME,M.TASKNUM FROM (SELECT T.sExecutorPersonID PERSONID, MAX(T.sExecutorPersonName) PERSONNAME,MAX(T.sExecutorDeptName) DEPTNAME, COUNT(T.sKindID) TASKNUM FROM SA_TASK T WHERE (T.sKindID = 'tkTask' OR T.sKindID = 'tkExecutor')  AND T.sExecutorFID <> '' AND T.sCatalogID = 'tsProcess'");

		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(deptName) && StringUtils.isBlank(personName)) {
			oracle.append(" AND T.sExecutorDeptName LIKE '%").append(deptName).append("%'");
			mssql.append(" AND T.sExecutorDeptName LIKE '%").append(deptName).append("%'");
		} else if (StringUtils.isBlank(deptName) && StringUtils.isNotBlank(personName)) {
			oracle.append(" AND T.sExecutorPersonName LIKE '%").append(personName).append("%'");
			mssql.append(" AND T.sExecutorPersonName LIKE '%").append(personName).append("%'");
		}

		oracle.append(" GROUP BY T.sExecutorPersonID) M");
		mssql.append(" GROUP BY T.sExecutorPersonID) M,(select @i:=0)B");

		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
	
	/**
	 * 流程状态任务数统计 饼图
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table statusPieQuery(String startDate, String endDate, String processName) {
		String[] sql = statusSearch(startDate, endDate, processName);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 流程状态任务数统计 柱状图
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static Table statusBarVQuery(String startDate, String endDate, String processName) {
		String[] sql = statusSearch(startDate, endDate, processName);
		HashMap<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME, sql[1].toString());
		sqlMap.put(DatabaseProduct.ORACLE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.MSSQL.name(), sql[1].toString());
		sqlMap.put(DatabaseProduct.KINGBASE.name(), sql[0].toString());
		sqlMap.put(DatabaseProduct.SYBASE.name(), sql[1].toString());
		return SQL.select(sqlMap, null, "/SA/process/report/data");
	}

	/**
	 * 流程状态查询条件
	 * @param startDate
	 * @param endDate
	 * @param processName
	 * @return
	 */
	public static String[] statusSearch(String startDate, String endDate, String processName) {
		String[] sql = new String[2];
		StringBuffer oracle = new StringBuffer();
		StringBuffer mssql = new StringBuffer();
		oracle.append(" SELECT M.STATUSNAME,M.TASKNUM FROM (SELECT T.sStatusID STATUSID, MAX(T.sStatusName) STATUSNAME, COUNT(T.sKindID) TASKNUM FROM SA_TASK T WHERE (T.sKindID = 'tkTask' OR T.sKindID = 'tkExecutor')  AND T.sExecutorFID <> '' AND T.sCatalogID = 'tsProcess'");
		mssql.append(" SELECT M.STATUSNAME,M.TASKNUM FROM (SELECT T.sStatusID STATUSID, MAX(T.sStatusName) STATUSNAME, COUNT(T.sKindID) TASKNUM FROM SA_TASK T WHERE (T.sKindID = 'tkTask' OR T.sKindID = 'tkExecutor')  AND T.sExecutorFID <> '' AND T.sCatalogID = 'tsProcess'");

		if (StringUtils.isNotBlank(startDate) && StringUtils.isBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') >= TO_DATE('").append(startDate).append("','YYYY-MM-DD')");
			oracle.append(" AND TO_DATE(T.sActualStartTime,'YYYY-MM-DD') <= TO_DATE('").append(endDate).append("','YYYY-MM-DD')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') >= DATE_FORMAT('").append(startDate).append("','%Y-%m-%d')");
			mssql.append(" AND DATE_FORMAT(T.sActualStartTime,'%Y-%m-%d') <= DATE_FORMAT('").append(endDate).append("','%Y-%m-%d')");
		} else if (StringUtils.isNotBlank(processName)) {
			oracle.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
			mssql.append(" AND T.sProcessName LIKE '%").append(processName).append("%'");
		}

		oracle.append("   GROUP BY T.sStatusID ) M");
		mssql.append("   GROUP BY T.sStatusID ) M");

		sql[0] = oracle.toString();
		sql[1] = mssql.toString();
		return sql;
	}
}
