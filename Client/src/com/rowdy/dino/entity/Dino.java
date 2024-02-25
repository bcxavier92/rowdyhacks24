package com.rowdy.dino.entity;

import java.awt.image.BufferedImage;

public class Dino {
	private String id;
	private String name;
	private Move[] moves;
	private BufferedImage image;
	
	public Dino(String id, String name, Move[] moves, BufferedImage image) {
		this.id = id;
		this.name = name;
		this.moves = moves;
		this.image = image;
	}
	
	public String getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public Move[] getMoves() {
		return moves;
	}
	
	public BufferedImage getImage() {
		return image;
	}
}
