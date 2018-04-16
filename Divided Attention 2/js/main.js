let levelString;

function startGame() {
    document.getElementById("myForm").style.display = "none";

    // livesArea.start();
    // bottomArea.start();
    // topArea.start();
    if (levelString) {
        gameArea.start();
        gm.gameLoop();
    }
}

