package com.justep.tools.ant.task.app;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;

public class UploadTask extends BaseTask {

	private String appID;
	private String file;
	private String appBuilderServer;
	private String session;

	protected String getURL() {
		return appBuilderServer + "/app/upload";
	}

	protected String getParams() throws UnsupportedEncodingException {
		return "appID=" + appID + "&session=" + session;
	}

	protected void preparePost(HttpPost httppost) {
		FileBody bin = new FileBody(new File(file));
		StringBody comment = new StringBody("content of native app", ContentType.APPLICATION_OCTET_STREAM);
		HttpEntity reqEntity = MultipartEntityBuilder.create().addPart("bin", bin).addPart("comment", comment).build();
		httppost.setEntity(reqEntity);
	}

	public void setAppID(String appID) {
		this.appID = appID;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public void setAppBuilderServer(String appBuilderServer) {
		this.appBuilderServer = appBuilderServer;
	}

	public void setSession(String session) {
		this.session = session;
	}

	protected void processResponse(CloseableHttpResponse response) throws IOException {
		String message = paserResponse(response);
		String session = "";
		if (!("".equals(message)) && (message != null && !message.equals(""))) {
			session = message;
		}
		getProject().setProperty("session", session);
	}

}