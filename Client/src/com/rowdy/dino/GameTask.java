package com.rowdy.dino;

public class GameTask {
	private Runnable runnable;
	private long runAt;
	public GameTask(Runnable runnable, long runAt) {
		this.runnable = runnable;
		this.runAt = runAt;
	}
	
	public Runnable getRunnable() {
		return runnable;
	}
	
	public long runAt() {
		return runAt;
	}
}
