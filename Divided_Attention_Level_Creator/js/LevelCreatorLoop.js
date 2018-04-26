class LevelCreator{
    constructor(){
        this.runLoop = false;
        this.start = false;
        this.data = [];
        this.gap = 100;
        this.indicatorCoor = [500, 500];
        this.indicator = new Indicator(10, 10, 'red', this.indicatorCoor[0], this.indicatorCoor[1], this.indicatorCoor[0] + this.gap, this.indicatorCoor[1], this.gap);
        this.v_speed = 1;
        this.h_speed = 1;
        this.frames = 0;
    }

    logData(x){
        this.data.push([this.frames, x, this.h_speed, this.v_speed, this.indicator.gap]);
    }

    displayInfo(context){
        context.fillStyle = 'purple';
        context.font = "50px sans-serif";
        context.fillText("Frames: " + this.frames.toString(), 10, 50);
        context.fillText("V_Speed: " + this.v_speed.toString(), 10, 110);
        context.fillText("H_Speed: " + this.h_speed.toString(), 10, 170);
        context.fillText("Gap: " + this.indicator.gap.toString(), 10, 240);
        context.fillStyle = this.start ? "green" : "red";
        context.fillText("Start: " + this.start.toString(), 10, 300);

    }

    loop(){
        if (this.runLoop){
            requestAnimationFrame(()=>{this.loop()});
        }

        gameArea.clear();
        io.handleArrowKeyPress();
        this.indicator.newPos();
        this.indicator.update();
        Tools.handleObjects(gfx.objects['obstacles'], true);

        if (this.start){
            if(gfx.lag >= gfx.frameDuration) {
                gfx.placeObjects("obstacles", this.indicator.width, this.indicator.height * this.v_speed, this.indicator.xPos, this.indicator.yPos, this.indicator.gap);
                this.logData(this.indicator.xPos);
                this.frames++;
                gfx.lag -= gfx.frameDuration;
            }
        }

        if (gameArea.context) {
            this.displayInfo(gameArea.context);
        }

        //___FPS Control___\\
        gfx.now = window.performance.now();
        gfx.delta = gfx.now - gfx.previous;

        if (gfx.delta > gfx.frameDuration){
            gfx.delta = gfx.frameDuration;
        }

        gfx.lag += gfx.delta;

        gfx.fps = 1/ (gfx.delta/1000);
        gfx.displayFPS(gameArea.context, gameArea.canvas);

        gfx.previous = gfx.now;
    };
}