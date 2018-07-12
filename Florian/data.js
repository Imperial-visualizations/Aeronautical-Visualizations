// Function to switch between tabs
$(function() {
    $('ul.tab-nav li a.button').click(function() {
        var href = $(this).attr('href');
        $('li a.active.button', $(this).parent().parent()).removeClass('active');
        $(this).addClass('active');
        $('.tab-pane.active', $(href).parent()).removeClass('active');
        $(href).addClass('active');

        //initPolar(href);
        //return false;
    });
});


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




// Triggers different movements of the box depending on which tab is active (will call the forced movement if forced tab is active etc...)
    let FreevibIsClicked = true; // declare the variable that tracks the state
    let ForcedvibIsClicked = false;
    let TransvibIsClicked = false;

$("#periodic").on('click', ForcedclickHandler); // associate the function above with the click event
$("#free").on('click', FreeclickHandler);
$("#trans").on('click', TransclickHandler);

    function ForcedclickHandler() { // declare a function that updates the state
        TransvibIsClicked = false;
        FreevibIsClicked = false;
        ForcedvibIsClicked = true;
    }

        function TransclickHandler() { // declare a function that updates the state
        TransvibIsClicked = true;
        FreevibIsClicked = false;
        ForcedvibIsClicked = false;
    }

            function FreeclickHandler() { // declare a function that updates the state
        TransvibIsClicked = false;
        FreevibIsClicked = true;
        ForcedvibIsClicked = false;
    }


function SimuTab() {
    if (FreevibIsClicked === true){
        start()
    }
    else if (ForcedvibIsClicked === true) {
        start_forced();
        console.log("test")
    }

    else if (TransvibIsClicked === true) {
        alert("Hello! I am an alert box!!");
    }
}
