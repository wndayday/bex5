import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Writer;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.Element;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionEngine;
import com.justep.biz.client.ActionUtils;
import com.justep.biz.client.Callback;
import com.justep.common.ServerConfig;
import com.justep.common.ShortUUID;
import com.justep.common.SystemUtils;
import com.justep.ui.JProcessor;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;
import com.justep.ui.util.PageUtils;

public class DeployResources implements JProcessor {
	public static final Logger logger = Logger.getLogger(DeployResources.class);

	public static Set<String> getProdHomes() {
		String homes = ServerConfig.getWebIDEProperty("prod-home");
		if (SystemUtils.isEmptyString(homes)) {
			throw new RuntimeException("请在%JUSTEP_HOME%/conf/server.xml中配置正式服务的路径（prod-home）");
		}
		
		Set<String> result = new HashSet<String>();
		for (String home : homes.split(",")) {
			if (SystemUtils.isNotEmptyString(home)) {
				result.add(home.trim());
			}
		}
		return result;
	}
	
	public static Set<String> getProdUIServers(){
		String servers = ServerConfig.getWebIDEProperty("prod-ui-server");
		if (SystemUtils.isEmptyString(servers)) {
			throw new RuntimeException("请在%JUSTEP_HOME%/conf/server.xml中配置prod-ui-server");
		}
		Set<String> result = new HashSet<String>();
		for (String server : servers.split(",")) {
			if (SystemUtils.isNotEmptyString(server)) {
				result.add(server.trim());
			}
		}
		return result;
	}

	public static boolean deleteDir(File dir) {
		if (dir.isDirectory()) {
			String[] children = dir.list();
			for (int i = 0; i < children.length; i++) {
				boolean success = deleteDir(new File(dir, children[i]));
				if (!success) {
					return false;
				}
			}
		}
		return dir.delete();
	}

	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		boolean flag = true;
		String message = "";
		try {
			Set<String> paths = getPaths(req);
			if (paths.size() == 0) {
				throw new RuntimeException("请选择需要发布的资源");
			}

			// 出于编译的需求，写成反射
			// IDEPermissions.check(paths, NetUtils.getBSessionID(req));
			Class<?> IDEPermissionsClass = Class.forName("com.justep.studio.permission.IDEPermissions");
			Method checkMethod = IDEPermissionsClass.getMethod("check", new Class[] { Set.class, String.class });
			checkMethod.invoke(null, new Object[] { paths, NetUtils.getBSessionID(req) });

			for (String prodHome : getProdHomes()) {
				for (String path : paths) {
					String url = "/model" + path;
					File source = new File(JustepConfig.getHome() + url);
					deleteDir(new File(prodHome + url));
					copy(source, url, prodHome);
				}
			}

			updateVersionAndCache(paths);
		} catch (Exception e) {
			logger.error(e.getMessage() + "", e);
			flag = false;
			message = e.getMessage();
		}

		JSONObject result = new JSONObject();
		result.put("flag", flag);
		if (SystemUtils.isNotEmptyString(message)) {
			result.put("message", message);
		}

		resp.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		resp.setCharacterEncoding("UTF-8");
		Writer writer = resp.getWriter();
		writer.write(result.toJSONString());
		writer.flush();
	}

	private void updateVersionAndCache(Set<String> paths) {
		String biz = "";
		String ui = "";
		Set<String> apps = getApps(paths);
		for (String app : apps) {
			if (app.startsWith("/BIZ/")) {
				if (SystemUtils.isNotEmptyString(biz))
					biz += ",";
				String item = app.substring(app.lastIndexOf("/"));
				biz += item;
			} else {
				updateAppVersion(app);
				if (SystemUtils.isNotEmptyString(ui))
					ui += ",";
				ui += app;
			}
		}

		if (SystemUtils.isEmptyString(biz) && SystemUtils.isEmptyString(ui))
			return;
		
		for (String url : getProdUIServers()){
			try {
				url += "/UI2/clearCache?ui=" + ui + "&biz=" + biz;
				ActionEngine.invokeActions(url, null, null, null, null, null, null, null, "get", new Callback() {
					public Object execute(InputStream arg0, String arg1, String arg2) {
						return null;
					}
				});
			} catch (Exception e) {
				logger.error(e.getMessage() + "", e);
			}
		}
	}

	private Set<String> getApps(Set<String> paths) {
		Set<String> apps = new HashSet<String>();
		for (String path : paths) {
			String app = "/";
			String[] items = path.split("/");
			for (int i = 0; (i < 3) && i < items.length; i++) {
				if (SystemUtils.isEmptyString(items[i]))
					continue;
				if (!app.endsWith("/"))
					app += "/";
				if ((i == 2) && items[i].endsWith("_X"))
					items[i] = items[i].substring(0, items[i].length() - 2);
				app += items[i];
			}
			if (!"/".equals(app)) {
				apps.add(app);
			}
		}

		return apps;
	}

	public static void main(String[] args) {
		Set<String> paths = new HashSet<String>();
		paths.add("/UI2/test/t");
		paths.add("/BIZ/OA/t");
		paths.add("/BIZ/HR/t");
		paths.add("/UI2/test_X/t");
		paths.add("/UI2");
		System.out.println(new DeployResources().getApps(paths));

		String app = "/BIZ/OA";
		System.out.println(app.substring(app.lastIndexOf("/")));
	}

	// 直接修改目标环境中的版本号
	private void updateAppVersion(String app) {
		for (String prodHome : getProdHomes()) {
			String path = prodHome + "/model" + app + "_X/config/application.xml";
			File file = new File(path);
			if (!file.exists() || !file.isFile()) {
				file = new File(prodHome + "/model" + app + "/config/application.xml");
			}

			String id = ShortUUID.generate();
			String content = "<app><version>" + id + "</version></app>";
			if (file.exists() && file.isFile()) {
				try {
					Document doc = PageUtils.readFile(file);
					Element root = doc.getRootElement();
					if (root != null) {
						Element version = root.element("version");
						if (version == null) {
							version = root.addElement("version");
						}
						version.setText(id);
						content = doc.asXML();
					}
				} catch (Exception e) {

				}

			}
			PageUtils.writeFile(content, file.getAbsolutePath());
		}
	}

	/*
	 * //直接生成到目标环境中 private void generateUIModifiedFile(String app){ String
	 * prodHome = getProdHome(); PageUtils.writeFile("", prodHome + "/model" +
	 * app + "/.modified"); }
	 * 
	 * //直接生成到目标环境中 private void generateBizModifiedFile(String app){ String
	 * prodHome = getProdHome(); String content =
	 * app.substring(app.lastIndexOf("/")); if
	 * (SystemUtils.isNotEmptyString(content)){ PageUtils.writeFile(content,
	 * prodHome + "/model" + app + "/.modified"); } }
	 */

	public static void copy(File source, String url, String prodHome) {
		if (source.exists()) {
			if (source.isFile()) {
				copyFile(source, new File(prodHome + url));
			} else {
				File dest = new File(prodHome + url);
				if (!dest.exists() || !dest.isDirectory()) {
					dest.mkdirs();
				}

				for (File child : source.listFiles()) {
					copy(child, url + "/" + child.getName(), prodHome);
				}
			}
		}
	}

	public static void copyFile(File source, File dest) {
		File parent = dest.getParentFile();
		if (!parent.exists() || !parent.isDirectory())
			parent.mkdirs();
		InputStream is = null;
		OutputStream os = null;
		try {
			is = new FileInputStream(source);
			os = new FileOutputStream(dest);
			NetUtils.copyStream(is, os);
		} catch (Exception e) {
			String msg = "将文件" + source.getAbsolutePath() + "复制到" + dest.getAbsolutePath() + "出错！";
			logger.error(msg, e);
			throw new RuntimeException(msg, e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {

				}
			}

			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
				}
			}
		}
	}

	public Set<String> getPaths(HttpServletRequest req) {
		ByteArrayOutputStream baos = null;
		try {
			InputStream inputStream = req.getInputStream();
			final int BUFFER_SIZE = 8 * 1024;
			byte[] buffer = new byte[BUFFER_SIZE];
			baos = new ByteArrayOutputStream();
			int bLen = 0;
			while ((bLen = inputStream.read(buffer)) > 0) {
				baos.write(buffer, 0, bLen);
			}
			String bodyData = new String(baos.toByteArray(), "UTF-8");
			JSONObject obj = JSONObject.parseObject(bodyData);
			JSONArray paths = obj.getJSONArray("paths");
			Set<String> result = new HashSet<String>();
			for (Object path : paths) {
				if (path != null)
					result.add("/" + path.toString());
			}
			return result;
		} catch (Exception e) {
			String msg = "资源发布出错！原因：获取需要发布的目录出错。";
			logger.error(msg, e);
			throw new RuntimeException(msg);
		} finally {
			try {
				baos.close();
			} catch (IOException e) {
			}
		}
	}

}
