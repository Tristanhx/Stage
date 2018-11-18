class Game {
    constructor(){
        this.firstSequence = [1,2,3,4];
        this.secondSequence = [1,2,3,4, (Math.floor(Math.random()*4 +1)), (Math.floor(Math.random()*4 +1))];
        this.thirdSequence = [1,1,2,2,3,3,4,4];
        this.userName = false;
        this.data = [];
        this.moleDim = 200;
        this.moleImage = new Image(this.moleDim, this.moleDim);
        this.moleHitImage = new Image(this.moleDim, this.moleDim);
        this.moleMissImage = new Image(this.moleDim, this.moleDim);
        this.antiMoleImage = new Image(this.moleDim, this.moleDim);
        this.moleImage.src = "../misc/gamedata/game1img/soccerRed.png";
        this.moleHitImage.src = "../misc/gamedata/game1img/soccerRed2.png";
        this.moleMissImage.src = "../misc/gamedata/game1img/soccerRed2.png";
        this.antiMoleImage.src = "../misc/gamedata/game1img/soccerYellow.png";
        this.hammerImage = new Image(this.moleDim, this.moleDim);
        this.hammerImage.src = "./img/hammer.png";
        this.cross = new Image(this.moleDim / 2, this.moleDim / 2);
        this.cross.src = "../misc/gamedata/game1img/fout.png";

        this.game = true;
        this.save = true;
        this.ready = false;
        this.overlay = false;
        this.noticed_sequence = "nvt";

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
            //console.log('overlay on!');
        }
         else{
            document.getElementById('overlay').style.display = "none";
            //console.log('overlay off!');
        }
        this.message(state, type);
    }

    message(state, type){
        if (type === "instructions"){
            document.getElementById("instructions").style.display = "block";
            document.getElementById("button-mapping-text").style.display = "none";
            document.getElementById("follow-up-question").style.display = "none";
        } else if (type === "button_mapping"){
            document.getElementById("button-mapping-text").style.display = "block";
            document.getElementById("follow-up-question").style.display = "none";
            document.getElementById("instructions").style.display = "none";
        } else if(type === "follow-up"){
            document.getElementById("follow-up-question").style.display = "block";
            document.getElementById("button-mapping-text").style.display = "none";
            document.getElementById("instructions").style.display = "none";
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
        if(this.noticed_sequence && this.save){
            score.saveScore();
            this.save = false;
        } else{
            //console.log('waiting for input');
            setTimeout(()=>{this.waitForInput()}, 1000);
        }
    }

    logData(response, correct, rt){
        this.data.push([this.userName, rdr.trial, rdr.currentSequence[rdr.trial], rdr.sequenceNumber, rdr.runRepeats, response, correct, rt]);
        //console.log(this.data);
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
                    rdr.placeCenter();
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
        //rdr.displayFPS();
    };

}