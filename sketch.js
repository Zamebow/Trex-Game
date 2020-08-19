var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex,trex_running;
var ground,ground_floor;
var invisible_ground,cloud,gameOver,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,restart,trex_collided,CloudsGroup,ObstacleGroup,score,jump,die,checkpoint
function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_floor = loadImage("ground2.png")
  cloud1 = loadImage ("cloud.png")
  GameOver = loadImage ("gameOver.png")
  cactus1 = loadImage ("obstacle1.png")
   cactus2 = loadImage ("obstacle2.png")
   cactus3 = loadImage ("obstacle3.png")
   cactus4 = loadImage ("obstacle4.png")
   cactus5 = loadImage ("obstacle5.png")
   cactus6 = loadImage ("obstacle6.png")
  Restart = loadImage ("restart.png")
  trex_collided = loadAnimation ("trex_collided.png")
  die = loadSound ("die-1.mp3")
  jump = loadSound ("jump.mp3")
  checkpoint = loadSound ("checkPoint-1.mp3")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite (50,150,20,20)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.setCollider("rectangle",0,0,40,40,0);
  trex.scale = 0.50;
  ground = createSprite (200,165,20,20)
  ground.addImage(ground_floor)
  invisible_floor = createSprite (300,175,600,1)
  invisible_floor.visible = false
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  score = 0
  gameOver = createSprite (300,75)
  gameOver.addImage(GameOver)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart = createSprite (300,100)
  restart.scale = 0.5
  restart.addImage(Restart)
  restart.visible = false
}

function draw() {
  background(180);
  text("Score  "+score,525,50)
  if (gameState === PLAY) {
    
  score = score + Math.round(getFrameRate()/60);
  if (score>0 && score%100 === 0){
      checkpoint.play();
    }
if (keyDown("space") && trex.y >= 151) {
      trex.velocityY = -12
      jump.play();
      }
  trex.velocityY = trex.velocityY + 0.8
    ground.velocityX= - (6 + 1.5*score/100);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      die.play();
    }
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
   if(mousePressedOver(restart)) {
    reset();
  }
   trex.collide(invisible_floor)
  drawSprites()
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloud1);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud)
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 1.5*score/100);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    console.log(rand);
    switch(rand){
      case 1:
        obstacle.addImage(cactus1);
        break;
        case 2:
        obstacle.addImage(cactus2);
        break;
        case 3:
        obstacle.addImage(cactus3);
        break;
        case 4:
        obstacle.addImage(cactus4);
        break;
        case 5:
        obstacle.addImage(cactus5);
        break;
        case 6:
        obstacle.addImage(cactus6);
        break;
        default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running");
  
  score = 0;
  
}