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
        if (!lex.go && lex.save && this.key === 78 && document.getElementById('overlay').style.display === "block"){
            lex.overlay = false;
            lex.overlayToggle(false);
            lex.go = true;
            lex.loop();
            //console.log('game on!');
        }
        if ((this.key === 49 || this.key === 48) && this.go) {
            let stopPresent = window.performance.now();
            let present = lex.present;
            lex.interTrial();
            if (lex.currentWord !== this.lastResponse) {
                if (this.key === 90) {
                    if (targetWordList.indexOf(lex.currentWord) === -1) {
                        lex.logData(lex.currentWord, "non-target", stopPresent - present, "incorrect");
                    } else {
                        lex.logData(lex.currentWord, "target", stopPresent - present, "correct");
                    }
                } else if (this.key === 77){
                    if (targetWordList.indexOf(lex.currentWord) === -1) {
                        lex.logData(lex.currentWord, "non-target", stopPresent - present, "correct");
                    } else {
                        lex.logData(lex.currentWord, "target", stopPresent - present, "incorrect");
                    }
                }
                this.lastResponse = lex.currentWord;
            }
        }
    }
}