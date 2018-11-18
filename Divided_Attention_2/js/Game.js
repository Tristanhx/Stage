class GameLoop {

    constructor(){
        //__Game__\\
        this.score = 0;
        this.frames = 0;
        this.speedBuffer = 0;
        this.immunityTime = 10;
        this.immunityTimer = this.immunityTime;
        this.userName = null;
        this.pathOnlyBool = true;
        this.blocksOnlyBool = false;
        this.game = false;
        this.ready = false;
        this.overlay = false;
        this.level = 1;
        this.level_name = "path Only";
        this.levelTime = 0;
        this.levelTimeData = [];
        this.maxLevels = 2;
        this.maxLives = 10;
        this.lives = this.maxLives;
        this.data = [];
        this.trialData = [];
        this.trial = 0;
        this.revertHitBarColor = setTimeout(function(){
            gameArea.hitBar.color = "#00A4E1";
            gameArea.hitBar.update();
        }, 1000);
        this.hits = 0;

        //__Level Arrays__\\
        this.straightPathFramesArray = [];
        this.straightPathXPosArray = [];
        this.straightPathHSpeedArray = [];
        this.straightPathVSpeedArray = [];
        this.straightPathGapArray = [];

        this.pathOnlyFramesArray = [];
        this.pathOnlyXPosArray = [];
        this.pathOnlyHSpeedArray = [];
        this.pathOnlyVSpeedArray = [];
        this.pathOnlyGapArray = [];

        this.level_1_FramesArray = [];
        this.level_1_XPosArray = [];
        this.level_1_HSpeedArray = [];
        this.level_1_VSpeedArray = [];
        this.level_1_GapArray = [];

        this.level_2_FramesArray = [];
        this.level_2_XPosArray = [];
        this.level_2_HSpeedArray = [];
        this.level_2_VSpeedArray = [];
        this.level_2_GapArray = [];

        this.level_3_FramesArray = [];
        this.level_3_XPosArray = [];
        this.level_3_HSpeedArray = [];
        this.level_3_VSpeedArray = [];
        this.level_3_GapArray = [];

        this.currentFramesArray = this.pathOnlyFramesArray;
        this.currentXPosArray = this.pathOnlyXPosArray;
        this.current_h_speedArray = this.pathOnlyHSpeedArray;
        this.current_v_speedArray = this.pathOnlyVSpeedArray;
        this.currentGapArray = this.pathOnlyGapArray;

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
        this.player = new Player(this.playerDim, this.playerDim, 'blue', this.currentXPosArray[0]+(this.currentGapArray[0]/2), 500);
    }

    setCurrentArray(framesArray, xPosArray, hSpeedArray, vSpeedArray, gapArray){
        this.currentFramesArray = framesArray;
        this.currentXPosArray = xPosArray;
        this.current_h_speedArray = hSpeedArray;
        this.current_v_speedArray = vSpeedArray;
        this.currentGapArray = gapArray;
    }

    resetValues(){
        //__Game__\\
        this.immunityTimer = this.immunityTime;
        this.lives = this.maxLives;
        this.frames = 1;
        this.levelTime = 0;
        this.showBlocks = false;
        this.hits = 0;

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
        this.gap = this.currentGapArray[0];
        this.blockLoc = this.currentXPosArray[0];
        //levels and finish
        this.finish = false;
        this.finishArea = false;
        this.interLevelTime = this.interLevelTimeSetting;
        this.countDownSeconds = this.countDownSecondsSetting;
        this.countDownTimer = 0;

        gfx.objects['finishline'] = [];
        gfx.objects['obstacles'] = [];
        gfx.objects['pathParts'] = [];
    }

    prepareForNextLevel(){
        this.logLevelTime(this.level_name, this.levelTime, this.hits);
        //console.log("levelduration in frames: ", this.frames);

        //shouldn't change speed anymore if we are to compare levels
        // if(this.lives === this.maxLives) {
        //     this.speedSetting += 1;
        //     this.maxLives -= 1;
        // } else if(this.lives < this.maxLives){
        //     this.speedSetting += 0;
        //     this.maxLives -= 1;
        // }
        Tools.clearBlocks();
        gfx.objects['obstacles'] = [];
        gfx.objects['pathParts'] = [];
        this.resetValues();
        //console.log(this.lives, "/", this.maxLives);
        //.log("Cumulative score: ", this.score);

        gameArea.lifeMeterBorders = [];
        //gameArea.fillBorders();

        gfx.objects["leftBlocks"] = [];
        gfx.objects["rightBlocks"] = [];
        gameArea.clearBottom();
        gameArea.clearTop();
        gameArea.clearTopBlocks();
        gameArea.clearLives();
        Tools.livesChange();
        this.countDown = true;
    }

    changeType(){
        if (this.pathOnlyBool){
            this.setCurrentArray(this.straightPathFramesArray, this.straightPathXPosArray, this.straightPathHSpeedArray, this.straightPathVSpeedArray, this.straightPathGapArray);
            //console.log("changed to block");
            this.level_name = "blocks Only";
            this.pathOnlyBool = false;
            this.blocksOnlyBool = true;
            this.ready = false;
            this.overlay = false;
            gameArea.clearEntireTop();
            this.blocksOnly()
        } else if(this.blocksOnlyBool){
            this.setCurrentArray(this.level_1_FramesArray, this.level_1_XPosArray, this.level_1_HSpeedArray, this.level_1_VSpeedArray, this.level_1_GapArray);
            //console.log("changed to level 1");
            this.level_name = "level 1";
            this.blocksOnlyBool = false;
            this.ready = false;
            this.overlay = false;
            this.game = true;
            this.gameLoop();
        } else {
            if (this.level === 1){
                this.setCurrentArray(this.level_2_FramesArray, this.level_2_XPosArray, this.level_2_HSpeedArray, this.level_2_VSpeedArray, this.level_2_GapArray);
                //console.log("changed to level 2");
                this.level_name = "level 2";
            }
            if (this.level === 2){
                this.setCurrentArray(this.level_3_FramesArray, this.level_3_XPosArray, this.level_3_HSpeedArray, this.level_3_VSpeedArray, this.level_3_GapArray);
                //console.log("changed to level 3");
                this.level_name = "level 3";
            }
            this.level++;
            this.goToNexLevel();
        }
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

    createStartingArea(){
        //console.log("start!");
        this.startingArea = new GameObject(gameArea.canvas.width + 200, gameArea.canvas.width + 200, '#FFAA00', -100, gameArea.livesBorder, "start", false, false, false);
    }

    createFinishLine(){
        //console.log('finishline!');
        this.finishArea = new GameObject(gameArea.canvas.width + 20, gameArea.canvas.width + 20, '#FFAA00', -10, gameArea.canvas.height -10, "finish", false, false, false);
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

    logData(event){
        this.data.push([this.frames, this.level_name, this.speed, this.hits, Math.round(this.player.xPos), Math.round(this.blockLoc),
            Math.round(this.blockLoc + this.gap), gameArea.canvas.style.width, event]);
        //console.log("logging data");
    }

    logTrialData(trialType, rt){
        this.trialData.push([this.userName, this.frames, this.trial, this.level_name, trialType, rt]);
    }

    logLevelTime(level_name, level_time, hits){
        this.levelTimeData.push([level_name, level_time, hits]);
    }

    fetchValues(frame){
        if (frame < this.currentFramesArray.length) {
            this.blockLoc = this.currentXPosArray[frame];
            this.gap = this.currentGapArray[frame];
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
            //console.log('overlay on!');
        }
        else{
            document.getElementById('overlay').style.display = "none";
            //console.log('overlay off!');
        }
        this.showMessage(type);
    }

    showMessage(type){
        if (type === "path"){
            document.getElementById("path_only_instructions").style.display = "block";
            document.getElementById("blocks_only_instructions").style.display = "none";
            document.getElementById("divided_attention_instructions").style.display = "none";
            document.getElementById("end").style.display = "none";
        } else if(type === "blocks"){
            document.getElementById("blocks_only_instructions").style.display = "block";
            document.getElementById("path_only_instructions").style.display = "none";
            document.getElementById("divided_attention_instructions").style.display = "none";
            document.getElementById("end").style.display = "none";
        } else if (type === "DA"){
            document.getElementById("divided_attention_instructions").style.display = "block";
            document.getElementById("blocks_only_instructions").style.display = "none";
            document.getElementById("path_only_instructions").style.display = "none";
            document.getElementById("end").style.display = "none";
        } else if(type === "end"){
            document.getElementById("end").innerHTML = `This is the end. Well done!`;
            document.getElementById("end").style.display = "block";
            document.getElementById("path_only_instructions").style.display = "none";
            document.getElementById("blocks_only_instructions").style.display = "none";
            document.getElementById("divided_attention_instructions").style.display = "none";
        } else if(type ==="none"){
            document.getElementById("path_only_instructions").style.display = "none";
            document.getElementById("blocks_only_instructions").style.display = "none";
            document.getElementById("divided_attention_instructions").style.display = "none";
            document.getElementById("end").style.display = "none";
        }
    }
    fpsControl(){
        //___FPS Control___\\
        gfx.now = window.performance.now();
        gfx.delta = gfx.now - gfx.previous;

        if (gfx.delta > gfx.frameDuration){
            gfx.delta = gfx.frameDuration;
        }

        gfx.lag += gfx.delta;

        gfx.fps = 1/ (gfx.delta/1000);
        //gfx.displayFPS(gameArea.context, gameArea.canvas);

        gfx.previous = gfx.now;
    }

    //TODO: place overlay in between levels
    doGameThings(type){
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
                if (!this.startingArea) {
                    //initial objects
                    this.createStart();
                    this.createStartingArea();
                }

                if (gfx.objects['pathParts']) {
                    Tools.handleObjects(gfx.objects["pathParts"]);
                }
                this.player.update();
                if (this.countDownTimer % gfx.tfps === 0) {
                    this.countDownObject.text = this.countDownArray[this.countDownSeconds - 1].toString();
                    this.countDownObject.context = gameArea.context;
                    this.countDownSeconds--;
                }
                this.countDownObject.update();
                this.countDownTimer++;
                this.startingArea.update();
            }
        } else {
            // if ((this.frames / 10) % 1 === 0) {
            //     this.logData();
            // }
            // //__Pick Path__\\
            // if (this.pathDurationCounter === this.pathDuration) {
            //     this.pathDuration = Tools.pathDurationSetter();
            //     this.pathPicker = Tools.pathPickerSetter();
            //     this.pathDurationCounter = 0;
            // }
            // this.currentPath = this.pathDir[this.pathPicker];

            //__Check lives__\\
            if (this.lives <= 0 && (this.game || this.pathOnlyBool || this.blocksOnlyBool)) {
                this.game = false;
                this.pathOnlyBool = false;
                this.blocksOnlyBool = false;
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

                this.levelTime++;

                //__IO__\\
                if (this.speed !== 0) {
                    if(type === "pathOnly") {
                        io.handleArrowKeyPress();
                    } else if(type === "blocksOnly") {
                        io.handleSpaceBar();
                    } else{
                        io.handleArrowKeyPress();
                        io.handleSpaceBar();
                    }
                }

                //__Areas__\\
                // if(type === "pathOnly") {
                //     gfx.renderBottomArea(this.speed, this.frames, this.obstacleSize);
                // } else if(type === "blocksOnly") {
                //     gfx.renderTopArea(this.speed, this.frames, this.match);
                // } else{
                    if(type === "blocksOnly" || type === null) {
                        gfx.renderTopArea(this.speed, this.frames);
                    }
                    // we always need to run the bottom area because that is how the game ends; by reaching the finish line
                    gfx.renderBottomArea(this.speed, this.frames, this.obstacleSize);
                // }

                //__Other Things__\\
                if (this.startingArea){
                    if (this.startingArea.clipy < 151) {
                        //this.startingArea.cliph -= this.speed;
                        this.startingArea.clipy += this.speed /7;
                        this.startingArea.update();
                    } else{
                        this.startingArea = false;
                    }
                }
                if (this.finish && this.finishArea) {
                    this.finishArea.yPos -= this.speed;
                    this.finishArea.update();
                    this.speed = this.finishArea.yPos <= this.player.yPos ? 0 : this.speed;
                    if (this.interLevelTime === 0) {
                        if (this.level <= this.maxLevels) {
                            Tools.calculateScore();
                            this.prepareForNextLevel();
                            this.changeType();
                            //console.log('next level!')
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

                // relocate player to center of path after collision
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

    pathOnly() {
        //__RAF__\\
        if (this.pathOnlyBool) {
            requestAnimationFrame(() => {this.pathOnly()})
        }
        if (!this.ready && !this.overlay) {
            this.overlayToggle(true, "path");
            this.overlay = true;
        }
        if (this.overlay) {
            gfx.lag = 0;
        }
        if (this.ready) {this.doGameThings("pathOnly");}

        if (this.pathOnlyBool) {
            gameArea.context.fillStyle = "red";
            gameArea.context.fillText("Follow the path", 100, 50);
        }

        this.fpsControl();
    }

    blocksOnly(){
        //__RAF__\\
        if (this.blocksOnlyBool){
            requestAnimationFrame(() => {this.blocksOnly()})
        }
        if (!this.ready && !this.overlay) {
            this.overlayToggle(true, "blocks");
            this.overlay = true;
        }
        if (this.overlay){
            gfx.lag = 0;
        }
        if (this.ready){this.doGameThings("blocksOnly");}

        if (this.blocksOnlyBool) {
            gameArea.context.fillStyle = "red";
            gameArea.context.fillText("Matching blocks?", 100, 400);
        }

        this.fpsControl();

    }

    gameLoop(){
        //__RAF__\\
        if (this.game) {
            requestAnimationFrame(() => {this.gameLoop()});
        } else if(this.pathOnlyBool){
            this.setCurrentArray(this.pathOnlyFramesArray, this.pathOnlyXPosArray, this.pathOnlyHSpeedArray, this.pathOnlyVSpeedArray, this.pathOnlyGapArray);
            this.prepareForNextLevel();
            //console.log(this.currentFramesArray);
            this.pathOnly();
        } else if(this.blocksOnlyBool){
            this.setCurrentArray(this.straightPathFramesArray, this.straightPathXPosArray, this.straightPathHSpeedArray, this.straightPathVSpeedArray, this.straightPathGapArray);
            this.blocksOnly();
        }

        if (!this.ready && !this.overlay) {
            this.overlayToggle(true, "DA");
            this.overlay = true;
        }
        if (this.overlay){
            gfx.lag = 0;
        }
        if(this.ready) {this.doGameThings(null);}

        this.fpsControl();

    };
}