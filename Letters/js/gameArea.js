let gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.id = "canvas";
        this.canvas.width = 700;
        this.canvas.height = 500;

        this.streamLeft = 100;
        this.addedScoreLeft = this.canvas.width - 350;
        this.addedScoreTop = this.canvas.height / 2;
        this.scoreLeft = this.canvas.width - 100;
        this.scoreBottom = 20;

        this.canvas.style.backgroundImage = 'url(../misc/gamedata/game2img/background.png)';
        this.context = this.canvas.getContext("2d");
        let div = document.getElementById("canvas");
        div.appendChild(this.canvas);
        resize();
        window.addEventListener('resize', resize, false);
    },
    clearStream: function(){
        this.context.clearRect(this.streamLeft - 50, 0, this.addedScoreLeft, this.canvas.height);
    },
    clearAddedScore: function(){
        this.context.clearRect(this.addedScoreLeft, this.addedScoreTop - 100, this.canvas.width, this.canvas.height);
    },
    clearScore: function(){
        this.context.clearRect(this.scoreLeft, 0, this.canvas.width, this.scoreBottom);
    },
    clearFPS: function(){
        this.context.clearRect(0, 0, this.streamLeft, this.canvas.height);
    }
};

function resize(){
    //console.log('resizing');
    let ratio = gameArea.canvas.width / gameArea.canvas.height;
    let height;
    let width;
    if (window.innerHeight <= window.innerWidth) {
        height = window.innerHeight;
        width = height * ratio;
    } else {
        width = window.innerWidth;
        height = width * ratio;
    }
    gameArea.canvas.style.width = width+'px';
    gameArea.canvas.style.height = height+'px';
    gameArea.canvas.style.display = "100% 100%";
}