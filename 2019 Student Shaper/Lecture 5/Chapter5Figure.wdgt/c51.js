// initialise mathJax
math.config({
  number: 'Fraction'
})

// slider vals
var sliderInput = [0, 0];

// define constants
const graphConst = 0.08;
const graph2Const = 0.2;
const ratio = ((4-13*math.sqrt(2))/23);
const cutConst = 0.75;
const arrowConst = 0.25;

// define coordinates
const coordX = [0, 1, 0, 1, 2,];
const coordY = [0, 0, 1, 1, 1,];

// displacements
const disp1X = [0, -2, 0, 1, 2];
const disp1Y = [0, -2*(1+math.sqrt(2)), 0, -2*(1+math.sqrt(2)), -4*(1.5+math.sqrt(2))];

const disp2X = [0, -(1/math.sqrt(2)), 0, -(1/math.sqrt(2)), -(1/math.sqrt(2))];
const disp2Y = [0, -2-1/math.sqrt(2), 0, -2-math.sqrt(2), -1.5-math.sqrt(2),];

// bars: 12, 23, 24, 25, 34, 45, 14
const bars0 = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [0, 3],];
const bars1 = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4],];
const bars2 = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4],];
const bars3 = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 3], [3, 4],];

// initialise graph
let data, layout, newData;
// plot data
function updateData () {
  const mapRange = [0, 1, 2, 3, 4];
  newData = [
    mapRange.map(function (n) {return [
      coordX[n]+(disp1X[n]+disp2X[n]*ratio)*sliderInput[0]*graphConst,
      coordY[n]+(disp1Y[n]+disp2Y[n]*ratio)*sliderInput[0]*graphConst,
    ];}),
    mapRange.map(function (n) {return [
      coordX[n]+disp1X[n]*sliderInput[0]*graphConst,
      coordY[n]+disp1Y[n]*sliderInput[0]*graphConst,
    ];}),
    mapRange.map(function (n) {return [
      coordX[n]+disp2X[n]*sliderInput[1]*graphConst,
      coordY[n]+disp2Y[n]*sliderInput[1]*graphConst,
    ];}),
    mapRange.map(function (n) {return [
      coordX[n]+(disp1X[n]+disp2X[n]*sliderInput[1])*sliderInput[0]*graphConst,
      coordY[n]+(disp1Y[n]+disp2Y[n]*sliderInput[1])*sliderInput[0]*graphConst,
    ];}),
  ];

  data = [bars0.map(function (n) {
    return {
      x: [newData[0][n[0]][0], newData[0][n[1]][0],],
      y: [newData[0][n[0]][1], newData[0][n[1]][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    };
  }).concat({ // nodes
    x: [newData[0][1][0], newData[0][3][0], newData[0][4][0]],
    y: [newData[0][1][1], newData[0][3][1], newData[0][4][1]],
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'black', size: 10},
    connectgaps: false,
  }), bars1.map(function (n) {
    return {
      x: [newData[1][n[0]][0], newData[1][n[1]][0],],
      y: [newData[1][n[0]][1], newData[1][n[1]][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    };
  }).concat([{ // red bar
      x: [newData[1][0][0],newData[1][3][0]*cutConst*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2),],
      y: [newData[1][0][1],newData[1][3][1]*cutConst*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2),],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'red'},
      connectgaps: false,
    }, { // green bar
      x: [newData[1][3][0]*(1-((1-cutConst)*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2))), newData[1][3][0],],
      y: [newData[1][3][1]*(1-((1-cutConst)*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2))), newData[1][3][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'green'},
      connectgaps: false,
    }, { // red dot
      x: [newData[1][3][0]*cutConst*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2),],
      y: [newData[1][3][1]*cutConst*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2),],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'transparent', size: 15, line: {color: 'red', width: 1}},
      connectgaps: false,
    }, { // green dot
      x: [newData[1][3][0]*(1-((1-cutConst)*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2))),],
      y: [newData[1][3][1]*(1-((1-cutConst)*math.sqrt(2)/math.sqrt((newData[1][3][0]-newData[1][0][0])**2+(newData[1][3][1]-newData[1][0][1])**2))),],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'green', size: 10, line: {color: 'green'}},
      connectgaps: false,
    }, { // nodes
    x: [newData[1][1][0], newData[1][3][0], newData[1][4][0]],
    y: [newData[1][1][1], newData[1][3][1], newData[1][4][1]],
    type: 'scatter',
    mode: 'markers',
    marker: {color: 'black', size: 10},
    connectgaps: false,
  }]), bars2.map(function (n) {
    return {
      x: [newData[2][n[0]][0], newData[2][n[1]][0],],
      y: [newData[2][n[0]][1], newData[2][n[1]][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    };
  }).concat([{ // red bar
      x: [newData[2][0][0],newData[2][3][0]*cutConst*(1+sliderInput[1]*graph2Const/math.sqrt(2)),],
      y: [newData[2][0][1],newData[2][3][1]*cutConst*(1+sliderInput[1]*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'red'},
      connectgaps: false,
    }, { // green bar
      x: [newData[2][3][0]*cutConst*(1-sliderInput[1]*graph2Const/math.sqrt(2)), newData[2][3][0],],
      y: [newData[2][3][1]*cutConst*(1-sliderInput[1]*graph2Const/math.sqrt(2)), newData[2][3][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'green'},
      connectgaps: false,
    }, { // red dot
      x: [newData[2][3][0]*cutConst*(1+sliderInput[1]*graph2Const/math.sqrt(2)),],
      y: [newData[2][3][1]*cutConst*(1+sliderInput[1]*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'transparent', size: 15, line: {color: 'red', width: 1}},
      connectgaps: false,
    }, { // green dot
      x: [newData[2][3][0]*cutConst*(1-sliderInput[1]*graph2Const/math.sqrt(2)),],
      y: [newData[2][3][1]*cutConst*(1-sliderInput[1]*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'green', size: 10, line: {color: 'green'}},
      connectgaps: false,
    }, { // red arrow line
      x: [0.05+newData[2][3][0]*(cutConst-arrowConst)*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), 0.05+newData[2][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      y: [-0.1+newData[2][3][1]*(cutConst-arrowConst)*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),
      -0.1+newData[2][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'red'},
      connectgaps: false,
    }, { // green arrow line
      x: [-0.05+newData[2][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), -0.05+newData[2][3][0],],
      y: [0.1+newData[2][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), 0.1+newData[2][3][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'green'},
      connectgaps: false,
    }, { // nodes
      x: [newData[2][1][0], newData[2][3][0], newData[2][4][0]],
      y: [newData[2][1][1], newData[2][3][1], newData[2][4][1]],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'black', size: 10},
      connectgaps: false,
    }]), bars3.map(function (n) {
    return {
      x: [newData[3][n[0]][0], newData[3][n[1]][0],],
      y: [newData[3][n[0]][1], newData[3][n[1]][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'black'},
      connectgaps: false,
    };
  }).concat([{ // red bar
      x: [newData[3][0][0],newData[3][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      y: [newData[3][0][1],newData[3][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'red'},
      connectgaps: false,
    }, { // green bar
      x: [newData[3][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), newData[3][3][0],],
      y: [newData[3][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), newData[3][3][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'green'},
      connectgaps: false,
    }, { // red dot
      x: [newData[3][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      y: [newData[3][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'transparent', size: 15, line: {color: 'red', width: 1}},
      connectgaps: false,
    }, { // green dot
      x: [newData[3][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      y: [newData[3][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'green', size: 10, line: {color: 'green'}},
      connectgaps: false,
    }, { // red arrow line
      x: [0.05+newData[3][3][0]*(cutConst-arrowConst)*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), 0.05+newData[3][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      y: [-0.1+newData[3][3][1]*(cutConst-arrowConst)*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),
      -0.1+newData[3][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)),],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'red'},
      connectgaps: false,
    }, { // green arrow line
      x: [-0.05+newData[3][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), -0.05+newData[3][3][0],],
      y: [0.1+newData[3][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2)), 0.1+newData[3][3][1],],
      type: 'scatter',
      mode: 'lines',
      line: {color: 'green'},
      connectgaps: false,
    }, { // nodes
      x: [newData[3][1][0], newData[3][3][0], newData[3][4][0]],
      y: [newData[3][1][1], newData[3][3][1], newData[3][4][1]],
      type: 'scatter',
      mode: 'markers',
      marker: {color: 'black', size: 10},
      connectgaps: false,
    }])];
  return;
}

function updateLayout () {
  layout = [{
    autosize: false,
    width: 380,
    height: 270,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 5,
      r: 5,
      b: 5,
      t: 25,
      pad: 4
    },
    xaxis: {
      range: [-.5,2.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-.5,1.5],
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
    annotations: [{ // R arrow
      x: newData[0][4][0],
      y: newData[0][4][1]+0.08,
      xref: "x",
      yref: "y",
      text: "R",
      font: {size:15*(1+(parseFloat(sliderInput[0]))), color: 'grey'},
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 1,
      arrowwidth: 2*(1+(parseFloat(sliderInput[0]))),
      arrowsize: 1,
      ax: 0,
      ay: -40*(1+(parseFloat(sliderInput[0]))),
    },],
    shapes: [{ // lower wall
      type: "line",
      x0: -0.02,
      y0: -0.1,
      x1: -0.02,
      y1: .1,
      line: {
        color: "black",
        width: 5,
      }
    }, { // upper wall
      type: "line",
      x0: -0.02,
      y0: 0.9,
      x1: -0.02,
      y1: 1.1,
      line: {
        color: "black",
        width: 5,
      }
    }],
  },{
    autosize: false,
    width: 380,
    height: 270,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 5,
      r: 5,
      b: 5,
      t: 25,
      pad: 4
    },
    xaxis: {
      range: [-.5,2.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-.5,1.5],
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
    annotations: [{ // R arrow
      x: newData[1][4][0],
      y: newData[1][4][1]+0.08,
      xref: "x",
      yref: "y",
      text: "R",
      font: {size:15*(1+(parseFloat(sliderInput[0]))), color: 'grey'},
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 1,
      arrowwidth: 2*(1+(parseFloat(sliderInput[0]))),
      arrowsize: 1,
      ax: 0,
      ay: -40*(1+(parseFloat(sliderInput[0]))),
    },],
    shapes: [{ // lower wall
      type: "line",
      x0: -0.02,
      y0: -0.1,
      x1: -0.02,
      y1: .1,
      line: {
        color: "black",
        width: 5,
      }
    }, { // upper wall
      type: "line",
      x0: -0.02,
      y0: 0.9,
      x1: -0.02,
      y1: 1.1,
      line: {
        color: "black",
        width: 5,
      }
    }],
  },{
    autosize: false,
    width: 380,
    height: 270,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 5,
      r: 5,
      b: 5,
      t: 25,
      pad: 4
    },
    xaxis: {
      range: [-.5,2.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-.5,1.5],
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
    annotations: [ { // red arrowhead
      x: newData[2][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.075,
      y: newData[2][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.075,
      xref: "x",
      yref: "y",
      text: "",
      font: {color: 'transparent'},
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 1,
      arrowwidth: 2,
      arrowsize: 1,
      ax: -5,
      ay: 5,
    }, { // green arrowhead
      x: newData[2][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.075,
      y: newData[2][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.075,
      xref: "x",
      yref: "y",
      text: "",
      font: {color: 'transparent'},
      showarrow: true,
      arrowcolor: "green",
      arrowhead: 1,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 5,
      ay: -5,
    }, { // red X
      x: newData[2][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.075,
      y: newData[2][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.225,
      xref: "x",
      yref: "y",
      text: "X",
      font: {size: 15, color: 'red'},
      showarrow: true,
      arrowcolor: "transparent",
      ax: -5,
      ay: 5,
    }, { // green X
      x: newData[2][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.1,
      y: newData[2][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.1,
      xref: "x",
      yref: "y",
      text: "X",
      font: {size: 15, color: 'green'},
      showarrow: true,
      arrowcolor: "transparent",
      ax: -5,
      ay: 5,
    },],
    shapes: [{ // lower wall
      type: "line",
      x0: -0.02,
      y0: -0.1,
      x1: -0.02,
      y1: .1,
      line: {
        color: "black",
        width: 5,
      }
    }, { // upper wall
      type: "line",
      x0: -0.02,
      y0: 0.9,
      x1: -0.02,
      y1: 1.1,
      line: {
        color: "black",
        width: 5,
      }
    }],
  },{
    autosize: false,
    width: 380,
    height: 270,
    plot_bgcolor:"#F4F4F4",
    paper_bgcolor:"#F4F4F4",
    margin: {
      l: 5,
      r: 5,
      b: 5,
      t: 25,
      pad: 4
    },
    xaxis: {
      range: [-.5,2.5],
      showgrid: false,
      zeroline: false,
      showline: false,
      autotick: false,
      ticks: '',
      showticklabels: false,
      fixedrange: true,
    },
    yaxis: {
      range: [-.5,1.5],
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
    annotations: [{ // R arrow
      x: newData[3][4][0],
      y: newData[3][4][1]+0.08,
      xref: "x",
      yref: "y",
      text: "R",
      font: {size:15*(1+(parseFloat(sliderInput[0]))), color: 'grey'},
      showarrow: true,
      arrowcolor: "grey",
      arrowhead: 1,
      arrowwidth: 2*(1+(parseFloat(sliderInput[0]))),
      arrowsize: 1,
      ax: 0,
      ay: -40*(1+(parseFloat(sliderInput[0]))),
    }, { // red arrowhead
      x: newData[3][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.075,
      y: newData[3][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.075,
      xref: "x",
      yref: "y",
      text: "",
      font: {color: 'transparent'},
      showarrow: true,
      arrowcolor: "red",
      arrowhead: 1,
      arrowwidth: 2,
      arrowsize: 1,
      ax: -5,
      ay: 5,
    }, { // green arrowhead
      x: newData[3][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.075,
      y: newData[3][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.075,
      xref: "x",
      yref: "y",
      text: "",
      font: {color: 'transparent'},
      showarrow: true,
      arrowcolor: "green",
      arrowhead: 1,
      arrowwidth: 2,
      arrowsize: 1,
      ax: 5,
      ay: -5,
    }, { // red X
      x: newData[3][3][0]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.075,
      y: newData[3][3][1]*cutConst*(1+(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.225,
      xref: "x",
      yref: "y",
      text: "X",
      font: {size: 15, color: 'red'},
      showarrow: true,
      arrowcolor: "transparent",
      ax: -5,
      ay: 5,
    }, { // green X
      x: newData[3][3][0]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))-0.1,
      y: newData[3][3][1]*cutConst*(1-(sliderInput[1]-ratio)*graph2Const/math.sqrt(2))+0.1,
      xref: "x",
      yref: "y",
      text: "X",
      font: {size: 15, color: 'green'},
      showarrow: true,
      arrowcolor: "transparent",
      ax: -5,
      ay: 5,
    },],
    shapes: [{ // lower wall
      type: "line",
      x0: -0.02,
      y0: -0.1,
      x1: -0.02,
      y1: .1,
      line: {
        color: "black",
        width: 5,
      }
    }, { // upper wall
      type: "line",
      x0: -0.02,
      y0: 0.9,
      x1: -0.02,
      y1: 1.1,
      line: {
        color: "black",
        width: 5,
      }
    }],
  }];
  return;
}

function update () {

  sliderInput = [
    $("#forceInput").val(),
    $("#virtualInput").val()*ratio, // -1 due to slider
  ];

  updateData();
  updateLayout();

  Plotly.react('graph0', data[0], layout[0]);
  Plotly.react('graph1', data[1], layout[1]);
  Plotly.react('graph2', data[2], layout[2]);
  Plotly.react('graph3', data[3], layout[3]);

  return;
}

// when page ready
function main () {

  // typeset math
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

  // connect sliders
  $("input").on("change", function() {update()})

  // plot graph
  updateData();
  updateLayout();

  Plotly.newPlot('graph0', data[0], layout[0], {displayModeBar: false, doubleClick: false,});
  Plotly.newPlot('graph1', data[1], layout[1], {displayModeBar: false, doubleClick: false,});
  Plotly.newPlot('graph2', data[2], layout[2], {displayModeBar: false, doubleClick: false,});
  Plotly.newPlot('graph3', data[3], layout[3], {displayModeBar: false, doubleClick: false,});

  update();
}

$(document).ready(function () {
  main();
})























// end
