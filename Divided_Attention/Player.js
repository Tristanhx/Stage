let player;
let playerDim = 24;
const run0 = new Image(playerDim, playerDim);
const run1 = new Image(playerDim, playerDim);
const run2 = new Image(playerDim, playerDim);
let activeImage = run0;
run0.src = './runningdown0.png';
run1.src = './runningdown1.png';
run2.src = './runningdown2.png';
let imgFrame = 0;

function Player(width, height, color, xPos, yPos) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xDir = 0;
    this.yDir = 0;
    this.update = function () {
        // sides
        this.left = this.xPos + 6;
        this.right = this.xPos + this.width - 6;
        this.top = this.yPos + 15;
        this.bottom = this.yPos + this.height - 6;
        const context = bottomArea.bottomcontext;
        imgFrame++;
        if (imgFrame === 1) {
            activeImage = run0;
        } else if (imgFrame === 18 || imgFrame === 52){
            activeImage = run1;
        } else if (imgFrame === 35){
            activeImage = run2
        } else if (imgFrame === 69){
            imgFrame = 0;
        }
        context.drawImage(activeImage, this.xPos, this.yPos);
    };

    this.newPos = function(){
        this.hitEdge();
        this.xPos += this.xDir;
        this.yPos += this.yDir;

    };
    this.hitEdge = function(){
        let bottom = bottomArea.bottomcanvas.height - this.height;
        let left = 0;
        let right = bottomArea.bottomcanvas.width - this.width;
        let top = 0;

        if(this.yPos > bottom){
            this.yDir = -1;
        }
        if(this.yPos <= top) {
            this.yDir = 1;
        }
        if(this.xPos > right){
            this.xDir = -1;
        }
        if(this.xPos <= left){
            this.xDir = 1;
        }
    };
    // this.collisionWith = function(obstacle){
    //     // left collision
    //     if(((obstacle.right >= this.left) && (obstacle.left <= this.left)) &&
    //         (((obstacle.top >= this.top) && (obstacle.top <= this.bottom)) || ((obstacle.bottom >= this.top) && (obstacle.bottom <= this.bottom)))){
    //         return 'Left';
    //     }
    //     // right collision
    //     if(((obstacle.left <= this.right) && (obstacle.right >= this.right)) &&
    //         (((obstacle.top >= this.top) && (obstacle.top <= this.bottom)) || ((obstacle.bottom >= this.top) && (obstacle.bottom <= this.bottom)))){
    //         return 'Right';
    //     }
    //     // top collision
    //     if(((obstacle.top <= this.bottom) && (obstacle.bottom >= this.bottom)) &&
    //         (((obstacle.left >= this.left) && (obstacle.left <= this.right)) || ((obstacle.right >= this.left) && (obstacle.right <= this.right)))){
    //         return 'Top';
    //     }
    //     //bottom collision
    //     if(((obstacle.bottom >= this.top) && (obstacle.top <= this.top)) &&
    //         (((obstacle.left >= this.left) && (obstacle.left <= this.right)) || ((obstacle.right >= this.left) && (obstacle.right <= this.right)))){
    //         return 'Bottom';
    //     }
    //     return false;
    //
    // }
    this.collisionWith = function(obstacle) {
        let collision = true;
        if ((this.left > obstacle.right)|| (this.right < obstacle.left) || (this.top > obstacle.bottom) || (this.bottom < obstacle.top)){
            collision = false;
        }
        return collision;
    };
}