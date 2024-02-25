package com.rowdy.dino.graphics;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

import com.rowdy.dino.Main;
import com.rowdy.dino.entity.Dino;

public class WinScene extends Scene {
	public Dino dino = null;
	
	@Override
	public void render(Graphics g) {
		g.drawImage(Main.wallpaper, Main.navWidth, 0, null);

		g.setColor(Color.white);
		g.setFont(new Font("SansSerif", 1, 50));
		g.drawString("You Won!", 500, 150);
		
		if(dino != null) {
			g.drawImage(dino.getImage(), 550, 200, 150, 150, null);

			g.setFont(new Font("SansSerif", 1, 20));
			g.drawString(dino.getName() + " added to collection.", 440, 420);
		}
	}
}
