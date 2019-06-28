// initialise coordinates
const coordRange = Array.from(Array(4).keys());
const rConst = 1; // scales input
const graphConst = 0.5; // scales input for graphing
var coordX = [0, 10, 1, 8, 5];
var coordY = [0, 0, 3, 4, 0];
var x = coordX, y = coordY;

var nForce = [0, 0, 0, 0]; // bar forces
var rForce = [0, 0]; // reaction forces
var r1text = "$R_1 = 0 + 0 + 0 + 0 = 0$";
var r2text = "$R_2 = 0 + 0 + 0 + 0 = 0$";
$("#r1latex").html(r1text)
$("#r2latex").html(r2text)
MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

// initialise mathJax
math.config({
  number: 'Fraction'
})

// initialise sliders
$("#r1").on("change", function() {update()})
$("#r2").on("change", function() {update()})
var r1 = $("#r1").val() * rConst;
var r2 = $("#r2").val() * rConst;

// initialise graph
var data = coordRange.map(function (i) {
    return {
      x: [coordX[4], coordX[i]],
      y: [coordY[4], coordY[i]],
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: 'white',
        size: 5,
        line: {
          color: 'black',
          width: 2,
        },
      },
      line: {
        color: 'black'
    },
      connectgaps: false,
  }});

data.push({
    x: [coordX[4]],
    y: [coordY[4]],
    type: 'scatter',
    mode: 'markers+lines',
    marker: {
      color: 'black',
      size: 20
    },
    line: {
      color: 'black'
  },
    connectgaps: false,
});

console.log(data)

let layout;
function refreshLayout () {
  layout = {
    autosize: false,
    width: 380,
    height: 310,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
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
      range: [-2.1,5.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    showlegend: false,
    hovermode: false,
    annotations: [
      {
        x: 0,
        y: 0,
        xref: "x",
        yref: "y",
        text: "$"+math.parse(nForce[0]).toTex()+((nForce[0]==0) ? "" : "\\frac{EA}{a}")+"$",
        font: {size:30},
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: -30,
      },
      {
        x: 1,
        y: 3,
        xref: "x",
        yref: "y",
        text: "$"+math.parse(nForce[1]).toTex()+((nForce[1]==0) ? "" : "\\frac{EA}{a}")+"$",
        font: {size:30},
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: -40,
      },
      {
        x: 8,
        y: 4,
        xref: "x",
        yref: "y",
        text: "$"+math.parse(nForce[2]).toTex()+((nForce[2]==0) ? "" : "\\frac{EA}{a}")+"$",
        font: {size:30},
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: -40,
      },
      {
        x: 10,
        y: 0,
        xref: "x",
        yref: "y",
        text: "$"+math.parse(nForce[3]).toTex()+((nForce[3]==0) ? "" : "\\frac{EA}{a}")+"$",
        font: {size:30},
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: -30,
      },
      { // R1 arrow
        x: 7 + r1*graphConst,
        y: -0.5 + r2*graphConst,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "black",
        arrowhead: 2,
        ax: -50,
        ay: 0,
      },
      { // R1 text
        x: 8 + r1*graphConst,
        y: -0.5 + r2*graphConst,
        text: '$R_1, r_1$',
        textposition: "bottom",
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: 0,
      },
      { // R2 arrow
        x: 5 + r1*graphConst,
        y: 2 + r2*graphConst,
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "black",
        arrowhead: 2,
        ax: 0,
        ay: 50,
      },
      { // R2 text
        x: 5 + r1*graphConst,
        y: 2.5 + r2*graphConst,
        text: '$R_2, r_2$',
        textposition: "bottom",
        xref: 'x',
        yref: 'y',
        showarrow: true,
        arrowcolor: "transparent",
        arrowhead: 0,
        ax: 0,
        ay: 0,
      },
    ],
    shapes: [{ // supports
        type: "path",
        path: "M-0.1,0 L-0.9,-0.4 L-0.9,0.4 Z",
        line: {
          color: 'black',
          width: 1.5,
        },
    }, {
      type: "path",
      path: "M0.92,3.05 L0.15,3.05 L0.55,3.7 Z",
      line: {
        color: 'black',
        width: 1.5,
      },
    }, {
      type: "path",
      path: "M8.07,4.07 L8.85,4.05 L8.45,4.7 Z",
      line: {
        color: 'black',
        width: 1.5,
      },
    }, {
      type: "path",
      path: "M10.1,0 L10.9,-0.4 L10.9,0.4 Z",
      line: {
        color: 'black',
        width: 1.5,
      },
    }],
  }
}

// plot graph
refreshLayout();
Plotly.newPlot('graph1', [], layout);
Plotly.react('graph1', data, layout);

function update () {
  compute();
  refreshLayout();
  Plotly.react('graph1', data, layout)

  // update text
  $("#r1latex").html(r1text)
  $("#r2latex").html(r2text)
  MathJax.Hub.Queue(["Typeset",MathJax.Hub,"latexbox"]);
  return;
}

function compute () {
  r1 = $("#r1").val() * rConst;
  r2 = $("#r2").val() * rConst;
  coordX = [0, 10, 1, 8, 5+r1*graphConst];
  coordY = [0, 0, 3, 4, 0+r2*graphConst];

  nForce = math.round([
    (1/5)*r1,
    (4/25)*r1 - (3/25)*r2,
    -(3/25)*r1 - (4/25)*r2,
    -(1/5)*r1 ], 4);

  data = coordRange.map(function (i) {
    return {
      x: [coordX[4], coordX[i]],
      y: [coordY[4], coordY[i]],
      type: 'scatter',
      mode: 'markers+lines+text',
      marker: {
        color: 'white',
        size: 5,
        line: {
          color: 'black',
          width: 2,
        },
      },
      line: {
        color: 'black'
    },
      connectgaps: false,
  }});

  data.push({
      x: [coordX[4]],
      y: [coordY[4]],
      type: 'scatter',
      mode: 'markers+lines',
      marker: {
        color: 'black',
        size: 20
      },
      line: {
        color: 'black'
    },
      connectgaps: false,
  });

  rForce = math.round(math.multiply([[3/5,0],[0,1/5]],[r1,r2]),4);

  r10 = ((nForce[0]!==0) ? math.parse(nForce[0]).toTex()+" \\frac{EA}{a}" : "0" );
  r11 = ((nForce[1]!==0) ? ((nForce[1]>0) ? "+" : "")+math.parse(nForce[1]).toTex()+" \\frac{EA}{a} (\\frac{4}{5})" : "+0" );
  r12 = ((nForce[2]!==0) ? ((nForce[2]>0) ? "+" : "")+math.parse(nForce[2]).toTex()+" \\frac{EA}{a} (-\\frac{3}{5})" : "+0" );
  r13 = ((nForce[3]!==0) ? ((nForce[3]>0) ? "+" : "")+math.parse(nForce[3]).toTex()+" \\frac{EA}{a} (-1)" : "+0" );
  r1final = ((rForce[0]!==0) ? ((rForce[0]==1) ? "" : ((rForce[0]==-1) ? "-" : math.parse(rForce[0]).toTex())) +" \\frac{EA}{a}" : "0" );
  r1text = "$R_1 = " + r10 + r11 + r12 + r13 + " = " + r1final + "$";

  r20 = "0";
  r21 = ((nForce[1]!==0) ? ((nForce[1]>0) ? "+" : "")+math.parse(nForce[1]).toTex()+" \\frac{EA}{a} (-\\frac{3}{5})" : "+0" );
  r22 = ((nForce[2]!==0) ? ((nForce[2]>0) ? "+" : "")+math.parse(nForce[2]).toTex()+" \\frac{EA}{a} (-\\frac{4}{5})" : "+0" );
  r23 =  "+ 0";
  r2final = ((rForce[1]!==0) ? ((rForce[1]==1) ? "" : ((rForce[1]==-1) ? "-": math.parse(rForce[1]).toTex()))+" \\frac{EA}{a}" : "0" );
  r2text = "$R_2 =" + r20 + r21 + r22 + r23 + " = " + r2final + "$";

  return;
}

























// end
