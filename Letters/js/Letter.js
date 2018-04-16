function Letter(x, y, w, letter, d, color){
    this.x = x;
    this.y = y;
    this.w = w;
    this.letter = letter;
    this.d = d;
    this.color = color;
    this.target = false;
    this.update = function(){
        gameArea.context.font = this.w + "px Courier New";
        gameArea.context.fillStyle = this.color;
        gameArea.context.texAlign = 'center';
        gameArea.context.textBaseline = 'middle';
        gameArea.context.fillText(this.letter.toUpperCase(), this.x, this.y);
    }


}