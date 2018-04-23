class Game{
    constructor(){
        this.game = true;
        this.practice = true;
        this.frames =0;
        this.wordNumber = 0;
        this.letters = [];
        this.target = null;
        this.letterSize = 100;
        this.speed = 1;
        this.targetOffset = 50;
        this.score = 0;
        this.focusLetter = null;
        this.userName = null;
        this.currentSpeed = 3;
        this.revertTimer = 0;
        this.colorTimer = 0;
        this.overlay = true;
        this.practiceLevel = 1;
    }

    speedSetter(correct){
        if(correct && this.currentSpeed > 2){
            this.currentSpeed -= (this.currentSpeed * 0.05);
            console.log(this.currentSpeed);
        } else{
            this.currentSpeed += (this.currentSpeed * 0.05);
            console.log(this.currentSpeed);
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
                        things[i].color = 'blue';
                        things[i].target = true;
                        io.go = true;
                        this.focusLetter = things[i];

                    } else{
                        things[i].color = 'black';
                        things[i].target = false;
                    }
                    things[i].y += things[i].d * this.speed;
                    things[i].update();
                }
                // if it is something else
            } else {
                things[i].update();
            }
        }
    }

    saveScore(){
        console.log("Saving result");
        $.post("userInfo.php",
            {
                name: this.userName,
                score: this.score,
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

    createLetters(){
        this.letters.push(new Letter(this.letterSize, -this.letterSize, this.letterSize, wordList[this.wordNumber][0], 1));
        this.letters.push(new Letter(this.letterSize * 2, gameArea.canvas.height + this.letterSize, this.letterSize, wordList[this.wordNumber][1], -1));
        this.letters.push(new Letter(this.letterSize * 3, -this.letterSize, this.letterSize, wordList[this.wordNumber][2], 1));
    }

    updateElements(){
        this.target.update();
        this.handle(this.letters);
        // SCOREBOARD!
        gameArea.context.font = "20px Times New Roman";
        gameArea.context.fillText(this.score.toString(), 450, 20, 100);
        if (this.colorTimer === 0) {
            this.target.color = 'blue';
        }
    }

    practiceLevelMaker(wordsNum){
        if (this.wordNumber < wordsNum && (this.frames / 100) % 1 === 0) {
            this.frames = 0;
            this.createLetters();
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
        if(gfx.lag >= gfx.frameDuration){
            this.frames++;

            if (this.colorTimer !== 0) {
                this.colorTimer--;
            }

            if (!this.target) {
                this.target = new Target(this.letterSize - this.targetOffset / 2, (gameArea.canvas.height / 2) - this.targetOffset,
                    this.letterSize * 3, this.letterSize);
            }

            gameArea.clear();

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
                this.gameLoop();

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

    gameLoop(){
        if(this.game){
            requestAnimationFrame(()=>{this.gameLoop();});
        } else{
            gameArea.canvas.width = 0;
            gameArea.canvas.height = 0;
        }

        if(gfx.lag >= gfx.frameDuration) {
            this.frames++;

            if (this.revertTimer !== 0) {
                this.revertTimer--;
            }
            if (this.colorTimer !== 0) {
                this.colorTimer--;
            }

            gameArea.clear();
            // gameArea.context.fillStyle = 'black';
            // gameArea.context.fillRect(0, gameArea.canvas.height/2, gameArea.canvas.width, 10);
            if ((this.frames / (100/this.speed)) % 1 === 0 && this.wordNumber < wordList.length) {
                this.createLetters();
                this.wordNumber++;
            } else if (this.wordNumber >= wordList.length) {
                if (this.letters.length <= 0) {
                    this.saveScore();
                    this.game = false;
                }
            }

            this.updateElements();

            if (this.revertTimer === 0) {
                this.currentSpeed = 10;
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
}