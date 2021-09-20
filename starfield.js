// Adapted from Daniel Shiffman's code
// from his starfield coding challenge on Coding Train (YouTube)
// Thanks Prof!!

let stars = [];
let speed;
let check =0;
function setup() { 
  var canvasDiv = document.getElementById('homeCanvas');
 
  var width = canvasDiv.offsetWidth;
  var sketchCanvas = createCanvas(width,windowHeight);
  console.log(sketchCanvas);
  sketchCanvas.parent("homeCanvas");
  for (let i = 0; i < 800; i++) {
    stars[i] = new Star();
  }
}
function is_touch_enabled() { 
  return ( 'ontouchstart' in window ) ||  
         ( navigator.maxTouchPoints > 0 ) || 
         ( navigator.msMaxTouchPoints > 0 ); 
} 

function draw() {
  background(0);
  if( is_touch_enabled() ) { 
    speed = random(1,10);
    // var container = document.getElementById('homeCanvas');
    // container.ontouchstart="faster()";
    // container.ontouchend="slower()";
  } 
  else { 
    if(mouseX < width/2-10){
      speed = map(mouseX, 0, width, 10, 0);
    }
    if(mouseX > width/2+10){
      speed = map(mouseX, 0, width, 0, 10);
    }
  } 
  
  translate(width / 2, height / 2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  };

  this.show = function() {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 16, 0);
    ellipse(sx, sy, r, r);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);
  };
}

