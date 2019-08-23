// initialise mathJax
math.config({
  number: 'Fraction'
})

// slider vals
var sliderInput = [0, 0];

// define constants
const graphConst = 0.08;
const graph2Const = 0.2;
const ratio = ((4-13*math.sqrt(2))/23);
const cutConst = 0.75;
const arrowConst = 0.25;

// define coordinates
const coordX = [0, 1, 0, 1, 2,];
const coordY = [0, 0, 1, 1, 1,];

// displacements
const disp1X = [0, -2, 0, 1, 2];
const disp1Y = [0, -2*(1+math.sqrt(2)), 0, -2*(1+math.sqrt(2)), -4*(1.5+math.sqrt(2))];

// bars: 12, 23, 24, 25, 34, 45, 14
const bars0 = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4],];

// initialise graph
let data, layout, newData;
// plot data
function updateData () {
  const mapRange = [0, 1, 2, 3, 4];
  newData = [
    mapRange.map(function (n) {return [
      coordX[n]+(disp1X[n])*sliderInput[0]*graphConst,
      coordY[n]+(disp1Y[n])*sliderInput[0]*graphConst,
    ];}),

  ];

  data = [bars0.map(function (n) {
    return {
      x: [newData[0][n[0]][0], newData[0][n[1]][0],],
      y: [newData[0][n[0]][1], newData[0][n[1]][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    };
  }).concat({ // nodes
    x: [newData[0][1][0], newData[0][3][0], newData[0][4][0]],
    y: [newData[0][1][1], newData[0][3][1], newData[0][4][1]],
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'black', size: 10},
    connectgaps: false,
  })];
  return;
}

function updateLayout () {
  layout = [{
    autosize: false,
    width: 590,
    height: 290,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 5,
      r: 5,
      b: 5,
      t: 25,
      pad: 4
    },
    xaxis: {
      range: [-1.25,3.25],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-.5,1.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    showlegend: false,
    hovermode: false,
    annotations: [{ // R arrow
      x: newData[0][4][0],
      y: newData[0][4][1]+0.08,
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 1,
      arrowwidth: 2*(1+(parseFloat(sliderInput[0]))),
      arrowsize: 1,
      ax: 0,
      ay: -40*(1+(parseFloat(sliderInput[0]))),
    }, { // R text
      x: newData[0][4][0],
      y: newData[0][4][1]+0.1,
      xref: "x",
      yref: "y",
      text: "$R$",
      font: {size:15*(1+(parseFloat(sliderInput[0]))), color: 'grey'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 1,
      arrowwidth: 2*(1+(parseFloat(sliderInput[0]))),
      arrowsize: 1,
      ax: 0,
      ay: -40*(1+(parseFloat(sliderInput[0]))),
    }, { //r1 arrow
      x: newData[0][3][0]+0.3,
      y: newData[0][3][1]+0.07-0.06*parseFloat(sliderInput[0]),
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 5,
      arrowwidth: 2,
      arrowsize: 1,
      ax: -35,
      ay: 0,
    }, { // r1 text
      x: newData[0][3][0]+0.4,
      y: newData[0][3][1]+0.07-0.06*parseFloat(sliderInput[0]),
      xref: "x",
      yref: "y",
      text: "$r_1$",
      font: {color:'red'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { //r2 arrow
      x: newData[0][3][0],
      y: newData[0][3][1]+0.3,
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 5,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 40,
    }, { // r2 text
      x: newData[0][3][0],
      y: newData[0][3][1]+0.4,
      xref: "x",
      yref: "y",
      text: "$r_2$",
      font: {color:'red'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { //r3 arrow
      x: newData[0][1][0]+0.3+0.06*parseFloat(sliderInput[0]),
      y: newData[0][1][1],
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 5,
      arrowwidth: 2,
      arrowsize: 1,
      ax: -35,
      ay: 0,
    }, { // r3 text
      x: newData[0][1][0]+0.4+0.06*parseFloat(sliderInput[0]),
      y: newData[0][1][1],
      xref: "x",
      yref: "y",
      text: "$r_3$",
      font: {color:'red'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { //r4 arrow
      x: newData[0][1][0]-0.07+0.06*parseFloat(sliderInput[0]),
      y: newData[0][1][1]+0.35,
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 5,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 40,
    }, { // r4 text
      x: newData[0][1][0]-0.07+0.06*parseFloat(sliderInput[0]),
      y: newData[0][1][1]+0.45,
      xref: "x",
      yref: "y",
      text: "$r_4$",
      font: {color:'red'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { //r5 arrow
      x: newData[0][4][0]+0.35+0.03*parseFloat(sliderInput[0]),
      y: newData[0][4][1],
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 5,
      arrowwidth: 2,
      arrowsize: 1,
      ax: -35,
      ay: 0,
    }, { // r5 text
      x: newData[0][4][0]+0.45+0.03*parseFloat(sliderInput[0]),
      y: newData[0][4][1],
      xref: "x",
      yref: "y",
      text: "$r_5$",
      font: {color:'red'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { //r6 arrow
      x: newData[0][4][0]+0.10+0.03*parseFloat(sliderInput[0]),
      y: newData[0][4][1]+0.3,
      xref: "x",
      yref: "y",
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 5,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 40,
    }, { // r6 text
      x: newData[0][4][0]+0.2+0.03*parseFloat(sliderInput[0]),
      y: newData[0][4][1]+0.3,
      xref: "x",
      yref: "y",
      text: "$r_6$",
      font: {color:'red'},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { // node 1
      x: newData[0][3][0]-0.1-0.03*parseFloat(sliderInput[0]),
      y: newData[0][3][1]-0.1+0.03*parseFloat(sliderInput[0]),
      xref: "x",
      yref: "y",
      text: "$1$",
      font: {color:'#cc7722', size: 20},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { // node 2
      x: newData[0][1][0]-0.1-0.03*parseFloat(sliderInput[0]),
      y: newData[0][1][1]-0.1+0.03*parseFloat(sliderInput[0]),
      xref: "x",
      yref: "y",
      text: "$2$",
      font: {color:'#cc7722', size: 20},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, { // node 3
      x: newData[0][4][0],
      y: newData[0][4][1]-0.1,
      xref: "x",
      yref: "y",
      text: "$3$",
      font: {color:'#cc7722', size: 20},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 2,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 0,
      ay: 0,
    }, ],
    shapes: [{ // lower wall
      type: "line",
      x0: -0.02,
      y0: -0.1,
      x1: -0.02,
      y1: .1,
      line: {
        color: "black",
        width: 5,
      }
    }, { // upper wall
      type: "line",
      x0: -0.02,
      y0: 0.9,
      x1: -0.02,
      y1: 1.1,
      line: {
        color: "black",
        width: 5,
      }
    }],
  }];
  return;
}

function update () {

  sliderInput = [
    $("#forceInput").val(),
  ];

  updateData();
  updateLayout();

  Plotly.react('graph0', data[0], layout[0]);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  return;
}

// when page ready
function main () {

  // typeset math
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  // connect sliders
  $("input").on("change", function() {update()})

  // plot graph
  updateData();
  updateLayout();

  Plotly.newPlot('graph0', data[0], layout[0], {displayModeBar: false, doubleClick: false,});

  update();
}

$(document).ready(function () {
  main();
})























// end
