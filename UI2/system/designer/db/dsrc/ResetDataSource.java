import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;
import com.justep.ui.JavaServer;

public class ResetDataSource extends com.justep.ui.impl.JProcessorImpl {
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		JSONObject data = JSONObject.parseObject(JavaServer.getPostData(request));
		JSONArray resource = data.getJSONArray("resource");
		if (resource == null)
			resource = new JSONArray();
		StringBuffer context = new StringBuffer("<Context useHttpOnly=\"false\" reloadable=\"true\">\r\n");
		StringBuffer resourceString = new StringBuffer("");
		String name = null;
		String auth = null;
		String type = null;
		String driverClassName = null;
		String url = null;
		String username = null;
		String password = null;
		int count = 0;

		for (Object res : resource) {
			count++;
			JSONObject dataResource = (JSONObject) res;
			name = dataResource.getString("name");
			auth = dataResource.getString("auth");
			type = dataResource.getString("type");
			driverClassName = dataResource.getString("driverClassName");
			url = dataResource.getString("url");
			username = dataResource.getString("username");
			password = dataResource.getString("password");

			resourceString.append("<Resource");
			resourceString.append(" name=").append("\"" + name + "\"");
			resourceString.append(" auth=").append("\"" + auth + "\"");
			resourceString.append(" type=").append("\"" + type + "\"");
			resourceString.append(" driverClassName=").append("\"" + driverClassName + "\"");
			resourceString.append(" url=").append("\"" + url + "\"");
			resourceString.append(" username=").append("\"" + username + "\"");
			resourceString.append(" password=").append("\"" + password + "\"");
			resourceString.append(" />\r\n");

		}
		if (resourceString.length() == 0) {

		} else {
			context.append(resourceString).append("</Context>");
			String serverMeta = System.getenv("CATALINA_HOME") + "/webapps/BusinessServer/META-INF/context.xml"; // //webapps
			File contextFile = new File(serverMeta);
			// contextFile = new
			// File("D:/Mytool/BeX5_5531/runtime/BusinessServer/META-INF/context.xml");
			FileWriter fw = null;
			if (contextFile.exists()) {
				fw = new FileWriter(contextFile);
				fw.write(context.toString());
				fw.close();
			}

			serverMeta = System.getenv("CATALINA_HOME") + "/webapps/baas/META-INF/context.xml"; // //webapps
			contextFile = new File(serverMeta);
			if (contextFile.exists()) {
				fw = new FileWriter(contextFile);
				fw.write(context.toString());
				fw.close();
			}
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(("{\"count\":" + count + "}").getBytes("UTF-8"));
		output.flush();
		output.close();
	}
}
