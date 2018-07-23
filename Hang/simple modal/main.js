// import Plotly from 'plotly.js-dist';
// $.getJSON('https://rawgit.com/Imperial-visualizations/Aeronautical-Visualizations/master/Hang/Rod_Vibration/data.json',
//     function(allShapes){});
// console.log(allShapes)
let y3 = new Array(25).fill(0);
var x1 = new Array(25).fill(0);
var x2 = new Array(25).fill(0);
var x3 = new Array(25).fill(0);

for (let i = 0; i < 25; i++) {x1[i] = 10*i/24};
for (let i = 0; i < 25; i++) {x2[i] = 10*i/24};
for (let i = 0; i < 25; i++) {x3[i] = 10*i/24};

let segment1 = new Array(24), segment2 = new Array(24);
let trace1 = new Array(24), trace2 = new Array(24);

const layout = {
  autosize: false,
  width: 500,
  height: 100,
  margin: {
    l: 50,
    r: 50,
    b: 100,
    t: 100,
    pad: 4
  },
  xaxis: {
    range: [-1,11],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  yaxis: {
    range: [-0.2,0.2],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false
}

var nodePlot = {
  x: x3,
  y: y3,
  type: 'scatter',
  mode: 'markers',
  marker: {
    color: 'red',
    size: 10
  },
  connectgaps: true
};

var data1 = [], data2 = [], data3 = [];
// unchanged rod initial plot
for (let i = 0; i < 24; i++) {
  segment1[i] = new Array(2);
  segment1[i][0] = x1[i];
  segment1[i][1] = x1[i+1];
  trace1[i] = {
    x: segment1[i],
    y: [0,0],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: i*5,
      width: 4,
    }
  };
  data1.push(trace1[i]);
}
Plotly.plot('graph1', data1, layout);
// vibrating rod initial plot
for (let i = 0; i < 24; i++) {
  segment2[i] = new Array(2);
  segment2[i][0] = x2[i];
  segment2[i][1] = x2[i+1];
  trace2[i] = {
    x: segment2[i],
    y: [0,0],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: i*5,
      width: 4
    }
  };
  data2.push(trace2[i]);
}
Plotly.plot('graph2', data2, layout);
// mode shape initial plot
data3.push(nodePlot)
Plotly.plot('graph3', data3, layout);

function reset(element) {
  for (let i = 0; i < element+1; i++) {
    x1[i] = 10*i/(element);
    y3[i] = -1;
  }
};

// DEFINE TIME STEP AND ITERATION COUNTER
let dt = 0.00001, t = 0, n = 5;

// JQUERY ASSIGN FUNCTION TO BUTTON
$('.start.button').on('click',()=>{
  $('.start.button').addClass('active');}).on('click',() =>{
  $('.pause.button').removeClass('active');})

$('.pause.button').on('click',()=>{
  $('.pause.button').addClass('active');}).on('click',() =>{
  $('.start.button').removeClass('active');})

$('.start.button').on('click',begin_animation_vib)

// HANDLE CONTROL PANEL CHANGE AND DISPLAY

let e = $('#EInput').val();
let rho = $('#rhoInput').val();
let a = $('#aInput').val();
let col = $('#colInput').val();


function handleElement(){
  let elementNumber = parseFloat($("#element").val());
  $("#element").on("change",reset(elementNumber));
  $("#elementDisplay").html(elementNumber);
  //CHANGE MODE MAX
  let new_max = parseFloat($('input#element').val())+1;
  $('input#modeIndex').attr('max',new_max)
  $('#sliderMax').html(new_max)
  data1 = []; x1 = [];
  data2 = []; x2 = [];
  // data3 = []; x3 = [];
  updatePlot1(elementNumber);
  // updatePlot2(elementNumber);
  // updatePlot3(elementNumber);
}

function handleMode(){
  let elementNumber = $("#element").val();
  let mode = $("#modeIndex").val();
  $("#ModeDisplay").html(mode);
  $("#modeIndex").on("change",reset(elementNumber));
}


function updatePlot1(element) {
  
  for (let i = 0; i < element+1; i++) {
    x1[i] = 10*i/(element);
  }
  for (let i = 0; i < element; i++) {
    segment1[i] = new Array(2);
    segment1[i][0] = x1[i];
    segment1[i][1] = x1[i+1];
    trace1[i] = {
      x: segment1[i],
      y: [0,0],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 20*Math.random(),
        width: 4,
        opacity: 1
      }
    };
    data1.push(trace1[i]);
  }

  Plotly.plot('graph1',{data: data1},
    { transition: {duration: 0},
      frame: {
        duration: 10,
        redraw: false
      }
    }
  );
}

function updatePlot2(element) {
  
  for (let i = 0; i < element+1; i++) {
    x2[i] = 10*i/(element);
  }
  
  for (let i = 0; i < element; i++) {
    segment2[i] = new Array(2);
    segment2[i][0] = x2[i];
    segment2[i][1] = x2[i+1];
    trace2[i] = {
      x: segment2[i],
      y: [0,0],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 20*Math.random(),
        width: 4,
        opacity: 1
      }
    };
    data2.push(trace2[i]);
  }

  Plotly.plot('graph2',{data: data2},
    { transition: {duration: 0},
      frame: {
        duration: 10,
        redraw: false
      }
    }
  );
}

// function updatePlot3(element) {
  
//   for (let i = 0; i < element+1; i++) {
//     x3[i] = 10*i/(element);
//   }
//   y3 = new Array(element+1).fill(0)
//   nodePlot = {
//     x: x3,
//     y: y3,
//     type: 'scatter',
//     connectgaps: true
//   };
  
//   data3 = [nodePlot]

//   Plotly.newPlot('graph3',{data: data3},
//     { transition: {duration: 0},
//       frame: {
//         duration: 10,
//         redraw: false
//       }
//     }
//   );
// }

shape = [
  [0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333,0.083333  ],
  [-0.11785,-0.11684,-0.11384,-0.10888,-0.10206,-0.0935,-0.08333,-0.07174,-0.05893,-0.0451,-0.0305,-0.01538,8.78e-16,0.015383,0.030502,0.0451,0.058926,0.071743,0.083333,0.093498,0.102062,0.10888,0.113835,0.116843,0.117851  ],
  [-0.11785,-0.11384,-0.10206,-0.08333,-0.05893,-0.0305,4.02e-16,0.030502,0.058926,0.083333,0.102062,0.113835,0.117851,0.113835,0.102062,0.083333,0.058926,0.030502,-8.5e-16,-0.0305,-0.05893,-0.08333,-0.10206,-0.11384,-0.11785  ],
  [0.117851,0.10888,0.083333,0.0451,-6.7e-16,-0.0451,-0.08333,-0.10888,-0.11785,-0.10888,-0.08333,-0.0451,9.72e-16,0.0451,0.083333,0.10888,0.117851,0.10888,0.083333,0.0451,-1.3e-16,-0.0451,-0.08333,-0.10888,-0.11785  ],
  [-0.11785,-0.10206,-0.05893,2.73e-16,0.058926,0.102062,0.117851,0.102062,0.058926,6.23e-16,-0.05893,-0.10206,-0.11785,-0.10206,-0.05893,2.19e-16,0.058926,0.102062,0.117851,0.102062,0.058926,-1.3e-16,-0.05893,-0.10206,-0.11785  ],
  [0.117851,0.093498,0.030502,-0.0451,-0.10206,-0.11684,-0.08333,-0.01538,0.058926,0.10888,0.113835,0.071743,-1.3e-16,-0.07174,-0.11384,-0.10888,-0.05893,0.015383,0.083333,0.116843,0.102062,0.0451,-0.0305,-0.0935,-0.11785  ],
  [-0.11785,-0.08333,1.75e-17,0.083333,0.117851,0.083333,-1.3e-16,-0.08333,-0.11785,-0.08333,1.04e-16,0.083333,0.117851,0.083333,-5.4e-16,-0.08333,-0.11785,-0.08333,1.73e-16,0.083333,0.117851,0.083333,-2.2e-16,-0.08333,-0.11785  ],
  [0.117851,0.071743,-0.0305,-0.10888,-0.10206,-0.01538,0.083333,0.116843,0.058926,-0.0451,-0.11384,-0.0935,2.84e-16,0.093498,0.113835,0.0451,-0.05893,-0.11684,-0.08333,0.015383,0.102062,0.10888,0.030502,-0.07174,-0.11785  ],
  [-0.11785,-0.05893,0.058926,0.117851,0.058926,-0.05893,-0.11785,-0.05893,0.058926,0.117851,0.058926,-0.05893,-0.11785,-0.05893,0.058926,0.117851,0.058926,-0.05893,-0.11785,-0.05893,0.058926,0.117851,0.058926,-0.05893,-0.11785  ],
  [0.117851,0.0451,-0.08333,-0.10888,2.1e-16,0.10888,0.083333,-0.0451,-0.11785,-0.0451,0.083333,0.10888,1.23e-16,-0.10888,-0.08333,0.0451,0.117851,0.0451,-0.08333,-0.10888,-5e-17,0.10888,0.083333,-0.0451,-0.11785  ],
  [-0.11785,-0.0305,0.102062,0.083333,-0.05893,-0.11384,4.82e-19,0.113835,0.058926,-0.08333,-0.10206,0.030502,0.117851,0.030502,-0.10206,-0.08333,0.058926,0.113835,-1.5e-16,-0.11384,-0.05893,0.083333,0.102062,-0.0305,-0.11785  ],
  [0.117851,0.015383,-0.11384,-0.0451,0.102062,0.071743,-0.08333,-0.0935,0.058926,0.10888,-0.0305,-0.11684,2.59e-16,0.116843,0.030502,-0.10888,-0.05893,0.093498,0.083333,-0.07174,-0.10206,0.0451,0.113835,-0.01538,-0.11785  ],
  [-0.11785,2.5e-17,0.117851,-2.1e-16,-0.11785,2.63e-16,0.117851,-1.9e-16,-0.11785,2.64e-16,0.117851,-3.1e-16,-0.11785,4.43e-16,0.117851,-3.3e-16,-0.11785,3.05e-16,0.117851,-3.7e-16,-0.11785,2.17e-16,0.117851,-2.1e-17,-0.11785  ],
  [0.117851,-0.01538,-0.11384,0.0451,0.102062,-0.07174,-0.08333,0.093498,0.058926,-0.10888,-0.0305,0.116843,-5.1e-16,-0.11684,0.030502,0.10888,-0.05893,-0.0935,0.083333,0.071743,-0.10206,-0.0451,0.113835,0.015383,-0.11785  ],
  [-0.11785,0.030502,0.102062,-0.08333,-0.05893,0.113835,-1.2e-16,-0.11384,0.058926,0.083333,-0.10206,-0.0305,0.117851,-0.0305,-0.10206,0.083333,0.058926,-0.11384,7.39e-17,0.113835,-0.05893,-0.08333,0.102062,0.030502,-0.11785  ],
  [0.117851,-0.0451,-0.08333,0.10888,-1.1e-16,-0.10888,0.083333,0.0451,-0.11785,0.0451,0.083333,-0.10888,2.3e-16,0.10888,-0.08333,-0.0451,0.117851,-0.0451,-0.08333,0.10888,-2.8e-16,-0.10888,0.083333,0.0451,-0.11785  ],
  [-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785,0.058926,0.058926,-0.11785  ],
  [0.117851,-0.07174,-0.0305,0.10888,-0.10206,0.015383,0.083333,-0.11684,0.058926,0.0451,-0.11384,0.093498,2.75e-16,-0.0935,0.113835,-0.0451,-0.05893,0.116843,-0.08333,-0.01538,0.102062,-0.10888,0.030502,0.071743,-0.11785  ],
  [0.117851,-0.08333,3.48e-17,0.083333,-0.11785,0.083333,1.12e-16,-0.08333,0.117851,-0.08333,-2.1e-16,0.083333,-0.11785,0.083333,8.56e-17,-0.08333,0.117851,-0.08333,2.06e-16,0.083333,-0.11785,0.083333,1.25e-17,-0.08333,0.117851  ],
  [0.117851,-0.0935,0.030502,0.0451,-0.10206,0.116843,-0.08333,0.015383,0.058926,-0.10888,0.113835,-0.07174,-3.2e-16,0.071743,-0.11384,0.10888,-0.05893,-0.01538,0.083333,-0.11684,0.102062,-0.0451,-0.0305,0.093498,-0.11785  ],
  [-0.11785,0.102062,-0.05893,-5e-16,0.058926,-0.10206,0.117851,-0.10206,0.058926,5.67e-16,-0.05893,0.102062,-0.11785,0.102062,-0.05893,-2.7e-16,0.058926,-0.10206,0.117851,-0.10206,0.058926,-2.1e-16,-0.05893,0.102062,-0.11785  ],
  [0.117851,-0.10888,0.083333,-0.0451,-3e-16,0.0451,-0.08333,0.10888,-0.11785,0.10888,-0.08333,0.0451,-3.7e-17,-0.0451,0.083333,-0.10888,0.117851,-0.10888,0.083333,-0.0451,6.06e-17,0.0451,-0.08333,0.10888,-0.11785  ],
  [0.117851,-0.11384,0.102062,-0.08333,0.058926,-0.0305,1.38e-15,0.030502,-0.05893,0.083333,-0.10206,0.113835,-0.11785,0.113835,-0.10206,0.083333,-0.05893,0.030502,-8.9e-16,-0.0305,0.058926,-0.08333,0.102062,-0.11384,0.117851  ],
  [0.117851,-0.11684,0.113835,-0.10888,0.102062,-0.0935,0.083333,-0.07174,0.058926,-0.0451,0.030502,-0.01538,6.98e-15,0.015383,-0.0305,0.0451,-0.05893,0.071743,-0.08333,0.093498,-0.10206,0.10888,-0.11384,0.116843,-0.11785  ],
  [-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333,0.083333,-0.08333  ]
];

let anim_vib, anim_mode;

dt = 0.00001; t = 0; n = 5;

function begin_animation_vib(){
  function compute(){

    let mode = parseFloat($("#modeIndex").val());

    // update node position
    for (let i = 0; i < 25; i++) {
      t = t + dt;
      x2[i] = x2[i]+shape[mode-1][i] * Math.sin(108*t) * 5;
    }

    // update segment coordinates
    for (let i = 0; i < element; i++) {
      segment2[i] = new Array(2);
      segment2[i][0] = x2[i];
      segment2[i][1] = x2[i+1];
      trace2[i] = {
        x: segment2[i],
        y: [0,0],
        type: 'scatter',
        mode: 'lines',
        line: {
          color: 20*Math.random(),
          width: 4,
          opacity: 1
        }
      };
      data2.push(trace2[i]);
    }
  
    // setup plotly animate
    Plotly.animate('graph2',{data: data2},
      { transition: {duration: 0},
        frame: {
          duration: 10,
          redraw: false
        }
      }
    );
    return;
  }
  // toggle start and pause
  if ($(this).html().toString()=="Start"){
    anim= setInterval(compute,10);
    $(this).text("Pause")
  }else {
        clearInterval(anim);
        $(this).text("Start")
  };
}