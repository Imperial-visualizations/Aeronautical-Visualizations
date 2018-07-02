const accfact=[1, -1, -1, -1, 1, -1, 1, 1, -1];
const K=[[1,2], [2,1]];
const M=[[2,10], [-1,2]];

function twoDshape() {
    const Minv = numeric.inv(M);
    console.log(Minv)

    B=numeric.eig(numeric.dot(Minv,K));
    console.log(B);

}
function threeDshape(){
};


function main() {
    $("input[type=range]").each(function () {
        var displayEl;
        $(this).on('input', function(){
            $("#"+$(this).attr("id") + "Display").text( $(this).val());
            
            initPlot();
        });
    });
  }

//$(window).on('load',emptyPlot)
//$(document).ready = main();
