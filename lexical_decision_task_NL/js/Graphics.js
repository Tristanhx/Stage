class Graphics{
    constructor(){
        this.fps = 0;
        this.tfps = 60;
        this.previous = 0;
        this.frameDuration = 1000/this.tfps;
        this.lag = 0;
    }

    drawKeyReminders(type){
        gameArea.context.font = "30px Arial";
        gameArea.context.textAlign = "center";
        gameArea.context.textBaseline = "middle";
        gameArea.context.fillStyle = "black";
        gameArea.context.fillText("<--- YES   " + type + "?   NO --->", 350, 400);
    }

    drawCountDown(countdown){
        gameArea.clear();
        this.drawCross();
        gameArea.context.font = "50px Arial";
        gameArea.context.textAlign = "center";
        gameArea.context.textBaseline = "middle";
        gameArea.context.fillStyle = "blue";
        gameArea.context.fillText((countdown - 1).toString(), 350, 50);
    }

    drawWord(word){
        gameArea.clear();
        gameArea.context.fillStyle = "black";
        gameArea.context.fillText(word, 350, 200);
    }

    drawCross(){
        gameArea.clear();
        gameArea.context.fillStyle = "grey";
        // vertical
        gameArea.context.fillRect(350, 200 - 50, 2, 100);
        //horizontal
        gameArea.context.fillRect(300, 200, 100, 2);
    }

    displayFPS(context){

        gameArea.clear();
        context.font = "40pt Arial";
        context.fillStyle = 'blue';
        context.fillText(this.fps.toFixed(2).toString(),0, 50);
    }
}