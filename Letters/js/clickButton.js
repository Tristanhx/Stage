$(function(){
    $("#sub").click(function(){
        gm.userName = document.getElementById("name").value;
        clearInput();
        console.log('CLICK! ', gm.userName);
        startGame();
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
