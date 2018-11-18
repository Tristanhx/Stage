class Graphics{
    constructor(){
        this.fps = 0;
        this.tfps = 60;
        this.previous = 0;
        this.frameDuration = 1000/this.tfps;
        this.lag = 0;
    }

    displayFPS(context){

        gameArea.clearFPS();
        context.font = "40pt Arial";
        context.fillStyle = 'blue';
        context.fillText(this.fps.toFixed(2).toString(),0, 50);
    }

    displayAddedScore(context){
        gameArea.clearAddedScore();
        context.font = '40pt Arial';
        context.fillStyle = 'green';
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillText(gm.addedScore.toString(), gameArea.addedScoreLeft + 50, gameArea.addedScoreTop);
        //console.log(gm.addedScore);
        setTimeout(() => {gameArea.clearAddedScore();}, 1000);
    }
}