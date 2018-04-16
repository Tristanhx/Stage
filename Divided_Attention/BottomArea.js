let obstacles = [];
let pathParts = [];
const gap = 100;
let collision = false;
const breakException = {};
let immunity = false;
let tempCollision;
let collisionBlock;
let randomNumber;
const obstacleSize = 10;

// this is the bottom area
const bottomArea = {
    // create bottomcanvas
    bottomcanvas: document.createElement("canvas"),
    // this is the method that is called when the body is done loading
    start: function () {
        this.bottomcanvas.width = bottomAreaWidth;
        this.bottomcanvas.height = bottomAreaHeight;
        this.bottomcanvas.style.border = "1px solid #00FF00";
        this.bottomcanvas.style.backgroundColor = "#000000";
        // get bottomcanvas bottomcontext
        this.bottomcontext = this.bottomcanvas.getContext("2d");
        this.div = document.getElementById("bottomArea");
        this.div.appendChild(this.bottomcanvas);
        // set frame number
        this.frameNumber = 0;
        // set interval for updating game area
        this.interval = setInterval(updateBottomArea, 10);
        //listen for keypress
        window.addEventListener('keydown', function(e){
            e.preventDefault();
            bottomArea.keys = (bottomArea.keys || []);
            bottomArea.keys[e.keyCode] = (e.type === 'keydown');
        });
        //listen for keyrelease
        window.addEventListener('keyup', function(e){
            bottomArea.keys[e.keyCode] = (e.type === 'keydown');
        });
    },
    stop: function(){
        clearInterval(this.interval);
        this.clear();
        this.bottomcontext.font = "30px Arial";
        this.bottomcontext.fillText("Dead", 100, 100);
        lives = 1;
        updateBottomArea();
        this.bottomcanvas.width = 0;
        this.bottomcanvas.height = 0;
    },
    // clear bottomcanvas
    clear: function(){
        this.bottomcontext.clearRect(0,0,this.bottomcanvas.width, this.bottomcanvas.height);
    }
};

function updateBottomArea() {
    try {
        obstacles.forEach(function (obstacle) {
            tempCollision = player.collisionWith(obstacle);
            if (tempCollision) {
                console.log('Collision!!! ', tempCollision);

                if(lives > 0 && !immunity){
                    lives--;
                    immunity = true;
                    bottomArea.bottomcanvas.style.backgroundColor = 'red';
                }
                lifeMeter.width = (livesArea.livescanvas.width / maxLives) * lives;
                lifeMeter.update();
                collisionBlock = obstacle;
                throw breakException;
            }
        });
    } catch(e){
        if (e !== breakException){
            throw e;
        }
    }

    collision = tempCollision;

    if (lives <= 0){
        saveScore();
        bottomArea.stop();
        topArea.stop();
        livesArea.stop();
    }

    if(bottomArea.frameNumber === 0){
        for (let i = 0; i < bottomArea.bottomcanvas.width ; i += obstacleSize) {
            if (i < blockLoc || i > blockLoc + gap) {
                obstacles.push(new GameObject(obstacleSize, obstacleSize, 'green', i, bottomArea.bottomcanvas.height, bottomArea.bottomcontext));
            }
        }
        for (let i = 0 ; i < bottomArea.bottomcanvas.height ; i += obstacleSize) {
            pathParts.push(new GameObject(bottomArea.bottomcanvas.width, obstacleSize, '#FFAA00', 0, i, bottomArea.bottomcontext));
        }
        player.xPos = blockLoc + (gap / 2);
    }
    bottomArea.clear();
    bottomArea.frameNumber += 1;

    if(bottomArea.frameNumber === 1 || everyInterval(10)){
        randomNumber = Math.random();
        if (blockLoc > obstacleSize && blockLoc < bottomArea.bottomcanvas.width - obstacleSize - gap) {
            randomNumber > 0.5 ? blockLoc += obstacleSize : blockLoc += -obstacleSize;
        }else if(blockLoc <=obstacleSize){
            blockLoc += obstacleSize;
        }else if(blockLoc >= bottomArea.bottomcanvas.width - obstacleSize - gap){
            blockLoc += -obstacleSize;
        }
        pathParts.push(new GameObject(gap - obstacleSize, obstacleSize, '#FFAA00', blockLoc + obstacleSize, bottomArea.bottomcanvas.height, bottomArea.bottomcontext));
        obstacles.push(new GameObject(obstacleSize, obstacleSize, 'green', blockLoc, bottomArea.bottomcanvas.height, bottomArea.bottomcontext));
        obstacles.push(new GameObject(obstacleSize, obstacleSize, 'green', blockLoc+gap, bottomArea.bottomcanvas.height, bottomArea.bottomcontext));
    }
    handleObjects(obstacles);
    handleObjects(pathParts);

    player.xDir = 0;
    if(bottomArea.keys && bottomArea.keys[37]){
        player.xDir = -1;
    }
    if(bottomArea.keys && bottomArea.keys[39]){
        player.xDir = 1;
    }

    if (collision){
        player.xPos = collisionBlock.blockLoc + (gap/2);
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

    player.newPos();
    player.update();
    collision = false;
    if (everyInterval(33)){
        bottomArea.bottomcanvas.style.backgroundColor = 'black';
        immunity = false;
    }
}

function everyInterval(n) {
    return (bottomArea.frameNumber / n) % 1 === 0;
}

function handleObjects(objects){
    for (let i = 0 ; i < objects.length ; i++){
        if (objects[i].yPos < -obstacleSize){
            objects.splice(i, 1);
        }
        objects[i].yPos--;
        objects[i].update();
    }
}