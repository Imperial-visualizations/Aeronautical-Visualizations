let load,freq,angle,ampl;
let freqList=[], angleList=[], amplList=[];
let freqListp=[], angleListp=[], amplListp=[], loadp;
let aAmpl=[],vAmpl =[],dAmpl = [];
let aIn = [],vIn = [],dIn = [] ;
let aOut = [],vOut = [],dOut = [];
let aPhase = [], vPhase = [],dPhase = [];
let lines='lines', markers='markers';
let acc='Acceleration', vel='Velocity', disp='Displacement';
let accFit='Acceleration Fit', velFit='Velocity Fit', dispFit='Displacement Fit'
const cDisp = 'rgb(0, 128, 255)', cVel='rgb(255, 128, 0)', cAcc='rgb(77, 172, 0)';

// these are used to generate the empty plot that appears when the page loads
const wStartEmpty = 105;
const wEndEmpty = 115;
const nEmpty =500;
const aEmpty = (wEndEmpty - wStartEmpty)/(nEmpty-1);
let w=[],alfa=[],wc=[],delta=[],din=[],dout=[],vin=[],vout=[];
let ain=[],aout=[],dampl=[],phased=[],vampl=[],phasev=[],aampl=[],phasea=[];

// these are used as the data on the plots is normalised
let dAmplNorm =[], vAmplNorm =[], aAmplNorm =[];
let dInNorm=[], vInNorm=[], aInNorm=[];
let dOutNorm=[], vOutNorm=[], aOutNorm=[];
// these are the 2 data points that the students select
let A,B;

// these variables are used to generate the normalised theoretical fit of the experimental data
let damplNorm =[],vamplNorm =[], aamplNorm =[];
let dinNorm=[], vinNorm=[], ainNorm=[];
let doutNorm=[], voutNorm=[], aoutNorm=[];
let R,k,c,m;

//show and hide the modal bar
$("#modal").mouseenter(navShow);
$("#modal").mouseleave(navHide);

// function that opens the theory page in a new tab
$('#theory').click(function() {
  window.open('freqanddampingtheory2.html', '_blank');
});

$('input#reset').on('click',resetValues)
function resetValues() {
  freqList=[];
  amplList=[];
  aPhase=[];
  load=null;
  freqListp=[]; angleListp=[]; amplListp=[];
  $('input#PointA').val('');
  $('input#PointB').val('');
  $('input#load').val('');
  emptyPlot ()
}

function setTraces(cDisp, Displacement, Velocity, Acceleration,mode, w, dampl, vampl, aampl, din, dout, vin, vout, ain, aout, phased, phasev, phasea ){

  trace1 = {
    x: w,
    y: dampl, 
    name: Displacement,
    type: 'scatter',
    mode: mode,
    marker:{color: cDisp}
  };
   trace2 = {
    x: w, 
    y: vampl, 
    name: Velocity,
    type: 'scatter',
    mode: mode,
    marker:{color: cVel}
  };
  trace3 = {
    x: w, 
    y: aampl, 
    name: Acceleration,
    type: 'scatter',
    mode: mode,
    marker:{color: cAcc}
  };

  trace4 = {
    x: din,
    y: dout, 
    name: Displacement,
    type: 'scatter',
    mode: mode,
    marker:{color: cDisp}
  };
  trace5 = {
    x: vin, 
    y: vout, 
    name: Velocity,
    type: 'scatter',
    mode: mode,
    marker:{color: cVel}
  };
  trace6 = {
    x: ain, 
    y: aout, 
    name: Acceleration,
    type: 'scatter',
    mode: mode,
    marker:{color: cAcc}
  };

  trace7 = {
    x: w,
    y: phased, 
    name: Displacement,
    type: 'scatter',
    mode: mode,
    marker:{color: cDisp}
    };
  trace8 = {
    x: w, 
    y: phasev, 
    name: Velocity,
    type: 'scatter',
    mode: mode,
    marker:{color: cVel}
    };
  trace9 = {
    x: w, 
    y: phasea, 
    name: Acceleration,
    type: 'scatter',
    mode: mode,
    marker:{color: cAcc}
  };

  data1 = [trace1, trace2, trace3];
  data2 = [trace4, trace5, trace6];
  data3 = [trace7, trace8, trace9];

  layout1= {
    autosize: true,
    margin:{
    l:50, r:10, b:45, t:10
    },
    xaxis:{title:'Frequency (rad/s)'},
    yaxis:{title:'Magnitude (normalised)'},
    legend: {x: 0, y: 10, orientation: "h"},
    showlegend: false,
    font: {family: "Fira Sans", size:12} 
};

  layout2= {
    autosize: true,
    margin:{
    l:50, r:10, b:45, t:10
    },
    legend: {x: 50, y: 10, orientation: "h"
    },
    showlegend: false,
    xaxis: {title:'In-phase Component (normalised)'},
    yaxis: {scaleanchor: "x",title:'Out-of-phase Component (normalised)'},

    font: {
    family: "Fira Sans", size:12
    }
};

layout3= {
    autosize: true,
    margin:{
        l:50, r:10, b:45, t:10
    },
    xaxis:{title:'Frequency (rad/s)'},
    yaxis:{title:'Phase (rad)'},
    legend: {x: 50, y: 1, orientation: "v"
    },

    font: {
        family: "Fira Sans", size:12
    }

};}

function calculateExp(){
          aIn=[]; aOut=[]; aAmpl=[]; vAmpl=[]; vPhase=[]; vIn=[];vout=[];dAmpl=[]; dPhase=[]; dIn=[];dout=[];
          
  for(let i=0; i< freqList.length; i++) {
          aAmpl[i] = amplList[i]/load;
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
}

function normalise(freqList, dAmplNorm, vAmplNorm, aAmplNorm, dAmpl, vAmpl, aAmpl,dInNorm,vInNorm,aInNorm, dIn, vIn, aIn, dOut,vOut, aOut, dOutNorm, vOutNorm, aOutNorm){
  for (let i = 0; i <freqList.length; i++) {
          dAmplNorm[i]= dAmpl[i]/Math.max(...dAmpl);
          vAmplNorm[i]= vAmpl[i]/Math.max(...vAmpl);
          aAmplNorm[i]= aAmpl[i]/Math.max(...aAmpl);

          dInNorm[i]= (dIn[i]/Math.max(...dOut.map(Math.abs)));
          vInNorm[i]= (vIn[i]/Math.max(...vIn.map(Math.abs)));
          aInNorm[i]= (aIn[i]/Math.max(...aOut.map(Math.abs)));

          dOutNorm[i]= (dOut[i]/Math.max(...dOut.map(Math.abs)));
          vOutNorm[i]= (vOut[i]/Math.max(...vIn.map(Math.abs)));
          aOutNorm[i]= (aOut[i]/Math.max(...aOut.map(Math.abs)));
  }
}

$('input#submit').on('click', submitData)
function submitData(){

            freq = parseFloat($("input#frequency").val()*Math.PI*2);
            ampl = parseFloat($("input#amplitude").val());
            angle = parseFloat($("input#phase").val());
            loadp = parseFloat($("input#load").val());
            $("input#frequency").val('');
            $("input#amplitude").val('');
            $("input#phase").val('');
            
            if (angle && ampl && freq && loadp){
              freqListp.push(freq);
              amplListp.push(ampl);
              angleListp.push(angle);
              $('#previous').val("Show NEW Experimental Data")
              initPlot()}
            else{alert('Input your values!')}

            }
$('input#previous').on('click', initPlot)
function initPlot() {
        if ($('#previous').val().toString()=="Show PREVIOUS Experimental Data"){
            $('#previous').val("Show NEW Experimental Data")
            load = 0.06;
            freqList = [106.81, 108.07, 108.70, 108.82, 108.95, 108.98, 109.00, 109.01, 109.04, 109.08, 109.14, 109.20, 109.33, 109.45, 109.96, 110.58, 111.21, 111.84];
            amplList = [1.558, 3.35, 7.475, 8.826, 9.333, 9.355, 9.34, 9.363, 9.26, 9.272, 9.104, 8.895, 8.257, 7.526, 5.34, 3.73, 2.842, 2.28];
            aPhase = [-2.945,-2.7573, -2.18447, -1.8739, -1.604, -1.54, -1.502, -1.498, -1.432, -1.3908, -1.29, -1.21, -1.0363, -0.9092, -0.564, -0.346, -0.2426, -0.18];
        }else if($('#previous').val().toString()=="Show NEW Experimental Data"){
            $('#previous').val("Show PREVIOUS Experimental Data")
            load=loadp
            aPhase = angleListp;
            freqList=freqListp;
            amplList=amplListp;
        };
        calculateExp();
             dAmplNorm=[]; vAmplNorm=[]; aAmplNorm=[]; dInNorm=[]; dOutNorm=[]; vInNorm=[]; vOutNorm=[]; aInNorm=[]; aOutNorm=[];
        normalise(freqList, dAmplNorm, vAmplNorm, aAmplNorm, dAmpl, vAmpl, aAmpl,dInNorm,vInNorm,aInNorm, dIn, vIn, aIn, dOut,vOut, aOut, dOutNorm, vOutNorm, aOutNorm)
        setTraces(cDisp, disp, vel, acc, markers, freqList, dAmplNorm, vAmplNorm, aAmplNorm, dInNorm, dOutNorm, vInNorm, vOutNorm, aInNorm, aOutNorm, dPhase, vPhase, aPhase)
        Plotly.newPlot('graph1', data1, layout1, {displayModeBar:false});
        Plotly.newPlot('graph2', data2, layout2, {displayModeBar:false});
        Plotly.newPlot('graph3', data3, layout3, {displayModeBar:false});
        counter=0
    
  }
  function emptyPlot(){
    for (var i = 0;  i < nEmpty; i++) {
                w[i]= wStartEmpty + i*aEmpty;
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

            setTraces(w, dampl, vampl, aampl, din, dout, vin, vout, ain, aout, phased, phased, phasea );
            Plotly.newPlot('graph1', data1, layout1,{displayModeBar:false});
            Plotly.newPlot('graph2', data2, layout2, {displayModeBar:false});
            Plotly.newPlot('graph3', data3, layout3, {displayModeBar:false});
};

let counter = 0;

$('input#PointA').on('change', findRes)
$('input#PointB').on('change', findRes)

function findRes(){
    A = $("input#PointA").val();
    $('#omega1').html(freqList[A-1].toFixed(2));
    $('#theta1').html(vPhase[A-1].toFixed(2));

    B = $('input#PointB').val();
    $('#omega2').html(freqList[B-1].toFixed(2)) ;
    $('#theta2').html(vPhase[B-1].toFixed(2));

    if(counter >0){
      Plotly.deleteTraces(graph1, [-1, -2, -3, -4]);
      Plotly.deleteTraces(graph2, [-1, -2, -3, -4]);
      Plotly.deleteTraces(graph3, [-1, -2, -3, -4]);
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

            wu = Math.sqrt((Math.pow(freqList[A-1],2)*freqList[B-1]*Math.tan(vPhase[B-1])-Math.pow(freqList[B-1],2)*freqList[A-1]*Math.tan(vPhase[A-1]))/(freqList[B-1]*Math.tan(vPhase[B-1])-freqList[A-1]*Math.tan(vPhase[A-1])));
            xi = ((Math.pow(freqList[B-1],2)-Math.pow(freqList[A-1],2))/(freqList[B-1]*Math.tan(vPhase[B-1])-freqList[A-1]*Math.tan(vPhase[A-1])))/(2*wu);
            coverm=2*wu*xi;
            m=4;
            c=coverm*m;
            koverm=Math.pow(wu,2);
            k=koverm*m;
            R=Math.max(...vIn.map(Math.abs))/(4*c)

            const wStart = Math.min(...freqList);
            const wEnd = Math.max(...freqList);
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

            }
            normalise(w, damplNorm, vamplNorm, aamplNorm, dampl, vampl, aampl,dinNorm,vinNorm,ainNorm, din, vin, ain, dout,vout, aout, doutNorm, voutNorm, aoutNorm)
     
            setTraces(cDisp, dispFit, velFit, accFit, lines, w, damplNorm, vamplNorm, aamplNorm, dinNorm, doutNorm, vinNorm, voutNorm, ainNorm, aoutNorm, phased, phasev, phasea )
            
            console.log(Math.pow(vInNorm[0],2)+Math.pow(vOutNorm[0],2))
            console.log(Math.pow(vAmplNorm[0],2))

            Plotly.plot('graph1', data1 );
            Plotly.plot('graph2', data2 );
            Plotly.plot('graph3', data3);
            
            $('#omegau').html(wu.toFixed(2));
            $('#xi').html(xi.toFixed(5)) ;
            $('#coverm').html(coverm.toFixed(2));
            $('#koverm').html(koverm.toFixed(2));
}

/** --------------------------- Function for modal ---------------------------- **/

//Get modal element
let modal = document.getElementById("guideModal");
let modalContent = document.getElementsByClassName("modalContent");

//Listen for outside click
window.addEventListener("click", outsideClick);
let j;
//Function to open modal
$('#modal').click(function(){
  openModal()
  j=0})
$('.nextBtn').click(function(){
  nextModal(j);
  j++

})
$('.closeBtn').click(closeModal)
$('.closeBtnH').click(closeModal)
function openModal(){
    modal.style.display = "block";
    modalContent[0].style.display = "block";
    modalContent[1].style.display = "none";
    modalContent[2].style.display = "none";
    modalContent[3].style.display = "none";
    modalContent[4].style.display = "none";
    modalContent[5].style.display = "none";
}

//Function to close modal
function closeModal(){
    modal.style.display = "none";
}

//Function to close modal if outside click
function outsideClick(e){
    if(e.target === modal){
        modal.style.display = "none";
    }
}

//Function to close current modal and open next modal
function nextModal(n){
    modalContent[n].style.display = "none";
    modalContent[n+1].style.display = "block";
}

/** --------------------------- Function for hiding after few seconds---------------------------- **/
/* Function to make fade out instruction tab after window load */
//Display nav bar
function navShow(){document.getElementById("modal").style.left = "30px";}
navShow();

//Hide nav bar
function navHide(){document.getElementById("modal").style.left = "5px";
    document.getElementById("modal").style.transitionDuration = "1s";}

//Set timeout in milliseconds
setTimeout(function() {
    navHide();
}, 3000);
$(window).on('load',emptyPlot)
