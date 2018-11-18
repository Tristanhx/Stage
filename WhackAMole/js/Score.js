class Score {
    constructor() {
        this.score = {
            fs1: [],
            fs2: [],
            fsequence_length: 6,
            ss1: [],
            ss2: [],
            ssequence_length: 12,
            ran1: [],
            ran2: [],
            ran3: []
        };
    }

    writeScore(data){
        //console.log("Writing score");
        switch (rdr.sequenceNumber) {
            case 0:
                this.score.fs1.push(data);
                break;
            case 1:
                this.score.ran1.push(data);
                break;
            case 2:
                this.score.ss1.push(data);
                break;
            case 3:
                this.score.ran2.push(data);
                break;
            case 4:
                this.score.fs2.push(data);
                break;
            case 5:
                this.score.ran3.push(data);
                break;
            case 6:
                this.score.ss2.push(data);
                break;
        }
    }

    makeCSV(headers, data){
        let csv = headers;
        data.forEach(function(looseData){
            let row = looseData.join(";");
            csv += row + "\r\n";
        });
        return csv;
    }

    saveScore(){
        let csv = this.makeCSV("id;trial;position;sequence;repeat;response;correctness;reaction time\r\n", gm.data);
        //let noticed = window.confirm("Did you notice a sequence?");
        // score.s1_length = score.s1.length;
        // score.s2_length = score.s2.length;
        // score.ran_length = score.ran.length;
        //console.log("Saving result");
        $.post("userInfo.php",
            {
                name: gm.userName,
                score: JSON.stringify(this.score),
                data: csv,
                noticed_sequence: gm.noticed_sequence
            },
            function(info){$("#results").html(info);}
        );
        console.log(JSON.stringify(this.score))
    }
}