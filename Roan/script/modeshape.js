const accfact=[1, -1, -1, -1, 1, -1, 1, 1, -1];
const K=[[1,2], [2,1]];
/*const PM=[[0.665,0,0,0,0,0,0,0,0],[0,1.330,0,0,0,0,0,0,0], [0,0, 5.724,0,0,0,0,0,0],[0,0,0,2.230,0,0,0,0,0], 
[0,0,0,0,1.115][0,0,0,0.983,0,0,0,0]
,[0,0,0,0]];*/

//position vector
y=[0,-0.508, -1.016, -1.524, -2.032, -1.016*(Math.sin(Math.PI/6)+1), -1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)+1)];
x=[0,0,0,0,0, -1.016*Math.cos(Math.PI/6), -1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)]

var traceAircraft = {
              x: x, 
              y: y, 
              type: 'scatter',
              mode: 'markers',
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }
                            
            };
var layout = {
    xaxis: { },
    yaxis: {
      scaleanchor: "x",
    }
}
            var dataAircraft = [traceAircraft];
            Plotly.plot('graphAircraft', dataAircraft, layout);
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
