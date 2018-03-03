import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.Element;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;
import com.justep.common.SystemUtils;
import com.justep.ui.JProcessor;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;
import com.justep.ui.util.PageUtils;


public  class CopyNewFun implements JProcessor {
	public static final Logger logger = Logger.getLogger(CopyNewFun.class);
	
	
	
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		boolean flag = true;
		String message = "";
		String appName = req.getParameter("appName");
		if (SystemUtils.isNotEmptyString(appName)){
			String process = req.getParameter("process");
			if (SystemUtils.isNotEmptyString(process)){
				try{
					String url = process;
					//获取流程所在的目录
					if (url.contains("/")){
						url = url.substring(0, url.lastIndexOf("/"));
					}
					for (String prodHome : DeployResources.getProdHomes()){
						String uiBase = prodHome + "/model/UI2" + url;
						String uiDestBase = JustepConfig.getHome() + "/model/UI2/" + appName;
						DeployResources.deleteDir(new File(uiDestBase));
						copy(new File(uiBase), url, uiDestBase, url, appName);
						
						String bizBase = prodHome + "/model/BIZ" + url;
						String bizDestBase = JustepConfig.getHome() + "/model/BIZ/" + appName;
						DeployResources.deleteDir(new File(bizDestBase));
						copy(new File(bizBase), url, bizDestBase, url, appName);
						break; //只复制其中一台机器的即可					
					}
				}catch(Exception e){
					flag = false;
					message = e.getMessage();
					logger.error("复制\"" + process + "\"功能到\"" + appName + "\"出错！", e);
				}
				
			}else{
				flag = false;
				message = "请选择需要复制的功能";
			}
		}else{
			flag = false;
			message = "请指复制后功能的存储目录";
		}
			
		
		JSONObject result = new JSONObject();
		result.put("flag", flag);
		if (SystemUtils.isNotEmptyString(message)){
			result.put("message", message);
		}
		
		resp.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		resp.setCharacterEncoding("UTF-8");
		Writer writer = resp.getWriter();
		writer.write(result.toJSONString());
		writer.flush();
	}
	
	public static void copy(File source, String url, String destHome, String fun, String destApp){
		if (source.exists()){
			if (source.isFile()){
				if (url.endsWith(".w") || url.endsWith(".html")){
					copyWindow(source, new File(destHome + url), fun, destApp);
				}else{
					copyFile(source, new File(destHome + url));	
				}
				
			}else{
				File dest = new File(destHome + url);
				if (!dest.exists() || !dest.isDirectory()){
					dest.mkdirs();
				}
				
				for (File child : source.listFiles()){
					if (child.getName().equals(".cache") || child.getName().equals(".relation"))
						continue;
					copy(child, url + "/" + child.getName(), destHome, fun, destApp);
				}
			}
		}
	}
	
	public static void copyWindow(File source, File dest, String fun, String destApp){
		try{
			//重写window上的extends属性, 如果是$UI/[fun]/开头的，重写成相对路径
			Document doc = PageUtils.readFile(source);
			Element root = doc.getRootElement();
			if (root!= null){
				Attribute extendsAttr = root.attribute("extends");
				if (extendsAttr != null){
					String value = extendsAttr.getText().trim();
					String prefix = "$UI" +  fun + "/";
					if (value.startsWith(prefix)){
						value = "$UI/" + destApp +  fun + "/" + value.substring(prefix.length());
						extendsAttr.setValue(value);
					}
				}
			}
			
			PageUtils.writeFile(doc, dest.getAbsolutePath(), true);
		}catch(Exception e){
			copyFile(source, dest);
		}
	}
	
	public static void copyFile(File source, File dest){
		File parent = dest.getParentFile();
		if (!parent.exists() || !parent.isDirectory()) parent.mkdirs();
		InputStream is = null;
		OutputStream os = null;
		try{
			is = new FileInputStream(source);
			os = new FileOutputStream(dest);
			NetUtils.copyStream(is, os);
		} catch (Exception e) {
			String msg = "将文件" + source.getAbsolutePath() + "复制到" + dest.getAbsolutePath() + "出错！";
			logger.error(msg, e);
			throw new RuntimeException(msg, e);
		}finally{
			if ( is!= null){
				try {
					is.close();
				} catch (IOException e) {
					
				}
			}
				
			if (os != null){
				try {
					os.close();
				} catch (IOException e) {
				}
			}
		}
	}

	
	
}
