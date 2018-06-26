
$(function() {
    $('ul.tab-nav li a.button').click(function() {
       var href = $(this).attr('href');
        $('li a.active.button', $(this).parent().parent()).removeClass('active');
        $(this).addClass('active');
        $('.tab-pane.active', $(href).parent()).removeClass('active');
        $(href).addClass('active');
        return false;
    });
});


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

var aAmpl=[];
var aIn = [];
var aOut = [];
var vAmpl =[];
var vPhase = [];
var vIn = [];
var vOut = [];
var dAmpl = [];
var dPhase = [];
var dIn = [];
var dOut = [];


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

var href




function initPlot() {
        href = $('ul.tab-nav li a.active.button').attr('href'); // active href
        console.log(href)
    if (href === "#simulated") 
        {R = document.getElementById("force").value;
         k = document.getElementById("spring").value;
         c = document.getElementById("damping").value;
         m = document.getElementById("mass").value;

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
            document.querySelector('[data-title="Autoscale"]').click()
            /*Plotly.relayout( 'graph1', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });*/

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
            /*Plotly.relayout( 'graph2', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });*/


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
              /*Plotly.relayout( 'graph3', {
              'xaxis.autorange': true,
              'yaxis.autorange': true
            });*/



            
            }


    else if (href === "#measured") {
        /*freq = document.getElementById("frequency").value*2*Math.PI;
        ampl = document.getElementById("amplitude").value;
        angle = document.getElementById("phase").value;
        document.getElementById('frequency').value = ''
        document.getElementById('amplitude').value = ''
        document.getElementById('phase').value = ''
        load = document.getElementById('load').value;
        document.getElementById('load').value = '';

        A = document.getElementById('Point A').value;
        B = document.getElementById('Point B').value;

        freqList.push(freq);
        amplList.push(ampl);
        angleList.push(angle);
        loadList.push(load);
        aPhase = angleList;*/

        fact = 0.06;
        freqList = [106.81, 108.07, 108.70, 108.82, 108.95, 108.98, 109.00, 109.01, 109.04, 109.08, 109.14, 109.20, 109.33, 109.45, 109.96, 110.58, 111.21, 111.84];
        //freqList.push(freqList[0]);
        amplList = [1.558, 3.35, 7.475, 8.826, 9.333, 9.355, 9.34, 9.363, 9.26, 9.272, 9.104, 8.895, 8.257, 7.526, 5.34, 3.73, 2.842, 2.28];
        //amplList.push(amplList[0]);
        aPhase = [-2.945,-2.7573, -2.18447, -1.8739, -1.604, -1.54, -1.502, -1.498, -1.432, -1.3908, -1.29, -1.21, -1.0363, -0.9092, -0.564, -0.346, -0.2426, -0.18];
       // aPhase.push(amplList)

       //A = 11;
       //B = 12;
        for(var i=0; i< freqList.length; i++) {
          aAmpl[i] = amplList[i]/fact;
          aIn[i] = aAmpl[i]*Math.cos(aPhase[i]);
          aOut[i] = aAmpl[i]*Math.sin(aPhase[i]);

          vAmpl[i] = aAmpl[i]/freqList[i];
          vPhase[i] = aPhase[i] + Math.PI/2;
          vIn[i] = vAmpl[i]*Math.cos(vPhase[i]);
          vOut[i] = vAmpl[i]*Math.sin(vPhase[i]);

          dAmpl[i] = vAmpl[i]/freqList[i];
          dPhase[i] = vPhase[i]+Math.PI/2;
          dIn[i] = dAmpl[i]*Math.cos(dPhase[i]);
          dOut[i] = dAmpl[i]*Math.sin(dPhase[i]);
        }
            

            var trace1 = {
              x: freqList,
              y: dAmpl, 
              name: 'Displacement',
              type: 'scatter',
            };
            var trace2 = {
              x: freqList, 
              y: vAmpl, 
              name: 'Velocity',
              type: 'scatter',
            };
            var trace3 = {
              x: freqList, 
              y: aAmpl, 
              name: 'Acceleration',
              type: 'scatter',
            };
            var data1 = [trace1, trace2, trace3];
            Plotly.newPlot('graph1', data1);
            



            var trace4 = {
              x: dIn,
              y: dOut, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace5 = {
              x: vIn, 
              y: vOut, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace6 = {
              x: aIn, 
              y: aOut, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data2 = [trace4, trace5, trace6];
            Plotly.newPlot('graph2', data2);


            var trace7 = {
              x: freqList,
              y: dPhase, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace8 = {
              x: freqList, 
              y: vPhase, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace9 = {
              x: freqList, 
              y: aPhase, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data3 = [trace7, trace8, trace9];
            Plotly.newPlot('graph3', data3);


            

        //console.log(freqList.length);
        //console.log(amplList);
        console.log(vPhase);
        //console.log(vAmpl);
        console.log(vOut);
    }
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
console.log(plt.layout);
 for (var i = 0;  i < n; i++) {
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
            Plotly.newPlot('graph1', data1);

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
            Plotly.newPlot('graph2', data2);
            
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
            Plotly.newPlot('graph3', data3);

};
function say_hello(){
  console.log("hello")
}

function findRes(){
    A = document.getElementById('Point A').value;
    document.getElementById('omega1').innerHTML= freqList[A-1].toFixed(2) ;
    document.getElementById('theta1').innerHTML= vPhase[A-1].toFixed(2) ;

      B = document.getElementById('Point B').value;
    document.getElementById('omega2').innerHTML= freqList[B-1].toFixed(2) ;
    document.getElementById('theta2').innerHTML= vPhase[B-1].toFixed(2) ;
            var traceAB1 = {
              x: [freqList[A-1],freqList[B-1]], 
              y: [vAmpl[A-1],vAmpl[B-1]], 
              name: 'Selected Points',
              type: 'scatter',
              mode: 'markers',
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }
                            
            };
            var dataAB1 = [traceAB1];
            Plotly.plot('graph1', dataAB1 );
            console.log(freqList)


            var traceAB2 = {
              x: [vIn[A-1],vIn[B-1]], 
              y: [vOut[A-1],vOut[B-1]], 
              name: 'Selected Points',
              type: 'scatter',
              mode: 'markers',
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }
                            
            };
            var dataAB2 = [traceAB2];
            Plotly.plot('graph2', dataAB2 );

            var traceAB3 = {
              x: [freqList[A-1],freqList[B-1]], 
              y: [vPhase[A-1],vPhase[B-1]], 
              name: 'Selected Points',
              type: 'scatter',
              mode: 'markers',
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }
                            
            };
            var dataAB3 = [traceAB3];
            Plotly.plot('graph3', dataAB3 );
            wu = Math.sqrt((Math.pow(freqList[A-1],2)*freqList[B-1]*Math.tan(vPhase[B-1])-Math.pow(freqList[B-1],2)*freqList[A-1]*Math.tan(vPhase[A-1]))/(freqList[B-1]*Math.tan(vPhase[B-1])-freqList[A-1]*Math.tan(vPhase[A-1])));
            xi = ((Math.pow(freqList[B-1],2)-Math.pow(freqList[A-1],2))/(freqList[B-1]*Math.tan(vPhase[B-1])-freqList[A-1]*Math.tan(vPhase[A-1])))/(2*wu);
            
            document.getElementById('omegau').innerHTML= wu.toFixed(2) ;
            document.getElementById('xi').innerHTML= xi.toFixed(5) ;



}
/*function findRes2(){
    B = document.getElementById('Point B').value;
    document.getElementById('omega2').innerHTML= freqList[B-1].toFixed(2) ;
    document.getElementById('theta2').innerHTML= vPhase[B-1].toFixed(2) ;
}*/

$(window).on('load',emptyPlot)
$('button active').on('change',emptyPlot)

