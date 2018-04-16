function GameObject(width, height, color, xPos, yPos, context) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.blockLoc = blockLoc;
    this.context = context;
    this.update = function () {
        // sides
        this.left = this.xPos;
        this.right = this.xPos + this.width;
        this.top = this.yPos;
        this.bottom = this.yPos + this.height;
        this.context.fillStyle = this.color;
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);

        if(this.context === topArea.topcontext){
            this.context.fillStyle = 'black';
            this.context.strokeRect(this.xPos, this.yPos, this.width, this.height);
        }
    };

}
