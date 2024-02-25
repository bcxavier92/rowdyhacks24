package com.rowdy.dino.connection;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

public class AIRequestHandler {
	public static void sendAIRequest() {
		String baseUrl = "https://api.cloudflare.com/client/v4/accounts/a2d3540b4248d87127b2a5f41ccb96ef/ai/run/";
		String model = "@cf/meta/llama-2-7b-chat-int8";
		String reqBody = "{\"messages\":[{\"role\":\"system\",\"content\":\"You follow user requests\"},{\"role\":\"user\",\"content\":\"Create a pokemon name\"}]}";
		
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Authorization", "Bearer fYyUeSmzUkmFXRSC43v6MjWTPQeRL9MBuwGj-sh8");
		
		try {
			WebResponse wr = RequestHandler.post(baseUrl + model, headers, reqBody);
			System.out.println(wr.getResponseString());
		} catch (IOException | URISyntaxException e) {
			e.printStackTrace();
		}
	}
}
