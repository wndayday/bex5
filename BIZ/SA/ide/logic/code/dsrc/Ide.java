import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONArray;
import com.justep.common.ServerConfig;
import com.justep.common.SystemUtils;
import com.justep.filesystem.FileSystem;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.security.decrypt.Decrypt;
import com.justep.system.context.ContextHelper;
import com.justep.util.JustepConfig;


public class Ide {
	private static final String[] SYS_PATHS = new String[]{"bin", "SA", "system", "portal", "portal2", "demo"};
	
	private static List<String> getIDEPermissions(){
		List<String> result = new ArrayList<String>();
		List<Object> items = ContextHelper.getOperator().getSemanticPermission("ide.path.perm", null);
		for (Object item : items){
			if (item != null){
				String value = item.toString();
				if (SystemUtils.isNotEmptyString(value)){
					result.add(value);
				}
			}
		}
		return result;
	}
	
	private static boolean inIDEPermission(String path){
		if ("true".equals(ServerConfig.getWebIDEProperty("check-permission"))){
			List<String> items = getIDEPermissions();
			return items.contains(path);
		}
		return true;
	}
	
	public static JSONArray queryApp(){
		JSONArray result = new JSONArray();
		List<String> dirs = FileSystemWrapper.instance().getDirs("/");
		for (String dir : dirs){
			dir = dir.replaceAll("\\\\", "/");
			String path = dir.contains("/") ? dir.substring(dir.lastIndexOf("/")+1) : dir;
			if (isSys(path) || !inIDEPermission(path)){
				continue;
			}
			result.add(path);
		}
		
		return result;
		
	}
	
	private static boolean isSys(String path){
		for (String item : SYS_PATHS){
			if (item.equals(path)){
				return true;
			}
		}
		return false;
	}

	public static void deleteApp(String path){
		if (SystemUtils.isEmptyString(path) || isSys(path)){
			throw new RuntimeException("系统应用不允许删除");
		}
		
		if (!inIDEPermission(path)){
			throw new RuntimeException("没有应用" + path + "的操作权限");
		}

		try {
			Logger.getLogger(Ide.class).info("卸载模块 /" + path + " ....");
			Class<?> c = Decrypt.instance().getClass("com.justep.model.impl.ModelLoader");
			Method m = c.getMethod("unLoadModel", new Class[]{String.class});
			m.invoke(null, new Object[]{"/"+path});
			Logger.getLogger(Ide.class).info("卸载模块 /" + path + " 结束....");
		} catch (Exception e) {
		} 
		

		String home = JustepConfig.getHome();
		String[] items = new String[]{
				home + "/model/UI2/" + path,
				home + "/model/UI2/" + path + FileSystem.EXT,
				home + "/model/BIZ/" + path,
				home + "/model/BIZ/" + path + FileSystem.EXT
		};
		for (String item : items){
			if (!deleteDir(new File(item))){
				throw new RuntimeException("删除应用" + path + "失败!");	
			}
		}
	}
	
	private static boolean deleteDir(File dir) {
		if (!dir.exists()) return true;
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
	

	public static void createApp(String path, String datasource){
		checkPath(path);
		if (SystemUtils.isEmptyString(datasource)){
			throw new RuntimeException("请指定项目的数据源名称");
		}
		try{
			createBIZ(path, datasource);
			createUI(path);
		}catch(Exception e){
			deleteApp(path);
			throw new RuntimeException(e.getMessage()+"", e);
		}
	}
	
	private static void createBIZ(String path, String datasource){
		String home = JustepConfig.getHome();
		String app = home + "/model/BIZ/" + path;
		String content = "" +
				"<model xmlns=\"http://www.justep.com/model\">" +
				"<config name=\"dataSource\" value=\"java:comp/env/" + datasource.trim() + "\"/></model>";
		writeFile(content, app + "/db.config.m");
	}
	
	private static void createUI(String path){
		String home = JustepConfig.getHome();
		String app = home + "/model/UI2/" + path;
		String config = app + "/config";
		String content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><root></root>";
		writeFile(content, config + "/" + path + ".function.xml");
		writeFile(content, config + "/" + path + ".widget.xml");
		
		String appication = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><app><version>1.0</version></app>";
		writeFile(appication, config + "/application.xml");
	}
	
	private static boolean writeFile(String content, String filepath) {
		FileOutputStream fos = null;
		OutputStreamWriter osw = null;
		 try { 
				File file = new File(filepath).getCanonicalFile();
				if (!file.getParentFile().exists()) {
					file.getParentFile().mkdirs();
				}

				fos = new FileOutputStream(filepath); 
		        osw = new OutputStreamWriter(fos, "UTF-8"); 
		        osw.write(content); 
		        osw.flush();
		        return true;
		}catch (IOException e) {
			throw new RuntimeException("生成文件" + filepath + "出错");
		}finally{
			if (osw!=null){
				try {
					osw.close();
				} catch (IOException e) {
				}
			}
			if (fos!=null){
				try {
					fos.close();
				} catch (IOException e) {
				}
			}
		}
	}
	
	
	
	private static void checkPath(String path){
		if (!isIdentifier(path)){
			throw new RuntimeException("非法的应用名! 应用名规则: 必须以字母开头, 只能包含字母和数字式. ");
		}
		
		if (isSys(path)){
			throw new RuntimeException("非法的应用名! \"" + path + "\"为系统关键字, 不允许使用");
		}
		
		if (path.endsWith(FileSystem.EXT)){
			throw new RuntimeException("非法的应用名! 应用名不允许以" + FileSystem.EXT + "结尾");
		}
		
		if (!inIDEPermission(path)){
			throw new RuntimeException("没有应用" + path + "的操作权限");
		}
		
		String home = JustepConfig.getHome();
		String[] items = new String[]{
				home + "/model/UI2/" + path,
				home + "/model/UI2/" + path + FileSystem.EXT,
				home + "/model/BIZ/" + path,
				home + "/model/BIZ/" + path + FileSystem.EXT
		};
		for (String item : items){
			File file = new File(item);
			if (file.exists() && file.isDirectory()){
				throw new RuntimeException("应用\"" + path + "\"已经存在!");
			}
		}
		
	}
	
	private static boolean isIdentifier(String input) {
	    if (input != null && input.length() > 0) {
	        int pos = 0;
	        if (Character.isLetter(input.charAt(pos))) {
	            while (++pos < input.length()) {
	                if (!Character.isLetter(input.charAt(pos))
	                		&& !Character.isDigit(input.charAt(pos))) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }
	    return false;
	}
}