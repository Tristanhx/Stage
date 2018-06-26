function startGame() {
    document.getElementById("myForm").style.display = "none";

    // livesArea.start();
    // bottomArea.start();
    // topArea.start();
    gameArea.start();
    gm.gameLoop();
}

function toRadians(deg) {
    return deg * Math.PI / 180
}