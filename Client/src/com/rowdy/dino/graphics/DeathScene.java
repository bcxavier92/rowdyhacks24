package com.rowdy.dino.graphics;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

import com.rowdy.dino.Main;

public class DeathScene extends Scene {
	
	@Override
	public void render(Graphics g) {
		g.drawImage(Main.wallpaper, Main.navWidth, 0, null);

		g.setColor(Color.white);
		g.setFont(new Font("SansSerif", 1, 50));
		g.drawString("You Died :(", 500, 150);
		
	}
}
