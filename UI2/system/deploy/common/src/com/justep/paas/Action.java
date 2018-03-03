package com.justep.paas;

public class Action {
	public String url;
	public String type;
	public Boolean extURL;

	public Action(String url, String type, Boolean extURL) {
		this.url = url;
		this.type = type;
		this.extURL = extURL;
	}

	public String realURL(String paasConsoleURL, String paasAppID) {
		return paasConsoleURL + this.url + (this.extURL ? "/" + paasAppID : "");
	}

}