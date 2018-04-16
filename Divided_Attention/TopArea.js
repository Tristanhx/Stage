let leftBlocks = [];
let rightBlocks = [];
let blockSize;
let makeNew = true;
let blockPositionX;
let blockPositionY;
let response = 'nothing';
let same;
let pressed = false;

// this is the top area
const topArea = {
    // create topcanvas
    topcanvas: document.createElement("canvas"),
    start: function(){
        this.topcanvas.width = topAreaWidth;
        this.topcanvas.height = topAreaHeight;
        this.topcanvas.style.border = "1px solid #000000";
        this.topcanvas.style.backgroundColor = "#FFFFFF";
        this.div = document.getElementById("topArea");
        this.div.appendChild(this.topcanvas);
        // get topcanvas bottomcontext
        this.topcontext = this.topcanvas.getContext("2d");
        this.frameNumber = 0;
        this.interval = setInterval(updateTopArea, 10);
        window.addEventListener('keydown', function(e){
            topArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function(){
            topArea.key = false;
        })
    },
    clear: function(){
        this.topcontext.clearRect(0, 0, this.topcanvas.width, this.topcanvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
        this.topcanvas.width = 0;
        this.topcanvas.height = 0;
    }
};

function blockBuilder(){
    let leftRandom = Math.random();
    let rightRandom;

    if(same){
        rightRandom = leftRandom;
    }else{
        rightRandom = Math.random();
    }

    if (leftRandom <= 0.5){
        leftBlocks.push('yellow');
    } else{
        leftBlocks.push('blue');
    }
    if (rightRandom <= 0.5){
        rightBlocks.push('yellow');
    } else{
        rightBlocks.push('blue');
    }
    if (!same && (leftBlocks === rightBlocks) && leftBlocks.length === 4){
        rightBlocks = shuffle(rightBlocks);
    }
}

function updateTopArea() {
    blockSize = topArea.topcanvas.height / 2;
    topArea.clear();
    if (leftBlocks.length < 4){
        if (leftBlocks.length === 0){
            same = Math.random() < .25;
        }
        blockBuilder();
    } else if(makeNew){
        for (let i = 0 ; i < leftBlocks.length ; i++){
            blockPositionX = (i % 2 === 0 ? 0 : blockSize);
            blockPositionY = (i < 2 ? 0 : blockSize);
            leftBlocks[i] = new GameObject(blockSize, blockSize, leftBlocks[i], blockPositionX, blockPositionY, topArea.topcontext);
            rightBlocks[i] = new GameObject(blockSize, blockSize, rightBlocks[i], blockPositionX + 3*blockSize, blockPositionY, topArea.topcontext);
        }
        makeNew = false;
    } else{
        if (everyInterval(200)){
            leftBlocks = [];
            rightBlocks = [];
            if (same && !pressed){
                if(lives > 0 && !immunity){
                    lives--;
                    immunity = true;
                    bottomArea.bottomcanvas.style.backgroundColor = 'red';
                }
                lifeMeter.width = (livesArea.livescanvas.width / maxLives) * lives;
                lifeMeter.update();
            }
            makeNew = true;
            pressed = false;
        } else{
            leftBlocks.forEach(function(block){
                block.update();
            });
            rightBlocks.forEach(function(block){
                block.update();
            })
        }
    }
    if (topArea.key === 32 && leftBlocks.length === 4){
        response = checkBlocks(leftBlocks, rightBlocks);
        if (!same && !pressed){
            if(lives > 0 && !immunity){
                lives--;
                immunity = true;
                bottomArea.bottomcanvas.style.backgroundColor = 'red';
            }
            lifeMeter.width = (livesArea.livescanvas.width / maxLives) * lives;
            lifeMeter.update();
        }
        pressed = true;
    }

    if(response !== 'nothing'){
        topArea.topcanvas.style.backgroundColor = response === true ?  'green' : 'red';
        response = 'nothing';
    }
    if (everyInterval(33)){
        topArea.topcanvas.style.backgroundColor = "white";
    }

}

function checkBlocks(left, right){
    for (let i = 0 ; i < left.length ; i++){
        console.log(left[i].color, ' and ', right[i].color);
        if(left[i].color !== right[i].color){
            return false;
        }
    }
    return true;
}