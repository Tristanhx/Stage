let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.font = 'bold 40px Monospace';
ctx.textBaseline = 'top';
ctx.fillText('hello', 10, 10);

function resize() {
    // Our canvas must cover full height of screen
    // regardless of the resolution
    let height = window.innerHeight;

    // So we need to calculate the proper scaled width
    // that should work well with every resolution
    let ratio = canvas.width/canvas.height;
    let width = height * ratio;

    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
}

window.addEventListener('load', resize, false);
window.addEventListener('resize', resize, false);