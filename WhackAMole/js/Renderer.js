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
        this.maxTrials = 50;
        this.trial = 0;
    }

    pickPosition(){
        this.jitter = 1;
        switch (this.sequenceNumber){
            case 0:
                this.currentSequence = gm.firstSequence;
                break;
            case 1:
                this.currentSequence = gm.secondSequence;
                break;
            case 2:
                this.currentSequence = false;
                this.x = Math.random() > .5 ? this.posC : this.posC2;
                this.y = Math.random() > .5 ? this.posC: this.posC2;
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
            if(this.sequenceNumber < 2) {
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

    clearMole(){
        console.log(this + " " + gameArea.context);
        gameArea.context.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        this.makeMole = 'Alive';
        this.timeOut = 0;
    };
}