class IO{
    constructor(){
        this.startTime = 0;
        this.stopTime = 0;
        this.go = true;
        this.leftIndex = null;
        this.rightIndex = null;
        this.keysSet = false;

        window.addEventListener('keydown', (e) => {
            if(this.go && gm.game && gm.ready){
                if (!rdr.makeMole) {
                    this.handleKeyHit(e.keyCode);
                } else {
                    this.tooSoon();
                }
            } else if(this.go && gm.game && !gm.ready && this.keysSet){
                if (e.keyCode !== 49 && e.keyCode !== 48){
                    if (!this.leftIndex){
                        console.log('left!');
                        this.setLeftIndex(e.keyCode);
                        document.getElementById('button-mapping-text').innerHTML = 'Place your middle finger of your right hand on the 0 key and your index finger of your right hand on wherever. Press down your right index finger.'
                    } else if (e.keyCode !== this.leftIndex){
                        this.setRightIndex(e.keyCode);
                        gm.overlayToggle(false, "button-mapping-text");
                        gm.ready = true;
                        gm.overlay = false;
                    }
                }
            }
            this.go = false;
        });
        window.addEventListener('keyup', () => {
            this.go = true;
        });
    }

    setLeftIndex(key){
        this.leftIndex = key;
    }

    setRightIndex(key){
        this.rightIndex = key;
    }

    hitMole(){
        this.stopTime = window.performance.now();
        this.rt = this.stopTime - this.startTime;
        if (rdr.blue) {
            rdr.makeMole = 'Dead';
            console.log(this.rt);
            rdr.displayReactionTime(Math.round(this.rt));
            score.writeScore(Math.round(this.rt));
            gm.logData(rdr.x*rdr.y, "correct", this.rt);
            this.go = false;
        } else{
            this.stopTime = this.startTime;
            rdr.makeMole = 'Dead';
            score.writeScore("false");
            gm.logData(rdr.x*rdr.y, "anti", this.rt);
            rdr.displayReactionTime('Missed');
            this.go = false;
            rdr.placeContraHammer();
        }
    }

    missMole(){
        this.stopTime = window.performance.now();
        this.rt = this.stopTime - this.startTime;
        this.stopTime = this.startTime;
        rdr.makeMole = 'Miss';
        score.writeScore("miss");
        gm.logData(rdr.x*rdr.y, "incorrect", this.rt);
        rdr.displayReactionTime('Missed');
        this.go = false;
    }

    handleKeyHit(key){
        rdr.placeHammer(key);
        if((key === 49 && (rdr.x === rdr.posC && rdr.y === rdr.posC)) ||
            (key === 48 && (rdr.x === rdr.posC2 && rdr.y === rdr.posC)) ||
            (key === this.leftIndex && (rdr.x === rdr.posC && rdr.y === rdr.posC2)) ||
            (key === this.rightIndex && (rdr.x === rdr.posC2 && rdr.y === rdr.posC2)))   {
            this.hitMole();
        } else if(key === 49 || key === 48 || key === this.leftIndex || key === this.rightIndex) {
            this.missMole();
        }
    };

    tooSoon(){
        console.log("Too soon!");
        this.go = false;
    };
}