import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.FileWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;

public class DownloadCompile extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String projectName = request.getParameter("projectName");
		if (projectName == null || projectName.equals("")) {
			throw new ServletException("projectName is null");
		}
		JSONObject downloadInfo = null;
		String url = request.getParameter("url");
		GetMethod method = new GetMethod(url);
		HttpClient client = new HttpClient();
		int statusCode = 404; // 200 404
		try {
			statusCode = client.executeMethod(method);
		} catch (Exception e) {

		}
		if (statusCode != 200) {
			downloadInfo = new JSONObject();
			downloadInfo.put("msg", "" + statusCode);
		} else {
			String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
			String nativeDir = modelPath + "Native";

			BufferedReader br = new BufferedReader(new InputStreamReader(method.getResponseBodyAsStream(), "UTF-8"));
			StringBuffer sb = new StringBuffer();
			String str = null;
			while ((str = br.readLine()) != null)
				sb.append(str + "\r\n");
			String content = sb.toString();

			FileWriter fw = new FileWriter(nativeDir + "/" + projectName + "/md5.json");
			fw.write(content);
			fw.close();
			br.close();
			downloadInfo = new JSONObject();
			downloadInfo.put("msg", "ok");
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(downloadInfo.toJSONString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
