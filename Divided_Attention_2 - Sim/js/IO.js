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
            } else if(e.keyCode === 78 && document.getElementById('overlay').style.display === "block"){
                gm.ready = true;
                gm.overlay = false;
                gm.overlayToggle(false);
            }
            else if (!this.pressed) {
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
                gm.blockResponseNow = window.performance.now();
                gm.delta = gm.blockResponseNow - gm.blockNow;
                if (!gm.match){
                    gm.lives--;
                    gm.immunity = true;
                    gameArea.canvas.style.backgroundColor = 'red';
                    message = 'WRONG';
                    gm.logTrialData("no-match", gm.delta);
                } else if (gm.match){
                    gameArea.canvas.style.backgroundColor = 'green';
                    gm.blockResponseNow = window.performance.now();
                    gm.delta = gm.blockResponseNow - gm.blockNow;
                    let addedScore = ((gm.blockPresentationTimeSetter * gfx.frameDuration) / gm.delta) * 10;
                    if (gm.delta < 200 || gm.delta > 1600){
                        addedScore = 0;
                    }
                    gm.score += addedScore;
                    console.log("Delta: ", gm.delta, " Added score: ", addedScore);
                    message = Math.round(gm.delta);
                    gm.logTrialData("match", gm.delta);
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