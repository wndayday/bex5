import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.filesystem.FileSystemWrapper;


public class InitW extends com.justep.ui.impl.JProcessorImpl  {
	private static String FILE_CONETENT = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
						+"<div xmlns=\"http://www.w3.org/1999/xhtml\" "
						+"xmlns:xui=\"http://www.justep.com/xui\" "
						+"component=\"$UI/system/components/justep/window/window\" "
						+"design=\"device:m;\" "
						+"xid=\"window\" class=\"window\" "
						+"extends=\"%s\"></div>";
	private static String META_FILE_CONETENT = "{\"label\":\"%s\"}";

	private static void createDir(File dir) throws IOException{
		if(dir.exists()) return;
		createDir(dir.getParentFile());
		dir.mkdirs();
	}
	
	private static boolean createFile(File f) throws IOException{
		if(f.exists()) return false;
		createDir(f.getParentFile());
		f.createNewFile();
		return true;
	}
	
	private static void writeFile(String file, String sConetent, String charsetName) {		
		try {
			File f = new File(file);
			if(f.exists()) return;//已经存在不再处理
			createFile(f);
			FileOutputStream fos = new FileOutputStream(file);
			Writer out = null;
			if (charsetName != null && !charsetName.equals("")) {
				out = new OutputStreamWriter(fos, charsetName);
			} else {
				out = new OutputStreamWriter(fos);
			}
			out.write(sConetent);
			out.close();
			fos.close();
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException("文件创建出错："+file);
		}
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String appPath = request.getParameter("appPath");
		String[] wFiles = {"/userDialog/login.w","/userDialog/register.w","/userDialog/user.w","/userDialog/changePassword.w","/userDialog/forgetPassword.w"};
		String[] wFileLabels = {"登录","注册","用户信息","修改密码","忘记密码"};
		boolean hasNewFile = false;
		for(int i=0; i<wFiles.length; i++){
			String fileUrl = "$UI/system/components/justep/user" + wFiles[i];
			String newFileName = FileSystemWrapper.instance().getRealPath("/"+appPath + wFiles[i]);
			writeFile(newFileName,String.format(FILE_CONETENT, fileUrl), "UTF-8");
			writeFile(newFileName+".meta",String.format(META_FILE_CONETENT, wFileLabels[i]), "UTF-8");
		}
		String dirMeta = FileSystemWrapper.instance().getRealPath("/"+appPath + "/userDialog/userDialog.meta");
		writeFile(dirMeta,String.format(META_FILE_CONETENT, "用户对话框"), "UTF-8");
		JSONObject ret = new JSONObject();
		ret.put("hasNewFile", hasNewFile);
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		out.write(ret.toString());
		out.flush();
	}
	
}
