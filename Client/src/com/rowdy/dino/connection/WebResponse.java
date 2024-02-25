package com.rowdy.dino.connection;

public class WebResponse {
	
	private String responseString;
	private int responseCode;
	
	public WebResponse(String responseString, int responseCode) {
		this.responseString = responseString;
		this.responseCode = responseCode;
	}
	
	public String getResponseString() {
		return responseString;
	}
	
	public int getResponseCode() {
		return responseCode;
	}
}
