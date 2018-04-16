let blockLoc;
const topAreaWidth = 250;
const topAreaHeight = 100;
const livesAreaWidth = 600;
const livesAreaHeight = 20;
const bottomAreaWidth = 800;
const bottomAreaHeight = 300;
let userName;

function startGame() {
    player = new Player(playerDim, playerDim, 'blue', bottomAreaWidth / 2, bottomAreaHeight / 2);

    document.getElementById("myForm").style.display = "none";

    livesArea.start();
    bottomArea.start();
    topArea.start();
    blockLoc = bottomArea.bottomcanvas.width / 3;
}

function saveScore(){
    console.log("Saving result");
    $.post("userInfo.php",
        {
            name: userName,
            score: bottomArea.frameNumber / 10,
        }
    )
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

