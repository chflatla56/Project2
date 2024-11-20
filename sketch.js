//rotation
let r = 0;
let r2 = 0;
let r3 = 0;
let count = false;
let clouds = false;
//colors for shirt
let a = 100;
let b = 92;
let c = 146;
//to toggle between pages
let characterPage = false;
let homePage = true;
let fishingPage = false;
let aboutPage = false;
let collectPage = false;
//hats
let hat1;
let hat2;
let hat3;
let hat4;
let hats = [];
let hatNumber = 0;
//for fishing animation
let fishing = false;
let circleWidth = 0;
let circleHeight = 0;
let time = 10;
//fish pics and info
let fishes = [];
let fishCSV = "IntroToCC_Fishes - Sheet1.csv";
let fishInfo;
let fishCollection = [];
let fishCount = 0;
let displayCount = 0;
let displayFish = false;
let fish;
let xBut = false;
//buttons
let button1;
let button2;
let button3;
let button4;
let button5;
let button6;
//for sun wink (still in the works- see question in mousepress function)
let wink = false;
//for randomization
let rand1;
let caught = false;
let s = 0;
//fonts
let font1;
let font2;
let font3;
    
function preload() {
  font1 = loadFont("HanaleiFill-Regular.ttf");
  font2 = loadFont("RampartOne-Regular.ttf");
  font3 = loadFont("Lacquer-Regular.ttf");
  
  hat1 = loadImage("/hats/baseballHat.png");
  hat2 = loadImage("/hats/bowlerHat.png");
  hat3 = loadImage("/hats/cowboyHat.png");
  hat4 = loadImage("/hats/propellerHat.png");
    
  for (let i = 0; i < 20; i++) {
    fishes[i] = loadImage("fishes/fish_" + i + ".jpg"); 
    fishCollection[i] = false;
  }
  
  fishInfo = loadTable(fishCSV, "csv", "header");

  button2 = createButton("home");
  button2.parent("button3");
  button2.mousePressed(goHome);
  
  button4 = createButton("customize character");
  button4.parent("button1");
  button4.mousePressed(goCharacter);

  button3 = createButton("go to the pond");
  button3.parent("button1");
  button3.mousePressed(goToThePond);
  
  button6 = createButton("see your collection");
  button6.parent("button1");
  button6.mousePressed(goToCollection);
  
  button5 = createButton("about");
  button5.parent("button3");
  button5.mousePressed(goToAbout);
  
  button1 = createButton("fish!");
  button1.parent("button2");
  button1.mousePressed(goFishing);
  button1.hide();
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch");

  //let button1 = f
  angleMode(DEGREES);
}

function draw() {
  background('#b5caff');

  if (r > 45) {
    count = true;
  } else if (r < 0) {
    count = false;
  }

  if (count) {
    r = r - 1 / 4;
  } else {
    r = r + 1 / 4;
  }
  
  fill('#97deaa');
  noStroke();
  rect(0, 175, 600, 275);

  fill("#32a852");
  noStroke();

  rect(0, 360, 600, 40);

  for (let i = 50; i <= 650; i = i + 50) {
    push();
    translate(i, 330);

    rotate(r);

    fill("#32a852");
    arc(0, 70, 100, 160, 90, 270);

    fill("#55ab6d");
    arc(0, 80, 100, 160, 90, 270);

    fill("#32a852");
    arc(25, 20, 80, 80, 90, 270);

    fill("#97deaa");
    arc(25, 0, 80, 80, 90, 270);

    pop();
  }
  
  //clouds
  fill(256);
  noStroke();
  
  arc(50, 100 + r3, 20, 20, 180, 360);
  
  arc(100, 100 + r3, 50, 80, 180, 360);
  arc(130, 100 + r3, 70, 120, 180, 360);
  arc(175, 100 + r3, 30, 50, 180, 360);
  
  arc (245, 75 + r3, 40, 60, 180, 360);
  arc(220, 75 + r3, 20, 30, 180, 360);
  arc(260, 75 + r3, 40, 30, 180, 360);
  
  if (r3 == 25) {
    clouds = true;
  } else if (r3 == 0) {
    clouds = false;
  }
  
  if (clouds) {
    r3 = r3 - 1/8;
  } else {
    r3 = r3 + 1/8;
  }
  
  //sun
  fill("#f5d731");
  circle(500, 70, 80);

  for (let i = 0; i < 15; i++) {
    push();
    translate(500, 70);
    rotate(r2);
    triangle(-8, -45, 8, -45, 0, -55);
    pop();
    r2 = r2 + 24;
  }
  
  noFill();
  stroke(0);
  arc(500, 70, 50, 50, 0, 180);
  
  if (mouseX >= 470 && mouseX <= 530 && mouseY >= 40 && mouseY <= 100 && mouseIsPressed) {
    noFill();
    arc(510, 60, 8, 15, 0, 180);
  } else {
    fill(0);
    ellipse(510, 60, 5, 10);
  }
  
  fill(0);
  ellipse(490, 60, 5, 10);

  if (r < 360) {
    r2 = r2 + 1 / 2;
  } else {
    r = 0;
  }

  if (characterPage) {
    characterScreen();
  } else if (homePage) {
    homeScreen();
  } else if (fishingPage) {
    fishingScreen();
  } else if (aboutPage) {
    aboutScreen();
  } else if (collectPage) {
    collectionScreen();
  } else {
    homeScreen();
  }
}

//character stuff
function characterScreen() {
  push();
  scale(1.4);
  translate(50, 0);
  characterDraw();
  pop();
  
  textFont(font3);
  textSize(25);
  text("use the left and", 35, 105);
  text("right arrows to", 45, 130);
  text("change hats", 65, 155);
  
  text("click on the shirt", 35, 210);
  text("to change", 75, 235);
  text("outfit colors", 55, 260);
  
  text("go to the pond", 50, 315);
  text("when you're ready!", 30, 340);
}

function characterDraw() {
  //character
  fill(256);
  stroke(0);

  circle(200, 100, 100);
  arc(200, 100, 60, 40, 0, 180);
  line(150, 160, 100, 160);
  line(250, 160, 300, 160);
  line(180, 210, 180, 260);
  line(220, 210, 220, 260);

  fill(0);
  ellipse(185, 90, 10, 20);
  ellipse(215, 90, 10, 20);

  fill(a, b, c);
  rect(150, 150, 100, 60);

  arc(180, 265, 20, 20, 180, 360);
  arc(220, 265, 20, 20, 180, 360);

  //hat
  hatDraw();

  //rod
  fill("#5c4316");
  quad(330, 60, 320, 60, 270, 225, 280, 225);

  if (fishing) {
    drawFishingLine();
  } else {
    drawRegLine();
  }
}

function hatDraw() {
  switch (hatNumber) {
    case 0:
      image(hat1, 165, 10, 70, 70);
      break;
    case 1:
      image(hat2, 155, 15, 90, 60);
      break;
    case 2:
      image(hat3, 165, 15, 70, 70);
      break;
    case 3:
      image(hat4, 170, 15, 60, 50);
      break;
  }
}

function drawRegLine() {
  noFill();
  arc(325, 109, 50, 100, 275, 445);
  arc(332, 198, 50, 80, 95, 265);

  //hook
  push();
  translate(330, 237.5);
  noStroke();
  fill(150);
  quad(0, 2.5, 0, -2.5, 15, -2.5, 15, 2.5);
  arc(15, -5, 15, 15, 270, 450);
  triangle(10, -12.5, 15, -7.5, 15, -12.5);
  fill('#97deaa');
  arc(15, -5, 5, 5, 270, 450);
  pop();
}

function drawFishingLine() {
  line(330, 60, 800, 300);

  fill(256);
  arc(800, 300, 30, 30, 180, 360);

  fill("#ed5707");
  arc(800, 300, 30, 30, 180, 300);
}


//fishing animation for pond
function biteAnimation() {
  if (circleWidth < 200) {
    circleWidth++;
  } else {
    circleWidth = 0;
  }

  noStroke();
  fill("#4da4c4");
  ellipse(425, 250, circleWidth, circleWidth / 3);
  fill("#71bdd9");
  ellipse(425, 250, circleWidth - 10, circleWidth / 3);
  fill("#4da4c4");
  ellipse(425, 250, circleWidth - 25, circleWidth / 3 - 10);
  fill("#71bdd9");
  ellipse(425, 250, circleWidth - 35, circleWidth / 3 - 10);
  

  if (frameCount % 60 == 0 && time > 0) {
    time--;
  } else if (time == 0) {
    fishing = false;
    caught = true;
    time = 10;
    rand1 = int(random(fishes.length));
    console.log(rand1);
  }
}

function showFish(x) {
  fill('#f2e3bb');
  rect(25, 25, 550, 350, 50);
  fill('#de5931');
  square(520, 50, 25);
  image(fishes[x], 125, 40, 350, 200);
  fill(0);
  textSize(20);
  textFont(font1);
  text("X", 528, 69);
  
  textFont(font3);
  textSize(12);
  text(fishInfo.get(x, 'info'), 90, 260, 450, 185);
  
  fishCollection[x] = true;
  xBut = true;
  
}

//screens
function homeScreen() {
  push();
  translate(100, 30);
  scale(0.9);
  characterDraw();
  pop();
  
  textFont(font2);
  textSize(60);
  text("Welcome!", 150, 330);
  
  textFont(font3);
  textSize(30);
  text("explore the buttons to start!", 100, 370);
  
}

function fishingScreen() {
  noStroke();
  fill("#32a852");
  quad(535, 250, 540, 250, 540, 150, 535, 150);
  quad(525, 250, 530, 250, 515, 170, 510, 170);
  quad(340, 250, 345, 250, 350, 150, 345, 150);
  quad(325, 250, 330, 250, 330, 120, 325, 120);
  quad(320, 250, 325, 250, 310, 140, 305, 140);

  fill("#71bdd9");
  ellipse(400, 250, 300, 100);
  
  if (fishing) {
    biteAnimation();
  }
  
  push();
  translate(30, 100);
  scale(0.5);
  characterDraw();
  pop();
  
  fill(0);
  textFont(font3);
  textSize(20);
  text("click the 'fish!'", 55, 260);
  text("button to cast", 55, 280);
  text("your line", 80, 300);
  
  text("to view the fish you've caught and their information,", 50, 355);
  text("click 'see your collection'", 175, 375);
  
  
  if (caught) {
    showFish(rand1);
  }
  
}

function aboutScreen() {
  textFont(font2);
  textSize(50);
  text("About the Game", 25, 100);
  textFont(font3);
  textSize(20);
  text("pond power! is a fun and informative fishing game made for", 25, 150);
  text("learning a little bit about fish. as an artist I'm interested", 25, 175);
  text("in exploring biodiversity, and this is an introductory way to", 25, 200);
  text("express that interest. while still navigating my own", 25, 225);
  text("relationship with the natural world and discovering how", 25, 250);
  text("I can enhance that exploration in my work, pond power!'s", 25, 275);
  text("lighthearted feel helps open this theme to the user,", 25, 300);
  text("and give them an entertaining game at the same time", 25, 325);
}

function collectionScreen() {
  fishCount = 0;
  noStroke();
  fill('#f2e3bb');
  rect(25, 25, 550, 350, 50);
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      fill(150);
      rect((j * 100) + 55, (i * 80) + 55, 91, 52);
      fill(0);
      textSize(15);
      textFont(font1);
      text("???", (j * 100) + 88, (i * 80) + 87);
      
      if (fishCollection[fishCount]) {
        image(fishes[fishCount], (j * 100) + 55, (i * 80) + 55, 91, 52);
      }
      
      fishCount++;
    }
  }
  
  if (displayFish) {
    showFish(fish);
    console.log("oy");
  } else {
    xBut = false;
  }
  
}

//button press functions
function goFishing() {
  fishing = true;
  caught = false;
}

function goHome() {
  homePage = true;
  fishingPage = false;
  characterPage = false;
  fishing = false;
  caught = false;
  aboutPage = false;
  collectPage = false;
  button1.hide();
}

function goToThePond() {
  homePage = false;
  fishingPage = true;
  characterPage = false;
  fishing = false;
  caught = false;
  aboutPage = false;
  collectPage = false;
  button1.show();
}

function goCharacter() {
  homePage = false;
  fishingPage = false;
  characterPage = true;
  fishing = false;
  caught = false;
  aboutPage = false;
  collectPage = false;
  button1.hide();
  
}

function goToAbout() {
  homePage = false;
  fishingPage = false;
  characterPage = false;
  fishing = false;
  caught = false;
  aboutPage = true;
  collectPage = false;
  button1.hide();
}

function goToCollection() {
  homePage = false;
  fishingPage = false;
  characterPage = false;
  fishing = false;
  caught = false;
  aboutPage = false;
  collectPage = true;
  button1.hide();
}

function mousePressed() {
  //for shirt color
  if (
    mouseX >= 275 &&
    mouseX <= 425 &&
    mouseY <= 295 &&
    mouseY >= 205 &&
    characterPage
  ) {
    a = random(256);
    b = random(256);
    c = random(256);
  }
  
  //for x on fish page
  if (
    mouseX >= 520 &&
    mouseX <= 545 &&
    mouseY <= 75 &&
    mouseY >= 50 &&
    (caught || displayFish)
  ) {
    caught = false;
    displayFish = false;
    console.log("Er");
  }
  
  //for displaying caught fish info
  if (mouseY >= 55 && mouseY <= 107 && collectPage && !xBut) {
    if (mouseX >= 55 && mouseX <= 146 && fishCollection[0]) {
      fish = 0;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 155 && mouseX <= 246 && fishCollection[1]) {
      fish = 1;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 255 && mouseX <= 346 && fishCollection[2]) {
      fish = 2;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 355 && mouseX <= 446 && fishCollection[3]) {
      fish = 3;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 455 && mouseX <= 546 && fishCollection[4]) {
      fish = 4;
      displayFish = true;
      xBut = true;
    }
    console.log("a");
  } else if (mouseY >= 135 && mouseY <= 187 && collectPage && !xBut) {
    if (mouseX >= 55 && mouseX <= 146 && fishCollection[5]) {
      fish = 5;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 155 && mouseX <= 246 && fishCollection[6]) {
      fish = 6;
      displayFish = true;
      xBut = true;  
    } else if (mouseX >= 255 && mouseX <= 346 && fishCollection[7]) {
      fish = 7;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 355 && mouseX <= 446 && fishCollection[8]) {
      fish = 8;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 455 && mouseX <= 546 && fishCollection[9]) {
      fish = 9;
      displayFish = true;
      xBut = true;
    }
    console.log("b");
  } else if (mouseY >= 215 && mouseY <= 267 && collectPage && !xBut){
    if (mouseX >= 55 && mouseX <= 146 && fishCollection[10]) {
      fish = 10;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 155 && mouseX <= 246 && fishCollection[11]) {
      fish = 11;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 255 && mouseX <= 346 && fishCollection[12]) {
      fish = 12;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 355 && mouseX <= 446 && fishCollection[13]) {
      fish = 13;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 455 && mouseX <= 546 && fishCollection[14]) {
      fish = 14;
      displayFish = true;
      xBut = true;
    }
    console.log("c");
  } else if (mouseY >= 295 && mouseY <= 347 && collectPage && !xBut) {
    if (mouseX >= 55 && mouseX <= 146 && fishCollection[15]) {
      fish = 15;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 155 && mouseX <= 246 && fishCollection[16]) {
      fish = 16;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 255 && mouseX <= 346 && fishCollection[17]) {
      fish = 17;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 355 && mouseX <= 446 && fishCollection[18]) {
      fish = 18;
      displayFish = true;
      xBut = true;
    } else if (mouseX >= 455 && mouseX <= 546 && fishCollection[19]) {
      fish = 19;
      displayFish = true;
      xBut = true;
    }
    console.log("D");
  }
} 

function keyPressed() {
  if (keyCode === RIGHT_ARROW && characterPage) {
    if (hatNumber == 3) {
      hatNumber = 0;
    } else {
      hatNumber++;
    }
  }
  
  if (keyCode === LEFT_ARROW && characterPage) {
    if (hatNumber == 0) {
      hatNumber = 3;
    } else {
      hatNumber--;
    }
  }
}
