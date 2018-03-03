import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.justep.biz.client.ActionUtils;
import com.justep.biz.client.util.BizClientUtils;
import com.justep.common.SystemUtils;

class ProcessStreamHelper extends Thread {
	private InputStream is;
	private String chartset;
	private String type;
	private CompileResult ret;

	ProcessStreamHelper(InputStream is, String chartset, String type, CompileResult ret) {
		this.is = is;
		this.chartset = chartset;
		this.type = type;
		this.ret = ret;
	}

	public void run() {
		try {
			InputStreamReader isr = new InputStreamReader(is, this.chartset);
			BufferedReader br = new BufferedReader(isr);
			String line = null;
			while ((line = br.readLine()) != null) {
				ret.println(line);
				if("error".equals(type)) ret.setError(true);
			}
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}

class CompileResult{
	private StringBuffer out = new StringBuffer();
	private Boolean error = false; 
	CompileResult(){
		
	}
	public StringBuffer getOut(){
		return out;
	}
	public Boolean hasError(){
		return error;
	}
	public void println(String str){
		out.append(str);
		out.append("\n");
	}
	public void setError(boolean error){
		this.error = error;
	}
}

public class Compile extends com.justep.ui.impl.JProcessorImpl {

	protected int runCMD(String cmd, String[] envp, String dir, CompileResult ret, String charset) {
		try {
			Process process = Runtime.getRuntime().exec(cmd, envp, new File(dir));

			ProcessStreamHelper errorGobbler = new ProcessStreamHelper(process.getErrorStream(), charset, "error", ret);
			ProcessStreamHelper outputGobbler = new ProcessStreamHelper(process.getInputStream(), charset, "output", ret);
			errorGobbler.start();
			outputGobbler.start();
			return process.waitFor();
		} catch (IOException e) {
			throw new RuntimeException("执行编译失败[" + cmd + "]", e);
		} catch (InterruptedException e) {
			throw new RuntimeException("执行编译失败[" + cmd + "]", e);
		}
	}

	protected String compile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String justep_home = SystemUtils.getHome(null);
		String dir = justep_home + "/tools/compile/";
		String os = System.getProperty("os.name");
		boolean isWindows = os.contains("Windows");
		String cmd = dir + (isWindows ? "compileBaas.bat" : "compileBaas.sh");
		File cmdFile = new File(cmd);
		cmd = (isWindows ? "cmd /c " : "") + cmdFile.getAbsolutePath() + " ide";
		CompileResult ret = new CompileResult();
		if (0 > runCMD(cmd, null, dir, ret, isWindows ? "GBK" : "UTF-8") || ret.hasError())
			throw new RuntimeException("执行编译Baas资源失败\n" + ret.getOut().toString());
		return ret.getOut().toString();
	}
	
	public static String getStackTrace(Exception e) {

		StringBuilder sb = new StringBuilder();
		StackTraceElement[] trace = e.getStackTrace();
		for (int i = 0; i < trace.length; i++) {
			sb.append("\r\nat ");
			sb.append(trace[i]);
		}

		return sb.toString();
	}
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String result;
		try {
			String reason = compile(request, response);

			result = BizClientUtils.generateResult(true, "", "编译Baas资源成功!", reason, "", "", "", ActionUtils.JSON_CONTENT_TYPE);
		}catch (Exception e) {
			result = BizClientUtils.generateResult(false, null, "编译Baas资源失败!", e.getMessage(), getStackTrace(e), "", "", ActionUtils.JSON_CONTENT_TYPE);
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(result.getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
