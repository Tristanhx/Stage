

function startGame(){
    document.getElementById("myForm").style.display = "none";
    score = {
        s1: [],
        fsequence_length: 8,
        s2: [],
        ssequence_length: 16,
        ran: []
    };
    io.keysSet = true;
    gameArea.start();
    gm.gameLoop();
}



