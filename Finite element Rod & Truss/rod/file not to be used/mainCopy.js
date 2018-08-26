// initialize node coordinates
let x = [], origin = [];
y = new Array(25).fill(0);
yv = new Array(25).fill(-1)
yv = new Array(25).fill(0)
for (let i = 0; i < 25; i++) {
  x[i] = 10*i/25;
  origin[i] = 10*i/25;
}
// input mode shapes for 24-element rod
let allShapes = {};
$.getJSON('https://rawgit.com/Imperial-visualizations/Aeronautical-Visualizations/master/Hang/Rod_Vibration/data.json',function(allShape){
allShapes=allShape
});

// var dataJson;
// $.when(
//   $.getJSON('https://rawgit.com/Imperial-visualizations/Aeronautical-Visualizations/master/Hang/Rod_Vibration/data.json')
// ).then(function(dataJson){
//   dataJson = dataJson[0];
// })
// console.log(dataJson)
// set color gradient
let colors= [];
for(i=0;i<25;i++){
    var nodePlot = {
  connectgaps: true
};
// graph layout
var layout = {
// var layout = {
//   xaxis: {
//     range: [-1,11],
//     showgrid: false,
//     zeroline: false,
//     showline: false,
//     autotick: false,
//     ticks: '',
//     showticklabels: false
//   },
//   yaxis: {
//     range: [-1,1],
//     showgrid: false,
//     zeroline: false,
//     showline: false,
//     autotick: true,
//     ticks: '',
//     showticklabels: false
//   },
//   showlegend:false
// }
const layout = {
  autosize: false,
  width: 500,
  height: 150,
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
var layout = {
    showticklabels: false
  },
  yaxis: {
    range: [-2,1],
    range: [-0.5,0.5],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false
}
const layout3 = {
  autosize: false,
  width: 500,
  height: 150,
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
    range: [-3,3],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false
  },
  showlegend:false
}

var data = [nodePlot];
var data3 = [nodePlot];
var data2 = [];

// adding line plots for elements with color gradient
let xSegment = new Array(24), trace = new Array(24);
for (let i = 0; i < 24; i++) {
      width: 4
    }
  };
  data.push(trace[i]);
  data2.push(trace[i]);
}

Plotly.plot('graphRod', data, layout); // initial plot
Plotly.plot('graph1', data2, layout); // initial plot 2
Plotly.plot('graph2', data2, layout); // initial plot 2
Plotly.plot('graph3', data3, layout3); // initial plot 2


dt = 0.00001; t = 0; n = 5;

$('.start.button').on('click',begin_animation)
//   $('.pause.button').addClass('active');}).on('click',() =>{
//   $('.start.button').removeClass('active');});// remember to add pause function to reset button !!

function handleElement(){
  let elementNumber = parseFloat($("#element").val());
  $("#element").on("input",reset(elementNumber));
  // .on('change',getShape(elementNumber));
  $("#elementDisplay").html(elementNumber);
  //CHANGE MODE MAX
  let new_max = parseFloat($('input#element').val())+1;
  $('input#modeIndex').attr('max',new_max)
  $('#sliderMax').html(new_max)
  // data1 = []; x1 = [];
  // data2 = []; x2 = [];
  // data3 = []; x3 = [];
  // updatePlot1(elementNumber);
  // updatePlot2(elementNumber);
  // updatePlot3(elementNumber);
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
        width: 6,
        opacity: 1
      }
    };
    data1.push(trace1[i]);
  }

  Plotly.react('graph1',data1,layout);
}

let anim;

function reset(element){
 function begin_animation(){
        // }
        t = t+dt;
        x[i] = x[i]+ shape[mode-1][i] * Math.sin(108*t) * 3/(0.1*a)/e/rho;
        yv[i] = -1 + shape[mode-1][i] * Math.sin(108*t) * 3/rho/e/(0.1*a);
        yv[i] = shape[mode-1][i] * Math.sin(108*t) * 3/rho/e/(0.1*a);
        y[i] = 1;
        // yShape[i] = shape[mode-1][i] * Math.sin(108*t);
      }
 function begin_animation(){
      connectgaps: true
    };

    data = [verPlot];

    data2 = [];
    data3 = [verPlot];
    function computeSegment () {
      for (let i = 0; i < elementNumber; i++) {
        xSegment[i] = new Array(2);
 function begin_animation(){
            width: 4
          }
        };
        data.push(trace[i]);
        data2.push(trace[i]);
      }
    }

    computeNode();
    computeSegment();

    let len = data.length,traceindex=[];
    let len = data2.length,traceindex=[];

    // HIDE UNUSED SEGMENT
    for (var i = 0; i <25-len; i++) {
      data.push({opacity: 0,})
      data2.push({opacity: 0,})
    }
    for (var i = 0; i < data.length; i++) {
    for (var i = 0; i < len; i++) {
      traceindex.push(i)
    }

    Plotly.animate('graphRod',{data: data, trace: traceindex},
    Plotly.animate('graph2',{data: data2, trace: traceindex},
      { transition: {duration: 0},
        frame: {
          duration: 10,
          redraw: false
        }
      }
    );
    Plotly.animate('graph3',{data: data3},
      { transition: {duration: 0},
        frame: {
          duration: 10,