//fuselage coordinates
var y=[0,-0.508, -1.016, -1.524, -2.032, -1.016*(Math.sin(Math.PI/6)+1), -1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)/2+1),-1.016*(Math.sin(Math.PI/6)+1)];
var x=[0,0,0,0,0, -1.016*Math.cos(Math.PI/6), -1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)/2, 1.016*Math.cos(Math.PI/6)]

//eigenvectors
var eigs =[[0.051, -0.054, -0.15, -0.353, -0.639, 1, 0.118, 0.118, 1],[1,  0.198, -0.228,  0.03,  0.708, 0.214, -0.231, -0.231, 0.214],[-0.823, 0.29,  0.494, 0.208, 0.131, 0.545, -1, -1, 0.545],[0.78, -0.62, -0.107,  1, -0.82, 0.025, -0.089, -0.089, 0.025],[-0.87573374885010935,1,-0.2699170241978317,0.3544158096378055,-0.24153902434171154,-0.035645767866736663,0.061189182073798108,0.061189182073798108,-0.035645767866736663],[-1,0.96073121957399066,-0.3675846499086089,-0.47795867491901484,0.452883797527915,0.8124909513726768,0.28100285936623415,0.28100285936623415,0.8124909513726768],[-0.0084215161285740685,-0.0017116884223683652,-0.32231936139084988,0.027405366248597365,-0.038769370623410938,1,0.60373918725054343,0.60373918725054343,1],[-1,0.060948407855320089,-0.08043048929324309,0.0068627094197270611,0.5848929324309331,-0.17865660712304449,-0.21376278708532123,-0.21376278708532123,-0.17865660712304449],[-1,-0.38871691527818175,0.14259497790889325,-0.312437847121231,-0.62839157352391239,-0.033421697760418832,-0.040239401116328025,-0.040239401116328025,-0.033421697760418832],[1,0.60741714075246489,-0.14591937803925081,-0.26409241811132178,-0.36373056994818648,-0.15074285884935271,-0.17298830837228052,-0.17298830837228052,-0.15074285884935271],[1,0.76075715807969524,-0.62295908156968016,-0.30894027834968374,-0.34817599545688382,-0.81115368536196664,-0.84777103365321649,-0.84777103365321649,-0.81115368536196664],[0.976232222871615,1,0.025919694033447148,-0.58825248392752771,-0.528740758969311,0.2033995714007403,0.11399561147169501,0.11399561147169501,0.2033995714007403],[1,0.68762200642947924,0.18457381856242161,0.37183863170048925,0.52468371780068612,0.0080583221883488536,-0.0005552777385511243,-0.0005552777385511243,0.0080583221883488536]];

//eigenvalues
w=[15.65, 34.45, 65.2, 106.84, 161.91, 462.13, 510.41, 742.93, 923.12, 1039.6, 1149.2, 1604.9, 2550.6].map(function(x){return x*2*Math.PI});

//initialising
var frameNo = 0;
const periodConst = 525;

var modeShape = 1;
var modeW = w[modeShape-1];

//var speedOut = document.getElementById("speedDisplay");
var eigOut = document.getElementById("eigenvalue");

var period = periodConst - parseFloat(document.getElementById("speedInput").value);
//speedOut.innerHTML = periodConst - period;

document.getElementById("speedInput").oninput = function() {
  speedCheck(this.value);
  //speedOut.innerHTML = this.value;
}

var yLat = [0,0,0,0,0];
var yLong = [0,0,0,0,0];

let line3DLat = {
  type: 'scatter3d',
  x: [x[0],x[1],x[2],x[3],x[4]],
  y: [y[0],y[1],y[2],y[3],y[4]],
  z: yLat,
  line: {simplify: false, shape: 'spline'},
  showlegend: false,
};
let line3DLong ={
  type: 'scatter3d',
  x: [x[5],x[6],x[2],x[7],x[8]],
  y: [y[5],y[6],y[2],y[7],y[8]],
  z: yLong,
  line: {simplify: false, shape: 'spline'},
  showlegend: false,
};

let layout3d={
            autosize: false,
            width: 500,
            plot_bgcolor:"#F4F4F4",
            paper_bgcolor:"#F4F4F4",
            margin: {
                l: 5, r: 5, b: 5, t: 5, pad: 5
            },
            scene: {
                aspectmode: "cube",
                //camera:{eye:{x:1.25,},}
                xaxis: {
                    range: [-1, 1], fixedrange: true, autorange: false, title:'x', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                yaxis: {
                    range: [-2.4, 0], fixedrange: true, autorange: false, title:'y', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      },
                zaxis: {
                    range: [-1, 1], fixedrange: true, autorange: false, title:'z', zeroline: true, showspikes: false, autotick: false, ticks: 'outside', tick0: 0, dtick: 0.5,
                      }
                },
            xaxis: {fixedrange:true},
            yaxis: {fixedrange:true},
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

var layout1d = {
    autosize: false,
    width: 250,
    height: 250,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 10,
      r: 10,
      b: 10,
      t: 10,
      pad: 4
    },
    xaxis: {
      //range: [-1,20.1],
      fixedrange: true,
      showgrid: true,
      zeroline: true,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      //range: [-1,20.1],
      fixedrange: true,
      showgrid: true,
      zeroline: true,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: false,
}

//combined functions
function compute() {
  frameNo++;
  frameConst = Math.sin(Math.PI*frameNo/period);
  modeIndex = modeShape-1;

  if (modeShape != document.getElementById("modeInput").value) {
    frameNo = 0;
    modeShape = document.getElementById("modeInput").value;
    modeIndex = modeShape-1;
    modeW = w[modeIndex];
    eigOut.innerHTML = '$'+modeW.toFixed(2).toString()+'$';
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"eigenvalue"]);
  }

  ymaxLat = [eigs[modeIndex][5],eigs[modeIndex][6],eigs[modeIndex][2],eigs[modeIndex][7],eigs[modeIndex][8]]
  yLat = ymaxLat.map(function(x) { return x * frameConst });

  ymaxLong = [eigs[modeIndex][0],eigs[modeIndex][1],eigs[modeIndex][2],eigs[modeIndex][3],eigs[modeIndex][4]];
  yLong = ymaxLong.map(function(x) { return x * frameConst });
}

function update() {
  //console.log(frameNo);
  compute();
  Plotly.animate('graphLat', {
    data: [{x:[x[5],x[6],x[2],x[7],x[8]], y: yLat,}]
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: false,
    }
  });

  Plotly.animate('graphLong', {
    data: [{x:[y[0],y[1],y[2],y[3],y[4]], y: yLong,}]
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: false,
    }
  });

  Plotly.animate('graph3D', {
    data: [{
      x: [x[0],x[1],x[2],x[3],x[4]],
      y: [y[0],y[1],y[2],y[3],y[4]],
      z: yLong,
      showscale: 'false',
      line: {simplify: false, shape: 'spline'}
    },{
      x: [x[5],x[6],x[2],x[7],x[8]],
      y: [y[5],y[6],y[2],y[7],y[8]],
      z: yLat,
      showscale: 'false',
      line: {simplify: false, shape: 'spline'}
    }]
  }, {
    transition: {
      duration: 0,
    },
    frame: {
      duration: 0,
      redraw: false,
    },
    xaxis: {range: [-1, 1]},
    yaxis: {range: [-1, 1]},
    zaxis: {range: [-1, 1]},
  });
  //*/
  return;
}

// checks for new period
function speedCheck(newPeriod) {
  newPeriod = periodConst - newPeriod;
  frameNo = Math.floor(frameNo*newPeriod/period);
  period = newPeriod;
}

// global update function
function main() {
  Plotly.newPlot('graph3D', [line3DLat, line3DLong], layout3d, {showSendToCloud:true, doubleClick: false, displayModeBar: false, });
  //*/

  //lateral plot
  Plotly.newPlot('graphLat', [{
    x: [x[5],x[6],x[2],x[7],x[8]],
    y: yLat,
    line: {simplify: false, shape: 'spline'},
    marker: {
      color: 'rgb(255,127,14)',
      line: {
        color: 'rgb(255,127,14)',
      }
    }
  }], layout1d, {showSendToCloud:true, doubleClick: false, displayModeBar: false, });

  //longitudinal plot
  Plotly.newPlot('graphLong', [{
    x: [y[0],y[1],y[2],y[3],y[4]],
    y: yLong,
    line: {simplify: false, shape: 'spline'},
  }], layout1d, {showSendToCloud:true, doubleClick: false, displayModeBar: false, });

  $('#start').on('click',startButton);

  $('#modeInput').on('change', function(){
    if (frameNo<=0) {
      frameNo=0;
    } else {
      frameNo--;
    };
    update();
  });
}

let startval;

function startButton() {
  if($('#start').val().toString()=='Start'){
    startval = setInterval(update,30);
    $('#start').val("Pause");
  } else {
    clearInterval(startval);
    $('#start').val("Start");
  };
}

$(document).ready = main();


















//
