$("#sub").click(function(){
    $.post($("#myForm").attr("action"), $("#myForm").find(":input").serializeArray(), function(info){$("#result").html(info);});
    clearInput();
    console.log('CLICK!');
});

$("#myForm").submit(function(){
    return false;
});

function clearInput(){
    $("#myForm").find(":input").each(function () {
        $(this).val('');
    })
}