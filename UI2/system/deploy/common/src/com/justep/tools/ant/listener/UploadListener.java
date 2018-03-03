package com.justep.tools.ant.listener;

import org.apache.tools.ant.BuildEvent;
import org.apache.tools.ant.BuildListener;
import org.apache.tools.ant.Task;
import com.justep.deploy.AppHelper;

public class UploadListener implements BuildListener {

	public UploadListener() {
	}

	public void buildStarted(BuildEvent event) {

	}

	public void buildFinished(BuildEvent event) {

	}

	public void targetStarted(BuildEvent event) {

	}

	public void targetFinished(BuildEvent event) {

	}

	public void taskStarted(BuildEvent event) {

	}

	public void taskFinished(BuildEvent event) {
	}

	public void messageLogged(BuildEvent event) {
		Task task = event.getTask();
		if (task != null && task.getTaskName().equals("Upload")) {
			AppHelper.session = event.getMessage();
		}
	}
}
