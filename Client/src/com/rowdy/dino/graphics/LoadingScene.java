package com.rowdy.dino.graphics;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

import com.rowdy.dino.Main;

public class LoadingScene extends Scene {
	@Override
	public void render(Graphics g) {
		g.setColor(Color.gray);
		g.fillRect(Main.navWidth, 0, Main.frameSize.width - Main.navWidth, Main.frameSize.height);

		g.setColor(Color.white);
		g.setFont(new Font("SansSerif", 1, 50));
		g.drawString("Creating New Dino....", 120, 300);
		g.setFont(new Font("SansSerif", 1, 14));
		g.drawString("This may take a second...", 120, 330);
	}
}
