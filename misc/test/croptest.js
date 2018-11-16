var img=document.createElement('img');
img.src='../gamedata/game1img/soccerRed.png';
img.onload = function () {
    var c=document.getElementById('myCanvas');
    var ctx=c.getContext('2d');
    ctx.drawImage(img,0,0,820,820,10,10,8200,8200);
};