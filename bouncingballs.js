
let numBalls;
let spring = 0.05;
let gravity = 0.0;
let friction = -0.9;
let balls = [];


    
function setup() {
    var canvasDiv = document.getElementById('aboutCanvas');
 
    var width = canvasDiv.offsetWidth;
    var sketchCanvas = createCanvas(width,windowHeight);
    console.log(sketchCanvas);
    sketchCanvas.parent("aboutCanvas");

    if(width<750){
        numBalls = 10;
    }else{
        numBalls = 20;
    }



  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      i,
      balls
    );
  }
  noStroke();
  

}

function draw() {
  background(0);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}

class Ball {
  constructor( idin, oin) {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2,2);
    this.vy =random(-2,2);
    this.diameter = random(30, 70);
    this.id = idin;
    this.others = oin;
    this.r =random(255);
    this.g =random(255);
    this.b =random(255);

    
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    fill(this.r,this.g,this.b);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
