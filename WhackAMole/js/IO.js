class IO{
    constructor(){
        this.startTime = 0;
        this.stopTime = 0;
        this.go = true;
        this.leftIndex = null;
        this.rightIndex = null;
        this.keysSet = false;
        this.instructions = true;

        window.addEventListener('keydown', (e) => {
            if (this.go && !this.instructions) {

                if (this.go && gm.game && gm.ready) {
                    if (!rdr.makeMole) {
                        this.handleKeyHit(e.keyCode);
                    } else {
                        this.tooSoon();
                    }
                } else if (this.go && gm.game && !gm.ready && this.keysSet) {
                    if (e.keyCode !== 49 && e.keyCode !== 48 && e.keyCode !== 78) {
                        if (!this.leftIndex) {
                            console.log('left!');
                            this.setLeftIndex(e.keyCode);
                            document.getElementById('button-mapping-text').innerHTML = 'Place your MIDDLE finger of your RIGHT hand on the 0 (zero) key and your INDEX finger of your RIGHT hand on the indicated key below. Press down your right index finger. <img src="../misc/gamedata/game2img/kb_o.png">'
                        } else if (e.keyCode !== this.leftIndex) {
                            this.setRightIndex(e.keyCode);
                            gm.overlayToggle(false, "button-mapping-text");
                            gm.ready = true;
                            gm.overlay = false;
                        }
                    }
                }
                this.go = false;
            } else if (this.go && this.instructions){
                if (e.keyCode === 78){
                    gm.overlayToggle(true, "button_mapping");
                    this.instructions = false;
                }
            }
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

    response(key){
        switch (key) {
            case 49:
                return "Upper Left";
                break;
            case 48:
                return "Upper Right";
                break;
            case this.leftIndex:
                return "Lower Left";
                break;
            case this.rightIndex:
                return "Lower Right";
                break;
        }
    }

    hitMole(key){
        this.stopTime = window.performance.now();
        this.rt = this.stopTime - this.startTime;
        if (rdr.blue) {
            rdr.makeMole = 'Dead';
            console.log(this.rt);
            rdr.displayReactionTime(Math.round(this.rt));
            score.writeScore(Math.round(this.rt));
            gm.logData(this.response(key), "correct", this.rt);
            this.go = false;
            rdr.trial++
        } else{
            this.stopTime = this.startTime;
            rdr.makeMole = 'Dead';
            score.writeScore("false");
            gm.logData(this.response(key), "anti", this.rt);
            rdr.displayReactionTime('Missed');
            this.go = false;
            rdr.placeContraHammer();
            rdr.trial++
        }
    }

    missMole(key){
        this.stopTime = window.performance.now();
        this.rt = this.stopTime - this.startTime;
        this.stopTime = this.startTime;
        rdr.makeMole = 'Miss';
        score.writeScore("miss");
        gm.logData(this.response(key), "incorrect", this.rt);
        rdr.displayReactionTime('Missed');
        this.go = false;
        rdr.trial++
    }

    handleKeyHit(key){
        rdr.placeHammer(key);
        if((key === 49 && (rdr.x === rdr.posC && rdr.y === rdr.posC)) ||
            (key === 48 && (rdr.x === rdr.posC2 && rdr.y === rdr.posC)) ||
            (key === this.leftIndex && (rdr.x === rdr.posC && rdr.y === rdr.posC2)) ||
            (key === this.rightIndex && (rdr.x === rdr.posC2 && rdr.y === rdr.posC2)))   {
            this.hitMole(key);
        } else if(key === 49 || key === 48 || key === this.leftIndex || key === this.rightIndex) {
            this.missMole(key);
        }
    };

    tooSoon(){
        console.log("Too soon!");
        this.go = false;
    };
}