// function for the sliders
function main() {
    $("input[type=range]").each(function () {
        let displayEl;
        $(this).on('input', function(){
            $("#"+$(this).attr("id") + "Display").text( $(this).val());

        });
    });
}
$(document).ready = main();

// Show hide buttons
function showSpoiler(obj)
{
    let inner = obj.parentNode.getElementsByTagName("div")[0];
    if (inner.style.display == "none")
        inner.style.display = "";
    else
        inner.style.display = "none";
}