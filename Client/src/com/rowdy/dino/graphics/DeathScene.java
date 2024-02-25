package com.rowdy.dino.graphics;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

import com.rowdy.dino.Main;

public class DeathScene extends Scene {
	
	@Override
	public void render(Graphics g) {
		g.setColor(Color.gray);
		g.fillRect(Main.navWidth, 0, Main.frameSize.width - Main.navWidth, Main.frameSize.height);

		g.setColor(Color.white);
		g.setFont(new Font("SansSerif", 1, 50));
		g.drawString("You Died :(", 500, 150);
		
	}
}
