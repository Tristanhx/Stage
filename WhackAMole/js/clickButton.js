$(function(){
    $("#sub").click(function(){
        gm.userName = document.getElementById("name").value;
        clearInput();
        console.log('CLICK! ', gm.userName);
        startGame();
    });

    $("#yes").click(function(){
        gm.noticed_sequence = "yes";
        gm.overlayToggle(false, "follow-up");
    });

    $("#no").click(function(){
        gm.noticed_sequence = "no";
        gm.overlayToggle(false, "follow-up");
    });

    $("#myForm").submit(function(){
        return false;
    });

    function clearInput(){
        $("#myForm").find(":input").each(function () {
            $(this).val('');
        })
    }
});
