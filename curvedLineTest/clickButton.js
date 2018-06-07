$(function(){
    $("#sub").click(function(){
        let userName = document.getElementById("name").value;
        clearInput();
        console.log('CLICK! ', userName);
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
