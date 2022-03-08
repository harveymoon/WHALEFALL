var Wimg;
var Bimg;
var timer = 0;
var particles = [];

var pos = 0.5;
var whalePos = -250;

var bgImg;

var viewState = 0;

var poem = [
["The mighty leviathan,"],
["King of the seas,"],
["Has been reduced to"],
["A carcass on the floor."],
["They cut it open,"],
["knives slicing through"],
["The blubber and the meat,"],
["Their greed insatiable."],
["They take what they can,"],
["Leaving nothing behind,"],
["Until there is nothing left"],
["But a skeleton of once was."],
["The whale is gone,"],
["Its resources plundered,"],
["And now it lies as bones"],
["In the depths of the ocean."]]


  
var fontRegular;
function preload() {
  fontRegular = loadFont('font/Rajdhani-Light.ttf');
  Wimg = loadImage("img/whalefall_01-2@0.25x.png");
  Bimg = loadImage("img/whalefall_01bones_.png");
}

function setGradient(c1, c2) {
  // noprotect
  bgImg.noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    inter += random() / 100 - random() / 50;
    var c = lerpColor(c1, c2, inter);
    bgImg.stroke(c);
    bgImg.strokeWeight(2)
    bgImg.line(0, y, width, y);
  }

  ammt = 5;

  bgImg.loadPixels();
  for (
    let l = 0;
    l < width * pixelDensity() * (height * pixelDensity()) * 4;
    l += 4
  ) {
    let c = map(random(), 0, 1, -ammt, ammt);
    (bgImg.pixels[l] = bgImg.pixels[l] + c),
      (bgImg.pixels[l + 1] = bgImg.pixels[l + 1] + c),
      (bgImg.pixels[l + 2] = bgImg.pixels[l + 2] + c),
      (bgImg.pixels[l + 3] = bgImg.pixels[l + 3] + c);
  }
  bgImg.updatePixels();
}
let imgCount = 0;

// function windowResized(){
//   resizeCanvas(windowWidth,windowHeight)
// }

function setup() {
  createCanvas(1280, 800);
  bgImg = createGraphics(width, height);

  c1 = color(0, 15, 40);
  c2 = color(0, 5, 20);
  setGradient(c1, c2);

  // imageMode(CENTER)
  convertImage();
  frameRate(15);
  noStroke();
}



function mouseWheel(event) {
  // print(pos);
  //move the square according to the vertical scroll amount
  pos += constrain(event.delta, -20, 20);
}

// let lastPic = 0;
function mousePressed() {
  save("img.png");
}

let drawCount = 0;

function draw() {
  image(bgImg, 0, 0, width, height);
  timer += 0.015;
drawCount++;

// if(drawCount < 500){

let drifty = map(constrain(drawCount,00,2000),0,2000,height+100,0)
let driftx = (100 + noise(drawCount/100, drifty)*10)

fill(186, 161, 48)
textSize(24);
  textFont(fontRegular)
  text('whalefall',100,drifty)
// }


  //   if(lastPic == 0){
  //     save(imgCount+'.jpg')
  //     lastPic = millis()
  //     imgCount++
  //   }

  //   if(millis()-lastPic > 10000){
  //     save(imgCount+'.jpg')
  //     lastPic = millis()
  //     imgCount++
  //   }
  // background(0);
  

  // let tintAmt = map(pos, 0, -10000, 255, 0);
  // tint(255, tintAmt); // Apply transparency without
  

  if (whalePos != pos) {
    whalePos += constrain( (pos - whalePos) / 50, -1.2,1.2);
  }

  if(whalePos > 0){
    if(viewState == 0){
      viewState++
      console.log("viewState : " + viewState)
    }
   
    pos = height-400

  }
  // pos += 0.1;
  image(Bimg, width / 2 - Bimg.width / 2,  whalePos);

  push();
  translate(width / 2 - Bimg.width / 2,  whalePos);
   
    showParticles();
  
  pop();
}

function convertImage() {
  for (let xx = 0; xx < Wimg.width; xx++) {
    for (let yy = 0; yy < Wimg.height; yy++) {
      let Chere = Wimg.get(xx, yy);
      if (Chere[0] != 0) {
        particles.push(new particle(xx, yy, Chere));
      }
    }
  }
}

function showParticles() {
  for (p in particles) {
    let pNow = particles[p];
    pNow.drawIt();
  }
}

class particle {
  constructor(x, y, colorHere) {
    this.loc = createVector(x, y);
    this.color = color(colorHere[0], colorHere[1], colorHere[2]);
    this.timer = random(-5000, -500);
  }

  drawIt() {
    this.timer++;
    if(this.timer > 1000){
      return
    }

    fill(this.color);
    rect(this.loc.x * 4, this.loc.y * 4, 4.5, 4.5);
    if (this.timer > 10) {
      this.loc.y -= 0.15;
      this.loc.x += (noise(this.loc.x / 25, this.loc.y / 25) - 0.5) / 2;
    }
  }
}
