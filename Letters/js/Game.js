class Game{
    constructor(){
        this.game = false;
        this.practice = true;
        this.frames = 0;
        this.wordNumber = 0;
        this.letters = [];
        this.target = null;
        this.letterSize = 100;
        this.targetOffset = 50;
        this.score = 0;
        this.addedScore = null;
        this.focusLetter = null;
        this.userName = null;
        this.moveSpeed = 1;
        this.revertTimer = 0;
        this.colorTimer = 0;
        this.overlay = true;
        this.practiceLevel = 1;
        this.levels = 1;
        this.level = 1;
        this.practiceLevelWords = ['tag', 'fob', 'fig'];
        this.wordLength = 3;
        this.endGame = false;
        this.indexingOffset = 1;
        this.currentWord = [];
        this.previousWord = [];
        this.data = [];
        this.present = null;
    }

    resetValues(){
        this.colorTimer = 0;
        this.score = 0;
        this.focusLetter = null;
        // this.target = null;
        this.letters = [];
        this.wordNumber = 0;
        this.frames = 0;
        this.moveSpeed = 1;
    }

    speedSetter(correct){
        if(correct && this.moveSpeed < 6){
            this.moveSpeed += (this.moveSpeed * 0.1);
            if (this.spawnSpeed > 1) {
                this.spawnSpeedTank -= (this.spawnSpeedTank * 0.05);
                this.spawnSpeed = Math.round(this.spawnSpeedTank);
            }
            console.log(this.moveSpeed);
        } else if(this.moveSpeed > 1){
            this.moveSpeed -= (this.moveSpeed * 0.05);
            this.spawnSpeedTank += (this.spawnSpeedTank * 0.05);
            this.spawnSpeed = Math.round(this.spawnSpeedTank);
            console.log(this.moveSpeed);
        }
    }

    handle(things){
        for (let i = 0 ; i < things.length ; i++){
            // if it is a letter
            if (things[i] instanceof Letter) {
                if (things[i].y < -this.letterSize || things[i].y > gameArea.canvas.height + this.letterSize) {
                    things.splice(i, 1);
                } else {
                    if (things[i].y > this.target.y && things[i].y < this.target.y + this.target.h){
                        things[i].color = '#50BAE1';
                        things[i].target = true;
                        io.go = true;
                        this.focusLetter = things[i];
                        this.currentWord.push(this.focusLetter);
                    } else{
                        things[i].color = '#FFF';
                        things[i].target = false;
                    }
                    things[i].y += things[i].d * this.moveSpeed;
                    things[i].update();
                }
                // if it is something else
            } else {
                things[i].update();
            }
        }
        if (this.currentWord.length === this.previousWord.length && this.currentWord.every((value, index) => value === this.previousWord[index])){
            //do nothing
        } else{
            this.present = window.performance.now();
        }
        this.previousWord = this.currentWord;
        this.currentWord = [];
    }

    logData(word, type, rt, dis){
        this.data.push([this.userName, word, type, rt, dis]);
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
        let csv = this.makeCSV("name;word;type;reaction time;displacement in pixels\r\n", this.data);
        console.log("Saving result");
        $.post("userInfo.php",
            {
                name: this.userName,
                score: this.score,
                data: csv
            },
            function(info){$("#results").html(info);}
        )
    }

    overlayToggle(state){
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

    // message(state, type){
    //     if (type === "instructions"){
    //         document.getElementById("button-mapping-text").style.display = state ? "block" : "none";
    //         document.getElementById("follow-up-question").style.display = state ? "none" : "block";
    //     } else if(type === "follow-up"){
    //         document.getElementById("follow-up-question").style.display = state ? "block" : "none";
    //         document.getElementById("button-mapping-text").style.display = state ? "none" : "block";
    //     }
    // }

    createTarget(){
        if (!this.target) {
            this.target = new Target(this.letterSize - this.targetOffset / 2, (gameArea.canvas.height / 2) - this.targetOffset,
                this.letterSize * 3, this.letterSize);
        }
    }

    createLetters(wordLength) {
        if (wordLength === 3) {
            for (let i = 0 ;  i < 3 ; i++){
                this.letters.push(new Letter(
                    gameArea.streamLeft * (i+1),                                            //x
                    i%2===0 ? -this.letterSize : gameArea.canvas.height + this.letterSize,  //y
                    this.letterSize,                                                        //width
                    wordList[this.wordNumber][i],                                           //letter
                    i%2===0 ? 1 : -1,                                                       //direction
                    '#FFF'                                                                  //color
                ));
            }
        } else if (wordLength === 4){
            for (let i = 0 ; i < 4 ; i++){
                this.letters.push(new Letter(
                    gameArea.streamLeft * (i+1) - (this.letterSize /2), //x
                    i%2===0 ? -this.letterSize : gameArea.canvas.height + this.letterSize, //y
                    this.letterSize, //width
                    wordList[this.wordNumber][i], //letter
                    i%2===0 ? 1 : -1, //direction
                    '#FFF'//color
                ));
            }
        }
    }

    updateElements(){
        this.target.update();
        if (this.letters !== 0) {
            this.handle(this.letters);
        }
        // SCOREBOARD!
        gameArea.context.font = "20px Times New Roman";
        gameArea.context.textBaseline = 'bottom';
        gameArea.context.fillText(Math.round(this.score).toString(), gameArea.scoreLeft, gameArea.scoreBottom, 100);
        if (this.colorTimer === 0) {
            this.target.color = '#50BAE1';
        }
    }

    practiceLevelMaker(wordsNum){
        if (this.wordNumber < wordsNum && (this.frames / 100) % 1 === 0) {
            this.frames = 0;
            this.createLetters(this.wordLength);
            this.wordNumber++;
            console.log("practiceLevel 1");
        } else if (this.wordNumber){}

        this.updateElements();
    }

    checkPracticeLevel(){
        console.log(this.letters.length);
        if (this.letters.length === 1 && this.frames > 10){
            console.log("next!", this.frames);
            this.overlay = true;
            this.practiceLevel++;
            this.wordNumber = 0;
            this.score = 0;
            this.frames = 0;
        }
    }

    practiceLevelLoop(){
        if(this.practice){
            requestAnimationFrame(()=>{this.practiceLevelLoop();});
        }
        if (this.frames === 0){
            wordList = this.practiceLevelWords;
        }
        if(gfx.lag >= gfx.frameDuration){
            this.frames++;

            if (this.colorTimer !== 0) {
                this.colorTimer--;
            }

            this.createTarget();

            gameArea.clearStream();

            if (this.overlay){

                this.overlayToggle(true);

            } else if (this.practiceLevel === 1){

                this.practiceLevelMaker(1);
                this.checkPracticeLevel();

            } else if (this.practiceLevel === 2){

                this.practiceLevelMaker(2);
                this.checkPracticeLevel();

            } else if (this.practiceLevel === 3){

                this.practiceLevelMaker(3);
                this.checkPracticeLevel();

            } else if (this.practiceLevel === 4){

                this.practice = false;
                this.frames = 0;
                this.setupNextLevel(this.level);
                this.overlayToggle(true);

            }
            gfx.lag -= gfx.frameDuration;
        }

        //___FPS Control___\\
        gfx.now = window.performance.now();
        gfx.delta = gfx.now - gfx.previous;

        if (gfx.delta > gfx.frameDuration){
            gfx.delta = gfx.frameDuration;
        }

        gfx.lag += gfx.delta;

        gfx.fps = 1/ (gfx.delta/1000);
        gfx.displayFPS(gameArea.context);

        gfx.previous = gfx.now;
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
        } else if (level === 3){
            this.createTarget();
            targetWordList = fourLetterWords.split("\n").filter(e => e);
            nonTargetWordList = fourLetterFakeWords.split("\n").filter(e => e);
            wordList = shuffle(targetWordList.concat(nonTargetWordList));
            this.wordLength = 4;
            this.target.x -= this.letterSize / 2;
            this.target.w = this.letterSize * 4;
            this.indexingOffset = 2;
            gameArea.addedScoreLeft += this.letterSize;
        }
        console.log('level ', level);
    }

    gameLoop() {
        if (this.game) {
            requestAnimationFrame(() => {this.gameLoop();});
        }

        if (gfx.lag >= gfx.frameDuration) {
            if (this.frames === 0) {
                this.createLetters(this.wordLength);
                this.wordNumber++;
                this.createTarget();
            }

            this.frames++;

            if (this.revertTimer !== 0) {
                this.revertTimer--;
            }
            if (this.colorTimer !== 0) {
                this.colorTimer--;
            }

            gameArea.clearStream();
            if (this.wordNumber < wordList.length) {
                if (this.letters[this.letters.length - this.indexingOffset].y >= 0) {
                    this.createLetters(this.wordLength);
                    this.wordNumber++;
                }
            }


            else if (this.wordNumber >= wordList.length) {
                if (this.level !== this.levels) {
                    if (this.letters.length <= 0) {
                        this.level += 1;
                        this.setupNextLevel(this.level);
                        this.overlayToggle(true);
                        this.game = false;
                        console.log("next level");
                        return;
                    }
                } else {
                    if (this.letters.length <= 0) {
                        this.saveScore();
                        this.game = false;
                        this.endGame = true;
                        gameArea.canvas.width = 0;
                        return;
                    }
                }
            }
            gameArea.clearScore();
            this.updateElements();


            if (this.revertTimer === 0) {
                this.moveSpeed = 1;
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