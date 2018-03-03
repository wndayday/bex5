import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.listener.Log4jListener;

import com.justep.biz.client.ActionUtils;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

public class StartIpaService extends com.justep.ui.impl.JProcessorImpl {
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String UI = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String justepHome = JustepConfig.getHome();
		String antLibDir = modelPath + UI + "/system/deploy/common/antlib";
		String nativeDir = modelPath + "Native";

		try {
			String proj = request.getParameter("projectName");
			HashMap<String, String> parameter = new HashMap<String, String>();
			parameter.put("ip", request.getParameter("ip"));
			parameter.put("dictory", nativeDir + "/" + proj + "/dist");
			parameter.put("ipaServerHome", justepHome + "/tools/ipa-install-server");
			parameter.put("nodeBin", justepHome + "/node");
			File buildScript = ServiceHelper.createBuildXML(antLibDir + "/httpsService.xml", parameter);

			Project p = new Project();
			Log4jListener consoleLogger = new Log4jListener();
			p.addBuildListener(consoleLogger);
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			helper.parse(p, buildScript);
			try {
				p.fireBuildStarted();
				p.init();
				String os = System.getProperty("os.name");
				p.executeTarget(os.contains("Windows") ? "ipaServiceStart" : "ipaServiceStartMac");
				p.fireBuildFinished(null);
			} catch (BuildException e) {
				p.fireBuildFinished(e);
				e.printStackTrace();
			} finally {
			}

		} catch (IllegalArgumentException e) {

			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write("{}".getBytes("UTF-8"));
		output.flush();
		output.close();
	}
}
