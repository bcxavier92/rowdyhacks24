package com.rowdy.dino.entity;

import java.awt.Graphics;
import java.util.ArrayList;
import java.util.List;

public class ParticleTracker {
	private List<Particle> particles = new ArrayList<Particle>();
	
	public void render(Graphics g) {
		for(Particle p : particles) {
			p.getRenderable().render(g);
		}
	}
	
	public void tick() {
		List<Particle> remove = new ArrayList<Particle>();
		for(Particle p : particles) {
			if(p.getExpireAt() <= System.currentTimeMillis()) {
				remove.add(p);
			}
		}
		
		for(Particle r : remove) {
			particles.remove(r);
		}
	}
	
	public void addParticle(Particle p) {
		particles.add(p);
	}
}
