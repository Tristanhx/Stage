// gameArea to replace all areas
const gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 800;
        this.canvas.height = 1300;
        this.topBorder = 100;
        this.topLeft = 275;
        this.livesBorder = this.topBorder + 20;

        //this.canvas.style.border = "1px solid #00FF00";
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
        window.addEventListener('load', resize, false);
    },
    clearTop: function(){
        this.context.clearRect(0, 0, 200, 100);
        this.context.clearRect(this.canvas.width - 200, 0, 200, 100);
    },
    clearTopBlocks: function(){
        this.context.clearRect(200, 0, this.canvas.width - 200, 100);
    },
    clearLives: function(){
        this.context.clearRect(0, this.topBorder, this.canvas.width, this.livesBorder);
    },
    clearBottom: function(){
        this.context.clearRect(0, this.livesBorder, this.canvas.width, this.canvas.height);
    }
};


function resize(){
    console.log('resizing');
    let ratio;
    let width;
    let height;
    // when innerWidth is smaller than innerHeight restrict height
    // when innerHeight is smaller than innerWidth restrict width
    if (window.innerWidth <= window.innerHeight){
        ratio = gameArea.canvas.height / gameArea.canvas.width;
        width = window.innerWidth;
        height = width * ratio;
    } else{
        ratio = gameArea.canvas.width / gameArea.canvas.height;
        height = window.innerHeight;
        width = height * ratio;
    }
    console.log(ratio);

    gameArea.canvas.style.width = (width) + "px";
    gameArea.canvas.style.height = (height) + "px";
}



