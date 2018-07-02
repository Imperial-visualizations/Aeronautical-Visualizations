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

let dAmplNorm =[];
let vAmplNorm =[];
let aAmplNorm =[];

let dInNorm=[];
let vInNorm=[];
let aInNorm=[];

let dOutNorm=[];
let vOutNorm=[];
let aOutNorm=[];

let damplNorm =[];
let vamplNorm =[];
let aamplNorm =[];

let dinNorm=[];
let vinNorm=[];
let ainNorm=[];

let doutNorm=[];
let voutNorm=[];
let aoutNorm=[];

function initPlot() {
        /*freq = document.getElementById("frequency").value*2*Math.PI;
        ampl = document.getElementById("amplitude").value;
        angle = document.getElementById("phase").value;
        document.getElementById('frequency').value = ''
        document.getElementById('amplitude').value = ''
        document.getElementById('phase').value = ''
        load = document.getElementById('load').value;
        document.getElementById('load').value = '';


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

           for (var i = 0; i <freqList.length; i++) {
           //freqList[i]= Math.sqrt((Math.pow(freqList[i],2)-Math.pow(Math.min(...freqList),2))/(Math.pow(Math.max(...freqList),2)-Math.pow(Math.min(...freqList),2)));

          dAmplNorm[i]= dAmpl[i]/Math.max(...dAmpl);
          vAmplNorm[i]= vAmpl[i]/Math.max(...vAmpl);
          aAmplNorm[i]= aAmpl[i]/Math.max(...aAmpl);

          dInNorm[i]= dIn[i]/Math.max(...dIn.map(Math.abs));
          vInNorm[i]= vIn[i]/Math.max(...vOut.map(Math.abs));
          aInNorm[i]= aIn[i]/Math.max(...aIn.map(Math.abs));

          dOutNorm[i]= dOut[i]/Math.max(...dIn.map(Math.abs));
          vOutNorm[i]= vOut[i]/Math.max(...vOut.map(Math.abs));
          aOutNorm[i]= aOut[i]/Math.max(...aIn.map(Math.abs));

          /* dPhase[i]= (dPhase[i]-Math.min(...dPhase))/(Math.max(...dPhase)-Math.min(...dPhase));
           vPhase[i]= (vPhase[i]-Math.min(...vPhase))/(Math.max(...vPhase)-Math.min(...vPhase));
           aPhase[i]= (aPhase[i]-Math.min(...aPhase))/(Math.max(...aPhase)-Math.min(...aPhase));

           dIn[i]= (dIn[i]-Math.min(...dIn))/(Math.max(...dIn)-Math.min(...dIn));
           dOut[i]=(dOut[i]-Math.min(...dOut))/(Math.max(...dOut)-Math.min(...dOut));
           vIn[i]= (vIn[i]-Math.min(...vIn))/(Math.max(...vIn)-Math.min(...vIn));
           vOut[i]=(vOut[i]-Math.min(...vOut))/(Math.max(...vOut)-Math.min(...vOut));
           aIn[i]= (aIn[i]-Math.min(...aIn))/(Math.max(...aIn)-Math.min(...aIn));
           aOut[i]=(aOut[i]-Math.min(...aOut))/(Math.max(...aOut)-Math.min(...aOut));

*/


        }

        console.log(Math.max(...dIn.map(Math.abs)));

            var trace1 = {
              x: freqList,
              y:dAmplNorm, 
              name: 'Displacement',
              type: 'scatter',
            };
            var trace2 = {
              x: freqList, 
              y: vAmplNorm, 
              name: 'Velocity',
              type: 'scatter',
            };
            var trace3 = {
              x: freqList, 
              y: aAmplNorm, 
              name: 'Acceleration',
              type: 'scatter',
            };
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
            var data1 = [trace1, trace2, trace3];
            Plotly.newPlot('graph1', data1, layoutlegend1, {displayModeBar:false});
            



            var trace4 = {
              x: dInNorm,
              y: dOutNorm, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace5 = {
              x: vInNorm, 
              y: vOutNorm, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace6 = {
              x: aInNorm, 
              y: aOutNorm, 
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
                            }
            var data3 = [trace7, trace8, trace9];
            Plotly.newPlot('graph3', data3, layoutlegend3, {displayModeBar:false});
    
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

            Plotly.newPlot('graph1', data1, layoutlegend1,{displayModeBar:false});

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
                            }
            Plotly.newPlot('graph3', data3, layoutlegend3, {displayModeBar:false});

};

let counter = 0;
m=0.983;

function findRes(){
    A = document.getElementById('Point A').value;
    document.getElementById('omega1').innerHTML= freqList[A-1].toFixed(2) ;
    document.getElementById('theta1').innerHTML= vPhase[A-1].toFixed(2) ;

      B = document.getElementById('Point B').value;
    document.getElementById('omega2').innerHTML= freqList[B-1].toFixed(2) ;
    document.getElementById('theta2').innerHTML= vPhase[B-1].toFixed(2) ;

    if(counter >0){
      Plotly.deleteTraces(graph1, -1);
      Plotly.deleteTraces(graph2, -1);
      Plotly.deleteTraces(graph3, -1);
    }
            var traceAB1 = {
              x: [freqList[A-1],freqList[B-1]], 
              y: [vAmplNorm[A-1],vAmplNorm[B-1]], 
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
              x: [vInNorm[A-1],vInNorm[B-1]], 
              y: [vOutNorm[A-1],vOutNorm[B-1]], 
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

            counter++;
            console.log(counter);


            wu = Math.sqrt((Math.pow(freqList[A-1],2)*freqList[B-1]*Math.tan(vPhase[B-1])-Math.pow(freqList[B-1],2)*freqList[A-1]*Math.tan(vPhase[A-1]))/(freqList[B-1]*Math.tan(vPhase[B-1])-freqList[A-1]*Math.tan(vPhase[A-1])));
            xi = ((Math.pow(freqList[B-1],2)-Math.pow(freqList[A-1],2))/(freqList[B-1]*Math.tan(vPhase[B-1])-freqList[A-1]*Math.tan(vPhase[A-1])))/(2*wu);
            coverm=2*wu*xi;
            c=coverm*m;
            koverm=Math.sqrt(wu);
            k=koverm*m

            /*const wStart = 100;
            const wEnd = 120;
            const n =500;
            const a = (wEnd - wStart)/(n-1);
            for (let i = 0;  i < n; i++) {
                
                w[i]= wStart + i*a;
                alfa[i] = k - Math.pow(w[i], 2)*m;
                wc[i] = w[i]*c;
                delta[i] = Math.pow(alfa[i], 2) + Math.pow(wc[i],2);
                din[i] = alfa[i]/(delta[i]);
                dout[i] = wc[i]/(delta[i]);
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
 /*damplNorm[i]= dampl[i]/Math.max(...dAmpl);
          vamplNorm[i]= vampl[i]/Math.max(...vAmpl);
          aamplNorm[i]= aampl[i]/Math.max(...aAmpl);

          dinNorm[i]= din[i]/Math.max(...dIn.map(Math.abs));
          vinNorm[i]= vin[i]/Math.max(...vOut.map(Math.abs));
          ainNorm[i]= ain[i]/Math.max(...aIn.map(Math.abs));

          doutNorm[i]= dout[i]/Math.max(...dIn.map(Math.abs));
          voutNorm[i]= vout[i]/Math.max(...vOut.map(Math.abs));
          aoutNorm[i]= aout[i]/Math.max(...aIn.map(Math.abs));


            }

         

            console.log(Math.max(...dIn.map(Math.abs)));

            var trace1fit = {
              x: w,
              y: dampl, 
              name: 'Displacement',
              type: 'scatter',
              mode: "lines",
            };
            var trace2fit = {
              x: w, 
              y: vampl, 
              name: 'Velocity',
              type: 'scatter',
              mode: 'lines',
            };
            var trace3fit = {
              x: w, 
              y: aampl, 
              name: 'Acceleration',
              type: 'scatter',
              mode: 'lines',
            };
            var data1fit = [trace1fit, trace2fit, trace3fit];
            Plotly.plot('graph1', data1fit );
  
            var trace4fit = {
              x: din,
              y: dout, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace5fit = {
              x: vin, 
              y: vout, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace6fit = {
              x: ain, 
              y: aout, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data2fit = [trace4fit, trace5fit, trace6fit];
            Plotly.plot('graph2', data2fit );


            var trace7fit= {
              x: w,
              y: phased, 
              name: 'Displacement',
              type: 'scatter'
            };
            var trace8fit = {
              x: w, 
              y: phasev, 
              name: 'Velocity',
              type: 'scatter'
            };
            var trace9fit = {
              x: w, 
              y: phasea, 
              name: 'Acceleration',
              type: 'scatter'
            };
            var data3fit = [trace7fit, trace8fit, trace9fit];
            Plotly.plot('graph3', data3fit);*/
            




            document.getElementById('omegau').innerHTML= wu.toFixed(2) ;
            document.getElementById('xi').innerHTML= xi.toFixed(5) ;
            document.getElementById('coverm').innerHTML=coverm.toFixed(5);
            document.getElementById('koverm').innerHTML=koverm.toFixed(2);



}

$(window).on('load',emptyPlot)
