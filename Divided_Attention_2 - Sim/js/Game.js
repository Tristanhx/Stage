class GameLoop {

    constructor(){
        //__Game__\\
        this.score = 0;
        this.frames = 0;
        this.speedBuffer = 0;
        this.immunityTime = 10;
        this.immunityTimer = this.immunityTime;
        this.userName = null;
        this.game = true;
        this.ready = false;
        this.overlay = false;
        this.level = 1;
        this.levelTime = 0;
        this.maxLevels = 2;
        this.maxLives = 10;
        this.lives = this.maxLives;
        this.data = [];
        this.trialData = [];
        this.trial = 0;
        this.framesArray = [];
        this.xPosArray = [];
        this.h_speedArray = [];
        this.v_speedArray = [];
        this.gapArray = [];

        //__TopArea__\\
        this.blockCount = 0;
        this.makeNew = true;
        this.match = null;
        this.blockPresentationTimeSetter = 90;
        this.blockPresentationTimeSeconds = gfx.frameDuration * this.blockPresentationTimeSetter;
        this.blockPresentationTime = this.blockPresentationTimeSetter;
        this.blockPresentationTimer = 0;
        this.showBlocks = false;
        this.firstBlocks = true;
        this.messageDisplayTime = 100;
        this.messageDisplayTimer = 0;
        this.message = false;
        this.blockSize = 50;
        this.blueNeuronImage = new Image(this.blockSize, this.blockSize);
        this.blueNeuronImage.src = '../misc/gamedata/game1img/soccerRed.png';
        this.yellowNeuronImage = new Image(this.blockSize, this.blockSize);
        this.yellowNeuronImage.src = '../misc/gamedata/game1img/soccerYellow.png';

        //__BottomArea__\\
        this.speedSetting = 2;
        this.speed = this.speedSetting;
        this.breakException = {};
        this.immunity = false;

        //_obstacles_\\
        this.collisionBlock = null;
        this.obstacleSize = 5;
        this.gap = null;
        this.blockLoc = null;

        //__paths__\\
        this.pathDir = ['Left', 'Right', 'Straight'];
        this.pathDuration = Tools.pathDurationSetter();
        this.pathDurationCounter = 0;
        this.pathPicker = Tools.pathPickerSetter();

        //__levels and finish__\\
        //this.levelDuration = 1000;
        this.finish = false;
        this.finishArea = false;
        this.interLevelTimeSetting = 100;
        this.interLevelTime = this.interLevelTimeSetting;
        this.countDownSecondsSetting = 3;
        this.countDownSeconds = this.countDownSecondsSetting;
        this.countDownArray = Array.apply(null, {length: this.countDownSecondsSetting}).map(Number.call, Number);
        this.countDown = true;
        this.countDownTime = gfx.tfps * this.countDownSeconds;
        this.countDownTimer = 0;
        this.countDownObject = new CountDownObject(10, 10, 'blue', 50, 50, gameArea.context, '10');
        this.startAreaImage = new Image(gameArea.canvas.width, gameArea.canvas.width);
        this.startAreaImage.src = "../misc/gamedata/game1img/soccerRed.png";
        this.finishAreaImage = new Image(gameArea.canvas.width, gameArea.canvas.width);
        this.finishAreaImage.src = "../misc/gamedata/game1img/soccerYellow.png";

        //__Player__\\
        this.playerDim = 24;
        this.run0 = new Image(this.playerDim, this.playerDim);
        this.run1 = new Image(this.playerDim, this.playerDim);
        this.run2 = new Image(this.playerDim, this.playerDim);
        this.activeImage = this.run0;
        this.run0.src = './img/Large.png';
        this.run1.src = './img/Medium.png';
        this.run2.src = './img/Small.png';
        this.imgFrame = 0;
        this.player = new Player(this.playerDim, this.playerDim, 'blue', this.xPosArray[0]+(this.gapArray[0]/2), 500);
    }

    resetValues(){
        //__Game__\\
        this.immunityTimer = this.immunityTime;
        this.lives = this.maxLives;
        this.frames = 1;
        this.levelTime = 0;
        this.showBlocks = false;

        //__TopArea__\\
        this.blockCount = 0;
        this.makeNew = true;
        this.match = null;
        this.blockPresentationTime = this.blockPresentationTimeSetter;
        this.blockPresentationTimer = 0;
        this.firstBlocks = true;

        //__BottomArea__\\
        this.speed = this.speedSetting;
        this.breakException = {};
        this.immunity = false;
        //obstacles
        this.collisionBlock = null;
        this.gap = this.gapArray[0];
        this.blockLoc = this.xPosArray[0];
        //levels and finish
        this.finish = false;
        this.finishArea = false;
        this.interLevelTime = this.interLevelTimeSetting;
        this.countDownSeconds = this.countDownSecondsSetting;
        this.countDownTimer = 0;

        gfx.objects['finishline'] = [];
    }

    prepareForNextLevel(){
        console.log("levelduration in frames: ", this.frames);
        if(this.lives === this.maxLives) {
            this.speedSetting += 1;
            this.maxLives -= 1;
        } else if(this.lives < this.maxLives){
            this.speedSetting += 0;
            this.maxLives -= 1;
        }
        Tools.clearBlocks();
        gfx.objects['obstacles'] = [];
        gfx.objects['pathparts'] = [];
        this.resetValues();
        console.log(this.lives, "/", this.maxLives);
        console.log("Cumulative score: ", this.score);
        this.level++;

        gameArea.lifeMeterBorders = [];
        gameArea.fillBorders();

        gameArea.clearBottom();
        gfx.objects["leftBlocks"] = [];
        gfx.objects["rightBlocks"] = [];
        gameArea.clearTop();
        gameArea.clearTopBlocks();
        gameArea.clearLives();
        this.countDown = true;

        this.goToNexLevel();
    }

    goToNexLevel(){
        this.createStart();
    }

    createStart(){
        Tools.createInitialObjects();
        Tools.livesChange();
        Tools.handleObjects(gameArea.lifeMeterBorders);
    }

    relocatePlayer(){
        this.offset = this.collisionBlock.gap / 4;
        switch (this.collisionBlock.path){
            case "Left":
                this.player.xPos = this.collisionBlock.blockLoc + (this.collisionBlock.gap / 2) - this.offset;
                break;
            case "Right":
                this.player.xPos = this.collisionBlock.blockLoc + (this.collisionBlock.gap / 2) + this.offset;
                break;
            case "Straight":
                this.player.xPos = this.collisionBlock.blockLoc + (this.collisionBlock.gap / 2);
        }
        //this.currentPath = 'Straight';
    }

    maybeResetBackground(){
        if (this.immunity && this.immunityTimer > 0) {
            this.immunityTimer--;
        } else {
            gameArea.canvas.style.backgroundImage = 'url(../misc/gamedata/game2img/background.png)';
            this.immunity = false;
            this.immunityTimer = this.immunityTime;
        }
    }

    createFinishLine(){
        console.log('finishline!');
        this.finishArea = new GameObject(gameArea.canvas.width + 20, gameArea.canvas.height/2, '#FFAA00', -10, gameArea.canvas.height -10, "finish", false, false, false);
        gfx.createObjectHLine('finishline', ['black', 'white'], gameArea.canvas, 10, gameArea.context, this.blockLoc, this.blockLoc + this.gap);
    }

    moreObstacles(){
        //Tools.changeBlockLoc(this.currentPath);
        this.fetchValues(this.frames);
        gfx.placeObjects("pathParts", this.gap - this.obstacleSize, this.obstacleSize * this.speed * 2, '#50BAE1', this.blockLoc +
            this.obstacleSize, gameArea.canvas.height, gameArea.context, 1, this.gap);
        gfx.placeObjects("obstacles", this.obstacleSize, this.obstacleSize * this.speed, "#00A4E1", this.blockLoc,
            gameArea.canvas.height, gameArea.context, 2, this.gap);
        //this.pathDurationCounter++;
    }

    logData(){
        this.data.push([this.frames, this.level, this.speed, this.lives, Math.round(this.player.xPos), Math.round(this.blockLoc), Math.round(this.blockLoc + this.gap), gameArea.canvas.style.width]);
    }

    logTrialData(trialType, rt){
        this.trialData.push([this.userName, this.frames, this.trial, this.level, trialType, rt]);
    }

    fetchValues(frame){
        if (frame < this.framesArray.length) {
            this.blockLoc = this.xPosArray[frame];
            this.gap = this.gapArray[frame];
        }
    }

    showReactionTime(rt){
        if(typeof rt === 'string'){
            gameArea.context.fillStyle = "red";
        } else {
            gameArea.context.fillStyle = "green";
            let width = rt * -(200 / (this.blockPresentationTimeSeconds - 200)) + ((200 / (this.blockPresentationTimeSeconds - 200)) * this.blockPresentationTimeSeconds);
            if(rt < 200 || rt > this.blockPresentationTimeSeconds){
                width = 0;
            }
            gameArea.context.fillRect(300, 10, width, 10);
        }
        gameArea.context.textAlign = "center";
        gameArea.context.font = "Georgia 40px";
        gameArea.context.fillText(rt, gameArea.canvas.width/2, 75);
    }

    removeReactionTime(){
        gameArea.clearTopBlocks();
        gameArea.clearReactionTime();
    }

    overlayToggle(state, type){
        if (state) {
            document.getElementById('overlay').style.display = "block";
            console.log('overlay on!');
        }
        else{
            document.getElementById('overlay').style.display = "none";
            console.log('overlay off!');
        }
        this.showMessage(state, type);
    }

    showMessage(state, type){
        if (type === "instructions"){
            document.getElementById("instructions").style.display = state ? "block" : "none";
            document.getElementById("end").style.display = state ? "none" : "block";
        } else if(type === "end"){
            document.getElementById("end").innerHTML = `This is the end. Well done! Your score is: ${Math.floor(gm.score)}`;
            document.getElementById("end").style.display = state ? "block" : "none";
            document.getElementById("instructions").style.display = state ? "none" : "block";
        }
    }

    gameLoop(){
        //__RAF__\\
        if (this.game) {
            requestAnimationFrame(() => {this.gameLoop()});
        }

        if (!this.ready && !this.overlay) {
            this.overlayToggle(true, "instructions");
            this.overlay = true;
        }
        if (this.overlay){
            gfx.lag = 0;
        }
        if(this.ready) {
            if (!gfx.objects["previousLeftBlocks"]) {
                gfx.objects["previousLeftBlocks"] = [];
                gfx.objects["previousRightBlocks"] = [];
            }

            if (this.countDown) {
                gameArea.clearBottom();
                gameArea.clearTop();
                if (this.countDownTimer === this.countDownTime) {
                    this.countDown = false;
                } else {
                    if (!gfx.objects['pathParts'] || gfx.objects['pathParts'] === []) {
                        //initial objects
                        this.createStart();
                    }

                    Tools.handleObjects(gfx.objects["pathParts"]);
                    this.player.update();
                    if (this.countDownTimer % gfx.tfps === 0) {
                        this.countDownObject.text = this.countDownArray[this.countDownSeconds - 1].toString();
                        this.countDownObject.context = gameArea.context;
                        this.countDownSeconds--;
                    }
                    this.countDownObject.update();
                    this.countDownTimer++;
                }
            } else {
                if ((this.frames / 10) % 1 === 0) {
                    this.logData();
                }
                // //__Pick Path__\\
                // if (this.pathDurationCounter === this.pathDuration) {
                //     this.pathDuration = Tools.pathDurationSetter();
                //     this.pathPicker = Tools.pathPickerSetter();
                //     this.pathDurationCounter = 0;
                // }
                // this.currentPath = this.pathDir[this.pathPicker];

                //__Check lives__\\
                if (this.lives <= 0 && this.game) {
                    this.game = false;
                    Tools.calculateScore();
                    Tools.saveScore();
                }

                if (this.speed === 0) {
                    this.player.xDir = 0;
                }

                if (gfx.lag >= gfx.frameDuration) {
                    //____Areas____\\
                    gameArea.clearBottom();
                    gameArea.clearTop();

                    //__IO__\\
                    if (this.speed !== 0) {
                        io.handleArrowKeyPress();
                        io.handleSpaceBar();
                    }

                    //__Top Area__\\
                    if (this.showBlocks && !this.message) {
                        if (this.speed !== 0) {
                            if (this.blockCount < 4) {
                                if (this.blockCount === 0) {
                                    this.match = Math.random() < .25;
                                }
                                if (this.firstBlocks) {
                                    this.match = false;
                                    this.firstBlocks = false;
                                }
                                Tools.blockBuilder(this.match);
                            } else if (this.makeNew) {
                                Tools.makeNewBlocks();
                            } else {
                                if (this.blockPresentationTimer === this.blockPresentationTime) {
                                    Tools.clearBlocks(true);
                                    this.blockPresentationTimer = 0;
                                }
                            }
                        }
                        this.blockPresentationTimer++;
                    } else if (this.message) {
                        this.messageDisplayTimer++
                    }
                    if (this.messageDisplayTimer === this.messageDisplayTime) {
                        this.message = false;
                        this.messageDisplayTimer = 0;
                        this.removeReactionTime();
                    }
                    if (this.frames >= (gameArea.canvas.height - this.player.yPos) / this.speed) {
                        this.showBlocks = true;
                    }

                    //__Bottom Area__\\
                    if (this.frames === 0) {
                        this.createStart();
                        console.log('start!');
                    }
                    if (this.speed !== 0) {
                        this.levelTime += 1;
                        this.frames += this.speed;
                    }

                    //adding new objects according to obstacleSize
                    if (this.frames > 0 && this.frames % this.obstacleSize === 0 && !this.finish) {
                        this.moreObstacles();
                    }

                    if (this.frames >= this.framesArray.length && !this.finish) {
                        this.createFinishLine();
                        this.finish = true;
                    }

                    //update all objects
                    Tools.handleObjects(gfx.objects["obstacles"], true);
                    Tools.handleObjects(gfx.objects["pathParts"], true);
                    this.countDownObject.update();


                    //__Other Things__\\
                    if (this.finish && this.finishArea) {
                        this.finishArea.yPos -= this.speed;
                        this.finishArea.update();
                        this.speed = this.finishArea.yPos <= this.player.yPos ? 0 : this.speed;
                        if (this.interLevelTime === 0) {
                            if (this.level <= this.maxLevels) {
                                Tools.calculateScore();
                                this.prepareForNextLevel();
                                console.log('next level!')
                            }
                        } else if (this.speed === 0) {
                            this.interLevelTime--;
                        }
                        if (this.speed === 0 && this.level > this.maxLevels && this.game) {
                            Tools.calculateScore();
                            Tools.saveScore();
                            this.game = false;
                        }
                    }
                    if (gfx.objects["finishline"]) {
                        Tools.handleObjects(gfx.objects["finishline"], true);
                    }
                    this.player.newPos();
                    this.player.update();

                    // check for collisions
                    let result = Tools.checkCollision("obstacles", this.player);
                    this.collisionBlock = result[0];
                    this.collision = result[1];

                    // relocate player to center of path when collision
                    if (this.collision && this.collisionBlock) {
                        this.relocatePlayer();
                    }

                    // switch(collision){
                    //     case 'Right' :
                    //         player.xPos += -20;
                    //         player.yPos += -10;
                    //         break;
                    //     case 'Left':
                    //         player.xPos += 20;
                    //         player.yPos += -10;
                    //         break;
                    //     case 'Top':
                    //         player.yPos += 20;
                    //         break;
                    //     case 'Bottom':
                    //         player.yPos += -20;
                    //         break;
                    // }

                    //immunity timer background reset
                    this.maybeResetBackground();

                    gfx.lag -= gfx.frameDuration;
                }
            }
        }

        //___FPS Control___\\
        gfx.now = window.performance.now();
        gfx.delta = gfx.now - gfx.previous;

        if (gfx.delta > gfx.frameDuration){
            gfx.delta = gfx.frameDuration;
        }

        gfx.lag += gfx.delta;

        gfx.fps = 1/ (gfx.delta/1000);
        gfx.displayFPS(gameArea.context, gameArea.canvas);

        gfx.previous = gfx.now;
    };
}