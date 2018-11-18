class Lex{
    constructor(){
        this.userName = null;
        this.go = false;
        this.save = true;
        this.overlay = true;
        this.countDown = 4;
        this.timeOut = false;
        this.word = true;
        this.draw = true;
        this.level = 1;
        this.levels = 2;
        this.currentWord = false;
        this.data = [];
        this.type = "pseudo words";
    }

    resetValues(){
        this.wordNumber = 0;
        this.countDown = 4;
    }

    logData(word, type, rt, response){
        this.data.push([this.type, word, type, rt, response]);
        console.log(this.data);
    }

    makeCSV(headers, data){
        let csv = headers;
        data.forEach(function(looseData){
            let row = looseData.join(";");
            csv += row + "\r\n";
        });
        return csv;
    }

    saveScore(){
        let csv = this.makeCSV("word-type;word;type;reaction time;response\r\n", this.data);
        console.log("Saving result");
        $.post("userInfo.php",
            {
                name: this.userName,
                data: csv
            },
            function(info){$("#results").html(info);}
        )
    }

    changeOverlayText(type){
        if (type === "first"){
            document.getElementById("instructions").innerHTML = `This is a lexical decision task. <br/>(Press N to continue)`;
        } else if (type === "second"){
            document.getElementById("instructions").innerHTML = `Great job! Your next target is real words. Good luck!<br/>(Press N to continue)`;
        } else if (type === "end"){
            document.getElementById("instructions").innerHTML = `This is the end. Well done!`;
        }
    }

    overlayToggle(state, type){
        this.changeOverlayText(type);

        if (state) {
            document.getElementById('overlay').style.display = "block";
            console.log('overlay on!');
        }
        else{
            document.getElementById('overlay').style.display = "none";
            console.log('overlay off!');
        }
        document.getElementById("instructions").style.display = state ? "block" : "none";

    }

    setupNextLevel(level){
        this.resetValues();
        if (level === 1){
            targetWordList = pseudoWords.split("\n").filter(e => e);
            nonTargetWordList = fillers.split("\n").filter(e => e);
            wordList = shuffle(targetWordList.concat(nonTargetWordList));
        } else if (level === 2){
            targetWordList = realWords.split("\n").filter(e => e);
            nonTargetWordList = fakeWords.split("\n").filter(e => e);
            wordList = shuffle(targetWordList.concat(nonTargetWordList));
            this.type = "real words";
        }
        console.log('level ', level);
    }

    interTrial(){
        console.log("cross");
        gfx.drawCross();
        gfx.drawKeyReminders(this.type);
        this.draw = false;
        io.go = false;
        setTimeout(()=>{
            this.draw = true;
            this.word = true;
        }, Math.floor(Math.random() * 1000));
        //2000 + Math.floor(Math.random() * 1000)
    }

    loop(){
        if (this.go){requestAnimationFrame(()=>{this.loop();})}
        if (gfx.lag >= gfx.frameDuration) {
            if (this.countDown) {
                if (!this.timeOut) {
                    gfx.drawCountDown(this.countDown);
                    gfx.drawKeyReminders(this.type);
                    this.timeOut = true;
                    this.countDown--;
                    setTimeout(() => {
                        this.timeOut = false;
                    }, 1000);

                }
            }else {
                //Do things
                if (this.wordNumber < wordList.length){
                    if (this.draw) {
                        if (this.word) {
                            this.currentWord = wordList[this.wordNumber];
                            console.log("word", this.currentWord);
                            this.wordNumber++;
                            gfx.drawWord(this.currentWord);
                            gfx.drawKeyReminders(this.type);
                            this.present = window.performance.now();
                            this.draw = false;
                            this.word = false;
                            io.go = true;
                        }
                    }
                } else {
                    if (this.level !== this.levels){
                        this.go = false;
                        this.level++;
                        this.overlayToggle(true, "second");
                        this.setupNextLevel(this.level);

                    } else if (this.save){
                        this.go = false;
                        this.save = false;
                        this.overlayToggle(true, "end");
                        this.saveScore();
                    }
                }
            }
            gfx.lag -= gfx.frameDuration;
        }

        //___FPS Control___\\
        gfx.now = window.performance.now();
        gfx.delta = gfx.now - gfx.previous;

        if (gfx.delta > gfx.frameDuration) {
            gfx.delta = gfx.frameDuration;
        }

        gfx.lag += gfx.delta;

        gfx.fps = 1 / (gfx.delta / 1000);
        //gfx.displayFPS(gameArea.context);

        gfx.previous = gfx.now;




    }
}