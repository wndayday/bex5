import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;
import com.justep.deploy.HttpClientManager;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

public class XPaasInfo extends com.justep.ui.impl.JProcessorImpl {
	private static String URL_PAAS_CONSOLE = "http://console.console:8080/paas";
	private static String paasToken = null;
	private static String paasSession = null;
	private static final String PAAS_TYPE_PROJECT = "0";

	private static Map<String, String> map = System.getenv();

	static {
		Iterator<Entry<String, String>> it = map.entrySet().iterator();
		while (it.hasNext()) {
			Entry<String, String> entry = (Entry<String, String>) it.next();
			if ("console_url".equalsIgnoreCase(entry.getKey())) {
				URL_PAAS_CONSOLE = entry.getValue() + "/paas";
			}
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result = "";
		String option = request.getParameter("option");
		String token = request.getParameter("token");
		String sessionID = request.getParameter("sessionID");
		if ("login".equalsIgnoreCase(option)) {
			paasToken = login(token);
			result = "{\"paasToken\":\"" + paasToken + "\"}";
			System.out.println(result);
		}
		if ("set".equalsIgnoreCase(option)) {
			String paasConsoleURL = request.getParameter("paasConsoleURL");
			URL_PAAS_CONSOLE = (null == paasConsoleURL || "".endsWith(paasConsoleURL)) ? URL_PAAS_CONSOLE : paasConsoleURL + "/paas";
			result = "{\"msg\":\"" + "set ok" + "\"}";
		}
		if ("setSessionID".equalsIgnoreCase(option)) {
			paasSession = checkSession(sessionID);
			result = "{\"sessionID\":\"" + (paasSession == null ? "" : paasSession) + "\"}";
		}
		if (paasToken != null || paasSession != null) {
			if ("loadProject".equals(option)) {
				result = projectInfo(request);
			} else if ("productDeployer".equals(option)) {
				result = productDeployer(request);
			} else if ("loadApp".equals(option)) {
				result = appCloudInfo(request);
			} else if ("templateInfo".equalsIgnoreCase(option)) {
				result = templateInfo();
			} else if ("state".equalsIgnoreCase(option)) {
				result = checkStat(request);
			} else if ("checkApp".equalsIgnoreCase(option)) {
				result = checkApp(request);
			} else if ("getPacker".equalsIgnoreCase(option)) {
				result = getPacker(request);
			} else if ("getIOSDefaultBundle".equalsIgnoreCase(option)) {
				result = "{\"success\":true,\"packageName\":\"" + "com.justep.cloudx5" + "\",\"iosDevloperPassword\":\"" + "123456" + "\"}";
			}
			if ("getIOSDefaultCer".equalsIgnoreCase(option)) {
				String appId = request.getParameter("appId");
				String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
				String nativeDir = modelPath + "Native";
				String p12File = "ios.distribution.p12";
				String mobileprovisionFile = "ios.distribution.mobileprovision";

				File p12 = new File(nativeDir + "/.workspace/" + appId + "/upload/" + p12File);
				File mobileprovision = new File(nativeDir + "/.workspace/" + appId + "/upload/" + mobileprovisionFile);
				if (!p12.exists()) {
					p12.getParentFile().mkdirs();
					p12.createNewFile();
				}
				if (!mobileprovision.exists()) {
					mobileprovision.getParentFile().mkdirs();
					mobileprovision.createNewFile();
				}
				String dir = nativeDir + "/.workspace/" + appId + "/upload";
				String downloadFile = dir + "/iosCer.zip";
				boolean success = HttpClientManager.downloadRequest(this.urlIosCer(), downloadFile);
				if (success) {
					upzipFile(downloadFile, dir);
				} else {
					result = "{\"success\":false}";
				}
				result = "{\"success\":true,\"packageName\":\"" + "com.justep.cloudx5" + "\",\"iosDistributionPassword\":\"" + "123456" + "\"}";
			}

		} else {
			if ("set".equalsIgnoreCase(option)) {
				System.out.println("console: " + URL_PAAS_CONSOLE);
			} else {
				result = "{\"msg\":\"无效登录或已过期  " + " 请重新登入\":\"option\":\"" + option + "\"}";
				System.out.println(result);
			}
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

	private String checkStat(HttpServletRequest request) {
		return HttpClientManager.sendGetRequest(URL_PAAS_CONSOLE + "/v2/apps/service/state/" + request.getParameter("serviceID"));
	}

	private String templateInfo() {
		return HttpClientManager.sendGetRequest(urlGetTemplate());
	}

	private String checkApp(HttpServletRequest request) {
		try {
			String url = request.getParameter("path");
			URL serverUrl = new URL(url);
			HttpURLConnection urlcon = (HttpURLConnection) serverUrl.openConnection();
			if (urlcon.getResponseCode() == HttpURLConnection.HTTP_OK) {
				return "{\"msg\":\"文件存在 " + "\",\"success\":\"true\"}";
			} else {
				return "{\"msg\":" + "\"请重新部署\",\"success\":\"false\"}";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "{\"msg\":\"检查失败！  " + "\",\"success\":\"false\"}";
		}
	}

	private String getPacker(HttpServletRequest request) {
		String result = HttpClientManager.sendGetRequest(urlPacker());
		return result;
	}

	private String appCloudInfo(HttpServletRequest request) {
		String projectId = request.getParameter("projectId");
		String paasServiceID = request.getParameter("paasServiceID");
		if (projectId != null && !"".equals(projectId)) {
			return HttpClientManager.sendGetRequest(urlGetApp(projectId));
		} else {
			return HttpClientManager.sendGetRequest(urlApp(paasServiceID));
		}
	}

	private String projectInfo(HttpServletRequest request) {
		String result = "";
		String serviceID = request.getParameter("serviceID");
		String paasType = request.getParameter("paasType");
		String title = request.getParameter("title");
		if (serviceID != null && !"".equals(serviceID)) {
			if (paasType != null && !"".equals(paasType) && paasType.equals(PAAS_TYPE_PROJECT)) {
				result = HttpClientManager.sendGetRequest(URL_PAAS_CONSOLE + "/projects/" + serviceID);
			} else {
				result = HttpClientManager.sendGetRequest(URL_PAAS_CONSOLE + "/v2/project/info/" + serviceID);
			}
		} else {
			result = HttpClientManager.sendGetRequest(URL_PAAS_CONSOLE + "/projects/app?" + (((title != null) && !"".equals(title)) ? "title=" + title : ""));
		}
		return result;
	}

	private String productDeployer(HttpServletRequest request) {

		String name = request.getParameter("name");

		return HttpClientManager.sendGetRequest(URL_PAAS_CONSOLE + "/project/productDeployer?name=" + name);
	}

	private String urlPacker() {
		return URL_PAAS_CONSOLE + "/project/packer";
	}

	private String urlApp(String id) {
		return URL_PAAS_CONSOLE + "/v2/apps/appVipDeploy/" + id;
	}

	private String urlGetApp(String projectId) {
		return URL_PAAS_CONSOLE + "/v2/apps?projectId=" + projectId + "&type=1";
	}

	private String urlGetTemplate() {
		return URL_PAAS_CONSOLE + "/sys/temps";
	}

	private String urlIosCer() {
		return URL_PAAS_CONSOLE + "/catalog/certificate/download";
	}

	public String checkSession(String sessionId) {
		HttpClientManager.setJsessionID(sessionId);
		String result = HttpClientManager.sendGetRequest(urlGetTemplate());
		if (result.trim().startsWith("{")) {
			JSONObject jsonResult = JSON.parseObject(result);
			if (jsonResult.getBoolean("LOGIN_OUT") != null) {
				return null;
			} else {
				return sessionId;
			}
		} else {
			return null;
		}
	}

	public String login(String token) {
		JSONObject jsonParams = new JSONObject();
		jsonParams.put("token", token);
		String urlLogin = URL_PAAS_CONSOLE + "/login";
		String result = HttpClientManager.sendRequest(urlLogin, jsonParams.toJSONString());
		if (result.trim().startsWith("{")) {
			JSONObject jsonResult = JSON.parseObject(result);
			if (jsonResult.getBoolean("success")) {
				return jsonResult.getString("object");
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	public static List<File> upzipFile(String zipPath, String descDir) {
		File zipFile = new File(zipPath);
		if (zipFile.exists()) {
			return upzipFile(zipFile, descDir);
		} else {
			return null;
		}
	}

	private static byte[] _byte = new byte[1024];

	@SuppressWarnings("rawtypes")
	public static List<File> upzipFile(File zipFile, String descDir) {
		List<File> _list = new ArrayList<File>();
		try {
			ZipFile _zipFile = new ZipFile(zipFile);
			for (Enumeration entries = _zipFile.entries(); entries.hasMoreElements();) {
				ZipEntry entry = (ZipEntry) entries.nextElement();
				File _file = new File(descDir + File.separator + entry.getName());
				if (entry.isDirectory()) {
					_file.mkdirs();
				} else {
					File _parent = _file.getParentFile();
					if (!_parent.exists()) {
						_parent.mkdirs();
					}
					InputStream _in = _zipFile.getInputStream(entry);
					OutputStream _out = new FileOutputStream(_file);
					int len = 0;
					while ((len = _in.read(_byte)) > 0) {
						_out.write(_byte, 0, len);
					}
					_in.close();
					_out.flush();
					_out.close();
					_list.add(_file);
				}
			}
			_zipFile.close();
		} catch (IOException e) {
		}
		return _list;
	}

}
