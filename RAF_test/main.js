/**
 * A polyfill to get the current timestamp.
 * window.performance.now will fallback to using
 * Date.now or new Date().getTime() on unsupported browsers.
 * Author: Anthony Del Ciotto: http://anthonydel.com
 */
(function(window) {
    "use strict";
    if (typeof window.performance.now === "undefined") {
        window.performance.now = (typeof Date.now === "undefined") ?
            new Date().getTime() : Date.now();
    }
})( window );

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function(window) {
    let lastTime = 0;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));
            let id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}( window ));


(function(window) {
    "use strict";

    let canvas = document.getElementById("game-canvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let fps = 60;
    let frameDuration = 1000 / fps;
    let lag = 0;
    let previous = 0;
    let startTime = 0;

    /**
     * just a simple sprite object for demonstration purposes
     */
    let sprite = {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        displayX: 0,
        displayY: 0,
        amplitude: 150,
        period: 2000,
        width: 32,
        height: 32,

        update: function() {
            // get the elapsed time since we started
            let time = window.performance.now() - startTime;

            // perform an oscillation animation
            let centerX = canvasWidth / 2 - this.width / 2;
            this.x = this.amplitude * Math.sin(time * 2 * Math.PI / this.period) + centerX;
        },

        interpolate: function(lagOffset) {
            // use the lagOffset and the sprites previous x/y pos to interpolate
            // the position
            this.displayX = (typeof this.previousX !== "undefined") ?
                (this.x - this.previousX) * lagOffset + this.previousX : this.x;
            this.displayY = (typeof this.previousY !== "undefined") ?
                (this.y - this.previousY) * lagOffset + this.previousY : this.y;
        },

        display: function(lagOffset) {
            this.interpolate(lagOffset);

            // draw the sprite bro
            ctx.fillStyle = '#ffa7FF';
            ctx.translate(this.displayX + (this.width / 2), this.displayY + (this.height / 2));
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }
    };

    let update = function() {
        sprite.update();
    };

    let display = function(lagOffset) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.save();
        sprite.display(lagOffset);
        ctx.restore();
    };

    let gameLoop = function() {
        requestAnimationFrame(gameLoop);

        // calculate the delta or elapsed time since the last frame
        let now = window.performance.now();
        let delta = now - previous;

        // correct any unexpected huge gaps in the delta time
        if (delta > frameDuration) {
            delta = frameDuration;
        }

        // accumulate the lag counter
        lag += delta;

        // perform an update if the lag counter exceeds or is equal to
        // the frame duration.
        // this means we are updating at a Fixed time-step.
        if (lag >= frameDuration) {
            // capture sprites previous frame position
            sprite.previousX = sprite.x;
            sprite.previousY = sprite.y;

            // update the game logic
            update();

            // reduce the lag counter by the frame duration
            lag -= frameDuration;
        }

        // calculate the lag offset, this tells us how far we are
        // into the next frame
        let lagOffset = lag / frameDuration;

        // display the sprites passing in the lagOffset to interpolate the
        // sprites positions
        display(lagOffset);

        // set the current time to be used as the previous
        // for the next frame
        previous = now;
    };

    startTime = window.performance.now();
    gameLoop();

})( window );