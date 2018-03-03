import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map.Entry;

import org.apache.commons.lang.StringEscapeUtils;

public class ServiceHelper {
	public static File createBuildXML(String xmlFile, HashMap<String, String> paramter) throws IOException, IllegalAccessException {
		File buildTmplFile = new File(xmlFile);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(buildTmplFile), "UTF-8"));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null)
			sb.append(str + "\r\n");
		String content = sb.toString();

		
		for (Entry<String, String> entry : paramter.entrySet()) {
			content = content.replace("@" + entry.getKey() + "@", entry.getValue() != null ? StringEscapeUtils.escapeXml(entry.getValue()) : "");

		}
		File buildFile = File.createTempFile("x5app-build", ".xml");
		buildFile.deleteOnExit();
		FileOutputStream buildFileStream = new FileOutputStream(buildFile);
		buildFileStream.write(content.getBytes("UTF-8"));
		br.close();
		buildFileStream.close();

		return buildFile;
	}
}
