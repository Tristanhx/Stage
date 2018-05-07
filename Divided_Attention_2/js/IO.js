class IO{
    constructor(){
        this.pressed = false;
        this.keyReleases = 0;
        //this.goTop = true;
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 37 || e.keyCode === 39) {
                e.preventDefault();
                this.keys = (this.keys || []);
                this.keys[e.keyCode] = (e.type === 'keydown');
            } else if (!this.pressed) {
                this.spaceKey = e.keyCode;
            }
        });
        //listen for keyrelease
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 37 || e.keyCode === 39) {
                this.keys[e.keyCode] = (e.type === 'keydown');
                this.keyReleases++;
            } else{
                this.spaceKey = false;
            }
        });
    }

    handleArrowKeyPress(){
        if (this.keys && this.keys[37]){
            gm.speed = 1;
            //gm.speed = Math.sqrt(gm.speedSetting**2 - 1**2);
            gm.player.xDir = -gm.speed;
        }
        if (this.keys && this.keys[39]){
            gm.speed = 1;
            //gm.speed = Math.sqrt(gm.speedSetting**2 - 1**2);
            gm.player.xDir = gm.speed;
        }
        if (this.keys && (!this.keys[37] && !this.keys[39])){
            gm.player.xDir = 0;
            gm.speed = gm.speedSetting;
        }
    }

    handleSpaceBar(){

        if (this.spaceKey === 32 && gfx.objects["leftBlocks"].length === 4){
            let message;
            if (gm.lives > 0 && !this.pressed){
                if (!gm.match){
                    gm.lives--;
                    gm.immunity = true;
                    gameArea.canvas.style.backgroundColor = 'red';
                    message = 'WRONG'
                } else if (gm.match){
                    gameArea.canvas.style.backgroundColor = 'green';
                    gm.blockResponseNow = window.performance.now();
                    gm.delta = gm.blockResponseNow - gm.blockNow;
                    let addedScore = ((gm.blockPresentationTimeSetter * gfx.frameDuration) / gm.delta) * 10;
                    gm.score += addedScore;
                    console.log("Delta: ", gm.delta, " Added score: ", addedScore);
                    message = Math.round(gm.delta);
                }
                console.log("SPACE");
                gm.message = true;
                gameArea.clearTopBlocks();
                gm.showReactionTime(message);
                Tools.livesChange();
                Tools.handleObjects(gameArea.lifeMeterBorders);
            }
            this.pressed = true;
        }


    }
}