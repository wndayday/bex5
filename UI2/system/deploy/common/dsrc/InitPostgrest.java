import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.TimeUnit;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.DocumentException;

import com.alibaba.fastjson.JSONObject;
import com.justep.deploy.HttpClientManager;

public class InitPostgrest extends com.justep.ui.impl.JProcessorImpl {
	private static final Logger logger = Logger.getLogger(InitEnvironment.class);

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		String schemaId = request.getParameter("postgrest_schemaid");
		if(StringUtils.isBlank(schemaId))
			throw new NullPointerException("schemaId不存在！");
		try {
			initPostgres(schemaId);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}

	private JSONObject initPostgres(String schemaId) throws IllegalAccessException, IOException, DocumentException {
		String dbUser = "";
		JSONObject result = new JSONObject();
		result.put("success", true);
		result.put("msg", "操作成功！");
		if (StringUtils.isBlank(schemaId)) {
			result.put("success", false);
			result.put("msg", "schemaID不存在！");
		}
		String pgSqlUrl = getPgSqlUrl(schemaId);
		if (StringUtils.isBlank(pgSqlUrl) || !pgSqlUrl.startsWith("jdbc:postgresql")) {
			result.put("success", false);
			result.put("msg", "获取数据源失败！");
			return result;
		}
		if (pgSqlUrl.indexOf("?") != -1) {
			String[] userAndPassword = pgSqlUrl.substring(pgSqlUrl.indexOf("?") + 1).split("&");
			dbUser = userAndPassword[0].split("=")[1];
		}
		String restUrl = pgSqlUrl.replaceFirst("jdbc:", "");
		logger.info(restUrl.substring(0, restUrl.indexOf("&schema")) + " --port 3000 --schema public --anonymous " + dbUser + " --pool 100");
		Runtime runtime = Runtime.getRuntime();
		runtime.exec("postgrest " + restUrl.substring(0, restUrl.indexOf("&schema")) + " --port 3000 --schema " + dbUser + " --anonymous " + dbUser + " --pool 100");
		return result;
	}
	
	/**
	 * 获取pgsql数据源字符串
	 * 
	 * @param schemaID
	 * @return
	 */
	private String getPgSqlUrl(String schemaId) {
		String pgSqlUrl = "";
		if (StringUtils.isNotBlank(schemaId))
			pgSqlUrl = HttpClientManager.sendGetRequest("http://rds.postgres:33333/schema/" + schemaId + "/connectionString");
		return pgSqlUrl;
	}
}