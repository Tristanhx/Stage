let points = [];
function start(){

    gameArea.start();
    makeRandomPoints();
}

const gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        console.log('start');
        this.canvas.width = 800;
        this.canvas.height = 1300;
        this.canvas.style.backgroundColor = 'grey';
        this.context = this.canvas.getContext("2d");
        this.div = document.getElementById("gameArea");
        this.div.appendChild(this.canvas);
        setInterval(movePoints, 10);
    },
    clear: function () {
        console.log("clear");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function makeRandomPoints(){
    console.log('Make random points');
    for (let i = 0 ; i < 1000 ; i++) {
        let point = {xPos: Math.floor(Math.random() * gameArea.canvas.width), yPos: Math.floor(Math.random() * gameArea.canvas.height)};
        gameArea.context.fillRect(point.xPos, point.yPos, 2, 2);
        points.push(point);
    }
    console.log(points);
    gameArea.clear();
    drawSmoothLine(points);
}

function movePoints() {
    points.forEach(function(point){
        let xShift = Math.random();
        let yShift = Math.random();

        point.xPos += xShift < .5 ? 1 : -1;
        point.yPos += yShift < .5 ? 1 : -1;
    });

    gameArea.clear();
    drawSmoothLine(points);
}

function drawSmoothLine(points){
    // draw line
    console.log('drawSmoothLine');
    gameArea.context.strokeStyle = 'blue';
    gameArea.context.beginPath();
    gameArea.context.moveTo(points[0].xPos, points[0].yPos);

    let i;
    for (i = 1; i < points.length - 1; i ++)
    {
        let xc = (points[i].xPos + points[i + 1].xPos) / 2;
        let yc = (points[i].yPos + points[i + 1].yPos) / 2;
        gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, xc, yc);

    }
    // curve through the last two points
    gameArea.context.quadraticCurveTo(points[i].xPos, points[i].yPos, points[0].xPos,points[0].yPos);
    gameArea.context.stroke();
}