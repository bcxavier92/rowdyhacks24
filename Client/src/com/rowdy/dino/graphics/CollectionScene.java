package com.rowdy.dino.graphics;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import com.rowdy.dino.Main;
import com.rowdy.dino.entity.Dino;

public class CollectionScene extends Scene {
	private int scrollOffset = 0;
	private int maxPerPage = 11;
	
	@Override
	public void render(Graphics g) {
		g.drawImage(Main.wallpaper, Main.navWidth, 0, null);

		g.setColor(Color.white);
		g.setFont(new Font("SansSerif", 1, 50));
		g.drawString("Collection", 120, 60);

		g.setFont(new Font("SansSerif", 1, 12));
		
		int collectionSize = Main.collection.size();
		
		int cap = collectionSize > maxPerPage ? maxPerPage : collectionSize;
		for(int i = 0; i < cap; i++) {
			Dino dino = Main.collection.get(i + scrollOffset);
			boolean isCurrent = dino.getId().equals(Main.currentDino.getId());
			
			if(isCurrent) {
				g.setColor(Color.white);
				g.drawRect(110, 75 + (i * 50), 1080, 50);
			} else {
				g.setColor(Color.white);
			}
			
			g.drawImage(dino.getImage(), 120, getEntryY(i), 35, 35, null);
			g.drawString(dino.getName() + (isCurrent ? " (Selected)" : ""), 168, getEntryY(i) + 25);

			g.drawImage(dino.getImage(), 120, getEntryY(i), 35, 35, null);
		}
		if(Main.collection.size() > maxPerPage) {
			g.setColor(Color.white);
			g.setFont(new Font("SansSerif", 1, 12));
			g.drawString("Use arrow keys to scroll up and down", 120, 645);
		}
	}
	
	@Override
	public void keyPressed(int keyCode) {
        int collectionSize = Main.collection.size();
        
		if(keyCode == KeyEvent.VK_UP) {
			if(scrollOffset > 0) {
        		scrollOffset--;
        	}
		} else if(keyCode == KeyEvent.VK_DOWN) {
        	if(scrollOffset < collectionSize - maxPerPage) {
        		scrollOffset++;
        	}
		}
	}
	
	public void mouseClicked(MouseEvent e) {
        int x = e.getX();
        int y = e.getY();
        int index = getEntryFromClick(x, y) + scrollOffset;
        int collectionSize = Main.collection.size();
        if(x > 105 && index < collectionSize) {
        	System.out.println("update to " + index);
        	Main.currentDino = Main.collection.get(index);
        	System.out.println(Main.currentDino);
        }
	}
	
	private int getEntryFromClick(int x, int y) {
		int removeOffset = y - 80;
		return (int) Math.floor(removeOffset / 50);
	}
	
	private int getEntryY(int entry) {
		return 80 + (entry * 50);
	}
}
