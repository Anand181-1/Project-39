var monkey, monkey_running, monkey1;
var banana1, banana2, bananaImage;
var obstacle1, obstacle2, obstacleImage;
var obstacleGroup1, obstacleGroup2, bananaGroup1, bananaGroup2;
var score;
var ground1, ground2;
var gameState, PLAY, END;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");


}


function setup() {
  createCanvas(windowWidth, windowHeight);

  //monkey
  monkey = createSprite(70, 800, 100, 100);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;

  //ground
  ground1 = createSprite(200, windowHeight -20, 10000, 20);
  ground1.shapeColor = 'green';

  ground2 = createSprite(200, windowHeight +240, 10000, 500);
  ground2.shapeColor = 'lightGreen';

  //invisibleGround
  invisibleGround = createSprite(200, windowHeight -25, 400, 10);
  invisibleGround.visible = false;
  
  //group
  obstacleGroup1 = new Group();
  bananaGroup1 = new Group();
  obstacleGroup2 = new Group();
  bananaGroup2 = new Group();

  //state
  gameState = "PLAY";
  
  //score
  score = 50;
}


function draw() {
  background("lightblue");

  if (gameState === "PLAY") {
    fill("black");
    textSize(35);
    text("SURVIVING TIME: " + score, -130, 375);

    camera.position.x = monkey.x;
    camera.position.y = monkey.y;

    //spacekey
    if (keyDown("space") && monkey.y >= 570) {
      monkey.velocityY = -15;
      obstacleGroup1.velocityX = -10;
      obstacleGroup2.velocityX = -10;
    }

    if (frameCount % 60 === 0) {
      score -= 1;
    }
    
    if (frameCount % 1000 === 0) {
      obstacleGroup1.velocityX += 2;
      obstacleGroup2.velocityX += 2;
    }
    
    //gravity
    monkey.velocityY = monkey.velocityY + 0.9;
    monkey.collide(invisibleGround);

    //spawning
    spawnobstacle();
    spawnfood();

    if (monkey.isTouching(bananaGroup1)) {
      bananaGroup1.destroyEach();
      score += 5;
    }

    if (monkey.isTouching(bananaGroup2)) {
      bananaGroup2.destroyEach();
      score += 5;
    }

    if (monkey.isTouching(obstacleGroup1)) {
      obstacleGroup1.destroyEach();
      score -= 25;
    }

    if (monkey.isTouching(obstacleGroup2)) {
      obstacleGroup2.destroyEach();
      score -= 25;
    }

    if (score >= 200) {
      gameState = "END1";
    }

    if (score === 0 || score < 0) {
      gameState = "END2";
    }
  } else {if (gameState === "END2"){

    obstacleGroup1.destroyEach();
    bananaGroup1.destroyEach();
    obstacleGroup2.destroyEach();
    bananaGroup2.destroyEach();
    monkey.destroy();
    ground1.destroy();
    ground2.destroy();
    obstacleGroup1.velocityX = 0;
    bananaGroup1.velocityX = 0;
    obstacleGroup2.velocityX = 0;
    bananaGroup2.velocityX = 0;
    fill("red");
    textSize(70);
    textFont("Freestyle Script");
    text("Game Over", -30, 650);
    textSize(50);
    text("Monkey Died", windowWidth/3 - 590, windowHeight - 130);
    text("Press (ctrl)(R) to restart", windowWidth/3 - 695, windowHeight - 75);
    noFill();
  }
 }
 if (gameState === "END1"){

  obstacleGroup1.destroyEach();
  bananaGroup1.destroyEach();
  obstacleGroup2.destroyEach();
  bananaGroup2.destroyEach();
  monkey.destroy();
  ground1.destroy();
  ground2.destroy();
  obstacleGroup1.velocityX = 0;
  bananaGroup1.velocityX = 0;
  obstacleGroup2.velocityX = 0;
  bananaGroup2.velocityX = 0;
  fill("red");
  textSize(70);
  textFont("Freestyle Script");
  text("You Won", -25, 800);
  textSize(50);
  text("You didn't let the monkey die", windowWidth/3 - 695, windowHeight + 25);
  noFill();
 }

  drawSprites();
}


function spawnobstacle() {

  if (frameCount % 160 === 0) {
    obstacle1 = createSprite(1000, 768, 10, 10);
    obstacle1.addImage(obstacleImage);
    obstacle1.velocityX = -12;
    obstacle1.lifetime = 400;
    obstacle1.scale = 0.2;
    obstacleGroup1.add(obstacle1);
    
    obstacle2 = createSprite(2000, 768, 10, 10);
    obstacle2.addImage(obstacleImage);
    obstacle2.velocityX = -12;
    obstacle2.lifetime = 400;
    obstacle2.scale = 0.2;
    obstacleGroup2.add(obstacle2);
  }
}

function spawnfood() {

  if (frameCount % 160 === 0) {
    banana1 = createSprite(1000, 602, 40, 10);
    banana1.addImage(bananaImage);
    banana1.scale = 0.1;
    banana1.velocityX = -12;
    banana1.lifetime = 400;

    banana2 = createSprite(2000, 602, 40, 10);
    banana2.addImage(bananaImage);
    banana2.scale = 0.1;
    banana2.velocityX = -12;
    banana2.lifetime = 400;
    bananaGroup1.add(banana1);
    bananaGroup2.add(banana2);
  }
}