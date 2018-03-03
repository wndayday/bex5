import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;

import com.justep.biz.client.ActionUtils;
import com.justep.paas.Action;

public class Paas extends com.justep.ui.impl.JProcessorImpl {
	private static HashMap<String, Action> actions = new HashMap<String, Action>();
	private static HttpClient client = new HttpClient();

	static {
		actions.put("app", new Action("/service/app", "get", true));
		actions.put("apps", new Action("/service/apps", "post", false));
		actions.put("deployInfo", new Action("/service/res/info", "get", true));
		actions.put("serviceInfo", new Action("/service/res/conf", "get", false));
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String paasConsoleURL = request.getParameter("paasConsoleURL");
		if (paasConsoleURL == null || "".equals(paasConsoleURL)) {
			throw new ServletException("未指定PaaS服务地址");
		}

		String result;
		String action = request.getParameter("action");
		if ("login".equalsIgnoreCase(action)) {
			String token = request.getParameter("token");
			String paasSession = login(paasConsoleURL, token);
			result = "{\"flag\":\"" + (paasSession != null && !"".equals(paasSession)) + "\",\"paasSession\":\"" + paasSession + "\"}";
		} else {
			String paasSession = request.getParameter("paasSession");
			String paasAppID = request.getParameter("paasAppID");
			if (paasSession != null) {
				paasSession = URLEncoder.encode(paasSession, "UTF-8");
				String params;
				StringBuffer sb = new StringBuffer();
				BufferedReader reader = request.getReader();
				while ((params = reader.readLine()) != null)
					sb.append(params);
				params = sb.toString();
				Action ac = actions.get(action);
				if (ac != null) {
					result = sendRequest(ac.realURL(paasConsoleURL, paasAppID), ac.type, params, paasSession);
				} else {
					result = "{\"msg\":\"未支持的请求\":\"action\":\"" + action + "\"}";
				}
			} else {
				result = "{\"msg\":\"无效登录或已过期  " + " 请重新登入\":\"action\":\"" + action + "\"}";
			}
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

	private String login(String paasConsoleURL, String token) throws HttpException, IOException {
		// parser token
		String user = "18610312142";
		String password = "abcd1234";
		PostMethod method = new PostMethod(paasConsoleURL + "/login");
		StringRequestEntity entity = new StringRequestEntity("username=" + user + "&password=" + password, "application/x-www-form-urlencoded", "UTF-8");
		method.setRequestEntity(entity);
		client.executeMethod(method);
		String paasSession = null;
		Header[] cookies = method.getResponseHeaders("Set-Cookie");
		if (cookies != null) {
			for (int i = cookies.length - 1; i >= 0; i--) {
				Header cookie = cookies[i];
				if (cookie != null) {
					paasSession = cookie.getValue();
					if (paasSession.startsWith("user_session=")) {
						paasSession = paasSession.substring(paasSession.indexOf("=") + 1);
					}

					if (paasSession.contains(";")) {
						paasSession = paasSession.substring(0, paasSession.indexOf(";"));
					}

					if ((paasSession != null) && !paasSession.equals("")) {
						break;
					}
				}
			}
		}

		return paasSession;
	}

	public static String sendRequest(String url, String type, String params, String paasSession) throws HttpException, IOException {
		HttpMethod method;
		if ("post".equals(type)) {
			PostMethod post = new PostMethod(url);
			if (params != null && !"".equals(params)) {
				StringRequestEntity entity = new StringRequestEntity(params, "application/json", "UTF-8");
				post.setRequestEntity(entity);
			}
			method = post;
		} else {
			method = new GetMethod(url);
		}
		method.setRequestHeader("Accept-Encoding", "UTF-8");
		method.setRequestHeader("content-type", "application/json");
		if (paasSession != null) {
			method.addRequestHeader("Cookie", "user_session=" + paasSession);
		}
		client.executeMethod(method);
		return inputStreamToString(method.getResponseBodyAsStream(), "UTF-8");
	}

	private static String inputStreamToString(InputStream in, String encoding) throws IOException {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[1024];
		int count = -1;
		while ((count = in.read(data, 0, 1024)) != -1)
			outStream.write(data, 0, count);

		data = null;
		return new String(outStream.toByteArray(), "UTF-8");
	}

}
