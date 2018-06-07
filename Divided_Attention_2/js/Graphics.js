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

    placeObjects(array, w, h, c, x, y, context, amount, gap) {
        this.createArrayInObjects(array);
        let pathDirection = "";
        if (array === "obstacles") {
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
            for (let i = 0 ; i < amount; i++){
                this.objects[array].push(new GameObject(w, h, c, x+gap*i, y, context, false, pathDirection, gap));
            }
        } else {

            for (let i = 0; i < amount; i++) {
                this.objects[array].push(new GameObject(w, h, c, x+gap*i, y, context));
            }
        }

    }

    drawSmoothLine(points){
        // draw line
        gameArea.context.strokeStyle = '#50BAE1';
        gameArea.context.strokeStyle = 'red';
        gameArea.context.beginPath();
        gameArea.context.moveTo(points[0].xPos, points[0].yPos);

        let i;
        for (i = 1; i < (points.length - 2); i++)
        {
            let xc = (points[i].xPos + points[i + 1].xPos) / 2;
            let yc = (points[i].yPos + points[i + 1].yPos) / 2;
            //gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, xc, yc);
            gameArea.context.lineTo(xc, yc);
        }
        // curve through the last two points
        //gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, points[i+1].xPos,points[i+1].yPos);

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