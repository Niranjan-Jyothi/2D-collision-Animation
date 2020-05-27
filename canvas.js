
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}
function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
let particles=[]



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#604444', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class particle {
  constructor(x, y, radius, color) {
    this.v = {
      x : (Math.random()-0.5)*2,
      y : (Math.random()-0.5)*2
    }

      this.m = 2;
    this.x = x
    this.y = y
    this.r = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.stroke()
  }

  update(particles) {   this.draw();

     if (this.x-this.r<=0 || this.x+this.r>=innerWidth){
       this.v.x= -this.v.x;
       console.log("at width edge");
     }
     if (this.y-this.r<=0 || this.y+this.r>=innerHeight){
       this.v.y= -this.v.y;
       console.log("at height edge");
     }

    this.x+=this.v.x; this.y+=this.v.y;
  }
}

// Implementation

function init() {
  particles = []
console.log("i am at init start");
  for (let i = 0; i < 300; i++) {
    const r=15;
    let x=randomIntFromRange(r,canvas.width-r);
    let y=randomIntFromRange(r,canvas.height-r);
    let color = randomColor(colors);

    if (i!=0){
       for (let j=0;j<particles.length;j++) {
         if ((distance(x,y,particles[j].x,particles[j].y)-r*2)<0){
            x=randomIntFromRange(r,canvas.width-r);
             y=randomIntFromRange(r,canvas.height-r);
             j=-1;
         }
       }
        }
        let aparticle = new particle(x,y,r,color)
        particles.push(aparticle)
        }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)


   particles.forEach(particle => {
   particle.update(particles)
   })
}

init()
 animate()
