import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONArray;
import com.justep.biz.client.ActionUtils;
import com.justep.filesystem.FileSystem;
import com.justep.filesystem.FileSystemWrapper;
import com.justep.ui.PackageWindowCompiler;
import com.justep.ui.impl.JProcessorImpl;

public class Funcs extends JProcessorImpl {

	private static Object getAppFuncs(){
		JSONArray ret = new JSONArray();
		FileSystem fs = FileSystemWrapper.instance();
		List<String> dirs = fs.getDirs(PackageWindowCompiler.UI_COMP_PATH);
		for(String dir : dirs){
			File fDir = new File(dir);
			String configDir = fDir.getName() + PackageWindowCompiler.UI_CONFIG_PATH;
			List<File> funcFiles = fs.getFiles(PackageWindowCompiler.UI_COMP_PATH + "/" + configDir, PackageWindowCompiler.UI_FUNCS_FILE_EXT, false);
			for(File file : funcFiles){
				String fileName = file.getName();
				ret.add("$UI/"+PackageWindowCompiler.COMP_PATH+"/"+configDir+"/"+fileName);
			}
		}

		return ret;
	}
	

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String output = getAppFuncs().toString();
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		PrintWriter out = response.getWriter();
		out.write(output);
		out.flush();
	}
}
