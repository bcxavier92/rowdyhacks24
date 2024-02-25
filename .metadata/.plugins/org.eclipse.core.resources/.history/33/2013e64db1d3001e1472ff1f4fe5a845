package com.rowdy.dino.connection;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class RequestHandler {
	public static WebResponse post(String url, Map<String, String> headers, String requestBody)
			throws IOException, URISyntaxException {
		
		// Create connection and set to GET
		URL apiUrl = new URI(url).toURL();
        HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();
        connection.setRequestMethod("POST");
        
        // Set headers
        if(headers != null) {
        	for(String key : headers.keySet()) {
            	connection.setRequestProperty(key, headers.get(key));
            }
        }
        
        connection.setDoOutput(true);

        // Write the data to the output stream
    	if(requestBody != null) {
    		DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            byte[] requestBodyBytes = requestBody.getBytes(StandardCharsets.UTF_8);
            outputStream.write(requestBodyBytes);
            outputStream.flush();
    	}

        // Read response
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        
        // Clean up
        reader.close();
        connection.disconnect();
        
        // Create response
        WebResponse wr = new WebResponse(response.toString(), connection.getResponseCode());
        
        return wr;
	}
}
