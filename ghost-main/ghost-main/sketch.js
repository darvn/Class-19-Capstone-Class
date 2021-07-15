var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop()

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);

  if(gameState == "play"){

  
 
    
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x  - 3;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }
  
    spawnDoors();
    if(ghost.y > 600 || ghost.isTouching(invisibleBlockGroup)){
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
  }

  if(gameState == "end"){
    stroke ("yellow");
    fill ("yellow");
    textSize (30);
    text("Game Over", 220, 300);
  }
  }
  
  function spawnDoors(){
    if(frameCount % 240 === 0){
      door = createSprite(300, -50);
      door.addImage(doorImg);
      door.velocityY = 1;
      door.x = Math.round(random(120, 480))
      door.lifetime = 600;
      doorsGroup.add(door);
      
      climber = createSprite(300, 10);
      climber.addImage(climberImg);
      climber.velocityY = 1;
      climber.x = door.x;
      climber.lifetime = 700;
      climbersGroup.add(climber);

      invisibleBlock = createSprite(300, 15, climber.width, 2);
      invisibleBlock.velocityY = 1;
      invisibleBlock.x = climber.x;
      invisibleBlock.lifetime = 600;
      invisibleBlock.visible = false;
      invisibleBlockGroup.add(invisibleBlock);

      ghost.depth = door.depth;
      ghost.depth += 1;
    }
  }
  