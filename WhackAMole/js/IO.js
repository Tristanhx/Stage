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
        rdr.makeMole = 'Dead';
        this.rt = this.stopTime - this.startTime;
        console.log(this.rt);
        rdr.displayReactionTime(Math.round(this.rt));
        score.writeScore(Math.round(this.rt));
        this.go = false;
    }

    missMole(){
        this.stopTime = this.startTime;
        rdr.makeMole = 'Miss';
        score.writeScore("miss");
        rdr.displayReactionTime('Missed');
        console.log(this.stopTime - this.startTime);
        this.go = false;
    }

    handleKeyHit(key){
        if((key === 49 && (rdr.x === rdr.posC && rdr.y === rdr.posC)) ||
            (key === 48 && (rdr.x === rdr.posC2 && rdr.y === rdr.posC)) ||
            (key === this.leftIndex && (rdr.x === rdr.posC && rdr.y === rdr.posC2)) ||
            (key === this.rightIndex && (rdr.x === rdr.posC2 && rdr.y === rdr.posC2)))   {
            this.hitMole();
        } else {
            this.missMole();
        }
        rdr.placeHammer(key);
    };

    tooSoon(){
        console.log("Too soon!");
        this.go = false;
    };
}