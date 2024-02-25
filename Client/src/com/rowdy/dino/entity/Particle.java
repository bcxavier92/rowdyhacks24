package com.rowdy.dino.entity;

import com.rowdy.dino.Main;
import com.rowdy.dino.graphics.Renderable;

public class Particle {
	private Renderable renderable;
	private long expireAt;
	
	public Particle(Renderable renderable, long duration) {
		this.renderable = renderable;
		this.expireAt = System.currentTimeMillis() + duration;
	}
	
	public Renderable getRenderable() {
		return renderable;
	}
	
	public long getExpireAt() {
		return expireAt;
	}
	
	public void play() {
		Main.particleTracker.addParticle(this);
	}
}
