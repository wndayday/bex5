import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;

public class Authenticat extends com.justep.ui.impl.JProcessorImpl {

	public void execute(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
		String sessionId = request.getParameter("sessionId");
		String consolePath = request.getParameter("paasURL");
		String message = "";
		String result = (sessionId != null && !"".endsWith(sessionId) && consolePath != null && !"".endsWith(consolePath)) ? sendGetRequest(consolePath + "/paas/sys/temps", sessionId) : "参数错误！";
		if (result.trim().startsWith("{")) {
			JSONObject jsonResult = JSON.parseObject(result);
			if (jsonResult.getBoolean("LOGIN_OUT") != null) {
				message = "{\"msg\":\"" + "登录超时！" + "\"}";
			} else {
				message = "{\"success\":\"" + "true" + "\"}";
			}
		} else {
			message = "{\"msg\":\"" + result + "\"}";
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		OutputStream output = response.getOutputStream();
		output.write(message.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

	public String sendGetRequest(String url, String jsessionID) {
		HttpClient client = genHttpClient();
		HttpMethodBase method = genHttpMethod(true, url, null, jsessionID);
		try {
			client.executeMethod(method);
			String response = Authenticat.InputStreamTOString(method.getResponseBodyAsStream(), "UTF-8");
			return response;
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
			return "请求出错：" + e1.getMessage();
		} catch (HttpException e1) {
			e1.printStackTrace();
			return "请求出错：" + e1.getMessage();
		} catch (IOException e1) {
			e1.printStackTrace();
			return "请求出错：" + e1.getMessage();
		}
	}

	private HttpClient genHttpClient() {
		String host = System.getProperties().getProperty("http.proxyHost");
		String port = System.getProperties().getProperty("http.proxyPort");
		HttpClient client = new HttpClient();
		if ((host != null) && (!"".equals(host))) {
			client.getHostConfiguration().setProxy(host, Integer.parseInt(port));
			return client;
		}
		return client;
	}

	private HttpMethodBase genHttpMethod(boolean isGet, String url, String params, String jsessionID) {
		HttpMethodBase method = null;
		method = isGet ? new GetMethod(url) : new PostMethod(url);
		method.setRequestHeader("Accept-Encoding", "UTF-8");
		if (!isGet) {
			method.setRequestHeader("content-type", "application/json");
			RequestEntity entity;
			try {
				entity = new StringRequestEntity(params, "application/json", "UTF-8");
				((PostMethod) method).setRequestEntity(entity);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		if (jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + jsessionID);
		}
		return method;
	}

	public static String InputStreamTOString(InputStream in, String encoding) throws IOException {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[1024];
		int count = -1;
		while ((count = in.read(data, 0, 1024)) != -1)
			outStream.write(data, 0, count);

		data = null;
		return new String(outStream.toByteArray(), "UTF-8");
	}

}
