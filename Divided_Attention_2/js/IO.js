class IO{
    constructor(){
        this.pressed = false;
        this.leftKeyPressed = false;
        this.rightKeyPressed = false;
        this.keysJustReleased = false;
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
                gm.overlayToggle(false, "none");
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
            this.keysJustReleased = false;
            gm.speed = 1;
            //gm.speed = Math.sqrt(gm.speedSetting**2 - 1**2);
            gm.player.xDir = -gm.speed;

            if (!this.leftKeyPressed) {
                gm.logData("left");
                this.leftKeyPressed = true;
            }
        }
        if (this.keys && this.keys[39]){
            this.keysJustReleased = false;
            gm.speed = 1;
            //gm.speed = Math.sqrt(gm.speedSetting**2 - 1**2);
            gm.player.xDir = gm.speed;

            if (!this.rightKeyPressed) {
                gm.logData("right");
                this.rightKeyPressed = true;
            }
        }
        if (this.keys && (!this.keys[37])){
            this.leftKeyPressed = false;
        }
        if (this.keys && (!this.keys[39])){
            this.rightKeyPressed = false;
        }
        if (this.keys && (!this.keys[37] && !this.keys[39])){
            gm.player.xDir = 0;
            gm.speed = gm.speedSetting;
            this.leftKeyPressed = false;
            this.rightKeyPressed = false;
            if (!this.keysJustReleased){
                gm.logData("keys released");
                this.keysJustReleased = true;
            }
        }

    }

    handleSpaceBar(){

        if (this.spaceKey === 32 && gfx.objects["leftBlocks"].length === 4){
            let message;
            if (gm.lives > 0 && !this.pressed){
                gm.blockResponseNow = window.performance.now();
                gm.delta = gm.blockResponseNow - gm.blockNow;
                if (!gm.match){
                    // gm.lives--;
                    // gm.immunity = true;
                    // gameArea.canvas.style.backgroundColor = 'red';
                    message = 'WRONG';
                    gm.hits++;
                    gm.logTrialData("no-match", gm.delta);
                    Tools.livesChange(true);
                } else if (gm.match){
                    gameArea.canvas.style.backgroundColor = 'green';
                    gm.blockResponseNow = window.performance.now();
                    gm.delta = gm.blockResponseNow - gm.blockNow;
                    let addedScore = ((gm.blockPresentationTimeSetter * gfx.frameDuration) / gm.delta) * 10;
                    if (gm.delta < 200 || gm.delta > 1600){
                        addedScore = 0;
                    }
                    gm.score += addedScore;
                    //console.log("Delta: ", gm.delta, " Added score: ", addedScore);
                    message = Math.round(gm.delta);
                    gm.logTrialData("match", gm.delta);
                    Tools.livesChange(false);
                }
                //console.log("SPACE");
                gm.message = true;
                gameArea.clearTopBlocks();
                gm.showReactionTime(message);
                //Tools.livesChange();
                //Tools.handleObjects(gameArea.lifeMeterBorders);
            }
            this.pressed = true;
            gm.logData("space");
        }


    }
}