import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Date;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.lang.StringUtils;
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.listener.Log4jListener;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.justep.deploy.HttpClientManager;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

public class InitEnvironment extends com.justep.ui.impl.JProcessorImpl {
	private String antLibDir;
	private String orgId;
	private String jsessionID;
	private String paasUrl = "http://console.console:8080/paas";
	private String projectId;
	private String justepHome;
	private String npmName;
	private String npmParentPath;

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String UI = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		antLibDir = modelPath + UI + "/system/deploy/common/antlib";
		jsessionID = request.getHeader("jsessionID");
		String action = request.getParameter("action");
		projectId = request.getParameter("projectId");
		npmName = request.getParameter("npmName");
		npmParentPath = request.getParameter("npmParentPath");
		orgId = request.getParameter("orgId");
		justepHome = JustepConfig.getHome();
		JSONObject result = new JSONObject();
		System.out.println("开始执行代码-----------------------------");
		if ("rewriteModel".equals(action)) {
			projectId = request.getParameter("resourceId");
			if (StringUtils.isBlank(projectId)) {
				result.put("success", false);
				result.put("msg", "resourceId不存在！");
			} else {
				try {
					System.out.println(justepHome + "开始调用方法-----------------------------");

					result = compressTarModel("compressTarModel");
				} catch (IllegalAccessException e) {
					e.printStackTrace();
					result.put("success", false);
					result.put("msg", e.getMessage());
				}
			}
		} else {
			if (StringUtils.isBlank(jsessionID)) {
				result.put("success", false);
				result.put("msg", "sessionID或orgId或projectId不存在！");
			} else {
				result = validationLoginState(paasUrl, jsessionID);
				if (result.getBooleanValue("success")) {
					try {
						if ("compressTarModel".equals(action)) {
							System.out.println("非    开始执行代码-----------------------------");
							result = compressTarModel(action);
						} else if ("compressTarSinglePage".equals(action)) {
							result = deployAppTemplate(request, action);
						}
					} catch (IllegalAccessException e) {
						e.printStackTrace();
						result.put("success", false);
						result.put("msg", e.getMessage());
					}
				}
			}
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		OutputStream output = response.getOutputStream();
		output.write(result.toJSONString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}

	/**
	 * 校验用户登录状态
	 * 
	 * @return
	 */
	private JSONObject validationLoginState(String paasUrl, String jsessionID) {
		JSONObject result = new JSONObject();
		HttpClientManager.setJsessionID(jsessionID);
		String response = HttpClientManager.sendGetRequest(paasUrl + "/sys/cache");
		if (response.trim().startsWith("{")) {
			result = JSON.parseObject(response);
			return result;
		} else {
			result.put("success", false);
			result.put("msg", response);
		}
		return result;
	}

	private JSONObject compressTarModel(String action) throws IllegalAccessException, IOException {
		System.out.println("方法开始执行-----------------------------");
		JSONObject result = new JSONObject();
		// 创建ant脚本
		File buildFile = createBuildXML();
		// 执行ant脚本
		execTask(buildFile, action);
		result = uploadFile(justepHome + "/model.tar.gz", "/v2/projects/deployFile/" + projectId + "?reinitialize=false");
		if (result == null) {
			System.out.println("result 为空值  直接跳出！");
			return result;
		}
		System.out.println("result 不为空值  继续执行！" + result.toString() + "----------------------------------");
		if (result.getBoolean("success")) {
			File file = new File(justepHome + "/data");// 获取data的目录文件
			System.out.println("查找fil文件：" + file + "----------------------------------");
			if (file.exists()) {
				execTask(buildFile, "compressTarData");// compressTarData与在build.xml中定义的对应targetName保持一致
				result = uploadFile(justepHome + "/data.tar.gz", "/v2/projects/deployFile/" + projectId + "?reinitialize=false");
			}
		}
		return result;
	}

	private JSONObject uploadFile(String srcFilepath, String url) {
		JSONObject result = new JSONObject();
		File srcFile = new File(srcFilepath);
		System.out.println(srcFilepath);
		PostMethod post = new PostMethod(paasUrl + url);
		System.out.println(url);
		HttpClient client = new HttpClient();
		try {
			String host = System.getProperties().getProperty("http.proxyHost");
			String port = System.getProperties().getProperty("http.proxyPort");
			if ((host != null) && (!"".equals(host))) {
				client.getHostConfiguration().setProxy(host, Integer.parseInt(port));
			}
			Part[] parts = { new FilePart(srcFile.getName(), srcFile) };
			post.setRequestEntity(new MultipartRequestEntity(parts, post.getParams()));
			post.addRequestHeader("Cookie", "JSESSIONID=" + jsessionID);
			client.getHttpConnectionManager().getParams().setConnectionTimeout(5000);
			int status = client.executeMethod(post);
			String response = InputStreamTOString(post.getResponseBodyAsStream(), "UTF-8");
			System.out.println(response);
			System.out.println(status);
			if (response.trim().startsWith("{")) {
				result = JSON.parseObject(response);
			}
			if (status != HttpStatus.SC_OK) {
				System.out.println("上传失败");
			} else {
				System.out.println("上传成功");
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("msg", e.getMessage());
		} catch (HttpException e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("msg", e.getMessage());
		} catch (IOException e) {
			e.printStackTrace();
			result.put("success", false);
			result.put("msg", e.getMessage());
		} finally {
			post.releaseConnection();
		}
		return result;
	}

	private String InputStreamTOString(InputStream in, String encoding) throws IOException {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[1024];
		int count = -1;
		while ((count = in.read(data, 0, 1024)) != -1)
			outStream.write(data, 0, count);

		data = null;
		return new String(outStream.toByteArray(), "UTF-8");
	}

	private void execTask(File buildFile, String action) throws IOException {
		Project p = new Project();
		Log4jListener downLogger = new Log4jListener();
		p.addBuildListener(downLogger);
		try {
			p.fireBuildStarted();
			p.init();
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			helper.parse(p, buildFile);
			p.executeTarget(action);
			p.fireBuildFinished(null);
		} catch (BuildException e) {
			p.fireBuildFinished(e);
			throw e;
		} finally {
			System.out.println("ok");
		}
	}

	public File createBuildXML() throws IOException, IllegalAccessException {
		File buildTmplFile = new File(antLibDir + "/build.xml");
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(buildTmplFile), "UTF-8"));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null)
			sb.append(str + "\r\n");
		String content = sb.toString();
		// 文件中的占位标识为@value@，和ant的文本替换一致
		content = content.replaceAll("@justepHome@", justepHome).replaceAll("@antLibDir@", antLibDir);
		File buildFile = File.createTempFile("x5app-build", ".xml");
		buildFile.deleteOnExit();
		FileOutputStream buildFileStream = new FileOutputStream(buildFile);
		buildFileStream.write(content.getBytes("UTF-8"));
		br.close();
		buildFileStream.close();
		return buildFile;
	}

	public File createDeployAppTemBuildXML(String filename) throws IOException, IllegalAccessException {
		File buildTmplFile = new File(antLibDir + "/build.xml");
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(buildTmplFile), "UTF-8"));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null)
			sb.append(str + "\r\n");
		String content = sb.toString();
		// 文件中的占位标识为@value@，和ant的文本替换一致
		int index = filename.lastIndexOf("/") + 1;
		content = content.replaceAll("@antLibDir@", antLibDir).replaceAll("@justepHome@", justepHome).replaceAll("@filePath@", filename.substring(0, index))
				.replaceAll("@filename@", filename.substring(index));
		File buildFile = File.createTempFile("x5app-build", ".xml");
		buildFile.deleteOnExit();
		FileOutputStream buildFileStream = new FileOutputStream(buildFile);
		buildFileStream.write(content.getBytes("UTF-8"));
		br.close();
		buildFileStream.close();
		return buildFile;
	}

	/**
	 * 发布单页模板
	 * 
	 * @return
	 * @throws IOException
	 * @throws IOException
	 * @throws IllegalAccessException
	 */
	private JSONObject deployAppTemplate(HttpServletRequest request, String action) throws IOException, IllegalAccessException {
		JSONObject result = new JSONObject();
		result.put("success", false);
		result.put("msg", "请选择对应的文件");
		String filename = request.getParameter("filePath");
		if (StringUtils.isBlank(filename))
			return result;

		File buildFile = createDeployAppTemBuildXML(filename.replace(".w", ".*"));
		execTask(buildFile, action);
		File file = new File(justepHome + "/model.tar.gz");
		file.renameTo(new File(justepHome + "/" + npmName));
		result = uploadFile(justepHome + "/" + npmName, "/catalog/file?npmPath=" + npmParentPath);
		return result;
	}

}