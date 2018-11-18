let gameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.id = "canvas";
        this.canvas.width = 700;
        this.canvas.height = 500;

        this.context = this.canvas.getContext("2d");
        let div = document.getElementById("canvas");
        div.appendChild(this.canvas);
        resize();
        window.addEventListener('resize', resize, false);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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