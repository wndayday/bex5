import java.util.HashMap;

import com.justep.system.data.DatabaseProduct;
import com.justep.system.data.SQL;
import com.justep.system.data.Table;

public class SimpleReportProcedure {

	/**
	 * 网格报表
	 * @return
	 */
	public static Table gridQuery(){
		String oracle = "SELECT RPRODUCTID , RPRODUCTNAME , (SELECT RCATEGORYNAME FROM DEMO_REPORTPRODUCTCATEGORY WHERE DEMO_REPORTPRODUCTCATEGORY.RCATEGORYID = DEMO_REPORTPRODUCTS.RCATEGORYID) AS RCATEGORYNAME , (SELECT RCOMPANYNAME FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RCOMPANYNAME, RQUANTITYPERUNIT,RUNITPRICE,RUNITSINSTOCK FROM DEMO_REPORTPRODUCTS";
		String mssql = "SELECT RPRODUCTID, RPRODUCTNAME, (SELECT RCATEGORYNAME FROM DEMO_REPORTPRODUCTCATEGORY WHERE DEMO_REPORTPRODUCTCATEGORY.RCATEGORYID = DEMO_REPORTPRODUCTS.RCATEGORYID) AS RCATEGORYNAME , (SELECT RCOMPANYNAME FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RCOMPANYNAME, RQUANTITYPERUNIT,RUNITPRICE,RUNITSINSTOCK FROM DEMO_REPORTPRODUCTS";
		HashMap<String,String> sqlMap = new HashMap<String,String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME,mssql);
		sqlMap.put(DatabaseProduct.ORACLE.name(),oracle);
		sqlMap.put(DatabaseProduct.MSSQL.name(),mssql);
		sqlMap.put(DatabaseProduct.KINGBASE.name(),oracle);
		sqlMap.put(DatabaseProduct.SYBASE.name(),mssql);
		sqlMap.put(DatabaseProduct.DB2.name(),oracle);
		return SQL.select(sqlMap,null,"/demo/report/data");
	}

	/**
	 * 分组报表
	 * @return
	 */
	public static Table groupQuery(){
		
		String oracle = "SELECT RPRODUCTID , RPRODUCTNAME , (SELECT RCATEGORYNAME FROM DEMO_REPORTPRODUCTCATEGORY WHERE DEMO_REPORTPRODUCTCATEGORY.RCATEGORYID = DEMO_REPORTPRODUCTS.RCATEGORYID) AS RCATEGORYNAME , (SELECT RCOMPANYNAME FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RCOMPANYNAME, RQUANTITYPERUNIT,RUNITPRICE,RUNITSINSTOCK FROM DEMO_REPORTPRODUCTS";
		String mssql = "SELECT RPRODUCTID , RPRODUCTNAME , (SELECT RCATEGORYNAME FROM DEMO_REPORTPRODUCTCATEGORY WHERE DEMO_REPORTPRODUCTCATEGORY.RCATEGORYID = DEMO_REPORTPRODUCTS.RCATEGORYID) AS RCATEGORYNAME , (SELECT RCOMPANYNAME FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RCOMPANYNAME, RQUANTITYPERUNIT,RUNITPRICE,RUNITSINSTOCK FROM DEMO_REPORTPRODUCTS";
		
		HashMap<String,String> sqlMap = new HashMap<String,String>();
		sqlMap.put(DatabaseProduct.DB2.name(),oracle);
		sqlMap.put(SQL.DEFAULT_DB_NAME,mssql);
		sqlMap.put(DatabaseProduct.ORACLE.name(),oracle);
		sqlMap.put(DatabaseProduct.MSSQL.name(),mssql);
		sqlMap.put(DatabaseProduct.KINGBASE.name(),oracle);
		sqlMap.put(DatabaseProduct.SYBASE.name(),mssql);
		return SQL.select(sqlMap,null,"/demo/report/data");
	}

	/**
	 * 交叉报表
	 * @return
	 */
	public static Table crossQuery(){
		
		String oracle = "SELECT RPRODUCTID , RPRODUCTNAME , (SELECT RCATEGORYNAME FROM DEMO_REPORTPRODUCTCATEGORY WHERE RCATEGORYID IN ('1','2') AND DEMO_REPORTPRODUCTCATEGORY.RCATEGORYID = DEMO_REPORTPRODUCTS.RCATEGORYID) AS RCATEGORYNAME , (SELECT RCOMPANYNAME FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RCOMPANYNAME, (SELECT RREGION FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RREGION, RQUANTITYPERUNIT,RUNITPRICE,RUNITSINSTOCK FROM DEMO_REPORTPRODUCTS WHERE DEMO_REPORTPRODUCTS.RCATEGORYID IN ('1','2') AND DEMO_REPORTPRODUCTS.RSUPPLIERID IN ('1','2','3','7')";
		String mssql = "SELECT RPRODUCTID , RPRODUCTNAME , (SELECT RCATEGORYNAME FROM DEMO_REPORTPRODUCTCATEGORY WHERE DEMO_REPORTPRODUCTCATEGORY.RCATEGORYID = DEMO_REPORTPRODUCTS.RCATEGORYID) AS RCATEGORYNAME , (SELECT RCOMPANYNAME FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RCOMPANYNAME, (SELECT RREGION FROM DEMO_REPORTSUPPLIERS WHERE DEMO_REPORTSUPPLIERS.RSUPPLIERID = DEMO_REPORTPRODUCTS.RSUPPLIERID)AS RREGION, RQUANTITYPERUNIT,RUNITPRICE,RUNITSINSTOCK FROM DEMO_REPORTPRODUCTS WHERE (DEMO_REPORTPRODUCTS.RCATEGORYID = '1' or DEMO_REPORTPRODUCTS.RCATEGORYID = '2') AND (DEMO_REPORTPRODUCTS.RSUPPLIERID = '1' OR DEMO_REPORTPRODUCTS.RSUPPLIERID = '2' OR DEMO_REPORTPRODUCTS.RSUPPLIERID = '3' OR DEMO_REPORTPRODUCTS.RSUPPLIERID = '7')";
		
		HashMap<String,String> sqlMap = new HashMap<String,String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME,mssql);
		sqlMap.put(DatabaseProduct.DB2.name(),oracle);
		sqlMap.put(DatabaseProduct.ORACLE.name(),oracle);
		sqlMap.put(DatabaseProduct.MSSQL.name(),mssql);
		sqlMap.put(DatabaseProduct.KINGBASE.name(),oracle);
		sqlMap.put(DatabaseProduct.SYBASE.name(),mssql);
		
		return SQL.select(sqlMap,null,"/demo/report/data");
	}
	
	/**
	 * 卡片报表
	 * @return
	 */
	public static Table cardQuery(){
		
		String oracle = "SELECT REMPLOYEEID , (RLASTNAME || RFIRSTNAME) AS EMPLOYEENAME , TO_CHAR(RBIRTHDATE, 'yyyy-mm-dd') AS RBIRTHDATE , TO_CHAR(RHIREDATE, 'yyyy-mm-dd') AS RHIREDATE ,RADDRESS ,RCITY , RREGION, RCOUNTRY , RNOTES FROM DEMO_REPORTEMPLOYEES";
		String mssql = "SELECT REMPLOYEEID , RLASTNAME + RFIRSTNAME AS EMPLOYEENAME , CONVERT(varchar(100), RBIRTHDATE, 23) AS RBIRTHDATE , CONVERT(varchar(100), RHIREDATE, 23) AS RHIREDATE ,RADDRESS ,RCITY , RREGION, RCOUNTRY , RNOTES FROM DEMO_REPORTEMPLOYEES";
		String mysql = "SELECT REMPLOYEEID , concat_ws('',RLASTNAME,RFIRSTNAME) AS EMPLOYEENAME , DATE_FORMAT(RBIRTHDATE, '%Y-%m-%d') AS RBIRTHDATE , DATE_FORMAT(RHIREDATE, '%Y-%m-%d') AS RHIREDATE ,RADDRESS ,RCITY , RREGION, RCOUNTRY , RNOTES FROM DEMO_REPORTEMPLOYEES";
		
		HashMap<String,String> sqlMap = new HashMap<String,String>();
		sqlMap.put(SQL.DEFAULT_DB_NAME,mssql);
		sqlMap.put(DatabaseProduct.DB2.name(),oracle);
		sqlMap.put(DatabaseProduct.ORACLE.name(),oracle);
		sqlMap.put(DatabaseProduct.MSSQL.name(),mssql);
		sqlMap.put(DatabaseProduct.DB2.name(),oracle);
		sqlMap.put(DatabaseProduct.KINGBASE.name(),oracle);
		sqlMap.put(DatabaseProduct.SYBASE.name(),mssql);
		sqlMap.put(DatabaseProduct.MYSQL.name(),mysql);
		
		return SQL.select(sqlMap,null,"/demo/report/data");
	}
	
}