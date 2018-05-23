class Renderer{
    constructor(){
        this.fps = 60;
        this.tfps = 60;
        this.deltaBox = [];
        this.previous = 0;

        this.makeMole = 'Alive';
        this.timeOut = 0;
        this.jitter = 1;

        this.posC = 50;
        this.posC2 = 600;
        this.sequenceNumber = 0;
        this.maxTrials = 36;
        this.trial = 0;
    }

    setFirst(){
        if (this.trial === 0){
            gm.firstSequence = gm.shuffle(gm.firstSequence);
        }
        this.currentSequence = gm.firstSequence;
    }

    setSecond(){
        if (this.trial === 0){
            gm.secondSequence = gm.shuffle(gm.secondSequence);
        }
        this.currentSequence = gm.secondSequence;
    }

    setRandom(){
        this.currentSequence = false;
        this.x = Math.random() > .5 ? this.posC : this.posC2;
        this.y = Math.random() > .5 ? this.posC: this.posC2;
    }

    pickPosition(){
        this.jitter = 1;
        switch (this.sequenceNumber){
            case 0:
                this.setFirst();
                break;
            case 1:
                this.setRandom();
                break;
            case 2:
                this.setSecond();
                break;
            case 3:
                this.setRandom();
                break;
            case 4:
                this.setFirst();
                break;
            case 5:
                this.setRandom();
                break;
            case 6:
                this.setSecond();
                break;
        }
        console.log(this.currentSequence);
        if (this.currentSequence) {
            switch (this.currentSequence[this.trial % this.currentSequence.length]) {
                case 1:
                    this.x = this.posC;
                    this.y = this.posC;
                    break;
                case 2:
                    this.x = this.posC2;
                    this.y = this.posC;
                    break;
                case 3:
                    this.x = this.posC;
                    this.y = this.posC2;
                    break;
                case 4:
                    this.x = this.posC2;
                    this.y = this.posC2;
                    break;
            }
        }
            console.log((this.trial + 1) + "/" + this.maxTrials);
            this.trial++;

        if (this.trial === this.maxTrials){
            console.log("This was sequence: ", this.sequenceNumber);
            if(this.sequenceNumber < 6) {
                this.sequenceNumber++;
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

            gameArea.context.drawImage(gm.moleImage, this.x, this.y, gm.moleImage.width, gm.moleImage.height);
            io.startTime = window.performance.now();
            this.makeMole = false;

        } else if(this.makeMole === 'Dead' || this.makeMole === 'Miss') {
            console.log("Makemole 1 is ", this.makeMole);
            let img = this.makeMole === 'Dead' ? gm.moleHitImage : gm.moleMissImage;
            this.makeMole = 'Nothing';
            gameArea.context.drawImage(img, this.x, this.y, img.width, img.height);
            setTimeout(() => {
                this.clearMole();
            }, 600);
        }

    };

    placeHammer(key){
        switch(key){
            case 49:
                this.xh = this.posC;
                this.yh = this.posC;
                break;
            case 48:
                this.xh = this.posC2;
                this.yh= this.posC;
                break;
            case io.leftIndex:
                this.xh = this.posC;
                this.yh = this.posC2;
                break;
            case io.rightIndex:
                this.xh = this.posC2;
                this.yh = this.posC2;
                break;
        }
        gameArea.context.drawImage(gm.hammerImage, this.xh, this.yh, gm.hammerImage.width, gm.hammerImage.height);
    }

    displayReactionTime(rt){
        if (typeof rt === 'string'){
            gameArea.context.fillStyle = 'red';
        } else {
            gameArea.context.fillStyle = "purple";
        }

        gameArea.context.fontSize = "20px";
        gameArea.context.textAlign = "center";
        gameArea.context.fillText(rt.toString(), gameArea.canvas.width/2, gameArea.canvas.height/2);
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