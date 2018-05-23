function startGame(){
    document.getElementById("myForm").style.display = "none";
    io.keysSet = true;
    gameArea.start();
    gm.gameLoop();
}



