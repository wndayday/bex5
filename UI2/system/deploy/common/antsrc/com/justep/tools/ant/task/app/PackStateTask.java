package com.justep.tools.ant.task.app;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.tools.ant.BuildException;
import com.alibaba.fastjson.JSONObject;

public class PackStateTask extends BaseTask {

	private String waittingState;
	private String appID;
	private String appBuilderServer;
	private String session;

	private Boolean finished;

	static Integer MAX_CHECK_COUNT = 60;

	private void watingForState() {
		finished = false;
		int count = 0;
		while (!finished) {
			count++;
			super.execute();
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				finished = true;
			}
			if (!finished && (count >= MAX_CHECK_COUNT)) {
				throw new BuildException("监测状态“" + waittingState + "”超时！");
			}
		}
	}

	protected String getURL() {
		return appBuilderServer + "/app/test";
	}

	protected String getParams() throws UnsupportedEncodingException {
		return "appID=" + appID + "&session=" + session;
	}

	protected Boolean isPost() {
		return false;
	}

	public void setWaittingState(String waittingState) {
		this.waittingState = waittingState;
	}

	public void setAppID(String appID) {
		this.appID = appID;
	}

	public void setAppBuilderServer(String appBuilderServer) {
		this.appBuilderServer = appBuilderServer;
	}

	public void setSession(String session) {
		this.session = session;
	}

	protected void processResponse(CloseableHttpResponse response) throws IOException {
		String message = paserResponse(response);
		String state = "未返回";
		if (!("".equals(message))) {
			JSONObject obj = JSONObject.parseObject(message);
			if (obj != null) {
				state = obj.getString("state");
				finished = (waittingState != null && (waittingState.indexOf(state) >= 0));
				if ("error".equalsIgnoreCase(state))
					throw new BuildException("返回状态“" + state + "”，打包出错！");
			}
			if (!finished) {
				log("等待服务状态：" + waittingState + " 当前状态：" + state + " 5秒后重新检查......");
			}
		}
	}

	public void execute() throws BuildException {
		if ((waittingState != null) && !"".equals(waittingState)) {
			watingForState();
		} else {
			super.execute();
		}
	}
}
