/* initialise mathJax
math.config({
  number: 'Fraction'
}) */

let plot0, data, layout;
var rhoA = 1;
var ei = 5;
var n = 1;
var l = 20;
var leftbc = 0;
var rightbc = 0;

let startAnim;
var stepNo = 0;
var animConst = 0.05; // slows down animation
let omega, envelope;

layout = {
    autosize: true,
    width: 900,
    height: 300,
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
      range: [-1,l+1],
      fixedrange: true,
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-3,3],
      fixedrange: true,
      showgrid: false,
      zeroline: true,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: true,
  };


var xrange = math.range(0, l, 0.005, true);

function getEnvelope(xarray, left, right) {
  // returns {beta, envelope}
  if (left==0) {
    if (right==0){
      var betal = (2*n+1)*math.PI/(2);
      var beta = betal/l;
      return {betal: betal, envelope: math.map(xarray, function (x) {
        return ((math.cos(beta*x)-math.cosh(beta*x))-((math.cos(betal)-math.cosh(betal))/(math.sin(betal)-math.sinh(betal)))*(math.sin(beta*x)-math.sinh(beta*x)));
      }),};
    } else if (right==1) {
      var betal = (4*n+1)*math.PI/(4);
      var beta = betal/l;
      return {betal: betal, envelope: math.map(xarray, function (x) {
        return ((math.cos(beta*x)-math.cosh(beta*x))-((math.cos(betal)-math.cosh(betal))/(math.sin(betal)-math.sinh(betal)))*(math.sin(beta*x)-math.sinh(beta*x)));
      }),};
    } else if (right==2) {
      var betal = (2*n-1)*math.PI/(2);
      var beta = betal/l;
      return {betal: betal, envelope: math.map(xarray, function (x) {
        return ((math.cos(beta*x)-math.cosh(beta*x))-((math.cos(betal)+math.cosh(betal))/(math.sin(betal)+math.sinh(betal)))*(math.sin(beta*x)-math.sinh(beta*x)));
      }),};
    }
    return;
  } else if (left==1) {
    if (right==0){
      return getEnvelope(math.matrix(xarray.toArray().reverse()),0,1);
    } else if (right==1) {
      var betal = n*math.PI;
      return {betal: betal, envelope: math.map(xarray, function (x) {
        return math.sin(betal*x/l);
      }),};
    } else if (right==2) {
      var betal = (4*n+1)*math.PI/4;
      var beta = betal/l;
      return {betal: betal, envelope: math.map(xarray, function (x) {
        return ((math.sin(beta*x)+math.sinh(beta*x))+((-math.sin(betal)+math.sinh(betal))/(math.sin(betal)+math.sinh(betal)))*(math.sin(beta*x)-math.sinh(beta*x)));
      }),};
    }
    return;
  } else if (left==2) {
    if (right==0){
      return getEnvelope(math.matrix(xarray.toArray().reverse()),0,2);
    } else if (right==1) {
      return getEnvelope(math.matrix(xarray.toArray().reverse()),1,2);
    } else if (right==2) {
      var betal = (2*n+1)*math.PI/2;
      var beta = betal/l;
      return {betal: betal, envelope: math.map(xarray, function (x) {
        return ((math.cos(beta*x)+math.cosh(beta*x))-((math.cos(betal)-math.cosh(betal))/(math.sin(betal)-math.sinh(betal)))*(math.sin(beta*x)+math.sinh(beta*x)));
      }),};
    };
    return;
  } else {
    return;
  };
  return;
};

function getOrdinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    };
    if (j == 2 && k != 12) {
        return i + "nd";
    };
    if (j == 3 && k != 13) {
        return i + "rd";
    };
    return i + "th";
};

function startAnimation () {
  clearInterval(startAnim);
  startAnim = setInterval(function () {
    var currAmp = math.cos(stepNo*omega*animConst);
    var tempy = math.multiply(envelope.envelope,currAmp);
    Plotly.restyle('graph0', {
      x: [xrange.toArray()],
      y: [tempy.toArray()],
    });
    Plotly.relayout('graph0', {
      shapes: getShapes(leftbc, rightbc),
    });
    stepNo++;
    return;
  }, 15);
  return;
};

function getShapes(left, right) {
  var shapes = [];
  switch (left) {
    case 0:
      shapes.push({
        type: "line",
        x0: -.1,
        y0: -1,
        x1: -.1,
        y1: 1,
        line: {
          color: "grey",
          width: 10,
        }
      });
      break;
    case 1:
      shapes.push({ // supports
        type: "path",
        path: "M-.1,0 L-0.97,-0.5 L-0.97,0.5 Z",
        fillcolor: 'grey',
        line: {
          color: 'black',
        },
      });
      shapes.push({
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: -.1,
        y0: -.1,
        x1: .1,
        y1: .1,
        fillcolor: 'black',
        line: {color: 'black'},
      });
      break;
    case 2:
    default:
      break;
  };

  switch (right) {
    case 0:
      shapes.push({
        type: "line",
        x0: l+0.1,
        y0: -1,
        x1: l+0.1,
        y1: 1,
        line: {
          color: "grey",
          width: 10,
        }
      });
      break;
    case 1:
      shapes.push({ // supports
        type: "path",
        path: "M20.1,0 L20.97,-0.4 L20.97,0.4 Z",
        fillcolor: 'grey',
        line: {
          color: 'black',
        },
      });
      shapes.push({
        type: 'circle',
        xref: 'x',
        yref: 'y',
        x0: 19.9,
        y0: -.1,
        x1: 20.1,
        y1: .1,
        fillcolor: 'black',
        line: {color: 'black'},
      });
      break;
    case 2:
    default:
      break;
  };
  return shapes;
}

$(document).ready(function () {

  envelope = getEnvelope(xrange, leftbc, rightbc);
  $("#lambdas").text(`$$\\lambda_n L = ${math.round(envelope.betal, 2).toFixed(2)}$$`);
  omega = math.round(((envelope.betal/l)**2)+(math.sqrt(ei/rhoA)), 2);
  $("#omegas").text(`$$\\omega_n = ${math.round(omega, 2).toFixed(2)}$$`);
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,"vars"]);

  $("#left1").hide();
  $("#left2").hide();
  $("#right1").hide();
  $("#right2").hide();


  plot0 = document.getElementById('graph0');
  data = [{
    x: xrange.toArray(),
    y: envelope.envelope.toArray(),
    type: 'scatter',
    mode: 'lines',
    hoverinfo: 'none',
    marker: {
      color: 'transparent',
      size: 1,
    },
    line: {
      color: 'black',
      width: 5,
  },
    connectgaps: false,
  },];
  Plotly.newPlot(plot0, data, layout, {displayModeBar: false, doubleClick: false,});
  Plotly.relayout('graph0', {
    shapes: getShapes(leftbc, rightbc),
  });

  $(":input").on("change", function () {
    n = $("#ms").val();
    leftbc = parseInt($("#leftselect").val());
    rightbc = parseInt($("#rightselect").val());

    $("#left0").hide();
    $("#left1").hide();
    $("#left2").hide();
    $("#right0").hide();
    $("#right1").hide();
    $("#right2").hide();

    $(`#left${leftbc}`).show();
    $(`#right${rightbc}`).show()


    envelope = getEnvelope(xrange, leftbc, rightbc);
    omega = ((envelope.betal/l)**2)+(math.sqrt(ei/rhoA));
    $("#lambdas").text(`$$\\lambda_n L = ${math.round(envelope.betal, 2).toFixed(2)}$$`);
    $("#omegas").text(`$$\\omega_n = ${math.round(omega, 2).toFixed(2)}$$`);
    $("#modelabel").text(`Mode Shape: ${getOrdinal(n)}`);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"vars"]);

    stepNo = 0;

    if ($("#startb").attr("value")=="Start") {
      Plotly.restyle('graph0', {
        x: [xrange.toArray()],
        y: [envelope.envelope.toArray()],
      });
    };
    Plotly.relayout('graph0', {
      shapes: getShapes(leftbc, rightbc),
    });
    return;
  });

  $("#startb").on("click", function () {
    if ($("#startb").attr("value")=="Start") {
      $("#startb").attr("value", "Pause");
      startAnimation();
    } else {
      $("#startb").attr("value", "Start");
      clearInterval(startAnim);
    };
    return;
  });

  $("#speedb").on("click", function () {
    if ($("#speedb").attr("value")=="Slower") {
      var newConst = 0.01;
      $("#speedb").attr("value", "\xa0Faster");
    } else {
      var newConst = 0.05;
      $("#speedb").attr("value", "Slower");
    }
    stepNo = math.round(stepNo*animConst/newConst);
    animConst = newConst;
    return;
  })

  return;
});





















// end
