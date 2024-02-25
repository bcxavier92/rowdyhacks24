package com.rowdy.dino;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rowdy.dino.connection.RequestHandler;
import com.rowdy.dino.connection.WebResponse;
import com.rowdy.dino.entity.Dino;
import com.rowdy.dino.entity.Move;

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
	
	public static BufferedImage createImageFromURL(String urlStr) throws IOException {
		@SuppressWarnings("deprecation")
		URL url = new URL(urlStr); // Replace with your image URL
        return ImageIO.read(url);
	}
	
	public static Dino createDinoFromId(String id) throws IOException, URISyntaxException {
		WebResponse res = RequestHandler.get(Main.API_URL + "/dino?id=" + id, null);
		Map<String, Object> map = res.getResponseMap();
		

		Move[] moves = new Move[((ArrayList<Object>) map.get("moves")).size()];
		
		int i = 0;
		for(Object mo : (ArrayList<Object>) map.get("moves")) {
			HashMap<Object, Object> moveMap = (HashMap<Object, Object>)mo;
			Move move = new Move((String)moveMap.get("name"), (String)moveMap.get("type"), (String)moveMap.get("description"));
			moves[i] = move;
			i++;
		}
		
		BufferedImage img = DinoUtil.createImageFromURL(Main.API_URL + "/image?id=" + id);
		
		Dino dino = new Dino(id, (String)map.get("name"), moves, img);
		return dino;
	}
	
	public static Color getTextColorFromAttackType(String type) {
		switch(type) {
		case "earth":
			return new Color(45, 125, 49);
		case "air":
			return new Color(145, 145, 145);
		case "water":
			return new Color(31, 81, 182);
		case "fire":
			return new Color(176, 39, 39);
		default:
			return Color.black;
		}
	}
}
