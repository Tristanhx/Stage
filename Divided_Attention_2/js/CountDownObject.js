function CountDownObject(width, height, color, xPos, yPos, context, text) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.xPos = xPos;
    this.yPosSetting  = yPos;
    this.yPos = this.yPosSetting;
    this.text = text;
    this.context = context;
    this.update = function () {
        if (parseInt(this.text) === 0){
            this.yPos -= gm.speed;
        }
        else {
            this.yPos = this.yPosSetting;
        }
        this.context.fillStyle = this.color;
        this.context.font = "Georgia 40px";
        this.context.fillText(this.text, this.xPos, this.yPos);
    };

}
