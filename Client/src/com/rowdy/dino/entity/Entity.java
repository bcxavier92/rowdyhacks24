package com.rowdy.dino.entity;

public class Entity {
	private Dino dino;
	public int health;
	public int x;
	public int y;
	public int orientation; // 1 or -1
	
	public Entity(Dino dino, int health, int x, int y) {
		this.dino = dino;
		this.health = health;
		this.x = x;
		this.y = y;
	}
	
	public Dino getDino() {
		return dino;
	}
	
	public int damage(int amount) {
		if(health - amount < 0) {
			health = 0;
		} else {
			health -= amount;
		}
		return health;
	}
}
