function Target(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = '#50BAE1';
    this.update = function(){
        gameArea.context.strokeStyle = this.color;
        gameArea.context.lineWidth = 10;
        gameArea.context.roundRect(this.x, this.y, this.w, this.h, {upperLeft:10,upperRight:10,lowerLeft:10,lowerRight:10}, false, true);
    }
}