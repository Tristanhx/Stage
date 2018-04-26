function start(){
    document.getElementById("myForm").style.display = "none";

    gameArea.start();
    LC.runLoop = true;
    LC.loop();
}