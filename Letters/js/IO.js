class IO{
    constructor(){
        this.lastResponse = null;
        this.go = false;
        this.colorTimerTime = 50;
        window.addEventListener('keydown', (e) => {
            this.key = e.keyCode;
            this.handleResponse();
        });
        window.addEventListener('keyup', function(){
            this.key = false;
        });

    }

    calculateScore(){
        return 500 - ((gm.focusLetter.y- gm.target.h) * 2);
    }

    handleResponse() {
        if (gm.practice && this.key === 78 && document.getElementById('overlay').style.display === "block"){
            gm.overlay = false;
            gm.overlayToggle(false);
        }
        if (this.key === 32 && this.go) {
            let tmpArray = [];
            gm.letters.forEach(function (letter) {
                if (letter.target) {
                    tmpArray.push(letter.letter);
                }
            });
            let tmpWord = tmpArray.join("");
            if (tmpWord !== this.lastResponse) {
                if (realWordList.indexOf(tmpWord) === -1) {
                    gm.score -= 100;
                    gm.speedSetter(false);
                    gm.revertTimer = 3000;
                    gm.target.color = 'red';
                    gm.colorTimer = this.colorTimerTime;
                } else {
                    gm.score += this.calculateScore();
                    gm.speedSetter(true);
                    gm.revertTimer = 3000;
                    gm.target.color = 'green';
                    gm.colorTimer = this.colorTimerTime;
                }
                this.lastResponse = tmpWord;
            }
        }
    }
}