function GameObject(width, height, color, xPos, yPos, gap) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.gap = gap;
    this.context = gameArea.context;
    this.update = function () {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.xPos, this.yPos, this.width, this.height);
        this.context.fillRect(this.xPos + this.gap, this.yPos, this.width, this.height);

    };

}
