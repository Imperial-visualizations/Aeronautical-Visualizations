/* initialise mathJax
math.config({
  number: 'Fraction'
}) */

// convenience
var graphstart = 0, graphend = 20, step = 0.02;
var linrange = math.range(graphstart, graphend, step, true);
let data0, layout0, data1, layout1;

layout0 = {
    autosize: true,
    width: 600,
    height: 570,
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
      range: [-1,20.1],
      fixedrange: true,
      showgrid: true,
      zeroline: true,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false
    },
    yaxis: {
      range: [-15,30],
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
    annotations: [{
      x: .75,
      y: 30,
      xref: 'x',
      yref: 'y',
      text: '$r(t)$',
      font: {
        size: 100,
      },
      showarrow: true,
      arrowhead: 1,
      arrowcolor: "transparent",
      ax: 0,
      ay: 0,
    }, {
      x: 20,
      y: -1,
      xref: 'x',
      yref: 'y',
      text: '$t$',
      font: {
        size: 100,
      },
      showarrow: true,
      arrowhead: 1,
      arrowcolor: "transparent",
      ax: 0,
      ay: 0,
    }, ],
  };

  layout1 = {
      autosize: true,
      width: 300,
      height: 300,
      plot_bgcolor:"#F4F4F4",
      paper_bgcolor:"#F4F4F4",
      margin: {
        l: 20,
        r: 20,
        b: 20,
        t: 20,
        pad: 4
      },
      xaxis: {
        range: [-0,20.5],
        fixedrange: true,
        showgrid: true,
        zeroline: true,
        showline: false,
        autotick: false,
        ticks: '',
        showticklabels: false
      },
      yaxis: {
        range: [-0,20],
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
      annotations: [{
        x: 2,
        y: 20,
        xref: 'x',
        yref: 'y',
        text: '$R(t)$',
        font: {
          size: 100,
        },
        showarrow: true,
        arrowhead: 1,
        arrowcolor: "transparent",
        ax: 0,
        ay: 0,
      }, {
        x: 20.5,
        y: 1.5,
        xref: 'x',
        yref: 'y',
        text: '$t$',
        font: {
          size: 100,
        },
        showarrow: true,
        arrowhead: 1,
        arrowcolor: "transparent",
        ax: 0,
        ay: 0,
      }, ],
    };

// initial variables
var m = 1;
var c = 0;
var k = 1;
var rho = 1;
let alpha, beta, wu, xi;
let totaly;

function findConsts () {
  alpha = c/(2*m);
  beta = math.sqrt(k/m - alpha**2);
  wu = math.sqrt(alpha**2+beta**2);
  xi = alpha/wu;
  return;
};

function findIndef (t, tau) {
  var val = (rho/(beta*m*wu**4))*(math.exp(-alpha*(t-tau)))*((math.sin(beta*(t-tau)))*(alpha*tau*wu**2+beta**2-alpha**2)+math.cos(beta*(t-tau))*(beta*tau*wu**2-2*alpha*beta));
  return val;
};

function findDef (t, start, end) {
  if (t < start) {
    return 0;
  }
  let val;
  if (t < end) {
    val = findIndef(t, t) - findIndef(t, start);
  } else {
    val = findIndef(t, end) - findIndef(t, start);
  };
  return val;
};

function findr (input, start, end) {
  var out = math.map(input, function (value) {
    return findDef(value, start, end)
  });
  return out;
};

$(document).ready(function () {
  findConsts();
  totaly = findr(linrange, graphstart, graphend);

  var plot0 = document.getElementById('graph0');
  data0 = [{ // first curve
      x: linrange.toArray(),
      y: totaly.toArray(),
      type: 'scatter',
      mode: 'markers+lines',
      hoverinfo: 'none',
      marker: {
        color: 'transparent',
        size: 1,
      },
      line: {
        color: 'grey',
        width: 3,
    },
      connectgaps: false,
  }, ];
  var tempData0 = Array.from(data0);
  var tempColor = math.zeros(linrange._size[0]);
  tempData0.push({
    x: linrange.toArray(),
    y: tempColor.toArray(),
    type: 'scatter',
    mode: 'lines',
    line: {
      color: "blue",
      width: 3,
      dash: "dot",
    },
    hoverinfo: 'none',
    connectgaps: false,
  });
  Plotly.newPlot(plot0, tempData0, layout0, {displayModeBar: false, doubleClick: false,});

  var plot1 = document.getElementById('graph1');
  data1 = [{ // horizontal
      x: linrange.toArray(),
      y: linrange.toArray(),
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
  }, ];

  Plotly.newPlot(plot1, data1, layout1, {displayModeBar: false, doubleClick: false,});

  var temprange = math.range(0,20,1,true).toArray();
  var colorx = temprange.reduce(function(arr, v, i) {
    return arr.concat(v, temprange[i]);
  }, []);
  var colory1 = math.zeros(colorx.length).toArray();
  var colory0 = math.zeros(linrange._size[0]);

  plot1.on('plotly_click', function (dataInput) {
    var newData1 = Array.from(data1);
    var newData0 = Array.from(data0);
    var i = math.floor(dataInput.points[0].y);
    if (i>=20) {return;};
    if (colory1[2*i+2]!=0) {
      colory1[2*i+1] = 0;
      colory1[2*i+2] = 0;
      colory0 = math.subtract(colory0, findr(linrange, i, i+1));
    } else {
      colory1[2*i+1] = i+.5;
      colory1[2*i+2] = i+.5;
      colory0 = math.add(colory0,findr(linrange, i, i+1));
    };
    newData1.unshift({
      x: colorx,
      y: colory1,
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      hoverinfo: 'none',
      connectgaps: false,
    });
    newData0.push({
      x: linrange.toArray(),
      y: colory0.toArray(),
      type: 'scatter',
      mode: 'lines',
      line: {
        color: 'blue',
        width: 3,
        dash: "dot",
      },
      hoverinfo: 'none',
      connectgaps: false,
    });

    Plotly.react(plot1, data1, layout1); // refresh graph
    Plotly.react(plot1, newData1, layout1);

    Plotly.react(plot0, data0, layout0);
    Plotly.react(plot0, newData0, layout0);

    return;
  });

  $(":button").on("click", function () {
    switch ($(this).attr('id')) {
      case "button1":
        var newData1 = Array.from(data1);
        var newData0 = Array.from(data0);
        colory0 = math.matrix(Array.from(totaly._data));
        colory1 = math.zeros(colorx.length).toArray();
        colory1[0] = 0;
        colory1[colory1.length-1] = 19.5;
        for (var j = 1; j < colory1.length-1; j++) {
          colory1[j] = math.floor((j-1)/2)+0.5;
        };
        newData1.unshift({
          x: colorx,
          y: colory1,
          fill: 'tozeroy',
          type: 'scatter',
          mode: 'none',
          hoverinfo: 'none',
          connectgaps: false,
        });
        newData0.push({
          x: linrange.toArray(),
          y: colory0.toArray(),
          type: 'scatter',
          mode: 'lines',
          line: {
            color: "blue",
            width: 3,
            dash: "dot",
          },
          hoverinfo: 'none',
          connectgaps: false,
        });

        Plotly.react(plot1, data1, layout1); // refresh graph
        Plotly.react(plot1, newData1, layout1);

        Plotly.react(plot0, data0, layout0);
        Plotly.react(plot0, newData0, layout0);
        break;
      case "button0":
      default:
        colory0 = math.zeros(linrange._size[0]);
        colory1 = math.zeros(colorx.length).toArray();
        var newData0 = Array.from(data0);
        newData0.push({
          x: linrange.toArray(),
          y: colory0.toArray(),
          type: 'scatter',
          mode: 'lines',
          line: {
            color: "blue",
            width: 3,
            dash: "dot",
          },
          hoverinfo: 'none',
          connectgaps: false,
        });
        Plotly.react(plot1, data1, layout1);
        Plotly.react(plot0, newData0, layout0);
        break;
    };
    return;
  });

  $(":input").on("change", function () {
    m = parseFloat($("#m1").val());
    c = parseFloat($("#c1").val());
    k = parseFloat($("#k1").val());
    findConsts();

    totaly = findr(linrange, graphstart, graphend);
    data0 = [{ // first curve
        x: linrange.toArray(),
        y: totaly.toArray(),
        type: 'scatter',
        mode: 'markers+lines',
        hoverinfo: 'none',
        marker: {
          color: 'transparent',
          size: 1,
        },
        line: {
          color: 'grey',
          width: 3,
      },
        connectgaps: false,
    }, ];

    colory0 = math.zeros(linrange._size[0]);

    for (var i = 0; i < (colorx.length/2 - 1); i++) {
      if (colory1[2*i+1]!=0) {
        colory0 = math.add(colory0, findr(linrange, i, i+1));
      };
    }

    var newData0 = Array.from(data0);
    newData0.push({
      x: linrange.toArray(),
      y: colory0.toArray(),
      type: 'scatter',
      mode: 'lines',
      line: {
        color: "blue",
        width: 3,
        dash: "dot",
      },
      hoverinfo: 'none',
      connectgaps: false,
    });

    var newData1 = Array.from(data1);
    newData1.unshift({
      x: colorx,
      y: colory1,
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'none',
      hoverinfo: 'none',
      connectgaps: false,
    });

    Plotly.react(plot1, newData1, layout1);
    Plotly.react(plot0, newData0, layout0);
    return;
  })
  return;
});





















// end
