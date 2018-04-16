let keys = [];

function start(){
    window.addEventListener("keydown", (e)=>{
        e.preventDefault();
        keys = (keys || []);
        keys[e.keyCode] = (e.type === 'keydown');
    });
    window.addEventListener("keyup", (e)=>{
        this.keys[e.keyCode] = (e.type === 'keydown');
    });
    loop();
}

function loop(){
    requestAnimationFrame(()=>{loop()});
    // let trueKeys = [];
    // keys.forEach((key)=>{
    //     if(key){
    //
    //     }
    // })
    console.log(keys);
}
