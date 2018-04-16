const maxLives = 10;
let lives = maxLives;
let lifeMeter;
let lifeMeterBg;


const livesArea = {
    livescanvas: document.createElement("canvas"),
    start: function(){
        this.livescanvas.width = livesAreaWidth;
        this.livescanvas.height = livesAreaHeight;
        this.livescanvas.style.border = "1px solid #00FF00";
        this.livescontext = this.livescanvas.getContext("2d");
        lifeMeterBg = new GameObject(livesAreaWidth, livesAreaHeight, 'red', 0, 0, this.livescontext);
        lifeMeter = new GameObject(livesAreaWidth, livesAreaHeight, 'green', 0, 0, this.livescontext);
        this.div = document.getElementById("livesArea");
        this.div.appendChild(this.livescanvas);
        this.interval = setInterval(updateLivesArea, 10);
    },
    clear: function(){
        this.livescontext.clearRect(0, 0, this.livescanvas.width, this.livescanvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
        this.livescanvas.width = 0;
        this.livescanvas.height = 0;
    }
};

function updateLivesArea() {
    livesArea.clear();
    lifeMeterBg.update();
    lifeMeter.update();
}