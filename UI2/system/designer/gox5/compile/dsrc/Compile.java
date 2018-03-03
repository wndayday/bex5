import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.ProcessBuilder.Redirect;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.biz.client.ActionUtils;
import com.justep.biz.client.util.BizClientUtils;
import com.justep.common.SystemUtils;

public class Compile extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String result;
		StringBuffer console = new StringBuffer("[COMPILE OUT] 服务编译开始...\n");
		try {
			compile(request, console);
			result = BizClientUtils.generateResult(true, "", "GoX5 服务模型资源编译成功!", console.toString(), "", "", "", ActionUtils.JSON_CONTENT_TYPE);
		} catch (Throwable e) {
			console.append("[COMPILE ERR]: ").append(e.getClass().getName());
			StackTraceElement[] trace = e.getStackTrace();
			for (int i = 0; i < trace.length; i++) {
				console.append("\r\nat ").append(trace[i]);
			}
			result = BizClientUtils.generateResult(false, null, "GoX5 服务模型资源编译失败!", console.toString(), e.getMessage(), "", "", ActionUtils.JSON_CONTENT_TYPE);
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

	protected void compile(HttpServletRequest request, StringBuffer console) throws Exception {
		String home = SystemUtils.getHome(null);

		String desktop = System.getProperty("sun.desktop");
		String chartset = System.getProperty("sun.jnu.encoding");

		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.directory(new File(home, "tools/compile"));
		Map<String, String> envs = processBuilder.environment();
		envs.put("JUSTEP_HOME", home);
		envs.put("JAVA_HOME", System.getProperty("java.home"));
		envs.put("PATH", System.getProperty("sun.boot.library.path"));
		if ("windows".equalsIgnoreCase(desktop)) {
			processBuilder.command("cmd", "/C", "compileService.bat");
		} else {
			processBuilder.command("/bin/sh", "compileService.sh");
		}
		processBuilder.redirectError(Redirect.PIPE);
		processBuilder.redirectInput(Redirect.PIPE);

		System.out.println("正在调用 GoX5 服务编译工具...");
		System.out.printf("Locale: %s%n", Locale.getDefault());
		System.out.printf("Encoding: %s%n", chartset);
		System.out.printf("process command: %s%n", processBuilder.command());
		System.out.printf("process directory: %s%n", processBuilder.directory());
		System.out.printf("process environment: %s%n", processBuilder.environment());

		Process process = processBuilder.start();
		new ProcessHelper(process.getErrorStream(), console, chartset);
		new ProcessHelper(process.getInputStream(), console, chartset);

		int exitValue = process.waitFor();
		if (exitValue != 0)
			throw new Exception();
	}

	class ProcessHelper extends Thread {

		private String chartset;
		private InputStream input;
		private StringBuffer console;

		ProcessHelper(InputStream input, StringBuffer console, String chartset) {
			this.input = input;
			this.console = console;
			this.chartset = chartset;
			start();
		}

		public void run() {
			try {
				BufferedReader reader = new BufferedReader(new InputStreamReader(input, chartset));
				String line = null;
				while ((line = reader.readLine()) != null) {
					console.append(line).append("\n");
				}
			} catch (Exception e) {
				throw new IllegalStateException(e);
			}
		}
	}
}
