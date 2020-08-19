var trex,trex_running;
var ground,ground_floor;
var invisible_ground,cloud,GameOver,cactus1,cactus2,cactus3,cactus4,cactus5,cactus6,restart,trex_collided,cloudsGroup,obstacleGroup,score
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
  restart = loadImage ("restart.png")
  trex_collided = loadImage ("trex_collided.png")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite (50,150,20,20)
  trex.addAnimation("running",trex_running)
  trex.scale = 0.50;
  ground = createSprite (200,165,20,20)
  ground.addImage(ground_floor)
  invisible_floor = createSprite (300,175,600,1)
  invisible_floor.visible = false
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  score = 0
}

function draw() {
  background(180);
  score = score + Math.round(getFrameRate()/25);
  text("Score  "+score,525,50)
  if (keyDown("space")) {
      trex.velocityY = -12
      }
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisible_floor)
  ground.velocityX=-3
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
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
    cloudsGroup.add(cloud)
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
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
    obstaclesGroup.add(obstacle);
  }
}