package com.rowdy.dino;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.swing.JFrame;
import javax.swing.JPanel;

import com.rowdy.dino.connection.RequestHandler;
import com.rowdy.dino.connection.WebResponse;
import com.rowdy.dino.entity.Dino;
import com.rowdy.dino.entity.Entity;
import com.rowdy.dino.entity.ParticleTracker;
import com.rowdy.dino.graphics.BattleScene;
import com.rowdy.dino.graphics.CollectionScene;
import com.rowdy.dino.graphics.DeathScene;
import com.rowdy.dino.graphics.LoadingScene;
import com.rowdy.dino.graphics.Scene;
import com.rowdy.dino.graphics.WinScene;

public class Main {
	
	public static final String API_URL = "http://localhost:3000";
	public static final int GROUND_LEVEL = 490;
	public static BufferedImage wallpaper;
	
	public static JFrame frame;
	public static JPanel panel;
	public static Dimension frameSize = new Dimension(1200, 690);
	public static int navWidth = 100;
	public static long lastTime = System.nanoTime();
	public static double deltaTime = 0;
	public static DinoScheduler scheduler;
	public static Nav nav;
	public static Battle battle;
	public static List<Dino> collection;
	public static Dino currentDino;
	public static ParticleTracker particleTracker;
	
	public static List<Scene> scenes = new ArrayList<Scene>();
	public static BattleScene battleScene;
	public static WinScene winScene;
	public static CollectionScene collectionScene;
	public static LoadingScene loadingScene;
	public static DeathScene deathScene;
	
	private static boolean loadBattleNext = false;
	
	public static void main(String[] args) {
		scheduler = new DinoScheduler();
		particleTracker = new ParticleTracker();
		nav = new Nav();
		
		try {
            String imagePath = "./images/wallpaper.png";
            File file = new File(imagePath);
            wallpaper = ImageIO.read(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		updateCollection();
		currentDino = collection.get(0);
		
		battleScene = new BattleScene();
		winScene = new WinScene();
		collectionScene = new CollectionScene();
		loadingScene = new LoadingScene();
		deathScene = new DeathScene();
		
		scenes.add(winScene);
		scenes.add(battleScene);
		scenes.add(collectionScene);
		scenes.add(loadingScene);
		scenes.add(deathScene);
		
		frame = new JFrame("Dinos | Rowdy Hacks 24");
		frame.setSize(frameSize);
		frame.setResizable(false);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		
		frame.addKeyListener(getKeyListener());
		
		panel = new JPanel() {
            private static final long serialVersionUID = -6875075798821292109L;

			@Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g);
                render(g);
            }
        };
		panel.setSize(frameSize);
		panel.addMouseListener(getMouseAdapter());
		
		frame.add(panel);
		
		setScene(collectionScene);
		
		loop();
		
		updateCollection();
	}
	
	public static KeyListener getKeyListener() {
		return new KeyListener() {
			
			@Override
			public void keyTyped(KeyEvent e) {	}
			
			@Override
			public void keyReleased(KeyEvent e) {	}
			
			@Override
			public void keyPressed(KeyEvent e) {
				if(battleScene.isShowing()) {
					battleScene.keyPressed(e.getKeyCode());
				} else if(collectionScene.isShowing()) {
					collectionScene.keyPressed(e.getKeyCode());
				}
			}
		};
	}
	
	public static MouseAdapter getMouseAdapter() {
		return new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                int x = e.getX();
                int y = e.getY();
                
                if(x >= 25 && x <= 75 && y >= 30 && y <= 75) {
                	setScene(collectionScene);
                }
                
                if(x >= 10 && x <= 90 && y >= 95 && y <= 155) {
                	if(!battleScene.isShowing()) {
                		setScene(loadingScene);
                		new Thread(new Runnable() {
                			public void run() {
                				try {
									Thread.sleep(100);
								} catch (InterruptedException e) {
									e.printStackTrace();
								}
                				loadBattleNext = true;
                			}
                		}).start();
                	}
                }
                
                if(collectionScene.isShowing()) {
                	collectionScene.mouseClicked(e);
                }
            }
        };
	}
	
	public static void updateCollection() {
		try {
			WebResponse ws = RequestHandler.get(API_URL + "/collection", null);
			Map<String, Object> json = ws.getResponseMap();
			
			ArrayList<Object> col = (ArrayList<Object>) json.get("collection");
			
			List<Dino> collection = new ArrayList<Dino>();
			for(Object obj : col) {
				HashMap<String, Object> map = (HashMap<String, Object>)obj;
				String id = (String) map.get("_id");
				
				Dino dino = DinoUtil.createDinoFromId(id);
				collection.add(dino);
			}
			
			Main.collection = collection;
			
		} catch (IOException | URISyntaxException e) {
			e.printStackTrace();
		}
	}
	
	public static void doBattle() throws IOException, URISyntaxException {
		System.out.println("Loading...");
		WebResponse ws = RequestHandler.post(API_URL + "/create-dino", null, "");
		
		Map<String, Object> map = ws.getResponseMap();
		String id = (String) map.get("_id");

		System.out.println("Reached");
		System.out.println(id);
		
		Dino botDino = DinoUtil.createDinoFromId(id);
		Entity botEntity = new Entity(botDino, 100, 775, GROUND_LEVEL);
		
		Entity playerEntity = new Entity(currentDino, 100, 350, GROUND_LEVEL);
		
		battleScene.startBattle(playerEntity, botEntity);
		setScene(battleScene);
	}
	
	public static void loop() {
		Thread loopThread = new Thread(new Runnable() {
			@Override
			public void run() {
				while(true) {
					long now = System.nanoTime();
					deltaTime = (now - lastTime) / 1e9;
					lastTime = now;
					
					tick();
					panel.repaint();
					
					try {
						Thread.sleep(16);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}
		});
		
		loopThread.start();
	}
	
	public static void tick() {
		scheduler.tick();
		for(Scene scene : scenes) {
			if(scene.isShowing()) {
				scene.tick();
			}
		}
		
		particleTracker.tick();
		
		if(loadBattleNext) {
			loadBattleNext = false;
			battleScene.stopBattle();
    		try {
				doBattle();
			} catch (IOException | URISyntaxException e1) {
				e1.printStackTrace();
			}
		}
	}
	
	public static void render(Graphics g) {
		nav.render(g);
		
		for(Scene scene : scenes) {
			if(scene.isShowing()) {
				scene.render(g);
			}
		}
		
		particleTracker.render(g);
	}
	
	public static void setScene(Scene scene) {
		for(Scene s : scenes) {
			s.setShowing(false);
		}
		scene.setShowing(true);
	}
}
