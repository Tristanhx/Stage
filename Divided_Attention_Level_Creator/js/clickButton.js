$(function(){
    $("#sub").click(function(){
        LC.userName = document.getElementById("name").value;
        clearInput();
        console.log('CLICK! ', LC.userName);
        start();
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
