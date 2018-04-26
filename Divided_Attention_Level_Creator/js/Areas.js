const gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 800;
        this.canvas.height = 1000;

        this.canvas.style.border = "1px solid #00FF00";
        this.canvas.style.backgroundColor = "#000000";
        this.context = this.canvas.getContext("2d");

        this.div = document.getElementById("gameArea");
        this.div.appendChild(this.canvas);
        resize();
        window.addEventListener('resize', resize, false);
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};


function resize(){
    console.log('resizing bottom');
    let ratio = gameArea.canvas.width / gameArea.canvas.height;
    let ratio2 = gameArea.canvas.height / gameArea.canvas.width;
    let height = window.innerHeight;
    let width = height * ratio;
    console.log("screen-ratio: ", ratio);

    gameArea.canvas.style.width = Math.floor(width/ratio2)+'px';
    gameArea.canvas.style.height = Math.floor(height/ratio2)+'px';
}
