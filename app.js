//img
let aimIMG = new Image;
let holeIMG = new Image;
let holeIMGred = new Image;
let landscapeIMG = new Image;

aimIMG.src = './img//1.png';
holeIMG.src = './img/hole.png';
holeIMGred.src = './img/bullet-holes-red.png';
landscapeIMG.src = './img/landscape.png';
//sound gun
let shootingSound = new Audio("./sound/gun-gunshot-02.mp3");

//var
let score = 0;
let holeSec = 2000;
let holesArr = [];
let birdsArr = [];
let birdSize = 100;

//arr image of birds
let birdImgArr = [];

let birdIMG = new Image;
birdIMG.src = './img/bird.png';

let birdIMG2 = new Image;
birdIMG2.src = './img/bird2.png';

let birdIMG3 = new Image;
birdIMG3.src = './img/bird3.png';

birdImgArr.push(birdIMG);
birdImgArr.push(birdIMG2);
birdImgArr.push(birdIMG3);

function  randomBirdImg() {
    let num = Math.floor(Math.random() * birdImgArr.length);
    console.log(birdImgArr[num])
    return birdImgArr[num];
}




// canvas init
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let c = canvas.getContext("2d");

//mouse
let mouse = {
    x: 0 ,
    y: 0 
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX,
    mouse.y = event.clientY
});

addEventListener('click', () => {

    let hole = new Hole(mouse.x,mouse.y);
    //check if bird is dead
    shootingSound.play();
    checkShooting(hole);
    holesArr.push(hole);
    
});


class Hole {
    constructor(x,y){
        this.x = x,
        this.y = y
    }
    visibility = true;
    israd = false;
    time = setTimeout(() => {
        this.visibility = false;
    }, holeSec);
}


//bird
class Bird {
    constructor(x,y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    isAlive = true; 
    //random speed 1-8
    xd = Math.random() * 4;
    yd = Math.random() * 4;

    update = function () {
        if(this.y > 216 || this.y < 0){
            this.yd = -this.yd;
        }

        if(this.x >= canvas.width){
            this.xd = -this.xd;
        }

        this.x += this.xd;
        this.y += this.yd;
    }

}

setInterval(() => {
    let bird = new Bird( Xrandom(), randomIntFromRange(0, 216), randomBirdImg());
    birdsArr.push(bird); 
}, 5000);



function checkShooting(hole){
    if(birdsArr.length >= 1){
        for(let b =0; b < birdsArr.length; b++) {
            if(birdsArr[b].isAlive) {
                if(hole.x <= birdsArr[b].x + birdSize && hole.x >= birdsArr[b].x) {
                    if(hole.y <= birdsArr[b].y + birdSize && hole.y >= birdsArr[b].y) {
                        hole.israd = true;
                        birdsArr[b].isAlive = false;
                        score++;

                    }
                }
            }
        }
    }
    
}
// Animation Loop
function animate () {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.drawImage(landscapeIMG, 0, 0,canvas.width,canvas.height);
    c.fillText(`targets: ${score}`, 10,10);
    c.drawImage(aimIMG, mouse.x -10, mouse.y -10,50,50);


    if(birdsArr.length >= 1) {
        for(let b = 0; b < birdsArr.length; b++){
            if(birdsArr[b].isAlive) {
                birdsArr[b].update();
                c.drawImage(birdsArr[b].img, birdsArr[b].x, birdsArr[b].y,birdSize,birdSize);
            }
            
        }
    }

    for(let i = 0; i < holesArr.length; i++) {
        if(holesArr[i].visibility) {
            if(holesArr[i].israd) {
                c.drawImage(holeIMGred, holesArr[i].x, holesArr[i].y,30,30);
            } else {
                c.drawImage(holeIMG, holesArr[i].x, holesArr[i].y,30,30);
            }
            
        }
    }

}
animate()



// for bird after shoot // fall to ground
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function  Xrandom() {
    const x = [0, canvas.width];
    let xd =  Math.floor(randomIntFromRange(0, x.length))
    if(xd === 2){
        xd = 1;
    }

    return x[xd]
}

