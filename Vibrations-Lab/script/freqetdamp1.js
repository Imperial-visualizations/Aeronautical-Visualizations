
//what variables are these?
let R,k,c,m;

const wStart = 0.1;
const wEnd = 3;
const n =500;
const a = (wEnd - wStart)/(n-1);

let damplNorm=[],vamplNorm=[],aamplNorm=[];
let dinNorm=[];
let doutNorm=[];
                
let vinNorm=[];
let voutNorm=[];
                
let ainNorm=[];
let aoutNorm=[];

let w=[],alfa=[],wc=[],delta=[],din=[],dout=[],vin=[],vout=[];
let ain=[],aout=[],dampl=[],phased=[],vampl=[],phasev=[],aampl=[],phasea=[];


let trace1,trace2,trace3,trace4,trace5,trace6,trace7,trace8,trace9;
let data1,data2,data3;
let layout1,layout2,layout3;
const cDisp = 'rgb(0, 128, 255)', cVel='rgb(255, 128, 0)', cAcc='rgb(77, 172, 0)';

//show and hide the modal bar
$("#modal").mouseenter(navShow);
$("#modal").mouseleave(navHide);

// function that opens the theory page in a new tab
$('#theory').click(function() {
  window.open('freqanddapingtheory1.html', '_blank');
});
// function animates and relayouts given new data and a plotly div
function animate_shorthand(data,div){
  Plotly.animate(div, {
    data: data,
    traces: [0, 1, 2],
    }, 
    {
    transition: {
      duration: 0,
      easing: 'cubic-in-out'
    },
    frame: {duration: 0,redraw: false}
  });
  Plotly.relayout( div, {
    'xaxis.autorange': true,
    'yaxis.autorange': true
  });
};

//all the math goes here
function calculate(){
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
};


//sets the list of traces given the calculated physical arrays
function setTraces(){

  trace1 = {
    x: w,
    y: dampl, 
    name: 'Displacement',
    type: 'scatter',
    mode: "lines",
    marker: {color: cDisp}
  };
   trace2 = {
    x: w, 
    y: vampl, 
    name: 'Velocity',
    type: 'scatter',
    mode: 'lines',
    marker: {color: cVel}
  };
  trace3 = {
    x: w, 
    y: aampl, 
    name: 'Acceleration',
    type: 'scatter',
    mode: 'lines',
    marker:{color: cAcc}
  };

  trace4 = {
    x: din,
    y: dout, 
    name: 'Displacement',
    type: 'scatter',
    mode: 'lines',
    marker:{color: cDisp}
  };
  trace5 = {
    x: vin, 
    y: vout, 
    name: 'Velocity',
    type: 'scatter',
    mode: 'lines',
    marker:{color: cVel}
  };
  trace6 = {
    x: ain, 
    y: aout, 
    name: 'Acceleration',
    type: 'scatter',
    mode: 'lines',
    marker:{color: cAcc}
  };

  trace7 = {
    x: w,
    y: phased, 
    name: 'Displacement',
    type: 'scatter',
    mode: 'lines',
    marker:{color: cDisp}
    };
  trace8 = {
    x: w, 
    y: phasev, 
    name: 'Velocity',
    type: 'scatter',
    mode: 'lines',
    marker:{color: cVel}
    };
  trace9 = {
    x: w, 
    y: phasea, 
    name: 'Acceleration',
    type: 'scatter',
    mode: 'lines',
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
    yaxis:{title:'Magnitude'},
    legend: {x: 0, y: 10, orientation: "h"},
    showlegend: false,
    font: {family: "Fira Sans", size:12} 
};

  layout2= {
    margin:{
    l:50, r:10, b:45, t:10
    },
    legend: {x: 50, y: 10, orientation: "h"
    },
    showlegend: false,
    xaxis: {title:'In-phase Component'},
    yaxis: {scaleanchor: "x",title:'Out-of-phase Component'},

    font: {
    family: "Fira Sans", size:12
    }
};

layout3= {
    autosize: true,
    margin:{
        l:50, r:10, b:45, t:10
    },
    legend: {x: 50, y: 1, orientation: "v"
    },
    xaxis:{title:'Frequency (rad/s)'},
    yaxis:{title:'Phase (rad)'},
    font: {
        family: "Fira Sans", size:12
    }

};

}

// generate the data that is used to create the plots
function initPlot() {
         R = $("input#Force").val();
         k = $("input#Spring").val();
         c = $("input#Damping").val();
         m = $("input#Mass").val();

        calculate();
        setTraces();

        animate_shorthand(data1,'graph1')
        animate_shorthand(data2,'graph2')
        animate_shorthand(data3,'graph3')
}

// create an empty plot that is displayed when the page is loaded. Default values are used
function emptyPlot(){
         R = $("input#Force").val();
         k = $("input#Spring").val();
         c = $("input#Damping").val();
         m = $("input#Mass").val();

        calculate();
        setTraces();

            // as before, first plot, amplitude vs frequency
            

            Plotly.newPlot('graph1', data1, layout1, {displayModeBar:false});

            // in phase vs out of phase

            Plotly.newPlot('graph2', data2, layout2, {displayModeBar:false});
            
            //phase vs frequency
          
            Plotly.newPlot('graph3', data3, layout3, {displayModeBar:false});
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
    arrowHide1();
    arrowHide2();
}, 3000);
$(window).on('load',emptyPlot)
$(document).ready = main();