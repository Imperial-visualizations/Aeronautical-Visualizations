let phase;
let ampl;

let phaseList=[];
let amplList=[];

let wexp, phaseListp=[], amplListp=[];

let n=9;
let t=0;
let dt=0.00005;
let wt;

//position vectors containing the xyz coordinates of each point mass
y=[0,-0.508, -1.016, -1.524, -2.032, -1.016*(Math.sin(Math.PI/6)+1), -1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)+1)];
x=[0,0,0,0,0, -1.016*Math.cos(Math.PI/6), -1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)]
// incremented in the for loop with the eigenvector and a sine function
z=[0, 0, 0, 0, 0, 0, 0, 0, 0]
//eigenvectors
xi=[[0.051, -0.054, -0.15, -0.353, -0.639, 1, 0.118, 0.118, 1],[1,  0.198, -0.228,  0.03,  0.708, 0.214, -0.231, -0.231, 0.214],[-0.823, 0.29,  0.494, 0.208, 0.131, 0.545, -1, -1, 0.545],[0.78, -0.62, -0.107,  1, -0.82, 0.025, -0.089, -0.089, 0.025]];
// the measured z position, this will be later changed with the measured eigenvector
zmes=[0, 0, 0, 0, 0, 0, 0, 0, 0]
//the resonance frequencies, these need to be changed according to the input of the students
w=[15.65, 34.45, 65.2, 106.84]
wex=17.33759511;

//The -1/1 factors accountig for the back/front position of the sensor
const fact=[1, -1, -1, -1, 1, -1, 1, 1, -1];

// function that opens the theory page in a new tab
$('#theory').click(function() {
  window.open('modeshapetheory2.html', '_blank');
});


$('input#match').on('click', matchFreq)
function matchFreq (){
      if ($(this).val().toString()=="Match Frequencies"){
        wt=wex;
        $(this).val("Unmatch Frequencies")
      }else {
            wt=w[k];
            $(this).val("Match Frequencies")
        }};



// function that erases the data acquired (amplitude and phase angle) on press of the "reset" button
$('input#reset').on('click',resetValues)
function resetValues() {
  phaseList=[];
  amplList=[]
  phaseListp=[];
  amplListp=[];
  wexp;
  $('#frequency').val('');
  clearInterval(anim)
  z=[0, 0, 0, 0, 0, 0, 0, 0, 0]
  zmes=[0, 0, 0, 0, 0, 0, 0, 0, 0]
  t=0;
  generate2D()
   if ($('input#start').val().toString()=="Pause"){
        $('input#start').val("Start")
      }
}

//function that takes the values inputed by the students in the input form, on the press of the "submit" button
$('input#submit').on('click', takeValues)
function takeValues() {

        phase = parseFloat($("#phase").val());
        ampl = parseFloat($("#amplitude").val());
        $('#phase').val('')
        $('#amplitude').val('')
        wexp = parseFloat($('#frequency').val());

        if (wexp && phase && ampl && amplListp.length<9){
          phaseListp.push(phase)
          amplListp.push(ampl)
          $('#previous').val("Show NEW Experimental Data")
          select()
        }
          else{alert('Input your values!')};

        if(amplListp.length===9){
          alert('You have now imported all your data, anyting that you will add will not count. Click "Reset" to start again.')
        } }

$('input#previous').on('click', select)
function select() {

  if ($('#previous').val().toString()=="Show PREVIOUS Experimental Data"){
            $('#previous').val("Show NEW Experimental Data")
            wex=17.33759511;
            amplList=[0.2587891, 0.2929688, 1.3867188, 3.0371094, 5.5273438, 9.1870117, 1.015625, 0.9228516, 9.284668];
            phaseList=[-1.45071, -1.9997, -1.93723, -1.95051, 1.172893, 1.190894, -1.91862, -1.95301, 1.131028];
            wt=w[k];
            if(wt===wex){
                $('#match').val("Unmatch Frequencies")}
            else{$('#match').val("Match Frequencies")}
            if(amplList.length===9){
            correctAplitude();}
  }else if($('#previous').val().toString()=="Show NEW Experimental Data"){
            $('#previous').val("Show PREVIOUS Experimental Data")
            $('#match').val("Match Frequencies")
            wex=wexp
            wt=w[k];
            phaseList = phaseListp;
            amplList=amplListp;
            if(wt===wex){
                $('#match').val("Unmatch Frequencies")}
            else{$('#match').val("Match Frequencies")}
            if(amplList.length===9){
            correctAplitude();}
  };
}
for (var i = 0; i <w.length; i++) {
            if(0.7*w[i]<=wex && 1.3*w[i]>=wex){
                k=i;
            }
        }
        wt=w[k]; //store the theoretical frequency in a separate variable
// function that calculates the corrected amplitude and then normalises it.
//The generate2D function is called inside so that the plots are made after the amplitude is calculated.
function correctAplitude(){
  for (var i = 0; i < n; i++) {
    if (phaseList[i]<0){
      amplList[i]=-amplList[i];
    }
    amplList[i]= amplList[i]/Math.max(...amplList.map(Math.abs))*fact[i]*(-1);
  }
    generate2D();
}
// function that generates the 2d plots
function generate2D() {
    // trace of the fuselage
    var traceAircraftV = {

              x: [y[0],y[1],y[2],y[3],y[4]],
              y: z,
              line: {shape: 'spline'},
              type: 'scatter',
              name:'Theoretical',
              marker: {
                      color: 'rgb(139, 0, 0)',
                      size: 10,
                      }};
    // trace of the fuselage, will be changed with the eigenvector calculated by the students
    let traceAircraftVmeasured={
              x: [y[0],y[1],y[2],y[3],y[4]],
              y: zmes,
              line: {shape: 'spline'},
              type: 'scatter',
              name: 'Experimental',
              marker: {
                      color: 'rgb(10, 132, 4)',
                      size: 10,
                      }};
    //trace of te wings
    var traceAircraftH = {
              x: [x[5],x[6],x[2],x[7],x[8]],
              y: z,
              type: 'scatter',
              name:'Theoretical',
              line: {shape: 'spline'},
              marker: {
                      color: 'rgb(99, 45, 122)',
                      size: 10,
                      }};
    // trace of the wings, will be changed with the eigenvector calculated by students
    let traceAircraftHmeasured={
              x: [x[5],x[6],x[2],x[7],x[8]],
              y: zmes,
              name: 'Experimental',
              type: 'scatter',
              line: {shape: 'spline'},
              marker: {
                      color: 'rgb(10, 132, 4)',
                      size: 10,
                      } };
// set the layout for the two plots
var layout = {
    xaxis: {
      range:[-2,0],
      title: 'Fuselage coordinate (m)'
    },

    yaxis: {
      scaleanchor: "x",
      range:[-1,1],
      title:'Eigenvector (normalised)',
    },

    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
}

var layout2 = {
    xaxis: {
      range:[-1,1],
      title: 'Wing coordinate (m)'
    },
    yaxis: {
      scaleanchor: "x",
      range:[-1,1],
      title:'Eigenvector (normalised)'
    },

    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
}
            // generate the plots
            Plotly.newPlot('graphAircraftV', [traceAircraftV, traceAircraftVmeasured], layout, {displayModeBar:false});
            Plotly.newPlot('graphAircraftH', [traceAircraftH, traceAircraftHmeasured], layout2,{displayModeBar:false});
}


// start animation on click of the start button
$('input#start').on('click',begin_animation)
//iteration of each of the nine points, this is the new shape, sinusoidal function scaled with the eigenvector
function animate2D (){
        dt=0.00005;
        function compute () {
          for (var i = 0; i < n; i++) {
            z[i]=xi[k][i]*Math.sin(wt*2*Math.PI*t)
            zmes[i]=amplList[i]*Math.sin(wex*2*Math.PI*t)
            t=t+dt;
          }
        }


          compute();
          //plot using plotly animate
          Plotly.animate('graphAircraftV', {
            data: [{x: [y[0],y[1],y[2],y[3],y[4]], y:[z[0],z[1],z[2],z[3],z[4]]},
                    {x: [y[0],y[1],y[2],y[3],y[4]], y:[zmes[0],zmes[1],zmes[2],zmes[3],zmes[4]]}]
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
            data: [{x: [x[5],x[6],x[2],x[7],x[8]], y:[z[5],z[6],z[2],z[7],z[8]]}, {x: [x[5],x[6],x[2],x[7],x[8]], y:[zmes[5],zmes[6],zmes[2],zmes[7],zmes[8]]}]
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
        $(this).val("Pause")
      }else {
            clearInterval(anim);
            $(this).val("Start")
        };
  }
$(window).on('load', generate2D)
