import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Project;
import org.apache.tools.ant.ProjectHelper;
import org.apache.tools.ant.listener.Log4jListener;

import com.alibaba.fastjson.JSONObject;
import com.justep.tools.ant.listener.BuildLogListener;
import com.justep.ui.JavaServer;
import com.justep.ui.JustepConfig;
import com.justep.ui.util.NetUtils;

import com.justep.biz.client.ActionUtils;
import com.justep.biz.client.util.BizClientUtils;
import com.justep.deploy.AppHelper;
import com.justep.deploy.AppInfo;

public class QuickApp extends com.justep.ui.impl.JProcessorImpl {

	private void execTask(File buildFile, Boolean edit, String logFileName, AppInfo appInfo) throws IOException {
		Project p = new Project();
		Log4jListener consoleLogger = new Log4jListener();
		BuildLogListener buidLogger = new BuildLogListener(logFileName);
		p.addBuildListener(consoleLogger);
		p.addBuildListener(buidLogger);
		try {
			p.fireBuildStarted();
			p.init();
			ProjectHelper helper = ProjectHelper.getProjectHelper();
			helper.parse(p, buildFile);
			AppHelper.session = "";
			com.justep.deploy.Pack.serverPackStatus = "BUSY";
			try {
				p.executeTarget("quickApp");
			} finally {
				com.justep.deploy.Pack.serverPackStatus = "FINISHED";
			}
			p.executeTarget("releaseUpdateFiles");
			p.fireBuildFinished(null);
		} catch (BuildException e) {
			p.fireBuildFinished(e);
			throw e;
		} finally {
			buidLogger.flush();
		}
	}

	private void createNativeProject(HttpServletRequest request, HttpServletResponse response) throws IllegalAccessException, IOException {
		final Boolean edit = "true".equals(request.getParameter("edit"));
		String UI = JustepConfig.getUIValue(NetUtils.getRequestPath(request));
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String justepHome = JustepConfig.getHome();
		String antLibDir = modelPath + UI + "/system/deploy/common/antlib";
		String nativeDir = modelPath + "Native";
		JSONObject config = JSONObject.parseObject(JavaServer.getPostData(request));

		final AppInfo appInfo = new AppInfo(config);

		final File buildFile = AppHelper.createBuildXML(justepHome, antLibDir, nativeDir, appInfo, "");
		final String logFileName = nativeDir + "/" + appInfo.projectName + "/log/build.log";

		Thread t = new Thread(new Runnable() {
			public void run() {
				try {
					// 执行ant脚本
					execTask(buildFile, edit, logFileName, appInfo);
					com.justep.deploy.Pack.packStatus = "";
				} catch (Exception e) {
					com.justep.deploy.Pack.packStatus = "ERROR";
				}
			}
		});
		t.start();
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String result;
		if ("BUSY".equals(com.justep.deploy.Save.status)) {
			result = BizClientUtils.generateResult(false, null, "正在保存，请稍候再试", "", "", "", "", ActionUtils.JSON_CONTENT_TYPE);
		} else {
			com.justep.deploy.Pack.packStatus = "BUSY";
			try {
				createNativeProject(request, response);
				result = BizClientUtils.generateResult(true, "BUSY", "创建app成功", "", "", "", "", ActionUtils.JSON_CONTENT_TYPE);
			} catch (BuildException be) {
				// 对于执行ant失败返回成功标记，但code值为ERROR，和正常执行成功一样通过build.log查看具体错误日志
				result = BizClientUtils.generateResult(true, "ERROR", "创建app失败!", be.getMessage(), AppHelper.getStackTrace(be), "", "", ActionUtils.JSON_CONTENT_TYPE);
				com.justep.deploy.Pack.packStatus = "ERROR";
			} catch (Exception e) {
				result = BizClientUtils.generateResult(false, null, "创建app失败!", e.getMessage(), AppHelper.getStackTrace(e), "", "", ActionUtils.JSON_CONTENT_TYPE);
				com.justep.deploy.Pack.packStatus = "ERROR";
			}
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
