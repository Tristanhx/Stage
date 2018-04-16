class Game {
    constructor(){
        this.firstSequence = this.shuffle([1,1,2,2,3,3,4,4]);
        this.secondSequence = this.shuffle([1,1,2,2,3,3,4,4,1,1,2,2,3,3,4,4]);
        this.userName = false;
        this.moleDim = 400;
        this.moleImage = new Image(this.moleDim, this.moleDim);
        this.moleHitImage = new Image(this.moleDim, this.moleDim);
        this.moleMissImage = new Image(this.moleDim, this.moleDim);
        this.moleImage.src = "./img/mole.png";
        this.moleHitImage.src = "./img/mole_hit.png";
        this.moleMissImage.src = "./img/mole_miss.png";

        this.score = 0;
        this.game = true;
        this.ready = false;
        this.overlay = false;
        this.noticed_sequence = null;

        this.countDownSecondsSetting = 5;
        this.countDownSeconds = this.countDownSecondsSetting;
        this.countDownArray = Array.apply(null, {length: this.countDownSecondsSetting}).map(Number.call, Number);
        this.countDown = true;
        this.countDownTime = rdr.tfps * this.countDownSeconds;
        this.countDownTimer = 0;
        this.countDownObject = new CountDownObject(10, 10, 'blue', 50, 50, gameArea.context, '10');
    }

    overlayToggle(state, type){
        if (state) {
            document.getElementById('overlay').style.display = "block";
            console.log('overlay on!');
        }
         else{
            document.getElementById('overlay').style.display = "none";
            console.log('overlay off!');
        }
        this.message(state, type);
    }

    message(state, type){
        if (type === "instructions"){
            document.getElementById("button-mapping-text").style.display = state ? "block" : "none";
            document.getElementById("follow-up-question").style.display = state ? "none" : "block";
        } else if(type === "follow-up"){
            document.getElementById("follow-up-question").style.display = state ? "block" : "none";
            document.getElementById("button-mapping-text").style.display = state ? "none" : "block";
        }
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    waitForInput(){
        if(this.noticed_sequence){
            gm.saveScore();
        } else{
            console.log('waiting for input');
            setTimeout(()=>{this.waitForInput()}, 1000);
        }
    }

    saveScore(){
        //let noticed = window.confirm("Did you notice a sequence?");
        score.s1_length = score.s1.length;
        score.s2_length = score.s2.length;
        score.ran_length = score.ran.length;
        console.log("Saving result");
        $.post("userInfo.php",
            {
                name: gm.userName,
                score: JSON.stringify(score),
                noticed_sequence: this.noticed_sequence
            },
            function(info){$("#results").html(info);}
        )
    }

    gameLoop() {
        if (this.game) {
            requestAnimationFrame(()=>{this.gameLoop()});
        }

        if (!this.ready && !this.overlay) {
            this.overlayToggle(true, "instructions");
            this.overlay = true;
        }

        if(this.countDown && !this.overlay){
            if(this.countDownTimer === this.countDownTime){
                this.countDown = false;
            } else{
                if (this.countDownTimer % rdr.tfps === 0){
                    gameArea.clear();
                    this.countDownObject.text = this.countDownArray[this.countDownSeconds - 1].toString();
                    this.countDownObject.context = gameArea.context;
                    this.countDownSeconds--;
                }
                this.countDownObject.update();
                this.countDownTimer++;
            }
        } else {
            if (this.ready && ((rdr.makeMole === 'Alive' && rdr.timeOut > rdr.jitter) || rdr.makeMole === 'Dead' || rdr.makeMole === 'Miss')) {
                rdr.placeMole();
            }

            rdr.timeOut++;
        }
        //__FPS__\\
        gameArea.context.clearRect(gameArea.canvas.width - 135, 0, gameArea.canvas.width, 50);

        let now = window.performance.now();
        let delta = now - rdr.previous;

        rdr.fps = 1 / (delta / 1000);

        gameArea.context.font = "40pt Arial";
        gameArea.context.fillStyle = 'red';
        gameArea.context.fillText(rdr.fps.toFixed(2), gameArea.canvas.width - 135, 50);

        rdr.framesOneSec += delta;
        rdr.deltaBox.push(delta);
        rdr.previous = now;
    };

}