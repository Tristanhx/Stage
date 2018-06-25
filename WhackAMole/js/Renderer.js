class Renderer{
    constructor(){
        this.fps = 60;
        this.tfps = 60;
        this.deltaBox = [];
        this.previous = 0;

        this.makeMole = 'Alive';
        this.timeOut = 0;
        this.jitter = 1;

        this.posC = 200;
        this.posC2 = 800;
        this.blue = null;
        this.sequenceNumber = 0;
        this.maxRepeats = 5;
        this.maxTrials = null;
        this.maxRandomTrials = 50;
        this.trial = 0;
        this.clearYellow = null;
        this.set = false;
    }
    
    fillCurrentArray(sequence){
        if (typeof sequence === "string"){
            this.currentSequence = new Array(this.maxRandomTrials);
            for (let i = 0 ; i < this.maxRandomTrials ; i++){
                this.currentSequence[i] = Math.floor(Math.random()*4 +1);
            }
        } else if (typeof sequence === "object") {
            if (this.trial === 0) {
                sequence = gm.shuffle(sequence);
            }

            this.currentSequence = new Array(gm.firstSequence.length * this.maxRepeats);

            for (let i = 0; i < this.maxRepeats; i++) {
                for (let j = 0; j < sequence.length; j++) {
                    console.log(this.currentSequence);
                    this.currentSequence[j + sequence.length * i] = sequence[j];
                }

            }
        }
        this.currentSequence.push(-(Math.floor(Math.random()*4 +1)));

        this.maxTrials = this.currentSequence.length;
    }

    pickPosition(){
        this.jitter = 1;

        //switch sequences
        if (!this.set) {
            console.log("switching sequences");
            switch (this.sequenceNumber) {
                case 0:
                    this.fillCurrentArray(gm.firstSequence);
                    break;
                case 1:
                    this.fillCurrentArray("random");
                    break;
                case 2:
                    this.fillCurrentArray(gm.secondSequence);
                    break;
                case 3:
                    this.fillCurrentArray("random");
                    break;
                case 4:
                    this.fillCurrentArray(gm.thirdSequence);
                    break;
                case 5:
                    this.fillCurrentArray("random");
                    break;
                case 6:
                    this.fillCurrentArray(gm.fourthSequence);
                    break;
            }
            console.log(this.currentSequence);
            this.set = true;
        }

        // switch positions within current sequence
        if (this.currentSequence) {
            switch (this.currentSequence[this.trial]) {
                case 1:
                    this.x = this.posC;
                    this.y = this.posC;
                    this.blue = true;
                    break;
                case 2:
                    this.x = this.posC2;
                    this.y = this.posC;
                    this.blue = true;
                    break;
                case 3:
                    this.x = this.posC;
                    this.y = this.posC2;
                    this.blue = true;
                    break;
                case 4:
                    this.x = this.posC2;
                    this.y = this.posC2;
                    this.blue = true;
                    break;
                case -1:
                    this.x = this.posC;
                    this.y = this.posC;
                    this.blue = false;
                    break;
                case -2:
                    this.x = this.posC2;
                    this.y = this.posC;
                    this.blue = false;
                    break;
                case -3:
                    this.x = this.posC;
                    this.y = this.posC2;
                    this.blue = false;
                    break;
                case -4:
                    this.x = this.posC2;
                    this.y = this.posC2;
                    this.blue = false;
                    break;
            }
        }
            console.log((this.trial + 1) + "/" + this.maxTrials);
            this.trial++;

        if (this.trial === this.maxTrials){
            console.log("This was sequence: ", this.sequenceNumber);
            if(this.sequenceNumber < 6) {
                this.sequenceNumber++;
                this.set = false;
            } else {
                gameArea.canvas.width = 0;
                gameArea.canvas.height = 0;
                gameArea.canvas.backgroundImage = "none";
                gm.game = false;
                gm.overlayToggle(true, "follow-up");
                gm.waitForInput();
            }
            this.trial = 0;
        }
    }

    placeMole(){
        if (this.makeMole === 'Alive'){
            this.pickPosition();

            this.placeCenter();
            this.drawDividers(gameArea.context, gameArea.canvas.width / 2, gameArea.canvas.height / 2);
            if (this.blue) {
                gameArea.context.drawImage(gm.moleImage, this.x - (gm.moleDim / 2), this.y - (gm.moleDim / 2), gm.moleImage.width, gm.moleImage.height);
            } else {
                gameArea.context.drawImage(gm.antiMoleImage, this.x - (gm.moleDim / 2), this.y - (gm.moleDim / 2), gm.moleImage.width, gm.moleImage.height);
                this.clearYellow = setTimeout(() => {
                    this.clearMole();
                }, 1000);
            }
            io.startTime = window.performance.now();
            this.makeMole = false;

        } else if(this.makeMole === 'Dead' || this.makeMole === 'Miss') {
            console.log("Makemole 1 is ", this.makeMole);
            let img = this.makeMole === 'Dead' ? gm.moleImage : gm.moleMissImage;
            this.makeMole = 'Nothing';
            if (this.blue) {
                gameArea.context.drawImage(img, this.x - (gm.moleDim / 2), this.y - (gm.moleDim / 2), img.width, img.height);
            }
            if (this.clearYellow) {
                clearTimeout(this.clearYellow);
            }
            setTimeout(() => {
                this.clearMole();
            }, 600);
        }

    };

    placeCenter(){
        gameArea.context.drawImage(gm.moleImage, gameArea.canvas.width / 2  - (gm.moleImage.width / 2), gameArea.canvas.height / 2 - (gm.moleImage.height / 2), gm.moleImage.width, gm.moleImage.height);
    }

    drawDividers(ctx, cx, cy){
        ctx.strokeStyle = "#50BAE1";
        ctx.lineWidth = 10;
        let r = 150;

        let lines = [[330, 30, cx + r, cy, gameArea.canvas.width, cy], [60, 120, cx, cy + r, cx, gameArea.canvas.height], [150, 210, cx - r, cy, 0, cy], [240, 300, cx, cy - r, cx, 0]];

        lines.forEach(function(line){
            ctx.beginPath();
            //ctx.moveTo(cx,cy);
            ctx.arc(cx,cy,r,toRadians(line[0]),toRadians(line[1]));
            ctx.stroke();
            ctx.beginPath()
            ctx.moveTo(line[2], line[3]);
            ctx.lineTo(line[4], line[5]);
            ctx.stroke();
        });
        //ctx.lineTo(cx,cy);
        //ctx.closePath();
    }

    placeHammer(key){
        switch(key){
            case 49:
                this.xh = this.posC;
                this.yh = this.posC;
                this.xh2 = -10;
                this.yh2 = -1000;
                break;
            case 48:
                this.xh = this.posC2;
                this.yh= this.posC;
                this.xh2 = gameArea.canvas.width + 10;
                this.yh2 = -1000;
                break;
            case io.leftIndex:
                this.xh = this.posC;
                this.yh = this.posC2;
                this.xh2 = -10;
                this.yh2 = gameArea.canvas.height + 1000;
                break;
            case io.rightIndex:
                this.xh = this.posC2;
                this.yh = this.posC2;
                this.xh2 = gameArea.canvas.width + 10;
                this.yh2 = gameArea.canvas.height + 1000;
                break;
        }
        //gameArea.context.drawImage(gm.hammerImage, this.xh, this.yh, gm.hammerImage.width, gm.hammerImage.height);
        gameArea.context.strokeStyle = "#50BAE1";
        gameArea.context.lineWidth = 10;
        gameArea.context.beginPath();
        gameArea.context.moveTo(gameArea.canvas.width/2, gameArea.canvas.height/2);
        gameArea.context.lineTo(this.xh, this.yh);
        gameArea.context.lineTo(this.xh2, this.yh2);
        gameArea.context.stroke();
        this.placeCenter();
    }

    placeContraHammer(){
        //gameArea.context.drawImage(gm.hammerImage, this.xh, this.yh, gm.hammerImage.width, gm.hammerImage.height);
        gameArea.context.strokeStyle = "#FFAA00";
        gameArea.context.lineWidth = 10;
        gameArea.context.beginPath();
        gameArea.context.moveTo(this.x, this.y);
        gameArea.context.lineTo(gameArea.canvas.width/2, gameArea.canvas.width/2);
        gameArea.context.lineTo(this.xh2, this.yh2);
        gameArea.context.stroke();
        this.placeCenter();
    }

    displayReactionTime(rt){
        if (typeof rt === 'string'){
            gameArea.context.fillStyle = 'red';
            gameArea.context.drawImage(gm.cross, gameArea.canvas.width / 2 - (gm.cross.width / 2), gameArea.canvas.height / 2 - (gm.cross.height / 2), gm.cross.width, gm.cross.height)
        } else {
            gameArea.context.fillStyle = "purple";
            gameArea.context.fontSize = "20px";
            gameArea.context.textAlign = "center";
            gameArea.context.fillText(rt.toString(), gameArea.canvas.width/2, gameArea.canvas.height/2);
        }
    }

    clearMole(){
        console.log(this + " " + gameArea.context);
        gameArea.context.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        this.makeMole = 'Alive';
        this.timeOut = 0;
    };

    displayFPS(){
        gameArea.context.clearRect(gameArea.canvas.width - 135, 0, gameArea.canvas.width, 50);

        let now = window.performance.now();
        let delta = now - rdr.previous;

        this.fps = 1 / (delta / 1000);

        gameArea.context.font = "40pt Arial";
        gameArea.context.fillStyle = 'red';
        gameArea.context.fillText(this.fps.toFixed(2), gameArea.canvas.width - 135, 50);

        //this.framesOneSec += delta;
        this.deltaBox.push(delta);
        this.previous = now;
    }
}