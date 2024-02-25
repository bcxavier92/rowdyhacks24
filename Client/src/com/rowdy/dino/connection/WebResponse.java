package com.rowdy.dino.connection;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

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
	
	public Map<String, Object> getResponseMap() {
		try {
			return new ObjectMapper().readValue(responseString, Map.class);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public int getResponseCode() {
		return responseCode;
	}
}
