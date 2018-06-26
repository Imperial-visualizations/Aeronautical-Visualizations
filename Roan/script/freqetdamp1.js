var R
var k
var c
var m
var A;
var B;

var load;
var freq
var angle
var ampl
var freqList=[];
var angleList=[];
var amplList=[];
var loadList= [];

var wStart = 0.1;
var wEnd = 3;
var n =500;
var a = (wEnd - wStart)/(n-1);

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


            }

            /*dampl=dampl/Math.max(dampl);
            vampl=vampl/Math.max(vampl);
            aampl=aampl/Math.max(aampl);

            din=din/Math.max(din);
            dout=dout/Math.max(dout);
            vin=vin/Math.max(din);
            vout=vout/Math.max(dout);
            ain=ain/Math.max(ain);
            aout=aout/Math.max(aout);
            
            phased=phased/Math.max(dampl);
            phasev=phasev/Math.max(vampl);
            phasea=phasea/Math.max(aampl);*/

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
            //document.querySelector('[data-title="Autoscale"]').click()
            Plotly.relayout( 'graph1', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });

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
function emptyPlot(){
  var plt = {
    layout:{
autosize: true,
width: 500,
height: 400,
xaxis:{}

},
}
 /*for (var i = 0;  i < n; i++) {
                w[i]= wStart + i*a;
                din[i] = 0;
                dout[i] = 0;
                vin[i]= 0;
                vout[i]=0;
                ain[i]=0;
                aout[i]=0;

                dampl[i]=0;
                phased[i]=0;

                vampl[i]=0;
                phasev[i]=0;

                aampl[i]=0;
                phasea[i]=0;
            }*/
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
                              //autosize: true,
                              margin:{
                                  l:25, r:11, b:20, t:1
                              },
                              legend: {x: 50, y: 10, orientation: "h"
                              },
                              showlegend: false,

                              font: {
                                  family: "Fira Sans", size:12
                              }

                          };
            Plotly.newPlot('graph2', data2, layoutlegend2, {displayModeBar:false});
            
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


function main() {
    $("input[type=range]").each(function () {
        var displayEl;
        $(this).on('input', function(){
            $("#"+$(this).attr("id") + "Display").text( $(this).val());
            //$("#"+$(this).attr("id") + "DisplayA2").text( parseFloat($(this).val())*180 + $("#" + $(this).attr("id") + "DisplayA2").attr("data-unit") );
            initPlot();
        });
    });
  }

$(window).on('load',emptyPlot)
$(document).ready = main();
