// initialise coordinates
var coordX = [0, 1, 2, 3];
var coordY = [0, 0, 0, 0];

const graphConst = [1,10,25];

// show fractions
math.config({number: 'Fraction'});

const flex1 = math.eval('(1/6) * [[2,5,8,3],[5,16,28,12],[8,28,54,27],[3,12,27,18]]');

const flex2 = math.eval('(1/324) * [[44,46,0,-54],[46,80,0,-108],[0,0,0,0],[-54,-108,0,243]]');

const flex3 = math.eval('(1/81) * [[8,5.5,0,0],[5.5,8,0,0],[0,0,0,0],[0,0,0,0]]');

var input = [0,0,0,0];
var output = [0,0,0,0];
var modeNo = 1;

// initialise graph
let data, layout;
// plot data
function updateData () {

  data = [{// cantilever
      x: [coordX[0],0.1,coordX[1],coordX[2],coordX[3],], // lazy way to make it straight at wall
      y: [coordY[0],coordY[0],coordY[1],coordY[2],coordY[3],],
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 'black',
        shape: 'spline',
      },
      connectgaps: false,
  }, { // nodes
      x: [coordX[1],coordX[2]],
      y: [coordY[1],coordY[2]],
      type: 'scatter',
      mode: 'markers',
      marker: {
        color: 'red',
        size: 10,
      },
      line: {
        color: 'black'
    },
      connectgaps: false,
    }
  ];

  switch (modeNo) {
    case 1:
      data.push({ // nodes
        x: [coordX[3]],
        y: [coordY[3]],
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: 'red',
          size: 10,
        },
        line: {
          color: 'black'
      },
        connectgaps: false,
      },);
      break;
    case 2:
      data.push({
        x: [coordX[3]],
        y: [coordY[3]],
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: 'white',
          size: 5,
          line: {
            color: 'black',
            width: 2,
          },
        connectgaps: false,
        },
      },);
      break;
    case 3:
      data[0].x = [coordX[0],0.1,coordX[1],coordX[2],2.9,coordX[3],];
      data[0].y = [coordY[0],coordY[0],coordY[1],coordY[2],coordY[3],coordY[3],];
      break;
    default:
      break;
  };
}

// plot layout
function updateLayout () {

  layout = {
    autosize: false,
    width: 380,
    height: 310,
    margin: {
      l: 20,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    xaxis: {
      range: [-0.2,3.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-21,21],
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
    annotations: [{ // scale text
      x: 0.4,
      y: -17,
      xref: "x",
      yref: "y",
      text: "Scale 1:"+graphConst[modeNo-1].toString(),
      font: {size:15},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -30,
    }, { // a text
      x: 0.25,
      y: -21,
      xref: "x",
      yref: "y",
      text: "$a = 1$",
      font: {size:15},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -30,
    }, { // R1 arrow
      x: 1,
      y: 10 + coordY[1],
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: 0,
      ay: 50,
    }, { // R1 text
      x: 1,
      y: 13 + coordY[1],
      text: '$R_1, r_1$',
      textposition: "bottom",
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: 0,
    }, { // R2 arrow
      x: 2,
      y: 10 + coordY[2],
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: 0,
      ay: 50,
    }, { // R2 text
      x: 2,
      y: 13 + coordY[2],
      text: '$R_2, r_2$',
      textposition: "bottom",
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: 0,
    },],
    shapes: [{ // left wall
      type: "line",
      x0: 0,
      y0: -3,
      x1: 0,
      y1: 3,
      line: {
        color: "black",
        width: 5,
      }
    }],
  }

  // additional annotations
  switch (modeNo) {
    case 1:
      addAnno = [{ // R3 arrow
        x: 3,
        y: 10 + coordY[3],
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "black",
        arrowhead: 2,
        ax: 0,
        ay: 35,
      }, { // R3 text
        x: 3,
        y: 13 + coordY[3],
        text: '$R_3, r_3$',
        textposition: "bottom",
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: 0,
      }, { // R4 arrowbead
        x: 2.85,
        y: 1 + coordY[3],
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "black",
        arrowhead: 2,
        ax: 8,
        ay: -10,
      }, { // R4 text
        x: 3.4,
        y: 4 + coordY[3],
        text: '$R_4, r_4$',
        textposition: "bottom",
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: 0,
      },];
      layout.annotations = layout.annotations.concat(addAnno);

      addShapes = [{ //R4 arrow
        type: "path",
        path: `M3.1,${coordY[3]+2} Q 3,${coordY[3]+5} 2.9,${coordY[3]+2}`,
        line: {
          color: 'black',
          width: 2,
        },
      }]
      layout.shapes = layout.shapes.concat(addShapes);
      break;
    case 2:
      addAnno = [{ // R4 arrowbead
        x: 2.85,
        y: 1 + coordY[3],
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "black",
        arrowhead: 2,
        ax: 8,
        ay: -10,
      }, { // R4 text
        x: 3.4,
        y: 4 + coordY[3],
        text: '$R_4, r_4$',
        textposition: "bottom",
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: 0,
      },]
      layout.annotations = layout.annotations.concat(addAnno);

      addShapes = [{ // support
          type: "path",
          path: "M3,-.7 L2.92,-3 L3.08,-3 Z",
          line: {
            color: 'black',
            width: 1.5,
          },
      }, { //R4 arrow
        type: "path",
        path: `M3.1,${coordY[3]+2} Q 3,${coordY[3]+5} 2.9,${coordY[3]+2}`,
        line: {
          color: 'black',
          width: 2,
        },
      }];
      layout.shapes = layout.shapes.concat(addShapes);
      break;
    case 3:
      addShapes = [{ // right wall
        type: "line",
        x0: 3,
        y0: -3,
        x1: 3,
        y1: 3,
        line: {
          color: "black",
          width: 5,
        }
      }]
      layout.shapes = layout.shapes.concat(addShapes);
      break;
    default:
      break;
  }

  if (input[0]==0 && input[1]==0 && input[2]==0 && input[3]==0) {
    const initArrows = [{ // arrow 1-1
      x: 1,
      y: -4,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 3,
      ax: -85,
      ay: 0,
    }, { // arrow 1-2
      x: 0,
      y: -4,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 3,
      ax: 10,
      ay: 0,
    }, { // arrow 1 text
      x: 0.5,
      y: -6,
      text: '$a$',
      textposition: "bottom",
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: 0,
    }, { // arrow 2-1
      x: 2,
      y: -4,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 3,
      ax: -85,
      ay: 0,
    }, { // arrow 2-2
      x: 1,
      y: -4,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 3,
      ax: 10,
      ay: 0,
    }, { // arrow 2 text
      x: 1.5,
      y: -6,
      text: '$a$',
      textposition: "bottom",
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: 0,
    }, { // arrow 3-1
      x: 3,
      y: -4,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 3,
      ax: -85,
      ay: 0,
    }, { // arrow 3-2
      x: 2,
      y: -4,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 3,
      ax: 10,
      ay: 0,
    }, { // arrow 3 text
      x: 2.5,
      y: -6,
      text: '$a$',
      textposition: "bottom",
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: 0,
    }, ];
    layout.annotations = layout.annotations.concat(initArrows);
  };
}

function update () {
  compute();
  Plotly.react('graph1', data, layout)

  function checkNegative (input) {
    if (input < 0) {
      return '-';
    } else {
      return '';
    }
  }

  textData = findDisplacements(input);

  // update text
  $("#r1latex").html((textData._data[0].n==0) ? '$r_1 = 0$' : ((textData._data[0].d == 1) ? `$r_1 = ${checkNegative(textData._data[0].s)} \\frac{${textData._data[0].n}}{EI}$` : `$r_1 = ${checkNegative(textData._data[0].s)} \\frac{${textData._data[0].n}}{${textData._data[0].d}EI}$`));

  $("#r2latex").html((textData._data[1].n==0) ? '$r_2 = 0$' : ((textData._data[1].d == 1) ? `$r_2 = ${checkNegative(textData._data[1].s)} \\frac{${textData._data[1].n}}{EI}$` :  `$r_2 = ${checkNegative(textData._data[1].s)} \\frac{${textData._data[1].n}}{${textData._data[1].d}EI}$`));

  $("#r3latex").html((textData._data[2].n==0) ? '$r_3 = 0$' : ((textData._data[2].d == 1) ? `$r_3 = ${checkNegative(textData._data[2].s)} \\frac{${textData._data[2].n}}{EI}$` :  `$r_3 = ${checkNegative(textData._data[2].s)} \\frac{${textData._data[2].n}}{${textData._data[2].d}EI}$`));

  $("#r4latex").html((textData._data[3].n==0) ? '$r_4 = 0$' : ((textData._data[3].d == 1) ? `$r_4 = ${checkNegative(textData._data[3].s)}\\frac{${textData._data[3].n}}{EI}$` :  `$r_4 = ${checkNegative(textData._data[3].s)} \\frac{${textData._data[3].n}}{${textData._data[3].d}EI}$`));

  MathJax.Hub.Queue(["Typeset",MathJax.Hub,"latexbox"]);
  return;
}

function compute () {

  input = [
    $("#R1").val(),
    $("#R2").val(),
    $("#R3").val(),
    $("#R4").val(),
  ];
  output = math.eval('a*b',{a:findDisplacements(input),b:graphConst[modeNo-1]});
  coordY = math.number([0, output._data[0], output._data[1], output._data[2],]);

  updateData();
  updateLayout();
  return;
}

function findDisplacements (inputMatrix) {

  switch (modeNo) {
    case 1:
      outputMatrix = math.eval('a*b',{a: flex1, b:inputMatrix});
      break;
    case 2:
      outputMatrix = math.eval('a*b',{a: flex2, b:inputMatrix});
      break;
    case 3:
      outputMatrix = math.eval('a*b',{a: flex3, b:inputMatrix});
      break;
    default:
      outputMatrix = math.eval('a*b',{a: flex1, b:inputMatrix});
      break;
  }
  return outputMatrix;
}

function modeChange (hitButton) {
  $(":button").css('font-weight','400');
  hitButton.css('font-weight','700');

  modeNo = parseInt(hitButton.attr('id').substring(hitButton.attr('id').length - 1));

  switch (modeNo) {
    case 1:
      $("#R3container").show();
      $("#R4container").show();
      $("#r3latex").show();
      $("#r4latex").show();
      break;
    case 2:
      $("#R3container").hide();
      $("#R4container").show();
      $("#r3latex").hide();
      $("#r4latex").show();
      break;
    case 3:
      $("#R3container").hide();
      $("#R4container").hide();
      $("#r3latex").hide();
      $("#r4latex").hide();
      break;
    default:
      $("#R3container").show();
      $("#R4container").show();
      $("#r3latex").show();
      $("#r4latex").show();
      break;
  }
  update();
  return;
}

function main () {

  // typeset math
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  // connect sliders
  $("input").on("change", function() {update()})
  $(":button").on("click", function() {modeChange($(this))})

  // plot graph
  updateData();
  updateLayout();
  Plotly.newPlot('graph1', [], layout, {displayModeBar: false});
  Plotly.react('graph1', data, layout);

}

$(document).ready(function () {
  main();
})























// end
