let R
let k
let c
let m
let A;
let B;

const wStart = 0.1;
const wEnd = 3;
const n =500;
const a = (wEnd - wStart)/(n-1);

let damplNorm=[]
let vamplNorm=[]
let aamplNorm=[];

let dinNorm=[];
let doutNorm=[];
                
let vinNorm=[];
let voutNorm=[];
                
let ainNorm=[];
let aoutNorm=[];

var w=[];
var alfa=[];
var wc=[];
var delta=[];
var din=[];
var dout=[];
var vin=[];
var vout=[];
var ain=[];
var aout=[];
var dampl=[];
var phased=[];
var vampl=[];
var phasev=[];
var aampl=[];
var phasea=[];

// generate the data that is used to create the plots
function initPlot() {
         R = document.getElementById("Force").value;
         k = document.getElementById("Spring").value;
         c = document.getElementById("Damping").value;
         m = document.getElementById("Mass").value;

            for (var i = 0;  i < n; i++) {
                
                w[i]= wStart + i*a;
                alfa[i] = k - Math.pow(w[i], 2)*m;
                wc[i] = w[i]*c;
                delta[i] = Math.pow(alfa[i], 2) + Math.pow(wc[i],2);
                din[i] = alfa[i]*R/(delta[i]);
                dout[i] = wc[i]*R/(delta[i]);
                vin[i]=w[i]*dout[i];
                vout[i]=-w[i]*din[i];
                ain[i]=w[i]*vout[i];
                aout[i]=-w[i]*vin[i];

                dampl[i]=Math.sqrt(Math.pow(din[i], 2) + Math.pow(dout[i], 2));
                phased[i]=Math.atan2(dout[i], din[i]);

                vampl[i]=Math.sqrt(Math.pow(vin[i], 2) + Math.pow(vout[i], 2));
                phasev[i]=Math.atan2(vout[i], vin[i]);

                aampl[i]=Math.sqrt(Math.pow(ain[i], 2) + Math.pow(aout[i], 2));
                phasea[i]=Math.atan2(aout[i], ain[i]);


               /* damplNorm[i]=dampl[i]/Math.max(...dampl);
                vamplNorm[i]=vampl[i]/Math.max(...vampl);
                aamplNorm[i]=aampl[i]/Math.max(...aampl);

                dinNorm[i]=din[i]/Math.max(...dout.map(Math.abs))*2;
                doutNorm[i]=dout[i]/Math.max(...dout.map(Math.abs))*2;
                
                vinNorm[i]=vin[i]/Math.max(...vin.map(Math.abs))*2;
                voutNorm[i]=vout[i]/Math.max(...vin.map(Math.abs))*2;
                
                ainNorm[i]=ain[i]/Math.max(...aout.map(Math.abs))*2;
                aoutNorm[i]=aout[i]/Math.max(...aout.map(Math.abs))*2;*/


            }

           
            console.log(damplNorm)

            //first plot, amplitude vs. frequency
            var trace1 = {
              x: w,
              y: dampl, 
              name: 'Displacement',
              type: 'scatter',
              mode: "lines",
            };
            var trace2 = {
              x: w, 
              y: vampl, 
              name: 'Velocity',
              type: 'scatter',
              mode: 'lines',
            };
            var trace3 = {
              x: w, 
              y: aampl, 
              name: 'Acceleration',
              type: 'scatter',
              mode: 'lines',
            };
            var data1 = [trace1, trace2, trace3];
  
            Plotly.animate('graph1', {
                data: data1,
                traces: [0, 1, 2],
                }, 
                {
                transition: {
                  duration: 0,
                  easing: 'cubic-in-out'
                },
                frame: {duration: 0,redraw: false}
              });
            Plotly.relayout( 'graph1', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });

            // second plot, in phase vs. out of phase
            var trace4 = {
              x: din,
              y: dout, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace5 = {
              x: vin, 
              y: vout, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace6 = {
              x: ain, 
              y: aout, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data2 = [trace4, trace5, trace6];
            Plotly.animate('graph2', {
                data: data2,
                traces: [0, 1, 2],
                }, 
                {
                transition: {
                  duration: 0,
                  easing: 'cubic-in-out'
                },
                frame: {duration: 0,redraw: false}
              });
            Plotly.relayout( 'graph2', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });

            // third plot, phase angle vs. frequency
            var trace7 = {
              x: w,
              y: phased, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace8 = {
              x: w, 
              y: phasev, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace9 = {
              x: w, 
              y: phasea, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data3 = [trace7, trace8, trace9];
            Plotly.animate('graph3', {
                data: data3,
                traces: [0, 1, 2],
                }, 
                {
                transition: {
                  duration: 0,
                  easing: 'cubic-in-out'
                },
                frame: {duration: 0,redraw: false}
              });
              Plotly.relayout( 'graph3', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });
}

// create an empty plot that is displayed when the page is loaded. Default values are used
function emptyPlot(){
        R = document.getElementById("Force").value;
        k = document.getElementById("Spring").value;
        c = document.getElementById("Damping").value;
        m = document.getElementById("Mass").value;

            for (var i = 0;  i < n; i++) {
                
                w[i]= wStart + i*a;
                alfa[i] = k - Math.pow(w[i], 2)*m;
                wc[i] = w[i]*c;
                delta[i] = Math.pow(alfa[i], 2) + Math.pow(wc[i],2);
                din[i] = alfa[i]*R/(delta[i]);
                dout[i] = wc[i]*R/(delta[i]);
                vin[i]=w[i]*dout[i];
                vout[i]=-w[i]*din[i];
                ain[i]=w[i]*vout[i];
                aout[i]=-w[i]*vin[i];

                dampl[i]=Math.sqrt(Math.pow(din[i], 2) + Math.pow(dout[i], 2));
                phased[i]=Math.atan2(dout[i], din[i]);

                vampl[i]=Math.sqrt(Math.pow(vin[i], 2) + Math.pow(vout[i], 2));
                phasev[i]=Math.atan2(vout[i], vin[i]);

                aampl[i]=Math.sqrt(Math.pow(ain[i], 2) + Math.pow(aout[i], 2));
                phasea[i]=Math.atan2(aout[i], ain[i]);
            }

            // as before, first plot, amplitude vs frequency
            var trace1 = {
              x: w,
              y: dampl, 
              name: 'Displacement',
              type: 'scatter',
              mode: "lines",
            };
            var trace2 = {
              x: w, 
              y: vampl, 
              name: 'Velocity',
              type: 'scatter',
              mode: 'lines',
            };
            var trace3 = {
              x: w, 
              y: aampl, 
              name: 'Acceleration',
              type: 'scatter',
              mode: 'lines',
            };
            var data1 = [trace1, trace2, trace3];
            let  layoutlegend1= {
                              autosize: true,
                              margin:{
                                  l:25, r:11, b:20, t:1
                              },
                              legend: {x: 0, y: 10, orientation: "h"
                              },
                              showlegend: false,

                              font: {
                                  family: "Fira Sans", size:16
                              } };

            Plotly.newPlot('graph1', data1, layoutlegend1, {displayModeBar:false});

            // in phase vs out of phase
            var trace4 = {
              x: din,
              y: dout, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace5 = {
              x: vin, 
              y: vout, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace6 = {
              x: ain, 
              y: aout, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data2 = [trace4, trace5, trace6];
            let  layoutlegend2= {
                              margin:{
                                  l:25, r:11, b:20, t:1
                              },
                              legend: {x: 50, y: 10, orientation: "h"
                              },
                              showlegend: false,
                              xaxis: { },
                              yaxis: {scaleanchor: "x",},

                              font: {
                                  family: "Fira Sans", size:12
                              }

                          };
            Plotly.newPlot('graph2', data2, layoutlegend2, {displayModeBar:false});
            
            //phase vs frequency
            var trace7 = {
              x: w,
              y: phased, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace8 = {
              x: w, 
              y: phasev, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace9 = {
              x: w, 
              y: phasea, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data3 = [trace7, trace8, trace9];
            let  layoutlegend3= {
                              autosize: true,
                              margin:{
                                  l:25, r:11, b:20, t:1
                              },
                              legend: {x: 50, y: 1, orientation: "v"
                              },

                              font: {
                                  family: "Fira Sans", size:12
                              }

                          };
            Plotly.newPlot('graph3', data3, layoutlegend3, {displayModeBar:false});

};

// function that makes the sliders nice 
function main() {
    $("input[type=range]").each(function () {
        $(this).on('input', function(){
            $("#"+$(this).attr("id") + "Display").text( $(this).val());
            initPlot();
        });
    });
  }

$(window).on('load',emptyPlot)
$(document).ready = main();
