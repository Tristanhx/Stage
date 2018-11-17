class IO{
    constructor(){
        this.lastResponse = null;
        this.go = false;
        window.addEventListener('keydown', (e) => {
            this.key = e.keyCode;
            this.handleResponse();
        });
        window.addEventListener('keyup', function(){
            this.key = false;
        });
    }

    handleResponse() {
        if (lex.go && this.key === 78 && document.getElementById('overlay').style.display === "block"){
            lex.overlay = false;
            lex.overlayToggle(false);
            lex.go = true;
            lex.loop();
            console.log('game on!');
        }
        if (this.key === 32 && this.go) {
            let stopPresent = window.performance.now();
            let present = gm.present;
            let tmpArray = [];
            gm.letters.forEach(function (letter) {
                if (letter.target) {
                    tmpArray.push(letter.letter);
                }
            });
            let tmpWord = tmpArray.join("");
            if (tmpWord !== this.lastResponse) {
                if (targetWordList.indexOf(tmpWord) === -1 || (gm.practice && wordList.indexOf(tmpWord) === 1)) {
                    gm.score -= 100;
                    gm.speedSetter(false);
                    gm.revertTimer = 3000;
                    gm.target.color = 'red';
                    gm.colorTimer = this.colorTimerTime;
                    gm.logData(tmpWord, "non-target", stopPresent-present, this.calculateDisplacement());
                } else {
                    gm.addedScore = this.calculateScore();
                    gm.score += gm.addedScore;
                    gm.speedSetter(true);
                    gm.revertTimer = 3000;
                    gm.target.color = 'green';
                    gm.colorTimer = this.colorTimerTime;
                    gfx.displayAddedScore(gameArea.context);
                    gm.logData(tmpWord, "target", stopPresent-present, this.calculateDisplacement());
                }
                this.lastResponse = tmpWord;
            }
        }
    }
}