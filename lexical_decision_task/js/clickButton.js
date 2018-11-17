$(function(){
    $("#sub").click(function(){
        lex.userName = document.getElementById("name").value;
        clearInput();
        console.log('CLICK! ', lex.userName);
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
