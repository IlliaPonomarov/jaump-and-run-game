
var frame = document.getElementById("frame");
var graph = frame.getContext("2d");


graph.imageSmoothingEnabled = false;



//============================
//          MODEL
//============================


let fps = 60;
var chceck_i = 0;
var speed1 = 6;
var points = 0;
var scoreTime = 0;
var trapAnim = [];
var monkeyAnim = [];
var spawnTime = 0;
var animationTime = 0;
var monkeyFrame = 0;
var trapFrame = 0;
var traps = [];
var backImage = new Image();
var replayImage = new Image();

monkeyAnim[0] = new Image();
monkeyAnim[1] = new Image();
monkeyAnim[2] = new Image();
monkeyAnim[3] = new Image();
monkeyAnim[4] = new Image();

monkeyAnim[0].src = "img/monkey2.png";
monkeyAnim[1].src = "img/monkey4.png";
monkeyAnim[2].src = "img/monkey2.png";
monkeyAnim[3].src = "img/monkey4.png";
monkeyAnim[4].src = "img/monkeyTest.png";



trapAnim[0] = new Image();
trapAnim[1] = new Image();
trapAnim[2] = new Image();
trapAnim[3] = new Image();
trapAnim[4] = new Image();

trapAnim[0].src = "img/trapHD1.png";
trapAnim[1].src = "img/trapHD1.png";
trapAnim[2].src = "img/trapHD3.png";
trapAnim[3].src = "img/trapHD3.png";
trapAnim[4].src = "img/trapHD1.png";






var mainPlatf1 = {
    x: 0,
    y: 400,
    size: 2313,
    speed: 6,
    image: new Image()
};

var mainPlatf2 = {
    x: 2314,
    y: 400,
    size: 1155,
    speed: 6,
    image: new Image()
};

var banana = {
    xPosition: 1032,
    yPosition: 125,
    size: 32,
    xSpeed: 4,
    ySpeed: 12,
    image: new Image()
};

function trap(x){

    this.x = x;
    this.y = (400-64);
    this.size = 64;
    this.speed = speed1;
    this.image = new Image();
}


var monkey = {

    xPosition: 400,
    yPosition: 350,
    size: 64,
    jump: false,
    fall: true,
    maxJumpSpeed: 0,
    jumpOrgValue: 12,
    jumpSpeed: 12,
    jumpAcceleration: 0.3,
    fallSpeed: 0,
    fallAcceleration: 0.6,
    alive: true,
    image: new Image(),

};


mainPlatf1.image.src = "img/mainPlatform1.png";
banana.image.src = "img/banana.png";
mainPlatf2.image.src = "img/mainPlatform1.png";
backImage.src = "img/test2344444444444444444444.PNG";

function update(){
        draw();

    if(monkey.alive){
        updMonkey();
        updMainPlatf();
        updBanana();
        updateTraps();
        BtnChkCollision();
        monkeyChkCollision();
        trackTime();
    }
}


function updBanana(){
    if(banana.yPosition <= 125){
        banana.ySpeed = 2;
    }
    if(banana.yPosition >= 275){
        banana.ySpeed = - 2;
    }
    if(banana.xPosition + banana.size < 0){
        banana.xPosition = 1400;
    }
    banana.xPosition -= banana.xSpeed;
    banana.yPosition += banana.ySpeed;
}

function BtnChkCollision(){
    if(monkey.yPosition + monkey.size >= mainPlatf1.y){
        monkey.yPosition = mainPlatf1.y - monkey.size;
        monkey.fall = false;
        monkey.fallSpeed = 0;
        monkey.jumpSpeed = monkey.jumpOrgValue;
    }
}

function monkeyChkCollision(){
    var reduct = 10;
    for(i = 0; i < traps.length; i++){
        var trapTst = traps[i];
        if( monkey.xPosition + monkey.size - reduct >trapTst.x + reduct  &&
            trapTst.x + trapTst.size - reduct > monkey.xPosition + reduct &&
            trapTst.y + reduct < monkey.yPosition + monkey.size - reduct &&
            trapTst.y + trapTst.size - reduct > monkey.yPosition + reduct){
            monkey.alive = false;
        }
    }
    reduct = 5;
    if(banana.xPosition + reduct < monkey.xPosition + monkey.size - reduct &&
        banana.xPosition + banana.size - reduct > monkey.xPosition + reduct &&
        banana.yPosition + reduct < monkey.yPosition + monkey.size - reduct &&
        banana.yPosition + banana.size - reduct > monkey.yPosition + reduct){
        banana.xPosition = 1100;
        points += 10;
    }
}

function updMonkey(){
    if(monkey.jump){
        if(monkey.jumpSpeed > monkey.maxJumpSpeed){
            monkey.yPosition -= monkey.jumpSpeed;
            monkey.jumpSpeed -= monkey.jumpAcceleration;

        }
        else{
            monkey.jumpSpeed = monkey.jumpOrgValue;
            monkey.jump = false;
            monkey.fall = true;
        }
    }
    else if(monkey.fall){
        monkey.yPosition += monkey.fallSpeed;
        monkey.fallSpeed += monkey.fallAcceleration;
    }
}

function generateOfTraps(){
    var numTraps = Math.floor(Math.random() * 3);
    switch(numTraps){
        case 0:
            traps.push(new trap(frame.width));
            break;
        case 1:
            traps.push(new trap(frame.width));
            traps.push(new trap(frame.width + 70));
            break;
        case 2:
            traps.push(new trap(frame.width));
            traps.push(new trap(frame.width + 70));
            traps.push(new trap(frame.width + 140));
            break;
    }
}
function updateTraps(){
    if(spawnTime == 100){
        generateOfTraps();


        spawnTime = 0;
    }
    spawnTime ++;
    setInterval(function (){traps.speed+=0.5},1000);

    for(i = 0; i < traps.length; i++){

        if(traps[i].x + traps[i].size < 0){
            traps.splice(i, 1);

        }
        traps[i].x -= traps[i].speed;
    }
}

function updMainPlatf(){
    if(mainPlatf1.x + mainPlatf1.size < 0){
        mainPlatf1.x = mainPlatf2.x + mainPlatf2.size;
    }
    if(mainPlatf2.x + mainPlatf2.size < 0){
        mainPlatf2.x = mainPlatf1.x + mainPlatf1.size;
    }
    mainPlatf1.x -= mainPlatf1.speed;
    mainPlatf2.x -= mainPlatf2.speed;
}




function trackTime(){
    if(animationTime == 6){
        funcMonkeyrAnimation();
        TrapAnimationMng();
        animationTime = 0;
    }
    if(scoreTime == 100){
        points ++;

        scoreTime = 0;
    }
    animationTime ++;
    scoreTime ++;
}

function funcMonkeyrAnimation(){
    if(monkey.jump){
        monkey.image = monkeyAnim[3];

    }
    else if(monkey.fall){
        monkey.image = monkeyAnim[3];
    }
    else{
        monkey.image = monkeyAnim[monkeyFrame];
        monkeyFrame ++;
        if(monkeyFrame > monkeyAnim.length - 1){
            monkeyFrame = 0;
        }
    }
}

function TrapAnimationMng(){
    for(i = 0; i < traps.length; i++){
        traps[i].image = trapAnim[trapFrame];
    }
    trapFrame ++;
    setInterval(function (){speed1+=0.01},5000)
    if(trapFrame > trapAnim.length - 1){
        trapFrame = 0;
    }
}

function restart(){
    monkey.alive = true;
    banana.xPosition = 1032;
    points = 0;
    traps = [];
}

function click(){
    if(monkey.alive){
        if(!monkey.jump && !monkey.fall){
            monkey.jump = true;
        }
    }
    else{
        restart();
        firstTrap = true;
    }
}