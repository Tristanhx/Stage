class Graphics{
    constructor(){
        this.fps = 0;
        this.tfps = 60;
        this.previous = 0;
        this.frameDuration = 1000/this.tfps;
        this.lag = 0;
    }

    drawWord(word){

    }

    displayFPS(context){

        gameArea.clear();
        context.font = "40pt Arial";
        context.fillStyle = 'blue';
        context.fillText(this.fps.toFixed(2).toString(),0, 50);
    }
}