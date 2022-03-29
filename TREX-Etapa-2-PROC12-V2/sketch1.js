// Actividad Completa TREX Etapa 3
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage, cloudGroup;   
 var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacleGroup;
 var score;
var PLAY=1;
var END= 0; 
var gameState=PLAY;
var gameoverimg,restartimg,gameOver,restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage=loadImage("cloud.png");  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");  

  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}


function setup() {

  createCanvas(600,200)
  
  //crea el sprite del Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided);
  trex.scale = 0.5;
  
  trex.setCollider("circle",0,0,40);
  trex.debug=false;

  //crea el sprite del suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  //ground.velocityX = -4;
  
  gameOver=createSprite(300,80,100,40);
  gameOver.addImage("gameover",gameoverimg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart=createSprite(300,140,100,40);
  restart.addImage("restart",restartimg);
  restart.scale=0.5;
  restart.visible=false;
  //crea el suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
    
  score=0;
  obstacleGroup=new Group(); 
  cloudGroup= new Group();
}

function draw() {
  //establece el color del fondo
  background(150);
    fill("white");
    text("puntuacion:"+" "+ score,500,50)
    //score=score+Math.round(frameCount/60)            
  //console.log(trex.y);                      

  if(gameState===PLAY){
    ground.velocityX = -4;
    score=score+Math.round(frameCount/60);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();                          
  
    spawnObstacle();
    
    if(obstacleGroup.isTouching(trex)){
      gameState=END;
    }
  }
  else if (gameState===END){
     ground.velocityX=0;
     trex.velocityY=0;
     trex.changeAnimation("collide",trex_collided);
     obstacleGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);
     cloudGroup.setLifetimeEach(-1);
     obstacleGroup.setLifetimeEach(-1);
     gameOver.visible=true;
     restart.visible=true;

    }

  //salta cuando se presiona la barra espaciadora
 // if(keyDown("space")&& trex.y >= 100) {
   // trex.velocityY = -10;
 // }
  
  //trex.velocityY = trex.velocityY + 0.8
  
  //if (ground.x < 0){
    //ground.x = ground.width/2;
  //}
  
  //evita que el Trex caiga
  trex.collide(invisibleGround);

  
  //aparecen las nubes
  //spawnClouds();                          
  
  //spawnObstacle();

  drawSprites();
  
}

function spawnClouds(){                  
  //escribe el código ára que aparezcan las nubes
  if(frameCount %60 === 0){                
    cloud=createSprite(600,100,40,10);     
    cloud.addImage(cloudImage);           
    cloud.y=Math.round(random(10,100));     
    cloud.scale = 0.5;                     
    cloud.velocityX=-3; 
    cloud.lifetime=220;
    
    //ajustar la profundidad de las nubes          
    cloud.depth=trex.depth;              
    trex.depth=trex.depth+1;
    cloudGroup.add(cloud);             
    
  }  
}
function spawnObstacle(){
if (frameCount %60===0){
    var obstacle= createSprite(600,165,10,40);
   // obstacle.addImage(obstacle1);
   obstacle.velocityX=-3;
  var rand= Math.round (random(1,6));
  switch(rand){
    case 1:obstacle.addImage(obstacle1);
    break;
    case 2:obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5:obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default: break;
  }
    obstacle.scale=0.5;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
}

}


