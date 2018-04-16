class IO{
    constructor(){
        this.functionKey = false;
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 37 || e.keyCode === 39) {
                e.preventDefault();
                this.keys = (this.keys || []);
                this.keys[e.keyCode] = (e.type === 'keydown');
            } else if (!this.functionKey){
                this.handleFunctionKeys(e.keyCode);
            }
        });
        //listen for keyrelease
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 37 || e.keyCode === 39) {
                this.keys[e.keyCode] = (e.type === 'keydown');
            } else{
                this.functionKey = false;
            }
        });
    }

    handleArrowKeyPress(){
        if (this.keys && this.keys[37]){
            LC.indicator.xDir = -LC.h_speed;
            //LC.indicator.gap = Math.sqrt((LC.gap * LC.gap) + (LC.gap * LC.gap)) / 2;
            //LC.indicator.yPos2 = LC.yPos - LC.indicator.gap;
        }
        if (this.keys && this.keys[39]){
            LC.indicator.xDir = LC.h_speed;
            //LC.indicator.gap = Math.sqrt((LC.gap * LC.gap) + (LC.gap * LC.gap)) / 2;
            //LC.indicator.xPos += LC.indicator.gap - LC.gap;
        }
        if (this.keys && (!this.keys[37] && !this.keys[39])){
            LC.indicator.xDir = 0;
            //LC.indicator.gap = LC.gap;

        }
    }

    handleFunctionKeys(key){
        if(LC.runLoop) {
            switch (key) {
                case 32:
                    // Space
                    LC.start = !LC.start;
                    this.functionKey = key;
                    break;
                case 49:
                    // 1
                    Tools.saveLevel();
                    this.functionKey = key;
                    break;
                case 48:
                    // 0
                    Tools.startOver();
                    this.functionKey = key;
                    break;
                case 68:
                    // D
                    LC.h_speed++;
                    this.functionKey = key;
                    break;
                case 65:
                    // A
                    if (LC.h_speed !== 1)
                    LC.h_speed--;
                    this.functionKey = key;
                    break;
                case 87:
                    // W
                    LC.v_speed++;
                    this.functionKey = key;
                    break;
                case 83:
                    // S
                    if (LC.v_speed !== 1)
                    LC.v_speed--;
                    this.functionKey = key;
                    break;
                case 90:
                    // Z
                    LC.indicator.changeGap(-1);
                    break;
                case 88:
                    // X
                    LC.indicator.changeGap(1);
                    break;
            }
        }
    }
}