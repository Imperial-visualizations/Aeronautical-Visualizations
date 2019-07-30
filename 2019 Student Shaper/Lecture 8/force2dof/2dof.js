
// initialise graph
let data, layout;
const lineCoord = 0;
const origin = [[2, lineCoord], [4, lineCoord]];
var massCoordx = [origin[0][0], origin[1][0]];
var massCoordy = [origin[0][1], origin[1][1]];
var m = 1, k = 1;
var forceG = 0.25;
var dt = math.PI/24;

const maxlen = 512;
const graphlen = maxlen;
var rDeque = [new Deque(maxlen), new Deque(maxlen)];
var gDeque = [new Deque(maxlen), new Deque(maxlen)];
var amp = 5;
var rAmp = 0.2;

var stepNo = 0;
var prevW = 0;
var omega = 0.1;
let gArray;

let graphContainer;
let startAnim;

let springlen, springx, springy
updateSpring();

data = [{
    x: springx,
    y: springy,
    type: 'scatter',
    mode: 'line + markers',
    line: {color: 'black'},
    marker: {color: 'transparent', size: 0, opacity: 0},
    connectgaps: false,
  }, {
    x: massCoordx,
    y: massCoordy,
    type: 'scatter',
    mode: 'markers',
    marker: {color: ['blue', 'red'], size: 50, symbol: 'square'},
    connectgaps: false,
  }];

layout = {
  autosize: true,
  width: 800,
  height: 200,
  plot_bgcolor:"#F4F4F4",
  paper_bgcolor:"#F4F4F4",
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 4,
  },
  xaxis: {
    range: [-0.5,6.5],
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: false,
    ticks: '',
    showticklabels: false,
    fixedrange: true,
  },
  yaxis: {
    range: [-1,1],
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
}

var annotations = [{
  x: 1,
  y: 0.4,
  xref: 'x',
  yref: 'y',
  text: "$k$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
}, {
  x: 2,
  y: 0.4,
  xref: 'x',
  yref: 'y',
  text: "$m$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
}, {
  x: 3,
  y: 0.4,
  xref: 'x',
  yref: 'y',
  text: "$k$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
}, {
  x: 4,
  y: 0.4,
  xref: 'x',
  yref: 'y',
  text: "$m$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
}, {
  x: 5,
  y: 0.4,
  xref: 'x',
  yref: 'y',
  text: "$k$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
}, {
  x: 2.6,
  y: -.5,
  xref: 'x',
  yref: 'y',
  showarrow: true,
  arrowcolor: 'black',
  arrowhead: 2,
  arrowsize: 1,
  ax: -10,
  ay: 0,
}, {
  x: 2.9,
  y: -0.5,
  xref: 'x',
  yref: 'y',
  text: "$r_1, R_1$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
}, {
  x: 4.6,
  y: -.5,
  xref: 'x',
  yref: 'y',
  showarrow: true,
  arrowcolor: 'black',
  arrowhead: 2,
  arrowsize: 1,
  ax: -10,
  ay: 0,
}, {
  x: 4.9,
  y: -0.5,
  xref: 'x',
  yref: 'y',
  text: "$r_2, R_2$",
  font: {color: "black", size: 20},
  showarrow: true,
  arrowcolor: 'transparent',
  arrowhead: 2,
  arrowsize: 0,
  ax: 0,
  ay: 0,
},]

var wallOnly = [{
  type: "line",
  x0: -0,
  y0: -0.2,
  x1: -0,
  y1: 0.2,
  line: {
    color: "black",
    width: 5,
  }
}, {
  type: "line",
  x0: 6,
  y0: -0.2,
  x1: 6,
  y1: 0.2,
  line: {
    color: "black",
    width: 5,
  }
}, ];

var shapes = [{ // wall
  type: "line",
  x0: 0,
  y0: -0.2,
  x1: 0,
  y1: 0.2,
  line: {
    color: "black",
    width: 5,
  }
}, {
  type: "line",
  x0: 6,
  y0: -0.2,
  x1: 6,
  y1: 0.2,
  line: {
    color: "black",
    width: 5,
  }
}, { // line 1
  type: "line",
  x0: 2,
  y0: -.3,
  x1: 2,
  y1: -.5,
  line: {
    color: "black",
    width: 2,
  }
}, {
  type: "line",
  x0: 2,
  y0: -.5,
  x1: 2.5,
  y1: -.5,
  line: {
    color: "black",
    width: 2,
  }
}, { // line 2
  type: "line",
  x0: 4,
  y0: -.3,
  x1: 4,
  y1: -.5,
  line: {
    color: "black",
    width: 2,
  }
}, {
  type: "line",
  x0: 4,
  y0: -.5,
  x1: 4.5,
  y1: -.5,
  line: {
    color: "black",
    width: 2,
  }
}];

var data1 = [{
    x: [0, 0.1],
    y: [0, 0],
    type: 'scatter',
    mode: 'line + markers',
    markers: {color: 'transparent', size: 0, opacity: 0},
    line: {color: 'black', width: 2},
    name: "R1",
    connectgaps: false,
  }, {
    x: [0, 0.1],
    y: [0, 0],
    type: 'scatter',
    mode: 'line + markers',
    markers: {color: 'transparent', size: 0, opacity: 0},
    line: {color: 'grey', width: 2},
    name: "R2",
    connectgaps: false,
  }, {
    x: [0, 0.1],
    y: [0, 0],
    type: 'scatter',
    mode: 'line + markers',
    markers: {color: 'transparent', size: 0, opacity: 0},
    line: {color: 'blue'},
    name: "r1",
    connectgaps: false,
  }, {
    x: [0, 0.1],
    y: [0, 0],
    type: 'scatter',
    mode: 'line + markers',
    markers: {color: 'transparent', size: 0, opacity: 0},
    line: {color: 'red'},
    name: "r2",
    connectgaps: false,
  }];

var layout1 = {
    autosize: false,
    width: 800,
    height: 250,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4,
    },
    xaxis: {
      range: [-.1,6],
      showgrid: true,
      zeroline: true,
      showline: false,
      autotick: true,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-0.8,0.8],
      showgrid: true,
      zeroline: true,
      showline: false,
      autotick: true,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    showlegend: true,
    hovermode: false,
  }

function updateSpring () {
  springlen = [massCoordx[0]-1, massCoordx[1]-massCoordx[0]-1, 6-massCoordx[1]-1,];
  springx = [
    0,
    0.5,
    0.5+springlen[0]*(1/16),
    0.5+springlen[0]*(2/16),
    0.5+springlen[0]*(3/16),
    0.5+springlen[0]*(4/16),
    0.5+springlen[0]*(5/16),
    0.5+springlen[0]*(6/16),
    0.5+springlen[0]*(7/16),
    0.5+springlen[0]*(8/16),
    0.5+springlen[0]*(9/16),
    0.5+springlen[0]*(10/16),
    0.5+springlen[0]*(11/16),
    0.5+springlen[0]*(12/16),
    0.5+springlen[0]*(13/16),
    0.5+springlen[0]*(14/16),
    0.5+springlen[0]*(15/16),
    massCoordx[0]-0.5,
    massCoordx[0],
    massCoordx[0]+0.5,
    massCoordx[0]+0.5+springlen[1]*(1/16),
    massCoordx[0]+0.5+springlen[1]*(2/16),
    massCoordx[0]+0.5+springlen[1]*(3/16),
    massCoordx[0]+0.5+springlen[1]*(4/16),
    massCoordx[0]+0.5+springlen[1]*(5/16),
    massCoordx[0]+0.5+springlen[1]*(6/16),
    massCoordx[0]+0.5+springlen[1]*(7/16),
    massCoordx[0]+0.5+springlen[1]*(8/16),
    massCoordx[0]+0.5+springlen[1]*(9/16),
    massCoordx[0]+0.5+springlen[1]*(10/16),
    massCoordx[0]+0.5+springlen[1]*(11/16),
    massCoordx[0]+0.5+springlen[1]*(12/16),
    massCoordx[0]+0.5+springlen[1]*(13/16),
    massCoordx[0]+0.5+springlen[1]*(14/16),
    massCoordx[0]+0.5+springlen[1]*(15/16),
    massCoordx[1]-0.5,
    massCoordx[1],
    massCoordx[1]+0.5,
    massCoordx[1]+0.5+springlen[2]*(1/16),
    massCoordx[1]+0.5+springlen[2]*(2/16),
    massCoordx[1]+0.5+springlen[2]*(3/16),
    massCoordx[1]+0.5+springlen[2]*(4/16),
    massCoordx[1]+0.5+springlen[2]*(5/16),
    massCoordx[1]+0.5+springlen[2]*(6/16),
    massCoordx[1]+0.5+springlen[2]*(7/16),
    massCoordx[1]+0.5+springlen[2]*(8/16),
    massCoordx[1]+0.5+springlen[2]*(9/16),
    massCoordx[1]+0.5+springlen[2]*(10/16),
    massCoordx[1]+0.5+springlen[2]*(11/16),
    massCoordx[1]+0.5+springlen[2]*(12/16),
    massCoordx[1]+0.5+springlen[2]*(13/16),
    massCoordx[1]+0.5+springlen[2]*(14/16),
    massCoordx[1]+0.5+springlen[2]*(15/16),
    5.5,
    6,
  ];
  springy = [
    origin[0][1],
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    massCoordy[0],
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    massCoordy[1],
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    origin[0][1]-0.1,
    origin[0][1],
    origin[0][1]+0.1,
    origin[0][1],
    massCoordy[1],
  ];
}

function updatePosition () {
  // subplot
  plotData0 = math.add(rDeque[0].toArraySlice(graphlen),-origin[0][0]);
  plotData1 = math.add(rDeque[1].toArraySlice(graphlen),-origin[1][0]);
  xrange = math.range(0, 6, 6/(graphlen))._data.slice(0, plotData1.length);

  gData0 = gDeque[0].toArraySlice(graphlen);
  gData1 = gDeque[1].toArraySlice(graphlen);
  xrange1 = math.range(0, 6, 6/(graphlen))._data.slice(0, gData1.length);

  if (plotData0.length > 0 && plotData0.length > 0) {
    var bound = math.max(math.max(math.abs(gData0)), math.max(math.abs(plotData1)))+0.05;
  } else {
    var bound = 0.8;
  }

  Plotly.relayout("plot", { 'yaxis.range': [-bound, bound]});
  Plotly.restyle("plot", {
    x: [xrange1, xrange1, xrange, xrange],
    y: [gData0, gData1, plotData0, plotData1],
  });

  // main plot
  updateSpring();
  Plotly.restyle(graphContainer, {x: [springx, massCoordx], y: [springy, massCoordy]}, [0, 1]);

  return;
}

function updateMat () {
  var matK = [[2*k, -k], [-k, 2*k]];
  var matM = [[m, 0], [0, m]];
  var matG = [[forceG], [0]];

  var matA = math.inv(math.subtract(matK,(math.multiply((omega**2),matM))));
  gArray = math.multiply(matA,matG);
  return;
}

function compute () {
  if (prevW == 0 || omega != prevW) {
    updateMat();
    prevW = omega;
  }
  var r = math.multiply(gArray, math.sin(omega*stepNo*dt));
  massCoordx = math.add(math.reshape(math.multiply(rAmp,r), [2]), [origin[0][0], origin[1][0]]);
  pushDeques();
  return;
}

function pushDeques () {
  gDeque[0].push(forceG*math.sin(omega*stepNo*dt));
  gDeque[1].push(0);
  rDeque[0].push(massCoordx[0]);
  rDeque[1].push(massCoordx[1]);
  return;
}

function startAnimation () {
  clearInterval(startAnim);
  startAnim = setInterval(function () {
    stepNo++;
    compute();
    updatePosition();
    return;
  }, 15);
  return;
}

function buttonPress (hitButton) {
  if (hitButton.attr('value') == "Start") {
    hitButton.prop('value', 'Reset');
    Plotly.relayout(graphContainer, {annotations: [], shapes: wallOnly});
    startAnimation();
  } else {
    hitButton.prop('value', 'Start');
    clearInterval(startAnim);
    stepNo = 0;
    rDeque = [new Deque(maxlen), new Deque(maxlen)];
    gDeque = [new Deque(maxlen), new Deque(maxlen)];
    massCoordx = [origin[0][0], origin[1][0]];
    updatePosition();
    Plotly.relayout(graphContainer, {annotations: annotations, shapes: shapes});
  }
  return;
}

// when page ready
$(document).ready(function () {

  // typeset math
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  graphContainer = document.getElementById("graph0");

  Plotly.newPlot(graphContainer, data, layout, {displayModeBar: false});
  Plotly.newPlot("plot", data1, layout1, {displayModeBar: false});
  Plotly.relayout(graphContainer, {annotations: annotations, shapes: shapes});

  $("input").on("change", function () {
    omega = parseFloat($("#omega").val());
    stepNo = 0;
    massCoordx = [origin[0][0], origin[1][0]];
    if ($("#resetb").val()=="Reset") {
      startAnimation();
    }
    return;
  })

  $(":button").on("click", function() {buttonPress($(this))})

})























// end
