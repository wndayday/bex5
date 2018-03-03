package com.justep.deploy;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;


public class HttpClientManager {
	protected static String jsessionID;
	static HttpClient client = new HttpClient();
	static {
		client.getHttpConnectionManager().getParams().setSoTimeout(6000);// 登录请求超时时间
	}

	public static void setJsessionID(String sessionID) {
		HttpClientManager.jsessionID = sessionID;
	}

	public static String sendRequest(String url, String params) {
		PostMethod method = new PostMethod(url);
		method.setRequestHeader("Accept-Encoding", "UTF-8");
		method.setRequestHeader("content-type", "application/json");
		if (HttpClientManager.jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + HttpClientManager.jsessionID);
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
			if (HttpClientManager.jsessionID == null) {
				Header[] cookies = method.getResponseHeaders("Set-Cookie");
				if (cookies != null) {
					for (int i = cookies.length - 1; i >= 0; i--) {
						Header cookie = cookies[i];
						if (cookie != null) {
							HttpClientManager.jsessionID = cookie.getValue();
							if (HttpClientManager.jsessionID.startsWith("JSESSIONID=")) {
								HttpClientManager.jsessionID = HttpClientManager.jsessionID.substring(HttpClientManager.jsessionID.indexOf("=") + 1);
							}

							if (HttpClientManager.jsessionID.contains(";")) {
								HttpClientManager.jsessionID = HttpClientManager.jsessionID.substring(0, HttpClientManager.jsessionID.indexOf(";"));
							}

							if ((HttpClientManager.jsessionID != null) && !HttpClientManager.jsessionID.equals("")) {
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
		if (HttpClientManager.jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + HttpClientManager.jsessionID);
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

			if (url.indexOf("productDeployer") != -1) {
				client.getHttpConnectionManager().getParams().setSoTimeout(6000000);// 创建vip项目等待超时设置
				// client..setTimeout(6000000)
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

	public static boolean downloadRequest(String url, String downloadFile) {
		GetMethod method = new GetMethod(url);
		method.setRequestHeader("Accept-Encoding", "UTF-8");
		if (HttpClientManager.jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + HttpClientManager.jsessionID);
		}
		if (jsessionID != null) {
			method.addRequestHeader("Cookie", "JSESSIONID=" + jsessionID);
		}

		try {
			String host = System.getProperties().getProperty("http.proxyHost");
			String port = System.getProperties().getProperty("http.proxyPort");
			if ((host != null) && (!"".equals(host))) {
				client.getHostConfiguration().setProxy(host, Integer.parseInt(port));
			}

			client.executeMethod(method);
			return InputStream2File(method.getResponseBodyAsStream(), downloadFile);
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (HttpException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		return false;
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

	public static boolean InputStream2File(InputStream in, String distFile) throws IOException {
		File file = new File(distFile);
		FileOutputStream fos = new FileOutputStream(file);
		if (!file.exists()) {
			file.createNewFile();
		}
		byte[] b = new byte[1024];
		while ((in.read(b)) != -1) {
			fos.write(b);
		}
		fos.flush();
		fos.close();
		in.close();
		return true;
	}
}
