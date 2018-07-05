const accfact=[1, -1, -1, -1, 1, -1, 1, 1, -1];
const K=[[1,2], [2,1]];
/*const PM=[[0.665,0,0,0,0,0,0,0,0],[0,1.330,0,0,0,0,0,0,0], [0,0, 5.724,0,0,0,0,0,0],[0,0,0,2.230,0,0,0,0,0],
[0,0,0,0,1.115][0,0,0,0.983,0,0,0,0]
,[0,0,0,0]];*/

//position vector
y = [0, 0, 0, 0, 0];
x = [0, -1, -2, -3, -4];
modeshape = [0.5, -2, 1, -2, 1];
var traceAircraftV = {
              //x: [x[0],x[1],x[2],x[3],x[4]],
              x: x,
              y: y,
              type: 'scatter',
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }

            };
/*var traceAircraftH = {
              x: [x[5],x[6],x[2],x[7],x[8]],
              y: [y[5],y[6],y[2],y[7],y[8]],
              type: 'scatter',
              marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }

            };*/
var layout = {
    xaxis: { },
    yaxis: {
      scaleanchor: "x",
    },
    showlegend:false
}
            var dataAircraft = [traceAircraftV/*, traceAircraftH*/];
            Plotly.plot('graphAircraft', dataAircraft, layout);

function threeDshape(){
};
dt=0.0001;
t=dt;
n=5;


$('.start.button').on('click',()=>{
    $('.start.button').addClass('active');}).on('click',() =>{
    $('.pause.button').removeClass('active');})

$('.pause.button').on('click',()=>{
    $('.pause.button').addClass('active');}).on('click',() =>{
    $('.start.button').removeClass('active');})

$('.start.button').on('click',begin_animation)
//$('.pause.button').on('click', end_animation)
let anim;

function begin_animation(){
function animate2D (){

    let status = $('form input.button.active').attr('href');
        function compute () {

          for (var i = 0; i < n; i++) {
            y[i]=modeshape[i]*Math.sin(108*t)
            t=t+dt;
          }
        }

          compute();

          Plotly.animate('graphAircraft', {
            data: [{x: x, y: y}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 10,
              redraw: false
            }
          });
          return;
        }
      if ($(this).html().toString()=="Start"){
        anim= setInterval(animate2D,10);
        $(this).text("Pause")
      }else {
            clearInterval(anim);
            $(this).text("Start")
        };

      //else if (status==='pause'){ console.log('this part works')
        //Plotly.animate('graphAircraft', {
          //  data: [{x: [y[0],y[1],y[2],y[3],y[4]], y: z}]
          //});
      //}


  }
//function begin_animation(){
  //anim= setInterval(animate2D,10);

//};

//function end_animation(){
  //clearInterval(anim)
//}


//$(window).on('load',emptyPlot)
//$(document).ready = main();
