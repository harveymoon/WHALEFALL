var Wimg;
var Bimg;
var timer = 0;
var particles = [];

var pos = 2;
var whalePos = -250;
var sliderPos = 0;

var bgImg;

var viewState = 0;

var timeData;

var sliderOffsetY = -100;


var poem = [
  ["whalefall"],
  ["the mighty leviathan"],
  ["king of the seas"],
  ["has been discarded"],
  ["a giant carcass"],
  ["they cut it open"],
  ["knives slicing through"],
  ["the blubber, oil and meat"],
  ["miraculous plenty"],
  ["they take whatever they can"],
  ["leaving nothing behind"],
  ["but a skeleton of what once was"],
  ["the whale is no longer"],
  ["its life plundered"],
  ["and now, just bones"],
  ["in the empty ocean"]
]

var poemLines = []
  
var fontRegular;

function preload() {
  fontRegular = loadFont('font/Rajdhani-Light.ttf');

if(random()>.5){
  Wimg = loadImage("img/whalefall_01-2@0.25x.png");
  Bimg = loadImage("img/whalefall_01bones_.png");
}else{
Wimg = loadImage("img/v2_post@0.25x.png");
   Bimg = loadImage("img/v2_bonez.png");
}


   
  timeData = loadJSON("timeData.json")
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
  noSmooth()
  pixelDensity(2);
  // smooth()

  bgImg = createGraphics(width, height);

  c1 = color(0, 15, 40);
  c2 = color(0, 5, 20);
  setGradient(c1, c2);

  // imageMode(CENTER)
  convertImage();
  frameRate(15);
  noStroke();
  textWrap(WORD);

  for(let pl = 0; pl < poem.length; pl++){
    let newLine = new PoemFlow(poem[pl], pl)
    poemLines.push(newLine )
  }

  poemLines[0].color = color(186, 161, 48)

  sliderOffsetY = -(200*(year()-2000))+1000;
  console.log(sliderOffsetY)

}


function drawTickers(){

  if(drawCount<1200){
    return
  }

let lineOpac = int(map(constrain(drawCount,1200,1500),1200,1500,0,200));
let textOpac = int(map(constrain(drawCount,1400,1900),1400,1900,0,200));

// let lineOpac = 255
// let textOpac = 255


textSize(14)
for(let lineN = 0; lineN <200; lineN++){
  if(lineN%2 == 0){
  stroke(200, lineOpac)
  strokeWeight(.5)
  line(width-68, lineN*100, width, lineN*100)
  noStroke()
  fill(200, textOpac)
  textAlign(LEFT);
  yearN = 2000+floor(lineN/2)
  // print(yearN)

  text(str(yearN), width-68, (lineN*100) +textAscent())
  textAlign(RIGHT);
  if(timeData[str(yearN)]!=null){
  text(timeData[str(yearN)][0]['title'], width-63-160, (lineN*100) + (textAscent()*3), 160)
  }

  }else{
    stroke(200, lineOpac)
    strokeWeight(.5)
    line(width-24, lineN*100, width, lineN*100)

    if(timeData[str(yearN)]!=null){
      if(timeData[str(yearN)].length>1){
        noStroke();
        fill(200, textOpac)
        text(timeData[str(yearN)][1]['title'], width-63-160, (lineN*100) + (textAscent()*3), 160)
      }
    }
  }
  }
}

function mouseWheel(event) {
  // print(pos);
  //move the square according to the vertical scroll amount
  if(viewState>0){
     pos += constrain(event.delta, -50, 50);
  
if(pos < sliderOffsetY){
  pos = sliderOffsetY
  }
}

 
}

// let lastPic = 0;
// function mousePressed() {
//   save("img.png");
// }

let drawCount = 0;

function draw() {
  image(bgImg, 0, 0, width, height);
  timer += 0.015;
  drawCount++;


// if( drawCount < 1000){
//     let drifty = map(constrain(drawCount,00,2000),0,2000,height+100,0)
//     let driftx = (100 + noise(drawCount/1000, drifty/1000)*100)

//     let opacT = constrain(drawCount,300,1000)
//     opacT = map(opacT, 300,1000, 200,0)

//     fill(186, 161, 48, opacT)
//     textSize(24);
//     textFont(fontRegular)
//     text('whalefall',100+driftx,drifty)
// }
  
textSize(24);
textFont(fontRegular)

for (let pl = 0; pl < poemLines.length; pl++) {
  let element = poemLines[pl];
  if(element.PoemLine){
    poemLines[pl].drawMove();
  }
}


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

let sliderGo = constrain(pos, sliderOffsetY, 100000)

    if (sliderPos != sliderGo) {
    sliderPos += (sliderGo - sliderPos) / 15;
  }


let WhaleGo = constrain(pos, -100, height-150)
if(viewState== 0){
  WhaleGo = pos;
}


  if (whalePos != WhaleGo) {
    whalePos += constrain( (WhaleGo - whalePos) / 250, -1,1);
  }




  if(drawCount > 900 && viewState == 0){
       pos = height-400
      viewState++
      console.log("viewState : " + viewState)
    }

  // pos += 0.1;
  image(Bimg, width / 2 - Bimg.width / 2,  whalePos);

  push();
  translate(width / 2 - Bimg.width / 2,  whalePos);
  noStroke();
  showParticles();
  pop();

push()
translate(0, -sliderPos+sliderOffsetY)
 drawTickers()
 pop()

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
    this.timer = random(-15000, -500);
  }

  drawIt() {
    rectMode(CENTER)
    this.timer++;

    if(this.timer > 5000){
      return
    }

    fill(this.color);
    push()
    translate(this.loc.x * 4, this.loc.y * 4)
    let rotAmt = noise(this.loc.x/1000, this.loc.y/1000)*360
    rotAmt *= map(constrain(this.timer,0,500),0,500,0,1)
    rotate(rotAmt)
    rect(0,0, 4.5, 4.5);
    pop()
    if (this.timer > 10) {
      this.loc.y -= 0.075;
      this.loc.x += (noise(this.loc.x / 25, this.loc.y / 25) - 0.5) / 4;
    }
  }
}


class PoemFlow{
  constructor(textLine, idx){
    this.index = idx;
    this.PoemLine = textLine;
    this.color = color(255,255,255)
    this.locN = createVector(50, height);

    let shiftAmmt = random(350,450)
    this.range = [(idx)*shiftAmmt, ((idx)*shiftAmmt)+1000]
    
    if(idx = 0){
      this.range[0] = -200
      this.range[1] = 2500
    }
  }

  drawMove(){

    this.locN.y = map(constrain(drawCount,this.range[0],this.range[1]),this.range[0],this.range[1],height+100,0)
    this.locN.x = (20+ noise(drawCount/500, this.locN.y/500)*200)

    let opacH = map(constrain(drawCount,this.range[0],this.range[1]),this.range[0],this.range[1],255,0)
    opacH = int(opacH)
    // opacT = map(opacT, this.range[0],this.range[1], 255*.8, 0)
    // let opacT = 255;
    textSize(24)
    textAlign(LEFT)
    noStroke();
    // fill(red(this.color), green(this.color), blue(this.color) ,opacH)
    this.color.setAlpha(opacH)
    fill(this.color)
    // this.color.setAlpha(this.color.alpha-.5);
    text( this.PoemLine, this.locN.x, this.locN.y)
  }
}


class dataPoint{
  constructor(){

  }
}