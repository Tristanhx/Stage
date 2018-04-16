// gameArea to replace all areas
const gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 800;
        this.canvas.height = 1000;
        this.topBorder = 100;
        this.topLeft = 275;
        this.livesBorder = this.topBorder + 20;

        this.canvas.style.border = "1px solid #00FF00";
        this.canvas.style.backgroundColor = "#000000";
        this.context = this.canvas.getContext("2d");

        this.lifeMeterBg = new GameObject(this.canvas.width, this.livesBorder, 'red', 0, this.topBorder, this.context);
        this.lifeMeter = new GameObject(this.canvas.width, this.livesBorder, 'green', 0, this.topBorder, this.context);
        this.lifeMeterBorders = [];
        this.fillBorders = () => {
            for(let i = 0 ; i < gm.maxLives ; i++){
                this.lifeMeterBorders.push(new GameObject(this.canvas.width/ gm.maxLives, this.canvas.height, 'black', (this.canvas.width/ gm.maxLives) * i, this.topBorder, this.context, true));
            }
        };
        this.fillBorders();
        this.div = document.getElementById("gameArea");
        this.div.appendChild(this.canvas);
        resize();
        window.addEventListener('resize', resize, false);
    },
    clearTop: function(){
        this.context.clearRect(0, 0, 200, 100);
        this.context.clearRect(this.canvas.width - 200, 0, 200, 100);
    },
    clearLives: function(){
        this.context.clearRect(0, this.topBorder, this.canvas.width, this.livesBorder);
    },
    clearBottom: function(){
        this.context.clearRect(0, this.livesBorder, this.canvas.width, this.canvas.height);
    }
};


function resize(){
    console.log('resizing bottom');
    let ratio = gameArea.canvas.height / gameArea.canvas.width;
    let width = window.innerWidth;
    let height = width * ratio;
    console.log(ratio);

    gameArea.canvas.style.width = Math.floor(width/2)+'px';
    gameArea.canvas.style.height = Math.floor(height/2)+'px';
}




