function GameObject(width, height, color, xPos, yPos, type, stroke, path, gap) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.blockLoc = gm.blockLoc;
    this.path = path;
    this.gap = gap;
    this.context = gameArea.context;
    this.type = type;
    this.update = function () {
        this.left = this.xPos;
        this.right = this.xPos + this.width;
        this.top = this.yPos;
        this.bottom = this.yPos + this.height;
        if (stroke){
            this.context.fillStyle = this.color;
            this.context.strokeRect(this.xPos, this.yPos, this.width, this.height);
        }else {
            this.context.fillStyle = this.color;
            this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
        }

        if(this.type === "top"){
            this.context.fillStyle = 'black';
            this.context.strokeRect(this.xPos, this.yPos, this.width, this.height);
        }
    };

}
