package com.justep.deploy;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;

import com.alibaba.fastjson.JSONObject;

public class HttpClientM {
	protected static String jsessionID;
	static HttpClient client = new HttpClient();
	static {
		// client.getHttpConnectionManager().getParams().setSoTimeout(6000);//
		// 登录请求超时时间
	}

	public static void setJsessionID(String sessionID) {
		HttpClientM.jsessionID = sessionID;
	}

	public static String sendRequest(String url, String params) {
		PostMethod method = new PostMethod(url);
		method.setRequestHeader("Accept-Encoding", "UTF-8");
		method.setRequestHeader("content-type", "application/json");
		if (HttpClientM.jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + HttpClientM.jsessionID);
		}
		RequestEntity entity;
		String msg = "";
		try {
			entity = new StringRequestEntity(params, "application/json", "UTF-8");
			method.setRequestEntity(entity);
			String host = System.getProperties().getProperty("http.proxyHost");
			String port = System.getProperties().getProperty("http.proxyPort");
			if ((host != null) && (!"".equals(host))) {
				client.getHostConfiguration().setProxy(host, Integer.parseInt(port));
			}
			client.executeMethod(method);
			if (HttpClientM.jsessionID == null) {
				Header[] cookies = method.getResponseHeaders("Set-Cookie");
				if (cookies != null) {
					for (int i = cookies.length - 1; i >= 0; i--) {
						Header cookie = cookies[i];
						if (cookie != null) {
							HttpClientM.jsessionID = cookie.getValue();
							if (HttpClientM.jsessionID.startsWith("JSESSIONID=")) {
								HttpClientM.jsessionID = HttpClientM.jsessionID.substring(HttpClientM.jsessionID.indexOf("=") + 1);
							}

							if (HttpClientM.jsessionID.contains(";")) {
								HttpClientM.jsessionID = HttpClientM.jsessionID.substring(0, HttpClientM.jsessionID.indexOf(";"));
							}

							if ((HttpClientM.jsessionID != null) && !HttpClientM.jsessionID.equals("")) {
								break;
							}
						}
					}
				}

			}
			String response = InputStreamTOString(method.getResponseBodyAsStream(), "UTF-8");
			return response;
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
			msg = e1.getMessage();
		} catch (HttpException e1) {
			e1.printStackTrace();
			msg = e1.getMessage();
		} catch (IOException e1) {
			e1.printStackTrace();
			msg = e1.getMessage();
		}
		return "请求出错：" + msg;
	}

	public static String sendGetRequest(String url) {
		GetMethod method = new GetMethod(url);
		method.setRequestHeader("Accept-Encoding", "UTF-8");
		if (HttpClientM.jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + HttpClientM.jsessionID);
		}
		if (jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + jsessionID);
		}

		String msg = "";
		try {
			String host = System.getProperties().getProperty("http.proxyHost");
			String port = System.getProperties().getProperty("http.proxyPort");
			if ((host != null) && (!"".equals(host))) {
				client.getHostConfiguration().setProxy(host, Integer.parseInt(port));
			}
			client.executeMethod(method);
			String response;
			response = InputStreamTOString(method.getResponseBodyAsStream(), "UTF-8");
			return response;
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
			msg = e1.getMessage();
		} catch (HttpException e1) {
			e1.printStackTrace();
			msg = e1.getMessage();
		} catch (IOException e1) {
			e1.printStackTrace();
			msg = e1.getMessage();
		}
		return "请求出错：" + msg;

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

	public static void main(String[] args) throws Exception {
		System.out.println("开始打包应用：" + args[1]);
		String uiserver = args[0];

		String uiServer = "http://" + uiserver + "/x5/UI2/system/deploy/";

		String getURL_appinfo_dangdang = "app/getAppConfig.j?projectName=" + URLEncoder.encode(args[1], "utf-8");
		String postUrl_app = "app/createApp.j?edit=true";

		String postUrl_pack = "package/pack.j";
		String postUrl_checkPack = "package/checkPacking.j";

		String me = HttpClientM.sendGetRequest(uiServer + getURL_appinfo_dangdang);// app
																					// info

		JSONObject config = JSONObject.parseObject(me);
		// config = addVersion(config); // veriosn +1

		me = HttpClientM.sendRequest(uiServer + postUrl_app, config.toJSONString());// app
																					// info
																					// update

		me = HttpClientM.sendGetRequest(uiServer + getURL_appinfo_dangdang);// app
																			// info
		config.put("platform", "ios,android");
		config.put("proxyBuilderServer", "http://mac.justep.com:9999/app-builder");
		config.put("appBuilderServer", "http://mac.justep.com:9999/app-builder");
		config.put("useProxyBuilderServer", true);

		System.out.println(me);
		me = HttpClientM.sendRequest(uiServer + postUrl_pack, config.toJSONString()); // pack
		System.out.println(me);
		if (me.indexOf("正在生成app包") > -1 && me.indexOf("\"flag\":true") > -1) {
			System.out.println("开始干活了。。。");
			int loop = 1800 / 2;
			while (loop > 0) {
				loop--;
				Thread.sleep(2000);
				me = HttpClientM.sendRequest(uiServer + postUrl_checkPack, "");
				if (me.indexOf("{") == 0 && me.indexOf("\"code\":\"BUSY\"") < 0 && me.indexOf("\"code\":\"ERROR\"") < 0) {
					System.out.println("OK:" + me);
					System.out.println("齐活了！");
					break;
				} else {
					if (me.indexOf("{") < 0 || me.indexOf("\"code\":\"ERROR\"") > 0) {
						System.out.println("ERROR:" + me);
						System.out.println("服务端有误！请到“" + args[1] + "/log”下查看日志");
						break;
					}
					if ((600 - loop) % 5 == 0)
						System.out.println(600 - loop + ":等待服务端齐活...");
				}
			}

		} else {
			System.out.println("服务器忙，没干活！");
		}

	}

	public static JSONObject addVersion(JSONObject config) {
		String version = config.getString("version");
		System.out.println(version);
		String[] ver = version.split("\\.");
		String newVersion = "";

		for (int i = 0; i < ver.length; i++) {

			if (i == 0) {
				newVersion = ver[0];
			}
			if (i == ver.length - 1) {
				int subVer = Integer.parseInt(ver[ver.length - 1]) + 1;
				newVersion = newVersion + "." + subVer;
			}
			if (i > 0 && i < ver.length - 1) {
				newVersion = newVersion + "." + ver[i];
			}

		}
		config.put("version", newVersion);
		System.out.println(newVersion);
		return config;
	}
}
