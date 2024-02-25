package com.rowdy.dino;

import com.rowdy.dino.entity.Entity;

public class Battle {
	public int turn = 1; // 1 or 2
	
	private Entity player;
	private Entity bot;
	public Battle(Entity player, Entity bot) {
		this.player = player;
		this.bot = bot;
	}
	
	public Entity getPlayer() {
		return player;
	}
	
	public Entity getBot() {
		return bot;
	}
}
