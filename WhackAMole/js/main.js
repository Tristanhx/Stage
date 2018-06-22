function startGame(){
    document.getElementById("myForm").style.display = "none";
    io.keysSet = true;
    gameArea.start();
    gm.gameLoop();
}

function toRadians(deg) {
    return deg * Math.PI / 180
}


