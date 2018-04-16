function Target(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = 'blue';
    this.update = function(){
        gameArea.context.strokeStyle = this.color;
        gameArea.context.lineWidth = 10;
        gameArea.context.strokeRect(this.x, this.y, this.w, this.h);
    }
}