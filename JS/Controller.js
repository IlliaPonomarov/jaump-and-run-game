

//============================
//        CONTROLLER
//============================

var time = 1000;

function btMusic(){
    var audio = document.createElement('audio');
    audio.setAttribute("autoplay","true");
    audio.innerHTML = "<source src=\"../audio/Music_When_TheGame_Is_Running.mp3\" type=\"audio/mp3\">";
    document.body.appendChild(audio);
}

document.getElementById("audio-btn").onclick = function ()
{
    var myaudio = document.getElementById("myaudio");
    if (myaudio.paused === true) {
        document.getElementById("myaudio").play();
        document.getElementById("myaudio").volume = 0.2;
        this.style.backgroundColor = 'purple';
        this.style.color = 'White';
    }
    else if (myaudio.paused === false)
    {
        document.getElementById("myaudio").pause();
        this.style.backgroundColor = "mediumpurple";
        this.style.color = "Black"

    }
}

document.addEventListener("keydown", click);
setInterval(update,(time--)/fps );
