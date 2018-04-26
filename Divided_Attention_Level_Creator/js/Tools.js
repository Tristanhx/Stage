class Tools{

    static handleObjects(objects, moving){
        if (typeof objects !== "undefined") {
            if (objects.length !== 0) {

                for (let i = 0; i < objects.length; i++) {
                    if (moving && LC.start) {
                        if (objects[i].yPos <= 0) {
                            objects.splice(i, 1);
                        } else {
                            objects[i].yPos -= LC.v_speed;
                        }
                    }
                    objects[i].update();
                }

            }
        }
    }

    static startOver(){
        gfx.objects['obstacles'] = [];
        LC.data = [];
        LC.frames = 0;
        LC.h_speed = 1;
        LC.v_speed = 1;
        LC.indicator.gap = LC.gap;
        LC.indicator.xPos = LC.indicatorCoor[0];
        LC.indicator.xPos2 = LC.indicatorCoor[0] + LC.gap;
    }

    static saveLevel(){
        console.log("Saving result");
        let csv = "[Frames], [X], [H_Speed], [V_Speed], [Gap]\r\n,";
        LC.data.forEach(function(data){
            let row = data.join(",");
            csv += row + "\r\n,";
        });

        console.log(csv.length);

        $.post("userInfo.php",
            {
                name: LC.userName,
                data: csv
            }
        )
    }
}