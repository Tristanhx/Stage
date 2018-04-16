function Indicator(width, height, color, xPos, yPos, xPos2, yPos2, gap) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xPos2 = xPos2;
    this.yPos2 = yPos2;
    this.gap = gap;
    this.xDir = 0;
    this.yDir = 0;
    this.update = function () {
        const context = gameArea.context;
        context.fillStyle = this.color;
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
        context.fillRect(this.xPos2, this.yPos2, this.width, this.height);
    };

    this.changeGap = function(delta){
        this.xPos2 += delta;
        this.xPos -=delta;
        this.gap = this.xPos2 - this.xPos;
    };

    this.newPos = function(){
        this.hitEdge();
        this.xPos += this.xDir;
        this.yPos += this.yDir;
        this.xPos2 += this.xDir;
        this.yPos2 += this.yDir;

    };
    this.hitEdge = function(){
        let bottom = gameArea.canvas.height - this.height;
        let left = 0;
        let right = gameArea.canvas.width - this.width - this.gap;
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
}