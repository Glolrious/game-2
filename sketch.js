var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, monster1, monster2, monster3, monster4, monster6, monster5;

var score=0;

var gameOver, restart;
var canvas


function preload(){
  trex_running =   loadAnimation("knight2.png");
 
  
  groundImage = loadImage("bg.jpeg");
  
  cloudImage = loadImage("cloud.png");
  
  monster1 = loadImage("monster1.png");
  monster2 = loadImage("monster2.png");
  monster3 = loadImage("monster2.png");
  monster4 = loadImage("monster1.png");
  monster5 = loadImage("monster2.png");
  monster6 = loadImage("monster1.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  canvas = createCanvas(1200,200);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
 
  trex.scale = 0.2;
  
  ground = createSprite(200,180,1200,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(600,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(600,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,1200,10);
  invisibleGround.visible = false;
  invisibleGround.x = invisibleGround.width/2;
  invisibleGround.velocityX = -(6 + 3*score/100);
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 1100,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
	trex.velocityX = 3
    console.log(trex.y)
    camera.y = trex.y;
	camera.x = trex.x;
    
    
  if ((keyDown("space") && trex.y >= 220)) {
    trex.velocityY = -12;
  
  }

	if(trex.x > 1000){
		trex.x = 50;
        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();
	}
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 200){
      ground.x = ground.width/4;
      invisibleGround.x = invisibleGround.width/4;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
	
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
	trex.velocityX = 0
	
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
 
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart) || keyDown("R")) {
      reset();
    }
  }
   
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1300,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1300,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);

    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(monster1);
              break;
      case 2: obstacle.addImage(monster2);
              break;
      case 3: obstacle.addImage(monster3);
              break;
      case 4: obstacle.addImage(monster4);
              break;
      case 5: obstacle.addImage(monster5);
              break;
      case 6: obstacle.addImage(monster6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
   trex.x = 50
  
  score = 0;
  
}