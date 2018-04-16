$(function(){
    $("#sub").click(function(){
        userName = document.getElementById("name").value;
        clearInput();
        console.log('CLICK! ', userName);
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
