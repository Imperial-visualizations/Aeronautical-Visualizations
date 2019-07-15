
// initialise graph
let data, layout;
const lineCoord = 0;
const origin = [[2, lineCoord], [4, lineCoord]];
var massCoordx = [origin[0][0], origin[1][0]];
var massCoordy = [origin[0][1], origin[1][1]];
var m1 = 1, c1 = 0, k1 = 1;
var m2 = 1, c2 = 0, k2 = 1;
var dt = 0.1;
var eps = 0.005;

const maxlen = 600;
const graphlen = 512;
var rDeque = [new Deque(maxlen), new Deque(maxlen)];

let matA, matB;
let graphContainer, pointsContainer, points;
let startAnim, d3, drag;

let springlen, springx, springy
updateSpring();

data = [{
    x: springx,
    y: springy,
    type: 'scatter',
    mode: 'line + markers',
    line: {color: 'black'},
    marker: {color: 'transparent', size: 0},
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
  width: 700,
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
    range: [-1,6],
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
  text: "$k_1, c_1$",
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
  text: "$m_1$",
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
  text: "$k_2, c_2$",
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
  text: "$m_2$",
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
  x: 2.7,
  y: -0.5,
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
  x: 4.7,
  y: -0.5,
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
}];

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
    x: [0],
    y: [0],
    type: 'scatter',
    mode: 'line',
    line: {color: 'blue'},
    name: "r1",
    connectgaps: false,
  }, {
    x: [0],
    y: [0],
    type: 'scatter',
    mode: 'line',
    line: {color: 'red'},
    name: "r2",
    connectgaps: false,
  }];

var layout1 = {
    autosize: false,
    width: 700,
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

function clamp (x, xmin, xmax) {
  return math.max(xmin, math.min(x, xmax))
}

function updateSpring () {
  springlen = [massCoordx[0]-1, massCoordx[1]-massCoordx[0]-1];
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
  ];
}

function updatePosition () {
  // subplot
  plotData0 = math.add(rDeque[0].toArraySlice(graphlen),-origin[0][0]);
  plotData1 = math.add(rDeque[1].toArraySlice(graphlen),-origin[1][0]);
  xrange = math.range(0, 6, 6/(graphlen))._data.slice(0, plotData1.length);

  if (plotData0.length > 0 && plotData0.length > 0) {
    var bound = math.max(math.max(math.abs(plotData0)), math.max(math.abs(plotData1)))+0.05;
  } else {
    var bound = 0.8;
  }

  Plotly.relayout("plot", { 'yaxis.range': [-bound, bound]});
  Plotly.restyle("plot", {
    x: [xrange, xrange],
    y: [plotData0, plotData1],
  });

  // main plot
  updateSpring();
  Plotly.restyle(graphContainer, {x: [springx, massCoordx], y: [springy, massCoordy]}, [0, 1]);
  return;
}

function startDragBehavior () {
  d3 = Plotly.d3;
  drag = d3.behavior.drag();
  drag.origin(function () {
    var transform = d3.select(this).attr("transform");
    var translate = transform.substring(10, transform.length-1).split(/,| /);
    return {x: translate[0], y: translate[1]};
  });
  drag.on("dragstart", function () {
    clearInterval(startAnim);

    return;
  });
  drag.on("drag", function () {
    Plotly.relayout(graphContainer, {annotations: [], shapes: wallOnly});
    var xmouse = d3.event.x, ymouse = d3.event.y;
    d3.select(this).attr("transform", "translate("+[xmouse,ymouse]+")");
    var xaxis = graphContainer._fullLayout.xaxis;
    var handle = this.handle;
    // var yaxis = graphContainer._fullLayout.yaxis;
    const constraints = [[1.25, 2.75], [3.25, 4.75]];
    if ((rDeque[0]._length >= 2) && (rDeque[1]._length >= 2)) {
      compute();
      updatePosition();
    }
    massCoordx[handle] = clamp(xaxis.p2l(xmouse), constraints[handle][0], constraints[handle][1]);
    pushDeques();
    updatePosition();
    return;
  });
  drag.on("dragend", function() {
    d3.select(".scatterlayer .trace:last-of-type .points path:last-of-type").call(drag);
    pushDeques();

    if ((rDeque[0]._length < 2) && (rDeque[1]._length < 2)) {
      pushDeques();
    }
    startAnim = setInterval(function () {
      drag.on("dragstart", function () {
        clearInterval(startAnim);
        return;
      });
      compute();
      updatePosition();
      if ((math.abs(rDeque[0].get(-1) - origin[0][0]) <= eps) && (((math.abs(rDeque[0].get(-1) - rDeque[0].get(-2)))/dt) <= eps) && (math.abs(rDeque[1].get(-1) - origin[1][0]) <= eps) && (((math.abs(rDeque[1].get(-1) - rDeque[1].get(-2)))/dt) <= eps)) {
        console.log('end')
        clearInterval(startAnim);
      }

    }, 15);
    return;
  });
  d3.selectAll(".scatterlayer .trace:last-of-type .points path").call(drag);
}

function compute () {
  var prevR = [
    massCoordx[0] - origin[0][0],
    rDeque[0].get(-2) - origin[0][0],
    massCoordx[1] - origin[1][0],
    rDeque[1].get(-2) - origin[1][0],
  ];

  var temp = math.multiply(matB, prevR);
  var newR = math.usolve(matA, temp);
  newR = math.reshape(newR, [1, 2]);

  massCoordx = math.add(newR[0], [origin[0][0], origin[1][0]]);

  pushDeques();
  return;
}

function pushDeques () {
  rDeque[0].push(massCoordx[0]);
  rDeque[1].push(massCoordx[1]);
  return;
}

function updateMats () {

  if (c2>c1) {
    matA = [[((m1/(dt*dt))+(c1+c2)/(2*dt)), -(c2/(2*dt))], [-(c1/(2*dt)), ((m2/(dt*dt))+(c2)/(2*dt))]];

    matB = [[2*m1/(dt*dt) - (k1+k2),
      -m1/(dt*dt) + (c1+c2)/(2*dt),
      k2, (-c2/(2*dt))], [
      k2, (-c1/(2*dt)),
      2*m2/(dt*dt) - k2,
      -m2/(dt*dt) + c2/(2*dt)]];
  } else {
    matA = [[1, 0], [0, 1]];

    matB = [[
      2 - (c1+c2)*dt/m1 - (k1+k2)*dt*dt/m1,
      -1 + (c1+c2)*dt/m1,
      c2*dt/m1 + k2*dt*dt/m1,
      -c2*dt/m1,
    ], [
      c2*dt/m2 + k2*dt*dt/m2,
      -c2*dt/m2,
      2 - c1*dt/m2 - k2*dt*dt/m2,
      -1 + c1*dt/m2,
    ]]
  }
  return;
}

function buttonPress (hitButton) {
  switch (hitButton.attr('id')) {
    case "page1b":
      $(":button").css('font-weight','400');
      hitButton.css('font-weight','700');
      $("#plotbox").hide();
      $("#sliders").show();
      break;
    case "page2b":
      $(":button").css('font-weight','400');
      hitButton.css('font-weight','700');
      $("#sliders").hide();
      $("#plotbox").show();
      break;
    case "resetb":
      clearInterval(startAnim);
      rDeque = [new Deque(maxlen), new Deque(maxlen)];
      massCoordx = [origin[0][0], origin[1][0]];
      updatePosition();
      Plotly.relayout(graphContainer, {annotations: annotations, shapes: shapes});
      break;
    default:
      //
      break;
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

  pointsContainer = graphContainer.querySelector(".scatterlayer .trace:last-of-type .points");
  points = pointsContainer.getElementsByTagName("path");

  $("#page1b").css('font-weight','700');
  $("#plotbox").hide();
  $("#sliders").show();

  for (var i = 0; i < points.length; i++) {
    points[i].handle = i;
  }

  updateMats();
  startDragBehavior();

  $("input").on("change", function () {
     m1 = parseFloat($("#m1").val());
     c1 = parseFloat($("#c1").val());
     k1 = parseFloat($("#k1").val());
     m2 = parseFloat($("#m2").val());
     c2 = parseFloat($("#c2").val());
     k2 = parseFloat($("#k2").val());
     updateMats();
  })

  $(":button").on("click", function() {buttonPress($(this))})

})























// end
