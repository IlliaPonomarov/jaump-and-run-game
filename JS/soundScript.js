document.getElementById("audio-btn").onclick = function ()
{
    var myaudio = document.getElementById("myaudio");


    if (myaudio.paused === true) {

        document.getElementById("myaudio").play();
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