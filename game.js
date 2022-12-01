window.addEventListener('load', function() {
const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext("2d");
 canvas.width = 700;
 canvas.height = 500; 
 ctx.font = '20px Verdana';
  ctx.fillStyle = 'white'; 



 
  

  class Game {
    constructor(width, height){
      this.width = width;
      this.height = height;
      this.player = new Player(this)
      this.input = new Move();
      this.bg = new Background(this);
      this.obst1 = new Obstical1(this);
      this.obst2 = new Obstical2(this);
      this.wave = new Wave(this);
      this.plastic = new Plastic(this);
      this.obstArray = [];
      this.frames = 0;
      this.points = 10;
     
      
    }

  start(){ 
    this.obstArray = [];
    this.points = 10;
    this.interval = setInterval(animate, 10);

 
  /*   const canvas = document.getElementById('canvas'); */
  /*   const ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 500;
    ctx.font = '20px Verdana';
  ctx.fillStyle = 'white';  */
   /*  const startSurfing = document.getElementById('game-start');
    const restartSurfing = document.getElementById('ocean-over') */
    

    }

    clear(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    stop(){
      if (this.points === 0) {
      clearInterval(this.interval);
      ctx.fillText("OCEAN OVER", 280, 250)
     
    }

    if (this.points === 30) {
      clearInterval(this.interval);
      ctx.fillText("OCEAN WINNER", 280, 250)
    }

    }

    update(){
     // this.bg.update();
      this.player.update(this.input.keys);
      /* this.obst1.update(this.obst1); */
      /* this.obst2.update(this.obst2); */
     /*  this.wave.update(this.wave); */
      /* this.plastic.update(this.plastic); */
      /* this.score.update(this.score); */
     /*  ctx.fillText(`Score: ${this.points}`, 550, 40) */


      // multiple obst1
      this.frames += 0.5;
      for (let i = 0; i < this.obstArray; i++) {
        this.obstArray[i].x += 1;
        this.obstArray[i].update();
      };
      if (this.frames % 200 === 0) {
        console.log(this.obstArray);
        
        this.x = 0;
        this.obstArray.push(new Obstical1(this))
      } if (this.x >= this.width) {
        this.obstArray.unshift(Obstical1(this))
      }

      this.obstArray.forEach(obst1 => {
        obst1.update();
      });

      // multiple obst2
      for (let i = 0; i < this.obstArray; i++) {
        this.obstArray[i].x += 1;
        this.obstArray[i].update();
      };
      if (this.frames % 220 === 0) {
        console.log(this.obstArray);
        
        this.x = 0;
        this.obstArray.push(new Obstical2(this))
      }  if (this.x >= this.width) {
        this.obstArray.unshift(Obstical2(this))
      }

      this.obstArray.forEach(obst2 => {
        obst2.update()
      })

      // multiple waves
      for (let i = 0; i < this.obstArray; i++) {
        this.obstArray[i].x += 1;
        this.obstArray[i].update();
      };
      if (this.frames % 150 === 0) {
        console.log(this.obstArray);
        
        this.x = 0;
        this.obstArray.push(new Wave(this))
      }  if (this.x >= this.width) {
        this.obstArray.unshift(Wave(this))
      }

      this.obstArray.forEach(wave => {
        wave.update()
      })

      // multiple plastic
      for (let i = 0; i < this.obstArray; i++) {
        this.obstArray[i].x += 1;
        this.obstArray[i].update();
      };
      if (this.frames % 200 === 0) {
        console.log(this.obstArray);
        
        this.x = 0;
        this.obstArray.push(new Plastic(this))
      } if (this.x >= this.width) {
        this.obstArray.unshift(Plastic(this))
      }

      this.obstArray.forEach(plastic => {
        plastic.update()
      })

    }




   draw(context){
      this.bg.draw(context);
      this.player.draw(context);
      /* this.obst1.draw(context); */
     /*  this.obst2.draw(context); */
     /*  this.wave.draw(context); */
      /* this.plastic.draw(context); */
      /* this.score.draw(context); */

      // draw multiple obst.
   /*    for (let i = 0; i < this.obstArray; i++) {
        this.obstArray[i].x += 1;
        this.obstArray[i].draw(context); */

        this.obstArray.forEach(obst1 => {
          obst1.draw(context);
        })
      
      
     /*    this.obstArray.forEach(obst2 => {
          obst2.draw(context);
        })


        this.obstArray.forEach(wave => {
          wave.draw(context);
        })

        this.obstArray.forEach(plastic => {
          plastic.draw(context);
        }) */

        ctx.fillText(`Score: ${this.points}`, 550, 40)
        
   
    }
}
  class Player {
    constructor(game) {
      this.game = game;
      this.width = 100;
      this.height = 90;
      this.x = 350;
      this.y = 200;
      this.vy = 0;
      this.image = document.getElementById('surfer');
      this.speed = 0;
      this.maxSpeed = 1;
      
    }

      update(input){
       this.collision()

       this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed; 
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
      
        this.y += this.vy;
        if (input.includes('ArrowUp')) this.vy -= 0.1;
        else if (input.includes('ArrowDown')) this.vy += 0.1;
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

      } 

      draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      }

collision(){
        this.game.obstArray.forEach(obst1 => {
       if (
        obst1.x < this.x + this.width &&
        obst1.x + obst1.width > this.x &&
        obst1.y < this.y + this.height &&
        obst1.height + obst1.y > this.y
      ) {
          // Collision detected!
         
          if (obst1.id === 'plastic' ||
              obst1.id === 'wave'
          ){
            this.game.points += 5;
          }
          if (obst1.id === 'surfer1' ||
              obst1.id === 'surfer2'
          ){
            this.game.points -= 5;
          }
          this.game.obstArray.splice(this.game.obstArray.indexOf(obst1), 1)
        }
        }) 
      
      } 

    }


class Move {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' 
          ) && this.keys.indexOf(e.key) === -1){
        this.keys.push(e.key);
      }
      console.log(e.key, this.keys);

    });
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight') {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(e.key, this.keys);
    })

  }
}



class Background {
  constructor(game){
    this.game = game;
    this.width = 900;
    this.height = 700;
   this.x = 0;
    this.y = 0;
    this.bgImage = document.getElementById('background');
   
  }
 

  draw(context){
    context.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
   // context.drawImage(this.bgImage, this.x + this.width, this.y, this.width, this.height);
   
  }
}

// surfer1
class Obstical1 {
  constructor(game){
    this.game = game;
    this.width = 80;
    this.height = 70;
    this.x = 50;
    this.y = Math.random() * canvas.height - this.height;
    this.x = 0;
    this.obstImage1 = document.getElementById('surfer1');
    this.id = 'surfer1';
    /* this.obstArray = []; */

  

  }
  update(){
    this.x += 0.1;

}
  draw(context){
    context.drawImage(this.obstImage1, this.x, this.y, this.width, this.height);
}
 
  }

// surfer2
class Obstical2 {
  constructor(game){
    this.game = game;
    this.width = 80;
    this.height = 70;
    this.x = 40;
    this.y = Math.random() * canvas.height - this.height;
    this.obstImage2 = document.getElementById('surfer2');
    this.id = 'surfer2';

  }
  update(){
    this.x += 0.3;
  }

  draw(context){
    context.drawImage(this.obstImage2, this.x, this.y, this.width, this.height);
}
}

class Wave {
  constructor(game){
    this.game = game;
    this.width = 80;
    this.height = 70;
    this.x = 0;
    this.y = Math.random() * canvas.height - this.height;
    this.waveImage = document.getElementById('wave');
    this.id = 'wave';

  }

  update(){
    this.x += 0.2;
  }

  draw(context){
    context.drawImage(this.waveImage, this.x, this.y, this.width, this.height);
  }

}

class Plastic {
  constructor(game){
    this.game = game;
    this.width = 80;
    this.height = 70;
    this.x = 20;
    this.y = Math.random() * canvas.height - this.height;
    this.plasticImage = document.getElementById('plastic');
    this.id = 'plastic';

  }
  update(){
    this.x += 0.1;
  }

  draw(context){
    context.drawImage(this.plasticImage, this.x, this.y, this.width, this.height);
  }

}

/* class Score {
  constructor(game){ 
  this.game = game;
  this.points = 10;
  this.font = '18 px serif';
  this.fillStyle = 'darkblue';
  this.context.fillText(`Score: ${this.points}`, 500, 40)

}
// score logic
update(){
   */

/*   if obst1 and obst2 = - 5
  if wave = + 5
  if plastic = + 10 */






  function animate(){
    /* ctx.clearRect(0, 0, canvas.width, canvas.height); */
    game.clear()
    game.update();
    game.draw(ctx);
    game.stop();

 

   
    
   

  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  document.getElementById('button-start').addEventListener('click', function() { game.start();})
  document.getElementById('restart-button').addEventListener('click', function() { game.start();})


 }); 




/* const myGameArea = {
  canvas: document.getElementById('canvas'),
  frames: 0,

  start: function () {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
   
    const oceanImg = new Image();
    oceanImg.src ='./images/background.png'
    oceanImg.onload = () => {
      context.drawImage(oceanImg, 0, 0)
    }

    this.interval = setInterval(updateGameArea, 20);
  },

  clear: function () {
  this.context.clearRect(0, 0, this.width, this.height);
},

stop: function () {
  clearInterval(this.interval);
},
};


class gameSurfer {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  update() {

    const ctx = myGameArea.context;
  }


 */
/* class myGameArea {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.frames = 0;
  }

drawBackground() {
  const oceanImg = new Image();
  oceanImg.src ='../images/background.png'
  oceanImg.onload = () => {
    context.drawImage(oceanImg, 0, 0)
  }
}
startGame() {
  this.interval = setInterval(updateGameArea, 20);
}

clearGameArea() {
  this.context.clearRect(0, 0, this.width, this.height);
}
}

const oceanGame = new myGameArea();

class gameSurfer {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
} */


