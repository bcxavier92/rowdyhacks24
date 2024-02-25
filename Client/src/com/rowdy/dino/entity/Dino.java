package com.rowdy.dino.entity;

import java.awt.Color;

public class Dino {
	private BodySet bodySet;
	private Color primaryColor;
	private Color secondaryColor;
	
	public Dino(BodySet bodySet, Color primaryColor, Color secondaryColor) {
		this.bodySet = bodySet;
		this.primaryColor = primaryColor;
		this.secondaryColor = secondaryColor;
	}
}
