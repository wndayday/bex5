import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;

import com.justep.biz.client.ActionUtils;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;

public class Download extends com.justep.ui.impl.JProcessorImpl {

	private void downloadFile(HttpServletRequest request, HttpServletResponse response, String appPath, String appName, String type) throws IOException {
		String fileNameKey = "filename";
		UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
		if (Browser.FIREFOX.equals(ua.getBrowser().getGroup())) {
			fileNameKey = "filename*";
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.BINARY_CONTENT_TYPE);
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Content-Type", ActionUtils.BINARY_CONTENT_TYPE);
		response.setHeader("Content-disposition", "attachment;" + fileNameKey + "=\"" + URLEncoder.encode(appName, "UTF-8") + "." + type + "\"");
		response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");

		try {
			FileInputStream inputStream = new FileInputStream(appPath);
			OutputStream out = response.getOutputStream();
			try {
				byte[] bt = new byte[1024];
				int i = -1;
				while ((i = inputStream.read(bt)) != -1) {
					out.write(bt, 0, i);
				}
				out.flush();
			} finally {
				out.close();
				inputStream.close();
			}
		} catch (Exception E) {
			// 忽略，UC之类下载会发两次请求，第一次会被终止导致ClientAbortException异常
		}
	}

	private void install(HttpServletRequest request, HttpServletResponse response, String ipaUrl, String appName, String type) throws IOException {
		String packageName = request.getParameter("packageName");
		String UI = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String uiDir = modelPath + UI + "/system/deploy/package";

		HashMap<String, String> parameter = new HashMap<String, String>();
		parameter.put("ipaUrl", ipaUrl.replaceAll("&amp;", "&"));
		parameter.put("package", packageName);
		parameter.put("appName", appName);
		String content = "";
		try {
			content = createPlist(uiDir + "/plist.xml", parameter);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			content = "{}";
		}
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-Type", "text/plain");
		OutputStream output = response.getOutputStream();
		output.write(content.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String nativeDir = modelPath + "Native";
		String projectName = request.getParameter("projectName");
		String appName = request.getParameter("appName");
		String platform = request.getParameter("platform");
		boolean webIDE = "webideIOS".equals(platform);
		if ((projectName == null) || "".equals(projectName) || (appName == null) || "".equals(appName) || (platform == null) || "".equals(platform))
			throw new ServletException("下载参数不正确！");

		String type = "android".equals(platform) ? "apk" : "ipa";
		String appPath = nativeDir + "/" + projectName + "/dist/app." + type;

		if ((new File(appPath)).exists()) {
			if (webIDE) {
				String ipaUrl = request.getParameter("ipaUrl");
				ipaUrl = ipaUrl.indexOf("download.j") > -1 ? (ipaUrl + "?platform=ios&projectName=" + projectName + "&appName=" + appName) : ipaUrl;
				install(request, response, ipaUrl, appName, "ipa");
			} else {
				downloadFile(request, response, appPath, appName, type);
			}
			return;
		}
	}

	public static String createPlist(String plistXmlFile, HashMap<String, String> paramter) throws IOException, IllegalAccessException {
		File plistFile = new File(plistXmlFile);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(plistFile), "UTF-8"));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null)
			sb.append(str + "\r\n");
		String content = sb.toString();

		for (Entry<String, String> entry : paramter.entrySet()) {
			content = content.replace("@" + entry.getKey() + "@", entry.getValue() != null ? StringEscapeUtils.escapeXml(entry.getValue()) : "");
		}
		br.close();
		return content;
	}
}
