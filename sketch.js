var obstace,car,racetrack,coin;
var score;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var edges,reset;
var count;
var life1,life2,life3
function preload(){
   obstacleimg = loadImage("obstacle.png");
   carimg = loadImage("car.png");
   racetrackimg = loadImage("racetrack.jpg");
  coinimg = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png");
  resetimg = loadImage("reset.png");
  lifeimg = loadImage("heart.png");
gameoverimg = loadImage("thanks.png");
headimg= loadImage("dead.png");
}

function setup(){
  createCanvas(400,500);
   racetrack = createSprite(200,300);
   racetrack.scale = 0.9;
  edges = createEdgeSprites();
   car = createSprite(200,460,20,20);
   car.scale = 0.08;
  car.addImage(carimg);
  racetrack.addImage(racetrackimg);
  obstacleGroup = new Group();
  coinGroup = new Group();
  score = 0;
  
   reset = createSprite(width/2,height/2);
  reset.addImage(resetimg);
  reset.scale =0.05;

    
   dead = createSprite(width/2-5,height/height+40);
  dead.addImage(headimg);
  dead.scale =0.08;
  
  life1 = createSprite(15,15,10,10);
  life1.addImage(lifeimg);
  life1.scale = 0.02
  
  life2 = createSprite(35,15,10,10);
  life2.addImage(lifeimg)
  life2.scale = 0.02;
  
  life3 = createSprite(55,15,10,10);
  life3.addImage(lifeimg);
  life3.scale = 0.02;
  
  count = 0;
}

function draw(){
  background("white");
  if(gameState == PLAY){
game();
    reset.visible= false;
  }
  else if(gameState == END){
 end();  
    
  }
  if(keyWentDown("space")&&gameState == END){
  resetButton();
  }
  drawSprites();
  textSize(20);
  fill("white");
  text("Score: "+score,290,30);
  if(gameState == "The End"){
  racetrack.velocityY =0;
  obstacleGroup.setVelocityYEach(0);
    
  thanks = createSprite(width/2,height/2);
  thanks.addImage(gameoverimg);
  thanks.scale =0.5;
  car.destroy();
  }
}


function obstacles(){
  if(frameCount%120==0){
  obstacle = createSprite(200,0,20,20);
  obstacle.scale = 0.10;
  obstacle.addImage(obstacleimg);
  obstacle.velocityY = (score/6+3);  
  obstacle.lifetime = 200/3;  
  obstacle.x = Math.round(random(50,350));
  obstacleGroup.add(obstacle)    
  }
}

function spawnCoin(){
    if(frameCount%100==0){
    coin = createSprite(200,200,20,20);
  coin.addAnimation("coins",coinimg);
       coin.x = Math.round(random(50,350))  
        coin.y = Math.round(random(50,350));
      coinGroup.add(coin)
      coin.lifetime = 200/3;
    }
}
function game(){
  
  car.collide(edges[3]);
  car.collide(edges[2]);
  car.collide(edges[0]);
  car.collide(edges[1]);
  racetrack.velocityY = -2;
  car.x = mouseX;
  if(racetrack.y < 180){
    racetrack.y = height/2-20;
  }
  
  if(keyDown("right")){
    car.x = car.x+5;
  }
  
  if(keyDown("left")){
    car.x = car.x-5;
  }
  
   if(keyDown("up")){
    car.y = car.y-5;
  }
  
  if(keyDown("down")){
    car.y = car.y+5;
  }
  if(car.isTouching(coinGroup)){
    coinGroup.destroyEach();
    score = score+1
  }
  drawSprites()
  obstacles();
  spawnCoin();
  if(car.isTouching(obstacleGroup)){
    gameState = END;
    
  }
}

function resetButton(){
    game();
    gameState = PLAY;
    reset.visible= false;
    obstacleGroup.destroyEach();
    coinGroup.destroyEach();
    score = 0;
    count = count+1;
  console.log(count);
  switch(count){
    case 1:life3.destroy();
      break;
    case 2:life2.destroy();
      break;
    case 3:life1.destroy();
      break;
    case 4:finalEnd();
      break;
  }
  frameCount = 0 ;
}
function finalEnd() {
  gameState = "The End";
}
function end(){
  racetrack.velocityY =0;
  obstacleGroup.setVelocityYEach(0);
  reset.visible= true;
}