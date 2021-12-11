
//============================
//          VIEW
//============================


function draw(){
    graph.clearRect(0, 0, frame.width, frame.height);
    graph.drawImage(backImage, 0, 0, frame.width, frame.height);
    graph.drawImage(mainPlatf1.image, mainPlatf1.x-200, mainPlatf1.y+100,3000,150);
    graph.drawImage(mainPlatf2.image, mainPlatf2.x, mainPlatf2.y+100,3000,150);
    graph.drawImage(banana.image, banana.xPosition-60, banana.yPosition+75);

    graph.drawImage(monkey.image, monkey.xPosition - 60, monkey.yPosition + 75);
    graph.font = "bold 40px Comic Sans MS";
    graph.fillStyle = "yellow";
    graph.textAlign = "center";
    graph.fillText(points, frame.width / 2, 100);
    console.log(points)


    drawTraps();
    if(!monkey.alive){
        window.location.href = "gameover.html";
    }

}

function drawTraps(){
    for(var i = 0; i < traps.length; i++){
        graph.drawImage(traps[i].image, traps[i].x, traps[i].y+100, 100,100);
    }
}
