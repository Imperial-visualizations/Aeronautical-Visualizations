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
var wtx2 = wt.map(x => radius*math.cos(x) + 8);
var wty = wt.map(x => radius*math.sin(x));

var highlightConst = -1;

// initialise graph
var data = [{ // horizontal 1
      x: [0,5],
      y: [0,0],
      type: 'scatter',
      mode: 'markers+lines',
      hoverinfo: 'none',
      marker: {
        color: 'transparent',
        size: 1,
      },
      line: {
        color: 'black'
    },
      connectgaps: false,
  }, { // vertical 1
        x: [0,0],
        y: [0,5],
        type: 'scatter',
        mode: 'markers+lines',
        hoverinfo: 'none',
        marker: {
          color: 'transparent',
          size: 1,
        },
        line: {
          color: 'black'
      },
        connectgaps: false,
    }, { // curved 1
          x: wtx1,
          y: wty,
          type: 'scatter',
          mode: 'markers+lines',
          hoverinfo: 'none',
          marker: {
            color: 'transparent',
            size: 1,
          },
          line: {
            color: 'black'
        },
          connectgaps: false,
      }, { // horizontal 2
        x: [8,13],
        y: [0,0],
        type: 'scatter',
        mode: 'markers+lines',
        hoverinfo: 'none',
        marker: {
          color: 'transparent',
          size: 1,
        },
        line: {
          color: 'black'
      },
        connectgaps: false,
    }, { // vertical 2
          x: [8,8],
          y: [0,5],
          type: 'scatter',
          mode: 'markers+lines',
          hoverinfo: 'none',
          marker: {
            color: 'transparent',
            size: 1,
          },
          line: {
            color: 'black'
        },
          connectgaps: false,
    }, { // curved 2
          x: wtx2,
          y: wty,
          type: 'scatter',
          mode: 'markers+lines',
          hoverinfo: 'none',
          marker: {
            color: 'transparent',
            size: 1,
          },
          line: {
            color: 'black'
        },
          connectgaps: false,
      }, { // origins
        x: [0, 8],
        y: [0, 0],
        type: 'scatter',
        mode: 'markers',
        hoverinfo: 'none',
        marker: {
          color: 'black',
          size: 10,
        },
        connectgaps: false,
    },{ // hovers
      x: [5.6, 0, 1.1, 13.6, 8, 9.2],
      y: [0, 5.6, -.9, 0, 5.6, -.9,],
      type: 'scatter',
      mode: 'markers',
      hoverinfo: 'none',
      marker: {
        color: 'transparent',
        size: 50,
        line: {
          color: 'transparent',
          width: 1,
        }
      },
      connectgaps: false,

    }
    ];

var layout = {
    autosize: false,
    width: 487,
    height: 262,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 10,
      r: 10,
      b: 10,
      t: 30,
      pad: 4
    },
    xaxis: {
      range: [-1.5,14],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-2,6],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: true,
    annotations: [{ // arrowheads
      x: 5.1, // horizontal 1
      y: 0,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: -10,
      ay: 0,
    }, {
      x: 0, // vertical 1
      y: 5.1,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: 0,
      ay: 18,
    }, {
      x: 0.7, // curved 1
      y: -0.66,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: -10,
      ay: 8,
    }, {
      x: 13.1, // horizontal 2
      y: 0,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: -10,
      ay: 0,
    }, {
      x: 8, // vertical 2
      y: 5.1,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: 0,
      ay: 18,
    }, {
      x: 8.7, // curved 2
      y: -0.66,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      ax: -10,
      ay: 8,
    }, { // text horizontal 1
      x: 5,
      y: 0,
      xref: "x",
      yref: "y",
      text: "$r_1$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 20,
      ay: 0,
    }, { // text vertical 1
      x: 0,
      y: 5,
      xref: "x",
      yref: "y",
      text: "$r_2$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -20,
    }, { // text curved 1
      x: 1.1,
      y: -1.5,
      xref: "x",
      yref: "y",
      text: "$r_3$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -20,
    }, { // text horizontal 2
      x: 13,
      y: 0,
      xref: "x",
      yref: "y",
      text: "$R_1$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 20,
      ay: 0,
    }, { // text vertical 2
      x: 8,
      y: 5,
      xref: "x",
      yref: "y",
      text: "$R_2$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -20,
    }, { // text curved 2
      x: 9.1,
      y: -1.5,
      xref: "x",
      yref: "y",
      text: "$R_3$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -20,
    }, { // i 1
      x: 0.4,
      y: 0,
      xref: "x",
      yref: "y",
      text: "$i$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -15,
    }, { // i 2
      x: 8.4,
      y: 0,
      xref: "x",
      yref: "y",
      text: "$i$",
      font: {size:30},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -15,
    }, { // text 1
      x: 2.7,
      y: -2,
      xref: "x",
      yref: "y",
      text: "Displacements at point <i>i</i>",
      font: {size:15},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -15,
    }, { // text 2
      x: 10.7,
      y: -2,
      xref: "x",
      yref: "y",
      text: "Forces at point <i>i</i>",
      font: {size:15},
      showarrow: true,
      arrowcolor: "transparent",
      arrowhead: 0,
      ax: 0,
      ay: -15,
    }
  ],
};
/*
// plot graph
function main() {
  var myPlot = document.getElementById('graph1');
  Plotly.newPlot('graph1', data, layout);
  myPlot.on('plotly_click', function(data) {
    console.log(3);
    Plotly.react('graph1', data, layout);
    return;
  });
}
// on ready
$(document).ready(main()); */

Plotly.newPlot('graph1', data, layout, {displayModeBar: false, doubleClick: false,});
document.getElementById('graph1').on('plotly_click', function(dataInput){
  var py = '', index = '';
  for (i=0;i<dataInput.points.length;i++) {
    if (dataInput.points[i].curveNumber == 7) {
      py = dataInput.points[i].y;
      break;
    }
  }

  switch (py) {
    case 5.6:
      index = 1;
      break;
    case 0:
      index = 0;
      break;
    case -0.9:
      index = 2;
      break;
    default:
      return;
  }

  // reset everything
  if (highlightConst != -1) {
  layout.annotations[highlightConst].arrowcolor = 'black';
  layout.annotations[highlightConst].arrowsize = '1';
  data[highlightConst].line.width = 2;
  data[highlightConst].line.color = 'black';
  layout.annotations[highlightConst+6].font = {size:30, color:'black'};

  layout.annotations[highlightConst+3].arrowcolor = 'black';
  layout.annotations[highlightConst+3].arrowsize = '1';
  data[highlightConst+3].line.width = 2;
  data[highlightConst+3].line.color = 'black';
  layout.annotations[highlightConst+9].font = {size:30, color:'black'};
  }

  // new highlightConst
  highlightConst = index;

  // colour new arrows
  layout.annotations[highlightConst].arrowcolor = 'red';
  layout.annotations[highlightConst].arrowsize = '1.5';
  data[highlightConst].line.width = 3;
  data[highlightConst].line.color = 'red';
  layout.annotations[highlightConst+6].font = {size: 40, color:'red'};

  layout.annotations[highlightConst+3].arrowcolor = 'red';
  layout.annotations[highlightConst+3].arrowsize = '1.5';
  data[highlightConst+3].line.width = 3;
  data[highlightConst+3].line.color = 'red';
  layout.annotations[highlightConst+9].font = {size: 40, color:'red'};
  // plot
  Plotly.react('graph1', data, layout);

  const contents = [['force $R_1$', 'displacement $r_1$'], ['force $R_2$', 'displacement $r_2$'], ['moment $R_3$', 'rotation $r_3$']];

  $('#explanation').html(
    `When we apply a ${contents[highlightConst][0]}, the corresponding ${contents[highlightConst][1]} will be in the same direction.`
  );
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,"explanation"]);

});























// end
