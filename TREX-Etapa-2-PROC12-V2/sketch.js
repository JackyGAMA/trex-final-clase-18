
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
var checkPointsound,diesound,jumpsound;
var mensaje="prueba de trex";

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
  checkPointsound=loadSound("checkPoint.mp3");
  diesound=loadSound("die.mp3");
  jumpsound=loadSound("jump.mp3");
}


function setup() {

  createCanvas(windowWidth,windowHeight);
  
  //crea el sprite del Trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided);
  trex.scale = 0.5;
  
  trex.setCollider("circle",0,0,40);
  trex.debug=false;

  //crea el sprite del suelo
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  //ground.velocityX = -4;
  
  gameOver=createSprite(width/2,height/2-50,100,40);
  gameOver.addImage("gameover",gameoverimg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart=createSprite(width,height,100,40);
  restart.addImage("restart",restartimg);
  restart.scale=0.5;
  restart.visible=false;
  //crea el suelo invisible
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
    
  score=0;
  obstacleGroup=new Group(); 
  cloudGroup= new Group();

  trex.setCollider("rectangle",0,0,400,trex.height);
  trex.debug=true;

 
  
}

function draw() {
  //establece el color del fondo
  background(150);
    fill("white");
    text("puntuacion:"+" "+ score,500,50)
    //score=score+Math.round(frameCount/60)            
  //console.log(trex.y);                      

  if(gameState===PLAY){
    ground.velocityX = -(4+2*score/400);
    score=score+Math.round(frameCount/60);
    if(score > 0 && score%100 === 0) {
      checkPointsound.play();

    }
    if (ground.x < 0 ){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      jumpsound.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();                          
  
    spawnObstacle();
    
    if(obstacleGroup.isTouching(trex)){
      //gameState=END;
      //diesound.play();
      trex.velocityY=-12;
      jumpsound.play();
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

  if(mousePressedOver(restart)){
    console.log("reinicio");
  }


  drawSprites();
  
}

function reset(){
   gameState=PLAY;
   

}
function spawnClouds(){                  
  //escribe el código ára que aparezcan las nubes
  if(frameCount %60 === 0){                
    cloud=createSprite(width+20,height-300,40,10);     
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
    var obstacle= createSprite(width+50,height-95,20,30);
   // obstacle.addImage(obstacle1);
   obstacle.velocityX=-(6+score/200);
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


