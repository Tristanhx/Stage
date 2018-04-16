class Tools{

    static livesChange(){
        gameArea.lifeMeter.width = (gameArea.canvas.width / gm.maxLives) * gm.lives;
        gameArea.lifeMeterBg.update();
        gameArea.lifeMeter.update();
    }

    static checkCollision(array, object){
        if(!gm.countDown) {
            let tempObstacle = false, tempCollision = false;
            try {
                gfx.objects[array].forEach(function (item) {
                    tempCollision = Tools.collisionWith(object, item);
                    if (tempCollision) {
                        console.log("collision");
                        console.log(item);
                        if (gm.lives > 0 && !gm.immunity) {
                            gm.lives--;
                            gm.immunity = true;
                            gameArea.canvas.style.backgroundColor = 'red';
                        }
                        tempObstacle = item;
                        Tools.livesChange();
                        Tools.handleObjects(gameArea.lifeMeterBorders);
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
        for (let i = gameArea.livesBorder; i < gameArea.canvas.width ; i += gm.obstacleSize) {
            if (i < gm.blockLoc || i > gm.blockLoc + gm.gap) {
                gfx.placeObjects("obstacles", gm.obstacleSize, gm.obstacleSize * gm.speed, '#00FF00', i, gameArea.canvas.height, gameArea.context, 1, gm.gap);
            }
        }
        for (let i = gameArea.livesBorder ; i < gameArea.canvas.height ; i += gm.obstacleSize) {
            gfx.placeObjects("pathParts", gameArea.canvas.width, Math.round(gm.obstacleSize * gm.speed) *2, '#FFAA00', 0, i, gameArea.context, 1, gm.gap);
        }
        gm.player.xPos = gm.blockLoc + (gm.gap / 2);
    }

    static blockBuilder(match){
        let leftRandom = Math.random();
        let rightRandom;

        if(match){
            rightRandom = leftRandom;
        }else{
            rightRandom = Math.random();
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

    static ensureDifference(){
        gfx.objects["rightBlocks"][0] = 'yellow' ? 'blue' : 'yellow';
        gfx.objects["rightBlocks"] = Tools.shuffle(gfx.objects["rightBlocks"]);
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
        gm.blockSize = gameArea.topBorder / 2;
        for (let i = 0; i < gfx.objects["leftBlocks"].length; i++) {
            gm.blockPositionX = (i % 2 === 0 ? 0 : gm.blockSize);
            gm.blockPositionY = (i < 2 ? 0 : gm.blockSize);
            gfx.objects["leftBlocks"][i] = new GameObject(gm.blockSize, gm.blockSize, gfx.objects["leftBlocks"][i],
                gm.blockPositionX + gameArea.topLeft, gm.blockPositionY, "top");
            gfx.objects["rightBlocks"][i] = new GameObject(gm.blockSize, gm.blockSize, gfx.objects["rightBlocks"][i],
                gm.blockPositionX + 3 * gm.blockSize + gameArea.topLeft, gm.blockPositionY, "top");
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

        console.log("blocksize: ", gm.blockSize, " blockPos: ", gm.blockPositionX, "/", gm.blockPositionY);
    }

    static clearBlocks(punish){
        gfx.objects["previousLeftBlocks"] = gfx.objects["leftBlocks"];
        gfx.objects["previousRightBlocks"] = gfx.objects["rightBlocks"];
        gfx.objects["leftBlocks"] = [];
        gfx.objects["rightBlocks"] = [];
        gm.blockCount = 0;
        if (gm.match && !io.pressed && punish) {
            console.log('punish');
            if (gm.lives > 0 && !gm.immunity) {
                gm.lives--;
                gm.immunity = true;
                gameArea.canvas.style.backgroundColor = 'red';
            }
            Tools.livesChange();
            Tools.handleObjects(gameArea.lifeMeterBorders);
        }
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
                    if (objects[i].yPos <= gameArea.livesBorder) {
                        objects.splice(i, 1);
                    } else {
                        objects[i].yPos -= gm.speed;
                    }
                }
                objects[i].update();
            }

        }
    }

    static getLevel(){
        console.log("getting level");
        $.ajax({
            url: "getLevel.php",
            success: function(response) {
                levelString = response;
                startGame();
            },
            error: () => {alert("Connection failed, please press F5 to try again")}
        });
    }

    static saveScore(){
        console.log("Saving result");
        let csv = "[Frames], [Level], [Speed], [Lives], [Player X], [X Left], [X Right], [Screen-width]\r\n";
        gm.data.forEach(function(data){
            let row = data.join(",");
            csv += row + "\r\n";
        });

        console.log(csv.length);

        $.post("userInfo.php",
            {
                name: gm.userName,
                score: gm.score,
                data: csv,
                keyReleases: io.keyReleases
            }
        );
    }
}