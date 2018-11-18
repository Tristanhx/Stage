class Tools{

    static livesChange(red){
        // gameArea.lifeMeter.width = (gameArea.canvas.width / gm.maxLives) * gm.lives;
        // gameArea.lifeMeterBg.update();
        // gameArea.lifeMeter.update();
        // gm.logData("lives change");

        clearTimeout(gm.revertHitBarColor);
        if (red) {
            gameArea.hitBar.color = "red";
            gameArea.hitBar.update();
        } else {
            gameArea.hitBar.color = "green";
            gameArea.hitBar.update();
        }
        gm.revertHitBarColor = setTimeout(function(){
            gameArea.hitBar.color = "#00A4E1";
            gameArea.hitBar.update();
        }, 1000);
    }

    static checkCollision(array, object){
        if(!gm.countDown) {
            let tempObstacle = false, tempCollision = false;
            try {
                gfx.objects[array].forEach(function (item) {
                    tempCollision = Tools.collisionWith(object, item);
                    if (tempCollision) {
                        //console.log("collision");
                        //console.log(item);
                        // if (gm.lives > 0 && !gm.immunity) {
                        //     gm.lives--;
                        //     gm.immunity = true;
                        //     gameArea.canvas.style.backgroundColor = 'red';
                        // }
                        tempObstacle = item;
                        Tools.livesChange(true);
                        //Tools.handleObjects(gameArea.lifeMeterBorders);
                        throw gm.breakException;
                    }
                });
            } catch (e) {
                if (e !== gm.breakException) {
                    throw e;
                } else {
                    return [tempObstacle, tempCollision]
                }
            }
        }

        return [false, false];
    }

    static changeBlockLoc(path){
        if (gm.blockLoc > gm.obstacleSize && gm.blockLoc < gameArea.canvas.width - gm.obstacleSize - gm.gap) {
            switch (path){
                case "Left":
                    gm.blockLoc -= gm.obstacleSize * gm.speed;
                    break;
                case "Right":
                    gm.blockLoc += gm.obstacleSize * gm.speed;
                    break;
                case 'Straight':
                    break;
            }
        }else if(gm.blockLoc <= gm.obstacleSize){
            gm.blockLoc += gm.obstacleSize;
        }else if(gm.blockLoc >= gameArea.canvas.width - gm.obstacleSize - gm.gap){
            gm.blockLoc += -gm.obstacleSize;
        }
    }

    static collisionWith (object1, object2) {
        let collision = true;
        if ((object1.left > object2.right)|| (object1.right < object2.left) || (object1.top > object2.bottom) || (object1.bottom < object2.top)){
            collision = false;
        }
        return collision;
    };

    static createInitialObjects(){
        let colors = ['#50BAE1', "#000"];
        for (let i = gameArea.livesBorder; i < gameArea.canvas.width ; i += gm.obstacleSize) {
            if (i < gm.blockLoc || i > gm.blockLoc + gm.gap) {
                gfx.placeObjects("obstacles", gm.obstacleSize, gm.obstacleSize * gm.speed, '#000', i, gameArea.canvas.height, gameArea.context, 1, gm.gap);
            }
        }
        //gm.startArea = new GameObject(gameArea.canvas.width, gameArea.canvas.height, '#FFAA00', 0, gameArea.canvas.height, "start", false, false, false);

        //this is the start area!
        //gfx.placeObjects("pathParts", (gameArea.canvas.width + 20)*5, (gameArea.canvas.height + 20)*5, "#50BAE1", -10, gameArea.livesBorder + 10, "start", 1, gm.gap);
        // for (let i = gameArea.livesBorder ; i < gameArea.canvas.height ; i += gm.obstacleSize) {
        //     gfx.placeObjects("pathParts", gameArea.canvas.width, Math.round(gm.obstacleSize * gm.speed) *2, colors[i%2], 0, i, gameArea.context, 1, gm.gap);
        // }
        gm.player.xPos = gm.blockLoc + (gm.gap / 2);
    }

    static blockBuilder(match){
        let leftRandom = Math.random();
        let rightRandom;

        if(match){
            rightRandom = leftRandom;
            //console.log("match!");
            //console.log(leftRandom);
        }else{
            rightRandom = Math.random();
            //console.log("no match!");
        }

        if (leftRandom <= 0.5){
            gfx.appendBlock("leftBlocks", "yellow");
        } else{
            gfx.appendBlock("leftBlocks", "blue");
        }
        if (rightRandom <= 0.5){
            gfx.appendBlock("rightBlocks", "yellow");
        } else{
            gfx.appendBlock("rightBlocks", "blue");
        }

        // make sure that no two same blockSets follow each other
        while(gfx.objects["leftBlocks"].length === 4 && (gfx.objects["leftBlocks"] === gfx.objects["previousLeftBlocks"]) && (gfx.objects["rightBlocks"] === gfx.objects["previousRightBlocks"])){
            if (Tools.allValuesSame(gfx.objects["leftBlocks"])){
                gfx.objects["leftBlocks"][0] =  gfx.objects["leftBlocks"][0] === 'yellow' ? 'blue' : 'yellow';
            }

            gfx.objects["leftBlocks"] = Tools.shuffle(gfx.objects["leftBlocks"]);
            if (match) {
                gfx.objects["rightBlocks"] = gfx.objects["leftBlocks"];
            } else {
                gfx.objects["rightBlocks"] = Tools.shuffle(gfx.objects["rightBlocks"]);
            }
        }

        if (!match && Tools.checkBlocks(gfx.objects["leftBlocks"], gfx.objects["rightBlocks"]) && gfx.objects["leftBlocks"].length === 4){
            Tools.ensureDifference();
        }
        gm.blockCount++;
    }

    static allValuesSame(array){
        for(let i = 1; i < array.length; i++)
        {
            if(array[i] !== array[0])
                return false;
        }

        return true;
    }

    static ensureDifference(){
        gfx.objects["rightBlocks"][0] = gfx.objects["rightBlocks"][0] === 'yellow' ? 'blue' : 'yellow';
        gfx.objects["rightBlocks"] = Tools.shuffle(gfx.objects["rightBlocks"]);
        //console.log("ensured difference!");
    }

    static shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    static makeNewBlocks(){
        gameArea.canvas.style.backgroundColor = "black";
        for (let i = 0; i < gfx.objects["leftBlocks"].length; i++) {
            gm.blockPositionX = (i % 2 === 0 ? 0 : gm.blockSize);
            gm.blockPositionY = (i < 2 ? 0 : gm.blockSize);
            gfx.objects["leftBlocks"][i] = new GameObject(gm.blockSize, gm.blockSize, gfx.objects["leftBlocks"][i],
                gm.blockPositionX + gameArea.topLeft, gm.blockPositionY, "top", false, false, false);
            gfx.objects["rightBlocks"][i] = new GameObject(gm.blockSize, gm.blockSize, gfx.objects["rightBlocks"][i],
                gm.blockPositionX + 3 * gm.blockSize + gameArea.topLeft, gm.blockPositionY, "top", false, false, false);
        }
        gfx.objects["leftBlocks"].forEach(function (block) {
            block.update();
        });
        gfx.objects["rightBlocks"].forEach(function (block) {
            block.update();
        });
        gm.makeNew = false;
        gm.blockPresentationTime = gm.blockPresentationTimeSetter;

        gm.blockNow = window.performance.now();
        gm.trial++;

        //console.log("left: " + [gfx.objects["leftBlocks"][0].color, gfx.objects["leftBlocks"][1].color, gfx.objects["leftBlocks"][2].color, gfx.objects["leftBlocks"][3].color]
        //    + " right: " + [gfx.objects["rightBlocks"][0].color, gfx.objects["rightBlocks"][1].color, gfx.objects["rightBlocks"][2].color, gfx.objects["rightBlocks"][3].color]);

        gm.logData("left: " + [gfx.objects["leftBlocks"][0].color, gfx.objects["leftBlocks"][1].color, gfx.objects["leftBlocks"][2].color, gfx.objects["leftBlocks"][3].color].toString()
            + " right: " + [gfx.objects["rightBlocks"][0].color, gfx.objects["rightBlocks"][1].color, gfx.objects["rightBlocks"][2].color, gfx.objects["rightBlocks"][3].color].toString());
    }

    static clearBlocks(punish){
        gfx.objects["previousLeftBlocks"] = gfx.objects["leftBlocks"];
        gfx.objects["previousRightBlocks"] = gfx.objects["rightBlocks"];
        gfx.objects["leftBlocks"] = [];
        gfx.objects["rightBlocks"] = [];
        gm.blockCount = 0;
        if (gm.match && !io.pressed && punish) {
            //console.log('punish');
            gm.logTrialData("match", "NaN");
            // if (gm.lives > 0 && !gm.immunity) {
            //     gm.lives--;
            //     gm.immunity = true;
            //     gameArea.canvas.style.backgroundColor = 'red';
            // }
            Tools.livesChange();
            Tools.handleObjects(gameArea.lifeMeterBorders);
        } else if(!gm.match && !io.pressed){
            gm.logTrialData("no-match", "NaN");
        }
        gameArea.clearTopBlocks();
        gm.makeNew = true;
        io.pressed = false;
    }

    static pathDurationSetter(){
        return Math.floor(Math.random() * 10 + 10);
    }

    static pathPickerSetter(){
        return Math.floor(Math.random() * 3);
    }

    static checkBlocks(left, right){
        for (let i = 0 ; i < left.length ; i++){
            if(left[i] !== right[i]){
                return false;
            }
        }
        return true;
    }

    static handleObjects(objects, moving){
        if (objects.length !== 0) {

            for (let i = 0; i < objects.length; i++) {
                if(moving) {
                    if (objects[i].yPos <= gameArea.livesBorder && objects[i].type !== "start") {
                        if (objects[i].height > 0){
                            objects[i].height -= gm.speed;
                        } else {
                            objects.splice(i, 1);
                        }
                    }
                    //else if(objects[i].type === "start"){
                    //     if (objects[i].cliph > 0) {
                    //         objects[i].cliph -= gm.speed;
                    //         objects[i].clipy += gm.speed/10;
                    //     }
                    // }
                    else {
                        objects[i].yPos -= gm.speed;
                    }
                }
                objects[i].update();
                //gfx.drawSmoothLine(gfx.objects['obstacles']);
            }

        }
    }

    static makeLevelArrays(input, framesArray, xPosArray, hSpeedArray, vSpeedArray, gapArray){
        let level = input.split(',');
        for (let i = 0; i < level.length; i += 5) {
            framesArray.push(parseInt(level[i]));
            xPosArray.push(parseInt(level[i + 1]));
            hSpeedArray.push(parseInt(level[i + 2]));
            vSpeedArray.push(parseInt(level[i + 3]));
            gapArray.push(parseInt(level[i + 4]));
        }
        framesArray.shift();
        xPosArray.shift();
        hSpeedArray.shift();
        vSpeedArray.shift();
        gapArray.shift();
        //console.log("inside function (parameters): ", framesArray, xPosArray, hSpeedArray, vSpeedArray, gapArray);
        //console.log("inside function (references): ", gm.straightPathFramesArray, gm.straightPathXPosArray, gm.straightPathHSpeedArray, gm.straightPathVSpeedArray, gm.straightPathGapArray);
        if(gm.straightPathFramesArray.length > 0) {
            return "level made\n";
        }
        else{
            return "level not made\n";
        }
    };

    static getLevel(){

        //console.log("getting level");
        $.ajax({
            url: "getLevel.php",
            success: function (response) {
                let slicedResponse = response.slice(45);
                let levelArray = slicedResponse.split('[Frames]');
                //console.log(levelArray);

                Tools.makeLevelArrays(levelArray[0], gm.straightPathFramesArray, gm.straightPathXPosArray, gm.straightPathHSpeedArray, gm.straightPathVSpeedArray, gm.straightPathGapArray);
                Tools.makeLevelArrays(levelArray[1], gm.pathOnlyFramesArray, gm.pathOnlyXPosArray, gm.pathOnlyHSpeedArray, gm.pathOnlyVSpeedArray, gm.pathOnlyGapArray);
                Tools.makeLevelArrays(levelArray[2], gm.level_1_FramesArray, gm.level_1_XPosArray, gm.level_1_HSpeedArray, gm.level_1_VSpeedArray, gm.level_1_GapArray);
                Tools.makeLevelArrays(levelArray[3], gm.level_2_FramesArray, gm.level_2_XPosArray, gm.level_2_HSpeedArray, gm.level_2_VSpeedArray, gm.level_2_GapArray);
                Tools.makeLevelArrays(levelArray[4], gm.level_3_FramesArray, gm.level_3_XPosArray, gm.level_3_HSpeedArray, gm.level_3_VSpeedArray, gm.level_3_GapArray);

                //console.log("outside function: ", gm.straightPathFramesArray, gm.straightPathXPosArray, gm.straightPathHSpeedArray, gm.straightPathVSpeedArray, gm.straightPathGapArray);
                startGame();
            },
            error: () => {
                alert("Connection failed, please press F5 to try again")
            }
        });
    };

    static calculateScore(){
        let addedFractionD = gm.levelTime / 1000;
        let addedFraction;
        // no added points for the first 1000 frames in order to prevent addedFractionD from becoming smaller than the numerator
        if (addedFractionD < 1){
            addedFraction = 0;
        } else{
            addedFraction = 1 / addedFractionD;
        }
        let levelScore = gm.frames + (addedFraction * gm.frames);

       // console.log("levelscores: ", levelScore);
        //console.log("leveltime: ", gm.levelTime);

        gm.score += levelScore;
    }

    static makeCSV(headers, data){
        let csv = headers;
        data.forEach(function(looseData){
            let row = looseData.join(";");
            csv += row + "\r\n";
        });
        return csv;
    }

    static saveScore(){
        gm.overlayToggle(true, 'end');
        //console.log("Saving result");

        gm.logLevelTime(gm.level_name, gm.levelTime, gm.hits);

        let csv = Tools.makeCSV("Frames;Level;Speed;Hits;Player X;X Left;X Right;Screen-width;event\r\n", gm.data);

        let csv_trials = Tools.makeCSV("id;frame;trial;level;trialtype;reaction time\r\n", gm.trialData);

        let csv_level_times = Tools.makeCSV("level;level time;hits\r\n", gm.levelTimeData);

        //console.log(csv.length, csv_trials.length);

        $.post("userInfo.php",
            {
                name: gm.userName,
                score: gm.score,
                data: csv,
                trials: csv_trials,
                level_times: csv_level_times,
                keyReleases: io.keyReleases
            }
        );
    }
}