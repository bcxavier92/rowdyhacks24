package com.rowdy.dino;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class DinoUtil {
	public static String jsonStringify(Map<String, Object> data) {
		try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "{}"; // Return empty object in case of error
        }
	}
}
