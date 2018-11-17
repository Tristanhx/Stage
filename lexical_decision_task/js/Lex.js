class Lex{
    constructor(){
        this.go = true;
        this.overlay = true;
        this.countDown = 4;
        this.timeOut = false;
    }

    changeOverlayText(type){
        if (type === "first"){
            document.getElementById("instructions").innerHTML = `This is a lexical decision task. <br/>(Press N to continue)`;
        } else if (type === "second"){
            document.getElementById("instructions").innerHTML = `Great job! Your next target is real words. 
Good luck!<br/>(Press N to continue)`;
        } else if (type === "end"){
            document.getElementById("instructions").innerHTML = `This is the end. Well done!`;
        }
    }

    overlayToggle(state, type){
        this.changeOverlayText(type);

        if (state) {
            document.getElementById('overlay').style.display = "block";
            console.log('overlay on!');
        }
        else{
            document.getElementById('overlay').style.display = "none";
            console.log('overlay off!');
        }
        document.getElementById("instructions").style.display = state ? "block" : "none";

    }

    loop(){
        if (this.go){requestAnimationFrame(()=>{this.loop();})}
        if (gfx.lag >= gfx.frameDuration) {
            console.log("looping!");

            if (this.countDown) {
                if (!this.timeOut) {
                    gameArea.clear();
                    gameArea.context.fillStyle = "Arial 100px";
                    gameArea.context.fillText((this.countDown - 1).toString(), 50, 50);
                    this.timeOut = true;
                    this.countDown--;
                    setTimeout(() => {
                        this.timeOut = false;
                    }, 1000);

                }
            }else {
                //Do things
                gameArea.clear();
            }
            gfx.lag -= gfx.frameDuration;
        }

        //___FPS Control___\\
        gfx.now = window.performance.now();
        gfx.delta = gfx.now - gfx.previous;

        if (gfx.delta > gfx.frameDuration) {
            gfx.delta = gfx.frameDuration;
        }

        gfx.lag += gfx.delta;

        gfx.fps = 1 / (gfx.delta / 1000);
        //gfx.displayFPS(gameArea.context);

        gfx.previous = gfx.now;




    }
}