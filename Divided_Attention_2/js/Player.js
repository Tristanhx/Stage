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
        const context = gameArea.context;
        gm.imgFrame++;
        if (gm.imgFrame === 1) {
            gm.activeImage = gm.run0;
        } else if (gm.imgFrame === 18 || gm.imgFrame === 52){
            gm.activeImage = gm.run1;
        } else if (gm.imgFrame === 35){
            gm.activeImage = gm.run2
        } else if (gm.imgFrame === 69){
            gm.imgFrame = 0;
        }
        context.drawImage(gm.activeImage, this.xPos, this.yPos);
    };

    this.newPos = function(){
        this.hitEdge();
        this.xPos += this.xDir;
    };
    this.hitEdge = function(){
        let bottom = gameArea.canvas.height - this.height;
        let left = 0;
        let right = gameArea.canvas.width - this.width;
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
}