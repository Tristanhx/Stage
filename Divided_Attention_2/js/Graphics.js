class Graphics{
    constructor() {
        this.fps = 0;
        this.tfps = 60;
        this.frameDuration = 1000/this.tfps;
        this.now = 0;
        this.previous = 0;
        this.objects = {};
        this.lag = 0;
        this.delta = 0;
    }

    placeObjects(array, w, h, c, x, y, context, gap) {
        this.createArrayInObjects(array);
        let pathDirection = "";
        if (array === "obstacles" || array === "obstacles right") {
            try {
                if (this.objects[array][-1].blockLoc === gm.blockLoc) {
                    pathDirection = "Straight";
                } else if (this.objects[array][-1].blockLoc < gm.blockLoc) {
                    pathDirection = "Left";
                } else if (this.objects[array][-1].blockLoc > gm.blockLoc) {
                    pathDirection = "Right";
                }
            } catch(e){
                pathDirection = "Straight";
            }
            this.objects[array].push(new GameObject(w, h, c, x, y, context, false, pathDirection, gap));
        } else {
            this.objects[array].push(new GameObject(w, h, c, x, y, context));
        }

    }

    drawSmoothPath(left, right){
        if(left & right){
            // draw line
            gameArea.context.fillStyle = '#50BAE1';
            gameArea.context.strokeStyle = 'red';
            gameArea.context.beginPath();
            gameArea.context.moveTo(left[0].xPos, left[0].yPos);
            console.log(typeof left, typeof right);


            let i;
            for (i = 1; i < (left.length - 2); i++)
            {
                //let xc = (points[i].xPos + points[i + 1].xPos) / 2;
                //let yc = (points[i].yPos + points[i + 1].yPos) / 2;
                //gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, xc, yc);
                gameArea.context.lineTo(left[i].xPos, left[i].yPos);
            }


            //for (i = (right.length - 1); i >= 0; i--)
            for (i = right.length - 1; i >= 0; i++) {
                //let xc = (points[i].xPos + points[i + 1].xPos) / 2;
                //let yc = (points[i].yPos + points[i + 1].yPos) / 2;
                //gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, xc, yc);
                gameArea.context.lineTo(right[i].xPos, right[i].yPos);
            }
        }
        // curve through the last two points
        //gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, points[i+1].xPos,points[i+1].yPos);
        gameArea.context.closePath();
        gameArea.context.stroke();
    }

    createArrayInObjects(array){
        this.objects[array] = this.objects[array] || [];
    }


    appendBlock(array, color){
        this.createArrayInObjects(array);

        this.objects[array].push(color);
    }

    displayFPS(context,canvas){

        context.font = "40pt Arial";
        context.fillStyle = 'blue';
        context.fillText(this.fps.toFixed(2), canvas.width - 135, 50);
    }

    createObjectHLine(array, color, canvas, size, context, x1, x2){
        this.createArrayInObjects(array);
        console.log("line!");

        let colorCounter = 0;
        let currentColor;
        for(let i = 0 ; i < canvas.width ; i = i + size){
            if (i >= x1 && i <= x2) {
                colorCounter++;
                currentColor = color[colorCounter % color.length];
                this.objects[array].push(new GameObject(size, size, currentColor, i, canvas.height, context));
            }
        }
    }
}