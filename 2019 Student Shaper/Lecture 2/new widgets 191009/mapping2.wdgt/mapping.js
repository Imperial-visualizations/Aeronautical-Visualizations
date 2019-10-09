// initialise mathJax
math.config({
  number: 'Fraction'
})

// initialise circle plot points
const iN = 50;
const radius = 1;
var indices = Array(iN).keys();
const iMin = math.pi / 4;
const iMax = 7 * (math.pi / 4);
var wt = Array.from(indices).map(x => math.round(((iMax-iMin)*(x/iN)+iMin),5));
var wtx1 = wt.map(x => radius*math.cos(x));
var wtx2 = wt.map(x => radius*math.cos(x) + 10);
var wty = wt.map(x => radius*math.sin(x));

var highlightConst = -1;


// graphing
const horRange = math.range(0, 5, 0.05, true);
const horLen = math.size(horRange);
const verRange = math.range(0, 5/math.sqrt(3), 0.05/math.sqrt(3), true);
const verLen = math.size(verRange);

const graphx = horRange.toArray().concat(horRange.toArray().reverse()).concat(math.zeros(verLen).toArray());

const graphy = math.zeros(horLen).toArray().concat(verRange.toArray()).concat(verRange.toArray().reverse());

// initialise graph
const data = [{ // event listener
      x: [2.5, 0.0, 2.5],
      y: [0.0, 2.5/math.sqrt(3), 2.5/math.sqrt(3),],
      type: 'scatter',
      mode: 'markers',
      hoverinfo: 'none',
      marker: {
        color: 'transparent',
        size: 25,
      },
      connectgaps: false,
  }, { // horizontal
      x: graphx,
      y: graphy,
      type: 'scatter',
      mode: 'markers+lines',
      hoverinfo: 'none',
      marker: {
        color: 'transparent',
        size: 1,
      },
      line: {
        color: 'black',
        width: 3,
    },
      connectgaps: false,
  }, { // markers
        x: [0, 5, 0],
        y: [0, 0, 5/math.sqrt(3)],
        type: 'scatter',
        mode: 'markers',
        hoverinfo: 'none',
        marker: {
          color: 'black',
          size: 15,
        },
        connectgaps: false,
    }
];

var newData;

const layout = {
    autosize: false,
    width: 300,
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
      range: [-1,6],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-.5,4.5],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: true,
    annotations: [{ // r1
        x: 1.0,
        y: 0.2,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
    }, { // r2
        x: 0.3,
        y: 1.0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
    }, { // r3
        x: 6.0,
        y: 0.0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
    }, { // r4
        x: 5.0,
        y: 1.0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
    }, { // r5
        x: 1.0,
        y: 5.0/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
    }, { // r6
        x: 0.0,
        y: 1.0+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
    }, { // r1
        x: 1.3,
        y: 0.3,
        xref: 'x',
        yref: 'y',
        text: "$r_1$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
    }, { // r2
        x: 0.3,
        y: 1.3,
        xref: 'x',
        yref: 'y',
        text: "$r_2$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
    }, { // r3
        x: 6,
        y: 0.3,
        xref: 'x',
        yref: 'y',
        text: "$r_3$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
    }, { // r4
        x: 5,
        y: 1.3,
        xref: 'x',
        yref: 'y',
        text: "$r_4$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
    }, { // r5
        x: 1.3,
        y: 5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$r_5$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
    }, { // r6
        x: 0,
        y: 1.3+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$r_6$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
    }, ],
};

var data2 = [{
      x: [0, 5],
      y: [2.5/math.sqrt(3), 2.5/math.sqrt(3)],
      type: 'scatter',
      mode: 'markers+lines',
      hoverinfo: 'none',
      marker: {
        color: 'black',
        size: 15,
      },
      line: {
        color: 'red',
        width: 5,
    },
      connectgaps: false,
},];

var layout2 = {
    autosize: false,
    width: 400,
    height: 160,
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
      range: [-1.5,8.5],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-1,4],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: false,
};

function change(pointNo) {



  newData = Array.from(data); // create shallow copy
  switch (pointNo) {
    case 0:

      $(":button").css('font-weight','400');
      $("#buttonbar1").css('font-weight','700');



      newData.splice(2, 0, { // horizontal
            x: [0, 5],
            y: [0, 0],
            type: 'scatter',
            mode: 'lines',
            hoverinfo: 'none',
            line: {
              color: 'red',
              width: 5,
          },
            connectgaps: false,
      },);
      Plotly.react(plot1, newData, layout);
      var annotations = [{ // r1
        x: 1.0,
        y: 0.4+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r2
        x: 0,
        y: 1.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
      }, { // r3
        x: 6.0,
        y: 0.4+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r4
        x: 5,
        y: 1.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
      }, { // r1
        x: 1.4,
        y: 0.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_1$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r2
        x: 0,
        y: 2+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_2$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r3
        x: 6.4,
        y: 0.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_3$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r4
        x: 5,
        y: 2+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_4$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, ];
      Plotly.relayout(plot2, {
        annotations: annotations,
      });
      Plotly.restyle(plot2, {
        x: [[0, 5]],
        y: [[2.5/math.sqrt(3), 2.5/math.sqrt(3)]],
      });

      $("#smallMatrix1").show();
      $("#smallMatrix2").hide();
      $("#smallMatrix3").hide();
      $("#mapping1").show();
      $("#mapping2").hide();
      $("#mapping3").hide();
      $("#bigMatrix1").show();
      $("#bigMatrix2").hide();
      $("#bigMatrix3").hide();
      break;
    case 1:
    $(":button").css('font-weight','400');
    $("#buttonbar3").css('font-weight','700');
      newData.splice(2, 0, { // vertical
            x: [0, 0],
            y: [0, 5/math.sqrt(3)],
            type: 'scatter',
            mode: 'lines',
            hoverinfo: 'none',
            line: {
              color: 'red',
              width: 5,
          },
            connectgaps: false,
      },);
      Plotly.react(plot1, newData, layout);
      var annotations = [{ // r1
        x: 3.8,
        y: 0,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r2
        x: 2.8,
        y: 1.5,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
      }, { // r3
        x: 3.8,
        y: 5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r4
        x: 2.8,
        y: 1.1+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 35,
      }, { // r1
        x: 4.2,
        y: 0,
        xref: 'x',
        yref: 'y',
        text: "$\\rho_1$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r2
        x: 3.3,
        y: 1.5,
        xref: 'x',
        yref: 'y',
        text: "$\\rho_2$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r3
        x: 4.2,
        y: 0+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_3$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r4
        x: 3.3,
        y: 1+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_4$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, ];
      Plotly.relayout(plot2, {
        annotations: annotations,
      });
      Plotly.restyle(plot2, {
        x: [[2.5, 2.5]],
        y: [[0, 5/math.sqrt(3)]],
      });

      $("#smallMatrix1").hide();
      $("#smallMatrix2").show();
      $("#smallMatrix3").hide();
      $("#mapping1").hide();
      $("#mapping2").show();
      $("#mapping3").hide();
      $("#bigMatrix1").hide();
      $("#bigMatrix2").show();
      $("#bigMatrix3").hide();
      break;
    case 2:
      $(":button").css('font-weight','400');
      $("#buttonbar2").css('font-weight','700');
      newData.splice(2, 0, { // horizontal
            x: [0, 5],
            y: [5/math.sqrt(3), 0],
            type: 'scatter',
            mode: 'lines',
            hoverinfo: 'none',
            line: {
              color: 'red',
              width: 5,
          },
            connectgaps: false,
      },);
      Plotly.react(plot1, newData, layout);
      var annotations = [{ // r3
        x: 1.0,
        y: 0.4+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r4
        x: 0,
        y: 1.1+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 30,
      }, { // r1
        x: 6.0,
        y: 0.4,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r2
        x: 5,
        y: 1.5,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
      }, { // r3
        x: 1.4,
        y: 0.5+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_3$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r4
        x: -0.5,
        y: 1.1+5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_4$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r1
        x: 6.4,
        y: 0.5,
        xref: 'x',
        yref: 'y',
        text: "$\\rho_1$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r2
        x: 5,
        y: 2,
        xref: 'x',
        yref: 'y',
        text: "$\\rho_2$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, ];
      Plotly.relayout(plot2, {
        annotations: annotations,
      });
      Plotly.restyle(plot2, {
        x: [[0, 5]],
        y: [[5/math.sqrt(3), 0]],
      });

      $("#smallMatrix1").hide();
      $("#smallMatrix2").hide();
      $("#smallMatrix3").show();
      $("#mapping1").hide();
      $("#mapping2").hide();
      $("#mapping3").show();
      $("#bigMatrix1").hide();
      $("#bigMatrix2").hide();
      $("#bigMatrix3").show();
      break;
    default:
      newData.splice(2, 0, { // horizontal
            x: [0, 5],
            y: [0, 0],
            type: 'scatter',
            mode: 'lines',
            hoverinfo: 'none',
            line: {
              color: 'red',
              width: 5,
          },
            connectgaps: false,
      },);
      Plotly.react(plot1, newData, layout);
      var annotations = [{ // r1
        x: 1.0,
        y: 0.4+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r2
        x: 0,
        y: 1.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
      }, { // r3
        x: 6.0,
        y: 0.4+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: -30,
        ay: 0,
      }, { // r4
        x: 5,
        y: 1.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: 'black',
        arrowhead: 2,
        arrowsize: 1,
        ax: 0,
        ay: 40,
      }, { // r1
        x: 1.4,
        y: 0.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_1$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r2
        x: 0,
        y: 2+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_2$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r3
        x: 6.4,
        y: 0.5+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_3$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, { // r4
        x: 5,
        y: 2+2.5/math.sqrt(3),
        xref: 'x',
        yref: 'y',
        text: "$\\rho_4$",
        font: {color: "black", size: 20},
        showarrow: true,
        arrowcolor: 'transparent',
        arrowhead: 2,
        arrowsize: 0,
        ax: 0,
        ay: 0,
      }, ];
      Plotly.relayout(plot2, {
        annotations: annotations,
      });
      Plotly.restyle(plot2, {
        x: [[0, 5]],
        y: [[2.5/math.sqrt(3), 2.5/math.sqrt(3)]],
      });

      $("#smallMatrix1").show();
      $("#smallMatrix2").hide();
      $("#smallMatrix3").hide();
      $("#mapping1").show();
      $("#mapping2").hide();
      $("#mapping3").hide();
      $("#bigMatrix1").show();
      $("#bigMatrix2").hide();
      $("#bigMatrix3").hide();
      break;
  };
  return;
}

var plot1 = document.getElementById('graph1');
var plot2 = document.getElementById('graph2');

$(document).ready(function () {
  // initial
  $("#smallMatrix").show();
  $("#smallMatrix1").show();
  $("#smallMatrix2").hide();
  $("#smallMatrix3").hide();
  $("#mapping1").show();
  $("#mapping2").hide();
  $("#mapping3").hide();
  $("#bigMatrix1").show();
  $("#bigMatrix2").hide();
  $("#bigMatrix3").hide();

  $(":button").css('font-weight','400');
  $("#buttonbar1").css('font-weight','700');

  Plotly.newPlot(plot1, data, layout, {displayModeBar: false, doubleClick: false});
  layout2.annotations = [{ // r1
    x: 1.0,
    y: 0.4+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    showarrow: true,
    arrowcolor: 'black',
    arrowhead: 2,
    arrowsize: 1,
    ax: -30,
    ay: 0,
  }, { // r2
    x: 0,
    y: 1.5+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    showarrow: true,
    arrowcolor: 'black',
    arrowhead: 2,
    arrowsize: 1,
    ax: 0,
    ay: 40,
  }, { // r3
    x: 6.0,
    y: 0.4+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    showarrow: true,
    arrowcolor: 'black',
    arrowhead: 2,
    arrowsize: 1,
    ax: -30,
    ay: 0,
  }, { // r4
    x: 5,
    y: 1.5+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    showarrow: true,
    arrowcolor: 'black',
    arrowhead: 2,
    arrowsize: 1,
    ax: 0,
    ay: 40,
  }, { // r1
    x: 1.4,
    y: 0.5+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    text: "$\\rho_1$",
    font: {color: "black", size: 20},
    showarrow: true,
    arrowcolor: 'transparent',
    arrowhead: 2,
    arrowsize: 0,
    ax: 0,
    ay: 0,
  }, { // r2
    x: 0,
    y: 2+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    text: "$\\rho_2$",
    font: {color: "black", size: 20},
    showarrow: true,
    arrowcolor: 'transparent',
    arrowhead: 2,
    arrowsize: 0,
    ax: 0,
    ay: 0,
  }, { // r3
    x: 6.4,
    y: 0.5+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    text: "$\\rho_3$",
    font: {color: "black", size: 20},
    showarrow: true,
    arrowcolor: 'transparent',
    arrowhead: 2,
    arrowsize: 0,
    ax: 0,
    ay: 0,
  }, { // r4
    x: 5,
    y: 2+2.5/math.sqrt(3),
    xref: 'x',
    yref: 'y',
    text: "$\\rho_4$",
    font: {color: "black", size: 20},
    showarrow: true,
    arrowcolor: 'transparent',
    arrowhead: 2,
    arrowsize: 0,
    ax: 0,
    ay: 0,
  }, ];;
  Plotly.newPlot(plot2, data2, layout2, {displayModeBar: false, doubleClick: false,});

  newData = Array.from(data);
  newData.splice(2, 0, { // horizontal
        x: [0, 5],
        y: [0, 0],
        type: 'scatter',
        mode: 'lines',
        hoverinfo: 'none',
        line: {
          color: 'red',
          width: 5,
      },
        connectgaps: false,
  },);
  Plotly.react(plot1, newData, layout);

  var pointNo = -1;

  plot1.on('plotly_click', function(dataOutput) {

    for (var i = 0; i<dataOutput.points.length; i++) {
      if (dataOutput.points[i].curveNumber==0) {
        var tempNo = dataOutput.points[i].pointNumber;
        if (tempNo==0||tempNo==2) {
          var xaxis = plot1._fullLayout.xaxis;
          var yaxis = plot1._fullLayout.yaxis;
          var mousex = xaxis.p2l(dataOutput.event.x - xaxis._offset);
          var mousey = yaxis.p2l(dataOutput.event.y - yaxis._offset);
          if (mousey*math.sqrt(3)+mousex>=3.5) {
            pointNo = 2;
          } else {
            pointNo = 0;
          }
        } else {
          pointNo = tempNo;
        }
        break;
      }
    }

    change(pointNo);

    return;
  });


  $(":button").on("click", function () {
    switch ($(this).attr('id')) {
      case "buttonbar1":
        change(0);
        $(":button").css('font-weight','400');
        $("#buttonbar1").css('font-weight','700');
        break;
      case "buttonbar2":
        change(2);
        $(":button").css('font-weight','400');
        $("#buttonbar2").css('font-weight','700');
        break;
      case "buttonbar3":
        change(1);
        $(":button").css('font-weight','400');
        $("#buttonbar3").css('font-weight','700');
        break;
      default:
        change(0);
        break;
    };
    return;
  });

});



























// end
