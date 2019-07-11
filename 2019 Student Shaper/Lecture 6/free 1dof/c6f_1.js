// initialise mathJax
/*
math.config({
  number: 'Fraction'
})
*/

// initialise graph
let data, layout;
const origin = [3.2, 0];
var massCoords = [origin[0], origin[1]];
var m = 1, c = 0.3, k = 1;
var dt = 0.1;
var eps = 0.001;

const maxlen = 1e6;
const graphlen = 512;
var rDeque = new Deque(maxlen);

let startAnim;

// plot data
function updateData () {
  plotData = rDeque.toArraySlice(graphlen);
  xrange = math.range(0, 2.5, 2.5/(graphlen-1))._data.slice(0, plotData.length);

  //spring
  springlen = massCoords[1] + 2;

  data = [{
      x: [
        origin[0],
        origin[0],
        origin[0]-0.1,
        origin[0],
        origin[0]+0.1,
        origin[0],
        origin[0]-0.1,
        origin[0],
        origin[0]+0.1,
        origin[0],
        origin[0]-0.1,
        origin[0],
        origin[0]+0.1,
        origin[0],
        origin[0]-0.1,
        origin[0],
        origin[0]+0.1,
        origin[0],
        massCoords[0]],
      y: [
        -2,
        -2+springlen*(2/32),
        -2+springlen*(3/32),
        -2+springlen*(4/32),
        -2+springlen*(5/32),
        -2+springlen*(6/32),
        -2+springlen*(7/32),
        -2+springlen*(8/32),
        -2+springlen*(9/32),
        -2+springlen*(10/32),
        -2+springlen*(11/32),
        -2+springlen*(12/32),
        -2+springlen*(13/32),
        -2+springlen*(14/32),
        -2+springlen*(15/32),
        -2+springlen*(16/32),
        -2+springlen*(17/32),
        -2+springlen*(18/32),
        massCoords[1]],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    }, { // arrowline
      x: [-0.1, 2.6],
      y: [0, 0],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'grey'},
      connectgaps: false,
    }, {
      x: xrange,
      y: plotData,
      type: 'scatter',
      mode: 'lines',
      line: {color: 'blue'},
      connectgaps: false,
    }, { // text t
      x: [2.65, 2.9],
      y: [-0.3, massCoords[1]+0.2],
      mode: 'text',
      text: ['t', 'm'],
      textfont: {color: 'grey', size: 30, family: 'sans-serif'},
      textposition: 'bottom',
      type: 'scatter',
    }, { // text k,c
      x: [2.9],
      y: [-1.3],
      mode: 'text',
      text: ['k,c'],
      textfont: {color: 'grey', size: 30, family: 'sans-serif'},
      textposition: 'bottom',
      type: 'scatter',
    }, { // text r
      x: [3.75],
      y: [1.3],
      mode: 'text',
      text: ['r'],
      textfont: {color: 'black', size: 30, family: 'sans-serif'},
      textposition: 'bottom',
      type: 'scatter',
    }, {
      x: [massCoords[0]],
      y: [massCoords[1]],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'black', size: 50, symbol: 'square'},
      connectgaps: false,
    }];
    return;
  }

function updateLayout () {
  layout = {
    autosize: false,
    width: 650,
    height: 300,
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
      range: [-0.5,4],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-2.5,2],
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
    annotations: [{
      x: 2.7, // horizontal 1
      y: 0,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 2,
      arrowsize: 2,
      ax: -10,
      ay: 0,
    }, {
      x: 3.6, // disparrow
      y: 1.1,
      xref: 'x',
      yref: 'y',
      showarrow: true,
      arrowcolor: "black",
      arrowhead: 2,
      arrowsize: 2,
      ax: 0,
      ay: 20,
    },],
    shapes: [{
     // lower wall
      type: "line",
      x0: 3.5,
      y0: -2,
      x1: 2.9,
      y1: -2,
      line: {
        color: "black",
        width: 5,
      }
    }, { // disparrow1
      type: "line",
      x0: 3.45,
      y0: 0,
      x1: 3.6,
      y1: 0,
      line: {
        color: "black",
        width: 2,
      }
    }, { // disparrow2
      type: "line",
      x0: 3.6,
      y0: 0,
      x1: 3.6,
      y1: 1,
      line: {
        color: "black",
        width: 2,
      }
    },],
  }
  return;
}

function clamp (x, xmin, xmax) {
  return math.max(xmin, math.min(x, xmax))
}

function updatePosition () {
  updateData();
  // updateLayout();
  Plotly.react(graphContainer, data, layout);
  return;
}

function startDragBehavior () {
  var startAnim;

  var d3 = Plotly.d3;
  var drag = d3.behavior.drag();
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
    graphContainer = document.getElementById("graph0");
    var xmouse = d3.event.x, ymouse = d3.event.y;
    d3.select(this).attr("transform", "translate("+[xmouse,ymouse]+")");
    // var xaxis = graphContainer._fullLayout.xaxis;
    var yaxis = graphContainer._fullLayout.yaxis;
    massCoords[1] = clamp(yaxis.p2l(ymouse), -1, 1);
    rDeque.push(massCoords[1]);
    updatePosition();
    return;
  });
  drag.on("dragend", function() {
    d3.select(".scatterlayer .trace:last-of-type .points path:last-of-type").call(drag);
    rDeque.push(massCoords[1], massCoords[1]);
    startAnim = setInterval(function () {
      drag.on("dragstart", function () {
        clearInterval(startAnim)
        return;
      })
      prevR = [
        rDeque.get(-2) - origin[1],
        rDeque.get(-1) - origin[1],
      ];

      nextR = math.eval('(2*m*(2*b-a) + c*t*a - 2*t*t*b)/(2*m + c*t)', {m: m, c: c, k: k, a: prevR[0], b: prevR[1], t: dt}) + origin[1];

      rDeque.push(nextR);
      massCoords = [origin[0], nextR];
      updatePosition();

      if ((math.abs(nextR - origin[1]) <= eps) && (((math.abs(nextR-prevR[1]-origin[1]))/dt) <= eps)) {
        console.log('end')
        clearInterval(startAnim);
      }
    }, 15);
    return;
  });
  d3.selectAll(".scatterlayer .trace:last-of-type .points path").call(drag);
}

// when page ready
function main () {

  // typeset math
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  // connect sliders
  // plot graph
  updateData();
  updateLayout();

  var graphContainer = document.getElementById("graph0");

  Plotly.newPlot(graphContainer, data, layout, {displayModeBar: false});

  var massContainer = graphContainer.querySelector(".scatterlayer .trace:last-of-type .points");
  var massMarker = massContainer.getElementsByTagName("path");

  startDragBehavior();

  $("#zeta").on("change", function () {
    c = $("#zeta").val();
    console.log(c)
  })

}

$(document).ready(function () {
  main();
})























// end
