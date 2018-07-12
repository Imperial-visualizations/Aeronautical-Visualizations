//The -1/1 factors accountig for the back/front position of the sensor
const accfact=[1, -1, -1, -1, 1, -1, 1, 1, -1];

//position vectors containing the xyz coordinates of each point mass
y=[0,-0.508, -1.016, -1.524, -2.032, -1.016*(Math.sin(Math.PI/6)+1), -1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)+1)];
x=[0,0,0,0,0, -1.016*Math.cos(Math.PI/6), -1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)]
// incremented in the for loop with the eigenvector and a sine function
z=[0, 0, 0, 0, 0, 0, 0, 0, 0]
// the eigenvectors for the mode shapes
xi=[[0.051, -0.054, -0.15, -0.353, -0.639, 1, 0.118, 0.118, 1],[1,  0.198, -0.228,  0.03,  0.708, 0.214, -0.231, -0.231, 0.214],[-0.823, 0.29,  0.494, 0.208, 0.131, 0.545, -1, -1, 0.545],[0.78, -0.62, -0.107,  1, -0.82, 0.025, -0.089, -0.089, 0.025]];
// the resonance frequencies
w=[15.65, 34.45, 65.2, 106.84].map(function(x){return x*2*Math.PI})
y3=y;
x3=x;
z3=z;
// function that takes the mode that the student desires to animate
$('input#mode3').on('click', getMode)
function getMode(){
 mode3=document.getElementById("mode3").value;
};

//set the time and time incremets for the 2d and 3d simulations
dt=0.00002;
t=0;
t3=0;
n=9;


// define the layout of the 3d plot and the default viewing angle
let layout3d={
            autosize: true,
            margin: {
                l: 0, r: 0, b: 0, t: 1, pad: 5
            },
            scene: {
                aspectmode: "cube",
                camera:{eye:{x:1.25,},},
                xaxis: {
                    range: [-1, 1], autorange: false, title:'x', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                yaxis: {
                    range: [-2.4, 0], autorange: false, title:'y', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                zaxis: {
                    range: [-1, 1], autorange: false, title:'z', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      }
                },
            marker: {
                color: 'rgb(139, 0, 0)',
                size: 10,
                    },
            mode: 'markers',
            hovermode: false,
            font: {
                family: "Fira Sans",
                size: 14
                  },
            legend: {"orientation": "h"}
            };
// set the two traces that need to be plotted, for the fuselage and wings
let trace3Daircraft1 ={
            type: 'scatter3d',
            x: [x3[0],x3[1],x3[2],x3[3],x3[4]],
            y: [y3[0],y3[1],y3[2],y3[3],y3[4]],
            z: [z3[0],z3[1],z3[2],z3[3],z3[4]],
            showscale: false,
            name: 'Fuselage',
            line: {shape: 'spline'},
            marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }};
let trace3Daircraft2 ={
            type: 'scatter3d',
            x: [x3[5],x3[6],x3[2],x3[7],x3[8]],
            y: [y3[5],y3[6],y3[2],y3[7],y3[8]],
            z: [z3[5],z3[6],z3[2],z3[7],z3[8]],
            showscale: false,
            name: 'Wings',
            line: {shape: 'spline'},
            marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }};                      
Plotly.plot('aircraft3D', [trace3Daircraft1, trace3Daircraft2], layout3d);

// button that starts the animation by calling the begin_animation function
$('input#start').on('click',begin_animation)

let anim3d;
function animate3D (){
        function compute3D () {
          // change the z coordinate by multiplying the eigenvector with a sine function
          for (var i = 0; i < n; i++) {
            z3[i]=xi[mode3-1][i]*Math.sin(w[mode3-1]*t3)
            t3=t3+dt;
          }
        }

          compute3D();
          // plot the 3d aircraft with the required changes
           Plotly.animate('aircraft3D', {
            data: [{x: [x3[0],x3[1],x3[2],x3[3],x3[4]],
            y: [y3[0],y3[1],y3[2],y3[3],y3[4]],
            z: [z3[0],z3[1],z3[2],z3[3],z3[4]],}, {x: [x3[5],x3[6],x3[2],x3[7],x3[8]],
            y: [y3[5],y3[6],y3[2],y3[7],y3[8]],
            z: [z3[5],z3[6],z3[2],z3[7],z3[8]],}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
          return;
        }


var traceAircraftV = {
              x: [y[0],y[1],y[2],y[3],y[4]],
              y: z, 
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }
                            
            };
var traceAircraftH = {
              x: [x[5],x[6],x[2],x[7],x[8]], 
              y: z, 
              type: 'scatter',
               line: {shape: 'spline'},
              marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }
                            
            };
var layout = {
    xaxis: { },
    yaxis: {
      scaleanchor: "x",
    },
    showlegend:false
}

var layout2 = {
    xaxis: { },
    yaxis: {
      scaleanchor: "x",
    },
    showlegend:false
}
            Plotly.newPlot('graphAircraftV', [traceAircraftV], layout);
            Plotly.newPlot('graphAircraftH', [traceAircraftH], layout2);



let anim;
function animate2D (){
        function compute () {

          for (var i = 0; i < n; i++) {
            z[i]=xi[mode3-1][i]*Math.sin(w[mode3-1]*t)
            t=t+dt;
          }
        }

          compute();

          Plotly.animate('graphAircraftV', {
            data: [{x: [y[0],y[1],y[2],y[3],y[4]], y:[z[0],z[1],z[2],z[3],z[4]]}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
         Plotly.animate('graphAircraftH', {
            data: [{x: [x[5],x[6],x[2],x[7],x[8]], y:[z[5],z[6],z[2],z[7],z[8]]}]
          }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          });
          return;
        }


function begin_animation(){

      if ($(this).val().toString()=="Start"){
        anim= setInterval(animate2D,30);
        anim3d= setInterval(animate3D,30);
        $(this).val("Pause")
      }else {
            clearInterval(anim);
            clearInterval(anim3d);
            $(this).val("Start")
        };
  }
$(window).on('load',getMode)