let data, layout;
const lineCoord = -0.5;
const origin = [[2, lineCoord], [4, lineCoord]];
var massCoordx = [origin[0][0]-0.5, origin[1][0]-0.5];
var massCoordy = [origin[0][1], origin[1][1]];
const maxlen = 256;
const graphlen = 256;
var rDeque = [new Deque(maxlen), new Deque(maxlen)];

var frameNo = 0;
var period = 80;
const string_length = 20;
const n = 100;

let startAnim, k = 1;

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
    marker: {color: ['blue', 'red'], size: 50, symbol: 'circle'},
    connectgaps: false,
  }];

layout = {
  autosize: true,
  width: 700,
  height: 400,
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
    range: [0,6],
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

var layout1 = {
    autosize: false,
    width: 700,
    height: 100,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 50,
      r: 50,
      b: 0,
      t: 0,
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


var shapes = [
{
  type: "line",
  x0: massCoordx[1],
  y0: massCoordy[1],
  x1: 4,
  y1: 0.8,
  line: {
    color: "red",
    width: 2,
  }
},
{
  type: "line",
  x0: massCoordx[0],
  y0: massCoordy[0],
  x1: 2,
  y1: 0.8,
  line: {
    color: "blue",
    width: 2,
  }
},
{ // wall
  type: "line",
  x0: origin[0][0]-1,
  y0: 0.8,
  x1: origin[1][0]+1,
  y1: 0.8,
  line: {
    color: "black",
    width: 5,
  }
}];


function clamp (x, xmin, xmax) {
  return math.max(xmin, math.min(x, xmax))
}

function updateLine(){
  shapes = [
  {
    type: "line",
    x0: massCoordx[1],
    y0: massCoordy[1],
    x1: 4,
    y1: 0.8,
    line: {
      color: "red",
      width: 2,
    }
  },
  {
    type: "line",
    x0: massCoordx[0],
    y0: massCoordy[0],
    x1: 2,
    y1: 0.8,
    line: {
      color: "blue",
      width: 2,
    }
  },
  { // wall
    type: "line",
    x0: origin[0][0]-1,
    y0: 0.8,
    x1: origin[1][0]+1,
    y1: 0.8,
    line: {
      color: "black",
      width: 5,
    }
  }];
};

function updateSpring () {
  var midPointx = [massCoordx[0]-0.5*(massCoordx[0]-2), massCoordx[1]-0.5*(massCoordx[1]-4)];
  var midPointy = [massCoordy[0]-0.5*(massCoordy[0]-0.8), massCoordy[1]-0.5*(massCoordy[1]-0.8)];
  springlen = [midPointx[0]-1, midPointx[1]-midPointx[0]];
  var springleny = [midPointy[1]-midPointy[0]];
  springx = [
    midPointx[0],
    midPointx[0]+springlen[1]*(4/24),
    midPointx[0]+springlen[1]*(5/24),
    midPointx[0]+springlen[1]*(6/24),
    midPointx[0]+springlen[1]*(7/24),
    midPointx[0]+springlen[1]*(8/24),
    midPointx[0]+springlen[1]*(9/24),
    midPointx[0]+springlen[1]*(10/24),
    midPointx[0]+springlen[1]*(11/24),
    midPointx[0]+springlen[1]*(12/24),
    midPointx[0]+springlen[1]*(13/24),
    midPointx[0]+springlen[1]*(14/24),
    midPointx[0]+springlen[1]*(15/24),
    midPointx[0]+springlen[1]*(16/24),
    midPointx[0]+springlen[1]*(17/24),
    midPointx[0]+springlen[1]*(18/24),
    midPointx[0]+springlen[1]*(19/24),
    midPointx[0]+springlen[1]*(20/24),
    midPointx[1],
  ];
  springy = [
    midPointy[0],
    midPointy[0] + springleny*(4/24),
    midPointy[0]-0.05 + springleny*(5/24),
    midPointy[0] + springleny*(6/24),
    midPointy[0]+0.05 + springleny*(7/24),
    midPointy[0] + springleny*(8/24),
    midPointy[0]-0.05 + springleny*(9/24),
    midPointy[0] + springleny*(10/24),
    midPointy[0]+0.05 + springleny*(11/24),
    midPointy[0] + springleny*(12/24),
    midPointy[0]-0.05 + springleny*(13/24),
    midPointy[0] + springleny*(14/24),
    midPointy[0]+0.05 + springleny*(15/24),
    midPointy[0] + springleny*(16/24),
    midPointy[0]-0.05 + springleny*(17/24),
    midPointy[0] + springleny*(18/24),
    midPointy[0]+0.05 + springleny*(19/24),
    midPointy[0] + springleny*(20/24),
    midPointy[1],
  ];
};



function compute(){
  let frameNo = 0;
  let theta1, theta2;
  var theta01 = Math.asin((origin[0][0]-massCoordx[0])/(string_length));
  var theta02 = Math.asin((origin[1][0]-massCoordx[1])/(string_length));
  startAnim = setInterval(function() {
    frameNo++
    theta1 = theta01 *((1-k) * Math.cos((2*(frameNo+1)*Math.PI)/period)+ k *Math.cos((2*Math.sqrt(3)*(frameNo+1)*Math.PI)/period));
    theta2 = theta02 * ((k-1) * Math.cos((2*(frameNo+1)*Math.PI)/period)+ k *Math.cos((2*Math.sqrt(3)*(frameNo+1)*Math.PI)/period));
    //console.log(theta2)
    massCoordx[0] = origin[0][0] - string_length * Math.sin(theta1);
    massCoordx[1] = origin[1][0] - string_length * Math.sin(theta2);
    massCoordy[0] = origin[0][1] + string_length * (1 - Math.cos(theta1));
    massCoordy[1] = origin[1][1] + string_length * (1 - Math.cos(theta2));
    pushDeques();
    updateSpring();
    updateLine();
    Plotly.restyle(graphContainer, {x: [springx, massCoordx], y: [springy, massCoordy]}, [0, 1]);
    Plotly.relayout(graphContainer, {annotations: [], shapes: shapes});
    updatePosition();
  }, 15);

};


function pushDeques () {
  rDeque[0].push(massCoordx[0]);
  rDeque[1].push(massCoordx[1]);
  return;
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
}


function buttonPress (hitButton) {
  if (hitButton.attr('value') == "Start") {
    hitButton.prop('value', 'Reset');
    //clear var theta1, theta2
    compute();
  } else {
    hitButton.prop('value', 'Start');
    clearInterval(startAnim);
    massCoordx = [origin[0][0]-0.5, origin[1][0]-0.5];
    massCoordy = [origin[0][1], origin[1][1]];
    rDeque = [new Deque(maxlen), new Deque(maxlen)];
    updateSpring();
    updateLine();
    pushDeques();
    updatePosition();
    Plotly.restyle(graphContainer, {x: [springx, massCoordx], y: [springy, massCoordy]}, [0, 1]);
    Plotly.relayout(graphContainer, {annotations: [], shapes: shapes});
    document.getElementById("zeta").value = "0";
    k = 1;
  }
  return;
}

$(document).ready(function () {

  graphContainer = document.getElementById("tester");
  Plotly.newPlot(graphContainer, data, layout, {displayModeBar: false});
  Plotly.newPlot("plot", data1, layout1, {displayModeBar: false});
  Plotly.relayout(graphContainer, {annotations: [], shapes: shapes});

  $("input").on("change", function () {
    k = 1-$("#zeta").val();
    massCoordx = [origin[0][0]-0.5, origin[1][0]-0.5];
    updatePosition();
  })

  $(":button").on("click", function() {buttonPress($(this))})


});


















//end
