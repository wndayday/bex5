import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.justep.visualProgramming.VisualProgramming;

public class CodeService extends com.justep.ui.impl.JProcessorImpl {
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type = request.getHeader("type");
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		if(StringUtils.isEmpty(type)){
			this.transformCode(request,response);
		}else if("contextVariable".equals(type)){
			this.getContextVariable(request,response);
		}
	}
	
	private void getContextVariable(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String inputStr = IOUtils.toString(request.getInputStream(), "UTF-8");
		String nodeId = request.getHeader("nodeId");
		System.out.println("inputStr:" + inputStr);
		System.out.println("nodeId:" + nodeId);
		String vars = VisualProgramming.getContextVariables(inputStr, nodeId);
		System.out.println(vars);
		IOUtils.write(vars, response.getOutputStream(),"UTF-8");
	}
	
	private void transformCode(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String codeType = request.getHeader("codeType");
		String inputStr = IOUtils.toString(request.getInputStream(), "UTF-8");
		String code = "";
		if("wex5".equals(codeType)){
			code = VisualProgramming.transformForCodeCompoent(inputStr);
		}else if("gox5".equals(codeType)){
			code = VisualProgramming.transformForGox5(inputStr);
		}else if("bex5".equals(codeType)){
			code = VisualProgramming.transformForBex5(inputStr);
		}
		String info = VisualProgramming.getInfo(inputStr);
		JSONObject result = (JSONObject)JSON.parse(info);
		result.put("code", code);
		IOUtils.write(JSON.toJSONString(result,true), response.getOutputStream(),"UTF-8");
	}
}
