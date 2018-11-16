<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 11/6/2018
 * Time: 3:25 PM
 */

include ("getLevel.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    LevelLoad tester
    <script src="../../JQUERY/jquery-1.9.1.min.js"></script>
</head>
<body>
    <script>
        console.log("entered script");

        let straightPathFramesArray = [];
        let straightPathXPosArray = [];
        let straightPathHSpeedArray = [];
        let straightPathVSpeedArray = [];
        let straightPathGapArray = [];

        let pathOnlyFramesArray = [];
        let pathOnlyXPosArray = [];
        let pathOnlyHSpeedArray = [];
        let pathOnlyVSpeedArray = [];
        let pathOnlyGapArray = [];

        let level_1_FramesArray = [];
        let level_1_XPosArray = [];
        let level_1_HSpeedArray = [];
        let level_1_VSpeedArray = [];
        let level_1_GapArray = [];

        let level_2_FramesArray = [];
        let level_2_XPosArray = [];
        let level_2_HSpeedArray = [];
        let level_2_VSpeedArray = [];
        let level_2_GapArray = [];

        let level_3_FramesArray = [];
        let level_3_XPosArray = [];
        let level_3_HSpeedArray = [];
        let level_3_VSpeedArray = [];
        let level_3_GapArray = [];

        let makeLevelArrays = (input, framesArray, xPosArray, hSpeedArray, vSpeedArray, gapArray) => {
            let level = input.split(',');
            for (let i = 0; i < level.length; i += 5) {
                framesArray.push(parseInt(level[i]));
                xPosArray.push(parseInt(level[i + 1]));
                hSpeedArray.push(parseInt(level[i + 2]));
                vSpeedArray.push(parseInt(level[i + 3]));
                gapArray.push(parseInt(level[i + 4]));
            }
            framesArray.shift();
            xPosArray.shift();
            hSpeedArray.shift();
            vSpeedArray.shift();
            gapArray.shift();
            console.log("inside function (parameters): ", framesArray, xPosArray, hSpeedArray, vSpeedArray, gapArray);
            console.log("inside function (references): ", straightPathFramesArray, straightPathXPosArray, straightPathHSpeedArray, straightPathVSpeedArray, straightPathGapArray);
            if(straightPathFramesArray.length > 0) {
                return "level made\n";
            }
            else{
                return "level not made\n";
            }
        };

        let getLevel = () => {

            let blockLoc = 0;
            let gap = 0;
            console.log("getting level");
            $.ajax({
                url: "getLevel.php",
                success: function (response) {
                    let slicedResponse = response.slice(45);
                    let levelArray = slicedResponse.split('[Frames]');
                    console.log(levelArray);

                    let level_1 = makeLevelArrays(levelArray[0], straightPathFramesArray, straightPathXPosArray, straightPathHSpeedArray, straightPathVSpeedArray, straightPathGapArray);
                    let level_2 = makeLevelArrays(levelArray[1], pathOnlyFramesArray, pathOnlyXPosArray, pathOnlyHSpeedArray, pathOnlyVSpeedArray, pathOnlyGapArray);
                    let level_3 = makeLevelArrays(levelArray[2], level_1_FramesArray, level_1_XPosArray, level_1_HSpeedArray, level_1_VSpeedArray, level_1_GapArray);
                    let level_4 = makeLevelArrays(levelArray[3], level_2_FramesArray, level_2_XPosArray, level_2_HSpeedArray, level_2_VSpeedArray, level_2_GapArray);
                    let level_5 = makeLevelArrays(levelArray[4], level_3_FramesArray, level_3_XPosArray, level_3_HSpeedArray, level_3_VSpeedArray, level_3_GapArray);

                    blockLoc = straightPathXPosArray[0];
                    gap = straightPathGapArray[0];
                    console.log("outside function: ", straightPathFramesArray, straightPathXPosArray, straightPathHSpeedArray, straightPathVSpeedArray, straightPathGapArray);
                    console.log(blockLoc, gap);
                    console.log(level_1, level_2, level_3, level_4, level_5);
                },
                error: () => {
                    alert("Connection failed, please press F5 to try again")
                }
            });
        };
         getLevel();
    </script>
</body>
</html>