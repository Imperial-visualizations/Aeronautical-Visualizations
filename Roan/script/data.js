
var R
var k
var c
var m

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

var i;


function initPlot() {
         R = document.getElementById("force").value;
         k = document.getElementById("spring").value;
         c = document.getElementById("damping").value;
         m = document.getElementById("mass").value;
    
for (i = 0;  i < n; i++) {
    
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
  type: 'scatter'
};
var trace2 = {
  x: w, 
  y: vampl, 
  name: 'Velocity',
  type: 'scatter'
};
var trace3 = {
  x: w, 
  y: aampl, 
  name: 'Acceleration',
  type: 'scatter'
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

}





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